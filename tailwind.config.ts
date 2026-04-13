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
        accent: '#10B981', // Keep green accent
        surface: '#F3F4F6', // Light gray for cards
      },
      fontFamily: {
        display: 'Space Grotesk, sans-serif',
        body: 'Cairo, sans-serif',
      },
      backgroundColor: {
        light: '#FFFFFF',
      },
      textColor: {
        primary: '#1F2937', // Dark gray for primary text
        secondary: '#6B7280', // Medium gray for secondary text
      },
    },
  },
  plugins: [],
};

export default config;
