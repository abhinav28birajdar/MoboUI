'use client';

import * as React from 'react';
import { useCopy } from '@/hooks/use-copy';
import { Button } from './button';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CopyButtonProps extends React.ComponentPropsWithoutRef<typeof Button> {
  value: string;
}

export const CopyButton = React.forwardRef<HTMLButtonElement, CopyButtonProps>(
  ({ className, value, ...props }, ref) => {
    const { copied, copy } = useCopy();

    return (
      <Button
        ref={ref}
        type="button"
        variant="ghost"
        size="icon"
        className={cn('h-8 w-8 text-slate-400 hover:text-white', className)}
        onClick={() => copy(value)}
        {...props}
      >
        {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
      </Button>
    );
  }
);
CopyButton.displayName = 'CopyButton';
