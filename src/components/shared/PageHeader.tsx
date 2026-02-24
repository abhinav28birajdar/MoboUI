"use client";

import { motion } from "framer-motion";
import { fadeUpItem } from "@/lib/utils/motionConfig";

interface PageHeaderProps {
    title: string;
    description?: string;
    badge?: string;
    centered?: boolean;
}

export const PageHeader = ({
    title,
    description,
    badge,
    centered = false,
}: PageHeaderProps) => {
    return (
        <motion.div
            variants={fadeUpItem}
            className={centered ? "text-center" : "text-left"}
        >
            {badge && (
                <span className="mb-4 inline-block rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-medium tracking-wider text-amber-400 uppercase">
                    {badge}
                </span>
            )}
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                {title.split(" ").map((word, i) => (
                    <span key={i} className={word.toLowerCase() === "moboui" || word.toLowerCase().includes("mobile") ? "text-amber-500" : ""}>
                        {word}{" "}
                    </span>
                ))}
            </h1>
            {description && (
                <p className="mx-auto max-w-2xl text-lg text-neutral-400 md:text-xl">
                    {description}
                </p>
            )}
        </motion.div>
    );
};
