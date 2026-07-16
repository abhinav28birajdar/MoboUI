import * as React from "react"
import { cn } from "@/lib/utils/cn"

export function Popover({ children }: { children: React.ReactNode }) {
  return <div className="relative inline-block">{children}</div>
}

export function PopoverTrigger({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return <div onClick={onClick} className="cursor-pointer">{children}</div>
}

export function PopoverContent({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("absolute z-50 rounded-[10px] border border-border-subtle bg-bg-card p-4 text-text-primary shadow-md outline-none", className)}>
      {children}
    </div>
  )
}
