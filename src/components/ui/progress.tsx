import * as React from "react"
import { cn } from "@/lib/utils/cn"

export function Progress({ value = 0, className }: { value: number; className?: string }) {
  return (
    <div className={cn("relative h-2 w-full overflow-hidden rounded-full bg-bg-surface border border-border-subtle", className)}>
      <div
        className="h-full w-full flex-1 bg-accent transition-all duration-300"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </div>
  )
}
