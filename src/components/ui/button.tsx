import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'outline';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', ...props }, ref) => {
    const styles = {
      primary: 'bg-accent text-white hover:opacity-90',
      ghost: 'text-text hover:bg-white/5',
      outline: 'border border-line text-text hover:bg-white/5',
    }[variant];
    return (
      <button
        ref={ref}
        className={cn('inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm uppercase tracking-widest transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent disabled:opacity-50', styles, className)}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';