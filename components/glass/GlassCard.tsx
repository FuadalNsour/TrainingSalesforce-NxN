import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { discoveryCard } from '@/lib/motion-presets';
import clsx from 'clsx';

interface GlassCardProps {
  title: string;
  description: string;
  href: string;
  icon?: React.ReactNode;
  status?: 'locked' | 'in-progress' | 'completed';
  metadata?: Record<string, string | number>;
  className?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  title,
  description,
  href,
  icon,
  status,
  metadata,
  className,
}) => {
  const statusClasses: Record<string, string> = {
    locked: 'opacity-60 border-gray-300',
    'in-progress': 'border-[#0369A1]',
    completed: 'border-[#16A34A]',
  };

  return (
    <Link href={status === 'locked' ? '#' : href}>
      <motion.div
        variants={discoveryCard}
        whileHover={status !== 'locked' ? 'hover' : undefined}
        className={clsx(
          'rounded-lg border backdrop-blur-2xl bg-white/15 border-white/15 p-6 transition-all duration-300 cursor-pointer',
          statusClasses[status || 'in-progress'],
          className
        )}
      >
        {icon && <div className="mb-4 text-3xl">{icon}</div>}
        <h3 className="text-xl font-bold text-[#0F172A] mb-2">{title}</h3>
        <p className="text-sm text-[#64748B] mb-4">{description}</p>
        {metadata && (
          <div className="flex gap-4 text-xs text-[#64748B]">
            {Object.entries(metadata).map(([key, value]) => (
              <div key={key}>
                <span className="font-semibold">{key}:</span> {value}
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </Link>
  );
};

GlassCard.displayName = 'GlassCard';
