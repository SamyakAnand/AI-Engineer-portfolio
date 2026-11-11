/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: { DEFAULT: '#0a0a0f', elev: '#12121b', surface: '#1a1a26', surface2: '#222233' },
        text: { DEFAULT: '#e8e8f0', dim: '#a0a0b8', muted: '#0f0f18' },
        accent: '#7c3aed',
        accent2: '#6366f1',
        accent3: '#3b82f6',
        glow: 'rgba(124,58,237,.35)',
        line: '#2a2a3e',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      letterSpacing: {
        tighter: '.05em',
        tight: '.07em',
        wider: '.18em',
        widest: '.3em',
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: 1.25 }],
        sm: ['0.8125rem', { lineHeight: 1.4 }],
        base: ['0.9375rem', { lineHeight: 1.6 }],
        lg: ['1.125rem', { lineHeight: 1.5 }],
        xl: ['1.375rem', { lineHeight: 1.4 }],
        '2xl': ['1.75rem', { lineHeight: 1.3 }],
        '3xl': ['2.25rem', { lineHeight: 1.25 }],
        '4xl': ['3rem', { lineHeight: 1.2 }],
      },
      spacing: {
        ...{
          18: '4.5rem',
          22: '5.5rem',
          26: '6.5rem',
          30: '7.5rem',
          34: '8.5rem',
        },
      },
      animation: {
        'fade-in': 'fadeIn .7s ease-out both',
        'fade-up': 'fadeUp .8s ease-out both',
        'type-write': 'typeWrite 1.2s steps(30) both',
        'pulse-slow': 'pulseSlow 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        fadeUp: { '0%': { opacity: '0', transform: 'translateY(24px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        typeWrite: { '0%': { width: '0' }, '100%': { width: '100%' } },
        pulseSlow: { '0%,100%': { opacity: '.5' }, '50%': { opacity: '1' } },
      },
    },
  },
  plugins: [],
};
