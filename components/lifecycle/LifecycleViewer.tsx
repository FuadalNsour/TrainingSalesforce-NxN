'use client';

import { useState, useEffect } from 'react';
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

  if (loading) return <div className="p-8 text-center text-gray-600">Loading lifecycle...</div>;

  const selectedStage = stages.find(s => s.id === selectedStageId);
  const selectedIndex = stages.findIndex(s => s.id === selectedStageId);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Visual Flow Timeline */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-8">The Complete Journey</h2>

          {/* Responsive Timeline Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {stages.map((stage, idx) => (
              <div key={stage.id} className="flex flex-col items-center gap-2">
                {/* Stage Button */}
                <button
                  onClick={() => setSelectedStageId(stage.id)}
                  className={`relative group transition-all duration-300 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm flex-shrink-0 ${
                    selectedStageId === stage.id
                      ? 'bg-accent text-black shadow-lg scale-110'
                      : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-accent'
                  }`}
                >
                  {stage.order}
                </button>

                {/* Stage Label */}
                <div className="text-xs text-center text-gray-600 font-medium line-clamp-2">
                  {stage.name.split(' - ')[1] || stage.name}
                </div>

                {/* Connecting Line to Next Stage */}
                {idx < stages.length - 1 && (
                  <div className="absolute w-0.5 h-3 bg-gray-300 top-14 left-1/2 transform -translate-x-1/2 hidden sm:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        {selectedStage && (
          <div className="space-y-8">
            {/* Stage Header Card */}
            <div
              className="rounded-xl p-8 text-white shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${selectedStage.color}dd 0%, ${selectedStage.color} 100%)`
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-white/80 text-sm font-semibold mb-2">Stage {selectedIndex + 1} of {stages.length}</p>
                  <h2 className="text-4xl md:text-5xl font-display font-bold mb-3">{selectedStage.name}</h2>
                  <p className="text-white/90 text-lg max-w-2xl">{selectedStage.description}</p>
                </div>
                <div className="text-6xl opacity-20 flex-shrink-0">
                  {selectedIndex < stages.length / 2 ? '→' : '↗'}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-6 pt-6 border-t border-white/30">
                <p className="text-xs font-semibold text-white/80 mb-3">Progress in Lifecycle</p>
                <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white transition-all duration-500"
                    style={{ width: `${((selectedIndex + 1) / stages.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Entry Logic */}
              <div className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold">
                    ↓
                  </div>
                  <p className="text-sm font-bold text-gray-700 uppercase tracking-wide">Entry Condition</p>
                </div>
                <p className="text-gray-700 leading-relaxed">{selectedStage.entryLogic}</p>
              </div>

              {/* Exit Logic */}
              <div className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                    ↑
                  </div>
                  <p className="text-sm font-bold text-gray-700 uppercase tracking-wide">Exit Condition</p>
                </div>
                <p className="text-gray-700 leading-relaxed">{selectedStage.exitLogic}</p>
              </div>
            </div>

            {/* User Actions */}
            <div className="bg-white rounded-lg p-8 border border-gray-200">
              <p className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-6">What You Should Do</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {selectedStage.userActions.map((action, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-accent/20 text-accent font-bold text-sm">
                        ✓
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-700 font-medium">{action}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Common Mistakes */}
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="text-2xl">⚠️</div>
                <p className="text-sm font-bold text-yellow-900 uppercase tracking-wide">Common Mistakes to Avoid</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {selectedStage.commonMistakes.map((mistake, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-300 text-yellow-900 font-bold text-sm">
                        ✗
                      </div>
                    </div>
                    <div>
                      <p className="text-yellow-900 font-medium">{mistake}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Roles */}
            <div className="bg-white rounded-lg p-8 border border-gray-200">
              <p className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-6">Primary Roles</p>
              <div className="flex flex-wrap gap-3">
                {selectedStage.relatedRoles.map((role) => (
                  <div
                    key={role}
                    className="px-4 py-2 rounded-full bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/20 text-gray-700 font-medium text-sm capitalize"
                  >
                    {role}
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center pt-8">
              <button
                onClick={() => selectedIndex > 0 && setSelectedStageId(stages[selectedIndex - 1].id)}
                disabled={selectedIndex === 0}
                className="px-6 py-3 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-gray-100 text-gray-700 hover:bg-gray-200"
              >
                ← Previous Stage
              </button>
              <div className="text-sm text-gray-600">
                Stage {selectedIndex + 1} of {stages.length}
              </div>
              <button
                onClick={() => selectedIndex < stages.length - 1 && setSelectedStageId(stages[selectedIndex + 1].id)}
                disabled={selectedIndex === stages.length - 1}
                className="px-6 py-3 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-accent text-black hover:opacity-90"
              >
                Next Stage →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
