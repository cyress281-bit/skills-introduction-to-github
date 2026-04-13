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
