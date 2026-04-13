import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        accent: '#10B981',
        surface: '#1F2937',
      },
      fontFamily: {
        display: 'Space Grotesk, sans-serif',
        body: 'Cairo, sans-serif',
      },
      backgroundColor: {
        dark: '#000000',
      },
      textColor: {
        primary: '#FFFFFF',
        secondary: '#D1D5DB',
      },
    },
  },
  plugins: [],
};

export default config;
