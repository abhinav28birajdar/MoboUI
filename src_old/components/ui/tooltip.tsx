'use client';

import * as React from 'react';
import { cn } from '@/lib/utils/cn';

const TooltipProvider = ({ children }: { children: React.ReactNode }) => <>{children}</>;

const Tooltip = ({ children }: { children: React.ReactNode }) => (
    <div className="group relative inline-block">
        {children}
    </div>
);

const TooltipTrigger = ({ children }: { children: React.ReactNode }) => (
    <div className="cursor-pointer">{children}</div>
);

const TooltipContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & { sideOffset?: number }
>(({ className, sideOffset = 4, children, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 px-3 py-1.5 text-sm bg-popover text-popover-foreground border rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap animate-in fade-in duration-200",
            className
        )}
        {...props}
    >
        {children}
    </div>
));
TooltipContent.displayName = 'TooltipContent';

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
