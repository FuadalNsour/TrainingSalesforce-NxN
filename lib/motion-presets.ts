import { Variants } from 'framer-motion';

export type { Variants };

/**
 * Discovery Motion - Chapter card hover effect
 * Represents the narrowing of prospect list through discovery process.
 * Inward slide with expanded blue glow on hover.
 * Duration: 300ms
 * @example
 * <motion.div whileHover="hover" variants={discoveryCard}>
 *   Chapter Card
 * </motion.div>
 */
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

/**
 * Commitment Motion - Button interaction effect
 * Represents progress and advancement in the sales cycle.
 * Color fade with expanded shadow on hover, scale down on tap.
 * Duration: 250ms
 * @example
 * <motion.button whileHover="hover" whileTap="tap" variants={commitmentButton}>
 *   Commit
 * </motion.button>
 */
export const commitmentButton: Variants = {
  hover: {
    backgroundColor: 'rgba(3, 105, 161, 0.1)', // GPU-accelerated color fade
    boxShadow: '0 12px 24px rgba(3, 105, 161, 0.3)',
    transition: { duration: 0.25, ease: 'easeOut' },
  },
  tap: {
    scale: 0.98,
  },
};

/**
 * Cycle Motion - Continuous rotation animation
 * Represents the repeatable cycle concept in sales process.
 * Subtle rotation effect for UI elements indicating activity.
 * Duration: 8s, infinite repeat
 * @example
 * <motion.div animate="animate" variants={cycleMotion}>
 *   Loading
 * </motion.div>
 */
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

/**
 * Cycle Pulse - Opacity pulsing animation
 * Separated from cycleMotion for applications needing pulse-only effect.
 * Creates breathing/pulsing visual feedback.
 * Duration: 8s, infinite repeat
 * @example
 * <motion.div animate="animate" variants={cyclePulse}>
 *   Pulsing element
 * </motion.div>
 */
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

/**
 * Reveal Motion - Fade and slide-up animation
 * Represents sequential teaching concept with progressive disclosure.
 * Content fades in from bottom with upward motion.
 * Duration: 300ms
 * @example
 * <motion.div initial="hidden" animate="visible" variants={revealContent}>
 *   Content appears here
 * </motion.div>
 */
export const revealContent: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
};

/**
 * Stagger Container - Parent container for staggered child animations
 * Orchestrates coordinated animations of child elements with delays.
 * Paired with child variants for sequential reveal effects.
 * Delay: 100ms between children
 * @example
 * <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
 *   <motion.div variants={revealContent} />
 *   <motion.div variants={revealContent} />
 * </motion.div>
 */
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

/**
 * Timeline Dot - Scale and fade animation for sequential indicators
 * Represents progression through stages concept in sales journey.
 * Dots scale up and fade in to highlight active/completed steps.
 * Duration: 400ms
 * @example
 * <motion.div initial="hidden" animate="visible" variants={timelineDot}>
 *   ●
 * </motion.div>
 */
export const timelineDot: Variants = {
  hidden: { scale: 0.5, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

/**
 * Engagement Focus - Focus state with glow and scale
 * Represents active discovery concept with clear visual feedback.
 * GPU-accelerated shadow and scale effects (no backdropFilter).
 * Duration: 150ms
 * @example
 * <motion.input variants={engagementFocus} />
 */
export const engagementFocus: Variants = {
  focus: {
    boxShadow: '0 0 0 3px rgba(3, 105, 161, 0.1), 0 0 12px rgba(3, 105, 161, 0.3)',
    scale: 1.01, // Subtle scale for emphasis (GPU accelerated)
    transition: { duration: 0.15, ease: 'easeOut' },
  },
};

/**
 * Respect Reduced Motion - Accessibility utility to disable animations
 * When user prefers reduced motion, returns static states without animations.
 * Complies with WCAG 2.1 Level AAA motion accessibility standards.
 * @param variants - Framer Motion variants to potentially disable
 * @returns Modified variants with animations disabled if prefers-reduced-motion is set
 * @example
 * const safeVariants = respectReducedMotion(discoveryCard);
 */
export const respectReducedMotion = (variants: Variants) => {
  if (typeof window === 'undefined') return variants;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    // Return static state without animation keyframes
    return {
      initial: { opacity: 1 },
      animate: { opacity: 1, transition: { duration: 0 } },
      exit: { opacity: 1, transition: { duration: 0 } },
    } as Variants;
  }
  return variants;
};
