import React from "react";
import { cn } from "@/lib/utils";

interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "7xl" | "full";
  withPadding?: boolean;
}

export function PageContainer({ 
  children, 
  maxWidth = "7xl", 
  withPadding = true,
  className,
  ...props 
}: PageContainerProps) {
  return (
    <div 
      className={cn(
        "mx-auto w-full",
        {
          "max-w-screen-sm": maxWidth === "sm",
          "max-w-screen-md": maxWidth === "md",
          "max-w-screen-lg": maxWidth === "lg",
          "max-w-screen-xl": maxWidth === "xl",
          "max-w-screen-2xl": maxWidth === "2xl",
          "max-w-7xl": maxWidth === "7xl",
          "max-w-none": maxWidth === "full",
          "px-4 sm:px-6 lg:px-8 py-8 md:py-12": withPadding,
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}