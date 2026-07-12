import * as React from "react"
import { cn } from "@/lib/utils/cn"

export function Sheet({ children }: { children: React.ReactNode }) {
  return <div className="relative">{children}</div>
}

export function SheetContent({ className, children, isOpen, onClose }: { className?: string; children: React.ReactNode; isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className={cn("relative w-full max-w-sm bg-bg-card border-l border-border-subtle p-6 h-full flex flex-col justify-between overflow-y-auto space-y-8 z-10", className)}>
        {children}
      </div>
    </div>
  )
}
