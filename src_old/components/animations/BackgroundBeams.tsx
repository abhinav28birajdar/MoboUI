"use client";
import React from "react";
import { cn } from "@/lib/utils/cn";

export const BackgroundBeams = ({ className }: { className?: string }) => {
    return (
        <div
            className={cn(
                "absolute inset-0 mx-auto h-[100%] max-w-7xl",
                className
            )}
        >
            <div
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(255 255 255 / 0.05)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
                }}
                className="absolute inset-0 z-0 h-full w-full [mask-image:radial-gradient(100%_100%_at_top_center,white,transparent)]"
            />
        </div>
    );
};
