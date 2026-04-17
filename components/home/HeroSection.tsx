'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { GlassPanel, GlassButton } from '@/components/glass';

interface HeroSectionProps {
  title: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  tertiaryCta?: { label: string; href: string };
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  description,
  primaryCta,
  secondaryCta,
  tertiaryCta,
}) => {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#F0F9FF] via-[#E0F2FE] to-[#F0FDF4] animate-gradient-shift"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{
          backgroundSize: '200% 200%',
        }}
      />

      {/* Floating particles (gravity motion) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[#0369A1] rounded-full opacity-10"
            animate={{ y: ['0vh', '100vh'], x: [0, 100] }}
            transition={{
              duration: 8 + i,
              delay: i * 0.5,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: '-10px',
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-4xl mx-auto px-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {/* Logo/Badge */}
        <motion.div
          className="inline-block mb-6"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <GlassPanel variant="elevated" className="px-6 py-2 text-sm font-semibold text-[#0369A1]">
            NxN Commercial Training
          </GlassPanel>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-5xl md:text-7xl font-bold text-[#0F172A] mb-6 leading-tight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {title}
        </motion.h1>

        {/* Description */}
        <motion.p
          className="text-xl md:text-2xl text-[#64748B] mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {description}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Link href={primaryCta.href}>
            <GlassButton variant="primary" size="lg">
              {primaryCta.label}
            </GlassButton>
          </Link>
          {secondaryCta && (
            <Link href={secondaryCta.href}>
              <GlassButton variant="secondary" size="lg">
                {secondaryCta.label}
              </GlassButton>
            </Link>
          )}
          {tertiaryCta && (
            <Link href={tertiaryCta.href}>
              <GlassButton variant="ghost" size="lg">
                {tertiaryCta.label}
              </GlassButton>
            </Link>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
};

HeroSection.displayName = 'HeroSection';
