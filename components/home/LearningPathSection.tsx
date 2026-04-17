'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard, StaggerContainer } from '@/components/glass';
import { staggerContainer } from '@/lib/motion-presets';

interface Chapter {
  id: string;
  title: string;
  description: string;
  duration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  icon?: string;
}

interface LearningPathSectionProps {
  chapters: Chapter[];
}

export const LearningPathSection: React.FC<LearningPathSectionProps> = ({ chapters }) => {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-4">
            Your Learning Path
          </h2>
          <p className="text-xl text-[#64748B] max-w-2xl">
            Master the NxN framework through structured chapters, each building on the previous.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {chapters.map((chapter) => (
              <GlassCard
                key={chapter.id}
                title={chapter.title}
                description={chapter.description}
                href={`/chapters/${chapter.id}`}
                icon={chapter.icon}
                metadata={{
                  duration: `${chapter.duration}h`,
                  level: chapter.difficulty,
                }}
                status="in-progress"
              />
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  );
};

LearningPathSection.displayName = 'LearningPathSection';
