import * as React from "react"
import { cn } from "@/lib/utils/cn"

export function Accordion({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("space-y-4", className)}>{children}</div>
}

export function AccordionItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("bg-bg-card/35 border border-border-subtle rounded-2xl overflow-hidden", className)}>{children}</div>
}

export function AccordionTrigger({ children, onClick, isOpen }: { children: React.ReactNode; onClick: () => void; isOpen: boolean }) {
  return (
    <button
      onClick={onClick}
      className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-text-primary hover:text-accent transition-colors text-sm uppercase tracking-wide cursor-pointer"
    >
      {children}
    </button>
  )
}

export function AccordionContent({ children, isOpen }: { children: React.ReactNode; isOpen: boolean }) {
  if (!isOpen) return null
  return (
    <div className="px-6 pb-6 text-text-secondary text-xs leading-relaxed font-medium">
      {children}
    </div>
  )
}
