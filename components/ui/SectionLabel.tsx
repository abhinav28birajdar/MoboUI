import React from 'react'
import { cn } from '@/lib/utils'

export function SectionLabel({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <span className={cn('text-sm font-bold uppercase tracking-[0.2em] text-accent', className)}>
      {children}
    </span>
  )
}
