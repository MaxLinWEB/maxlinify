import { useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, RefreshControl, StyleSheet, Alert } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { musicApi } from '@/services/api';
import { usePlayerStore } from '@/store/playerStore';
import { useLibraryStore } from '@/store/libraryStore';
import { useResponsive } from '@/hooks/useResponsive';
import { hapticLight, hapticSelection } from '@/utils/haptics';
import { SkeletonHero, SkeletonBentoGrid, SkeletonArtistRow } from '@/components/Skeleton';
import { ErrorRetry } from '@/components/ErrorRetry';
import { colors, fonts, radii, spacing, layout } from '@/constants/theme';
import type { SearchResult } from '@maxlinify/shared';

// Static fallback images
const HERO_IMAGE = require('../../assets/images/5ca80e82823bf9531a84296107ea788e9b4ae244.jpg');
const LOGO_IMAGE = require('../../assets/images/11d3c7cfd916f92a90f96ac8a0e05dc49b7473d6.jpg');

const FALLBACK_ARTISTS = [
  { id: '1', name: 'Zade Flux', image: require('../../assets/images/2f71927052d3f161efe2fc72a97ea8e70aa2273d.jpg'), active: true },
  { id: '2', name: 'Luna Skye', image: require('../../assets/images/38358840cdac4d0e9b88db2a02d08f54487c8392.jpg'), active: false },
  { id: '3', name: 'Marcus Grey', image: require('../../assets/images/553475d46c989856b8cd04ac357408f87a72740b.jpg'), active: false },
  { id: '4', name: 'Elias Blue', image: require('../../assets/images/e8782826383e466be1ac64e94fff13c1382be97e.jpg'), active: false },
  { id: '5', name: 'Synthetix', image: require('../../assets/images/d95dea049a6294dce8b0a2ed34eb6e02db197d1d.jpg'), active: false },
];

const MIX_IMAGES = [
  require('../../assets/images/7a2b988ddf6f035f19267befea55369245cd0749.jpg'),
  require('../../assets/images/ae15f3c110d400c31008087ccde1b830718dc4ba.jpg'),
];

