'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GlassPanel } from '@/components/glass/GlassPanel';
import { StatsCards, SessionTimeline, QuickActions } from '@/components/trainer';
import { staggerContainer, revealContent } from '@/lib/motion-presets';

// Mock trainer data - in production, this would come from a database or API
const mockTrainerData = {
  name: 'Sarah Johnson',
  email: 'sarah.johnson@company.com',
  department: 'Sales Development',
};

const mockStats = [
  {
    id: 'active-learners',
    label: 'Active Learners',
    value: 248,
    trend: 12,
    color: 'green' as const,
  },
  {
    id: 'total-sessions',
    label: 'Total Sessions',
    value: 42,
    trend: 8,
    color: 'green' as const,
  },
  {
    id: 'avg-rating',
    label: 'Avg Rating',
    value: 48,
    trend: -3,
    suffix: '/50',
    color: 'red' as const,
  },
  {
    id: 'completion-rate',
    label: 'Completion Rate',
    value: 87,
    trend: 5,
    suffix: '%',
    color: 'green' as const,
  },
];

const mockSessions = [
  {
    id: 'session-001',
    title: 'NxN Fundamentals - Q2 Cohort',
    date: 'Apr 18, 2026',
    time: '2:00 PM',
    participants: 24,
    status: 'scheduled' as const,
    description: 'Introduction to the NxN framework and core principles. Expected duration: 2 hours.',
  },
  {
    id: 'session-002',
    title: 'Discovery Techniques Workshop',
    date: 'Apr 15, 2026',
    time: '10:00 AM',
    participants: 18,
    status: 'completed' as const,
    description: 'Deep dive into effective discovery questioning. Covered 5 key techniques with role-playing exercises.',
  },
  {
    id: 'session-003',
    title: 'Advanced Commitment Strategies',
    date: 'Apr 12, 2026',
    time: '3:30 PM',
    participants: 32,
    status: 'completed' as const,
    description: 'Navigating complex stakeholder situations. Interactive case studies and breakout discussions.',
  },
  {
    id: 'session-004',
    title: 'Objection Handling Masterclass',
    date: 'Apr 10, 2026',
    time: '1:00 PM',
    participants: 21,
    status: 'completed' as const,
    description: 'Handling common sales objections with confidence. Scripting and live practice scenarios.',
  },
  {
    id: 'session-005',
    title: 'Q2 Performance Review & Planning',
    date: 'Apr 25, 2026',
    time: '9:00 AM',
    participants: 1,
    status: 'scheduled' as const,
    description: 'One-on-one session to review Q2 progress and plan Q3 learning objectives.',
  },
];

const mockQuickActions = [
  {
    id: 'action-new-session',
    label: 'Start New Session',
    icon: '▶',
    onClick: () => alert('Start new session'),
    color: 'primary' as const,
  },
  {
    id: 'action-view-reports',
    label: 'View Reports',
    icon: '📊',
    href: '/trainer/reports',
    color: 'secondary' as const,
  },
  {
    id: 'action-message-team',
    label: 'Message Team',
    icon: '💬',
    onClick: () => alert('Open messaging'),
    color: 'secondary' as const,
  },
  {
    id: 'action-create-assignment',
    label: 'Create Assignment',
    icon: '📝',
    href: '/trainer/assignments/new',
    color: 'secondary' as const,
  },
];

export default function TrainerPage() {
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <motion.div
        className="space-y-12"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        {/* Welcome Section */}
        <motion.section variants={revealContent}>
          <GlassPanel variant="elevated" className="p-8 mb-8">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-4xl font-bold text-slate-900 mb-2">
                  Welcome, {mockTrainerData.name}
                </h1>
                <p className="text-slate-600 mb-3">
                  {mockTrainerData.department}
                </p>
                <p className="text-slate-500 text-sm">{formattedDate}</p>
              </div>
            </div>
          </GlassPanel>
        </motion.section>

        {/* Performance Metrics Section */}
        <motion.section variants={revealContent} className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Performance Metrics
            </h2>
            <p className="text-slate-600">
              Track your training impact and learner progress
            </p>
          </div>
          <StatsCards stats={mockStats} />
        </motion.section>

        {/* Recent Sessions Section */}
        <motion.section variants={revealContent} className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Recent Sessions
            </h2>
            <p className="text-slate-600">
              Manage and track your upcoming and completed training sessions
            </p>
          </div>
          <GlassPanel variant="surface" className="p-6">
            <SessionTimeline
              sessions={mockSessions}
              onSessionClick={(sessionId) => {
                console.log('Session clicked:', sessionId);
              }}
            />
          </GlassPanel>
        </motion.section>

        {/* Quick Actions Section */}
        <motion.section variants={revealContent} className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Quick Actions
            </h2>
            <p className="text-slate-600">
              Common tasks and frequently used tools
            </p>
          </div>
          <QuickActions actions={mockQuickActions} variant="card" />
        </motion.section>
      </motion.div>
    </main>
  );
}
