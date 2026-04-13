import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  type?: 'role' | 'status' | 'progress';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  type = 'role',
  className = '',
}) => {
  const types = {
    role: 'bg-accent bg-opacity-20 text-accent border border-accent',
    status: 'bg-gray-700 text-gray-300 border border-gray-600',
    progress: 'bg-accent text-black',
  };

  return (
    <span className={`inline-block px-3 py-1 rounded text-sm font-bold ${types[type]} ${className}`}>
      {children}
    </span>
  );
};
