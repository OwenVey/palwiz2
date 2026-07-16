import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

type InputProps = ComponentProps<'input'>;

function Input({ className, type, ...props }: InputProps) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs outline-none transition-[color,box-shadow] placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        'focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50',
        className
      )}
      {...props}
    />
  );
}

export { Input };
