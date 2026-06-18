import type { Config } from 'tailwindcss';
const config: Config = { darkMode: 'class', content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './content/**/*.{ts,tsx,mdx}'], theme: { extend: { colors: { ink: '#08111f', cloud: '#f6f3ec', accent: '#7c5cff', cyan: '#38d5ff' }, fontFamily: { sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'] }, boxShadow: { glow: '0 0 60px rgba(124, 92, 255, 0.28)' } } }, plugins: [] };
export default config;
