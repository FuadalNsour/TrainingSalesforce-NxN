import Link from 'next/link';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { ROUTES } from '@/lib/constants';
import { ChapterReference } from '@/lib/types';

interface ChapterPreviewCardProps {
  chapter: ChapterReference;
}

export const ChapterPreviewCard: React.FC<ChapterPreviewCardProps> = ({ chapter }) => {
  return (
    <Link href={ROUTES.chapter(chapter.id)}>
      <Card hoverable className="h-full flex flex-col">
        <p className="text-sm text-accent font-bold mb-2">Chapter {chapter.order}</p>
        <h3 className="text-xl font-display font-bold mb-3">{chapter.title}</h3>
        <p className="text-secondary mb-4 flex-1">
          Learn key concepts and processes in this chapter of the NxN Salesforce methodology.
        </p>
        <div className="flex gap-2 flex-wrap">
          <Badge type="status">Interactive</Badge>
          <Badge type="role">All Roles</Badge>
        </div>
      </Card>
    </Link>
  );
};
