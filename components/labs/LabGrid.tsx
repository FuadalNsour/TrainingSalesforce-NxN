'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LabChallenge } from '@/components/glass/LabChallenge';
import { staggerContainer, revealContent } from '@/lib/motion-presets';
import clsx from 'clsx';

interface LabData {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number;
  topics?: string[];
  rating?: number;
  href: string;
}

interface LabGridProps {
  labs: LabData[];
  onCardClick?: (lab: LabData) => void;
  isLoading?: boolean;
  className?: string;
}

export const LabGrid: React.FC<LabGridProps> = ({
  labs,
  onCardClick,
  isLoading = false,
  className,
}) => {
  if (isLoading) {
    return (
      <div className={clsx('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6', className)}>
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="rounded-lg bg-white/15 border border-white/20 h-48 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (labs.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={clsx('text-center py-12', className)}
      >
        <p className="text-[#64748B] text-lg">No labs match your filters. Try adjusting your selection.</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={clsx('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6', className)}
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      key={`grid-${labs.length}`}
    >
      {labs.map((lab) => (
        <motion.div
          key={lab.id}
          variants={revealContent}
          onClick={() => onCardClick?.(lab)}
          className="cursor-pointer"
          data-testid={`lab-card-${lab.id}`}
        >
          <LabChallenge
            title={lab.title}
            description={lab.description}
            difficulty={lab.difficulty}
            duration={lab.duration}
            href={lab.href}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

LabGrid.displayName = 'LabGrid';
