import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, fonts, radii, spacing } from '@/constants/theme';

const { width: SCREEN_W } = Dimensions.get('window');
const BENTO_GAP = 16;
const BENTO_HALF = (SCREEN_W - spacing.screenPadding * 2 - BENTO_GAP) / 2;
const MIX_CARD_W = (SCREEN_W - spacing.screenPadding * 2 - 16) / 2;

// Image assets
const HERO_IMAGE = require('../../assets/images/5ca80e82823bf9531a84296107ea788e9b4ae244.png');
const LOGO_IMAGE = require('../../assets/images/11d3c7cfd916f92a90f96ac8a0e05dc49b7473d6.png');

const JUMP_BACK_IN = [
  {
    id: '1',
    title: 'Soul Sessions',
    artist: 'Ariel Vibe',
    image: require('../../assets/images/3e518d173ab6921e86cee7290fba2fca28654555.png'),
  },
  {
    id: '2',
    title: 'Midnight Rave',
    artist: 'Collective',
    image: require('../../assets/images/885273e7e9b84061200dd12e00153d3af1f9ff8b.png'),
  },
  {
    id: '3',
    title: 'Lo-fi Beats',
    artist: 'Coffee Morning',
    image: require('../../assets/images/09f1006d56ca738557d3fbcba668c8795a5b567d.png'),
  },
  {
    id: '4',
    title: 'Modern Jazz',
    artist: 'Night Quintet',
    image: require('../../assets/images/832999fface0889a2d3395f01f32d48ea18d6d05.png'),
  },
];

const ULTRA_BASS_IMAGE = require('../../assets/images/bca4e37e60659dc2741756e0f8ada31a5b4a6701.png');

const TOP_ARTISTS = [
  {
    id: '1',
    name: 'Zade Flux',
    image: require('../../assets/images/2f71927052d3f161efe2fc72a97ea8e70aa2273d.png'),
    active: true,
  },
  {
    id: '2',
    name: 'Luna Skye',
    image: require('../../assets/images/38358840cdac4d0e9b88db2a02d08f54487c8392.png'),
    active: false,
  },
  {
    id: '3',
    name: 'Marcus Grey',
    image: require('../../assets/images/553475d46c989856b8cd04ac357408f87a72740b.png'),
    active: false,
  },
  {
    id: '4',
    name: 'Elias Blue',
    image: require('../../assets/images/e8782826383e466be1ac64e94fff13c1382be97e.png'),
    active: false,
  },
  {
    id: '5',
    name: 'Synthetix',
    image: require('../../assets/images/d95dea049a6294dce8b0a2ed34eb6e02db197d1d.png'),
    active: false,
  },
];

