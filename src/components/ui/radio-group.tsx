import * as React from "react"
import { cn } from "@/lib/utils/cn"

export function RadioGroup({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("grid gap-2", className)} {...props} />
}

export interface RadioGroupItemProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const RadioGroupItem = React.forwardRef<HTMLInputElement, RadioGroupItemProps>(
  ({ className, id, label, ...props }, ref) => {
    return (
      <div className="flex items-center gap-2">
        <input
          type="radio"
          id={id}
          className={cn("h-4 w-4 rounded-full border border-border-subtle bg-black text-accent focus:ring-accent", className)}
          ref={ref}
          {...props}
        />
        {label && <label htmlFor={id} className="text-sm text-text-secondary cursor-pointer select-none font-medium">{label}</label>}
      </div>
    )
  }
)
RadioGroupItem.displayName = "RadioGroupItem"
