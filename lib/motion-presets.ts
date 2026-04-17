import { Variants } from 'framer-motion';

// Discovery Motion: Chapter card hover (narrowing prospect list)
export const discoveryCard: Variants = {
  hover: {
    y: -4,
    x: 0,
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1], // cubic-bezier(0.16, 1, 0.3, 1)
    },
    boxShadow: '0 20px 40px rgba(3, 105, 161, 0.15)',
  },
};

// Commitment Motion: Button fill left-to-right
export const commitmentButton: Variants = {
  hover: {
    boxShadow: '0 12px 24px rgba(3, 105, 161, 0.2)',
    transition: { duration: 0.25, ease: 'easeOut' },
  },
  tap: {
    scale: 0.98,
  },
};

// Cycle Motion: Subtle rotation + pulsing border
export const cycleMotion = {
  rotate: [0, 1, 0, -1, 0],
  transition: {
    duration: 8,
    repeat: Infinity,
    ease: 'easeInOut',
  },
};

export const cyclePulse: Variants = {
  animate: {
    opacity: [0.15, 0.3, 0.15],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// Reveal Motion: Staggered fade-in + slide up
export const revealContent: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

// Flow Motion: Timeline dots + lines light up sequentially
export const timelineDot: Variants = {
  hidden: { scale: 0.5, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

// Engagement Motion: Focus state
export const engagementFocus: Variants = {
  focus: {
    boxShadow: '0 0 0 3px rgba(3, 105, 161, 0.1), 0 0 12px rgba(3, 105, 161, 0.2)',
    transition: { duration: 0.15, ease: 'easeOut' },
  },
};

// Check if user prefers reduced motion
export const respectReducedMotion = (variants: Variants) => {
  if (typeof window === 'undefined') return variants;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    return Object.keys(variants).reduce((acc, key) => {
      acc[key] = { ...variants[key], transition: { duration: 0 } };
      return acc;
    }, {} as Variants);
  }
  return variants;
};
