'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Smartphone, Zap } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export interface ComponentCardProps {
    id: string;
    name: string;
    description: string;
    category: string;
    frameworks?: ('RN' | 'FL')[]; // Updated to support multiple frameworks
}

export function ComponentCard({ id, name, description, category, frameworks = ['RN', 'FL'] }: ComponentCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -6 }}
            className="group relative bg-[#0A0A0A] border border-white/5 hover:border-primary/50 rounded-[28px] p-4 transition-all duration-500 flex flex-col h-full cursor-pointer overflow-hidden shadow-2xl"
        >
            <Link href={`/components/${id}`} className="absolute inset-0 z-20" aria-label={`View ${name}`} />

            {/* Feature Image / Preview Area */}
            <div className="relative aspect-[4/3] w-full bg-[#111] rounded-[22px] overflow-hidden mb-5 flex items-center justify-center border border-white/5 transition-colors group-hover:border-primary/20">
                {/* Abstract Design Elements */}
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-primary/20 blur-[60px] rounded-full group-hover:scale-150 transition-transform duration-700" />
                    <div className="absolute top-0 right-0 w-full h-full bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.02)_50%,transparent_75%)] bg-[length:250%_250%] animate-gradient-shift" />
                </div>

                {/* Device Mockup Light */}
                <div className="relative z-10 w-[70px] h-[140px] bg-background rounded-[18px] border-[4px] border-[#222] shadow-2xl transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3">
                    <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-8 h-1 bg-[#222] rounded-full" />
                    <div className="w-full h-full flex flex-col p-2 gap-1.5 pt-4">
                        <div className="w-full h-1 bg-primary/20 rounded-full" />
                        <div className="w-3/4 h-1 bg-primary/10 rounded-full" />
                        <div className="mt-auto w-full h-8 bg-secondary/50 rounded-lg flex items-center justify-center">
                            <Zap className="w-3 h-3 text-primary/40" />
                        </div>
                    </div>
                </div>

                {/* Floating Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
                    <div className="px-2 py-1 rounded-md bg-black/40 backdrop-blur-md border border-white/10 text-[9px] font-black uppercase tracking-widest text-white/60">
                        {category}
                    </div>
                </div>
            </div>

            <div className="flex-1 flex flex-col px-2 pb-2">
                <div className="flex items-center justify-between mb-3">
                    <h3 className="font-heading font-extrabold text-lg text-white group-hover:text-primary transition-colors tracking-tight line-clamp-1">
                        {name}
                    </h3>
                </div>

                <p className="text-[13px] text-gray-400 line-clamp-2 mb-6 flex-1 leading-relaxed font-medium">
                    {description}
                </p>

                <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center -space-x-1">
                        {frameworks.map(fw => (
                            <div
                                key={fw}
                                title={fw === 'RN' ? 'React Native' : 'Flutter'}
                                className={cn(
                                    "w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-black border-2 border-[#0A0A0A] shadow-lg",
                                    fw === 'RN' ? "bg-[#61DAFB] text-[#0A0A0A]" : "bg-[#02569B] text-white"
                                )}
                            >
                                {fw}
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-primary group-hover:translate-x-1 transition-transform">
                        Explore <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
