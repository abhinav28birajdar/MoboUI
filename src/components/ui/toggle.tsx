'use client';

import * as React from 'react';
import { cn } from '@/lib/utils/cn';

interface ToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  pressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  variant?: 'default' | 'outline';
  size?: 'default' | 'sm' | 'lg';
}

const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  ({ className, pressed: controlledPressed, onPressedChange, variant = 'default', size = 'default', ...props }, ref) => {
    const [internalPressed, setInternalPressed] = React.useState(false);
    const pressed = controlledPressed !== undefined ? controlledPressed : internalPressed;

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      const newPressed = !pressed;
      if (controlledPressed === undefined) {
        setInternalPressed(newPressed);
      }
      onPressedChange?.(newPressed);
      props.onClick?.(e);
    };

    const variants = {
      default: 'bg-transparent',
      outline: 'border border-input bg-transparent hover:bg-accent hover:text-accent-foreground',
    };

    const sizes = {
      default: 'h-10 px-3 min-w-10',
      sm: 'h-9 px-2.5 min-w-9',
      lg: 'h-11 px-5 min-w-11',
    };

    return (
      <button
        ref={ref}
        type="button"
        aria-pressed={pressed}
        data-state={pressed ? 'on' : 'off'}
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 gap-2",
          variants[variant],
          sizes[size],
          className
        )}
        onClick={handleClick}
        {...props}
      />
    );
  }
);
Toggle.displayName = 'Toggle';

export { Toggle };
