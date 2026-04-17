import { Variants } from 'framer-motion';

// Discovery Motion: Chapter card hover (narrowing prospect list + expanding glow)
export const discoveryCard: Variants = {
  hover: {
    y: -4,
    x: -2, // Inward slide 2px
    boxShadow: '0 20px 40px rgba(3, 105, 161, 0.25)', // Expanded blue glow
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// Commitment Motion: Button fill effect + text slide (progress/advancement)
export const commitmentButton: Variants = {
  hover: {
    backgroundPosition: ['0% 0%', '100% 0%'], // Left-to-right fill
    boxShadow: '0 12px 24px rgba(3, 105, 161, 0.3)', // Expanded shadow
    transition: { duration: 0.25, ease: 'easeOut' },
  },
  tap: {
    scale: 0.98,
  },
};

// Cycle Motion: Rotation + pulsing border (repeatable cycle concept)
export const cycleMotion: Variants = {
  animate: {
    rotate: [0, 1, 0, -1, 0],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// Alternative: Separated pulse for clarity (use where needed)
export const cyclePulse: Variants = {
  animate: {
    opacity: [0.15, 0.3, 0.15],
    transition: {
      duration: 8, // Matched to cycleMotion
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// Reveal Motion: Staggered fade-in + slide up (sequential teaching)
export const revealContent: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
};

// Stagger Container: Orchestrates staggered children animations
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

// Flow Motion: Timeline dots light up sequentially (progression concept)
export const timelineDot: Variants = {
  hidden: { scale: 0.5, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

// Engagement Motion: Focus state with glow + blur increase (active discovery)
export const engagementFocus: Variants = {
  focus: {
    boxShadow: '0 0 0 3px rgba(3, 105, 161, 0.1), 0 0 12px rgba(3, 105, 161, 0.2)',
    backdropFilter: 'blur(18px)', // Increased from default 15px
    transition: { duration: 0.15, ease: 'easeOut' },
  },
};

// Accessibility: Respect prefers-reduced-motion for all animations
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
