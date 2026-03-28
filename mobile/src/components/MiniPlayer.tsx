import { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  withDelay,
} from 'react-native-reanimated';
import { usePlayerStore } from '@/store/playerStore';
import { colors, radii } from '@/constants/theme';

export function MiniPlayer() {
  const router = useRouter();
  const { currentTrack, isPlaying, isLoading, pause, resume } = usePlayerStore();

  if (!currentTrack) return null;

  return (
    <TouchableOpacity
      style={styles.container}
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
          <Text style={styles.title} numberOfLines={1}>
            {currentTrack.title}
          </Text>
          <View style={styles.artistRow}>
            <Text style={styles.artist} numberOfLines={1}>
              {currentTrack.artist}
            </Text>
            {isPlaying && <EqualizerBars />}
          </View>
        </View>
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        <TouchableOpacity
          style={styles.controlBtn}
          onPress={() => { isPlaying ? pause() : resume(); }}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
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
          onPress={() => usePlayerStore.getState().skipNext()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="play-forward" size={20} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
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
    bottom: 96,
    left: 16,
    right: 16,
    borderRadius: radii.xl,
    backgroundColor: colors.cardTranslucent80,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 25 },
    shadowOpacity: 0.25,
    shadowRadius: 50,
    elevation: 15,
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
    gap: 12,
    paddingRight: 8,
  },
  controlBtn: {
    width: 32,
    height: 32,
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
