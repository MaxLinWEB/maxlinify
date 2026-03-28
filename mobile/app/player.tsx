import { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { usePlayerStore } from '@/store/playerStore';
import { useLibraryStore } from '@/store/libraryStore';
import { ProgressBar } from '@/components/ProgressBar';
import { LyricsView } from '@/components/LyricsView';
import { colors, fonts, radii, spacing } from '@/constants/theme';
import { formatTime } from '@/utils/formatTime';

const { width: SW } = Dimensions.get('window');
const ART_SIZE = SW - 48;
const ART_HEIGHT = 342;

export default function PlayerScreen() {
  const router = useRouter();
  const [showLyrics, setShowLyrics] = useState(false);
  const {
    currentTrack, isPlaying, position, duration, isLoading,
    pause, resume, seek, skipNext, skipPrevious,
  } = usePlayerStore();
  const { isFavorite, addFavorite, removeFavorite } = useLibraryStore();

  if (!currentTrack) {
    return (
      <View style={[styles.container, { alignItems: 'center', justifyContent: 'center' }]}>
        <Text style={{ color: colors.textSecondary, fontSize: 18 }}>No track playing</Text>
        <TouchableOpacity onPress={() => router.back()} style={{ marginTop: 16 }}>
          <Text style={{ color: colors.primary, fontSize: 16, fontWeight: '600' }}>Go back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const progress = duration > 0 ? position / duration : 0;
  const liked = isFavorite(currentTrack.id);

  return (
    <View style={styles.container}>
      {/* Layer 1: Blurred album artwork */}
      <Image source={{ uri: currentTrack.coverUrl }} style={styles.bgBlur} blurRadius={100} />
      {/* Layer 2: Dark overlay */}
      <View style={styles.bgOverlay} />
      {/* Layer 3: Radial glow top-left cyan */}
      <View style={styles.glowCyan} />
      {/* Layer 4: Radial glow bottom-right green */}
      <View style={styles.glowGreen} />

      <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
        {/* Top Navigation */}
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => router.back()} style={styles.topBtn}>
            <Ionicons name="chevron-down" size={28} color={colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.nowPlaying}>Now Playing</Text>
          <TouchableOpacity style={styles.topBtn}>
            <Ionicons name="ellipsis-vertical" size={22} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Album Artwork */}
          <View style={styles.artContainer}>
            {/* Dynamic glow behind artwork */}
            <View style={styles.artGlow} />
            <Image source={{ uri: currentTrack.coverUrl }} style={styles.artwork} transition={300} />
          </View>

          {/* Track Metadata + Like */}
          <View style={styles.metaRow}>
            <View style={styles.metaText}>
              <Text style={styles.trackTitle} numberOfLines={1}>{currentTrack.title}</Text>
              <Text style={styles.trackArtist} numberOfLines={1}>{currentTrack.artist}</Text>
            </View>
            <TouchableOpacity
              onPress={() => liked ? removeFavorite(currentTrack.id) : addFavorite(currentTrack)}
              style={styles.heartBtn}
            >
              <Ionicons
                name={liked ? 'heart' : 'heart-outline'}
                size={25}
                color={liked ? '#3af9e7' : '#adaaaa'}
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
            <TouchableOpacity style={styles.sideControl}>
              <Ionicons name="shuffle" size={22} color="#adaaaa" />
            </TouchableOpacity>
            <TouchableOpacity onPress={skipPrevious} style={styles.skipControl}>
              <Ionicons name="play-skip-back" size={24} color="#ffffff" />
            </TouchableOpacity>
            <TouchableOpacity onPress={isPlaying ? pause : resume} activeOpacity={0.85}>
              <LinearGradient
                colors={['#3af9e7', '#17ead9']}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                style={styles.playBtn}
              >
                <Ionicons
                  name={isLoading ? 'hourglass' : isPlaying ? 'pause' : 'play'}
                  size={28}
                  color="#005a53"
                  style={!isLoading && !isPlaying ? { marginLeft: 4 } : undefined}
                />
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity onPress={skipNext} style={styles.skipControl}>
              <Ionicons name="play-skip-forward" size={24} color="#ffffff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.sideControl}>
              <Ionicons name="repeat" size={22} color="#2ff801" />
            </TouchableOpacity>
          </View>

          {/* Additional Actions */}
          <View style={styles.actions}>
            <ActionBtn icon="stats-chart" label="Stats" />
            <ActionBtn icon="share-outline" label="Share" />
            <ActionBtn icon="add-circle-outline" label="Add to" />
          </View>

          {/* Lyrics Toggle + Panel */}
          <TouchableOpacity style={styles.lyricsToggle} onPress={() => setShowLyrics(!showLyrics)}>
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
    <TouchableOpacity style={styles.actionBtn}>
      <Ionicons name={icon} size={20} color="#adaaaa" />
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
    backgroundColor: 'rgba(58, 249, 231, 0.15)',
  },
  glowGreen: {
    position: 'absolute',
    bottom: -100,
    right: -100,
    width: 400,
    height: 400,
    borderRadius: 200,
    backgroundColor: 'rgba(47, 248, 1, 0.1)',
  },

  // Top Navigation
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  topBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nowPlaying: {
    fontFamily: fonts.subheading,
    color: '#3af9e7',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.4,
  },

  scrollContent: {
    paddingHorizontal: spacing.screenPadding,
    alignItems: 'center',
  },

  // Album Artwork
  artContainer: {
    width: ART_SIZE,
    height: ART_HEIGHT,
    marginTop: 8,
    marginBottom: 40,
  },
  artGlow: {
    position: 'absolute',
    top: -16,
    left: -16,
    right: -16,
    bottom: -16,
    borderRadius: radii.xl,
    backgroundColor: 'rgba(58, 249, 231, 0.2)',
    opacity: 0.5,
    // iOS shadow for blur glow effect
    shadowColor: '#3af9e7',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 32,
    elevation: 6,
  },
  artwork: {
    width: '100%',
    height: '100%',
    borderRadius: 32,
    backgroundColor: colors.input,
    // Shadow: 0px 25px 50px -12px rgba(0,0,0,0.25)
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
    marginBottom: 32,
  },
  metaText: {
    flex: 1,
    marginRight: 16,
    gap: 4,
  },
  trackTitle: {
    fontFamily: fonts.heading,
    color: '#ffffff',
    fontSize: 30,
    fontWeight: '800',
    letterSpacing: -0.75,
    lineHeight: 36,
  },
  trackArtist: {
    color: '#adaaaa',
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 28,
  },
  heartBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Progress Bar
  progressWrap: {
    width: '100%',
    marginBottom: 32,
    gap: 12,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeText: {
    color: '#adaaaa',
    fontSize: 12,
    fontWeight: '400',
    letterSpacing: 1.2,
    lineHeight: 16,
    opacity: 0.7,
  },

  // Playback Controls
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    gap: 32,
    marginBottom: 32,
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
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    // Shadow: 0px 0px 30px rgba(58,249,231,0.4)
    shadowColor: 'rgba(58, 249, 231, 1)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 30,
    elevation: 8,
  },

  // Additional Actions
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 68.4,
    marginBottom: 24,
  },
  actionBtn: {
    alignItems: 'center',
    gap: 6,
  },
  actionLabel: {
    color: '#adaaaa',
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: -0.5,
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
