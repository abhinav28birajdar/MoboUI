'use client';

import { motion } from 'framer-motion';
import { Smartphone, Code2, Box, Layout, ArrowRight, Zap, Terminal, Check, Copy } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const features = [
    {
        title: 'Zero Config',
        description: 'Works instantly with Expo Go and development builds. No native code bridging required.',
        icon: Box,
        color: 'text-white',
        bg: 'bg-white/5'
    },
    {
        title: 'Expo Router v3',
        description: 'Deep integration with filesystem routing. Includes typed Link and Screen components.',
        icon: Layout,
        color: 'text-white',
        bg: 'bg-white/5'
    },
    {
        title: 'Asset Pipeline',
        description: 'Optimized image and font delivery using Expo\'s native asset system and caching.',
        icon: Code2,
        color: 'text-white',
        bg: 'bg-white/5'
    },
    {
        title: 'Universal SDK',
        description: 'Consistent behavior across iOS, Android, and Web with Shared Element transitions.',
        icon: Smartphone,
        color: 'text-white',
        bg: 'bg-white/5'
    }
];

export default function ExpoDocs() {
    const [copied, setCopied] = useState(false);

    const copyCode = () => {
        navigator.clipboard.writeText('npx expo install @moboui/expo');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

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
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-xl">
                        <div className="text-white font-black text-xl  leading-none">EX</div>
                    </div>
                    <div>
                        <span className="text-xs font-black text-neutral-500 uppercase tracking-widest block">Managed Platform</span>
                        <span className="text-white text-[10px] font-bold uppercase tracking-widest opacity-60">Verified for SDK 50+</span>
                    </div>
                </div>

                <h1 className="text-5xl md:text-7xl font-heading font-black tracking-tighter text-white leading-none uppercase ">
                    Expo <br />
                    <span className="text-neutral-500 line-through decoration-primary/50 decoration-4">Evolved.</span>
                    <span className="text-white ml-4">Redefined.</span>
                </h1>

                <p className="text-xl text-neutral-400 leading-relaxed max-w-2xl font-medium">
                    MoboUI + Expo = Speed. Build production-grade mobile applications without ever touching
                    Android Studio or Xcode. The ultimate developer experience.
                </p>

                <div className="flex flex-wrap gap-4 pt-4">
                    <Button size="lg" className="h-14 px-8 rounded-2xl bg-white text-black hover:bg-neutral-200 font-black uppercase  tracking-tighter" asChild>
                        <Link href="/components">
                            Launch Sandbox <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                    </Button>
                    <Button variant="outline" size="lg" className="btn-secondary h-14 px-8 rounded-2xl border-white/10" asChild>
                        <Link href="/docs/getting-started">Get Started</Link>
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
                        className="p-8 rounded-[32px] bg-neutral-900/50 border border-white/5 hover:border-white/20 transition-all group relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-10 w-32 h-32 bg-white/5 blur-3xl -z-10 group-hover:bg-white/10 transition-all" />

                        <div className={`w-14 h-14 rounded-2xl ${feature.bg} flex items-center justify-center mb-6 border border-white/10 group-hover:scale-110 transition-all duration-500`}>
                            <feature.icon className={`w-7 h-7 ${feature.color}`} />
                        </div>

                        <h3 className="text-2xl font-heading font-black text-white mb-4  uppercase tracking-tight">
                            {feature.title}
                        </h3>
                        <p className="text-neutral-400 leading-relaxed font-medium">
                            {feature.description}
                        </p>
                    </motion.div>
                ))}
            </div>

            {/* Install Section */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-10 md:p-14 rounded-[40px] bg-black border border-white/10 relative overflow-hidden group"
            >
                <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:30px_30px] -z-10" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-[150px] -z-20 rounded-full" />

                <div className="relative z-10 flex flex-col items-center text-center space-y-8">
                    <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-2">
                        <Terminal className="w-8 h-8 text-primary\" />
                    </div>

                    <div className="space-y-4 max-w-xl">
                        <h2 className="text-4xl font-heading font-black text-white uppercase  tracking-tighter leading-none">
                            Seamless Installation
                        </h2>
                        <p className="text-neutral-400 font-medium leading-relaxed">
                            MoboUI components are compatible with Expo SDK 50 and above.
                            Our universal core ensures high-performance rendering on the web as well.
                        </p>
                    </div>

                    <div className="w-full max-w-lg group/code relative">
                        <div className="absolute -inset-0.5 bg-white/10 rounded-2xl blur opacity-20 group-hover/code:opacity-30 transition"></div>
                        <div className="relative flex items-center justify-between p-6 bg-[#0D0D0D] rounded-2xl border border-white/10 font-mono text-sm">
                            <span className="text-neutral-300">
                                <span className="text-white/40">npx</span> <span className="text-primary">expo install</span> @moboui/expo
                            </span>
                            <button onClick={copyCode} className="text-neutral-500 hover:text-white transition-colors">
                                {copied ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-8 justify-center pt-4">
                        <div className="flex items-center gap-3">
                            <Zap className="w-5 h-5 text-primary" />
                            <span className="text-xs font-bold text-neutral-300 uppercase tracking-widest">Instant Reloads</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Box className="w-5 h-5 text-white/50" />
                            <span className="text-xs font-bold text-neutral-300 uppercase tracking-widest">EAS Ready</span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
