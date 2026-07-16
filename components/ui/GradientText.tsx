import React from 'react'
import { cn } from '@/lib/utils'

export function GradientText({ children, className, as: Component = 'span' }: { children: React.ReactNode, className?: string, as?: any }) {
  return (
    <Component className={cn('bg-gradient-to-r from-fuchsia-400 to-accent bg-clip-text text-transparent', className)}>
      {children}
    </Component>
  )
}
