import React from 'react';
import { motion } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import clsx from 'clsx';
import { commitmentButton } from '@/lib/motion-presets';

const buttonStyles = cva(
  'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary: 'bg-[#0369A1] text-white hover:shadow-lg',
        secondary: 'border-2 border-[#0369A1] text-[#0369A1] hover:bg-blue-50',
        ghost: 'text-[#0369A1] hover:bg-blue-100',
      },
      size: {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

interface GlassButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'ref'>,
    VariantProps<typeof buttonStyles> {
  children: React.ReactNode;
}

export const GlassButton = React.forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    const {
      onDrag,
      onDragStart,
      onDragEnd,
      onDirectionLock,
      onDragTransitionEnd,
      ...buttonProps
    } = props as any;

    return (
      <motion.button
        ref={ref}
        className={clsx(buttonStyles({ variant, size }), className)}
        whileHover={variant === 'primary' ? 'hover' : undefined}
        whileTap="tap"
        variants={commitmentButton}
        {...buttonProps}
      >
        {children}
      </motion.button>
    );
  }
);

GlassButton.displayName = 'GlassButton';
