import * as React from "react"
import { cn } from "@/lib/utils/cn"

export function Alert({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      role="alert"
      className={cn("relative w-full rounded-[10px] border border-border-subtle p-4 [&>svg~*]:pl-7 [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-accent bg-bg-card", className)}
      {...props}
    >
      {children}
    </div>
  )
}

export function AlertTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h5
      className={cn("mb-1 font-display font-black leading-none tracking-tight text-text-primary", className)}
      {...props}
    />
  )
}

export function AlertDescription({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("text-xs text-text-secondary leading-relaxed font-body font-medium", className)}
      {...props}
    />
  )
}
