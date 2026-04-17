'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { GlassButton } from '@/components/glass/GlassButton';
import { GlassPanel } from '@/components/glass/GlassPanel';
import { staggerContainer, revealContent } from '@/lib/motion-presets';
import clsx from 'clsx';

export interface QuickAction {
  id: string;
  label: string;
  icon?: string;
  href?: string;
  onClick?: () => void;
  color?: 'primary' | 'secondary' | 'ghost';
}

interface QuickActionsProps {
  actions: QuickAction[];
  variant?: 'inline' | 'card';
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  actions,
  variant = 'card',
}) => {
  if (variant === 'inline') {
    return (
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {actions.map((action) => (
          <motion.div key={action.id} variants={revealContent}>
            {action.href ? (
              <Link href={action.href} className="block">
                <GlassButton
                  variant={action.color || 'primary'}
                  size="md"
                  className="w-full justify-center"
                  aria-label={action.label}
                >
                  {action.icon && <span className="mr-2">{action.icon}</span>}
                  {action.label}
                </GlassButton>
              </Link>
            ) : (
              <GlassButton
                variant={action.color || 'primary'}
                size="md"
                className="w-full justify-center"
                onClick={action.onClick}
                aria-label={action.label}
              >
                {action.icon && <span className="mr-2">{action.icon}</span>}
                {action.label}
              </GlassButton>
            )}
          </motion.div>
        ))}
      </motion.div>
    );
  }

  // Card variant - actions in a glass panel
  return (
    <GlassPanel variant="elevated" className="p-8">
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {actions.map((action) => (
          <motion.div key={action.id} variants={revealContent}>
            {action.href ? (
              <Link href={action.href} className="block">
                <GlassButton
                  variant={action.color || 'primary'}
                  size="md"
                  className="w-full justify-center"
                  aria-label={action.label}
                >
                  {action.icon && <span className="mr-2 text-lg">{action.icon}</span>}
                  <span>{action.label}</span>
                </GlassButton>
              </Link>
            ) : (
              <GlassButton
                variant={action.color || 'primary'}
                size="md"
                className="w-full justify-center"
                onClick={action.onClick}
                aria-label={action.label}
              >
                {action.icon && <span className="mr-2 text-lg">{action.icon}</span>}
                <span>{action.label}</span>
              </GlassButton>
            )}
          </motion.div>
        ))}
      </motion.div>
    </GlassPanel>
  );
};

QuickActions.displayName = 'QuickActions';
