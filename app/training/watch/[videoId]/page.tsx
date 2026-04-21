'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const videoData: Record<string, { title: string; description: string; file: string }> = {
  account: {
    title: 'Account Management',
    description: 'Learn how to manage and work with accounts in Salesforce',
    file: '/videos/Account.mp4',
  },
  lead: {
    title: 'Lead Management',
    description: 'Master the lead management process in Salesforce',
    file: '/videos/Lead.mp4',
  },
  opportunity: {
    title: 'Opportunity Management',
    description: 'Understand how to manage opportunities and sales pipelines',
    file: '/videos/Opp.mov',
  },
};

export default function VideoPlayer() {
  const params = useParams();
  const videoId = params.videoId as string;
  const video = videoData[videoId];

  if (!video) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FAFBFC] via-[#F0F4FF] to-[#FAFBFC] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#1F2937] mb-4">Video not found</h1>
          <Link href="/training" className="text-[#0056FF] hover:text-[#0040CC] font-bold">
            ← Back to Training
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

      <div className="max-w-5xl mx-auto px-6 py-16 relative z-10">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link href="/training" className="text-[#0056FF] hover:text-[#0040CC] mb-8 inline-flex items-center font-bold transition-all">
            ← Back to Training
          </Link>
        </motion.div>

        {/* Video player section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="bg-white/80 backdrop-blur-sm border-2 border-[#E5E7EB] rounded-xl overflow-hidden shadow-lg">
            <video
              controls
              className="w-full h-auto"
              controlsList="nodownload"
            >
              <source src={video.file} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </motion.div>

        {/* Video info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/80 backdrop-blur-sm border-2 border-[#E5E7EB] p-8 rounded-xl shadow-sm"
        >
          <h1 className="text-4xl font-bold text-[#1F2937] mb-4">{video.title}</h1>
          <p className="text-lg text-[#4B5563] mb-8">{video.description}</p>

          <div className="flex gap-4">
            <Link href="/training" className="flex-1">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-8 py-3 bg-gradient-to-r from-[#0056FF] to-[#0040CC] text-white font-bold rounded-lg hover:shadow-lg transition-all"
              >
                Back to Training Materials
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
