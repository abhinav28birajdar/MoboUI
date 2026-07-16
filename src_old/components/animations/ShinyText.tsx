"use client";

import { cn } from "@/lib/utils/cn";

export function ShinyText({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <span
            className={cn(
                "inline-flex text-primary",
                className
            )}
        >
            {children}
        </span>
    );
}
