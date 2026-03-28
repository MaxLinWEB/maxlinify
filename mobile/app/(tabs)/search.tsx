import { useState, useCallback } from 'react';
import { View, Text, TextInput, FlatList, ScrollView, TouchableOpacity, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useDebounce } from '@/hooks/useDebounce';
import { musicApi } from '@/services/api';
import { usePlayerStore } from '@/store/playerStore';
import { useLibraryStore } from '@/store/libraryStore';
import { TrackCard } from '@/components/TrackCard';
import { EmptyState } from '@/components/EmptyState';
import { BottomSheet } from '@/components/BottomSheet';
import { colors, radii, spacing } from '@/constants/theme';
import type { SearchResult } from '@maxlinify/shared';

const { width: SW } = Dimensions.get('window');
const GRID_GAP = 24;
const COL_W = (SW - spacing.screenPadding * 2 - GRID_GAP) / 2;

const RECENT_SEARCHES = [
  { id: '1', name: 'Synthwave Afterlife', type: 'Playlist', image: require('../../assets/images/01f70a6d0935b1e96590b9a37f8f8053b79a9341.png') },
  { id: '2', name: 'Miles Davis', type: 'Artist', image: require('../../assets/images/0547279d628bd9b44a2e7158ea46b880e382ea61.png') },
  { id: '3', name: 'Lofi Beats 2024', type: 'Album', image: require('../../assets/images/09f1006d56ca738557d3fbcba668c8795a5b567d.png') },
];

const CATEGORIES = [
  { title: 'Electronic', grad: ['rgb(26,26,26)', 'rgb(38,38,38)'] as [string, string], overlay: 'rgba(58,249,231,0.3)', h: 159, angle: 135 },
  { title: 'Synthwave', grad: ['rgb(19,19,19)', 'rgb(32,32,31)'] as [string, string], overlay: 'rgba(47,248,1,0.2)', h: 159, angle: 135 },
  { title: 'Lo-fi', grad: ['rgb(26,26,26)', 'rgb(38,38,38)'] as [string, string], overlay: 'rgba(105,200,255,0.3)', h: 318, angle: 116.565 },
  { title: 'Rock', grad: ['rgb(19,19,19)', 'rgb(32,32,31)'] as [string, string], overlay: 'rgba(255,113,108,0.2)', h: 159, angle: 135 },
  { title: 'Hip Hop', grad: ['rgb(14,14,14)', 'rgb(38,38,38)'] as [string, string], overlay: 'rgba(53,246,228,0.3)', h: 159, angle: 135 },
  { title: 'Podcasts', grad: ['rgb(19,19,19)', 'rgb(38,38,38)'] as [string, string], overlay: 'rgba(47,248,1,0.3)', h: 159, angle: 135 },
  { title: 'New Releases', grad: ['rgb(19,19,19)', 'rgba(23,234,217,0.1)'] as [string, string], overlay: undefined, h: 159, angle: 135 },
];

function degToVector(deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180;
  const x = Math.cos(rad);
  const y = Math.sin(rad);
  return {
    start: { x: 0.5 - x / 2, y: 0.5 - y / 2 },
    end: { x: 0.5 + x / 2, y: 0.5 + y / 2 },
  };
}

