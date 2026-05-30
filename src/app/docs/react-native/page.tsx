'use client';

import { motion } from 'framer-motion';
import { Smartphone, Zap, Code2, Palette, ArrowRight, Shield, Globe } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const features = [
    {
        title: 'Optimized for Performance',
        description: 'Every component is built with Performance in mind using native drivers and reanimated.',
        icon: Zap,
        color: 'text-yellow-500',
        bg: 'bg-yellow-500/10'
    },
    {
        title: 'TypeScript First',
        description: 'Fully typed components for a rock-solid developer experience and autocomplete.',
        icon: Code2,
        color: 'text-blue-500',
        bg: 'bg-blue-500/10'
    },
    {
        title: 'Theming Engine',
        description: 'Dynamic and flexible theming that supports neon, glass, and minimal aesthetics.',
        icon: Palette,
        color: 'text-primary',
        bg: 'bg-primary/10'
    },
    {
        title: 'Cross-Platform',
        description: 'Seamlessly works across iOS and Android with platform-specific optimizations.',
        icon: Smartphone,
        color: 'text-indigo-500',
        bg: 'bg-indigo-500/10'
    }
];

export default function ReactNativeDocs() {
    return (
        <div className="max-w-4xl mx-auto space-y-16 pb-20">
            {/* Header section with badge */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
            >
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                        <div className="text-cyan-500 font-black text-xl ">RN</div>
                    </div>
                    <div>
                        <span className="text-xs font-black text-neutral-500 uppercase tracking-widest block">Framework Guide</span>
                        <span className="text-primary text-[10px] font-bold uppercase tracking-widest">v2.0 Stable</span>
                    </div>
                </div>

                <h1 className="text-5xl md:text-7xl font-heading font-black tracking-tighter text-white leading-none uppercase ">
                    React Native <br />
                    <span className="text-primary neon-text-glow">Engine.</span>
                </h1>

                <p className="text-xl text-neutral-400 leading-relaxed max-w-2xl font-medium">
                    MoboUI's React Native engine is built for the "New Architecture" by default.
                    Leverage fabric, turbo modules, and JSI-based components for extreme performance.
                </p>

                <div className="flex flex-wrap gap-4 pt-4">
                    <Button size="lg" className="btn-primary h-14 px-8 rounded-2xl" asChild>
                        <Link href="/components">
                            Browse RN Components <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                    </Button>
                    <Button variant="outline" size="lg" className="btn-secondary h-14 px-8 rounded-2xl" asChild>
                        <Link href="/playground">Open Playground</Link>
                    </Button>
                </div>
            </motion.div>

            {/* Feature segments */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {features.map((feature, i) => (
                    <motion.div
                        key={feature.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-8 rounded-[32px] bg-neutral-900/50 border border-white/5 hover:border-primary/30 transition-all group relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl -z-10 group-hover:bg-primary/10 transition-all" />

                        <div className={`w-14 h-14 rounded-2xl ${feature.bg} flex items-center justify-center mb-6 border border-white/5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                            <feature.icon className={`w-7 h-7 ${feature.color}`} />
                        </div>

                        <h3 className="text-2xl font-heading font-black text-white mb-4 group-hover:text-primary transition-colors  uppercase tracking-tight">
                            {feature.title}
                        </h3>
                        <p className="text-neutral-400 leading-relaxed font-medium">
                            {feature.description}
                        </p>
                    </motion.div>
                ))}
            </div>

            {/* CLI / Install Section */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="p-10 md:p-14 rounded-[40px] bg-neutral-900 border border-white/5 relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />

                <div className="relative z-10 space-y-8">
                    <div>
                        <h2 className="text-3xl font-heading font-black text-white uppercase  tracking-tighter mb-4">Quick Setup</h2>
                        <p className="text-neutral-400 max-w-md font-medium">
                            The fastest way to get MoboUI into your React Native or Expo project is via our official CLI tool.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="group relative">
                            <div className="absolute -inset-1 bg-primary rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                            <div className="relative flex items-center justify-between p-6 bg-black rounded-2xl border border-white/10 font-mono text-sm overflow-x-auto">
                                <span className="text-neutral-300">
                                    <span className="text-cyan-500">npx</span> moboui-cli init
                                </span>
                                <Button size="sm" variant="ghost" className="h-8 text-[10px] font-black uppercase text-neutral-500 hover:text-white">Copy</Button>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-8 pt-4">
                        <div className="flex items-center gap-3">
                            <Shield className="w-5 h-5 text-primary" />
                            <span className="text-xs font-bold text-neutral-300 uppercase tracking-widest">Enterprise Ready</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Globe className="w-5 h-5 text-cyan-500" />
                            <span className="text-xs font-bold text-neutral-300 uppercase tracking-widest">Global CDN Assets</span>
                        </div>
                    </div>

                    <Button className="bg-white text-black hover:bg-neutral-200 font-black rounded-xl h-14 px-8 uppercase  tracking-tighter" asChild>
                        <Link href="/docs/dependencies">Read Integration Guide</Link>
                    </Button>
                </div>
            </motion.div>
        </div>
    );
}
