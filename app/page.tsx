import { HeroSection } from '@/components/home/HeroSection';
import { LearningPathSection } from '@/components/home/LearningPathSection';
import { CourseInfoSection } from '@/components/home/CourseInfoSection';
import { loadCourseMetadata } from '@/lib/content-loader';

export default async function Home() {
  const courseMetadata = await loadCourseMetadata();

  // Lab count per chapter
  const labsPerChapter: Record<string, number> = {
    '01-why-matters': 3,
    '02-customer-journey': 2,
    '03-roles': 2,
    '04-lead-management': 3,
    '05-conversion-hierarchy': 2,
    '06-account-lifecycle': 2,
    '07-opportunity-management': 2,
    '08-stage-gates': 2,
    '09-quote-management': 2,
    '10-contract-management': 2,
    '11-data-quality': 2,
    '12-reporting': 2,
    '13-full-cycle-simulation': 2,
    '14-common-mistakes': 3,
  };

  // Transform metadata into Chapter format for LearningPathSection
  const chapters = courseMetadata.chapters.map((ch, index) => {
    const chapterMinutes = ch.duration || 0;
    const labsCount = labsPerChapter[ch.id] || 0;
    const labMinutes = labsCount * 15; // 15 min per lab
    const totalMinutes = chapterMinutes + labMinutes;
    const durationInHours = totalMinutes / 60; // Don't round per chapter

    return {
      id: ch.id,
      title: ch.title,
      description: `Learn about ${ch.title.toLowerCase()}`,
      duration: Math.round(durationInHours * 10) / 10, // Round to 1 decimal
      difficulty: (['beginner', 'intermediate', 'advanced'] as const)[index % 3],
    };
  });

  return (
    <main className="w-full">
      <HeroSection
        title="Master the NxN Framework"
        description="Learn proven commercial training techniques to accelerate sales success"
        primaryCta={{ label: 'Start Learning', href: '/chapters/01-why-matters' }}
        secondaryCta={{ label: 'Explore Labs', href: '/labs' }}
        tertiaryCta={{ label: 'View Timeline', href: '/lifecycle' }}
        quaternaryCta={{ label: 'Training Materials', href: '/training' }}
      />
      <LearningPathSection chapters={chapters} />
      <CourseInfoSection
        totalChapters={courseMetadata.chapters.length}
        totalHours={chapters.reduce((sum, ch) => sum + ch.duration, 0)}
      />
    </main>
  );
}
