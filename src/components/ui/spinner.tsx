import { cn } from "@/lib/utils/cn"

export function Spinner({ className }: { className?: string }) {
  return (
    <div className={cn("w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin", className)} />
  )
}
