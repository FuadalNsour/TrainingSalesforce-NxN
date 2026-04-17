import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainer } from '@/lib/motion-presets';

interface StaggerContainerProps {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
}

export const StaggerContainer: React.FC<StaggerContainerProps> = ({
  children,
  staggerDelay = 0.1,
  className,
}) => (
  <motion.div
    className={className}
    variants={staggerContainer}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-100px' }}
  >
    {React.Children.map(children, (child) => (
      <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
        {child}
      </motion.div>
    ))}
  </motion.div>
);

StaggerContainer.displayName = 'StaggerContainer';
