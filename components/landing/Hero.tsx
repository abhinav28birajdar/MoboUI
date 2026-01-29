"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Smartphone, Zap, ArrowRight } from 'lucide-react';

export default function Hero() {
    return (
        <section className="relative pt-20 overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-primary/20 via-transparent to-transparent -z-10 blur-3xl opacity-50" />
            <div className="absolute top-40 right-[-10%] w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px] -z-10" />

            <div className="container px-4 mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium mb-6">
                        <Zap className="w-4 h-4 fill-primary" />
                        <span>Now with 100+ components</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl mx-auto leading-[1.1]">
                        Beautiful <span className="gradient-text">Mobile UI</span> Components
                    </h1>

                    <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                        Production-ready React Native & Flutter components. Copy, paste, and ship your mobile apps faster than ever.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button size="lg" className="rounded-full px-8 bg-primary hover:bg-primary/90 text-lg h-14" asChild>
                            <Link href="/components">
                                Browse Components <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                        </Button>
                        <Button variant="outline" size="lg" className="rounded-full px-8 text-lg h-14" asChild>
                            <Link href="/playground">
                                Open Playground
                            </Link>
                        </Button>
                    </div>
                </motion.div>

                {/* Hero Mockup */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mt-20 relative max-w-5xl mx-auto"
                >
                    <div className="relative z-10 glass border-white/10 rounded-[2rem] p-4 shadow-2xl overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-accent/5" />
                        <div className="bg-background/80 relative z-20 rounded-[1.5rem] overflow-hidden aspect-[16/9] flex items-center justify-center border border-white/5">
                            <div className="grid grid-cols-3 gap-8 p-12 w-full max-w-4xl">
                                <div className="h-80 rounded-3xl bg-surface/50 border border-white/5 flex items-center justify-center relative group">
                                    <div className="absolute inset-x-0 bottom-4 px-4">
                                        <div className="h-2 w-20 bg-primary/20 rounded-full mx-auto" />
                                    </div>
                                    <Smartphone className="w-12 h-12 text-primary/40 group-hover:scale-110 transition-transform" />
                                </div>
                                <div className="h-[22rem] -mt-10 rounded-3xl bg-surface/80 border-2 border-primary/30 flex items-center justify-center relative shadow-2xl shadow-primary/20 group">
                                    <div className="absolute top-4 inset-x-0">
                                        <div className="h-1 w-12 bg-primary/40 rounded-full mx-auto" />
                                    </div>
                                    <Smartphone className="w-16 h-16 text-primary group-hover:scale-110 transition-transform" />
                                </div>
                                <div className="h-80 rounded-3xl bg-surface/50 border border-white/5 flex items-center justify-center relative group">
                                    <div className="absolute inset-x-0 bottom-4 px-4">
                                        <div className="h-2 w-20 bg-primary/20 rounded-full mx-auto" />
                                    </div>
                                    <Smartphone className="w-12 h-12 text-primary/40 group-hover:scale-110 transition-transform" />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Decorative elements */}
                    <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl -z-10" />
                    <div className="absolute -top-20 -right-20 w-80 h-80 bg-secondary/10 rounded-full blur-3xl -z-10" />
                </motion.div>
            </div>
        </section>
    );
}
