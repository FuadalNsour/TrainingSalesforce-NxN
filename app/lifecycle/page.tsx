'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

const stages = [
  { id: 'awareness', name: 'Awareness', color: '#0056FF', entryLogic: 'Prospect becomes aware of their problem', exitLogic: 'Move to Interest stage', userActions: ['Research target market', 'Identify pain points', 'Map prospect journey'], commonMistakes: ['Targeting wrong audience', 'Unclear messaging', 'No follow-up strategy'] },
  { id: 'interest', name: 'Interest', color: '#0369A1', entryLogic: 'Prospect shows initial interest in solution', exitLogic: 'Move to Evaluation stage', userActions: ['Provide relevant content', 'Build relationship', 'Understand needs'], commonMistakes: ['Too much selling too early', 'Ignoring objections', 'Poor follow-up'] },
  { id: 'evaluation', name: 'Evaluation', color: '#06B6D4', entryLogic: 'Prospect evaluates solutions and options', exitLogic: 'Move to Decision stage', userActions: ['Demo product/service', 'Provide pricing', 'Address concerns'], commonMistakes: ['Lack of transparency', 'Weak value proposition', 'Slow response'] },
  { id: 'decision', name: 'Decision', color: '#14B8A6', entryLogic: 'Prospect ready to make purchasing decision', exitLogic: 'Move to Commitment stage', userActions: ['Negotiate terms', 'Handle objections', 'Close the deal'], commonMistakes: ['Unrealistic terms', 'Poor negotiation', 'Missing contract details'] },
  { id: 'commitment', name: 'Commitment', color: '#10B981', entryLogic: 'Deal is closed and contract signed', exitLogic: 'Customer becomes active account', userActions: ['Deliver on promises', 'Set up account', 'Onboard customer'], commonMistakes: ['Poor handoff', 'Unmet expectations', 'Missing support'] },
];

export default function LifecyclePage() {
  const [selectedStage, setSelectedStage] = useState<typeof stages[0] | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAFBFC] via-[#F0F4FF] to-[#FAFBFC]">
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 -right-40 w-80 h-80 bg-[#0056FF] rounded-full mix-blend-multiply filter blur-3xl" />
        <div className="absolute bottom-0 -left-40 w-80 h-80 bg-[#32E396] rounded-full mix-blend-multiply filter blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16 relative z-10">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-16">
          <Link href="/" className="text-[#0056FF] hover:text-[#0040CC] mb-8 inline-flex items-center font-bold transition-all">
            Back to Home
          </Link>
          <h1 className="text-5xl md:text-6xl font-bold text-[#1F2937] mb-4">The NxN Journey</h1>
        </motion.div>

        {/* Journey Path */}
        <div className="space-y-8 mb-16">
          {stages.map((stage, index) => (
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-center gap-6"
            >
              {/* Stage Circle */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg"
                  style={{ backgroundColor: stage.color }}
                >
                  {stage.name.charAt(0)}
                </div>
                {index < stages.length - 1 && (
                  <div
                    className="w-1 h-12 mt-2"
                    style={{ backgroundColor: stage.color }}
                  />
                )}
              </div>

              {/* Stage Card */}
              <motion.button
                onClick={() => setSelectedStage(stage)}
                whileHover={{ y: -4, boxShadow: '0 10px 25px rgba(0, 86, 255, 0.2)' }}
                className="flex-1 text-left bg-white/80 backdrop-blur-sm border-2 border-[#E5E7EB] p-6 rounded-xl shadow-sm transition-all hover:border-[#0056FF] group"
              >
                <h3 className="text-2xl font-bold text-[#1F2937] group-hover:text-[#0056FF] transition-colors">
                  {stage.name}
                </h3>
                <motion.div
                  className="text-[#0056FF] font-bold text-sm mt-3 flex items-center gap-2"
                  whileHover={{ x: 4 }}
                >
                  Explore Stage →
                </motion.div>
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Modal */}
        {selectedStage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedStage(null)}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div
                      className="w-14 h-14 rounded-full mb-3 flex items-center justify-center text-white font-bold text-xl"
                      style={{ backgroundColor: selectedStage.color }}
                    >
                      {selectedStage.name.charAt(0)}
                    </div>
                    <h2 className="text-3xl font-bold text-[#1F2937]">{selectedStage.name} Stage</h2>
                  </div>
                  <button onClick={() => setSelectedStage(null)} className="text-[#6B7280] hover:text-[#1F2937] text-2xl">
                    ✕
                  </button>
                </div>

                <div className="mb-6 p-4 bg-[#F0F9FF] border-l-4 border-[#0056FF] rounded">
                  <h3 className="font-bold text-[#0056FF] mb-2">Entry Logic</h3>
                  <p className="text-[#4B5563]">{selectedStage.entryLogic}</p>
                </div>

                <div className="mb-6 p-4 bg-[#F0F9FF] border-l-4 border-[#0056FF] rounded">
                  <h3 className="font-bold text-[#0056FF] mb-2">Exit Logic</h3>
                  <p className="text-[#4B5563]">{selectedStage.exitLogic}</p>
                </div>

                <div className="mb-6">
                  <h3 className="font-bold text-[#1F2937] mb-3">Key User Actions</h3>
                  <ul className="space-y-2">
                    {selectedStage.userActions.map((action, idx) => (
                      <li key={idx} className="flex gap-3 text-[#4B5563]">
                        <span className="text-[#0056FF] font-bold">✓</span>
                        <span>{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6 p-4 bg-[#FEF3C7] border-l-4 border-[#EB861F] rounded">
                  <h3 className="font-bold text-[#B85D0B] mb-3">Common Mistakes</h3>
                  <ul className="space-y-2">
                    {selectedStage.commonMistakes.map((mistake, idx) => (
                      <li key={idx} className="flex gap-3 text-[#B85D0B]">
                        <span className="font-bold">!</span>
                        <span>{mistake}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => setSelectedStage(null)}
                  className="w-full px-6 py-3 bg-gradient-to-r from-[#0056FF] to-[#0040CC] text-white font-bold rounded-lg hover:shadow-lg transition-all"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
