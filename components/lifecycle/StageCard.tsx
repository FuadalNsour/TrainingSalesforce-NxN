'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GlassPanel } from '@/components/glass/GlassPanel';
import clsx from 'clsx';

export interface StageMetric {
  label: string;
  value: string | number;
  color?: string;
}

interface StageCardProps {
  id: string;
  number: number;
  title: string;
  description: string;
  icon: string;
  expandedContent: string;
  metrics: StageMetric[];
  color: string;
  isActive?: boolean;
  onClick?: () => void;
}

export const StageCard: React.FC<StageCardProps> = ({
  id,
  number,
  title,
  description,
  icon,
  expandedContent,
  metrics,
  color,
  isActive = false,
  onClick,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    setIsExpanded(!isExpanded);
    onClick?.();
  };

  return (
    <motion.div
      layout
      className="w-full mb-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: '-100px' }}
    >
      <GlassPanel
        variant={isActive ? 'elevated' : 'surface'}
        className={clsx(
          'p-6 md:p-8 cursor-pointer transition-all duration-300',
          isActive && `border-l-4 shadow-lg`,
        )}
        style={
          isActive ? {
            borderLeftColor: color,
            boxShadow: `0 0 20px ${color}33`,
          } : {}
        }
        onClick={handleClick}
      >
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          {/* Number Circle */}
          <div
            className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
            style={{ backgroundColor: color }}
          >
            {number}
          </div>

          {/* Icon and Title */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">{icon}</span>
              <h3 className="text-2xl md:text-3xl font-bold text-[#0F172A]">{title}</h3>
            </div>
            <p className="text-[#64748B] text-base md:text-lg">{description}</p>
          </div>

          {/* Expand Icon */}
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="flex-shrink-0 text-[#0369A1]"
          >
            ▼
          </motion.div>
        </div>

        {/* Expanded Content */}
        <motion.div
          initial={false}
          animate={{
            height: isExpanded ? 'auto' : 0,
            opacity: isExpanded ? 1 : 0,
            marginTop: isExpanded ? 16 : 0,
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="overflow-hidden"
        >
          <div className="pt-4 border-t border-white/20">
            {/* Expanded Description */}
            <p className="text-[#0F172A] text-base leading-relaxed mb-6">{expandedContent}</p>

            {/* Metrics Grid */}
            {metrics.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {metrics.map((metric, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                    className="bg-white/10 rounded-lg p-4 border border-white/10"
                  >
                    <p className="text-xs text-[#64748B] uppercase font-semibold mb-2">
                      {metric.label}
                    </p>
                    <p
                      className="text-xl md:text-2xl font-bold"
                      style={{ color: metric.color || color }}
                    >
                      {metric.value}
                    </p>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </GlassPanel>
    </motion.div>
  );
};

StageCard.displayName = 'StageCard';
