import { Section } from '@/lib/types';
import { Card } from '@/components/common/Card';

interface ProcessStage {
  number: number;
  label: string;
  description: string;
  role?: string;
}

interface ProcessTimelineProps {
  section: Section;
}

export const ProcessTimeline: React.FC<ProcessTimelineProps> = ({ section }) => {
  const stages = (section.content as { stages: ProcessStage[] }).stages;

  return (
    <div>
      {section.title && <h2 className="text-2xl font-display font-bold mb-6">{section.title}</h2>}
      <div className="space-y-4">
        {stages.map((stage, idx) => (
          <div key={stage.number} className="flex gap-6">
            {/* Timeline dot */}
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-accent text-black flex items-center justify-center font-display font-bold">
                {stage.number}
              </div>
              {idx < stages.length - 1 && <div className="w-1 h-20 bg-gray-700 mt-2" />}
            </div>
            {/* Content */}
            <Card className="flex-1 mb-4">
              <h3 className="text-lg font-display font-bold mb-2">{stage.label}</h3>
              <p className="text-secondary">{stage.description}</p>
              {stage.role && <p className="text-xs text-accent mt-3">Role: {stage.role}</p>}
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};
