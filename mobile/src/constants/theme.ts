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
