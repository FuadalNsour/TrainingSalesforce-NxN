'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GlassPanel, AnimatedCounter } from '@/components/glass';

interface CourseInfoSectionProps {
  totalChapters: number;
  totalHours: number;
  completionRate?: number;
}

export const CourseInfoSection: React.FC<CourseInfoSectionProps> = ({
  totalChapters,
  totalHours,
  completionRate = 0,
}) => {
  const stats = [
    {
      label: 'Chapters',
      value: totalChapters,
      color: 'text-[#0056FF]',
      isCounter: true,
    },
    {
      label: 'Learning Hours',
      value: totalHours,
      color: 'text-[#32E396]',
      isCounter: true,
    },
    {
      label: 'Complete at Your Pace',
      value: '∞',
      color: 'text-[#EB861F]',
      isCounter: false,
    },
  ];

  return (
    <section className="py-24 px-6 bg-gradient-to-br from-[#FAFBFC] via-[#F0F4FF] to-[#FAFBFC]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#1F2937] mb-4">
            📊 Course Overview
          </h2>
          <p className="text-lg text-[#4B5563]">Learn at your own pace with unlimited access</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <motion.div
                whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0, 86, 255, 0.15)' }}
                className="bg-white/80 backdrop-blur-sm border-2 border-[#E5E7EB] p-8 rounded-xl text-center shadow-sm transition-all"
              >
                <p className="text-lg font-bold text-[#4B5563] mb-6">{stat.label}</p>
                <div className={`text-6xl font-bold ${stat.color} mb-2`}>
                  {stat.isCounter ? (
                    <AnimatedCounter
                      target={Math.round((stat.value as number) * 10) / 10}
                      duration={2}
                      prefix=""
                      suffix=""
                    />
                  ) : (
                    <motion.span
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.6, delay: idx * 0.1 + 0.3 }}
                      viewport={{ once: true }}
                    >
                      {stat.value}
                    </motion.span>
                  )}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

CourseInfoSection.displayName = 'CourseInfoSection';
