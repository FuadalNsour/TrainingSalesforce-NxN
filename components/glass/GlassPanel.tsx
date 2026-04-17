import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import clsx from 'clsx';

const glassPanelStyles = cva(
  'rounded-lg border backdrop-blur-2xl transition-all duration-300',
  {
    variants: {
      variant: {
        elevated: 'bg-white/20 border-white/20 shadow-lg',
        surface: 'bg-white/15 border-white/15 shadow-md',
        deep: 'bg-white/10 border-white/10 shadow-sm',
      },
    },
    defaultVariants: {
      variant: 'surface',
    },
  }
);

interface GlassPanelProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof glassPanelStyles> {
  children: React.ReactNode;
}

export const GlassPanel = React.forwardRef<HTMLDivElement, GlassPanelProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      className={clsx(glassPanelStyles({ variant }), className)}
      {...props}
    />
  )
);

GlassPanel.displayName = 'GlassPanel';
