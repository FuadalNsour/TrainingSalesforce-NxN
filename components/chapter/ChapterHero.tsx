import { Chapter } from '@/lib/types';

interface ChapterHeroProps {
  chapter: Chapter;
}

export const ChapterHero: React.FC<ChapterHeroProps> = ({ chapter }) => {
  return (
    <section className="bg-surface border-b border-gray-700 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <p className="text-accent text-sm font-bold mb-2">Chapter {chapter.order}</p>
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">{chapter.title}</h1>
        <p className="text-secondary text-lg mb-6">{chapter.description}</p>
        <div className="flex items-center gap-4">
          <span className="text-sm text-secondary">Chapter {chapter.order} of 5</span>
        </div>
      </div>
    </section>
  );
};
