'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { GlassPanel } from '@/components/glass/GlassPanel';
import { LabFilter, type FilterOption } from '@/components/labs/LabFilter';
import { LabGrid } from '@/components/labs/LabGrid';
import { LABS } from '@/lib/labs-data';
import { staggerContainer, revealContent } from '@/lib/motion-presets';

interface LabData {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number;
  topics?: string[];
  rating?: number;
  href: string;
  fullDescription?: string;
  instructions?: string[];
  requirements?: string[];
  resources?: { title: string; url?: string }[];
}

export default function LabsPage() {
  const [selectedFilters, setSelectedFilters] = useState<FilterOption[]>([]);

  // Transform LABS data to our format
  const allLabs: LabData[] = useMemo(() => {
    return Object.values(LABS).map((lab) => ({
      id: lab.id,
      title: lab.title,
      description: lab.description,
      difficulty: lab.difficulty,
      duration: 45,
      topics: [],
      rating: 4,
      href: `/labs/${lab.id}`,
      fullDescription: lab.scenario?.context || lab.description,
      instructions: [
        lab.scenario?.situation || '',
        lab.scenario?.question || '',
        'Provide your answer and receive feedback from experts.',
      ].filter(Boolean),
      requirements: [
        'Understanding of NxN sales framework',
        'Real-world sales context',
      ],
      resources: [
        { title: 'NxN Sales Framework Guide' },
        { title: 'Chapter: ' + (lab.chapterId || 'Reference Material') },
      ],
    }));
  }, []);

  const difficulties: FilterOption[] = [
    { id: 'beginner', label: 'Beginner', category: 'difficulty', count: allLabs.filter((l) => l.difficulty === 'beginner').length },
    { id: 'intermediate', label: 'Intermediate', category: 'difficulty', count: allLabs.filter((l) => l.difficulty === 'intermediate').length },
    { id: 'advanced', label: 'Advanced', category: 'difficulty', count: allLabs.filter((l) => l.difficulty === 'advanced').length },
  ];

  const allTopics = useMemo(() => {
    const topicSet = new Set<string>();
    allLabs.forEach((lab) => {
      if (lab.topics) {
        lab.topics.forEach((t) => topicSet.add(t));
      }
    });
    return Array.from(topicSet)
      .sort()
      .map((topic) => ({
        id: topic.toLowerCase().replace(/\s+/g, '-'),
        label: topic,
        category: 'topic' as const,
        count: allLabs.filter((l) => l.topics?.includes(topic)).length,
      }));
  }, [allLabs]);

  const filterOptions = [...difficulties, ...allTopics];

  const filteredLabs = useMemo(() => {
    if (selectedFilters.length === 0) {
      return allLabs;
    }

    const selectedDifficulties = selectedFilters
      .filter((f) => f.category === 'difficulty')
      .map((f) => f.id);
    const selectedTopics = selectedFilters
      .filter((f) => f.category === 'topic')
      .map((f) => f.label);

    return allLabs.filter((lab) => {
      const matchesDifficulty =
        selectedDifficulties.length === 0 ||
        selectedDifficulties.includes(lab.difficulty);
      const matchesTopic =
        selectedTopics.length === 0 ||
        (lab.topics && lab.topics.some((t) => selectedTopics.includes(t)));

      return matchesDifficulty && matchesTopic;
    });
  }, [allLabs, selectedFilters]);


  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAFBFC] via-[#F0F4FF] to-[#FAFBFC]">
      {/* Background gradient blobs */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 -right-40 w-80 h-80 bg-[#0056FF] rounded-full mix-blend-multiply filter blur-3xl" />
        <div className="absolute bottom-0 -left-40 w-80 h-80 bg-[#32E396] rounded-full mix-blend-multiply filter blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        {/* Header */}
        <motion.section
          className="mb-16"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={revealContent} className="mb-6">
            <div className="bg-gradient-to-r from-[#0056FF]/5 to-[#32E396]/5 border border-[#0056FF]/20 p-8 rounded-2xl backdrop-blur-sm">
              <h1 className="text-5xl md:text-6xl font-bold text-[#1F2937] mb-4">
                ⚡ Interactive Labs
              </h1>
              <p className="text-lg text-[#4B5563] max-w-3xl leading-relaxed">
                Practice real-world scenarios and sharpen your skills with hands-on labs that simulate actual commercial situations. Build confidence through practical application of the NxN framework.
              </p>
            </div>
          </motion.div>
        </motion.section>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <motion.aside
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white/80 backdrop-blur-sm border border-[#E5E7EB] p-6 rounded-xl sticky top-6 shadow-sm">
              <h2 className="text-lg font-bold text-[#1F2937] mb-6">🔍 Filter Labs</h2>
              <LabFilter
                filters={filterOptions}
                onFilterChange={setSelectedFilters}
              />
            </div>
          </motion.aside>

        {/* Labs Grid */}
        <motion.div
          className="lg:col-span-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm font-bold text-[#0056FF]">
              📊 Showing {filteredLabs.length} of {allLabs.length} labs
            </p>
            {selectedFilters.length > 0 && (
              <motion.button
                onClick={() => {
                  setSelectedFilters([]);
                }}
                className="text-xs font-bold text-[#EB861F] hover:text-[#B85D0B] transition-colors"
                whileHover={{ x: 2 }}
              >
                ✕ Reset filters
              </motion.button>
            )}
          </div>

          <LabGrid
            labs={filteredLabs}
            key={`grid-${selectedFilters.length}`}
          />
        </motion.div>
        </div>

        {/* Info Section */}
        <motion.section
          className="mt-24 pt-16 border-t border-[#E5E7EB]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="bg-white/80 backdrop-blur-sm border border-[#E5E7EB] p-8 rounded-xl shadow-sm">
            <h2 className="text-3xl font-bold text-[#1F2937] mb-4">📚 How Labs Work</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
              <motion.div whileHover={{ y: -4 }} className="p-6 rounded-lg bg-gradient-to-br from-[#0056FF]/10 to-[#0056FF]/5 border border-[#0056FF]/20">
                <div className="text-4xl font-bold text-[#0056FF] mb-3">1</div>
                <h3 className="text-lg font-bold text-[#1F2937] mb-2">Review Scenario</h3>
                <p className="text-[#4B5563]">
                  Read the real-world scenario and understand the commercial situation you're facing.
                </p>
              </motion.div>
              <motion.div whileHover={{ y: -4 }} className="p-6 rounded-lg bg-gradient-to-br from-[#32E396]/10 to-[#32E396]/5 border border-[#32E396]/20">
                <div className="text-4xl font-bold text-[#32E396] mb-3">2</div>
                <h3 className="text-lg font-bold text-[#1F2937] mb-2">Think Through</h3>
                <p className="text-[#4B5563]">
                  Apply the NxN framework to think through how you'd approach this situation.
                </p>
              </motion.div>
              <motion.div whileHover={{ y: -4 }} className="p-6 rounded-lg bg-gradient-to-br from-[#EB861F]/10 to-[#EB861F]/5 border border-[#EB861F]/20">
                <div className="text-4xl font-bold text-[#EB861F] mb-3">3</div>
                <h3 className="text-lg font-bold text-[#1F2937] mb-2">Get Feedback</h3>
                <p className="text-[#4B5563]">
                  Receive expert feedback showing how experienced professionals would approach it.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
