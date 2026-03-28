import { useState, useCallback, useEffect } from 'react';
import { View, Text, TextInput, FlatList, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { useDebounce } from '@/hooks/useDebounce';
import { useResponsive } from '@/hooks/useResponsive';
import { musicApi } from '@/services/api';
import { usePlayerStore } from '@/store/playerStore';
import { useLibraryStore } from '@/store/libraryStore';
import { useSearchStore } from '@/store/searchStore';
import { TrackCard } from '@/components/TrackCard';
import { EmptyState } from '@/components/EmptyState';
import { ErrorRetry } from '@/components/ErrorRetry';
import { BottomSheet } from '@/components/BottomSheet';
import { SkeletonTrackCard } from '@/components/Skeleton';
import { hapticLight, hapticSelection } from '@/utils/haptics';
import { colors, radii, spacing, layout } from '@/constants/theme';
import type { SearchResult } from '@maxlinify/shared';

const CATEGORIES = [
  { title: 'Electronic', grad: ['rgb(26,26,26)', 'rgb(38,38,38)'] as [string, string], overlay: 'rgba(58,249,231,0.3)', h: 150, angle: 135 },
  { title: 'Synthwave', grad: ['rgb(19,19,19)', 'rgb(32,32,31)'] as [string, string], overlay: 'rgba(47,248,1,0.2)', h: 150, angle: 135 },
  { title: 'Lo-fi', grad: ['rgb(26,26,26)', 'rgb(38,38,38)'] as [string, string], overlay: 'rgba(105,200,255,0.3)', h: 150, angle: 116 },
  { title: 'Rock', grad: ['rgb(19,19,19)', 'rgb(32,32,31)'] as [string, string], overlay: 'rgba(255,113,108,0.2)', h: 150, angle: 135 },
  { title: 'Hip Hop', grad: ['rgb(14,14,14)', 'rgb(38,38,38)'] as [string, string], overlay: 'rgba(53,246,228,0.3)', h: 150, angle: 135 },
  { title: 'Podcasts', grad: ['rgb(19,19,19)', 'rgb(38,38,38)'] as [string, string], overlay: 'rgba(47,248,1,0.3)', h: 150, angle: 135 },
  { title: 'New Releases', grad: ['rgb(19,19,19)', 'rgba(23,234,217,0.1)'] as [string, string], overlay: undefined, h: 150, angle: 135 },
  { title: 'Jazz', grad: ['rgb(26,26,26)', 'rgb(38,38,38)'] as [string, string], overlay: 'rgba(249,115,22,0.25)', h: 150, angle: 135 },
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

export default function SearchScreen() {
  const params = useLocalSearchParams<{ q?: string }>();
  const [query, setQuery] = useState('');
  const [sheetTrack, setSheetTrack] = useState<SearchResult | null>(null);
  const debouncedQuery = useDebounce(query, 300);
  const { width, screenPadding } = useResponsive();
  const { currentTrack, setQueue } = usePlayerStore();
  const { addFavorite, removeFavorite, isFavorite } = useLibraryStore();
  const { recentSearches, addRecentSearch, removeRecentSearch, clearRecentSearches } = useSearchStore();
  const isSearching = debouncedQuery.length >= 2;

  const GRID_GAP = 16;
  const COL_W = (width - screenPadding * 2 - GRID_GAP) / 2;

  // Pre-fill query from route params
  useEffect(() => {
    if (params.q) setQuery(params.q);
  }, [params.q]);

  const { data: results, isLoading, isError, refetch } = useQuery({
    queryKey: ['search', debouncedQuery],
    queryFn: () => musicApi.search(debouncedQuery),
    enabled: isSearching,
    staleTime: 10 * 60 * 1000,
  });

  const handleTrackPress = useCallback((track: SearchResult) => {
    hapticLight();
    if (results) {
      const idx = results.findIndex((r) => r.id === track.id);
      setQueue(results, idx >= 0 ? idx : 0);
    }
    if (debouncedQuery.length >= 2) {
      addRecentSearch(debouncedQuery);
    }
  }, [results, setQueue, debouncedQuery, addRecentSearch]);

  const handleCategoryPress = useCallback((title: string) => {
    hapticSelection();
    setQuery(title);
  }, []);

  const handleRecentPress = useCallback((q: string) => {
    hapticLight();
    setQuery(q);
  }, []);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      {/* Search Input */}
      <View style={[styles.inputWrap, { marginHorizontal: screenPadding }]}>
        <Ionicons name="search" size={18} color={colors.textSecondary} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Artists, songs, or podcasts"
          placeholderTextColor={colors.textSecondary}
          value={query}
          onChangeText={setQuery}
          autoCorrect={false}
          returnKeyType="search"
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => { setQuery(''); hapticLight(); }} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Ionicons name="close-circle" size={18} color={colors.textSecondary} />
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
              <View>
                {[1, 2, 3, 4, 5, 6].map((i) => <SkeletonTrackCard key={i} />)}
              </View>
            ) : isError ? (
              <ErrorRetry message="Search failed. Check your connection." onRetry={() => refetch()} />
            ) : (
              <EmptyState icon="search" title="No results" message={`Nothing found for "${debouncedQuery}"`} />
            )
          }
          contentContainerStyle={{ paddingBottom: layout.bottomListPadding }}
          showsVerticalScrollIndicator={false}
          windowSize={10}
          maxToRenderPerBatch={10}
        />
      ) : (
        <ScrollView key="browse" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: layout.bottomListPadding }}>
          {/* Recent Searches */}
          {recentSearches.length > 0 && (
            <>
              <View style={[styles.recentHeader, { paddingHorizontal: screenPadding }]}>
                <Text style={styles.recentTitle}>Recent Searches</Text>
                <TouchableOpacity onPress={() => { clearRecentSearches(); hapticSelection(); }}>
                  <Text style={styles.clearAll}>Clear all</Text>
                </TouchableOpacity>
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={[styles.recentScroll, { paddingHorizontal: screenPadding }]}>
                {recentSearches.slice(0, 10).map((item) => (
                  <TouchableOpacity
                    key={item.query}
                    style={styles.recentChip}
                    activeOpacity={0.7}
                    onPress={() => handleRecentPress(item.query)}
                  >
                    <Ionicons name="time-outline" size={16} color={colors.textSecondary} style={{ marginLeft: 4 }} />
                    <Text style={styles.recentName} numberOfLines={1}>{item.query}</Text>
                    <TouchableOpacity
                      onPress={() => { removeRecentSearch(item.query); hapticLight(); }}
                      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    >
                      <Ionicons name="close" size={14} color={colors.textSecondary} />
                    </TouchableOpacity>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </>
          )}

          {/* Browse All */}
          <Text style={[styles.browseHeading, { paddingHorizontal: screenPadding }]}>Browse All</Text>
          <View style={[styles.catGrid, { paddingHorizontal: screenPadding }]}>
            {CATEGORIES.map((cat) => {
              const { start, end } = degToVector(cat.angle);
              return (
                <TouchableOpacity
                  key={cat.title}
                  activeOpacity={0.8}
                  style={{ width: COL_W }}
                  onPress={() => handleCategoryPress(cat.title)}
                >
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
            })}
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
    backgroundColor: colors.input,
    borderRadius: radii.pill,
    marginTop: 16,
    marginBottom: 24,
    paddingLeft: 48,
    paddingRight: 20,
    height: 52,
  },
  inputIcon: {
    position: 'absolute',
    left: 18,
  },
  input: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: 16,
    padding: 0,
  },

  // Recent Searches
  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  recentTitle: {
    color: colors.textPrimary,
    fontFamily: 'PlusJakartaSans-ExtraBold',
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  clearAll: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  recentScroll: {
    gap: 10,
    marginBottom: 8,
  },
  recentChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: radii.pill,
    paddingLeft: 12,
    paddingRight: 14,
    paddingVertical: 10,
    gap: 10,
  },
  recentName: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '600',
    maxWidth: 140,
  },

  // Browse All
  browseHeading: {
    color: colors.textPrimary,
    fontFamily: 'PlusJakartaSans-ExtraBold',
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.6,
    marginTop: 24,
    marginBottom: 16,
  },
  catGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  catCard: {
    borderRadius: radii.xl,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    padding: 20,
  },
  catOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: radii.xl,
  },
  catTitle: {
    color: colors.textPrimary,
    fontFamily: 'PlusJakartaSans-ExtraBold',
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.6,
  },
});
