// lib/constants.ts
export const COLORS = {
  black: '#000000',
  white: '#FFFFFF',
  gray: {
    300: '#D1D5DB',
    700: '#374151',
    900: '#1F2937',
  },
  green: {
    600: '#10B981',
    500: '#14B8A6',
  },
};

export const TYPOGRAPHY = {
  fontFamily: {
    display: 'Space Grotesk, sans-serif',
    body: 'Cairo, sans-serif',
  },
  sizes: {
    h1: '3.5rem',
    h2: '2.5rem',
    h3: '1.875rem',
    body: '1rem',
    sm: '0.875rem',
  },
};

export const SPACING = {
  xs: '0.5rem',
  sm: '1rem',
  md: '1.5rem',
  lg: '2rem',
  xl: '3rem',
  xxl: '4rem',
};

export const ROUTES = {
  home: '/',
  dashboard: '/dashboard',
  chapter: (id: string) => `/chapters/${id}`,
  lifecycle: '/lifecycle',
  labs: '/labs',
  demo: '/demo',
  trainer: '/trainer',
};