const PERSONAL_MIXES = [
  {
    id: '1',
    title: 'Daily Mix 1',
    subtitle: '6 songs \u2022 Made for you',
    image: require('../../assets/images/7a2b988ddf6f035f19267befea55369245cd0749.png'),
  },
  {
    id: '2',
    title: 'Discovery Weekly',
    subtitle: '30 songs \u2022 Updated Fri',
    image: require('../../assets/images/ae15f3c110d400c31008087ccde1b830718dc4ba.png'),
  },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoRow}>
            <LinearGradient
              colors={[colors.primary, colors.primaryDark]}
              style={styles.logoBadge}
            >
              <Text style={styles.logoChar}>M</Text>
            </LinearGradient>
            <Text style={styles.logoText}>MaxLinify</Text>
          </View>
          <TouchableOpacity style={styles.profileBtn}>
            <View style={styles.profilePlaceholder} />
          </TouchableOpacity>
        </View>

        {/* Hero Section */}
        <View style={styles.heroCard}>
          <Image source={HERO_IMAGE} style={styles.heroImage} contentFit="cover" />
          <LinearGradient
            colors={['transparent', 'rgba(14,14,14,0.4)', '#0e0e0e']}
            style={styles.heroGradient}
          />
          <View style={styles.heroContent}>
            <Text style={styles.heroLabel}>NEW RELEASE</Text>
            <Text style={styles.heroTitle}>{'Neon Pulse\nAnthology'}</Text>
            <View style={styles.heroActions}>
              <TouchableOpacity activeOpacity={0.8}>
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
              <TouchableOpacity style={styles.heroGlassBtn} activeOpacity={0.7}>
                <Ionicons name="heart-outline" size={22} color="#ffffff" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Jump back in */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeading}>Jump back in</Text>
            <TouchableOpacity>
              <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.bentoGrid}>
            {JUMP_BACK_IN.map((item) => (
              <TouchableOpacity key={item.id} style={styles.bentoCard} activeOpacity={0.8}>
                <Image source={item.image} style={styles.bentoImage} contentFit="cover" />
                <View style={styles.bentoTextWrap}>
                  <Text style={styles.bentoTitle} numberOfLines={1}>
                    {item.title}
                  </Text>
                  <Text style={styles.bentoSubtitle} numberOfLines={1}>
                    {item.artist}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}

            {/* Ultra Bass FM — full width 5th card */}
            <TouchableOpacity
              style={styles.bentoCardFull}
              activeOpacity={0.8}
            >
              <Image
                source={ULTRA_BASS_IMAGE}
                style={[styles.bentoFullImage]}
                contentFit="cover"
              />
              <View style={styles.bentoFullOverlay}>
                <Text style={styles.bentoFullTitle}>Ultra Bass FM</Text>
                <Text style={styles.bentoFullSubtitle}>Electronic Hits</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Top Artists */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeading}>Top Artists</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.artistScroll}
          >
            {TOP_ARTISTS.map((a) => (
              <TouchableOpacity key={a.id} style={styles.artistItem} activeOpacity={0.8}>
                <View
                  style={[
                    styles.artistBorder,
                    { borderColor: a.active ? colors.primary : 'rgba(0,0,0,0)' },
                  ]}
                >
                  <Image source={a.image} style={styles.artistImage} contentFit="cover" />
                </View>
                <Text style={styles.artistName} numberOfLines={1}>
                  {a.name}
                </Text>
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
            {PERSONAL_MIXES.map((mix) => (
              <TouchableOpacity key={mix.id} style={styles.mixCard} activeOpacity={0.8}>
                <Image
                  source={mix.image}
                  style={styles.mixImage}
                  contentFit="cover"
                  blurRadius={0}
                />
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.6)']}
                  style={styles.mixOverlay}
                />
                <View style={styles.mixInfo}>
                  <Text style={styles.mixTitle}>{mix.title}</Text>
                  <Text style={styles.mixSubtitle}>{mix.subtitle}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Bottom padding for mini player + tab bar */}
        <View style={{ height: 200 }} />
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
    paddingHorizontal: spacing.screenPadding,
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
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: colors.input,
  },
  profilePlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.input,
  },

  // Hero
  heroCard: {
    marginHorizontal: spacing.screenPadding,
    height: 214,
    borderRadius: radii.xl,
    overflow: 'hidden',
    marginBottom: spacing.sectionGap,
  },
  heroImage: { ...StyleSheet.absoluteFillObject },
  heroGradient: { ...StyleSheet.absoluteFillObject },
  heroContent: {
    position: 'absolute',
    bottom: 32,
    left: 32,
    right: 32,
    gap: 8,
  },
  heroLabel: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2.4,
    lineHeight: 16,
    textTransform: 'uppercase',
  },
  heroTitle: {
    color: colors.textPrimary,
    fontFamily: fonts.heading,
    fontSize: 36,
    fontWeight: '800',
    letterSpacing: -1.8,
    lineHeight: 45,
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
    paddingHorizontal: 32,
    borderRadius: radii.pill,
  },
  heroPlayText: {
    color: colors.teal,
    fontSize: 16,
    fontWeight: '700',
  },
  heroGlassBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
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
    paddingHorizontal: spacing.screenPadding,
    marginBottom: 16,
  },
  sectionHeading: {
    color: colors.textPrimary,
    fontFamily: fonts.subheading,
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: -0.6,
    lineHeight: 32,
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
    paddingHorizontal: spacing.screenPadding,
    gap: BENTO_GAP,
  },
  bentoCard: {
    width: BENTO_HALF,
    backgroundColor: colors.cardAlt,
    borderRadius: radii.xl,
    padding: 16,
  },
  bentoImage: {
    width: '100%',
    height: 131,
    borderRadius: radii.xs,
  },
  bentoTextWrap: {
    marginTop: 12,
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
  artistScroll: { paddingHorizontal: spacing.screenPadding, gap: 20 },
  artistItem: { alignItems: 'center', width: 96, gap: 8 },
  artistBorder: {
    width: 96,
    height: 96,
    borderRadius: 48,
    padding: 6,
    borderWidth: 2,
    overflow: 'hidden',
  },
  artistImage: { width: '100%', height: '100%', borderRadius: 42 },
  artistName: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
  },

  // Personal Mixes — Glass Cards
  mixesRow: {
    flexDirection: 'row',
    paddingHorizontal: spacing.screenPadding,
    gap: 16,
  },
  mixCard: {
    flex: 1,
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
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 24,
  },
  mixSubtitle: {
    color: colors.textSecondary,
    fontSize: 12,
    lineHeight: 16,
  },
});
