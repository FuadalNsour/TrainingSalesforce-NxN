'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function PptxViewer() {
  const pptxUrl = '/training-materials/NxN Commercial Training Material.pptx';

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAFBFC] via-[#F0F4FF] to-[#FAFBFC]">
      {/* Background gradient blobs */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 -right-40 w-80 h-80 bg-[#0056FF] rounded-full mix-blend-multiply filter blur-3xl" />
        <div className="absolute bottom-0 -left-40 w-80 h-80 bg-[#32E396] rounded-full mix-blend-multiply filter blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 relative z-10">
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

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#1F2937] mb-4">
            📊 NxN Commercial Training Material
          </h1>
          <p className="text-lg text-[#4B5563] max-w-2xl">
            Complete training presentation covering all NxN commercial processes. Scroll through the pages using the viewer controls.
          </p>
        </motion.div>

        {/* Viewer section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/80 backdrop-blur-sm border-2 border-[#E5E7EB] rounded-xl overflow-hidden shadow-lg mb-8"
        >
          <iframe
            src={`https://docs.google.com/gview?url=${encodeURIComponent(
              typeof window !== 'undefined'
                ? new URL(pptxUrl, window.location.origin).href
                : pptxUrl
            )}&embedded=true`}
            className="w-full h-screen"
            allowFullScreen
          />
        </motion.div>

        {/* Download section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <a
            href={pptxUrl}
            download="NxN Commercial Training Material.pptx"
            className="flex-1"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-8 py-3 bg-[#32E396]/20 text-[#0F8559] font-bold rounded-lg border-2 border-[#32E396] hover:bg-[#32E396]/30 transition-all"
            >
              ⬇️ Download PPTX
            </motion.button>
          </a>

          <Link href="/training" className="flex-1">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-8 py-3 bg-gradient-to-r from-[#0056FF] to-[#0040CC] text-white font-bold rounded-lg hover:shadow-lg transition-all"
            >
              Back to Training Materials
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
