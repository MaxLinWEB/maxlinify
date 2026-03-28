import { useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLibraryStore } from '@/store/libraryStore';
import { usePlayerStore } from '@/store/playerStore';
import { EmptyState } from '@/components/EmptyState';
import { hapticLight, hapticSelection } from '@/utils/haptics';
import { colors, radii, spacing, layout } from '@/constants/theme';
import type { StoredTrack } from '@maxlinify/shared';
import type { SearchResult } from '@maxlinify/shared';

const FILTER_TABS = ['Playlists', 'Albums', 'Artists', 'Downloaded'] as const;

function storedToSearchResult(track: StoredTrack): SearchResult {
  return {
    id: track.id,
    title: track.title,
    artist: track.artist,
    duration: track.duration,
    coverUrl: track.coverUrl,
    source: track.source,
  };
}

export default function LibraryScreen() {
  const router = useRouter();
  const { favorites, playlists, createPlaylist, deletePlaylist } = useLibraryStore();
  const { setQueue } = usePlayerStore();
  const [activeFilter, setActiveFilter] = useState<typeof FILTER_TABS[number]>('Playlists');

  const handleCreatePlaylist = useCallback(() => {
    hapticLight();
    const name = `My Playlist #${playlists.length + 1}`;
    createPlaylist(name);
  }, [playlists.length, createPlaylist]);

  const handlePlayFavorites = useCallback(() => {
    if (favorites.length) {
      hapticLight();
      setQueue(favorites.map(storedToSearchResult), 0);
    }
  }, [favorites, setQueue]);

  const handleFilterPress = useCallback((tab: typeof FILTER_TABS[number]) => {
    hapticSelection();
    setActiveFilter(tab);
  }, []);

  const renderContent = () => {
    switch (activeFilter) {
      case 'Playlists':
        return (
          <>
            {/* Liked Songs Card */}
            <TouchableOpacity
              style={styles.likedCard}
              activeOpacity={0.8}
              onPress={handlePlayFavorites}
            >
              <View style={styles.likedCoverWrap}>
                <LinearGradient colors={[colors.primary, colors.accent]} style={styles.likedCoverGrad}>
                  <Ionicons name="heart" size={32} color={colors.teal} />
                </LinearGradient>
              </View>
              <View style={styles.likedInfo}>
                <Text style={styles.likedTitle}>Liked Songs</Text>
                <Text style={styles.likedMeta}>Playlist {'\u2022'} {favorites.length} songs</Text>
              </View>
              {favorites.length > 0 && (
                <View style={styles.vizBars}>
                  {[8, 12, 6, 10].map((h, i) => (
                    <View key={i} style={[styles.vizBar, { height: h }]} />
                  ))}
                </View>
              )}
            </TouchableOpacity>

            {/* Playlists */}
            {playlists.map((pl) => (
              <LibraryItem
                key={pl.id}
                title={pl.name}
                meta={`Playlist \u2022 ${pl.tracks.length} songs`}
                coverUri={pl.tracks[0]?.coverUrl}
                onPress={() => { hapticLight(); router.push(`/playlist/${pl.id}`); }}
                onOptions={() => {
                  Alert.alert('Delete', `Delete "${pl.name}"?`, [
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'Delete', style: 'destructive', onPress: () => deletePlaylist(pl.id) },
                  ]);
                }}
              />
            ))}

            {/* Create Playlist Button */}
            <TouchableOpacity style={styles.createBtn} onPress={handleCreatePlaylist}>
              <Ionicons name="add-circle" size={24} color={colors.primary} />
              <Text style={styles.createText}>Create Playlist</Text>
            </TouchableOpacity>
          </>
        );
      case 'Albums':
        return <EmptyState icon="disc-outline" title="No Albums" message="Albums you save will appear here" />;
      case 'Artists':
        return <EmptyState icon="people-outline" title="No Artists" message="Follow artists to see them here" />;
      case 'Downloaded':
        return <EmptyState icon="cloud-download-outline" title="No Downloads" message="Downloaded songs for offline listening will appear here" />;
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* Heading */}
        <Text style={styles.heading}>Your Library</Text>

        {/* Filter Tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
          {FILTER_TABS.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.filterTab, activeFilter === tab && styles.filterTabActive]}
              onPress={() => handleFilterPress(tab)}
            >
              <Text style={[styles.filterText, activeFilter === tab && styles.filterTextActive]}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {renderContent()}

        <View style={{ height: layout.bottomListPadding }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function LibraryItem({ title, meta, coverUri, onPress, onOptions }: {
  title: string; meta: string; coverUri?: string; onPress: () => void; onOptions: () => void;
}) {
  return (
    <TouchableOpacity style={styles.libItem} activeOpacity={0.7} onPress={onPress}>
      {coverUri ? (
        <Image source={{ uri: coverUri }} style={styles.libCover} />
      ) : (
        <View style={[styles.libCover, styles.libCoverPlaceholder]}>
          <Ionicons name="musical-notes" size={24} color={colors.textSecondary} />
        </View>
      )}
      <View style={styles.libInfo}>
        <Text style={styles.libTitle} numberOfLines={1}>{title}</Text>
        <Text style={styles.libMeta}>{meta}</Text>
      </View>
      <TouchableOpacity onPress={onOptions} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
        <Ionicons name="ellipsis-vertical" size={18} color={colors.textSecondary} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: spacing.screenPadding, paddingTop: 16 },

  heading: {
    color: colors.textPrimary,
    fontFamily: 'PlusJakartaSans-ExtraBold',
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: -0.9,
    lineHeight: 38,
    marginBottom: 20,
  },

  // Filter Tabs
  filterRow: { gap: 10, marginBottom: 24, paddingVertical: 4 },
  filterTab: {
    height: 38,
    paddingHorizontal: 20,
    borderRadius: radii.pill,
    backgroundColor: colors.input,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterTabActive: { backgroundColor: colors.primary },
  filterText: { color: colors.textSecondary, fontSize: 14, fontWeight: '600' },
  filterTextActive: { color: colors.teal },

  // Liked Songs
  likedCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: radii.xl,
    padding: 16,
    gap: 16,
    marginBottom: 16,
  },
  likedCoverWrap: { width: 80, height: 80, borderRadius: radii.sm },
  likedCoverGrad: {
    width: 80,
    height: 80,
    borderRadius: radii.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  likedInfo: { flex: 1, gap: 4 },
  likedTitle: { color: colors.textPrimary, fontSize: 18, fontWeight: '700' },
  likedMeta: { color: colors.textSecondary, fontSize: 13, lineHeight: 16 },
  vizBars: { flexDirection: 'row', alignItems: 'flex-end', gap: 3, height: 16 },
  vizBar: { width: 3, borderRadius: 1.5, backgroundColor: colors.accent },

  // Library Items
  libItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  libCover: { width: 56, height: 56, borderRadius: radii.sm, backgroundColor: colors.input },
  libCoverPlaceholder: { alignItems: 'center', justifyContent: 'center' },
  libInfo: { flex: 1, gap: 4 },
  libTitle: { color: colors.textPrimary, fontSize: 16, fontWeight: '700', lineHeight: 22 },
  libMeta: { color: colors.textSecondary, fontSize: 12, lineHeight: 16 },

  // Create Playlist
  createBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 20,
  },
  createText: { color: colors.primary, fontSize: 16, fontWeight: '600' },
});
