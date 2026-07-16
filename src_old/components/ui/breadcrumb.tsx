import * as React from "react"
import { cn } from "@/lib/utils/cn"

export function Breadcrumb({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return <nav aria-label="breadcrumb" className={cn("flex flex-wrap items-center gap-1.5 break-words text-xs text-text-secondary font-semibold", className)} {...props} />
}

export function BreadcrumbList({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) {
  return <ol className={cn("flex flex-wrap items-center gap-1.5 break-words text-xs text-text-secondary", className)} {...props} />
}

export function BreadcrumbItem({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) {
  return <li className={cn("inline-flex items-center gap-1.5", className)} {...props} />
}

export function BreadcrumbLink({ className, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a className={cn("transition-colors hover:text-text-primary cursor-pointer", className)} {...props} />
}

export function BreadcrumbPage({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span role="link" aria-disabled="true" aria-current="page" className={cn("font-bold text-text-primary", className)} {...props} />
}

export function BreadcrumbSeparator({ children, className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span role="presentation" aria-hidden="true" className={cn("[&>svg]:size-3.5 text-text-muted", className)} {...props}>
      {children || "/"}
    </span>
  )
}
