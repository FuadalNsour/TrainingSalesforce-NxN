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
        brand: {
          primary: '#0056FF',
          secondary: '#32E396',
          accent: '#EB861F',
          dark: '#1F2937',
          light: '#FAFBFC',
          border: '#E5E7EB',
        },
        glass: {
          primary: '#0056FF',
          accent: '#32E396',
          muted: '#6B7280',
          border: '#BAE6FD',
          bg: '#FAFBFC',
          text: '#1F2937',
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
        'card': '0 4px 12px rgba(0, 86, 255, 0.1)',
        'card-hover': '0 12px 24px rgba(0, 86, 255, 0.15)',
      },
      fontFamily: {
        'display': ['Space Grotesk', 'sans-serif'],
        'body': ['Cairo', 'sans-serif'],
        'mono': ['Space Grotesk', 'monospace'],
      },
      gradients: {
        'vibrant': 'linear-gradient(135deg, #0056FF 0%, #32E396 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
