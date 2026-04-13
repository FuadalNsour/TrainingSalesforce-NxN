import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', hoverable = false }) => {
  return (
    <div
      className={`bg-white border border-gray-200 rounded-lg p-6 ${
        hoverable ? 'hover:border-green-600 hover:shadow-md transition-all' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};
