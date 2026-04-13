import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
}) => {
  const baseStyles = 'font-display font-bold rounded transition-colors duration-200 cursor-pointer';

  const variants = {
    primary: 'bg-green-600 text-white hover:bg-green-700 disabled:opacity-50',
    secondary: 'bg-gray-100 text-gray-900 border border-gray-300 hover:bg-gray-200',
    outline: 'border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white',
  };

  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
};
