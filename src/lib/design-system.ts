/**
 * Design system — unified brand tokens for the Samyak Anand portfolio.
 * Replaces inline color values across the codebase.
 */

/** Primary brand palette (deep black → sky) */
export const colors = {
  bg: { DEFAULT: '#080809', elev: '#101012', surface: '#171719', surface2: '#222233' },
  text: { DEFAULT: '#f5f3f2', dim: '#929095', muted: '#0f0f18' },
  accent: '#7c3aed',           // purple (spec requirement)
  accent2: '#6366f1',          // indigo
  accent3: '#3b82f6',          // blue
  glow: 'rgba(124,58,237,.35)',
  line: '#2a2a3e',
  // extended
  accentDark: '#4c1d95',
  accentLight: '#a78bfa',
  accentGlow: 'rgba(124,58,237,.18)',
  surfaceGlow: 'rgba(124,58,237,.06)',
};

/** Design tokens for use in component styling */
export const tokens = {
  space: {
    0: '0px',
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    5: '24px',
    6: '32px',
    7: '40px',
    8: '48px',
    9: '56px',
    10: '64px',
    11: '72px',
    12: '80px',
    13: '88px',
    14: '96px',
  },
  type: {
    display: [
      'clamp(48px, 7.5vw, 112px)',
      { lineHeight: 1.15, fontWeight: 700, letterSpacing: '-.02em' },
    ],
    displaySmall: [
      'clamp(36px, 5.5vw, 72px)',
      { lineHeight: 1.2, fontWeight: 700, letterSpacing: '-.01em' },
    ],
    heading: [
      'clamp(32px, 4.5vw, 56px)',
      { lineHeight: 1.2, fontWeight: 700, letterSpacing: '-.01em' },
    ],
    subheading: [
      'clamp(18px, 2.2vw, 22px)',
      { lineHeight: 1.4, fontWeight: 600, color: 'var(--text-dim)' },
    ],
    body: [
      'clamp(14px, 1.1vw, 16px)',
      { lineHeight: 1.65, color: 'var(--text-dim)' },
    ],
    caption: [
      'clamp(11px, .9vw, 13px)',
      { lineHeight: 1.5, color: 'var(--text-dim)' },
    ],
    kicker: [
      '10px',
      { lineHeight: 1.5, fontWeight: 700, letterSpacing: '.18em', color: 'var(--accent)' },
    ],
  },
  radius: {
    sm: '6px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px',
  },
  shadow: {
    sm: '0 2px 8px rgba(0,0,0,.35)',
    md: '0 4px 16px rgba(0,0,0,.45)',
    lg: '0 8px 32px rgba(0,0,0,.55)',
    glow: '0 0 24px rgba(124,58,237,.18)',
    'glow-md': '0 0 36px rgba(124,58,237,.25)',
  },
};

/** Type-safe CSS variable helper */
export function varStyle(name: string, fallback = 'var(--accent)'): string {
  return `var(${JSON.stringify(name)}, ${fallback})`;
}
