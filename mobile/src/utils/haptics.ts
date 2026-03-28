import * as Haptics from 'expo-haptics';

function safe(fn: () => Promise<void>) {
  fn().catch(() => {});
}

export const hapticLight = () => safe(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light));
export const hapticMedium = () => safe(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium));
export const hapticSelection = () => safe(() => Haptics.selectionAsync());
export const hapticSuccess = () => safe(() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success));
export const hapticError = () => safe(() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error));
