'use client';

import Link from 'next/link';
import { GlassCard } from '@/components/glass/GlassCard';
import { GlassPanel } from '@/components/glass/GlassPanel';
import { CourseMetadata } from '@/lib/types';

interface ChaptersPageClientProps {
  courseMetadata: CourseMetadata;
}

export const ChaptersPageClient: React.FC<ChaptersPageClientProps> = ({
  courseMetadata,
}) => {
  return (
    <main className="w-full bg-gradient-to-br from-[#F0F9FF] via-white to-[#F8FAFC]">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0369A1]/5 to-[#16A34A]/5 -z-10" />

        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-poppins font-bold text-[#0F172A] mb-4">
              Learning Chapters
            </h1>
            <p className="text-lg md:text-xl text-[#64748B] font-open-sans max-w-2xl">
              Master the NxN commercial framework through structured chapters, each building on the previous. Start your learning journey today.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <GlassPanel variant="elevated" className="p-6 text-center">
              <div className="text-3xl font-bold text-[#0369A1] font-poppins mb-2">
                {courseMetadata.chapters.length}
              </div>
              <p className="text-sm text-[#64748B] font-open-sans">Total Chapters</p>
            </GlassPanel>
            <GlassPanel variant="elevated" className="p-6 text-center">
              <div className="text-3xl font-bold text-[#16A34A] font-poppins mb-2">
                {Math.ceil(courseMetadata.duration / 60)}
              </div>
              <p className="text-sm text-[#64748B] font-open-sans">Learning Hours</p>
            </GlassPanel>
            <GlassPanel variant="elevated" className="p-6 text-center">
              <div className="text-3xl font-bold text-[#0F766E] font-poppins mb-2">
                100%
              </div>
              <p className="text-sm text-[#64748B] font-open-sans">Complete at Your Pace</p>
            </GlassPanel>
          </div>
        </div>
      </section>

      {/* Chapters Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courseMetadata.chapters.map((chapter, index) => {
              // Assign difficulty based on index
              const difficulties = ['beginner', 'intermediate', 'advanced'] as const;
              const difficulty = difficulties[index % 3];

              return (
                <Link key={chapter.id} href={`/chapters/${chapter.id}`}>
                  <GlassCard
                    title={chapter.title}
                    description={`Chapter ${chapter.order || index + 1} of ${courseMetadata.chapters.length}`}
                    href={`/chapters/${chapter.id}`}
                    metadata={{
                      duration: chapter.duration ? `${Math.ceil(chapter.duration / 60)}h` : '1h',
                      level: difficulty,
                    }}
                    status="in-progress"
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#0369A1] to-[#0F766E]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-white mb-6">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-lg text-white/80 font-open-sans mb-8 max-w-2xl mx-auto">
            Begin with the first chapter to understand the fundamentals of the NxN framework and build your commercial expertise.
          </p>
          <Link href={`/chapters/${courseMetadata.chapters[0]?.id}`}>
            <button className="px-8 py-4 bg-white text-[#0369A1] font-poppins font-semibold rounded-xl hover:bg-white/90 transition-colors">
              Start Learning →
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
};

ChaptersPageClient.displayName = 'ChaptersPageClient';
