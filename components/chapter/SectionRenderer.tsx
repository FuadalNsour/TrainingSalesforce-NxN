import { Section } from '@/lib/types';
import { ProcessTimeline } from './ProcessTimeline';
import { LabChallenge } from './LabChallenge';
import { WarningPanel } from './WarningPanel';
import { ChecklistSection } from './ChecklistSection';
import { KeyTakeaways } from './KeyTakeaways';
import { Card } from '@/components/common/Card';

interface SectionRendererProps {
  section: Section;
}

export const SectionRenderer: React.FC<SectionRendererProps> = ({ section }) => {
  switch (section.type) {
    case 'hero':
      return (
        <div className="text-center py-8">
          {section.title && <h2 className="text-3xl font-display font-bold mb-2">{section.title}</h2>}
        </div>
      );

    case 'narrative':
      return (
        <div className="prose prose-invert max-w-none">
          {section.title && <h2 className="text-2xl font-display font-bold mb-4">{section.title}</h2>}
          <p className="text-secondary text-lg leading-relaxed">
            {typeof section.content === 'string'
              ? section.content
              : (section.content as any).text}
          </p>
        </div>
      );

    case 'process-timeline':
      return <ProcessTimeline section={section} />;

    case 'lab-challenge':
      return <LabChallenge section={section} />;

    case 'warning-panel':
      return <WarningPanel section={section} />;

    case 'checklist':
      return <ChecklistSection section={section} />;

    case 'recap':
      const recapContent = Array.isArray(section.content)
        ? section.content
        : (section.content as any).items;
      return <KeyTakeaways takeaways={recapContent} />;

    default:
      return (
        <Card>
          <p className="text-secondary">Unknown section type: {section.type}</p>
        </Card>
      );
  }
};
