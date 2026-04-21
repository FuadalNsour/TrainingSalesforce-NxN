'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function TrainingPage() {
  const materials = [
    {
      id: 1,
      title: 'Account Management',
      description: 'Learn how to manage and work with accounts in Salesforce',
      type: 'video',
      icon: '🎬',
      href: '/training/watch/account',
      duration: '12 min',
    },
    {
      id: 2,
      title: 'Lead Management',
      description: 'Master the lead management process in Salesforce',
      type: 'video',
      icon: '🎬',
      href: '/training/watch/lead',
      duration: '15 min',
    },
    {
      id: 3,
      title: 'Opportunity Management',
      description: 'Understand how to manage opportunities and sales pipelines',
      type: 'video',
      icon: '🎬',
      href: '/training/watch/opportunity',
      duration: '18 min',
    },
    {
      id: 4,
      title: 'NxN Commercial Training Material',
      description: 'Complete training presentation covering all NxN commercial processes',
      type: 'pptx',
      icon: '📊',
      href: '/training/view-pptx',
      pages: '50+',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAFBFC] via-[#F0F4FF] to-[#FAFBFC]">
      {/* Background gradient blobs */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 -right-40 w-80 h-80 bg-[#0056FF] rounded-full mix-blend-multiply filter blur-3xl" />
        <div className="absolute bottom-0 -left-40 w-80 h-80 bg-[#32E396] rounded-full mix-blend-multiply filter blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <Link href="/" className="text-[#0056FF] hover:text-[#0040CC] mb-8 inline-flex items-center font-bold transition-all">
            ← Back to Home
          </Link>

          <div className="mb-8">
            <h1 className="text-5xl md:text-6xl font-bold text-[#1F2937] mb-4">
              📚 Training Materials
            </h1>
            <p className="text-lg text-[#4B5563] max-w-3xl">
              Access comprehensive training resources including video tutorials and presentation materials for Salesforce processes and the NxN commercial framework.
            </p>
          </div>
        </motion.div>

        {/* Materials Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {materials.map((material) => (
            <motion.div
              key={material.id}
              variants={itemVariants}
              whileHover={{ y: -8 }}
            >
              <Link
                href={material.href}
                className="block h-full"
              >
                <motion.div
                  whileHover={{ boxShadow: '0 20px 40px rgba(0, 86, 255, 0.15)' }}
                  className="h-full bg-white/80 backdrop-blur-sm border-2 border-[#E5E7EB] p-8 rounded-xl shadow-sm transition-all hover:border-[#0056FF] group"
                >
                  {/* Icon */}
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                    {material.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-[#1F2937] mb-3">
                    {material.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[#4B5563] mb-6 leading-relaxed">
                    {material.description}
                  </p>

                  {/* Metadata */}
                  <div className="flex items-center justify-between pt-6 border-t border-[#E5E7EB]">
                    <div className="text-sm font-bold text-[#6B7280]">
                      {material.type === 'video' ? (
                        <>⏱ {material.duration}</>
                      ) : (
                        <>📄 {material.pages} pages</>
                      )}
                    </div>
                    <motion.div
                      className="text-[#0056FF] font-bold text-sm"
                      whileHover={{ x: 4 }}
                    >
                      {material.type === 'video' ? 'Watch →' : 'View →'}
                    </motion.div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Info Section */}
        <motion.section
          className="mt-24 pt-16 border-t border-[#E5E7EB]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="bg-white/80 backdrop-blur-sm border border-[#E5E7EB] p-8 rounded-xl shadow-sm">
            <h2 className="text-3xl font-bold text-[#1F2937] mb-4">📖 How to Use These Materials</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
              <motion.div whileHover={{ y: -4 }} className="p-6 rounded-lg bg-gradient-to-br from-[#0056FF]/10 to-[#0056FF]/5 border border-[#0056FF]/20">
                <div className="text-4xl font-bold text-[#0056FF] mb-3">1</div>
                <h3 className="text-lg font-bold text-[#1F2937] mb-2">Watch Videos</h3>
                <p className="text-[#4B5563]">
                  View the step-by-step video tutorials for Salesforce account, lead, and opportunity management.
                </p>
              </motion.div>
              <motion.div whileHover={{ y: -4 }} className="p-6 rounded-lg bg-gradient-to-br from-[#32E396]/10 to-[#32E396]/5 border border-[#32E396]/20">
                <div className="text-4xl font-bold text-[#32E396] mb-3">2</div>
                <h3 className="text-lg font-bold text-[#1F2937] mb-2">Review Presentation</h3>
                <p className="text-[#4B5563]">
                  Download and review the complete NxN commercial training presentation for comprehensive coverage.
                </p>
              </motion.div>
              <motion.div whileHover={{ y: -4 }} className="p-6 rounded-lg bg-gradient-to-br from-[#EB861F]/10 to-[#EB861F]/5 border border-[#EB861F]/20">
                <div className="text-4xl font-bold text-[#EB861F] mb-3">3</div>
                <h3 className="text-lg font-bold text-[#1F2937] mb-2">Apply Learning</h3>
                <p className="text-[#4B5563]">
                  Practice what you've learned with interactive labs and real-world scenarios in the training platform.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
