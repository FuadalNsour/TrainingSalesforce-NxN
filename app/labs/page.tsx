'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { GlassPanel } from '@/components/glass/GlassPanel';
import { LabFilter, type FilterOption } from '@/components/labs/LabFilter';
import { LabGrid } from '@/components/labs/LabGrid';
import { LabModal } from '@/components/labs/LabModal';
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
  const [selectedLab, setSelectedLab] = useState<LabData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Transform LABS data to our format
  const allLabs: LabData[] = useMemo(() => {
    return Object.values(LABS).map((lab) => ({
      id: lab.id,
      title: lab.title,
      description: lab.description,
      difficulty: lab.difficulty,
      duration: 45, // Default duration since not in data
      topics: [], // Default empty topics since not in data
      rating: 4, // Default rating since not in data
      href: `/labs/${lab.id}`,
      fullDescription:
        lab.scenario?.context || lab.description,
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

  // Get unique difficulties and topics for filters
  const difficulties: FilterOption[] = [
    { id: 'beginner', label: 'Beginner', category: 'difficulty', count: allLabs.filter((l) => l.difficulty === 'beginner').length },
    { id: 'intermediate', label: 'Intermediate', category: 'difficulty', count: allLabs.filter((l) => l.difficulty === 'intermediate').length },
    { id: 'advanced', label: 'Advanced', category: 'difficulty', count: allLabs.filter((l) => l.difficulty === 'advanced').length },
  ];

  // Get unique topics from all labs
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

  // Filter labs based on selected filters
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

  const handleCardClick = (lab: LabData) => {
    setSelectedLab(lab);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedLab(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F0F9FF] via-[#E0F2FE] to-[#F0FDF4]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.section
          className="mb-12"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={revealContent} className="mb-6">
            <GlassPanel variant="elevated" className="p-8 rounded-2xl">
              <h1 className="text-5xl md:text-6xl font-bold text-[#0F172A] mb-4">
                Interactive Labs
              </h1>
              <p className="text-lg text-[#64748B] max-w-2xl leading-relaxed">
                Practice real-world scenarios and test your understanding with hands-on labs
                that simulate actual commercial situations. Build confidence through practical
                application of the NxN framework.
              </p>
            </GlassPanel>
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
            <GlassPanel variant="surface" className="p-6 rounded-xl sticky top-6">
              <h2 className="text-lg font-semibold text-[#0F172A] mb-6">Filter Labs</h2>
              <LabFilter
                filters={filterOptions}
                onFilterChange={setSelectedFilters}
              />
            </GlassPanel>
          </motion.aside>

          {/* Labs Grid */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-[#64748B] font-medium">
                Showing {filteredLabs.length} of {allLabs.length} labs
              </p>
              {selectedFilters.length > 0 && (
                <motion.button
                  onClick={() => {
                    setSelectedFilters([]);
                  }}
                  className="text-xs text-[#0369A1] hover:text-[#0369A1]/80 font-medium transition-colors"
                  whileHover={{ x: 2 }}
                >
                  Reset filters
                </motion.button>
              )}
            </div>

            <LabGrid
              labs={filteredLabs}
              onCardClick={handleCardClick}
              key={`grid-${selectedFilters.length}`}
            />
          </motion.div>
        </div>

        {/* Info Section */}
        <motion.section
          className="mt-20 pt-12 border-t border-white/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <GlassPanel variant="surface" className="p-8 rounded-xl">
            <h2 className="text-3xl font-bold text-[#0F172A] mb-4">How Labs Work</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <div>
                <div className="text-3xl font-bold text-[#0369A1] mb-3">1</div>
                <h3 className="text-lg font-semibold text-[#0F172A] mb-2">Review Scenario</h3>
                <p className="text-[#64748B]">
                  Read the real-world scenario and understand the commercial situation you're
                  facing.
                </p>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#0369A1] mb-3">2</div>
                <h3 className="text-lg font-semibold text-[#0F172A] mb-2">Think Through</h3>
                <p className="text-[#64748B]">
                  Apply the NxN framework to think through how you'd approach this situation.
                </p>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#0369A1] mb-3">3</div>
                <h3 className="text-lg font-semibold text-[#0F172A] mb-2">Get Feedback</h3>
                <p className="text-[#64748B]">
                  Receive expert feedback showing how experienced professionals would approach
                  it.
                </p>
              </div>
            </div>
          </GlassPanel>
        </motion.section>
      </div>

      {/* Lab Details Modal */}
      <LabModal
        isOpen={isModalOpen}
        lab={selectedLab}
        onClose={handleCloseModal}
      />
    </div>
  );
}
