import { HeroSection } from '@/components/home/HeroSection';
import { ChapterPreviewCard } from '@/components/home/ChapterPreviewCard';
import { CTAButtons } from '@/components/home/CTAButtons';
import { loadCourseMetadata } from '@/lib/content-loader';

export default async function Home() {
  const courseMetadata = await loadCourseMetadata();

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <HeroSection />

      {/* CTA Buttons */}
      <CTAButtons />

      {/* Chapter Preview Cards */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-display font-bold mb-8 text-gray-900">Learning Path</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courseMetadata.chapters.map((chapter) => (
            <ChapterPreviewCard key={chapter.id} chapter={chapter} />
          ))}
        </div>
      </section>

      {/* Course Info */}
      <section className="max-w-7xl mx-auto px-6 py-16 border-t border-gray-200 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <p className="text-4xl font-display font-bold text-accent">{courseMetadata.chapters.length}</p>
            <p className="text-gray-600">Chapters</p>
          </div>
          <div>
            <p className="text-4xl font-display font-bold text-accent">{Math.ceil(courseMetadata.duration / 60)}</p>
            <p className="text-gray-600">Hours of training</p>
          </div>
          <div>
            <p className="text-4xl font-display font-bold text-accent">∞</p>
            <p className="text-gray-600">Learn at your pace</p>
          </div>
        </div>
      </section>
    </div>
  );
}
