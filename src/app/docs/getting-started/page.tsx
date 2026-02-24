'use client';

import { ChevronRight, Rocket, Terminal, Layers, Palette, Cpu } from 'lucide-react';
import Link from 'next/link';

export default function GettingStartedPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-12 pb-20">
            {/* Header */}
            <header className="space-y-4">
                <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px]">
                    <Rocket className="w-4 h-4" />
                    Getting Started
                </div>
                <h1 className="text-5xl md:text-6xl font-heading font-black tracking-tighter text-foreground">
                    Build with <span className="text-primary ">MoboUI.</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed font-medium max-w-2xl">
                    Everything you need to know about setting up MoboUI in your React Native or Flutter projects.
                </p>
            </header>

            {/* Introduction */}
            <section className="space-y-6">
                <h2 className="text-2xl font-bold tracking-tight">Introduction</h2>
                <p className="text-muted-foreground leading-relaxed">
                    MoboUI is a modern, performance-first UI library designed specifically for mobile developers.
                    Unlike traditional component libraries that are installed via npm, MoboUI follows a
                    <span className="text-foreground font-bold"> copy-paste architecture.</span>
                    This gives you full ownership of the code, allowing for infinite customization without the overhead of heavy dependencies.
                </p>
            </section>

            {/* Installation Flow */}
            <section className="space-y-8">
                <h2 className="text-2xl font-bold tracking-tight">The 3-Step Setup</h2>

                <div className="grid gap-6">
                    {/* Step 1 */}
                    <div className="p-8 rounded-3xl bg-secondary/20 border border-border/50 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl -z-10" />
                        <div className="flex items-start gap-6">
                            <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shrink-0 font-black text-black">01</div>
                            <div className="space-y-3">
                                <h3 className="text-lg font-bold">Initialize your Design System</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Copy the base configuration files into your project to set up the core tokens, colors, and typography.
                                </p>
                                <div className="bg-black/80 rounded-xl p-4 flex items-center justify-between group-hover:border-primary/30 border border-transparent transition-all">
                                    <code className="text-primary text-sm font-mono tracking-tight">npx moboui@latest init</code>
                                    <Terminal className="w-4 h-4 text-gray-600" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="p-8 rounded-3xl bg-secondary/20 border border-border/50 relative overflow-hidden group">
                        <div className="flex items-start gap-6">
                            <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shrink-0 font-black text-black">02</div>
                            <div className="space-y-3">
                                <h3 className="text-lg font-bold">Browse & Select Components</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Head over to our 300+ component library, find the UI elements you need, and customize them in the playground.
                                </p>
                                <Link href="/components" className="inline-flex items-center text-primary font-bold text-sm hover:translate-x-1 transition-transform">
                                    Browse Library <ChevronRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="p-8 rounded-3xl bg-secondary/20 border border-border/50 relative overflow-hidden group">
                        <div className="flex items-start gap-6">
                            <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shrink-0 font-black text-black">03</div>
                            <div className="space-y-3">
                                <h3 className="text-lg font-bold">Copy & Paste</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Copy the generated code for your specific framework (React Native or Flutter) and paste it into your codebase.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Framework Guidance */}
            <section className="space-y-8">
                <h2 className="text-2xl font-bold tracking-tight">Choose your Framework</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-6 rounded-3xl border border-border/50 hover:border-cyan-500/50 transition-all bg-gradient-to-br from-cyan-500/5 to-transparent">
                        <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-6">
                            <Layers className="text-cyan-500" />
                        </div>
                        <h4 className="font-bold mb-2">React Native & Expo</h4>
                        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                            Optimized for the latest Expo SDK and React Native versions. Uses Reanimated for fluid animations.
                        </p>
                        <Link href="/docs/react-native" className="text-cyan-500 font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                            View RN Docs <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="p-6 rounded-3xl border border-border/50 hover:border-blue-500/50 transition-all bg-gradient-to-br from-blue-500/5 to-transparent">
                        <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6">
                            <Cpu className="text-blue-500" />
                        </div>
                        <h4 className="font-bold mb-2">Flutter SDK</h4>
                        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                            Native-level performance with beautiful material and cupertino widgets. Leverages CustomPainter for premium effects.
                        </p>
                        <Link href="/docs/flutter" className="text-blue-500 font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                            View Flutter Docs <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer Navigation */}
            <footer className="pt-12 border-t border-border/50 flex items-center justify-between">
                <div className="flex flex-col gap-2">
                    <span className="text-xs text-muted-foreground font-bold uppercase tracking-widest">Previous Page</span>
                    <Link href="/docs" className="text-foreground font-bold flex items-center gap-2 hover:text-primary transition-colors">
                        Introduction
                    </Link>
                </div>
                <div className="flex flex-col gap-2 text-right">
                    <span className="text-xs text-muted-foreground font-bold uppercase tracking-widest">Next Page</span>
                    <Link href="/docs/theming" className="text-foreground font-bold flex items-center gap-2 hover:text-primary transition-colors justify-end">
                        Theming Strategy <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>
            </footer>
        </div>
    );
}
