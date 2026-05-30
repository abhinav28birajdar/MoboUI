'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Palette, Sun, Moon, Droplets, Layout, Copy, Check, Terminal } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function ThemingDocsPage() {
    const [copied, setCopied] = useState(false);

    const copyCode = () => {
        navigator.clipboard.writeText(`import { useTheme } from '@/hooks/useTheme';

const MyComponent = () => {
  const { theme, toggleTheme } = useTheme();
  return <Button onPress={toggleTheme} title="Toggle" />;
};`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-16 pb-20">
            {/* Header */}
            <motion.header
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
            >
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                        <Palette className="text-primary w-6 h-6" />
                    </div>
                    <div>
                        <span className="text-xs font-black text-neutral-500 uppercase tracking-widest block">Customization</span>
                        <h1 className="text-4xl md:text-6xl font-heading font-black tracking-tighter text-white uppercase ">
                            Theming <span className="text-primary neon-text-glow">Engine.</span>
                        </h1>
                    </div>
                </div>
                <p className="text-xl text-neutral-400 leading-relaxed font-medium max-w-2xl">
                    A robust, unified theming system that synchronizes design tokens across
                    React Native, Expo, and Flutter using a shared JSON architecture.
                </p>
            </motion.header>

            {/* Semantic Palette */}
            <section className="space-y-8">
                <div className="flex items-center gap-4">
                    <h2 className="text-2xl font-bold text-white tracking-tight">Semantic Palette</h2>
                    <div className="h-px flex-1 bg-white/5" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        { name: 'Primary', class: 'bg-primary text-black', hex: '#77D970' },
                        { name: 'Secondary', class: 'bg-neutral-800 text-white', hex: '#262626' },
                        { name: 'Destructive', class: 'bg-red-500 text-white', hex: '#EF4444' },
                        { name: 'Muted', class: 'bg-neutral-900 text-neutral-500 border border-white/5', hex: '#171717' },
                    ].map((color) => (
                        <div key={color.name} className="group cursor-pointer">
                            <div className={`h-24 rounded-2xl ${color.class} flex items-center justify-center font-black text-xs uppercase tracking-widest transition-transform group-hover:scale-[1.02] shadow-lg mb-3`}>
                                {color.name}
                            </div>
                            <div className="flex justify-between items-center px-2">
                                <span className="text-[10px] font-bold text-neutral-500 uppercase">{color.name}</span>
                                <span className="text-[10px] font-mono text-primary">{color.hex}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Mode Switching */}
            <div className="grid md:grid-cols-2 gap-12">
                <section className="space-y-6">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <Droplets className="w-5 h-5 text-primary" /> Appearance Modes
                    </h3>
                    <p className="text-neutral-400 leading-relaxed font-medium">
                        Switch between light and dark modes with silky smooth transitions. Mobility's engine
                        uses hardware acceleration for theme color interpolation.
                    </p>

                    <div className="flex gap-4">
                        <div className="flex-1 p-6 rounded-3xl bg-white text-black border border-neutral-200 flex flex-col items-center gap-4 group cursor-pointer hover:bg-neutral-50 transition-colors">
                            <Sun className="w-8 h-8 group-hover:rotate-45 transition-transform duration-500" />
                            <span className="font-black text-[10px] uppercase tracking-widest">Light Mode</span>
                        </div>
                        <div className="flex-1 p-6 rounded-3xl bg-neutral-900 text-white border border-white/5 flex flex-col items-center gap-4 group cursor-pointer hover:bg-black transition-colors">
                            <Moon className="w-8 h-8 group-hover:-rotate-12 transition-transform duration-500" />
                            <span className="font-black text-[10px] uppercase tracking-widest">Dark Mode</span>
                        </div>
                    </div>
                </section>

                <section className="space-y-6">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <Terminal className="w-5 h-5 text-primary" /> Implementation
                    </h3>
                    <p className="text-neutral-400 leading-relaxed font-medium">
                        Access and modify themes globally using our intuitive hook system.
                    </p>

                    <div className="relative group">
                        <div className="absolute -inset-1 bg-primary/20 rounded-3xl blur opacity-25" />
                        <div className="relative bg-[#0D0D0D] p-6 rounded-3xl border border-white/10 font-mono text-[13px] leading-relaxed overflow-hidden">
                            <div className="flex justify-between items-center mb-4 pb-4 border-b border-white/5">
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-primary/20" />
                                </div>
                                <button onClick={copyCode} className="text-neutral-500 hover:text-white transition-colors">
                                    {copied ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
                                </button>
                            </div>
                            <pre className="text-neutral-300">
                                <code className="block">
                                    <span className="text-purple-400">import</span> {'{'} useTheme {'}'} <span className="text-purple-400">from</span> <span className="text-primary">'@/hooks'</span>;{'\n\n'}
                                    <span className="text-blue-400 font-bold ">const</span> {'{'} theme, toggle {'}'} = <span className="text-yellow-400">useTheme</span>();
                                </code>
                            </pre>
                        </div>
                    </div>
                </section>
            </div>

            {/* Design Tokens Section */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="p-10 rounded-[40px] bg-surface border border-white/5"
            >
                <div className="flex flex-col md:flex-row gap-12 items-center">
                    <div className="space-y-6 flex-1">
                        <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                            <Layout className="w-6 h-6 text-primary" /> Design Tokens
                        </h2>
                        <p className="text-neutral-400 font-medium leading-relaxed">
                            MoboUI follows the Atomic Design principles. Customize spacing, border-radius, and typography
                            globally by modifying the <code className="text-primary text-sm font-mono bg-primary/5 px-1.5 py-0.5 rounded">theme.json</code> file.
                        </p>
                        <Button className="btn-primary" asChild>
                            <Link href="/docs/tokens">View All Tokens</Link>
                        </Button>
                    </div>
                    <div className="w-full md:w-64 grid grid-cols-2 gap-3 shrink-0">
                        {[12, 16, 24, 32].map(r => (
                            <div key={r} className="aspect-square bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center font-mono text-[10px] text-neutral-500 uppercase flex-col gap-1 hover:border-primary/30 transition-colors">
                                <div className="w-8 h-8 border-2 border-primary/40" style={{ borderRadius: r / 2 }} />
                                R-{r}px
                            </div>
                        ))}
                    </div>
                </div>
            </motion.section>
        </div>
    );
}
