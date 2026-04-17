import { loadChapter } from '@/lib/content-loader';
import { ChapterPageClient } from '@/components/chapters/ChapterPageClient';
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

  const relatedLabs = getLabsByChapter(resolvedParams.chapterId);

  return <ChapterPageClient chapter={chapter} relatedLabs={relatedLabs} />;
}
