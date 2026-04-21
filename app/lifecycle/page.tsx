'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LifecycleViewer } from '@/components/lifecycle/LifecycleViewer';
import { StageCard } from '@/components/lifecycle/StageCard';
import { StageDataCard } from '@/components/lifecycle/StageDataCard';
import { staggerContainer } from '@/lib/motion-presets';

// NxN Buyer Journey Stages
const LIFECYCLE_STAGES = [
  {
    id: 'awareness',
    number: 1,
    title: 'Awareness',
    description: 'Prospect becomes aware of their problem',
    icon: '👁️',
    expandedContent:
      'The awareness stage is where potential customers first recognize they have a problem or need. This is the beginning of the buyer\'s journey where they become conscious of a pain point that needs addressing. Effective marketing and educational content play a crucial role in this stage.',
    metrics: [
      { label: 'Reach', value: '10,000', color: '#0369A1' },
      { label: 'Impressions', value: '25,000', color: '#0369A1' },
      { label: 'Awareness Rate', value: '42%', color: '#16A34A' },
    ],
    color: '#0369A1',
  },
  {
    id: 'interest',
    number: 2,
    title: 'Interest',
    description: 'Prospect researches solutions',
    icon: '🎯',
    expandedContent:
      'During the interest stage, prospects actively seek out information about potential solutions to their problem. They consume content, compare options, and research vendors. Your sales team should provide valuable resources and establish thought leadership to guide their research.',
    metrics: [
      { label: 'Engagement', value: '3,500', color: '#3B82F6' },
      { label: 'Click-Through Rate', value: '28%', color: '#3B82F6' },
      { label: 'Time on Site', value: '5:42m', color: '#1F2937' },
    ],
    color: '#3B82F6',
  },
  {
    id: 'evaluation',
    number: 3,
    title: 'Evaluation',
    description: 'Prospect compares solutions',
    icon: '⚖️',
    expandedContent:
      'The evaluation stage involves prospects narrowing down their choices and comparing different solutions. They assess features, pricing, and vendors. Provide comparison materials, case studies, and product demonstrations to facilitate their decision-making process.',
    metrics: [
      { label: 'Comparison Rate', value: '65%', color: '#06B6D4' },
      { label: 'Demo Requests', value: '450', color: '#06B6D4' },
      { label: 'Content Downloads', value: '820', color: '#06B6D4' },
    ],
    color: '#06B6D4',
  },
  {
    id: 'decision',
    number: 4,
    title: 'Decision',
    description: 'Prospect makes purchase decision',
    icon: '🤝',
    expandedContent:
      'In the decision stage, prospects are ready to commit to a solution. They may request pricing, negotiate terms, or ask final questions. This is where your sales team can close the deal. Personalized outreach and responsive support are critical.',
    metrics: [
      { label: 'Conversion Rate', value: '38%', color: '#10B981' },
      { label: 'Deal Velocity', value: '14 days', color: '#10B981' },
      { label: 'Avg Deal Size', value: '$45K', color: '#10B981' },
    ],
    color: '#10B981',
  },
  {
    id: 'commitment',
    number: 5,
    title: 'Commitment',
    description: 'Prospect becomes long-term customer',
    icon: '⭐',
    expandedContent:
      'The commitment stage marks the transition from prospect to customer. The focus shifts to onboarding, implementation, and ensuring customer success. Building strong relationships during this phase leads to retention, upsells, and customer advocacy.',
    metrics: [
      { label: 'Customer Satisfaction', value: '94%', color: '#16A34A' },
      { label: 'Retention Rate', value: '87%', color: '#16A34A' },
      { label: 'Upsell Rate', value: '32%', color: '#16A34A' },
    ],
    color: '#16A34A',
  },
];

export default function LifecyclePage() {
  const [expandedStage, setExpandedStage] = useState<string | null>(null);
  const [currentStage, setCurrentStage] = useState(0);

  const handleStageClick = (stageId: string) => {
    setExpandedStage(expandedStage === stageId ? null : stageId);
    const stageIndex = LIFECYCLE_STAGES.findIndex((s) => s.id === stageId);
    if (stageIndex !== -1) {
      setCurrentStage(stageIndex);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-[#F0F9FF] to-white">
      {/* Header Section */}
      <section className="bg-gradient-to-br from-white to-[#F0F9FF] border-b border-[#BAE6FD] py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0F172A] mb-4">
              NxN Lifecycle Explorer
            </h1>
            <p className="text-lg md:text-xl text-[#64748B] max-w-2xl">
              Interactive visualization of the complete Lead → Account → Opportunity → Quote → Contract buyer journey
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        {/* Section: Full-Screen Timeline */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-2">
              The NxN Journey
            </h2>
            <p className="text-[#64748B] text-base md:text-lg">
              Five critical stages that define the buyer journey
            </p>
          </div>

        </motion.section>

        {/* Section: Interactive Stage Cards */}
        <motion.section
          className="mb-20"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-2">
              Explore Each Stage
            </h2>
            <p className="text-[#64748B] text-base md:text-lg">
              Click on any stage to see detailed information and metrics
            </p>
          </div>

          {/* Stage Cards Grid */}
          <div className="space-y-6">
            {LIFECYCLE_STAGES.map((stage) => (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, margin: '-100px' }}
              >
                <StageCard
                  {...stage}
                  isActive={expandedStage === stage.id || currentStage === stage.number - 1}
                  onClick={() => handleStageClick(stage.id)}
                />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Section: Stage Metrics Dashboard */}
        {expandedStage && (
          <motion.section
            className="mb-20"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-2">
                Stage Metrics
              </h2>
              <p className="text-[#64748B] text-base md:text-lg">
                Key performance indicators for the {LIFECYCLE_STAGES.find((s) => s.id === expandedStage)?.title} stage
              </p>
            </div>

            {/* Metrics Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {LIFECYCLE_STAGES.find((s) => s.id === expandedStage)?.metrics.map(
                (metric, idx) => (
                  <StageDataCard
                    key={idx}
                    label={metric.label}
                    value={typeof metric.value === 'number' ? metric.value : parseInt(metric.value as string) || 0}
                    color={metric.color || '#0369A1'}
                    delay={idx * 0.1}
                  />
                )
              )}
            </div>
          </motion.section>
        )}

        {/* Legacy LifecycleViewer - Optional */}
        <motion.section
          className="mt-20 pt-20 border-t border-white/20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-2">
              Deep Dive: Lifecycle Details
            </h2>
            <p className="text-[#64748B] text-base md:text-lg">
              Learn about entry/exit conditions, actions, and common mistakes
            </p>
          </div>
          <LifecycleViewer />
        </motion.section>
      </div>
    </main>
  );
}
