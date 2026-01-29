import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function CTA() {
    return (
        <section className="container px-4 py-20 mx-auto">
            <div className="relative rounded-[3rem] overflow-hidden bg-gradient-to-br from-primary via-accent to-secondary p-12 md:p-20 text-center text-white">
                <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px]" />
                <div className="relative z-10">
                    <h2 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
                        Ready to build <br className="hidden md:block" /> beautiful mobile apps?
                    </h2>
                    <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
                        Join thousands of developers using MobileUIKit to accelerate their mobile development workflow.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Button size="lg" variant="secondary" className="rounded-full px-10 text-lg h-14 font-bold" asChild>
                            <Link href="/components">
                                Browse Components <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                        </Button>
                        <Button size="lg" variant="ghost" className="rounded-full px-10 text-lg h-14 font-bold border-2 border-white/20 hover:bg-white/10 text-white" asChild>
                            <Link href="/docs">View Documentation</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
