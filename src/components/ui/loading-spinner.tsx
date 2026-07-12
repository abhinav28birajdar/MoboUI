'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'spinner' | 'dots' | 'bars';
  className?: string;
}

export function LoadingSpinner({
  size = 'md',
  variant = 'spinner',
  className,
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  if (variant === 'dots') {
    const dotSizes = {
      sm: 'h-1.5 w-1.5',
      md: 'h-2.5 w-2.5',
      lg: 'h-4 w-4',
    };
    return (
      <div className={cn('flex items-center justify-center space-x-1.5', className)}>
        <div className={cn('rounded-full bg-fuchsia-600 animate-bounce [animation-delay:-0.3s]', dotSizes[size])} />
        <div className={cn('rounded-full bg-fuchsia-600 animate-bounce [animation-delay:-0.15s]', dotSizes[size])} />
        <div className={cn('rounded-full bg-fuchsia-600 animate-bounce', dotSizes[size])} />
      </div>
    );
  }

  if (variant === 'bars') {
    const barHeights = {
      sm: 'h-4 w-0.5',
      md: 'h-8 w-1',
      lg: 'h-12 w-1.5',
    };
    return (
      <div className={cn('flex items-end justify-center space-x-1', className)}>
        <div className={cn('bg-fuchsia-600 animate-[pulse_1s_infinite_ease-in-out] [animation-delay:-0.4s]', barHeights[size])} />
        <div className={cn('bg-fuchsia-600 animate-[pulse_1s_infinite_ease-in-out] [animation-delay:-0.2s]', barHeights[size])} />
        <div className={cn('bg-fuchsia-600 animate-[pulse_1s_infinite_ease-in-out]', barHeights[size])} />
      </div>
    );
  }

  // Default spinner
  return (
    <div className={cn('flex items-center justify-center', className)}>
      <Loader2 className={cn('animate-spin text-fuchsia-600', sizeClasses[size])} />
    </div>
  );
}
