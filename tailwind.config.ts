import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        glass: {
          primary: '#0369A1',
          accent: '#16A34A',
          muted: '#64748B',
          border: '#BAE6FD',
          bg: '#F0F9FF',
          text: '#0F172A',
        },
      },
      backdropBlur: {
        glass: '15px',
        nav: '20px',
      },
      backgroundColor: {
        'glass-elevated': 'rgba(255, 255, 255, 0.20)',
        'glass-surface': 'rgba(255, 255, 255, 0.15)',
        'glass-deep': 'rgba(255, 255, 255, 0.10)',
      },
      borderColor: {
        'glass-elevated': 'rgba(255, 255, 255, 0.20)',
        'glass-surface': 'rgba(255, 255, 255, 0.15)',
        'glass-deep': 'rgba(255, 255, 255, 0.10)',
      },
      boxShadow: {
        'glass': 'inset 0 1px 0 rgba(255, 255, 255, 0.3)',
      },
      fontFamily: {
        'display': ['Poppins', 'sans-serif'],
        'body': ['Open Sans', 'sans-serif'],
        'mono': ['Space Grotesk', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
