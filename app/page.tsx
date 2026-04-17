import { HeroSection } from '@/components/home/HeroSection';
import { LearningPathSection } from '@/components/home/LearningPathSection';
import { CourseInfoSection } from '@/components/home/CourseInfoSection';
import { loadCourseMetadata } from '@/lib/content-loader';

export default async function Home() {
  const courseMetadata = await loadCourseMetadata();

  // Transform metadata into Chapter format for LearningPathSection
  const chapters = courseMetadata.chapters.map((ch, index) => ({
    id: ch.id,
    title: ch.title,
    description: `Learn about ${ch.title.toLowerCase()}`,
    duration: ch.duration ? Math.ceil(ch.duration / 60) : 1,
    difficulty: (['beginner', 'intermediate', 'advanced'] as const)[index % 3],
  }));

  return (
    <main className="w-full">
      <HeroSection
        title="Master the NxN Framework"
        description="Learn proven commercial training techniques to accelerate sales success"
        primaryCta={{ label: 'Start Learning', href: '/chapters/01-why-matters' }}
        secondaryCta={{ label: 'Explore Labs', href: '/labs' }}
        tertiaryCta={{ label: 'View Timeline', href: '/lifecycle' }}
      />
      <LearningPathSection chapters={chapters} />
      <CourseInfoSection
        totalChapters={courseMetadata.chapters.length}
        totalHours={Math.ceil(courseMetadata.duration / 60)}
      />
    </main>
  );
}
