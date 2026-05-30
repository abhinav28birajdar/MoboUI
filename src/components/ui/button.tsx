'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'neon' | 'neon-outline';
    size?: 'default' | 'sm' | 'lg' | 'icon';
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'default', size = 'default', asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : 'button';
        // Basic variant styles
        const variants = {
            default: 'bg-primary text-white hover:bg-primary-hover shadow-sm',
            destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
            outline: 'border border-border bg-white hover:bg-surface text-text-secondary hover:text-text-primary',
            secondary: 'bg-white border border-border text-text-secondary hover:bg-surface',
            ghost: 'hover:bg-primary/10 hover:text-primary text-text-secondary',
            link: 'text-primary underline-offset-4 hover:underline',
            neon: 'bg-primary text-primary-foreground font-black shadow-[0_4px_12px_rgba(0,0,0,0.2)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.25)] hover:bg-primary-hover hover:scale-[1.02]',
            'neon-outline': 'bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground shadow-[inset_0_0_10px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)]',
        };

        const sizes = {
            default: 'h-11 px-6 py-2',
            sm: 'h-9 rounded-lg px-4 text-xs',
            lg: 'h-14 rounded-2xl px-10 text-base',
            icon: 'h-11 w-11 p-2',
        };

        const baseStyles = 'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[10px] text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95';

        return (
            <Comp
                ref={ref}
                className={cn(baseStyles, variants[variant], sizes[size], className)}
                {...props}
            />
        );
    }
);
Button.displayName = 'Button';

export { Button };
