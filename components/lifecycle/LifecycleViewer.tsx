'use client';

import { useState, useEffect } from 'react';
import { StageViewer } from './StageViewer';
import { LifecycleStage } from '@/lib/types';

export const LifecycleViewer: React.FC = () => {
  const [stages, setStages] = useState<LifecycleStage[]>([]);
  const [selectedStageId, setSelectedStageId] = useState<string>('lead-new');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLifecycle = async () => {
      const lifecycle = await import('@/data/lifecycle.json');
      setStages(lifecycle.default.stages as LifecycleStage[]);
      setLoading(false);
    };
    loadLifecycle();
  }, []);

  if (loading) return <div className="p-8 text-center text-secondary">Loading lifecycle...</div>;

  const selectedStage = stages.find(s => s.id === selectedStageId);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Left: Stage List */}
        <div className="md:col-span-1">
          <h2 className="text-xl font-display font-bold mb-4">Stages</h2>
          <div className="space-y-2">
            {stages.map((stage) => (
              <button
                key={stage.id}
                onClick={() => setSelectedStageId(stage.id)}
                className={`w-full text-left px-4 py-3 rounded border transition-all ${
                  selectedStageId === stage.id
                    ? 'bg-accent text-black border-accent font-bold'
                    : 'bg-surface border-gray-700 text-white hover:border-accent'
                }`}
              >
                <p className="text-sm">{stage.order}</p>
                <p className="font-bold">{stage.name}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Stage Details */}
        <div className="md:col-span-1 lg:col-span-2">
          {selectedStage && <StageViewer stage={selectedStage} />}
        </div>
      </div>
    </div>
  );
};
