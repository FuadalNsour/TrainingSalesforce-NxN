'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedCounter } from '@/components/glass/AnimatedCounter';
import { GlassPanel } from '@/components/glass/GlassPanel';
import clsx from 'clsx';

interface StageDataCardProps {
  label: string;
  value: number;
  suffix?: string;
  color: string;
  icon?: string;
  delay?: number;
}

export const StageDataCard: React.FC<StageDataCardProps> = ({
  label,
  value,
  suffix = '',
  color,
  icon,
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true, margin: '-100px' }}
      className="h-full"
    >
      <GlassPanel
        variant="surface"
        className="p-6 h-full flex flex-col items-center justify-center text-center"
      >
        {icon && <div className="text-4xl mb-3">{icon}</div>}
        <p className="text-sm text-[#64748B] uppercase font-semibold mb-3 tracking-wide">
          {label}
        </p>
        <div
          className="text-4xl md:text-5xl font-bold"
          style={{ color }}
        >
          <AnimatedCounter target={value} duration={2} suffix={suffix} />
        </div>
      </GlassPanel>
    </motion.div>
  );
};

StageDataCard.displayName = 'StageDataCard';
