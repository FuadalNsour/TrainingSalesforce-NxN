import { Card } from '@/components/common/Card';

interface KeyTakeawaysProps {
  takeaways: string[];
}

export const KeyTakeaways: React.FC<KeyTakeawaysProps> = ({ takeaways }) => {
  return (
    <section className="bg-gray-50 border-t border-gray-200 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-2xl font-display font-bold mb-6 text-gray-900">Key Takeaways</h2>
        <ul className="space-y-3">
          {takeaways.map((takeaway, idx) => (
            <li key={idx} className="flex gap-4">
              <span className="text-accent font-bold flex-shrink-0">✓</span>
              <span className="text-gray-700">{takeaway}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
