'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

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

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'beginner':
      return { bg: '#32E396/10', border: '#32E396', text: '#0F8559', badge: 'Beginner' };
    case 'intermediate':
      return { bg: '#0056FF/10', border: '#0056FF', text: '#0040CC', badge: 'Intermediate' };
    case 'advanced':
      return { bg: '#EB861F/10', border: '#EB861F', text: '#B85D0B', badge: 'Advanced' };
    default:
      return { bg: '#E5E7EB/10', border: '#E5E7EB', text: '#6B7280', badge: 'Standard' };
  }
};

export const LearningPathSection: React.FC<LearningPathSectionProps> = ({ chapters }) => {
  return (
    <section className="py-24 px-6 bg-[#FAFBFC]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#1F2937] mb-4">
            Your Learning Path
          </h2>
          <p className="text-lg text-[#4B5563] max-w-3xl">
            Master the NxN framework through structured chapters. Each builds on the previous with real-world scenarios and practical exercises.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {chapters.map((chapter, index) => {
            const colors = getDifficultyColor(chapter.difficulty);
            return (
              <motion.div
                key={chapter.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={`/chapters/${chapter.id}`}>
                  <motion.div
                    whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0, 86, 255, 0.15)' }}
                    className={`h-full p-6 rounded-xl border-2 transition-all cursor-pointer`}
                    style={{
                      backgroundColor: colors.bg,
                      borderColor: colors.border,
                    }}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-[#1F2937] mb-2">{chapter.title}</h3>
                      </div>
                      <div
                        className="ml-2 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap"
                        style={{ backgroundColor: `${colors.border}20`, color: colors.text }}
                      >
                        {colors.badge}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-[#4B5563] text-sm mb-6 line-clamp-2">
                      {chapter.description}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-[#E5E7EB]">
                      <div className="flex gap-4">
                        <div className="text-xs font-semibold text-[#6B7280]">
                          ⏱ {chapter.duration}h
                        </div>
                      </div>
                      <motion.div
                        className="text-[#0056FF] font-bold text-sm"
                        whileHover={{ x: 4 }}
                      >
                        Start →
                      </motion.div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

LearningPathSection.displayName = 'LearningPathSection';
