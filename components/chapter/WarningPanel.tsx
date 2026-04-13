import { Section } from '@/lib/types';
import { Card } from '@/components/common/Card';

export const WarningPanel: React.FC<{ section: Section }> = ({ section }) => {
  return (
    <Card className="border-yellow-500 border-2 bg-opacity-5">
      <h3 className="text-xl font-display font-bold text-yellow-500 mb-4">⚠️ {(section.content as any).title}</h3>
      <div className="space-y-3 text-secondary">
        {((section.content as any).mistakes || []).map((mistake: any, idx: number) => (
          <div key={idx} className="pb-3 border-b border-gray-700 last:border-0">
            <p className="font-bold">{mistake.title}</p>
            <p className="text-sm">{mistake.description}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};
