"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Copy, Eye, Bookmark, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import { cardHover } from "@/lib/utils/motionConfig";
import { useFrontendAppStore } from "@/lib/store/frontend-app-store";
import type { Component } from "@/lib/types/component";

interface ComponentCardProps {
    component: Component;
}

export const ComponentCard = ({ component }: ComponentCardProps) => {
    const toggleFavorite = useFrontendAppStore((state) => state.toggleFavorite);
    const favorites = useFrontendAppStore((state) => state.favorites);

    const {
        slug,
        name,
        category,
        popularity = 0,
        framework,
        is_premium: isPremium,
        image_url
    } = component;

    const isFavorite = favorites.includes(slug);
    const copies = popularity > 1000 ? `${(popularity / 1000).toFixed(1)}k` : popularity.toString();
    const frameworks = framework === "both" ? ["RN", "Flutter"] : framework === "react-native" ? ["RN"] : ["Flutter"];

    return (
        <motion.div
            variants={cardHover}
            whileHover="whileHover"
            className="group relative flex flex-col bg-card border border-border rounded-[2.5rem] overflow-hidden transition-all duration-500 shadow-sm hover:border-border-hover"
        >
            <div className="relative aspect-[16/10] bg-surface-elevated overflow-hidden group/thumb">
                {isPremium && (
                    <div className="absolute top-4 left-4 z-20 rounded-full bg-primary px-3 py-1 text-[9px] font-bold text-primary-foreground uppercase tracking-widest\">
                        PRO
                    </div>
                )}

                <button
                    onClick={() => toggleFavorite(slug)}
                    className={cn(
                        "absolute top-4 right-4 z-20 h-9 w-9 flex items-center justify-center rounded-xl backdrop-blur-md border transition-colors",
                        isFavorite
                            ? "bg-primary/20 border-primary/50 text-primary"
                            : "bg-background/50 border-border/50 text-text-muted hover:text-primary"
                    )}
                    aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                >
                    <Bookmark size={16} className={cn(isFavorite && "fill-current")} />
                </button>

                <div className="absolute inset-0 bg-background/60 z-10" />

                {image_url ? (
                    <img
                        src={image_url}
                        alt={name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                ) : (
                    <>
                        <div className="absolute inset-0 flex items-center justify-center bg-grid-pattern opacity-10 group-hover:opacity-20 transition-opacity" />
                        <div className="w-full h-full flex items-center justify-center p-10">
                            <div className="w-full h-full rounded-2xl border-2 border-dashed border-border flex items-center justify-center group-hover/thumb:border-primary/20 transition-colors">
                                <Sparkles size={24} className="text-text-muted transition-all group-hover/thumb:scale-110 group-hover/thumb:text-primary/20" />
                            </div>
                        </div>
                    </>
                )}

                <div className="absolute inset-0 z-20 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity bg-background/20 backdrop-blur-[2px]">
                    <Link href={`/components/${slug}`}>
                        <Button size="sm" className="rounded-xl h-10 px-6 bg-primary text-primary-foreground font-bold uppercase text-[10px] tracking-widest hover:bg-primary/90">
                            <Eye size={14} className="mr-2" />
                            View Code
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="p-7 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-6">
                    <div className="flex-1">
                        <div className="text-[10px] font-bold tracking-[0.2em] text-text-muted uppercase mb-2">
                            {category}
                        </div>
                        <h3 className="text-lg font-bold text-text-primary mb-2 tracking-tight">
                            {name}
                        </h3>
                    </div>
                    <div className="flex items-center gap-1 text-text-muted font-bold text-[10px] uppercase tracking-widest whitespace-nowrap ml-4">
                        <Copy size={12} />
                        <span>{copies}</span>
                    </div>
                </div>

                <div className="mt-auto flex items-center justify-between pt-6 border-t border-border">
                    <div className="flex gap-2 flex-wrap">
                        {frameworks.map((fw) => (
                            <span
                                key={fw}
                                className={cn(
                                    "px-2.5 py-1 rounded-lg border text-[8px] font-bold uppercase tracking-widest transition-all",
                                    fw === "Flutter"
                                        ? "border-primary/30 text-primary bg-primary/5"
                                        : fw === "RN"
                                        ? "border-primary/20 text-text-muted bg-surface-elevated"
                                        : "border-primary/30 text-primary bg-primary/5"
                                )}
                            >
                                {fw}
                            </span>
                        ))}
                    </div>
                    <Eye size={16} className="text-text-muted" />
                </div>
            </div>
        </motion.div>
    );
};
