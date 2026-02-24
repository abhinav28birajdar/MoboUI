'use client';

import * as React from 'react';
import { cn } from '@/lib/utils/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'neon' | 'neon-outline';
    size?: 'default' | 'sm' | 'lg' | 'icon';
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'default', size = 'default', asChild = false, ...props }, ref) => {
        // Basic variant styles
        const variants = {
            default: 'bg-primary text-black hover:bg-primary/90 shadow-[0_0_15px_rgba(132,204,22,0.3)]',
            destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
            outline: 'border border-neutral-800 bg-transparent hover:bg-neutral-900 hover:border-primary/50 text-neutral-400 hover:text-white',
            secondary: 'bg-neutral-900 border border-neutral-800 text-white hover:bg-neutral-800',
            ghost: 'hover:bg-primary/10 hover:text-primary',
            link: 'text-primary underline-offset-4 hover:underline',
            neon: 'bg-primary text-black font-black shadow-[0_0_25px_rgba(132,204,22,0.4)] hover:shadow-[0_0_40px_rgba(132,204,22,0.6)] hover:bg-amber-400 hover:scale-[1.02]',
            'neon-outline': 'bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-black shadow-[inset_0_0_10px_rgba(132,204,22,0.2)] hover:shadow-[0_0_20px_rgba(132,204,22,0.4)]',
        };

        const sizes = {
            default: 'h-11 px-6 py-2',
            sm: 'h-9 rounded-lg px-4 text-xs',
            lg: 'h-14 rounded-2xl px-10 text-base',
            icon: 'h-11 w-11 p-2',
        };

        const baseStyles = 'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-bold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95';

        return (
            <button
                ref={ref}
                className={cn(baseStyles, variants[variant], sizes[size], className)}
                {...props}
            />
        );
    }
);
Button.displayName = 'Button';

export { Button };
