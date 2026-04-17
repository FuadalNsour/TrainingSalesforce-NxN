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
      color: 'text-[#0369A1]',
    },
    {
      label: 'Learning Hours',
      value: totalHours,
      color: 'text-[#16A34A]',
    },
    {
      label: 'Complete at Your Pace',
      value: completionRate,
      suffix: '%',
      color: 'text-[#0F766E]',
    },
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-[#F0F9FF] to-[#F8FAFC]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-[#0F172A] mb-4">
            Course Overview
          </h2>
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
              <GlassPanel variant="surface" className="p-8 text-center">
                <p className="text-lg text-[#64748B] mb-4">{stat.label}</p>
                <AnimatedCounter
                  target={stat.value}
                  duration={2}
                  prefix=""
                  suffix={stat.suffix}
                />
                <div className={`text-5xl font-bold ${stat.color}`}>
                  <AnimatedCounter
                    target={stat.value}
                    duration={2}
                    prefix=""
                    suffix={stat.suffix}
                  />
                </div>
              </GlassPanel>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

CourseInfoSection.displayName = 'CourseInfoSection';
