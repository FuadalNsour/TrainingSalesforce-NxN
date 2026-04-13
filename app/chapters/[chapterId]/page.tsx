import { loadChapter } from '@/lib/content-loader';
import { ChapterHero } from '@/components/chapter/ChapterHero';
import { SectionRenderer } from '@/components/chapter/SectionRenderer';
import { KeyTakeaways } from '@/components/chapter/KeyTakeaways';
import { Button } from '@/components/common/Button';
import Link from 'next/link';
import { ROUTES } from '@/lib/constants';
import { notFound } from 'next/navigation';

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
    <div className="bg-black">
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
      <KeyTakeaways takeaways={chapter.keyTakeaways} />

      {/* Next Chapter Navigation */}
      {chapter.nextChapterId && (
        <section className="bg-surface border-t border-gray-700 py-12">
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
