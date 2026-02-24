'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Smartphone } from 'lucide-react';
import Link from 'next/link';

const components = [
    { name: 'Animated Button', type: 'Buttons', framework: 'RN' },
    { name: 'Glass Card', type: 'Cards', framework: 'FL' },
    { name: 'Search Header', type: 'Navigation', framework: 'RN' },
    { name: 'Swipe List', type: 'Lists', framework: 'RN' },
    { name: 'Bottom Sheet', type: 'Modals', framework: 'FL' },
    { name: 'Credit Card', type: 'Payment', framework: 'RN' },
    { name: 'Profile Head', type: 'Profile', framework: 'FL' },
    { name: 'Tab Bar', type: 'Navigation', framework: 'RN' },
];

export function ComponentShowcase() {
    return (
        <section className="py-32 bg-black overflow-hidden border-t border-white/5">
            <div className="container px-6 mx-auto mb-20 text-left">
                <span className="text-primary font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Product Showcase</span>
                <h2 className="font-heading font-black text-4xl md:text-6xl mb-6 text-white uppercase tracking-tighter">
                    Featured <span className="text-primary ">Components.</span>
                </h2>
                <p className="text-neutral-400 text-lg max-w-2xl font-sans">
                    Explore our collection of premium, production-ready components.
                </p>
            </div>

            {/* Carousel Container */}
            <div className="relative w-full">
                <div className="flex overflow-x-auto pb-12 snap-x snap-mandatory px-6 gap-8 scrollbar-hide scroll-smooth -mx-4 md:mx-0">
                    {components.map((comp, index) => (
                        <motion.div
                            key={index}
                            className="snap-center shrink-0 w-[280px] md:w-[320px] bg-neutral-900/50 border border-white/5 rounded-[40px] p-8 group hover:border-primary/30 transition-all duration-500 flex flex-col"
                        >
                            {/* Phone Frame */}
                            <div className="relative aspect-[9/18] bg-black rounded-[32px] border-[6px] border-neutral-800 overflow-hidden mb-8 shadow-2xl flex items-center justify-center transition-all">
                                {/* Notch */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-neutral-800 rounded-b-xl z-10" />

                                <div className="flex flex-col items-center gap-4 p-4 text-center">
                                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                                        <Smartphone className="w-7 h-7 text-primary" />
                                    </div>
                                    <span className="text-[10px] font-bold text-neutral-600 uppercase tracking-widest">Interactive Preview</span>
                                </div>
                            </div>

                            <div className="mt-auto">
                                <h3 className="font-heading font-black text-xl text-white mb-4 uppercase tracking-tighter">
                                    {comp.name}
                                </h3>

                                <div className="flex items-center justify-between mt-4">
                                    <span className={`text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-sm ${comp.framework === 'RN' ? 'bg-primary text-black' : 'bg-white text-black'}`}>
                                        {comp.framework === 'RN' ? 'React Native' : 'Flutter'}
                                    </span>

                                    <Link href={`/components/${comp.name.toLowerCase().replace(' ', '-')}`} className="text-xs font-black uppercase tracking-widest text-neutral-500 hover:text-primary flex items-center gap-1 transition-colors group/link">
                                        View <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
