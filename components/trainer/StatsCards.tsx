'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GlassPanel } from '@/components/glass/GlassPanel';
import { AnimatedCounter } from '@/components/glass/AnimatedCounter';
import { discoveryCard, staggerContainer, revealContent } from '@/lib/motion-presets';
import clsx from 'clsx';

export interface StatItem {
  id: string;
  label: string;
  value: number;
  trend?: number; // positive = up, negative = down
  suffix?: string;
  color?: 'green' | 'red' | 'blue';
}

interface StatsCardsProps {
  stats: StatItem[];
}

export const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => {
  const getTrendIcon = (trend?: number) => {
    if (trend === undefined) return null;
    return trend >= 0 ? '↑' : '↓';
  };

  const getTrendColor = (trend?: number) => {
    if (trend === undefined) return 'text-gray-500';
    return trend >= 0 ? 'text-green-600' : 'text-red-600';
  };

  const getTrendBackground = (trend?: number) => {
    if (trend === undefined) return 'bg-gray-100';
    return trend >= 0 ? 'bg-green-100' : 'bg-red-100';
  };

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
    >
      {stats.map((stat) => (
        <motion.div
          key={stat.id}
          variants={discoveryCard}
          whileHover="hover"
        >
          <GlassPanel variant="elevated" className="h-full p-6 cursor-pointer hover:shadow-xl transition-shadow duration-300">
            <div className="space-y-4">
              {/* Label */}
              <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
                {stat.label}
              </h3>

              {/* Value with AnimatedCounter */}
              <div className="flex items-baseline gap-2">
                <div className="text-4xl font-bold text-slate-900">
                  <AnimatedCounter
                    target={stat.value}
                    duration={2}
                    suffix={stat.suffix || ''}
                  />
                </div>
              </div>

              {/* Trend Indicator */}
              {stat.trend !== undefined && (
                <div className={clsx(
                  'inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium',
                  getTrendBackground(stat.trend),
                  getTrendColor(stat.trend)
                )}>
                  <span className="text-lg">{getTrendIcon(stat.trend)}</span>
                  <span>{Math.abs(stat.trend)}%</span>
                </div>
              )}

              {/* Optional color indicator bar */}
              {stat.color && (
                <div className="pt-2">
                  <div className={clsx(
                    'h-1 rounded-full w-full',
                    stat.color === 'green' && 'bg-green-500',
                    stat.color === 'red' && 'bg-red-500',
                    stat.color === 'blue' && 'bg-blue-500'
                  )} />
                </div>
              )}
            </div>
          </GlassPanel>
        </motion.div>
      ))}
    </motion.div>
  );
};

StatsCards.displayName = 'StatsCards';
