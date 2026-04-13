import { loadChapter } from '@/lib/content-loader';
import { ChapterHero } from '@/components/chapter/ChapterHero';
import { SectionRenderer } from '@/components/chapter/SectionRenderer';
import { KeyTakeaways } from '@/components/chapter/KeyTakeaways';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import Link from 'next/link';
import { ROUTES } from '@/lib/constants';
import { notFound } from 'next/navigation';
import { getLabsByChapter } from '@/lib/labs-data';

interface ChapterPageProps {
  params: {
    chapterId: string;
  };
}

export default async function ChapterPage({ params }: ChapterPageProps) {
  // Await params as it's a Promise in Next.js 16
  const resolvedParams = await params;

  let chapter;
  try {
    chapter = await loadChapter(resolvedParams.chapterId);
  } catch (error) {
    notFound();
  }

  return (
    <div className="bg-white">
      {/* Chapter Hero */}
      <ChapterHero chapter={chapter} />

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="space-y-8">
          {chapter.sections.map((section) => (
            <SectionRenderer key={section.id} section={section} />
          ))}
        </div>
      </div>

      {/* Key Takeaways */}
      {chapter.keyTakeaways && chapter.keyTakeaways.length > 0 && (
        <KeyTakeaways takeaways={chapter.keyTakeaways} />
      )}

      {/* Related Labs */}
      {(() => {
        const relatedLabs = getLabsByChapter(resolvedParams.chapterId);
        return relatedLabs.length > 0 ? (
          <section className="bg-gray-50 border-t border-gray-200 py-12">
            <div className="max-w-4xl mx-auto px-6">
              <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">Practice Labs for This Chapter</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {relatedLabs.map((lab) => (
                  <Card key={lab.id} hoverable>
                    <h3 className="text-lg font-display font-bold text-gray-900 mb-2">{lab.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{lab.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-green-600">
                        {lab.difficulty.charAt(0).toUpperCase() + lab.difficulty.slice(1)}
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
            </div>
          </section>
        ) : null;
      })()}

      {/* Next Chapter Navigation */}
      {chapter.nextChapterId && (
        <section className="bg-white border-t border-gray-200 py-12">
          <div className="max-w-4xl mx-auto px-6 flex justify-end">
            <Link href={ROUTES.chapter(chapter.nextChapterId)}>
              <Button variant="primary" size="lg">
                Next Chapter →
              </Button>
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
