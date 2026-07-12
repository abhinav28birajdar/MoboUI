'use client';

import * as React from 'react';
import { Card, CardContent } from './card';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <Card className={cn('max-w-md mx-auto border border-[#2a2a38] bg-[#1a1a24]', className)}>
      <CardContent className="flex flex-col items-center justify-center text-center p-8 space-y-5">
        {icon && (
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2a2a38]/50 text-slate-400">
            {icon}
          </div>
        )}
        <div className="space-y-1.5">
          <h3 className="text-lg font-bold text-white uppercase tracking-tight">{title}</h3>
          <p className="text-sm text-slate-400 max-w-xs leading-relaxed">{description}</p>
        </div>
        {action && <div className="pt-2">{action}</div>}
      </CardContent>
    </Card>
  );
}
