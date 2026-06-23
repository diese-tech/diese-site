import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        paper: '#f6f4ef',
        'paper-panel': '#f3f1ea',
        'paper-sunk': '#e4dfd3',
        ink: '#1b1a17',
        'ink-muted': '#6b6657',
        'ink-faint': '#9a8f7a',
        rule: '#d8d3c6',
        'rule-strong': '#ccc7ba',
        signal: '#9a4a32',
        'signal-stamp': '#a23a2e',
        ok: '#4f7a4a',
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
