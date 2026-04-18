'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

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
    <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#FAFBFC] via-[#F0F4FF] to-[#FAFBFC]">
      {/* Bold gradient background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 -left-40 w-80 h-80 bg-[#0056FF] rounded-full mix-blend-multiply filter blur-3xl" />
        <div className="absolute top-0 -right-40 w-80 h-80 bg-[#32E396] rounded-full mix-blend-multiply filter blur-3xl" />
        <div className="absolute -bottom-40 left-1/2 w-80 h-80 bg-[#EB861F] rounded-full mix-blend-multiply filter blur-3xl" />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {/* Badge */}
        <motion.div
          className="inline-block mb-6"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="px-4 py-2 bg-[#0056FF]/10 border border-[#0056FF]/20 rounded-full text-sm font-bold text-[#0056FF] backdrop-blur-sm">
            ✨ NxN Commercial Training
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-5xl md:text-7xl font-bold text-[#1F2937] mb-6 leading-tight"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {title}
        </motion.h1>

        {/* Divider */}
        <motion.div
          className="w-20 h-1 bg-gradient-to-r from-[#0056FF] to-[#32E396] mx-auto mb-8 rounded-full"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        />

        {/* Description */}
        <motion.p
          className="text-lg md:text-xl text-[#4B5563] mb-12 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {description}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Link href={primaryCta.href}>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 12px 24px rgba(0, 86, 255, 0.3)' }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-gradient-to-r from-[#0056FF] to-[#0040CC] text-white font-bold rounded-lg hover:shadow-lg transition-all"
            >
              {primaryCta.label}
            </motion.button>
          </Link>
          {secondaryCta && (
            <Link href={secondaryCta.href}>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 12px 24px rgba(50, 227, 150, 0.3)' }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-[#32E396]/20 text-[#0F8559] font-bold rounded-lg border-2 border-[#32E396] hover:bg-[#32E396]/30 transition-all"
              >
                {secondaryCta.label}
              </motion.button>
            </Link>
          )}
          {tertiaryCta && (
            <Link href={tertiaryCta.href}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 text-[#0056FF] font-bold border-2 border-[#0056FF] rounded-lg hover:bg-[#0056FF]/10 transition-all"
              >
                {tertiaryCta.label}
              </motion.button>
            </Link>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
};

HeroSection.displayName = 'HeroSection';
