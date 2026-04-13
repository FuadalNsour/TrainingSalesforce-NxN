import { LabScenario as LabScenarioType } from '@/lib/labs-data';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';

interface LabScenarioProps {
  lab: LabScenarioType;
}

export function LabScenario({ lab }: LabScenarioProps) {
  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <Badge type="status">
            {lab.difficulty.charAt(0).toUpperCase() + lab.difficulty.slice(1)}
          </Badge>
          <span className="text-sm text-gray-600">Chapter {lab.chapterId.charAt(0)}</span>
        </div>
        <h1 className="text-4xl font-display font-bold text-gray-900 mb-2">{lab.title}</h1>
        <p className="text-lg text-gray-600">{lab.description}</p>
      </div>

      <Card className="bg-blue-50 border border-blue-200">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-2">
              {lab.scenario.title}
            </h2>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-2">Context</h3>
            <p className="text-gray-700">{lab.scenario.context}</p>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-2">Situation</h3>
            <p className="text-gray-700">{lab.scenario.situation}</p>
          </div>

          <div className="pt-4 border-t border-blue-200">
            <h3 className="font-bold text-gray-900 mb-2">Your Challenge</h3>
            <p className="text-lg text-gray-900">{lab.scenario.question}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
