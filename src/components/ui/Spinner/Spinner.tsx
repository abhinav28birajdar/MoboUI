'use client';

import * as React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface SpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

const sizeStyles = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
};

export function Spinner({ size = 'md', className }: SpinnerProps) {
    return (
        <Loader2
            className={cn('animate-spin text-primary', sizeStyles[size], className)}
        />
    );
}

export function LoadingSpinner({ message }: { message?: string }) {
    return (
        <div className="flex flex-col items-center justify-center gap-4 p-8">
            <Spinner size="lg" />
            {message && <p className="text-sm text-muted-foreground">{message}</p>}
        </div>
    );
}
