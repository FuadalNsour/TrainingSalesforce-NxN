import { Section } from '@/lib/types';
import { Card } from '@/components/common/Card';

export const LabChallenge: React.FC<{ section: Section }> = ({ section }) => {
  return (
    <Card className="border-accent border-2">
      <h3 className="text-xl font-display font-bold text-accent mb-2">🧪 Lab Challenge</h3>
      <p className="text-secondary">{(section.content as any).description}</p>
      <p className="text-sm text-gray-400 mt-4">[Lab content to be implemented]</p>
    </Card>
  );
};
