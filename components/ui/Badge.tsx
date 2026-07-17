import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-zinc-200 dark:bg-zinc-800 text-zinc-100',
        new: 'border-transparent bg-accent text-zinc-900 dark:text-white',
        popular: 'border-transparent bg-warning/20 text-warning',
        flutter: 'border-transparent bg-[#54C5F8]/20 text-[#54C5F8]',
        expo: 'border-transparent bg-white/20 text-zinc-900 dark:text-white',
        rn: 'border-transparent bg-[#61DAFB]/20 text-[#61DAFB]',
        outline: 'text-zinc-100 border-zinc-700',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
