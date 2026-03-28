import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLibraryStore } from '@/store/libraryStore';
import { usePlayerStore } from '@/store/playerStore';
import { TrackCard } from '@/components/TrackCard';
import { EmptyState } from '@/components/EmptyState';
import { colors, radii, spacing } from '@/constants/theme';

export default function PlaylistDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const playlist = useLibraryStore((s) => s.playlists.find((p) => p.id === id));
  const { setQueue, currentTrack } = usePlayerStore();

  if (!playlist) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16 }}>
          <Text style={{ color: colors.textSecondary, fontSize: 18 }}>Playlist not found</Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={{ color: colors.primary, fontSize: 16, fontWeight: '600' }}>Go back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={28} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>{playlist.name}</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Playlist Info */}
      <View style={styles.info}>
        <Text style={styles.trackCount}>{playlist.tracks.length} songs</Text>
        {playlist.tracks.length > 0 && (
          <TouchableOpacity onPress={() => setQueue(playlist.tracks as any, 0)}>
            <LinearGradient colors={[colors.primary, colors.primaryDark]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.playAllBtn}>
              <Ionicons name="play" size={16} color={colors.teal} style={{ marginLeft: 2 }} />
              <Text style={styles.playAllText}>Play All</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      </View>

      {/* Tracks */}
      <FlatList
        data={playlist.tracks}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <TrackCard
            track={item as any}
            onPress={() => setQueue(playlist.tracks as any, index)}
            isPlaying={currentTrack?.id === item.id}
          />
        )}
        ListEmptyComponent={
          <EmptyState icon="musical-notes" title="Empty playlist" message="Long-press a song in search to add it" />
        }
        contentContainerStyle={{ paddingBottom: 200 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: spacing.screenPadding, paddingVertical: 12,
  },
  backBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { color: colors.textPrimary, fontSize: 20, fontWeight: '700', flex: 1, textAlign: 'center' },
  info: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: spacing.screenPadding, paddingBottom: 16,
  },
  trackCount: { color: colors.textSecondary, fontSize: 14, lineHeight: 16 },
  playAllBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    paddingVertical: 10, paddingHorizontal: 20, borderRadius: radii.pill,
  },
  playAllText: { color: colors.teal, fontSize: 14, fontWeight: '700' },
});
