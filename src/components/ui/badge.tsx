import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-full border px-2.5 py-0.5 text-xs font-bold transition-all focus:outline-none focus:ring-2 focus:ring-fuchsia-600 focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-fuchsia-600 text-white',
        secondary: 'border-[#2a2a38] bg-[#1a1a24] text-slate-400',
        outline: 'border-[#2a2a38] text-white bg-transparent',
        new: 'border-fuchsia-600/30 bg-fuchsia-600/10 text-[#c026d3] shadow-[0_0_12px_rgba(192,38,211,0.2)]',
        pro: 'border-transparent bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white',
        featured: 'border-fuchsia-600/30 bg-fuchsia-600/10 text-fuchsia-600',
        success: 'border-green-500/30 bg-green-500/10 text-green-500',
        destructive: 'border-red-500/30 bg-red-500/10 text-red-500',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
