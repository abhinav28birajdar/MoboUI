'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function CTA() {
    return (
        <section className="py-32 relative overflow-hidden bg-black">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/20 blur-[150px] rounded-full -z-10" />

            <div className="container px-6 mx-auto text-center relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="font-heading font-black text-5xl md:text-7xl mb-6 text-white uppercase tracking-tighter"
                >
                    Boost your <span className="text-primary ">Workflow.</span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-xl md:text-2xl text-neutral-400 mb-12 max-w-2xl mx-auto font-sans"
                >
                    Start using our premium mobile components in your next project today.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col sm:flex-row justify-center gap-4"
                >
                    <Button size="lg" className="h-16 px-12 rounded-full text-sm font-black uppercase tracking-widest bg-primary text-black hover:bg-white transition-colors shadow-2xl shadow-primary/20" asChild>
                        <Link href="/components">
                            Get Started <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                    </Button>
                    <Button size="lg" variant="outline" className="h-16 px-12 rounded-full text-sm font-black uppercase tracking-widest bg-transparent border-white/20 text-white hover:bg-white hover:text-black hover:border-white transition-all" asChild>
                        <Link href="/playground">
                            Open Playground
                        </Link>
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}
