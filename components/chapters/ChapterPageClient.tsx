'use client';

import { Chapter } from '@/lib/types';
import { ChapterHero } from '@/components/chapter/ChapterHero';
import { SectionRenderer } from '@/components/chapter/SectionRenderer';
import { KeyTakeaways } from '@/components/chapters/KeyTakeaways';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import Link from 'next/link';
import { ROUTES } from '@/lib/constants';

interface ChapterPageClientProps {
  chapter: Chapter;
  relatedLabs: any[];
}

// NxN stages for the timeline
const NXN_STAGES = [
  { id: 'awareness', label: 'Why NxN Matters', description: 'Understanding the framework' },
  { id: 'interest', label: 'Discovery Phase', description: 'Discovering customer needs' },
  { id: 'evaluation', label: 'Qualification', description: 'Evaluating opportunities' },
  { id: 'decision', label: 'Commitment', description: 'Building commitment' },
  { id: 'commitment', label: 'Advancement', description: 'Advancing the sale' },
];

export const ChapterPageClient: React.FC<ChapterPageClientProps> = ({
  chapter,
  relatedLabs,
}) => {
  // Determine NxN stage based on chapter order
  const stageIndex = Math.min(chapter.order - 1, NXN_STAGES.length - 1);
  const currentStage = NXN_STAGES[stageIndex];

  return (
    <div className="w-full bg-white">
      {/* Chapter Hero */}
      <ChapterHero chapter={chapter} />

      {/* Main Content Wrapper */}
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
        {/* Process Timeline Section */}
        <section className="mb-16 md:mb-24">
          <h2 className="text-3xl font-poppins font-bold text-[#0F172A] mb-8">
            NxN Stage: {currentStage.label}
          </h2>
          <div className="text-center">
            <p className="text-[#64748B] font-open-sans mt-6">
              {currentStage.description}
            </p>
          </div>
        </section>

        {/* Main Content Sections */}
        <section className="space-y-12 mb-16 md:mb-24">
          <h2 className="text-3xl font-poppins font-bold text-[#0F172A]">
            Chapter Content
          </h2>

          {chapter.sections.length > 0 ? (
            <div className="space-y-8">
              {chapter.sections.map((section) => (
                <SectionRenderer key={section.id} section={section} />
              ))}
            </div>
          ) : (
            <div className="text-center text-[#64748B] py-12">
              Welcome to this chapter
            </div>
          )}
        </section>
      </div>

      {/* Key Takeaways - Enhanced Glass Design */}
      {chapter.keyTakeaways && chapter.keyTakeaways.length > 0 && (
        <KeyTakeaways
          takeaways={chapter.keyTakeaways}
          title="Key Takeaways"
          subtitle="Essential concepts you should remember from this chapter"
        />
      )}

      {/* Related Labs Section */}
      {relatedLabs.length > 0 && (
        <section className="py-16 md:py-24 bg-gradient-to-br from-[#F0F9FF] to-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-poppins font-bold text-[#0F172A] mb-4">
                Practice Labs
              </h2>
              <p className="text-lg text-[#64748B] font-open-sans">
                Apply what you've learned in these hands-on lab challenges
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedLabs.slice(0, 3).map((lab) => (
                <Card key={lab.id} hoverable>
                  <h3 className="text-lg font-display font-bold text-gray-900 mb-2">{lab.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{lab.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-green-600">
                      {(lab.difficulty || 'intermediate').charAt(0).toUpperCase() +
                        (lab.difficulty || 'intermediate').slice(1)}
                    </span>
                    <Link href={ROUTES.lab(lab.id)}>
                      <Button variant="primary" size="sm">
                        Start Lab →
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>

            {relatedLabs.length > 3 && (
              <div className="mt-8 text-center">
                <Link href="/labs">
                  <Button variant="secondary" size="lg">
                    View All Labs →
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Next Chapter Navigation */}
      {chapter.nextChapterId && (
        <section className="py-16 md:py-24 bg-gradient-to-br from-[#0369A1] to-[#0F766E]">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <p className="text-white/80 font-open-sans mb-4">Ready for more?</p>
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-white mb-8">
              Continue Your Learning Journey
            </h2>
            <Link href={ROUTES.chapter(chapter.nextChapterId)}>
              <button className="px-8 py-4 bg-white text-[#0369A1] font-poppins font-semibold rounded-xl hover:bg-white/90 transition-colors inline-block">
                Next Chapter →
              </button>
            </Link>
          </div>
        </section>
      )}

      {/* Footer spacing */}
      <div className="h-12" />
    </div>
  );
};

ChapterPageClient.displayName = 'ChapterPageClient';
