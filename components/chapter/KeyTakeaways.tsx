import { Card } from '@/components/common/Card';

interface KeyTakeawaysProps {
  takeaways: string[];
}

export const KeyTakeaways: React.FC<KeyTakeawaysProps> = ({ takeaways }) => {
  return (
    <section className="bg-surface border-t border-gray-700 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-2xl font-display font-bold mb-6">Key Takeaways</h2>
        <ul className="space-y-3">
          {takeaways.map((takeaway, idx) => (
            <li key={idx} className="flex gap-4">
              <span className="text-accent font-bold flex-shrink-0">✓</span>
              <span className="text-secondary">{takeaway}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
