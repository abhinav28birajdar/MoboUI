"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Copy, Eye, Bookmark, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import { cardHover } from "@/lib/utils/motionConfig";

interface ComponentCardProps {
    slug: string;
    name: string;
    category: string;
    copies: string;
    frameworks: string[];
    isPremium?: boolean;
}

export const ComponentCard = ({
    slug,
    name,
    category,
    copies,
    frameworks,
    isPremium,
}: ComponentCardProps) => {
    return (
        <motion.div
            variants={cardHover}
            whileHover="whileHover"
            className="group relative flex flex-col bg-card border border-border rounded-[2.5rem] overflow-hidden transition-all duration-500 shadow-sm hover:border-border-hover"
        >
            {/* Thumbnail Area */}
            <div className="relative aspect-[16/10] bg-surface-elevated overflow-hidden group/thumb">
                {isPremium && (
                    <div className="absolute top-4 left-4 z-20 rounded-full bg-primary px-3 py-1 text-[9px] font-medium text-primary-foreground uppercase tracking-widest shadow-glow-amber">
                        PRO
                    </div>
                )}

                <button className="absolute top-4 right-4 z-20 h-9 w-9 flex items-center justify-center rounded-xl bg-background/50 backdrop-blur-md border border-border/50 text-text-muted hover:text-primary transition-colors">
                    <Bookmark size={16} />
                </button>

                <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent z-10" />

                {/* Mock Graphic */}
                <div className="absolute inset-0 flex items-center justify-center bg-grid-pattern opacity-10 group-hover:opacity-20 transition-opacity" />
                <div className="w-full h-full flex items-center justify-center p-10">
                    <div className="w-full h-full rounded-2xl border-2 border-dashed border-border flex items-center justify-center group-hover/thumb:border-primary/20 transition-colors">
                        <Sparkles size={24} className="text-text-muted transition-all group-hover/thumb:scale-110 group-hover/thumb:text-primary/20" />
                    </div>
                </div>

                {/* Hover Actions */}
                <div className="absolute inset-0 z-20 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity bg-background/20 backdrop-blur-[2px]">
                    <Link href={`/components/${slug}`}>
                        <Button size="sm" className="rounded-xl h-10 px-6 bg-primary text-primary-foreground font-medium uppercase text-[10px] tracking-widest shadow-glow-amber">
                            <Eye size={14} className="mr-2" />
                            View Code
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Content Area */}
            <div className="p-7 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] font-medium tracking-[0.2em] text-text-muted uppercase">
                        {category}
                    </span>
                    <div className="flex items-center gap-1 text-text-muted font-medium text-[10px] uppercase tracking-widest">
                        <Copy size={12} />
                        <span>{copies}</span>
                    </div>
                </div>

                <h3 className="text-xl font-medium text-text-primary mb-5 tracking-tighter leading-tight font-display">
                    {name}
                </h3>

                <div className="mt-auto flex items-center justify-between pt-5 border-t border-border">
                    <div className="flex gap-2">
                        {frameworks.map((fw) => (
                            <span
                                key={fw}
                                className={cn(
                                    "px-2 py-1 rounded-lg border text-[8px] font-medium uppercase tracking-widest",
                                    fw === "Flutter" ? "border-sky-500/20 text-sky-500 bg-sky-500/5" :
                                        fw === "RN" ? "border-indigo-500/20 text-indigo-500 bg-indigo-500/5" :
                                            "border-border text-text-muted bg-surface-elevated"
                                )}
                            >
                                {fw}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
