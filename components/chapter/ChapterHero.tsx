import { Chapter } from '@/lib/types';

interface ChapterHeroProps {
  chapter: Chapter;
}

export const ChapterHero: React.FC<ChapterHeroProps> = ({ chapter }) => {
  return (
    <section className="bg-white border-b border-gray-200 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <p className="text-accent text-sm font-bold mb-2">Chapter {chapter.order}</p>
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 text-gray-900">{chapter.title}</h1>
        <p className="text-gray-700 text-lg mb-6">{chapter.description}</p>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">Chapter {chapter.order} of 14</span>
        </div>
      </div>
    </section>
  );
};
