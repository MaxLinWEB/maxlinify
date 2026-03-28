import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform, AppState } from 'react-native';

// Configure notification appearance
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export async function requestNotificationPermissions(): Promise<boolean> {
  if (!Device.isDevice) {
    console.warn('Push notifications require a physical device');
    return false;
  }

  const { status: existing } = await Notifications.getPermissionsAsync();
  if (existing === 'granted') return true;

  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
}

export async function getExpoPushToken(): Promise<string | null> {
  try {
    const hasPermission = await requestNotificationPermissions();
    if (!hasPermission) return null;

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'Default',
        importance: Notifications.AndroidImportance.DEFAULT,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#3af9e7',
      });

      await Notifications.setNotificationChannelAsync('music', {
        name: 'Music',
        importance: Notifications.AndroidImportance.LOW,
        sound: undefined,
      });
    }

    const token = await Notifications.getExpoPushTokenAsync();
    return token.data;
  } catch (err) {
    console.error('Failed to get push token:', err);
    return null;
  }
}

// Schedule a "resume listening" reminder
let resumeTimerId: ReturnType<typeof setTimeout> | null = null;

export function scheduleResumeReminder(trackTitle: string, artistName: string) {
  cancelResumeReminder();

  // Only schedule if app goes to background
  const subscription = AppState.addEventListener('change', (state) => {
    if (state === 'background') {
      resumeTimerId = setTimeout(async () => {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: 'Continue Listening?',
            body: `Pick up where you left off — ${trackTitle} by ${artistName}`,
            data: { type: 'resume' },
            categoryIdentifier: 'music',
          },
          trigger: null, // Send immediately after the timeout
        });
      }, 30 * 60 * 1000); // 30 minutes
    } else if (state === 'active') {
      cancelResumeReminder();
    }
  });

  return () => {
    subscription.remove();
    cancelResumeReminder();
  };
}

export function cancelResumeReminder() {
  if (resumeTimerId) {
    clearTimeout(resumeTimerId);
    resumeTimerId = null;
  }
}

// Schedule a daily engagement notification
export async function scheduleDailyMix() {
  // Cancel existing daily notifications first
  await Notifications.cancelAllScheduledNotificationsAsync();

  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Your Daily Mix is Ready',
      body: 'Discover fresh tracks curated just for you',
      data: { type: 'daily_mix' },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour: 18,
      minute: 0,
    },
  });
}

// Show an instant local notification
export async function showLocalNotification(title: string, body: string, data?: Record<string, unknown>) {
  await Notifications.scheduleNotificationAsync({
    content: { title, body, data: data || {} },
    trigger: null,
  });
}
