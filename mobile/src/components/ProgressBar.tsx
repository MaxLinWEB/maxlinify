import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useSharedValue, runOnJS } from 'react-native-reanimated';
import { colors, radii } from '@/constants/theme';

interface ProgressBarProps {
  progress: number; // 0 to 1
  onSeek: (progress: number) => void;
}

export function ProgressBar({ progress, onSeek }: ProgressBarProps) {
  const barWidth = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      if (barWidth.value > 0) {
        const pct = Math.max(0, Math.min(1, e.x / barWidth.value));
        runOnJS(onSeek)(pct);
      }
    });

  const tapGesture = Gesture.Tap()
    .onEnd((e) => {
      if (barWidth.value > 0) {
        const pct = Math.max(0, Math.min(1, e.x / barWidth.value));
        runOnJS(onSeek)(pct);
      }
    });

  const gesture = Gesture.Race(panGesture, tapGesture);

  const pct = `${Math.min(100, Math.max(0, progress * 100))}%`;

  return (
    <GestureDetector gesture={gesture}>
      <View
        style={styles.track}
        onLayout={(e) => { barWidth.value = e.nativeEvent.layout.width; }}
      >
        <View style={[styles.fill, { width: pct as any }]}>
          <LinearGradient
            colors={[colors.primary, colors.accent]}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            style={StyleSheet.absoluteFill}
          />
        </View>
      </View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  track: {
    height: 6,
    backgroundColor: colors.input,
    borderRadius: radii.pill,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: radii.pill,
    overflow: 'hidden',
  },
});
