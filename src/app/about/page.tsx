"use client";

import { PageHeader } from "@/components/shared/PageHeader";
import { motion } from "framer-motion";
import { Users, Heart, Zap, Globe } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-32 bg-background">
            <div className="max-w-4xl mx-auto">
                <PageHeader
                    badge="Our Mission"
                    title="Design Faster./Build Better."
                    description="MOBOUI was born out of a simple need: premium mobile components that actually look good and work across frameworks."
                />

                <div className="mt-24 grid md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                        <h3 className="text-3xl font-black uppercase  tracking-tighter text-text-primary">The Vision.</h3>
                        <p className="text-text-secondary leading-relaxed">
                            We believe that developers shouldn't have to choose between speed and quality. Our mission is to provide
                            the highest quality UI assets for mobile developers, allowing them to focus on logic while we handle the pixels.
                        </p>
                    </div>
                    <div className="space-y-6">
                        <h3 className="text-3xl font-black uppercase  tracking-tighter text-text-primary">The Library.</h3>
                        <p className="text-text-secondary leading-relaxed">
                            With over 300+ components and growing, MOBOUI is the most comprehensive mobile UI kit on the market.
                            Built with performance first, every component is optimized for 60fps animations.
                        </p>
                    </div>
                </div>

                <div className="mt-32 grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        { icon: <Users className="text-primary" />, label: "Users", value: "10k+" },
                        { icon: <Heart className="text-primary" />, label: "Painless", value: "100%" },
                        { icon: <Zap className="text-primary" />, label: "Speed", value: "2x" },
                        { icon: <Globe className="text-primary" />, label: "Global", value: "50+" },
                    ].map((stat, i) => (
                        <div key={i} className="p-8 bg-surface border border-border rounded-3xl text-center">
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                                {stat.icon}
                            </div>
                            <div className="text-3xl font-black text-text-primary  tracking-tighter mb-1">{stat.value}</div>
                            <div className="text-[10px] uppercase tracking-widest text-text-muted font-bold">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
