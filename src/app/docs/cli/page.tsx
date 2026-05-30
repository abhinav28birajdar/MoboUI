'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Copy, Check, Zap, Box } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function CLIDocPage() {
    const [copied, setCopied] = React.useState<string | null>(null);

    const copyToClipboard = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopied(id);
        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-32">
            <div className="container px-6 mx-auto max-w-5xl">
                <div className="mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/5 text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500 mb-8 w-fit"
                    >
                        <Terminal size={12} className="text-primary" />
                        COMMAND LINE INTERFACE
                    </motion.div>

                    <h1 className="text-5xl md:text-7xl font-heading font-black tracking-tighter  mb-6">
                        MOBOUUI <span className="text-primary neon-text-glow">CLI.</span>
                    </h1>
                    <p className="text-xl text-neutral-400 max-w-2xl font-medium">
                        The fastest way to add components to your Flutter or React Native project.
                    </p>
                </div>

                <div className="grid gap-16">
                    {/* Hero Section */}
                    <div className="bg-neutral-900/50 border border-white/5 rounded-[2.5rem] p-10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px] -z-10" />

                        <div className="space-y-8">
                            <h3 className="text-2xl font-bold flex items-center gap-3">
                                <Zap className="text-primary fill-primary" /> Quick Start
                            </h3>

                            <div className="space-y-4">
                                <p className="text-neutral-400 font-medium font-sans">Install the CLI globally or use npx:</p>
                                <div className="bg-black rounded-2xl border border-white/10 p-6 flex items-center justify-between group">
                                    <code className="text-primary font-mono text-lg">npx moboui@latest init</code>
                                    <Button variant="ghost" size="icon" onClick={() => copyToClipboard('npx moboui@latest init', 'init')} className="text-neutral-500 hover:text-white">
                                        {copied === 'init' ? <Check size={18} className="text-primary" /> : <Copy size={18} />}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Commands Table */}
                    <section className="space-y-8">
                        <h2 className="text-3xl font-black  tracking-tighter">COMMON <span className="text-primary">COMMANDS</span></h2>

                        <div className="grid gap-4">
                            {[
                                { cmd: 'add [component]', desc: 'Add a new component to your project' },
                                { cmd: 'list', desc: 'List all available components' },
                                { cmd: 'diff [component]', desc: 'Check for updates for an existing component' },
                                { cmd: 'theme', desc: 'Sync your local theme with MoboUI cloud' }
                            ].map((item, i) => (
                                <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-colors group">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-black rounded-xl border border-white/5 text-primary">
                                            <Box size={20} />
                                        </div>
                                        <div>
                                            <code className="text-white font-bold font-mono">moboui {item.cmd}</code>
                                            <p className="text-neutral-500 text-sm mt-1">{item.desc}</p>
                                        </div>
                                    </div>
                                    <Button variant="ghost" className="mt-4 md:mt-0 text-[10px] font-bold text-neutral-500 group-hover:text-primary" onClick={() => copyToClipboard(`moboui ${item.cmd}`, item.cmd)}>
                                        COPY COMMAND
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Installation Guide */}
                    <section className="space-y-8">
                        <h2 className="text-3xl font-black  tracking-tighter">PROJECT <span className="text-primary">SETUP</span></h2>

                        <Tabs defaultValue="flutter" className="w-full">
                            <TabsList className="bg-neutral-900 border border-white/5 p-1 rounded-2xl mb-8">
                                <TabsTrigger value="flutter" className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-black font-bold h-12 px-8">FLUTTER</TabsTrigger>
                                <TabsTrigger value="react-native" className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-black font-bold h-12 px-8">REACT NATIVE</TabsTrigger>
                            </TabsList>

                            <TabsContent value="flutter" className="space-y-6">
                                <div className="p-8 bg-neutral-900/50 border border-white/5 rounded-3xl space-y-4">
                                    <p className="text-neutral-300 font-medium">1. Run initialization in your Flutter root:</p>
                                    <div className="bg-black p-4 rounded-xl border border-white/5 font-mono text-sm text-neutral-400">
                                        moboui init
                                    </div>
                                    <p className="text-neutral-300 font-medium">2. Select "Flutter" when prompted for the platform.</p>
                                    <p className="text-neutral-300 font-medium">3. The CLI will create a <code className="text-primary">moboui.config.dart</code> file.</p>
                                </div>
                            </TabsContent>

                            <TabsContent value="react-native" className="space-y-6">
                                <div className="p-8 bg-neutral-900/50 border border-white/5 rounded-3xl space-y-4">
                                    <p className="text-neutral-300 font-medium">1. Run initialization in your React Native / Expo root:</p>
                                    <div className="bg-black p-4 rounded-xl border border-white/5 font-mono text-sm text-neutral-400">
                                        npx moboui@latest init
                                    </div>
                                    <p className="text-neutral-300 font-medium">2. Choose between TypeScript (TSX) and JavaScript (JSX).</p>
                                    <p className="text-neutral-300 font-medium">3. A <code className="text-primary">moboui.config.json</code> will be generated.</p>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </section>
                </div>
            </div>
        </div>
    );
}
