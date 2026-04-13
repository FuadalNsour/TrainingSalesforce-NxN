// lib/constants.ts
export const COLORS = {
  white: '#FFFFFF',
  black: '#000000',
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    300: '#D1D5DB',
    600: '#4B5563',
    900: '#1F2937',
  },
  green: {
    500: '#10B981',
    600: '#059669',
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
  chapter: (id: string) => `/chapters/${id}`,
  lifecycle: '/lifecycle',
  labs: '/labs',
  lab: (id: string) => `/labs/${id}`,
  trainer: '/trainer',
};
