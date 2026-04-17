'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GlassPanel } from '@/components/glass';
import { revealContent } from '@/lib/motion-presets';

interface ContentSectionProps {
  title: string;
  content: string | React.ReactNode;
  description?: string;
  icon?: React.ReactNode;
  variant?: 'elevated' | 'surface' | 'deep';
  className?: string;
}

/**
 * ContentSection component for chapter detail pages
 * Wraps content in glass panels with smooth animations
 *
 * @example
 * <ContentSection
 *   title="Discovery Phase"
 *   content="Learn how to discover customer needs..."
 *   variant="elevated"
 * />
 */
export const ContentSection: React.FC<ContentSectionProps> = ({
  title,
  content,
  description,
  icon,
  variant = 'surface',
  className,
}) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={revealContent}
    >
      <GlassPanel variant={variant} className={`p-8 md:p-12 ${className || ''}`}>
        {/* Header section with optional icon */}
        {(icon || title) && (
          <div className="flex items-start gap-4 mb-6">
            {icon && (
              <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-[#0369A1]/10 rounded-lg">
                {icon}
              </div>
            )}
            <div>
              <h3 className="text-2xl md:text-3xl font-poppins font-semibold text-[#0F172A] mb-2">
                {title}
              </h3>
              {description && (
                <p className="text-[#64748B] font-open-sans text-sm">
                  {description}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Content body */}
        <div className="font-open-sans text-[#1F2937] leading-relaxed space-y-4">
          {typeof content === 'string' ? (
            <p className="whitespace-pre-wrap text-base md:text-lg">
              {content}
            </p>
          ) : (
            content
          )}
        </div>
      </GlassPanel>
    </motion.div>
  );
};

ContentSection.displayName = 'ContentSection';
