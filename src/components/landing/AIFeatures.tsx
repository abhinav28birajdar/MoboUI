'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRightLeft, Cpu, Wand2, Zap, Smartphone, Code2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function AIFeatures() {
    return (
        <section className="py-32 bg-black relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 blur-[150px] rounded-full -z-10" />

            <div className="container px-6 mx-auto">
                <div className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-8"
                    >
                        <Cpu size={14} className="animate-pulse" />
                        AI-POWERED WORKFLOW
                    </motion.div>

                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-heading font-black tracking-tighter  text-white mb-8">
                        BUILD AT THE SPEED <br />
                        <span className="text-primary neon-text-glow">OF THOUGHT.</span>
                    </h2>

                    <p className="text-xl text-neutral-400 max-w-2xl mx-auto font-medium">
                        Our advanced AI engine automates the heavy lifting. Generate, convert, and optimize code in milliseconds.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {/* AI Generator Block */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="group relative"
                    >
                        <div className="absolute inset-0 bg-primary/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        <div className="relative h-full p-12 bg-neutral-900/50 border border-white/5 rounded-[3rem] overflow-hidden flex flex-col items-start transition-all duration-500 group-hover:border-primary/50 group-hover:-translate-y-2">
                            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform">
                                <Wand2 size={32} />
                            </div>
                            <h3 className="text-4xl font-heading font-black  tracking-tighter text-white mb-4">
                                COMPONENT <br />
                                <span className="text-primary">GENERATOR</span>
                            </h3>
                            <p className="text-neutral-400 font-medium mb-10 leading-relaxed text-lg">
                                Describe your vision in plain English. Our AI understands layout, styles, and animation patterns to build production-ready components.
                            </p>
                            <Button asChild className="mt-auto rounded-2xl h-14 px-8 bg-primary text-black font-black uppercase tracking-widest text-xs hover:scale-105 active:scale-95 transition-all">
                                <Link href="/ai/generator">TRY GENERATOR <Zap size={14} className="ml-2 fill-current" /></Link>
                            </Button>
                        </div>
                    </motion.div>

                    {/* AI Converter Block */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="group relative"
                    >
                        <div className="absolute inset-0 bg-blue-500/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        <div className="relative h-full p-12 bg-neutral-900/50 border border-white/5 rounded-[3rem] overflow-hidden flex flex-col items-start transition-all duration-500 group-hover:border-blue-500/50 group-hover:-translate-y-2">
                            <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-8 group-hover:scale-110 transition-transform">
                                <ArrowRightLeft size={32} />
                            </div>
                            <h3 className="text-4xl font-heading font-black  tracking-tighter text-white mb-4">
                                FRAMEWORK <br />
                                <span className="text-blue-500">BRIDGE</span>
                            </h3>
                            <p className="text-neutral-400 font-medium mb-10 leading-relaxed text-lg">
                                Instantly translate code between React Native and Flutter. Perfect for teams managing cross-platform codebases without the manual overhead.
                            </p>
                            <Button asChild className="mt-auto rounded-2xl h-14 px-8 bg-blue-500 text-white font-black uppercase tracking-widest text-xs hover:scale-105 active:scale-95 transition-all shadow-lg shadow-blue-500/20">
                                <Link href="/ai/converter">TRY CONVERTER <ArrowRightLeft size={14} className="ml-2" /></Link>
                            </Button>
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="mt-20 p-1 bg-gradient-to-r from-transparent via-white/5 to-transparent h-px"
                />

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 text-center">
                    {[
                        { label: 'Latency', value: '< 2.5s', icon: Zap },
                        { label: 'Accuracy', value: '99.2%', icon: Smartphone },
                        { label: 'Exports', value: '3 Platforms', icon: Code2 },
                        { label: 'Uptime', value: '99.9%', icon: Cpu },
                    ].map((stat, i) => (
                        <div key={i} className="space-y-2">
                            <div className="flex items-center justify-center gap-2 text-neutral-500 mb-1">
                                <stat.icon size={14} />
                                <span className="text-[10px] font-black uppercase tracking-widest">{stat.label}</span>
                            </div>
                            <div className="text-3xl font-heading font-black  tracking-tighter text-white">{stat.value}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
