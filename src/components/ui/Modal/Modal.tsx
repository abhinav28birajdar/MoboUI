'use client';

import * as React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { Button } from '@/components/ui/button';

interface ModalProps {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
    className?: string;
}

export function Modal({ open, onClose, children, className }: ModalProps) {
    React.useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        if (open) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-background/80 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div
                className={cn(
                    'relative z-50 w-full max-w-lg rounded-lg border bg-background p-6 shadow-lg animate-scale-in',
                    className
                )}
            >
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 top-4"
                    onClick={onClose}
                >
                    <X className="h-4 w-4" />
                </Button>
                {children}
            </div>
        </div>
    );
}

export function ModalHeader({ children, className }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={cn('mb-4', className)}>{children}</div>;
}

export function ModalTitle({ children, className }: React.HTMLAttributes<HTMLHeadingElement>) {
    return <h2 className={cn('text-2xl font-semibold', className)}>{children}</h2>;
}

export function ModalDescription({
    children,
    className,
}: React.HTMLAttributes<HTMLParagraphElement>) {
    return <p className={cn('text-sm text-muted-foreground', className)}>{children}</p>;
}

export function ModalContent({ children, className }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={cn('py-4', className)}>{children}</div>;
}

export function ModalFooter({ children, className }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={cn('flex justify-end gap-2 mt-4', className)}>{children}</div>;
}
