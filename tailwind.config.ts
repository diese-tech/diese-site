import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Theme-aware tokens (CSS variables defined in globals.css)
        paper: 'rgb(var(--paper) / <alpha-value>)',
        'paper-panel': 'rgb(var(--paper-panel) / <alpha-value>)',
        'paper-sunk': 'rgb(var(--paper-sunk) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        'ink-muted': 'rgb(var(--ink-muted) / <alpha-value>)',
        'ink-faint': 'rgb(var(--ink-faint) / <alpha-value>)',
        rule: 'rgb(var(--rule) / <alpha-value>)',
        'rule-strong': 'rgb(var(--rule-strong) / <alpha-value>)',
        signal: 'rgb(var(--signal) / <alpha-value>)',
        'signal-stamp': 'rgb(var(--signal-stamp) / <alpha-value>)',
        ok: 'rgb(var(--ok) / <alpha-value>)',
        // Fixed tones for permanently-dark surfaces (do not flip with theme)
        void: '#0f0d0b',
        cream: '#f6f4ef',
      },
      fontFamily: {
        grotesk: ['var(--font-grotesk)', 'Space Grotesk', 'sans-serif'],
        sans: ['var(--font-sans)', 'IBM Plex Sans', 'sans-serif'],
        mono: ['var(--font-mono)', 'IBM Plex Mono', 'monospace'],
      },
      maxWidth: {
        content: '1180px',
      },
      transitionDuration: {
        '120': '120ms',
      },
    },
  },
  plugins: [],
};

export default config;
