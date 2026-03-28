import { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { usePlayerStore } from '@/store/playerStore';
import { useLibraryStore } from '@/store/libraryStore';
import { useResponsive } from '@/hooks/useResponsive';
import { ProgressBar } from '@/components/ProgressBar';
import { LyricsView } from '@/components/LyricsView';
import { hapticLight, hapticMedium, hapticSelection } from '@/utils/haptics';
import { colors, fonts, radii, spacing, shadows, hitSlopDefault } from '@/constants/theme';
import { formatTime } from '@/utils/formatTime';

export default function PlayerScreen() {
  const router = useRouter();
  const [showLyrics, setShowLyrics] = useState(false);
  const { width, scale } = useResponsive();
  const {
    currentTrack, isPlaying, position, duration, isLoading,
    pause, resume, seek, skipNext, skipPrevious,
    shuffleEnabled, repeatMode, toggleShuffle, cycleRepeatMode,
  } = usePlayerStore();
  const { isFavorite, addFavorite, removeFavorite } = useLibraryStore();

  const ART_SIZE = width - 48;
  const ART_HEIGHT = Math.min(scale(342), width - 48);

  if (!currentTrack) {
    return (
      <View style={[styles.container, { alignItems: 'center', justifyContent: 'center' }]}>
        <Ionicons name="musical-notes-outline" size={64} color={colors.textSecondary} style={{ opacity: 0.3 }} />
        <Text style={{ color: colors.textSecondary, fontSize: 18, marginTop: 16 }}>No track playing</Text>
        <TouchableOpacity onPress={() => router.back()} style={{ marginTop: 16 }}>
          <Text style={{ color: colors.primary, fontSize: 16, fontWeight: '600' }}>Go back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const progress = duration > 0 ? position / duration : 0;
  const liked = isFavorite(currentTrack.id);

  const handlePlayPause = () => {
    hapticLight();
    isPlaying ? pause() : resume();
  };

  const handleSkipNext = () => {
    hapticMedium();
    skipNext();
  };

  const handleSkipPrev = () => {
    hapticMedium();
    skipPrevious();
  };

  const handleToggleShuffle = () => {
    hapticSelection();
    toggleShuffle();
  };

  const handleCycleRepeat = () => {
    hapticSelection();
    cycleRepeatMode();
  };

  const handleToggleLike = () => {
    hapticSelection();
    liked ? removeFavorite(currentTrack.id) : addFavorite(currentTrack);
  };

  return (
    <View style={styles.container}>
      {/* Background layers */}
      <Image source={{ uri: currentTrack.coverUrl }} style={styles.bgBlur} blurRadius={100} />
      <View style={styles.bgOverlay} />
      <View style={styles.glowCyan} />
      <View style={styles.glowGreen} />

      <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
        {/* Top Navigation */}
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => router.back()} style={styles.topBtn} hitSlop={hitSlopDefault}>
            <Ionicons name="chevron-down" size={28} color={colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.nowPlaying}>Now Playing</Text>
          <TouchableOpacity style={styles.topBtn} hitSlop={hitSlopDefault}>
            <Ionicons name="ellipsis-vertical" size={22} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Album Artwork */}
          <View style={[styles.artContainer, { width: ART_SIZE, height: ART_HEIGHT }]}>
            <View style={styles.artGlow} />
            <Image source={{ uri: currentTrack.coverUrl }} style={styles.artwork} transition={300} />
          </View>

          {/* Track Metadata + Like */}
          <View style={styles.metaRow}>
            <View style={styles.metaText}>
              <Text style={styles.trackTitle} numberOfLines={1}>{currentTrack.title}</Text>
              <Text style={styles.trackArtist} numberOfLines={1}>{currentTrack.artist}</Text>
            </View>
            <TouchableOpacity onPress={handleToggleLike} style={styles.heartBtn} hitSlop={hitSlopDefault}>
              <Ionicons
                name={liked ? 'heart' : 'heart-outline'}
                size={25}
                color={liked ? colors.primary : colors.textSecondary}
              />
            </TouchableOpacity>
          </View>

          {/* Progress Bar */}
          <View style={styles.progressWrap}>
            <ProgressBar progress={progress} onSeek={(pct) => seek(pct * duration)} />
            <View style={styles.timeRow}>
              <Text style={styles.timeText}>{formatTime(position)}</Text>
              <Text style={styles.timeText}>{formatTime(duration)}</Text>
            </View>
          </View>

          {/* Playback Controls */}
          <View style={styles.controls}>
            <TouchableOpacity style={styles.sideControl} onPress={handleToggleShuffle} hitSlop={hitSlopDefault}>
              <Ionicons name="shuffle" size={22} color={shuffleEnabled ? colors.primary : colors.textSecondary} />
              {shuffleEnabled && <View style={styles.activeIndicator} />}
            </TouchableOpacity>

            <TouchableOpacity onPress={handleSkipPrev} style={styles.skipControl} hitSlop={hitSlopDefault}>
              <Ionicons name="play-skip-back" size={24} color={colors.textPrimary} />
            </TouchableOpacity>

            <TouchableOpacity onPress={handlePlayPause} activeOpacity={0.85}>
              <LinearGradient
                colors={[colors.primary, colors.primaryDark]}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                style={[styles.playBtn, shadows.glow]}
              >
                <Ionicons
                  name={isLoading ? 'hourglass' : isPlaying ? 'pause' : 'play'}
                  size={28}
                  color={colors.teal}
                  style={!isLoading && !isPlaying ? { marginLeft: 4 } : undefined}
                />
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleSkipNext} style={styles.skipControl} hitSlop={hitSlopDefault}>
              <Ionicons name="play-skip-forward" size={24} color={colors.textPrimary} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.sideControl} onPress={handleCycleRepeat} hitSlop={hitSlopDefault}>
              <View>
                <Ionicons
                  name="repeat"
                  size={22}
                  color={repeatMode !== 'off' ? colors.accent : colors.textSecondary}
                />
                {repeatMode === 'one' && (
                  <View style={styles.repeatOneBadge}>
                    <Text style={styles.repeatOneText}>1</Text>
                  </View>
                )}
              </View>
              {repeatMode !== 'off' && <View style={[styles.activeIndicator, { backgroundColor: colors.accent }]} />}
            </TouchableOpacity>
          </View>

          {/* Additional Actions */}
          <View style={styles.actions}>
            <ActionBtn icon="stats-chart" label="Stats" />
            <ActionBtn icon="share-outline" label="Share" />
            <ActionBtn icon="add-circle-outline" label="Add to" />
          </View>

          {/* Lyrics Toggle + Panel */}
          <TouchableOpacity
            style={styles.lyricsToggle}
            onPress={() => { setShowLyrics(!showLyrics); hapticLight(); }}
          >
            <Ionicons name="text" size={16} color={showLyrics ? colors.primary : colors.textSecondary} />
            <Text style={[styles.lyricsLabel, showLyrics && { color: colors.primary }]}>Lyrics</Text>
            <Ionicons name={showLyrics ? 'chevron-up' : 'chevron-down'} size={14} color={showLyrics ? colors.primary : colors.textSecondary} />
          </TouchableOpacity>

          {showLyrics && (
            <View style={styles.lyricsWrap}>
              <LyricsView />
            </View>
          )}

          <View style={{ height: 40 }} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

function ActionBtn({ icon, label }: { icon: keyof typeof Ionicons.glyphMap; label: string }) {
  return (
    <TouchableOpacity style={styles.actionBtn} hitSlop={hitSlopDefault}>
      <Ionicons name={icon} size={20} color={colors.textSecondary} />
      <Text style={styles.actionLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  bgBlur: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.4,
  },
  bgOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(14, 14, 14, 0.7)',
  },
  glowCyan: {
    position: 'absolute',
    top: -100,
    left: -100,
    width: 400,
    height: 400,
    borderRadius: 200,
    backgroundColor: 'rgba(58, 249, 231, 0.12)',
  },
  glowGreen: {
    position: 'absolute',
    bottom: -100,
    right: -100,
    width: 400,
    height: 400,
    borderRadius: 200,
    backgroundColor: 'rgba(47, 248, 1, 0.08)',
  },

  // Top Navigation
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  topBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nowPlaying: {
    fontFamily: fonts.heading,
    color: colors.primary,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },

  scrollContent: {
    paddingHorizontal: spacing.screenPadding,
    alignItems: 'center',
  },

  // Album Artwork
  artContainer: {
    marginTop: 8,
    marginBottom: 32,
  },
  artGlow: {
    position: 'absolute',
    top: -16,
    left: -16,
    right: -16,
    bottom: -16,
    borderRadius: radii.xl,
    backgroundColor: 'rgba(58, 249, 231, 0.15)',
    opacity: 0.5,
    shadowColor: '#3af9e7',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 32,
    elevation: 6,
  },
  artwork: {
    width: '100%',
    height: '100%',
    borderRadius: 28,
    backgroundColor: colors.input,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 25 },
    shadowOpacity: 0.25,
    shadowRadius: 50,
    elevation: 12,
  },

  // Track Metadata
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 28,
  },
  metaText: {
    flex: 1,
    marginRight: 16,
    gap: 4,
  },
  trackTitle: {
    fontFamily: fonts.heading,
    color: colors.textPrimary,
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: -0.75,
    lineHeight: 32,
  },
  trackArtist: {
    color: colors.textSecondary,
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
  },
  heartBtn: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Progress Bar
  progressWrap: {
    width: '100%',
    marginBottom: 28,
    gap: 10,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeText: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0.5,
    lineHeight: 16,
    opacity: 0.8,
  },

  // Playback Controls
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    gap: 28,
    marginBottom: 28,
  },
  sideControl: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  skipControl: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playBtn: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeIndicator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.primary,
    marginTop: 4,
  },
  repeatOneBadge: {
    position: 'absolute',
    top: -2,
    right: -6,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  repeatOneText: {
    color: colors.background,
    fontSize: 8,
    fontWeight: '800',
  },

  // Additional Actions
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 56,
    marginBottom: 24,
  },
  actionBtn: {
    alignItems: 'center',
    gap: 6,
  },
  actionLabel: {
    color: colors.textSecondary,
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  // Lyrics
  lyricsToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: radii.pill,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    marginBottom: 20,
  },
  lyricsLabel: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  lyricsWrap: {
    width: '100%',
  },
});
