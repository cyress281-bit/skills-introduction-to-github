/**
 * Ride Radar — Color Palette
 *
 * Dark-themed UI with electric neon green (#39FF14) as the primary accent.
 * All color values are defined here so screens never hard-code hex strings.
 */

export const Colors = {
  /* ───── Brand / Accent ───── */
  primary: '#39FF14', // electric neon green
  primaryDim: '#2ECC10', // slightly muted green for pressed states
  primaryGlow: 'rgba(57, 255, 20, 0.25)', // translucent glow for shadows / overlays

  /* ───── Backgrounds ───── */
  backgroundDark: '#0D0D0D', // main app background
  backgroundCard: '#1A1A1A', // card / surface background
  backgroundElevated: '#242424', // elevated surfaces (modals, sheets)
  backgroundInput: '#1E1E1E', // text-input background

  /* ───── Text ───── */
  textPrimary: '#FFFFFF',
  textSecondary: '#A0A0A0',
  textMuted: '#666666',
  textOnPrimary: '#0D0D0D', // text rendered on the primary-green surfaces

  /* ───── Semantic ───── */
  success: '#39FF14',
  warning: '#FFB800',
  error: '#FF3B30',
  info: '#0A84FF',

  /* ───── Borders / Dividers ───── */
  border: '#2A2A2A',
  borderLight: '#3A3A3A',
  divider: '#1F1F1F',

  /* ───── Misc ───── */
  overlay: 'rgba(0, 0, 0, 0.6)',
  transparent: 'transparent',
} as const;

export type ColorKey = keyof typeof Colors;
