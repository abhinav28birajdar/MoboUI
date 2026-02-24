"use client";

import { cn } from "@/lib/utils/cn";

export function ShinyText({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <span
            className={cn(
                "inline-flex bg-gradient-to-r from-neutral-100 via-neutral-500 to-neutral-100 bg-[200%_auto] bg-clip-text text-transparent animate-shimmer",
                className
            )}
        >
            {children}
        </span>
    );
}
