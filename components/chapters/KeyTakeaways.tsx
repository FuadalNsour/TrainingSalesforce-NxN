'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassPanel } from '@/components/glass';
import { revealContent, staggerContainer } from '@/lib/motion-presets';

interface KeyTakeaway {
  id?: string;
  title?: string;
  content: string;
  icon?: React.ReactNode;
}

interface KeyTakeawaysProps {
  takeaways: string[] | KeyTakeaway[];
  title?: string;
  subtitle?: string;
  allowMultiple?: boolean;
}

/**
 * KeyTakeaways component for chapter detail pages
 * Collapsible glass panels with smooth expand/collapse animations
 *
 * @example
 * <KeyTakeaways
 *   takeaways={["Point 1", "Point 2"]}
 *   title="Key Learning Points"
 * />
 */
export const KeyTakeaways: React.FC<KeyTakeawaysProps> = ({
  takeaways,
  title = 'Key Takeaways',
  subtitle,
  allowMultiple = true,
}) => {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});

  const toggleItem = (index: number) => {
    if (allowMultiple) {
      setExpandedItems((prev) => ({
        ...prev,
        [index]: !prev[index],
      }));
    } else {
      setExpandedItems((prev) => {
        const newState: Record<number, boolean> = {};
        Object.keys(prev).forEach((key) => {
          newState[parseInt(key)] = false;
        });
        newState[index] = !prev[index];
        return newState;
      });
    }
  };

  // Convert string array to KeyTakeaway format if needed
  const normalizedTakeaways: KeyTakeaway[] = takeaways.map((item, idx) => {
    if (typeof item === 'string') {
      return {
        id: `takeaway-${idx}`,
        content: item,
      };
    }
    return {
      id: item.id || `takeaway-${idx}`,
      ...item,
    };
  });

  // Icons for different sections
  const getIconForIndex = (index: number) => {
    const icons = [
      <CheckCircle key="check" className="w-6 h-6" />,
      <Target key="target" className="w-6 h-6" />,
      <Lightbulb key="lightbulb" className="w-6 h-6" />,
      <Shield key="shield" className="w-6 h-6" />,
      <Rocket key="rocket" className="w-6 h-6" />,
    ];
    return icons[index % icons.length];
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-[#F0F9FF] to-white">
      <div className="max-w-4xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-[#0F172A] mb-2">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg text-[#64748B] font-open-sans">{subtitle}</p>
          )}
        </motion.div>

        {/* Takeaways list */}
        <motion.div
          className="space-y-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {normalizedTakeaways.map((takeaway, index) => (
            <motion.div
              key={takeaway.id}
              variants={revealContent}
            >
              <GlassPanel
                variant="surface"
                className="p-6 cursor-pointer transition-all hover:shadow-lg"
                onClick={() => toggleItem(index)}
              >
                {/* Header with icon and title */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-[#0369A1]/10 rounded-lg text-[#0369A1]">
                      {takeaway.icon || getIconForIndex(index)}
                    </div>
                    <div className="flex-1">
                      {takeaway.title && (
                        <h3 className="text-lg font-poppins font-semibold text-[#0F172A] mb-1">
                          {takeaway.title}
                        </h3>
                      )}
                      {!expandedItems[index] && (
                        <p className="text-[#64748B] font-open-sans text-sm line-clamp-1">
                          {takeaway.content}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Expand/collapse indicator */}
                  <motion.div
                    animate={{ rotate: expandedItems[index] ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <svg
                      className="w-5 h-5 text-[#0369A1]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                  </motion.div>
                </div>

                {/* Expanded content */}
                <AnimatePresence>
                  {expandedItems[index] && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="pt-6 mt-6 border-t border-[#BAE6FD]/50">
                        <p className="text-[#1F2937] font-open-sans text-base leading-relaxed">
                          {takeaway.content}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </GlassPanel>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

KeyTakeaways.displayName = 'KeyTakeaways';

/**
 * Simple icon components
 */
const CheckCircle = ({ className = '' }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
      clipRule="evenodd"
    />
  </svg>
);

const Target = ({ className = '' }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
      clipRule="evenodd"
    />
  </svg>
);

const Lightbulb = ({ className = '' }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.343a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM15.657 14.657a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM11 17a1 1 0 102 0v-1a1 1 0 10-2 0v1zM5.343 15.657a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM2 10a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.343 4.343a1 1 0 00-1.414 1.414l.707.707a1 1 0 001.414-1.414L5.343 4.343z" />
  </svg>
);

const Shield = ({ className = '' }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
      clipRule="evenodd"
    />
  </svg>
);

const Rocket = ({ className = '' }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path d="M10.5 1.5H9.5V.5h1v1zM8.5 3H9v1H8V3zm4 0h.5v1h-.5V3zM5 6v8a4 4 0 004 4h2a4 4 0 004-4V6H5zm7 8a2 2 0 01-2 2h-2a2 2 0 01-2-2V8h6v6z" />
  </svg>
);
