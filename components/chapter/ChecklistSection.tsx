import { Section } from '@/lib/types';

export const ChecklistSection: React.FC<{ section: Section }> = ({ section }) => {
  return (
    <div>
      <h3 className="text-xl font-display font-bold mb-4">{(section.content as any).title}</h3>
      <ul className="space-y-2">
        {((section.content as any).items || []).map((item: string, idx: number) => (
          <li key={idx} className="flex gap-3">
            <input type="checkbox" className="mt-1" />
            <span className="text-secondary">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
