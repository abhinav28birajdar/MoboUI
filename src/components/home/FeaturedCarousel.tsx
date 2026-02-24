"use client";

import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Eye, Copy, Star, Sparkles, Smartphone } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

const FEATURED_COMPONENTS = [
    {
        name: "Glassmorphic Card",
        category: "Cards",
        stars: 4.9,
        copies: "1.2k",
        frameworks: ["Flutter", "RN"],
        slug: "glass-card"
    },
    {
        name: "Neumorphic Toggle",
        category: "Inputs",
        stars: 4.8,
        copies: "850",
        frameworks: ["Expo", "RN"],
        slug: "neu-toggle"
    },
    {
        name: "Animated FAB",
        category: "Buttons",
        stars: 5.0,
        copies: "2.3k",
        frameworks: ["Flutter"],
        slug: "fab"
    },
    {
        name: "Bottom Tab Bar",
        category: "Navigation",
        stars: 4.7,
        copies: "1.5k",
        frameworks: ["Expo", "Flutter"],
        slug: "tabbar"
    },
    {
        name: "Modern Search Bar",
        category: "Inputs",
        stars: 4.9,
        copies: "3.1k",
        frameworks: ["RN", "Flutter"],
        slug: "search"
    },
];

export const FeaturedCarousel = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: "start",
        loop: true,
        skipSnaps: false,
    });

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    return (
        <section className="py-32 bg-background relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
                    <div className="max-w-xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border text-text-muted text-[9px] font-black uppercase tracking-[0.2em] mb-4 ">
                            Handpicked Gems
                        </div>
                        <h2 className="text-5xl md:text-7xl font-display font-black text-text-primary uppercase tracking-tighter  leading-none">
                            Featured <br /><span className="text-primary ">Components.</span>
                        </h2>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={scrollPrev}
                            className="h-14 w-14 flex items-center justify-center rounded-2xl bg-surface border border-border text-text-muted hover:text-primary hover:border-primary/50 transition-all shadow-sm"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button
                            onClick={scrollNext}
                            className="h-14 w-14 flex items-center justify-center rounded-2xl bg-surface border border-border text-text-muted hover:text-primary hover:border-primary/50 transition-all shadow-sm"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>
                </div>

                <div className="overflow-hidden" ref={emblaRef}>
                    <div className="flex gap-8">
                        {FEATURED_COMPONENTS.map((item, index) => (
                            <div
                                key={index}
                                className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.33%] xl:flex-[0_0_25%]"
                            >
                                <div className="group relative bg-surface border border-border rounded-[2.5rem] overflow-hidden hover:border-primary/30 transition-all duration-500 shadow-sm hover:shadow-glow-amber h-full flex flex-col">
                                    {/* Thumbnail */}
                                    <div className="aspect-[16/10] bg-surface-elevated relative overflow-hidden flex items-center justify-center">
                                        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
                                        <Smartphone size={40} className="text-text-muted/20 group-hover:scale-110 group-hover:text-primary/20 transition-all duration-700" />

                                        <div className="absolute top-4 right-4 z-20">
                                            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-background/50 backdrop-blur-md border border-border/50 text-text-muted font-black text-[9px] uppercase tracking-widest ">
                                                <Star size={10} fill="var(--primary)" className="text-primary" />
                                                {item.stars}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-8 flex flex-col flex-grow">
                                        <div className="mb-4">
                                            <span className="text-[9px] font-black tracking-[0.2em] text-primary uppercase ">
                                                {item.category}
                                            </span>
                                        </div>

                                        <h3 className="text-2xl font-black text-text-primary mb-6 uppercase tracking-tighter  leading-tight group-hover:text-primary transition-colors">
                                            {item.name}
                                        </h3>

                                        <div className="mt-auto flex items-center justify-between pt-6 border-t border-border">
                                            <div className="flex gap-1.5">
                                                {item.frameworks.map((fw) => (
                                                    <span key={fw} className="text-[9px] font-black text-text-muted uppercase tracking-widest ">
                                                        {fw}
                                                    </span>
                                                ))}
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center gap-1 text-text-muted text-[10px] font-black uppercase tracking-widest ">
                                                    <Copy size={12} />
                                                    <span>{item.copies}</span>
                                                </div>
                                                <Link href={`/components/${item.slug}`}>
                                                    <Button size="icon" className="h-10 w-10 rounded-xl bg-primary text-primary-foreground shadow-glow-amber hover:scale-110 transition-all">
                                                        <Eye size={18} />
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-20 text-center">
                    <Link href="/components">
                        <Button variant="outline" className="rounded-2xl h-14 px-10 border-border bg-surface text-text-primary font-black uppercase tracking-widest text-xs  hover:bg-surface-elevated transition-all">
                            Browse All 300+ Components <ArrowRight size={16} className="ml-2" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

const ArrowRight = ({ size, className }: { size: number; className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
);
