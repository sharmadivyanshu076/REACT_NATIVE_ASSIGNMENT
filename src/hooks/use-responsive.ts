import { useWindowDimensions } from 'react-native';

export interface ResponsiveInfo {
  width: number;
  height: number;
  fontScale: number;
  isSmallDevice: boolean;
  isTablet: boolean;
  isLandscape: boolean;
  numColumns: number;
  contentWidth: number;
}

export function useResponsive(): ResponsiveInfo {
  const { width, height, fontScale } = useWindowDimensions();

  const isSmallDevice = width < 380;
  const isTablet = width >= 768;
  const isLandscape = width > height;
  // 1 column on phones, 2 columns on tablets in portrait, 3 columns on wide tablets / desktops
  const numColumns = isTablet ? (width >= 1100 ? 3 : 2) : 1;
  const contentWidth = Math.min(width, isTablet ? 1040 : 640);

  return {
    width,
    height,
    fontScale,
    isSmallDevice,
    isTablet,
    isLandscape,
    numColumns,
    contentWidth,
  };
}
