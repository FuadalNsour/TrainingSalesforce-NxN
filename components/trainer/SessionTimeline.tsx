'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassPanel } from '@/components/glass/GlassPanel';
import { staggerContainer, revealContent } from '@/lib/motion-presets';
import clsx from 'clsx';

export interface Session {
  id: string;
  title: string;
  date: string;
  time?: string;
  participants: number;
  status: 'completed' | 'scheduled' | 'in-progress';
  description?: string;
}

interface SessionTimelineProps {
  sessions: Session[];
  onSessionClick?: (sessionId: string) => void;
}

const getStatusBadgeColor = (status: Session['status']) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-700';
    case 'in-progress':
      return 'bg-blue-100 text-blue-700';
    case 'scheduled':
      return 'bg-amber-100 text-amber-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

const getStatusDotColor = (status: Session['status']) => {
  switch (status) {
    case 'completed':
      return 'bg-green-500';
    case 'in-progress':
      return 'bg-blue-500';
    case 'scheduled':
      return 'bg-amber-500';
    default:
      return 'bg-gray-500';
  }
};

export const SessionTimeline: React.FC<SessionTimelineProps> = ({
  sessions,
  onSessionClick,
}) => {
  const [expandedSessionId, setExpandedSessionId] = useState<string | null>(null);

  const handleSessionClick = (sessionId: string) => {
    setExpandedSessionId(expandedSessionId === sessionId ? null : sessionId);
    onSessionClick?.(sessionId);
  };

  return (
    <motion.div
      className="space-y-4"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
    >
      {sessions.length === 0 ? (
        <GlassPanel variant="surface" className="p-6 text-center">
          <p className="text-slate-600">No sessions scheduled yet.</p>
        </GlassPanel>
      ) : (
        sessions.map((session, index) => (
          <motion.div
            key={session.id}
            variants={revealContent}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <GlassPanel
              variant="surface"
              className={clsx(
                'p-6 cursor-pointer transition-all duration-300 hover:shadow-lg',
                expandedSessionId === session.id && 'ring-2 ring-blue-500'
              )}
              onClick={() => handleSessionClick(session.id)}
              role="listitem"
            >
              {/* Timeline Dot and Connector */}
              <div className="flex gap-6">
                {/* Left side: Timeline indicator */}
                <div className="flex flex-col items-center">
                  {/* Status dot */}
                  <div
                    className={clsx(
                      'w-4 h-4 rounded-full ring-4 ring-white',
                      getStatusDotColor(session.status)
                    )}
                  />

                  {/* Vertical line (except for last item) */}
                  {index < sessions.length - 1 && (
                    <div className="w-1 h-16 bg-gradient-to-b from-slate-300 to-slate-100 mt-2" />
                  )}
                </div>

                {/* Right side: Session content */}
                <div className="flex-1 pt-1">
                  {/* Session header */}
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-1">
                        {session.title}
                      </h3>
                      <p className="text-sm text-slate-600">
                        {session.date}
                        {session.time && ` at ${session.time}`}
                      </p>
                    </div>

                    {/* Status badge */}
                    <span
                      className={clsx(
                        'px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap',
                        getStatusBadgeColor(session.status)
                      )}
                    >
                      {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                    </span>
                  </div>

                  {/* Participants info */}
                  <p className="text-sm text-slate-600 mb-3">
                    <span className="font-medium text-slate-700">{session.participants}</span>{' '}
                    {session.participants === 1 ? 'participant' : 'participants'}
                  </p>

                  {/* Description (shown when expanded) */}
                  <AnimatePresence>
                    {expandedSessionId === session.id && session.description && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-4 pt-4 border-t border-white/20"
                      >
                        <p className="text-sm text-slate-700">{session.description}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </GlassPanel>
          </motion.div>
        ))
      )}
    </motion.div>
  );
};

SessionTimeline.displayName = 'SessionTimeline';
