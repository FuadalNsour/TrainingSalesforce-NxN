import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
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

const difficultyConfig: Record<Difficulty, { bg: string; border: string; text: string; label: string; emoji: string }> = {
  beginner: { bg: '#32E396/10', border: '#32E396', text: '#0F8559', label: 'Beginner', emoji: '🟢' },
  intermediate: { bg: '#0056FF/10', border: '#0056FF', text: '#0040CC', label: 'Intermediate', emoji: '🔵' },
  advanced: { bg: '#EB861F/10', border: '#EB861F', text: '#B85D0B', label: 'Advanced', emoji: '🔴' },
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
          'rounded-xl border-2 p-6 cursor-pointer transition-all backdrop-blur-sm',
          className
        )}
        style={{
          backgroundColor: config.bg,
          borderColor: config.border,
        }}
        whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0, 86, 255, 0.15)' }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-lg font-bold text-[#1F2937] pr-2">{title}</h3>
            <span
              className="text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap"
              style={{ backgroundColor: `${config.border}20`, color: config.text }}
            >
              {config.emoji} {config.label}
            </span>
          </div>

          <p className="text-sm text-[#4B5563] mb-4 line-clamp-2">{description}</p>

          <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: `${config.border}30` }}>
            <div className="text-xs font-semibold text-[#6B7280]">
              ⏱ {duration} min
            </div>
            <motion.div
              className="font-bold text-sm"
              style={{ color: config.border }}
              whileHover={{ x: 4 }}
            >
              Start →
            </motion.div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

LabChallenge.displayName = 'LabChallenge';
