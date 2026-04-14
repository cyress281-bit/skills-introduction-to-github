export const Colors = {
  /** Primary neon green accent */
  accent: '#39FF14',
  /** Dark background */
  background: '#0D0D0D',
  /** Slightly lighter surface for cards / tab bar */
  surface: '#1A1A1A',
  /** Primary text on dark backgrounds */
  text: '#FFFFFF',
  /** Muted / secondary text */
  textMuted: '#888888',
  /** Inactive tab icon tint */
  tabInactive: '#555555',
};
import { Colors } from './colors';
import { Spacing } from './spacing';
import { BorderRadii } from './styles';

/**
 * Ride Radar — Theme Constants
 *
 * A single object that aggregates every design token so screens can import
 * one module:
 *
 * ```ts
 * import { Theme } from '@/constants/theme';
 * ```
 */
export const Theme = {
  colors: Colors,
  spacing: Spacing,
  borderRadii: BorderRadii,

  /** Convenience: the primary accent color for quick access */
  accentColor: Colors.primary,

  /** Navigation / tab-bar overrides */
  navigation: {
    tabBarBackground: Colors.backgroundDark,
    tabBarActiveTint: Colors.primary,
    tabBarInactiveTint: Colors.textMuted,
    headerBackground: Colors.backgroundDark,
    headerTint: Colors.textPrimary,
  },

  /** Map-specific tokens */
  map: {
    markerColor: Colors.primary,
    routeStroke: Colors.primary,
    routeStrokeWidth: 4,
  },
} as const;
