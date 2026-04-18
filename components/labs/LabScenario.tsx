import { motion } from 'framer-motion';
import { LabScenario as LabScenarioType } from '@/lib/labs-data';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';

interface LabScenarioProps {
  lab: LabScenarioType;
}

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'beginner':
      return { bg: '#32E396/10', border: '#32E396', text: '#0F8559', emoji: '🟢' };
    case 'intermediate':
      return { bg: '#0056FF/10', border: '#0056FF', text: '#0040CC', emoji: '🔵' };
    case 'advanced':
      return { bg: '#EB861F/10', border: '#EB861F', text: '#B85D0B', emoji: '🔴' };
    default:
      return { bg: '#E5E7EB/10', border: '#E5E7EB', text: '#6B7280', emoji: '⚪' };
  }
};

export function LabScenario({ lab }: LabScenarioProps) {
  const diffColor = getDifficultyColor(lab.difficulty);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div
            className="px-3 py-1 rounded-full text-xs font-bold"
            style={{ backgroundColor: `${diffColor.border}20`, color: diffColor.text }}
          >
            {diffColor.emoji} {lab.difficulty.charAt(0).toUpperCase() + lab.difficulty.slice(1)}
          </div>
          <span className="text-sm font-bold text-[#6B7280]">📖 Chapter {parseInt(lab.chapterId.substring(0, 2), 10)}</span>
        </div>
        <h1 className="text-5xl font-bold text-[#1F2937] mb-3">{lab.title}</h1>
        <p className="text-lg text-[#4B5563]">{lab.description}</p>
      </div>

      {/* Scenario Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="bg-white/80 backdrop-blur-sm border-2 p-8 rounded-xl shadow-sm"
        style={{
          backgroundColor: diffColor.bg,
          borderColor: diffColor.border,
        }}
      >
        <div className="space-y-8">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold text-[#1F2937] mb-2">
              {lab.scenario.title}
            </h2>
          </motion.div>

          {/* Context */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-lg font-bold text-[#1F2937] mb-3">📋 Context</h3>
            <p className="text-[#4B5563] leading-relaxed">{lab.scenario.context}</p>
          </motion.div>

          {/* Situation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-lg font-bold text-[#1F2937] mb-3">⚙️ Situation</h3>
            <p className="text-[#4B5563] leading-relaxed">{lab.scenario.situation}</p>
          </motion.div>

          {/* Challenge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="pt-6 border-t-2"
            style={{ borderColor: `${diffColor.border}30` }}
          >
            <h3 className="text-lg font-bold text-[#1F2937] mb-3">💡 Your Challenge</h3>
            <p className="text-lg text-[#1F2937] leading-relaxed font-semibold">{lab.scenario.question}</p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
