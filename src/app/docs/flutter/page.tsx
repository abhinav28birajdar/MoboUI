'use client';

import { motion } from 'framer-motion';
import { Smartphone, Code2, Flame, Palette, ArrowRight, Layers, Zap } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const features = [
    {
        title: 'Hot Reload Ready',
        description: 'Optimized for Flutter\'s stateful hot reload. UI updates instantly while preserving state.',
        icon: Flame,
        color: 'text-orange-500',
        bg: 'bg-orange-500/10'
    },
    {
        title: 'Dart 3.0+ Powered',
        description: 'Leverages latest Dart features like records and pattern matching for clean API.',
        icon: Code2,
        color: 'text-blue-400',
        bg: 'bg-blue-400/10'
    },
    {
        title: 'Material 3 & Cupertino',
        description: 'Dual-adaptive components that automatically switch design systems based on OS.',
        icon: Palette,
        color: 'text-amber-500',
        bg: 'bg-amber-500/10'
    },
    {
        title: 'Skia Rendered',
        description: 'High-performance rendering using the Skia engine for 120fps animations.',
        icon: Smartphone,
        color: 'text-blue-500',
        bg: 'bg-blue-500/10'
    }
];

export default function FlutterDocs() {
    return (
        <div className="max-w-4xl mx-auto space-y-16 pb-20">
            {/* Header section */}
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7 }}
                className="space-y-6"
            >
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                        <div className="text-blue-500 font-black text-xl ">FL</div>
                    </div>
                    <div>
                        <span className="text-xs font-black text-neutral-500 uppercase tracking-widest block">Widget Framework</span>
                        <span className="text-blue-400 text-[10px] font-bold uppercase tracking-widest">v1.8.0-gamma</span>
                    </div>
                </div>

                <h1 className="text-5xl md:text-7xl font-heading font-black tracking-tighter text-white leading-none uppercase ">
                    Flutter <br />
                    <span className="text-blue-500 neon-text-glow shadow-blue-500/50">Ecosystem.</span>
                </h1>

                <p className="text-xl text-neutral-400 leading-relaxed max-w-2xl font-medium">
                    Build beautiful, natively compiled applications for mobile, web, and desktop from a single codebase.
                    MoboUI widgets are designed to feel at home on every platform.
                </p>

                <div className="flex flex-wrap gap-4 pt-4">
                    <Button size="lg" className="h-14 px-8 rounded-2xl bg-blue-500 text-white hover:bg-blue-600 shadow-xl shadow-blue-500/20" asChild>
                        <Link href="/components">
                            Explore Widgets <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                    </Button>
                    <Button variant="outline" size="lg" className="btn-secondary h-14 px-8 rounded-2xl" asChild>
                        <Link href="/playground">Try in Browser</Link>
                    </Button>
                </div>
            </motion.div>

            {/* Feature segments */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {features.map((feature, i) => (
                    <motion.div
                        key={feature.title}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-8 rounded-[32px] bg-neutral-900/50 border border-white/5 hover:border-blue-500/30 transition-all group relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl -z-10 group-hover:bg-blue-500/10 transition-all" />

                        <div className={`w-14 h-14 rounded-2xl ${feature.bg} flex items-center justify-center mb-6 border border-white/5 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500`}>
                            <feature.icon className={`w-7 h-7 ${feature.color}`} />
                        </div>

                        <h3 className="text-2xl font-heading font-black text-white mb-4 group-hover:text-blue-400 transition-colors  uppercase tracking-tight">
                            {feature.title}
                        </h3>
                        <p className="text-neutral-400 leading-relaxed font-medium">
                            {feature.description}
                        </p>
                    </motion.div>
                ))}
            </div>

            {/* Pub.dev / Install Section */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-10 md:p-14 rounded-[40px] bg-[#011627] border border-blue-500/10 relative overflow-hidden group"
            >
                <div className="absolute top-0 right-10 w-96 h-96 bg-blue-400/10 blur-[130px] rounded-full group-hover:scale-110 transition-transform duration-1000" />

                <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                    <div className="space-y-6 flex-1 text-center md:text-left">
                        <h2 className="text-3xl font-heading font-black text-white uppercase  tracking-tighter">Native Pub Integration</h2>
                        <div className="inline-block p-6 bg-black/50 backdrop-blur-md rounded-2xl border border-white/5 font-mono text-sm w-full">
                            <span className="text-blue-400">flutter pub add</span> <span className="text-white">mobo_ui</span>
                        </div>
                        <p className="text-neutral-400 font-medium leading-relaxed">
                            No complex build steps. Just add the package and start importing widgets.
                            Fully compatible with Flutter 3.16+ and Material 3.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                                <Layers className="w-3 h-3 text-blue-400" />
                                <span className="text-[10px] font-bold text-neutral-300 uppercase tracking-widest">Modular API</span>
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                                <Zap className="w-3 h-3 text-amber-500" />
                                <span className="text-[10px] font-bold text-neutral-300 uppercase tracking-widest">Optimized Paint</span>
                            </div>
                        </div>
                    </div>

                    <div className="shrink-0">
                        <Button size="lg" className="bg-white text-blue-900 hover:bg-neutral-200 font-black rounded-2xl h-16 px-10 uppercase  tracking-tighter shadow-2xl" asChild>
                            <Link href="/docs/dependencies">View Widget Specs</Link>
                        </Button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
