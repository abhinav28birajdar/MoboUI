'use client';

import * as React from 'react';
import { cn } from '@/lib/utils/cn';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'secondary' | 'success' | 'danger' | 'warning' | 'outline';
}

const variantStyles = {
    default: 'bg-primary text-primary-foreground',
    secondary: 'bg-secondary text-secondary-foreground',
    success: 'bg-success text-success-foreground',
    danger: 'bg-danger text-danger-foreground',
    warning: 'bg-warning text-warning-foreground',
    outline: 'border border-input bg-background',
};

export function Badge({ variant = 'default', className, ...props }: BadgeProps) {
    return (
        <div
            className={cn(
                'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors',
                variantStyles[variant],
                className
            )}
            {...props}
        />
    );
}