export default function HomeScreen() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { width, scale, screenPadding } = useResponsive();
  const { setQueue } = usePlayerStore();
  const { favorites, isFavorite, addFavorite, removeFavorite } = useLibraryStore();

  const BENTO_GAP = 16;
  const BENTO_HALF = (width - screenPadding * 2 - BENTO_GAP) / 2;
  const MIX_CARD_W = (width - screenPadding * 2 - 16) / 2;

  // Dynamic content via search API
  const {
    data: trendingTracks,
    isLoading: trendingLoading,
    isError: trendingError,
    refetch: refetchTrending,
  } = useQuery({
    queryKey: ['home-trending'],
    queryFn: () => musicApi.search('trending hits'),
    staleTime: 30 * 60 * 1000,
  });

  const {
    data: lofiTracks,
    isLoading: lofiLoading,
    refetch: refetchLofi,
  } = useQuery({
    queryKey: ['home-lofi'],
    queryFn: () => musicApi.search('lo-fi beats'),
    staleTime: 30 * 60 * 1000,
  });

  const {
    data: electronicTracks,
    isLoading: electronicLoading,
    refetch: refetchElectronic,
  } = useQuery({
    queryKey: ['home-electronic'],
    queryFn: () => musicApi.search('electronic mix'),
    staleTime: 30 * 60 * 1000,
  });

  const isRefreshing = trendingLoading && !!trendingTracks;
  const bentoTracks = trendingTracks?.slice(0, 4) || [];
  const fullWidthTrack = trendingTracks?.[4];
  const heroTrack = trendingTracks?.[0];

  const handleRefresh = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ['home-trending'] });
    queryClient.invalidateQueries({ queryKey: ['home-lofi'] });
    queryClient.invalidateQueries({ queryKey: ['home-electronic'] });
  }, [queryClient]);

  const handleTrackPress = useCallback((tracks: SearchResult[], index: number) => {
    hapticLight();
    setQueue(tracks, index);
  }, [setQueue]);

  const handleHeroLike = useCallback(() => {
    if (!heroTrack) return;
    hapticSelection();
    isFavorite(heroTrack.id) ? removeFavorite(heroTrack.id) : addFavorite(heroTrack);
  }, [heroTrack, isFavorite, addFavorite, removeFavorite]);

  const handleArtistPress = useCallback((name: string) => {
    hapticLight();
    router.push({ pathname: '/(tabs)/search', params: { q: name } });
  }, [router]);

  const handleProfilePress = useCallback(() => {
    Alert.alert(
      'MaxLinify',
      'Version 1.0.0\nA modern music streaming experience.',
      [{ text: 'OK' }],
    );
  }, []);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, { paddingHorizontal: screenPadding }]}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoRow}>
            <LinearGradient colors={[colors.primary, colors.primaryDark]} style={styles.logoBadge}>
              <Text style={styles.logoChar}>M</Text>
            </LinearGradient>
            <Text style={styles.logoText}>MaxLinify</Text>
          </View>
          <TouchableOpacity onPress={handleProfilePress} activeOpacity={0.7}>
            <LinearGradient
              colors={[colors.primary, colors.accent]}
              style={styles.profileBtn}
            >
              <View style={styles.profileInner}>
                <Ionicons name="person" size={18} color={colors.textSecondary} />
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Hero Section */}
        {trendingLoading && !trendingTracks ? (
          <SkeletonHero />
        ) : trendingError ? (
          <ErrorRetry message="Couldn't load content" onRetry={() => refetchTrending()} />
        ) : (
          <View style={[styles.heroCard, { height: scale(214) }]}>
            <Image
              source={heroTrack?.coverUrl ? { uri: heroTrack.coverUrl } : HERO_IMAGE}
              style={styles.heroImage}
              contentFit="cover"
            />
            <LinearGradient colors={['transparent', 'rgba(14,14,14,0.4)', '#0e0e0e']} style={styles.heroGradient} />
            <View style={styles.heroContent}>
              <Text style={styles.heroLabel}>
                {heroTrack ? 'TRENDING NOW' : 'NEW RELEASE'}
              </Text>
              <Text style={styles.heroTitle} numberOfLines={2}>
                {heroTrack?.title || 'Neon Pulse\nAnthology'}
              </Text>
              {heroTrack && (
                <Text style={styles.heroArtist} numberOfLines={1}>{heroTrack.artist}</Text>
              )}
              <View style={styles.heroActions}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    if (trendingTracks?.length) handleTrackPress(trendingTracks, 0);
                  }}
                >
                  <LinearGradient
                    colors={[colors.primary, colors.primaryDark]}
                    start={{ x: 0.3, y: 0 }}
                    end={{ x: 0.9, y: 1 }}
                    style={styles.heroPlayBtn}
                  >
                    <Ionicons name="play" size={14} color={colors.teal} style={{ marginLeft: 2 }} />
                    <Text style={styles.heroPlayText}>Play Now</Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity style={styles.heroGlassBtn} activeOpacity={0.7} onPress={handleHeroLike}>
                  <Ionicons
                    name={heroTrack && isFavorite(heroTrack.id) ? 'heart' : 'heart-outline'}
                    size={22}
                    color="#ffffff"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        {/* Jump back in */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeading}>Jump back in</Text>
            <TouchableOpacity onPress={() => router.push({ pathname: '/(tabs)/search', params: { q: 'trending' } })}>
              <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>

          {trendingLoading && !trendingTracks ? (
            <SkeletonBentoGrid />
          ) : (
            <View style={styles.bentoGrid}>
              {bentoTracks.map((track, index) => (
                <TouchableOpacity
                  key={track.id}
                  style={[styles.bentoCard, { width: BENTO_HALF }]}
                  activeOpacity={0.8}
                  onPress={() => handleTrackPress(trendingTracks!, index)}
                >
                  <Image source={{ uri: track.coverUrl }} style={styles.bentoImage} contentFit="cover" />
                  <View style={styles.bentoTextWrap}>
                    <Text style={styles.bentoTitle} numberOfLines={1}>{track.title}</Text>
                    <Text style={styles.bentoSubtitle} numberOfLines={1}>{track.artist}</Text>
                  </View>
                </TouchableOpacity>
              ))}

              {fullWidthTrack && (
                <TouchableOpacity
                  style={styles.bentoCardFull}
                  activeOpacity={0.8}
                  onPress={() => handleTrackPress(trendingTracks!, 4)}
                >
                  <Image source={{ uri: fullWidthTrack.coverUrl }} style={styles.bentoFullImage} contentFit="cover" />
                  <View style={styles.bentoFullOverlay}>
                    <Text style={styles.bentoFullTitle}>{fullWidthTrack.title}</Text>
                    <Text style={styles.bentoFullSubtitle}>{fullWidthTrack.artist}</Text>
                  </View>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>

        {/* Top Artists */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeading}>Top Artists</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.artistScroll}>
            {FALLBACK_ARTISTS.map((a) => (
              <TouchableOpacity
                key={a.id}
                style={styles.artistItem}
                activeOpacity={0.8}
                onPress={() => handleArtistPress(a.name)}
              >
                <View style={[styles.artistBorder, { borderColor: a.active ? colors.primary : 'rgba(0,0,0,0)' }]}>
                  <Image source={a.image} style={styles.artistImage} contentFit="cover" />
                </View>
                <Text style={styles.artistName} numberOfLines={1}>{a.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Made for you */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeading}>Made for you</Text>
          </View>
          <View style={styles.mixesRow}>
            {[
              { title: 'Lo-fi Beats', subtitle: `${lofiTracks?.length || 0} songs`, tracks: lofiTracks, image: MIX_IMAGES[0] },
              { title: 'Electronic Mix', subtitle: `${electronicTracks?.length || 0} songs`, tracks: electronicTracks, image: MIX_IMAGES[1] },
            ].map((mix, idx) => (
              <TouchableOpacity
                key={idx}
                style={[styles.mixCard, { width: MIX_CARD_W }]}
                activeOpacity={0.8}
                onPress={() => {
                  if (mix.tracks?.length) handleTrackPress(mix.tracks, 0);
                }}
              >
                <Image source={mix.image} style={styles.mixImage} contentFit="cover" />
                <LinearGradient colors={['transparent', 'rgba(0,0,0,0.7)']} style={styles.mixOverlay} />
                <View style={styles.mixInfo}>
                  <Text style={styles.mixTitle}>{mix.title}</Text>
                  <Text style={styles.mixSubtitle}>{mix.subtitle}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recently Liked */}
        {favorites.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionHeading}>Recently Liked</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12 }}>
              {favorites.slice(0, 8).map((track) => (
                <TouchableOpacity
                  key={track.id}
                  style={styles.likedChip}
                  activeOpacity={0.8}
                  onPress={() => {
                    hapticLight();
                    setQueue(favorites as any, favorites.findIndex((f) => f.id === track.id));
                  }}
                >
                  <Image source={{ uri: track.coverUrl }} style={styles.likedChipImage} contentFit="cover" />
                  <Text style={styles.likedChipTitle} numberOfLines={1}>{track.title}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        <View style={{ height: layout.bottomListPadding }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  scroll: { flex: 1 },
  content: {},

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  logoRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  logoBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoChar: {
    color: colors.teal,
    fontFamily: fonts.headingItalic,
    fontWeight: '700',
    fontStyle: 'italic',
    fontSize: 16,
  },
  logoText: {
    color: colors.primary,
    fontFamily: fonts.headingItalic,
    fontSize: 24,
    fontWeight: '800',
    fontStyle: 'italic',
    letterSpacing: -1.2,
  },
  profileBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    padding: 2,
  },
  profileInner: {
    flex: 1,
    borderRadius: 19,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Hero
  heroCard: {
    borderRadius: radii.xl,
    overflow: 'hidden',
    marginBottom: spacing.sectionGap,
  },
  heroImage: { ...StyleSheet.absoluteFillObject },
  heroGradient: { ...StyleSheet.absoluteFillObject },
  heroContent: {
    position: 'absolute',
    bottom: 24,
    left: 24,
    right: 24,
    gap: 4,
  },
  heroLabel: {
    color: colors.accent,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2.4,
    lineHeight: 16,
    textTransform: 'uppercase',
  },
  heroTitle: {
    color: colors.textPrimary,
    fontFamily: fonts.heading,
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: -1.8,
    lineHeight: 38,
  },
  heroArtist: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  heroActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 8,
  },
  heroPlayBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: radii.pill,
  },
  heroPlayText: {
    color: colors.teal,
    fontSize: 15,
    fontWeight: '700',
  },
  heroGlassBtn: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },

  // Sections
  section: { marginBottom: spacing.sectionGap },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sectionHeading: {
    color: colors.textPrimary,
    fontFamily: fonts.heading,
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: -0.6,
    lineHeight: 28,
  },
  viewAll: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '700',
  },

  // Bento Grid
  bentoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  bentoCard: {
    backgroundColor: colors.cardAlt,
    borderRadius: radii.xl,
    padding: 14,
  },
  bentoImage: {
    width: '100%',
    height: 120,
    borderRadius: radii.xs,
  },
  bentoTextWrap: {
    marginTop: 10,
    alignItems: 'center',
  },
  bentoTitle: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
  },
  bentoSubtitle: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'center',
    marginTop: 2,
  },
  bentoCardFull: {
    width: '100%',
    height: 120,
    backgroundColor: colors.cardAlt,
    borderRadius: radii.xl,
    overflow: 'hidden',
  },
  bentoFullImage: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.4,
  },
  bentoFullOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bentoFullTitle: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  bentoFullSubtitle: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'center',
    marginTop: 4,
  },

  // Artists
  artistScroll: { gap: 20 },
  artistItem: { alignItems: 'center', width: 88, gap: 8 },
  artistBorder: {
    width: 88,
    height: 88,
    borderRadius: 44,
    padding: 4,
    borderWidth: 2,
    overflow: 'hidden',
  },
  artistImage: { width: '100%', height: '100%', borderRadius: 40 },
  artistName: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },

  // Personal Mixes
  mixesRow: {
    flexDirection: 'row',
    gap: 16,
  },
  mixCard: {
    height: 200,
    borderRadius: radii.xl,
    overflow: 'hidden',
    backgroundColor: colors.card,
  },
  mixImage: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.6,
  },
  mixOverlay: { ...StyleSheet.absoluteFillObject },
  mixInfo: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    gap: 4,
  },
  mixTitle: {
    color: colors.textPrimary,
    fontSize: 17,
    fontWeight: '700',
    lineHeight: 22,
  },
  mixSubtitle: {
    color: colors.textSecondary,
    fontSize: 12,
    lineHeight: 16,
  },

  // Recently Liked
  likedChip: {
    width: 120,
    backgroundColor: colors.card,
    borderRadius: radii.md,
    overflow: 'hidden',
  },
  likedChipImage: {
    width: 120,
    height: 120,
    borderRadius: radii.md,
  },
  likedChipTitle: {
    color: colors.textPrimary,
    fontSize: 12,
    fontWeight: '600',
    padding: 8,
    textAlign: 'center',
  },
});
