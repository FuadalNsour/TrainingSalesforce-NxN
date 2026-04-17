import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { cycleMotion, cyclePulse } from '@/lib/motion-presets';
import clsx from 'clsx';

type Difficulty = 'beginner' | 'intermediate' | 'advanced';

interface LabChallengeProps {
  title: string;
  description: string;
  difficulty: Difficulty;
  duration: number;
  href: string;
  className?: string;
}

const difficultyConfig: Record<Difficulty, { color: string; label: string }> = {
  beginner: { color: '#16A34A', label: 'Beginner' },
  intermediate: { color: '#0369A1', label: 'Intermediate' },
  advanced: { color: '#DC2626', label: 'Advanced' },
};

export const LabChallenge: React.FC<LabChallengeProps> = ({
  title,
  description,
  difficulty,
  duration,
  href,
  className,
}) => {
  const config = difficultyConfig[difficulty];

  return (
    <Link href={href}>
      <motion.div
        className={clsx(
          'rounded-lg border-2 backdrop-blur-2xl bg-white/15 p-6 cursor-pointer transition-all duration-300',
          className
        )}
        style={{ borderColor: config.color }}
        whileHover={{ scale: 1.02, y: -4 }}
        variants={cycleMotion}
        animate="animate"
      >
        {/* Pulsing Border Effect */}
        <motion.div
          className="absolute inset-0 rounded-lg border-2 pointer-events-none"
          style={{ borderColor: config.color }}
          variants={cyclePulse}
          animate="animate"
        />

        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-lg font-bold text-[#0F172A]">{title}</h3>
            <span
              className="text-xs font-semibold px-2 py-1 rounded text-white"
              style={{ backgroundColor: config.color }}
            >
              {config.label}
            </span>
          </div>

          <p className="text-sm text-[#64748B] mb-4">{description}</p>

          <div className="flex gap-4 text-xs text-[#64748B]">
            <div>⏱ {duration} min</div>
            <div style={{ color: config.color }} className="font-semibold">
              {difficulty === 'beginner' && '★☆☆'}
              {difficulty === 'intermediate' && '★★☆'}
              {difficulty === 'advanced' && '★★★'}
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

LabChallenge.displayName = 'LabChallenge';
