import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  type?: 'status';
}

export const Badge: React.FC<BadgeProps> = ({ children, type = 'status' }) => {
  const styles = {
    status: 'bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold',
  };

  return <span className={styles[type]}>{children}</span>;
};
