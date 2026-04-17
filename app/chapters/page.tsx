import { loadCourseMetadata } from '@/lib/content-loader';
import { ChaptersPageClient } from '@/components/chapters/ChaptersPageClient';

export const metadata = {
  title: 'Chapters | NxN Training Portal',
  description: 'Browse all chapters in the NxN Commercial Training course',
};

export default async function ChaptersPage() {
  const courseMetadata = await loadCourseMetadata();

  return <ChaptersPageClient courseMetadata={courseMetadata} />;
}
