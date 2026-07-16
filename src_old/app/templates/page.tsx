'use client';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { templates } from '@/lib/data/templates';
import { Layout, Star, ChevronRight, Zap } from 'lucide-react';

export default function TemplatesPage() {
    return (
        <div className="min-h-screen bg-black pb-32">
            {/* Background Decor */}
            <div className="fixed top-0 right-0 w-[60vw] h-[60vh] bg-primary/10 blur-[150px] -z-10 rounded-full" />
            <div className="fixed bottom-0 left-0 w-[50vw] h-[50vh] bg-blue-500/5 blur-[150px] -z-10 rounded-full" />
            <div className="fixed inset-0 bg-grid-white/[0.02] bg-[length:32px_32px] -z-20" />

            <div className="container px-6 mx-auto pt-24">
                <div className="max-w-4xl mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/5 text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500 mb-8 w-fit"
                    >
                        <Layout size={12} className="text-primary" />
                        PRE-BUILT SOLUTIONS
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="font-heading font-black text-6xl md:text-8xl lg:text-9xl mb-8 text-white tracking-tighter leading-[0.85]"
                    >
                        COMPLETE <span className="text-primary  neon-text-glow">SCREENS.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl md:text-2xl text-neutral-400 mb-12 leading-relaxed max-w-2xl font-medium"
                    >
                        Jumpstart your next project with production-ready, fully animated application templates for <span className="text-white font-black">Flutter & React Native.</span>
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {templates.map((template, index) => (
                        <motion.div
                            key={template.id}
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ delay: 0.1 * index }}
                            className="group"
                        >
                            <Card className="bg-neutral-900/50 border-white/5 rounded-[2rem] overflow-hidden hover:border-primary/50 transition-all duration-500 shadow-2xl h-full flex flex-col">
                                <div className="aspect-[4/5] relative overflow-hidden bg-neutral-800">
                                    <img
                                        src={template.image}
                                        alt={template.name}
                                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-100"
                                    />
                                    <div className="absolute inset-0 bg-black/70" />

                                    {template.isPro && (
                                        <div className="absolute top-6 right-6">
                                            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary text-black text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/30">
                                                <Star size={10} fill="currentColor" />
                                                PRO
                                            </div>
                                        </div>
                                    )}

                                    <div className="absolute bottom-8 left-8 right-8">
                                        <div className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-2">{template.category}</div>
                                        <h3 className="text-2xl font-black text-white  tracking-tighter mb-4">{template.name}</h3>
                                        <div className="flex gap-2">
                                            {template.frameworks.map(fw => (
                                                <div key={fw} className="px-3 py-1 rounded-lg bg-white/10 text-[8px] font-black text-white uppercase tracking-widest border border-white/5">
                                                    {fw.replace('-', ' ')}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <CardContent className="p-8 pb-4 flex-1">
                                    <p className="text-neutral-500 text-sm leading-relaxed mb-6 font-medium">
                                        {template.description}
                                    </p>
                                </CardContent>

                                <CardFooter className="p-8 pt-0 gap-3">
                                    <Button asChild className="flex-1 rounded-2xl h-14 font-black uppercase tracking-widest text-xs bg-primary text-black hover:scale-[1.02] transition-all">
                                        <Link href={`/playground?template=${template.id}`}>
                                            Live Preview <Zap size={14} className="ml-2 fill-current" />
                                        </Link>
                                    </Button>
                                    <Button variant="outline" className="h-14 w-14 rounded-2xl border-white/5 bg-white/5 hover:bg-white/10 transition-all">
                                        <ChevronRight size={20} className="text-neutral-400" />
                                    </Button>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}

