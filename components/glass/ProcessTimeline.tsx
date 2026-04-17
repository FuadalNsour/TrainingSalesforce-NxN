import React from 'react';
import { motion } from 'framer-motion';
import { timelineDot, staggerContainer } from '@/lib/motion-presets';
import clsx from 'clsx';

interface Stage {
  id: string;
  label: string;
  description: string;
}

interface ProcessTimelineProps {
  stages: Stage[];
  currentStage?: number;
  onStageClick?: (stageId: string) => void;
  vertical?: boolean;
}

export const ProcessTimeline: React.FC<ProcessTimelineProps> = ({
  stages,
  currentStage = 0,
  onStageClick,
  vertical = false,
}) => {
  return (
    <motion.div
      className={clsx(
        'flex gap-8 w-full',
        vertical ? 'flex-col' : 'flex-row items-start'
      )}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
    >
      {stages.map((stage, index) => (
        <React.Fragment key={stage.id}>
          {/* Stage Dot */}
          <motion.div
            className="flex flex-col items-center"
            variants={timelineDot}
            onClick={() => onStageClick?.(stage.id)}
          >
            <div
              className={clsx(
                'w-12 h-12 rounded-full flex items-center justify-center font-bold text-white cursor-pointer transition-all duration-300',
                index <= currentStage
                  ? 'bg-[#0369A1] shadow-lg'
                  : 'bg-[#64748B] opacity-50'
              )}
            >
              {index + 1}
            </div>
            <div className="mt-3 text-center max-w-xs">
              <h4 className="font-bold text-[#0F172A]">{stage.label}</h4>
              <p className="text-xs text-[#64748B] mt-1">{stage.description}</p>
            </div>
          </motion.div>

          {/* Connecting Line */}
          {index < stages.length - 1 && (
            <motion.div
              className={clsx(
                'flex-1 h-1 rounded-full my-6',
                index < currentStage
                  ? 'bg-[#0369A1]'
                  : 'bg-[#BAE6FD]'
              )}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: (index + 1) * 0.1 }}
              viewport={{ once: true }}
            />
          )}
        </React.Fragment>
      ))}
    </motion.div>
  );
};

ProcessTimeline.displayName = 'ProcessTimeline';
