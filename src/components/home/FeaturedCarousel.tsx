"use client";

import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Eye, Copy, Star, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";


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
                
                {/* Header */}
                <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8 relative z-10">
                    <div className="max-w-xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface/50 border border-border text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-6 shadow-sm">
                            <Sparkles size={14} />
                            Handpicked Gems
                        </div>
                        <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-medium text-text-primary tracking-tight leading-none">
                            Featured <br />
                            <span className="text-primary italic pr-2">
                                Components.
                            </span>
                        </h2>
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={scrollPrev}
                            className="h-14 w-14 flex items-center justify-center rounded-2xl bg-surface/50 backdrop-blur-md border border-border text-text-primary hover:text-primary hover:border-primary/50 transition-all shadow-sm hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button
                            onClick={scrollNext}
                            className="h-14 w-14 flex items-center justify-center rounded-2xl bg-surface/50 backdrop-blur-md border border-border text-text-primary hover:text-primary hover:border-primary/50 transition-all shadow-sm hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>
                </div>

                {/* Carousel */}
                <div className="overflow-hidden -mx-6 px-6" ref={emblaRef}>
                    <div className="flex gap-8 py-8">
                        {FEATURED_COMPONENTS.map((item, index) => (
                            <div
                                key={index}
                                className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.33%] xl:flex-[0_0_25%]"
                            >
                                <div className="group relative bg-surface/30 backdrop-blur-xl border border-border/50 rounded-[2.5rem] overflow-hidden hover:border-primary/30 transition-all duration-500 shadow-lg hover:shadow-[0_8px_20px_rgba(0,0,0,0.2)] h-full flex flex-col">
                                    
                                    {/* Thumbnail Area with Moving Image */}
                                    <div className="aspect-[4/3] bg-surface relative overflow-visible flex items-center justify-center pt-8 px-8">
                                        {/* Subtle background grid & glow */}
                                        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />
                                        <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors duration-500" />
                                        
                                        {/* Floating Frameless Mobile Image */}
                                        <motion.div
                                            animate={{ y: [0, -10, 0] }}
                                            transition={{ 
                                                duration: 4, 
                                                repeat: Infinity, 
                                                ease: "easeInOut",
                                                delay: index * 0.2 // Stagger the floating animation slightly per card
                                            }}
                                            className="relative w-full h-full"
                                        >
                                            <img 
                                                src="/assets/mobileimage1.png" 
                                                alt={item.name}
                                                className="w-full h-full object-contain object-top drop-shadow-2xl group-hover:scale-110 group-hover:-translate-y-4 transition-all duration-700 ease-out"
                                            />
                                        </motion.div>

                                        {/* Floating Badge */}
                                        <div className="absolute top-5 right-5 z-20">
                                            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-md border border-border/50 text-text-primary font-bold text-[10px] uppercase tracking-widest shadow-sm">
                                                <Star size={12} className="text-primary fill-primary" />
                                                {item.stars}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content Area */}
                                    <div className="p-8 flex flex-col flex-grow bg-background/50">
                                        <div className="mb-3">
                                            <span className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase">
                                                {item.category}
                                            </span>
                                        </div>

                                        <h3 className="text-2xl font-bold text-text-primary mb-6 tracking-tight leading-tight group-hover:text-primary transition-colors">
                                            {item.name}
                                        </h3>

                                        <div className="mt-auto flex items-center justify-between pt-6 border-t border-border/50">
                                            <div className="flex gap-2">
                                                {item.frameworks.map((fw) => (
                                                    <span key={fw} className="px-2 py-1 rounded-md bg-surface border border-border/50 text-[10px] font-bold text-text-secondary uppercase tracking-widest">
                                                        {fw}
                                                    </span>
                                                ))}
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center gap-1.5 text-text-secondary text-[10px] font-bold uppercase tracking-widest">
                                                    <Copy size={14} />
                                                    <span>{item.copies}</span>
                                                </div>
                                                <Link href={`/components/${item.slug}`}>
                                                    <Button size="icon" className="h-10 w-10 rounded-xl bg-fuchsia-600 text-white shadow-lg shadow-fuchsia-600/20 hover:bg-fuchsia-700 hover:scale-110 transition-all">
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

                {/* Footer CTA */}
                <div className="mt-16 text-center">
                    <Link href="/components">
                        <Button variant="outline" className="rounded-2xl h-14 px-10 border-border bg-surface/50 backdrop-blur-sm text-text-primary font-bold uppercase tracking-widest text-xs hover:bg-surface hover:border-fuchsia-600/30 transition-all group">
                            Browse All 300+ Components 
                            <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

const ArrowRight = ({ size, className }: { size: number; className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
);