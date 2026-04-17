import React from 'react';
import { motion } from 'framer-motion';

export const SkeletonGlass: React.FC<{ width?: string; height?: string }> = ({
  width = 'w-full',
  height = 'h-12',
}) => (
  <motion.div
    className={`${width} ${height} rounded-lg bg-white/15 backdrop-blur-2xl`}
    animate={{ opacity: [0.6, 0.9, 0.6] }}
    transition={{ duration: 1.5, repeat: Infinity }}
  />
);

SkeletonGlass.displayName = 'SkeletonGlass';
