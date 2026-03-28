import type { TextStyle, ViewStyle } from 'react-native';

export const colors = {
  // Backgrounds
  background: '#0e0e0e',
  card: '#131313',
  cardAlt: '#20201f',
  input: '#262626',
  cardTranslucent60: 'rgba(19, 19, 19, 0.6)',
  cardTranslucent80: 'rgba(19, 19, 19, 0.8)',
  navBg: 'rgba(19, 19, 19, 0.9)',

  // Primary
  primary: '#3af9e7',
  primaryDark: '#17ead9',
  accent: '#2ff801',
  teal: '#005a53',

  // Text
  textPrimary: '#ffffff',
  textSecondary: '#adaaaa',

  // Borders
  border: 'rgba(255, 255, 255, 0.05)',
  borderLight: 'rgba(255, 255, 255, 0.1)',
  divider: 'rgba(72, 72, 71, 0.1)',

  // Extras
  blue: '#69c8ff',
  red: 'rgb(255, 113, 108)',
  purple: 'rgb(147, 51, 234)',
  orange: 'rgb(249, 115, 22)',

  // Category gradient pairs
  categoryGenres: ['rgb(147, 51, 234)', 'rgb(49, 46, 129)'] as [string, string],
  categoryMoods: ['rgb(16, 185, 129)', 'rgb(17, 94, 89)'] as [string, string],
  categoryPodcasts: ['rgb(249, 115, 22)', 'rgb(185, 28, 28)'] as [string, string],
  categoryNewHits: ['rgb(37, 99, 235)', 'rgb(22, 78, 99)'] as [string, string],
} as const;

export const fonts = {
  // Plus Jakarta Sans weights
  heading: 'PlusJakartaSans-ExtraBold',
  headingItalic: 'PlusJakartaSans-ExtraBoldItalic',
  subheading: 'PlusJakartaSans-Bold',
  // Inter weights - use system font with weight
  body: undefined as string | undefined, // system default
} as const;

export const radii = {
  xs: 6,
  sm: 9,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  pill: 9999,
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
  screenPadding: 24,
  sectionGap: 40,
} as const;

export const typography: Record<string, TextStyle> = {
  h1: {
    fontFamily: 'PlusJakartaSans-ExtraBold',
    fontSize: 36,
    fontWeight: '800',
    letterSpacing: -0.9,
    lineHeight: 40,
    color: '#ffffff',
  },
  h2: {
    fontFamily: 'PlusJakartaSans-ExtraBold',
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: -0.6,
    lineHeight: 32,
    color: '#ffffff',
  },
  h3: {
    fontFamily: 'PlusJakartaSans-ExtraBold',
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: -0.5,
    lineHeight: 28,
    color: '#ffffff',
  },
  body: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    color: '#ffffff',
  },
  bodySmall: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    color: '#adaaaa',
  },
  caption: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
    color: '#adaaaa',
  },
  label: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: '#adaaaa',
  },
} as const;

export const shadows: Record<string, ViewStyle> = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
  elevated: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 25 },
    shadowOpacity: 0.25,
    shadowRadius: 50,
    elevation: 15,
  },
  glow: {
    shadowColor: 'rgba(58, 249, 231, 1)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 30,
    elevation: 8,
  },
} as const;

export const layout = {
  tabBarHeight: 88,
  miniPlayerHeight: 72,
  bottomListPadding: 184, // tabBar + miniPlayer + spacing
} as const;

export const hitSlopDefault = { top: 10, bottom: 10, left: 10, right: 10 } as const;
