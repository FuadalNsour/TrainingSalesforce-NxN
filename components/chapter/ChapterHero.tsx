'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Chapter } from '@/lib/types';
import { GlassPanel, GlassButton } from '@/components/glass';
import { revealContent, staggerContainer } from '@/lib/motion-presets';
import Link from 'next/link';

interface ChapterHeroProps {
  chapter: Chapter;
}

export const ChapterHero: React.FC<ChapterHeroProps> = ({ chapter }) => {
  // Determine difficulty color
  const difficultyColorMap = {
    beginner: 'text-[#16A34A]',
    intermediate: 'text-[#0369A1]',
    advanced: 'text-[#DC2626]',
  };

  const difficultyBgColorMap = {
    beginner: 'bg-[#16A34A]/10 border-[#16A34A]/20',
    intermediate: 'bg-[#0369A1]/10 border-[#0369A1]/20',
    advanced: 'bg-[#DC2626]/10 border-[#DC2626]/20',
  };

  const difficulty = (chapter as any).difficulty || 'beginner';
  const difficultyColor = difficultyColorMap[difficulty as keyof typeof difficultyColorMap];
  const difficultyBgColor = difficultyBgColorMap[difficulty as keyof typeof difficultyBgColorMap];

  // Determine NxN stage label and color (if nxnStage exists)
  const stageColorMap = {
    awareness: 'bg-[#F0F9FF] text-[#0369A1]',
    interest: 'bg-[#F0F9FF] text-[#0369A1]',
    evaluation: 'bg-[#F0F9FF] text-[#0369A1]',
    decision: 'bg-[#F0F9FF] text-[#0369A1]',
    commitment: 'bg-[#F0F9FF] text-[#0369A1]',
  };

  const nxnStage = (chapter as any).nxnStage || 'awareness';
  const stageLabel = (chapter as any).nxnStage ? ((chapter as any).nxnStage as string).charAt(0).toUpperCase() + ((chapter as any).nxnStage as string).slice(1) : null;
  const stageColor = stageColorMap[nxnStage as keyof typeof stageColorMap];

  return (
    <motion.section
      className="relative w-full py-16 md:py-24 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F0F9FF] via-white to-[#F8FAFC] -z-10" />

      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          className="space-y-6"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Chapter Badge and Navigation */}
          <motion.div
            className="flex flex-wrap items-center gap-3"
            variants={revealContent}
          >
            <GlassPanel variant="elevated" className="px-4 py-2 text-xs md:text-sm font-semibold text-[#0369A1]">
              Chapter {chapter.order} of 14
            </GlassPanel>

            {difficulty && (
              <GlassPanel variant="surface" className={`px-3 py-1.5 text-xs font-semibold ${difficultyColor}`}>
                {(difficulty as string).charAt(0).toUpperCase() + (difficulty as string).slice(1)}
              </GlassPanel>
            )}

            {stageLabel && (
              <GlassPanel variant="surface" className={`px-3 py-1.5 text-xs font-semibold ${stageColor}`}>
                {stageLabel} Stage
              </GlassPanel>
            )}
          </motion.div>

          {/* Title */}
          <motion.h1
            className="text-4xl md:text-6xl font-poppins font-bold text-[#0F172A] leading-tight"
            variants={revealContent}
          >
            {chapter.title}
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-lg md:text-xl text-[#64748B] font-open-sans leading-relaxed max-w-2xl"
            variants={revealContent}
          >
            {chapter.description}
          </motion.p>

          {/* Metadata */}
          <motion.div
            className="flex flex-wrap items-center gap-6 text-sm text-[#64748B] font-open-sans"
            variants={revealContent}
          >
            {chapter.duration && (
              <div className="flex items-center gap-2">
                <span className="w-1 h-1 bg-[#0369A1] rounded-full" />
                <span>{chapter.duration} minute read</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <span className="w-1 h-1 bg-[#0369A1] rounded-full" />
              <span>Self-paced learning</span>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 pt-6"
            variants={revealContent}
          >
            <Link href="/" className="w-full sm:w-auto">
              <GlassButton variant="secondary" size="lg" className="w-full">
                ← Back to Home
              </GlassButton>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

ChapterHero.displayName = 'ChapterHero';
