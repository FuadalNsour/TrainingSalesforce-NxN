'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { getLabById } from '@/lib/labs-data';
import { LabScenario } from '@/components/labs/LabScenario';
import { LabFeedback } from '@/components/labs/LabFeedback';
import { Button } from '@/components/common/Button';
import Link from 'next/link';
import { ROUTES } from '@/lib/constants';

export default function LabDetailPage() {
  const params = useParams();
  const [labId, setLabId] = useState<string>('');
  const [lab, setLab] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (params?.labId) {
      const id = typeof params.labId === 'string' ? params.labId : '';
      setLabId(id);
      setLab(getLabById(id));
      setIsLoading(false);
    }
  }, [params]);

  const [userAnswer, setUserAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    try {
      const payload = {
        labId,
        labTitle: lab.title || `Lab ${labId}`,
        context: lab.scenario?.context || '',
        situation: lab.scenario?.situation || '',
        question: lab.scenario?.question || '',
        userResponse: userAnswer,
      };

      console.log('Submitting lab response:', payload);

      const response = await fetch('/api/labs/save-response', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log('Save response status:', response.status);
      console.log('Save response data:', data);

      if (!response.ok) {
        console.error('Failed to save response:', data);
      } else {
        console.log('Response saved successfully');
      }
    } catch (error) {
      console.error('Error saving response:', error);
    } finally {
      setSubmitted(true);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FAFBFC] via-[#F0F4FF] to-[#FAFBFC] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block px-6 py-3 bg-[#0056FF]/10 border border-[#0056FF]/20 rounded-lg">
            <p className="text-[#0056FF] font-bold">Loading lab...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!lab) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FAFBFC] via-[#F0F4FF] to-[#FAFBFC] flex items-center justify-center">
        <div className="max-w-lg text-center">
          <h1 className="text-4xl font-bold text-[#1F2937] mb-4">Lab not found</h1>
          <p className="text-[#4B5563] mb-8">The lab you're looking for doesn't exist.</p>
          <Link href={ROUTES.labs}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3 bg-gradient-to-r from-[#0056FF] to-[#0040CC] text-white font-bold rounded-lg hover:shadow-lg transition-all"
            >
              ← Back to Labs
            </motion.button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAFBFC] via-[#F0F4FF] to-[#FAFBFC]">
      {/* Background gradient blobs */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 -right-40 w-80 h-80 bg-[#0056FF] rounded-full mix-blend-multiply filter blur-3xl" />
        <div className="absolute bottom-0 -left-40 w-80 h-80 bg-[#32E396] rounded-full mix-blend-multiply filter blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12 relative z-10">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href={ROUTES.labs} className="text-[#0056FF] hover:text-[#0040CC] mb-8 inline-flex items-center font-bold transition-all">
            ← Back to Labs
          </Link>
        </motion.div>

        {!submitted ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <LabScenario lab={lab} />

            {/* Response section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-12 bg-white/80 backdrop-blur-sm border-2 border-[#0056FF]/20 p-8 rounded-xl shadow-sm"
            >
              <div className="flex items-center mb-6">
                <div className="text-3xl font-bold text-[#0056FF] mr-3">✍️</div>
                <h3 className="text-2xl font-bold text-[#1F2937]">Your Response</h3>
              </div>

              <textarea
                className="w-full p-4 border-2 border-[#E5E7EB] rounded-lg text-[#1F2937] focus:outline-none focus:border-[#0056FF] focus:ring-2 focus:ring-[#0056FF]/20 resize-none"
                rows={8}
                placeholder="Write your answer here... Think through how you would approach this situation using the NxN framework."
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
              />

              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 12px 24px rgba(0, 86, 255, 0.3)' }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmit}
                className="mt-6 px-8 py-4 bg-gradient-to-r from-[#0056FF] to-[#0040CC] text-white font-bold rounded-lg hover:shadow-lg transition-all"
              >
                ✓ Submit Response
              </motion.button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <LabFeedback
              correctAnswer={lab.correctAnswer}
              bestAnswer={lab.bestAnswer}
              explanation={lab.explanation}
              keyLearnings={lab.keyLearnings}
              userAnswer={userAnswer}
              assessmentType={lab.assessmentType}
              scoringRubric={lab.scoringRubric}
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-12 flex gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.location.reload()}
                className="px-8 py-4 bg-gradient-to-r from-[#0056FF] to-[#0040CC] text-white font-bold rounded-lg hover:shadow-lg transition-all"
              >
                🔄 Try Another Lab
              </motion.button>
              <Link href={ROUTES.labs}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-[#32E396]/20 text-[#0F8559] font-bold rounded-lg border-2 border-[#32E396] hover:bg-[#32E396]/30 transition-all"
                >
                  Back to Labs
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
