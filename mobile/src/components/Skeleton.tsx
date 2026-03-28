import { useEffect } from 'react';
import { View, StyleSheet, type ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { colors, radii } from '@/constants/theme';

interface SkeletonProps {
  width: number | string;
  height: number;
  borderRadius?: number;
  style?: ViewStyle;
}

export function Skeleton({ width, height, borderRadius = radii.sm, style }: SkeletonProps) {
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.7, { duration: 800 }),
        withTiming(0.3, { duration: 800 }),
      ),
      -1,
    );
  }, []);

  const animStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return (
    <Animated.View
      style={[
        {
          width: width as any,
          height,
          borderRadius,
          backgroundColor: colors.cardAlt,
        },
        animStyle,
        style,
      ]}
    />
  );
}

export function SkeletonTrackCard() {
  return (
    <View style={skStyles.trackCard}>
      <Skeleton width={56} height={56} borderRadius={radii.sm} />
      <View style={skStyles.trackInfo}>
        <Skeleton width="75%" height={14} borderRadius={4} />
        <Skeleton width="50%" height={12} borderRadius={4} />
      </View>
      <Skeleton width={36} height={12} borderRadius={4} />
    </View>
  );
}

export function SkeletonHero() {
  return (
    <View style={skStyles.hero}>
      <Skeleton width="100%" height={214} borderRadius={radii.xl} />
    </View>
  );
}

export function SkeletonBentoGrid() {
  return (
    <View style={skStyles.bentoGrid}>
      <View style={skStyles.bentoRow}>
        <Skeleton width="48%" height={180} borderRadius={radii.xl} />
        <Skeleton width="48%" height={180} borderRadius={radii.xl} />
      </View>
      <View style={skStyles.bentoRow}>
        <Skeleton width="48%" height={180} borderRadius={radii.xl} />
        <Skeleton width="48%" height={180} borderRadius={radii.xl} />
      </View>
      <Skeleton width="100%" height={120} borderRadius={radii.xl} />
    </View>
  );
}

export function SkeletonArtistRow() {
  return (
    <View style={skStyles.artistRow}>
      {[1, 2, 3, 4, 5].map((i) => (
        <View key={i} style={skStyles.artistItem}>
          <Skeleton width={80} height={80} borderRadius={40} />
          <Skeleton width={60} height={12} borderRadius={4} style={{ marginTop: 8 }} />
        </View>
      ))}
    </View>
  );
}

const skStyles = StyleSheet.create({
  trackCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 10,
    gap: 12,
  },
  trackInfo: {
    flex: 1,
    gap: 8,
  },
  hero: {
    paddingHorizontal: 24,
    marginBottom: 40,
  },
  bentoGrid: {
    paddingHorizontal: 24,
    gap: 16,
  },
  bentoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  artistRow: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 16,
  },
  artistItem: {
    alignItems: 'center',
  },
});