function CatCard({ cat }: { cat: typeof CATEGORIES[0] }) {
  const { start, end } = degToVector(cat.angle);
  return (
    <TouchableOpacity activeOpacity={0.8} style={{ width: COL_W, height: cat.h }}>
      <LinearGradient
        colors={cat.grad}
        start={start}
        end={end}
        style={[styles.catCard, { height: cat.h }]}
      >
        {cat.overlay && (
          <View style={[styles.catOverlay, { backgroundColor: cat.overlay }]} />
        )}
        <Text style={styles.catTitle}>{cat.title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [sheetTrack, setSheetTrack] = useState<SearchResult | null>(null);
  const debouncedQuery = useDebounce(query, 300);
  const { currentTrack, setQueue } = usePlayerStore();
  const { addFavorite, removeFavorite, isFavorite } = useLibraryStore();
  const isSearching = debouncedQuery.length >= 2;

  const { data: results, isLoading } = useQuery({
    queryKey: ['search', debouncedQuery],
    queryFn: () => musicApi.search(debouncedQuery),
    enabled: isSearching,
    staleTime: 10 * 60 * 1000,
  });

  const handleTrackPress = useCallback((track: SearchResult) => {
    if (results) {
      const idx = results.findIndex((r) => r.id === track.id);
      setQueue(results, idx >= 0 ? idx : 0);
    }
  }, [results, setQueue]);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      {/* Search Input */}
      <View style={styles.inputWrap}>
        <Ionicons name="search" size={18} color="#adaaaa" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Artists, songs, or podcasts"
          placeholderTextColor="#adaaaa"
          value={query}
          onChangeText={setQuery}
          autoCorrect={false}
          returnKeyType="search"
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => setQuery('')} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Ionicons name="close-circle" size={18} color="#adaaaa" />
          </TouchableOpacity>
        )}
      </View>

      {isSearching ? (
        <FlatList
          key="results"
          data={results || []}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TrackCard
              track={item}
              onPress={handleTrackPress}
              onLongPress={setSheetTrack}
              isPlaying={currentTrack?.id === item.id}
            />
          )}
          ListEmptyComponent={
            isLoading ? (
              <ActivityIndicator color={colors.primary} style={{ marginTop: 60 }} size="large" />
            ) : (
              <EmptyState icon="search" title="No results" message={`Nothing found for "${debouncedQuery}"`} />
            )
          }
          contentContainerStyle={{ paddingBottom: 200 }}
          showsVerticalScrollIndicator={false}
          windowSize={10}
          maxToRenderPerBatch={10}
        />
      ) : (
        <ScrollView key="browse" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 200 }}>
          {/* Recent Searches */}
          <View style={styles.recentHeader}>
            <Text style={styles.recentTitle}>Recent Searches</Text>
            <TouchableOpacity>
              <Text style={styles.clearAll}>Clear all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.recentScroll}>
            {RECENT_SEARCHES.map((item) => (
              <TouchableOpacity key={item.id} style={styles.recentChip} activeOpacity={0.7} onPress={() => setQuery(item.name)}>
                <Image source={item.image} style={styles.recentAvatar} />
                <View style={styles.recentInfo}>
                  <Text style={styles.recentName} numberOfLines={1}>{item.name}</Text>
                  <Text style={styles.recentType}>{item.type}</Text>
                </View>
                <Ionicons name="chevron-forward" size={14} color="#adaaaa" />
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Browse All */}
          <Text style={styles.browseHeading}>Browse All</Text>
          <View style={styles.catGrid}>
            {/* Row 1: Electronic + Synthwave */}
            <View style={styles.catRow}>
              <CatCard cat={CATEGORIES[0]} />
              <CatCard cat={CATEGORIES[1]} />
            </View>
            {/* Row 2: Lo-fi (tall) + Rock & Hip Hop stacked */}
            <View style={styles.catRow}>
              <CatCard cat={CATEGORIES[2]} />
              <View style={{ gap: GRID_GAP, width: COL_W }}>
                <CatCard cat={CATEGORIES[3]} />
                <CatCard cat={CATEGORIES[4]} />
              </View>
            </View>
            {/* Row 3: Podcasts + New Releases */}
            <View style={styles.catRow}>
              <CatCard cat={CATEGORIES[5]} />
              <CatCard cat={CATEGORIES[6]} />
            </View>
          </View>
        </ScrollView>
      )}

      <BottomSheet
        visible={!!sheetTrack}
        track={sheetTrack}
        onClose={() => setSheetTrack(null)}
        onAddToQueue={() => { if (sheetTrack) usePlayerStore.getState().addToQueue(sheetTrack); }}
        onAddToFavorites={() => {
          if (sheetTrack) isFavorite(sheetTrack.id) ? removeFavorite(sheetTrack.id) : addFavorite(sheetTrack);
        }}
        onAddToPlaylist={() => {}}
        isFavorite={sheetTrack ? isFavorite(sheetTrack.id) : false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },

  // Search Input
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#262626',
    borderRadius: 9999,
    marginHorizontal: spacing.screenPadding,
    marginTop: 16,
    marginBottom: 24,
    paddingLeft: 56,
    paddingRight: 24,
    paddingTop: 23,
    paddingBottom: 24,
  },
  inputIcon: {
    position: 'absolute',
    left: 20,
  },
  input: {
    flex: 1,
    color: colors.textPrimary,
    fontFamily: 'Inter_500Medium',
    fontSize: 18,
    padding: 0,
  },

  // Recent Searches
  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.screenPadding,
    marginBottom: 16,
  },
  recentTitle: {
    color: '#ffffff',
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  clearAll: {
    color: '#3af9e7',
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    fontWeight: '600',
  },
  recentScroll: {
    paddingHorizontal: spacing.screenPadding,
    gap: 12,
  },
  recentChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#131313',
    borderRadius: 9999,
    paddingLeft: 8,
    paddingRight: 16,
    paddingVertical: 8,
    height: 64,
    gap: 12,
  },
  recentAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  recentInfo: {
    gap: 2,
  },
  recentName: {
    color: '#ffffff',
    fontFamily: 'Inter_700Bold',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 17.5,
  },
  recentType: {
    color: '#adaaaa',
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
  },

  // Browse All
  browseHeading: {
    color: '#ffffff',
    fontFamily: 'PlusJakartaSans-ExtraBold',
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.6,
    paddingHorizontal: spacing.screenPadding,
    marginTop: 32,
    marginBottom: 16,
  },
  catGrid: {
    paddingHorizontal: spacing.screenPadding,
    gap: GRID_GAP,
  },
  catRow: {
    flexDirection: 'row',
    gap: GRID_GAP,
  },
  catCard: {
    borderRadius: 32,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    padding: 20,
  },
  catOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 32,
  },
  catTitle: {
    color: '#ffffff',
    fontFamily: 'PlusJakartaSans-ExtraBold',
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.6,
  },
});
