import { LifecycleStage } from '@/lib/types';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';

interface StageViewerProps {
  stage: LifecycleStage;
}

export const StageViewer: React.FC<StageViewerProps> = ({ stage }) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-l-4 border-accent pl-6">
        <h2 className="text-3xl font-display font-bold mb-2">{stage.name}</h2>
        <p className="text-secondary text-lg">{stage.description}</p>
      </div>

      {/* Entry/Exit Logic */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <p className="text-accent font-bold text-sm mb-2">Entry Logic</p>
          <p className="text-secondary">{stage.entryLogic}</p>
        </Card>
        <Card>
          <p className="text-accent font-bold text-sm mb-2">Exit Logic</p>
          <p className="text-secondary">{stage.exitLogic}</p>
        </Card>
      </div>

      {/* User Actions */}
      <Card>
        <p className="text-accent font-bold text-sm mb-4">What You Should Do</p>
        <ul className="space-y-2">
          {stage.userActions.map((action, idx) => (
            <li key={idx} className="flex gap-3 text-secondary">
              <span className="text-accent font-bold flex-shrink-0">✓</span>
              <span>{action}</span>
            </li>
          ))}
        </ul>
      </Card>

      {/* Common Mistakes */}
      <Card className="border-yellow-500 border-2">
        <p className="text-yellow-500 font-bold text-sm mb-4">⚠️ Common Mistakes</p>
        <ul className="space-y-2">
          {stage.commonMistakes.map((mistake, idx) => (
            <li key={idx} className="flex gap-3 text-secondary">
              <span className="text-yellow-500 flex-shrink-0">✗</span>
              <span>{mistake}</span>
            </li>
          ))}
        </ul>
      </Card>

      {/* Roles */}
      <div>
        <p className="text-secondary text-sm mb-2">Primary Roles</p>
        <div className="flex flex-wrap gap-2">
          {stage.relatedRoles.map((role) => (
            <Badge key={role} type="status">{role}</Badge>
          ))}
        </div>
      </div>
    </div>
  );
};
