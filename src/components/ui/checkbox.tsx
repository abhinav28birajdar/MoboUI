'use client';

import * as React from 'react';
import { cn } from '@/lib/utils/cn';
import { Check } from 'lucide-react';

const Checkbox = React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement> & { checked?: boolean; onCheckedChange?: (checked: boolean) => void }
>(({ className, checked, onCheckedChange, ...props }, ref) => {
    const [internalChecked, setInternalChecked] = React.useState(false);

    const isControlled = checked !== undefined;
    const isChecked = isControlled ? checked : internalChecked;

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!isControlled) {
            setInternalChecked(!isChecked);
        }
        onCheckedChange?.(!isChecked);
        props.onClick?.(e);
    };

    return (
        <button
            ref={ref}
            type="button"
            role="checkbox"
            aria-checked={isChecked}
            data-state={isChecked ? 'checked' : 'unchecked'}
            className={cn(
                "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground flex items-center justify-center transition-colors",
                className
            )}
            onClick={handleClick}
            {...props}
        >
            {isChecked && <Check className="h-3 w-3 text-current" strokeWidth={3} />}
        </button>
    );
});
Checkbox.displayName = 'Checkbox';

export { Checkbox };
