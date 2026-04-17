'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassPanel } from '@/components/glass/GlassPanel';
import clsx from 'clsx';

interface LabModalProps {
  isOpen: boolean;
  lab: {
    id: string;
    title: string;
    description: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    duration: number;
    rating?: number;
    topics?: string[];
    fullDescription?: string;
    instructions?: string[];
    requirements?: string[];
    resources?: { title: string; url?: string }[];
  } | null;
  onClose: () => void;
}

const difficultyConfig: Record<string, { color: string; label: string }> = {
  beginner: { color: '#16A34A', label: 'Beginner' },
  intermediate: { color: '#0369A1', label: 'Intermediate' },
  advanced: { color: '#DC2626', label: 'Advanced' },
};

export const LabModal: React.FC<LabModalProps> = ({ isOpen, lab, onClose }) => {
  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!lab) return null;

  const config = difficultyConfig[lab.difficulty];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            data-testid="modal-backdrop"
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          >
            <motion.div
              className="w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
                duration: 0.3,
              }}
              onClick={(e) => e.stopPropagation()}
              data-testid="modal-content"
            >
              <GlassPanel
                variant="elevated"
                className="p-8 rounded-2xl relative"
              >
                {/* Close Button */}
                <motion.button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Close modal"
                  data-testid="modal-close-button"
                >
                  <svg
                    className="w-6 h-6 text-[#0F172A]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </motion.button>

                {/* Header */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="mb-6"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h2 className="text-3xl font-bold text-[#0F172A]">{lab.title}</h2>
                    <span
                      className="px-3 py-1 rounded-full text-sm font-semibold text-white whitespace-nowrap"
                      style={{ backgroundColor: config.color }}
                    >
                      {config.label}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-[#64748B]">
                    <div>⏱ {lab.duration} minutes</div>
                    {lab.rating !== undefined && (
                      <div>
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="text-yellow-500">
                            {i < lab.rating! ? '★' : '☆'}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Description */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="mb-6"
                >
                  <p className="text-[#64748B] leading-relaxed">
                    {lab.fullDescription || lab.description}
                  </p>
                </motion.div>

                {/* Topics */}
                {lab.topics && lab.topics.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-6"
                  >
                    <h3 className="text-sm font-semibold text-[#0F172A] mb-2">Topics</h3>
                    <div className="flex flex-wrap gap-2">
                      {lab.topics.map((topic) => (
                        <span
                          key={topic}
                          className="px-3 py-1 rounded-full bg-white/20 text-[#0369A1] text-xs font-medium"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Requirements */}
                {lab.requirements && lab.requirements.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="mb-6"
                  >
                    <h3 className="text-sm font-semibold text-[#0F172A] mb-3">Requirements</h3>
                    <ul className="space-y-2">
                      {lab.requirements.map((req, i) => (
                        <li key={i} className="flex gap-3 text-[#64748B]">
                          <span className="text-[#0369A1] font-bold flex-shrink-0">•</span>
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                {/* Instructions */}
                {lab.instructions && lab.instructions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mb-6"
                  >
                    <h3 className="text-sm font-semibold text-[#0F172A] mb-3">Instructions</h3>
                    <ol className="space-y-2">
                      {lab.instructions.map((instruction, i) => (
                        <li key={i} className="flex gap-3 text-[#64748B]">
                          <span className="text-[#0369A1] font-bold flex-shrink-0">{i + 1}.</span>
                          <span>{instruction}</span>
                        </li>
                      ))}
                    </ol>
                  </motion.div>
                )}

                {/* Resources */}
                {lab.resources && lab.resources.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                  >
                    <h3 className="text-sm font-semibold text-[#0F172A] mb-3">Resources</h3>
                    <ul className="space-y-2">
                      {lab.resources.map((resource, i) => (
                        <li key={i}>
                          {resource.url ? (
                            <a
                              href={resource.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#0369A1] hover:underline font-medium"
                            >
                              {resource.title} →
                            </a>
                          ) : (
                            <span className="text-[#64748B]">{resource.title}</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </GlassPanel>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

LabModal.displayName = 'LabModal';
