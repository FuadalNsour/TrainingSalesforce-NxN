import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
  hoverable = false,
}) => {
  return (
    <div
      onClick={onClick}
      className={`
        bg-surface border border-gray-700 rounded-lg p-6
        ${hoverable ? 'cursor-pointer hover:border-accent transition-colors' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};
