import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { colors } from '@/constants/theme';
import { NetworkBanner } from '@/components/NetworkBanner';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { requestNotificationPermissions, scheduleDailyMix } from '@/services/notificationService';

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, staleTime: 5 * 60 * 1000 },
  },
});

export default function RootLayout() {
  const [fontsLoaded, fontsError] = useFonts({
    'PlusJakartaSans-ExtraBold': require('../assets/fonts/PlusJakartaSans-VariableFont_wght.ttf'),
    'PlusJakartaSans-ExtraBoldItalic': require('../assets/fonts/PlusJakartaSans-Italic-VariableFont_wght.ttf'),
  });

  useEffect(() => {
    if (fontsError) console.warn('Font loading failed:', fontsError);
    if (fontsLoaded || fontsError) SplashScreen.hideAsync();
  }, [fontsLoaded, fontsError]);

  useEffect(() => {
    // Request notification permissions and schedule daily engagement
    requestNotificationPermissions().then((granted) => {
      if (granted) scheduleDailyMix();
    });
  }, []);

  if (!fontsLoaded && !fontsError) return null;

  return (
    <ErrorBoundary>
      <GestureHandlerRootView style={styles.root}>
        <QueryClientProvider client={queryClient}>
          <StatusBar style="light" />
          <NetworkBanner />
          <Stack screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: colors.background },
            animation: 'fade',
          }}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="player" options={{
              presentation: 'modal',
              animation: 'slide_from_bottom',
              gestureEnabled: true,
              gestureDirection: 'vertical',
            }} />
            <Stack.Screen name="playlist/[id]" options={{
              animation: 'slide_from_right',
            }} />
          </Stack>
        </QueryClientProvider>
      </GestureHandlerRootView>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
});
