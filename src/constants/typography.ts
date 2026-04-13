import { Platform } from 'react-native';

/**
 * Ride Radar — Typography Scale
 *
 * Font sizes, weights, and line-heights used across the app.
 * Uses the system font stack; swap `fontFamily` if a custom typeface is added.
 */

const fontFamily = Platform.select({
  ios: 'System',
  android: 'Roboto',
  default: 'System',
});

export const FontSizes = {
  xs: 10,
  sm: 12,
  md: 14,
  base: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 30,
  display: 36,
} as const;

export const FontWeights = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
  heavy: '800' as const,
};

export const LineHeights = {
  tight: 1.1,
  normal: 1.4,
  relaxed: 1.6,
} as const;

/**
 * Pre-composed text styles that can be spread directly into a `Text` component.
 *
 * ```tsx
 * <Text style={Typography.heading}>Hello</Text>
 * ```
 */
export const Typography = {
  display: {
    fontFamily,
    fontSize: FontSizes.display,
    fontWeight: FontWeights.bold,
    lineHeight: FontSizes.display * LineHeights.tight,
  },
  heading: {
    fontFamily,
    fontSize: FontSizes.xxl,
    fontWeight: FontWeights.bold,
    lineHeight: FontSizes.xxl * LineHeights.tight,
  },
  subheading: {
    fontFamily,
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.semibold,
    lineHeight: FontSizes.lg * LineHeights.normal,
  },
  body: {
    fontFamily,
    fontSize: FontSizes.base,
    fontWeight: FontWeights.regular,
    lineHeight: FontSizes.base * LineHeights.normal,
  },
  bodySmall: {
    fontFamily,
    fontSize: FontSizes.md,
    fontWeight: FontWeights.regular,
    lineHeight: FontSizes.md * LineHeights.normal,
  },
  caption: {
    fontFamily,
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.regular,
    lineHeight: FontSizes.sm * LineHeights.normal,
  },
  label: {
    fontFamily,
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.semibold,
    lineHeight: FontSizes.sm * LineHeights.normal,
    letterSpacing: 0.5,
    textTransform: 'uppercase' as const,
  },
} as const;
