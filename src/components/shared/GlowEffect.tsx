"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

interface GlowEffectProps {
    className?: string;
    color?: "amber" | "white";
    size?: "sm" | "md" | "lg" | "xl";
    delay?: number;
}

export const GlowEffect = ({
    className,
    color = "amber",
    size = "md",
    delay = 0,
}: GlowEffectProps) => {
    const sizeClasses = {
        sm: "w-24 h-24 blur-2xl opacity-20",
        md: "w-48 h-48 blur-3xl opacity-15",
        lg: "w-96 h-96 blur-[100px] opacity-10",
        xl: "w-[600px] h-[600px] blur-[150px] opacity-5",
    };

    const colorClasses = {
        amber: "bg-primary",
        white: "bg-white",
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.1, 1],
            }}
            transition={{
                duration: 8,
                repeat: Infinity,
                delay,
                ease: "easeInOut",
            }}
            className={cn(
                "pointer-events-none absolute rounded-full",
                sizeClasses[size],
                colorClasses[color],
                className
            )}
        />
    );
};
