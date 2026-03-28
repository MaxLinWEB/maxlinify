import { useWindowDimensions } from 'react-native';

const DESIGN_WIDTH = 390;

export function useResponsive() {
  const { width, height } = useWindowDimensions();
  const ratio = width / DESIGN_WIDTH;

  return {
    width,
    height,
    isSmall: width < 375,
    isMedium: width >= 375 && width <= 428,
    isLarge: width > 428,
    scale: (baseValue: number) => Math.round(baseValue * ratio),
    screenPadding: width < 375 ? 20 : width > 428 ? 28 : 24,
  };
}
