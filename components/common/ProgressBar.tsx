import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
  label?: string;
  showPercent?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  total,
  label,
  showPercent = true,
}) => {
  const percent = (current / total) * 100;

  return (
    <div className="w-full">
      {label && <p className="text-sm text-secondary mb-2">{label}</p>}
      <div className="w-full bg-gray-900 border border-gray-700 rounded-full h-2">
        <div
          className="bg-accent h-2 rounded-full transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
      {showPercent && <p className="text-xs text-secondary mt-1">{Math.round(percent)}%</p>}
    </div>
  );
};
