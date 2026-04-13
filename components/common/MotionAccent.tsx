import React from 'react';

interface MotionAccentProps {
  orientation?: 'horizontal' | 'vertical' | 'diagonal';
  className?: string;
}

export const MotionAccent: React.FC<MotionAccentProps> = ({
  orientation = 'horizontal',
  className = '',
}) => {
  const orientations = {
    horizontal: 'flex gap-2 h-1',
    vertical: 'flex flex-col gap-2 w-1',
    diagonal: 'transform -rotate-45 flex gap-2',
  };

  // 5-step motion lines: black center, green edges
  const steps = [
    'bg-gradient-to-r from-accent via-black to-accent w-4',
    'bg-gradient-to-r from-accent via-black to-accent w-6',
    'bg-gradient-to-r from-accent via-black to-accent w-8',
    'bg-gradient-to-r from-accent via-black to-accent w-6',
    'bg-gradient-to-r from-accent via-black to-accent w-4',
  ];

  return (
    <div className={`${orientations[orientation]} ${className}`}>
      {steps.map((step, i) => (
        <div key={i} className={`${step} rounded`} />
      ))}
    </div>
  );
};
