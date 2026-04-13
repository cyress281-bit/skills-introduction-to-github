import { ViewStyle, TextStyle, Platform } from 'react-native';
import { Colors } from './colors';
import { Spacing } from './spacing';

/**
 * Ride Radar — Button Styles
 *
 * Predefined button variants that combine colors, spacing, and border-radii
 * into ready-to-use `ViewStyle` + `TextStyle` pairs.
 */

export const BorderRadii = {
  sm: 6,
  md: 10,
  lg: 14,
  xl: 20,
  full: 9999,
} as const;

/* ── Shadows (platform-aware) ── */

const shadowPrimary = Platform.select<ViewStyle>({
  ios: {
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
  },
  android: { elevation: 8 },
  default: {},
});

const shadowCard = Platform.select<ViewStyle>({
  ios: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  android: { elevation: 4 },
  default: {},
});

/* ── Button containers ── */

export const ButtonStyles: Record<string, ViewStyle> = {
  /** Filled primary button */
  primary: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    borderRadius: BorderRadii.lg,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadowPrimary,
  },

  /** Outlined / ghost button */
  outline: {
    backgroundColor: Colors.transparent,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    borderRadius: BorderRadii.lg,
    borderWidth: 1.5,
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  /** Secondary / muted button */
  secondary: {
    backgroundColor: Colors.backgroundElevated,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    borderRadius: BorderRadii.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },

  /** Small pill-shaped button */
  pill: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.base,
    borderRadius: BorderRadii.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
};

/* ── Button text ── */

export const ButtonTextStyles: Record<string, TextStyle> = {
  primary: {
    color: Colors.textOnPrimary,
    fontSize: 16,
    fontWeight: '700',
  },
  outline: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: '700',
  },
  secondary: {
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
  pill: {
    color: Colors.textOnPrimary,
    fontSize: 13,
    fontWeight: '700',
  },
};

/* ── Card styles ── */

export const CardStyles: Record<string, ViewStyle> = {
  /** Default card */
  base: {
    backgroundColor: Colors.backgroundCard,
    borderRadius: BorderRadii.lg,
    padding: Spacing.base,
    ...shadowCard,
  },

  /** Card with a neon-green border accent */
  accent: {
    backgroundColor: Colors.backgroundCard,
    borderRadius: BorderRadii.lg,
    padding: Spacing.base,
    borderWidth: 1,
    borderColor: Colors.primary,
    ...shadowPrimary,
  },

  /** Compact card for list items */
  compact: {
    backgroundColor: Colors.backgroundCard,
    borderRadius: BorderRadii.md,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.base,
    ...shadowCard,
  },
};

export { shadowPrimary as ShadowPrimary, shadowCard as ShadowCard };
