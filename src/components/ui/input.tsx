import * as React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ error, ...props }: InputProps, ref) => (
    <div className="relative">
      <input
        ref={ref}
        className={cn(
          'w-full rounded-lg border border-line bg-surface px-4 py-2.5 text-sm text-text placeholder:text-text-dim focus:border-accent focus:outline-none',
          error && 'border-red-500/50 focus:border-red-500'
        )}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  )
);
Input.displayName = 'Input';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ error, ...props }: TextareaProps, ref) => (
    <div className="relative">
      <textarea
        ref={ref}
        className={cn(
          'w-full rounded-lg border border-line bg-surface px-4 py-2.5 text-sm text-text placeholder:text-text-dim focus:border-accent focus:outline-none',
          error && 'border-red-500/50 focus:border-red-500'
        )}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  )
);
Textarea.displayName = 'Textarea';