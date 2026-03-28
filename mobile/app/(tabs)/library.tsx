import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, StyleSheet, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLibraryStore } from '@/store/libraryStore';
import { usePlayerStore } from '@/store/playerStore';
import { colors, radii, spacing } from '@/constants/theme';
import type { StoredTrack, Playlist } from '@maxlinify/shared';

const { width: SW } = Dimensions.get('window');
const CAT_W = (SW - 48 - 16) / 2;

const BROWSE_CATS = [
  { title: 'Genres', grad: colors.categoryGenres },
  { title: 'Moods', grad: colors.categoryMoods },
  { title: 'Podcasts', grad: colors.categoryPodcasts },
  { title: 'New Hits', grad: colors.categoryNewHits },
];

const FILTER_TABS = ['Playlists', 'Albums', 'Artists', 'Downloaded'];

export default function LibraryScreen() {
  const router = useRouter();
  const { favorites, playlists, createPlaylist, deletePlaylist } = useLibraryStore();
  const { setQueue } = usePlayerStore();
  const [activeFilter, setActiveFilter] = useState('Playlists');

  const handleCreatePlaylist = () => {
    const name = `My Playlist #${playlists.length + 1}`;
    createPlaylist(name);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* Search Heading */}
        <Text style={styles.heading}>Search</Text>

        {/* Search Input */}
        <View style={styles.inputWrap}>
          <Ionicons name="search" size={18} color={colors.textSecondary} style={{ marginRight: 12 }} />
          <Text style={styles.inputPlaceholder}>Artists, songs, or podcasts</Text>
        </View>

        {/* Browse All */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Browse All</Text>
            <TouchableOpacity><Text style={styles.seeAll}>See All</Text></TouchableOpacity>
          </View>
          <View style={styles.catGrid}>
            {BROWSE_CATS.map((cat) => (
              <TouchableOpacity key={cat.title} activeOpacity={0.8} style={styles.catCardWrap}>
                <LinearGradient colors={cat.grad} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.catCard}>
                  <Text style={styles.catTitle}>{cat.title}</Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Filter Tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
          {FILTER_TABS.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.filterTab, activeFilter === tab && styles.filterTabActive]}
              onPress={() => setActiveFilter(tab)}
            >
              <Text style={[styles.filterText, activeFilter === tab && styles.filterTextActive]}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Your Library */}
        <Text style={styles.libraryHeading}>Your Library</Text>

        {/* Liked Songs Card */}
        <TouchableOpacity
          style={styles.likedCard}
          activeOpacity={0.8}
          onPress={() => { if (favorites.length) setQueue(favorites as any, 0); }}
        >
          <View style={styles.likedCoverWrap}>
            <LinearGradient colors={[colors.primary, colors.accent]} style={styles.likedCoverGrad}>
              <Ionicons name="heart" size={36} color={colors.teal} />
            </LinearGradient>
          </View>
          <View style={styles.likedInfo}>
            <Text style={styles.likedTitle}>Liked Songs</Text>
            <Text style={styles.likedMeta}>Playlist {'\u2022'} {favorites.length.toLocaleString()} songs</Text>
          </View>
          {favorites.length > 0 && (
            <View style={styles.vizBars}>
              {[8, 12, 6, 10].map((h, i) => (
                <View key={i} style={[styles.vizBar, { height: h }]} />
              ))}
            </View>
          )}
        </TouchableOpacity>

        {/* Library Items */}
        {playlists.map((pl) => (
          <LibraryItem
            key={pl.id}
            title={pl.name}
            meta={`Playlist \u2022 ${pl.tracks.length} songs`}
            coverUri={pl.tracks[0]?.coverUrl}
            onPress={() => router.push(`/playlist/${pl.id}`)}
            onDelete={() => {
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

        <View style={{ height: 200 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function LibraryItem({ title, meta, coverUri, onPress, onDelete }: {
  title: string; meta: string; coverUri?: string; onPress: () => void; onDelete: () => void;
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
      <TouchableOpacity onPress={onDelete} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
        <Ionicons name="ellipsis-vertical" size={18} color={colors.textSecondary} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: spacing.screenPadding, paddingTop: 16 },

  heading: {
    color: colors.textPrimary, fontSize: 36, fontWeight: '800',
    letterSpacing: -0.9, lineHeight: 40, marginBottom: 16,
  },

  // Search Input (non-functional, display only)
  inputWrap: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.input, borderRadius: radii.pill,
    height: 48, paddingHorizontal: 16, marginBottom: spacing.sectionGap,
  },
  inputPlaceholder: { color: colors.textSecondary, fontSize: 16 },

  // Browse All
  section: { marginBottom: spacing.sectionGap },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  sectionTitle: { color: colors.textPrimary, fontSize: 24, fontWeight: '700', lineHeight: 32 },
  seeAll: { color: colors.primary, fontSize: 14, fontWeight: '600', lineHeight: 20 },
  catGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16 },
  catCardWrap: { width: CAT_W, height: 112 },
  catCard: {
    flex: 1, borderRadius: radii.xl, opacity: 0.9,
    justifyContent: 'center', paddingLeft: 16,
  },
  catTitle: { color: colors.textPrimary, fontSize: 18, fontWeight: '700', lineHeight: 28 },

  // Filter Tabs
  filterRow: { gap: 12, marginBottom: 24, paddingVertical: 4 },
  filterTab: {
    height: 40, paddingHorizontal: 24,
    borderRadius: radii.pill, backgroundColor: colors.input,
    justifyContent: 'center', alignItems: 'center',
  },
  filterTabActive: { backgroundColor: colors.primary },
  filterText: { color: colors.textSecondary, fontSize: 16, fontWeight: '600' },
  filterTextActive: { color: colors.teal },

  // Your Library
  libraryHeading: {
    color: colors.textPrimary, fontSize: 24, fontWeight: '700',
    lineHeight: 32, marginBottom: 16,
  },

  // Liked Songs
  likedCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.card, borderRadius: radii.xl,
    padding: 16, gap: 16, marginBottom: 16,
  },
  likedCoverWrap: { width: 96, height: 96, borderRadius: radii.xs },
  likedCoverGrad: {
    width: 96, height: 96, borderRadius: radii.xs,
    alignItems: 'center', justifyContent: 'center',
  },
  likedInfo: { flex: 1, gap: 4 },
  likedTitle: { color: colors.textPrimary, fontSize: 20, fontWeight: '700' },
  likedMeta: { color: colors.textSecondary, fontSize: 14, lineHeight: 16 },
  vizBars: { flexDirection: 'row', alignItems: 'flex-end', gap: 3, height: 16 },
  vizBar: { width: 3, borderRadius: 1.5, backgroundColor: colors.accent },

  // Library Items
  libItem: {
    flexDirection: 'row', alignItems: 'center',
    height: 80, gap: 12, borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  libCover: { width: 64, height: 64, borderRadius: radii.xs, backgroundColor: colors.input },
  libCoverPlaceholder: { alignItems: 'center', justifyContent: 'center' },
  libInfo: { flex: 1, gap: 4 },
  libTitle: { color: colors.textPrimary, fontSize: 16, fontWeight: '700', lineHeight: 24 },
  libMeta: { color: colors.textSecondary, fontSize: 12, lineHeight: 16 },

  // Create Playlist
  createBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingVertical: 20,
  },
  createText: { color: colors.primary, fontSize: 16, fontWeight: '600' },
});
