import { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  withDelay,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { usePlayerStore } from '@/store/playerStore';
import { hapticLight, hapticMedium } from '@/utils/haptics';
import { colors, radii, hitSlopDefault, layout } from '@/constants/theme';

export function MiniPlayer() {
  const router = useRouter();
  const { currentTrack, isPlaying, isLoading, position, duration, pause, resume, skipNext, skipPrevious } = usePlayerStore();
  const translateX = useSharedValue(0);

  if (!currentTrack) return null;

  const progress = duration > 0 ? position / duration : 0;

  const handleSkipNext = () => {
    hapticMedium();
    skipNext();
  };

  const handleSkipPrev = () => {
    hapticMedium();
    skipPrevious();
  };

  const panGesture = Gesture.Pan()
    .activeOffsetX([-15, 15])
    .onUpdate((e) => {
      translateX.value = e.translationX * 0.6;
    })
    .onEnd((e) => {
      if (e.translationX < -80) {
        runOnJS(handleSkipNext)();
      } else if (e.translationX > 80) {
        runOnJS(handleSkipPrev)();
      }
      translateX.value = withSpring(0, { damping: 20, stiffness: 200 });
    });

  const panStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[styles.container, panStyle]}>
        {/* Progress bar at top */}
        <View style={styles.progressTrack}>
          <LinearGradient
            colors={[colors.primary, colors.accent]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.progressFill, { width: `${Math.min(progress * 100, 100)}%` as any }]}
          />
        </View>

        <TouchableOpacity
          style={styles.inner}
          activeOpacity={0.9}
          onPress={() => router.push('/player')}
        >
          {/* Album Art */}
          <View style={styles.left}>
            <Image
              source={{ uri: currentTrack.coverUrl }}
              style={styles.cover}
              transition={200}
            />
            <View style={styles.info}>
              <Text style={styles.title} numberOfLines={1}>{currentTrack.title}</Text>
              <View style={styles.artistRow}>
                <Text style={styles.artist} numberOfLines={1}>{currentTrack.artist}</Text>
                {isPlaying && <EqualizerBars />}
              </View>
            </View>
          </View>

          {/* Controls */}
          <View style={styles.controls}>
            <TouchableOpacity
              style={styles.controlBtn}
              onPress={() => { hapticLight(); isPlaying ? pause() : resume(); }}
              hitSlop={hitSlopDefault}
            >
              <Ionicons
                name={isLoading ? 'hourglass' : isPlaying ? 'pause' : 'play'}
                size={20}
                color={colors.textPrimary}
                style={!isLoading && !isPlaying ? { marginLeft: 2 } : undefined}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.controlBtn}
              onPress={handleSkipNext}
              hitSlop={hitSlopDefault}
            >
              <Ionicons name="play-forward" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Animated.View>
    </GestureDetector>
  );
}

function EqualizerBars() {
  return (
    <View style={styles.eqContainer}>
      <EqBar height1={8} height2={4} duration={500} delay={0} />
      <EqBar height1={12} height2={4} duration={600} delay={100} />
      <EqBar height1={6} height2={3} duration={400} delay={200} />
    </View>
  );
}

function EqBar({ height1, height2, duration, delay }: { height1: number; height2: number; duration: number; delay: number }) {
  const h = useSharedValue(height2);
  useEffect(() => {
    h.value = withDelay(
      delay,
      withRepeat(withSequence(withTiming(height1, { duration }), withTiming(height2, { duration })), -1, true)
    );
  }, []);
  const style = useAnimatedStyle(() => ({ height: h.value }));
  return <Animated.View style={[styles.eqBar, style]} />;
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: layout.tabBarHeight + 8,
    left: 12,
    right: 12,
    borderRadius: radii.xl,
    backgroundColor: colors.cardTranslucent80,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    zIndex: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.3,
    shadowRadius: 24,
    elevation: 15,
  },
  progressTrack: {
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  progressFill: {
    height: 2,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  cover: {
    width: 48,
    height: 48,
    borderRadius: radii.md,
    backgroundColor: colors.input,
  },
  info: { flex: 1 },
  title: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
  },
  artistRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  artist: {
    color: colors.accent,
    fontSize: 12,
    lineHeight: 16,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingRight: 4,
  },
  controlBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eqContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 2,
    height: 12,
  },
  eqBar: {
    width: 2,
    backgroundColor: colors.accent,
    borderRadius: 1,
  },
});
