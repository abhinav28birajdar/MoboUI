'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] rounded-lg cursor-pointer',
  {
    variants: {
      variant: {
        default: 'bg-fuchsia-600 text-white hover:bg-fuchsia-700 shadow-[0_0_24px_rgba(192,38,211,0.2)] hover:shadow-[0_0_32px_rgba(192,38,211,0.35)]',
        secondary: 'bg-[#1a1a24] text-white border border-[#2a2a38] hover:bg-[#2a2a38]',
        outline: 'bg-transparent border border-[#2a2a38] text-white hover:bg-[#1a1a24] hover:border-[#c026d3]',
        ghost: 'bg-transparent text-slate-400 hover:text-white hover:bg-[#1a1a24]',
        destructive: 'bg-red-600 text-white hover:bg-red-700 shadow-[0_0_24px_rgba(220,38,38,0.2)]',
        link: 'text-fuchsia-600 underline-offset-4 hover:underline bg-transparent hover:bg-transparent',
      },
      size: {
        sm: 'h-9 px-3 text-xs',
        default: 'h-11 px-5 text-sm',
        lg: 'h-13 px-8 text-base',
        icon: 'h-11 w-11 p-2',
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
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, isLoading, leftIcon, rightIcon, children, ...props }, ref) => {
    if (asChild) {
      return (
        <Slot
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        >
          {children}
        </Slot>
      );
    }

    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin text-white" />}
        {!isLoading && leftIcon && <span className="mr-1 inline-flex shrink-0">{leftIcon}</span>}
        {children}
        {!isLoading && rightIcon && <span className="ml-1 inline-flex shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
