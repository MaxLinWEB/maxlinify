import { useRef, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useLyrics } from '@/hooks/useLyrics';
import { usePlayerStore } from '@/store/playerStore';
import { colors, radii } from '@/constants/theme';
import type { LyricLine } from '@maxlinify/shared';

export function LyricsView() {
  const flatListRef = useRef<FlatList>(null);
  const { currentTrack, position } = usePlayerStore();
  const { data: lyrics, isLoading } = useLyrics(currentTrack?.artist, currentTrack?.title);

  const activeIndex = lyrics?.lines
    ? lyrics.lines.findIndex((line, i) => {
        const next = lyrics.lines[i + 1];
        return position >= line.timeMs && (!next || position < next.timeMs);
      })
    : -1;

  useEffect(() => {
    if (activeIndex >= 0 && flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index: Math.max(0, activeIndex - 2),
        animated: true,
        viewOffset: 60,
      });
    }
  }, [activeIndex]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.placeholder}>Loading lyrics...</Text>
      </View>
    );
  }

  if (!lyrics || lyrics.lines.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.placeholder}>No lyrics available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerLabel}>LYRICS</Text>
        {lyrics.synced && (
          <View style={styles.syncBadge}><Text style={styles.syncText}>SYNCED</Text></View>
        )}
      </View>
      <FlatList
        ref={flatListRef}
        data={lyrics.lines}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item, index }) => (
          <Text style={[
            styles.lyric,
            index === activeIndex && styles.lyricActive,
            index < activeIndex && styles.lyricPast,
          ]}>
            {item.text}
          </Text>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        onScrollToIndexFailed={() => {}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.cardTranslucent60,
    borderRadius: radii.xl,
    borderWidth: 1, borderColor: colors.border,
    padding: 25, maxHeight: 280,
  },
  header: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', marginBottom: 15,
  },
  headerLabel: {
    color: colors.primary, fontSize: 12, fontWeight: '700',
    letterSpacing: 1.2, lineHeight: 16,
  },
  syncBadge: {
    backgroundColor: 'rgba(58, 249, 231, 0.1)',
    paddingHorizontal: 8, paddingVertical: 2, borderRadius: radii.pill,
  },
  syncText: { color: colors.primary, fontSize: 10, fontWeight: '700' },
  lyric: {
    color: 'rgba(255, 255, 255, 0.3)',
    fontSize: 18, fontWeight: '500', lineHeight: 28,
    paddingVertical: 4,
  },
  lyricActive: { color: colors.textPrimary, fontWeight: '700' },
  lyricPast: { color: 'rgba(255, 255, 255, 0.5)' },
  placeholder: {
    color: colors.textSecondary, fontSize: 16,
    textAlign: 'center', paddingVertical: 40,
  },
});
