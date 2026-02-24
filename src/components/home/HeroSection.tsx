"use client";

import { motion } from "framer-motion";
import { ChevronRight, Play, Star, Sparkles, Layers } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { staggerContainer, fadeUpItem } from "@/lib/utils/motionConfig";

export const HeroSection = () => {
    return (
        <section className="relative min-h-screen flex items-center pt-32 overflow-hidden bg-background">
            {/* Background Grid - Adaptive to theme */}
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.05]" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                    {/* Left Column: Copy & CTAs */}
                    <motion.div
                        variants={staggerContainer}
                        initial="initial"
                        animate="animate"
                        className="text-left"
                    >
                        <motion.div
                            variants={fadeUpItem}
                            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-xs font-medium text-text-secondary mb-10 border shadow-sm transition-all hover:border-primary/30"
                        >
                            <Sparkles size={14} className="text-text-muted" />
                            <span className="tracking-widest font-medium uppercase text-[10px]">New v3.0 Components live</span>
                        </motion.div>

                        <motion.h1
                            variants={fadeUpItem}
                            className="text-7xl md:text-8xl lg:text-[10rem] font-medium tracking-tighter text-text-primary mb-8 leading-[0.8] font-display"
                        >
                            Mobile UIs <br />
                            <span className="text-text-primary">that feel</span> <br />
                            <span className="text-primary italic">effortless.</span>
                        </motion.h1>

                        <motion.p
                            variants={fadeUpItem}
                            className="text-xl text-text-secondary max-w-xl mb-12 leading-relaxed font-medium"
                        >
                            Production-ready Flutter, React Native & Expo components. Optimized for performance, designed for conversion, and ready to ship today.
                        </motion.p>

                        <motion.div
                            variants={fadeUpItem}
                            className="flex flex-wrap gap-6"
                        >
                            <Link href="/components">
                                <Button size="lg" className="group rounded-2xl h-20 px-10 text-xl font-medium bg-primary text-primary-foreground hover:scale-105 transition-all shadow-glow-amber hover:bg-primary/90">
                                    Start Building
                                    <ChevronRight size={22} className="ml-2 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </Link>
                            <Link href="/playground">
                                <Button variant="outline" size="lg" className="group rounded-2xl h-20 px-10 text-xl font-medium border-border hover:bg-surface text-text-primary transition-all">
                                    <Play size={20} className="mr-3" />
                                    Playground
                                </Button>
                            </Link>
                        </motion.div>

                        {/* Stats Section */}
                        <motion.div
                            variants={fadeUpItem}
                            className="mt-20 flex items-center gap-16"
                        >
                            {[
                                { value: "300+", label: "Assets" },
                                { value: "3", label: "Frameworks" },
                                { value: "10k+", label: "Developers" }
                            ].map((stat, idx) => (
                                <div key={idx} className="flex flex-col">
                                    <span className="text-text-primary font-medium text-5xl tracking-tighter font-display">{stat.value}</span>
                                    <span className="text-[10px] uppercase tracking-widest text-text-muted font-medium mt-1">{stat.label}</span>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Right Column: Phone Mockup */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                        className="hidden lg:block relative"
                    >
                        <div className="relative z-10 mx-auto w-full max-w-[420px]">
                            {/* Phone Frame Mockup */}
                            <div className="relative rounded-[4rem] border-[14px] border-text-primary/5 bg-text-primary p-4 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] aspect-[9/19] overflow-hidden">
                                {/* Inner Screen */}
                                <div className="w-full h-full rounded-[3rem] overflow-hidden bg-background relative border border-border/10">
                                    <img
                                        src="https://images.unsplash.com/photo-1616469829581-73993eb86b02?q=80&w=1000&auto=format&fit=crop"
                                        alt="Mobile App Preview"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                                    {/* Mock Status Bar */}
                                    <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-black/40 to-transparent flex items-center justify-between px-10">
                                        <div className="w-8 h-2 bg-white/20 rounded-full" />
                                        <div className="w-12 h-2 bg-white/20 rounded-full" />
                                    </div>

                                    {/* Floating Action Badge */}
                                    <div className="absolute bottom-10 left-10 right-10 p-5 bg-primary text-primary-foreground font-medium rounded-2xl shadow-glow-amber text-center text-sm tracking-tight">
                                        Ship Faster.
                                    </div>
                                </div>
                            </div>

                            {/* Floating Decorative Elements */}
                            <motion.div
                                animate={{ y: [0, -25, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -top-12 -right-12 p-8 bg-surface border border-border rounded-[2.5rem] shadow-2xl z-20"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center">
                                    <Layers size={28} className="text-primary" />
                                </div>
                            </motion.div>

                            <motion.div
                                animate={{ y: [0, 25, 0] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                className="absolute -bottom-12 -left-12 p-8 bg-surface border border-border rounded-[2.5rem] shadow-2xl z-20"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-text-primary/5 flex items-center justify-center">
                                    <Star size={28} className="text-text-primary" />
                                </div>
                            </motion.div>
                        </div>

                        {/* Background Glow */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 blur-[130px] rounded-full -z-10 opacity-60" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
