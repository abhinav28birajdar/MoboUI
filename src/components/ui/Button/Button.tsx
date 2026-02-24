'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils/cn';

const buttonVariants = cva(
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    {
        variants: {
            variant: {
                default: 'bg-[hsl(var(--color-primary))] text-[hsl(var(--color-primary-foreground))] shadow hover:opacity-90',
                destructive: 'bg-[hsl(var(--color-danger))] text-[hsl(var(--color-danger-foreground))] shadow-sm hover:opacity-90',
                outline:
                    'border border-[hsl(var(--color-input))] bg-[hsl(var(--color-background))] shadow-sm hover:bg-[hsl(var(--color-accent))]',
                secondary: 'bg-[hsl(var(--color-secondary))] text-[hsl(var(--color-secondary-foreground))] shadow-sm hover:opacity-80',
                ghost: 'hover:bg-[hsl(var(--color-accent))]',
                link: 'text-[hsl(var(--color-primary))] underline-offset-4 hover:underline',
            },
            size: {
                default: 'h-10 px-4 py-2',
                sm: 'h-9 rounded-md px-3 text-xs',
                lg: 'h-11 rounded-md px-8',
                icon: 'h-10 w-10',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild, ...props }, ref) => {
        if (asChild) {
            // For now, just render as button
            return (
                <button
                    className={cn(buttonVariants({ variant, size, className }))}
                    ref={ref}
                    {...props}
                />
            );
        }

        return (
            <button
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
