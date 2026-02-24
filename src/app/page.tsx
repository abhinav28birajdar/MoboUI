// src/app/page.tsx
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedCarousel } from "@/components/home/FeaturedCarousel";
import { GlowEffect } from "@/components/shared/GlowEffect";
import { Button } from "@/components/ui/button";
import { ChevronRight, ArrowRight, Zap, Target, Shield, Palette, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Home() {
    return (
        <div className="flex flex-col bg-background">
            <HeroSection />

            {/* Featured Section */}
            <FeaturedCarousel />

            {/* Why MOBOUI Section */}
            <section className="py-32 bg-surface relative overflow-hidden">
                <GlowEffect className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10" color="amber" size="xl" />
                <div className="absolute inset-0 bg-grid-pattern opacity-5" />

                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center mb-24">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-background border border-border text-text-muted text-[10px] font-bold tracking-[0.2em] mb-6">
                            The MOBOUI Advantage
                        </div>
                        <h2 className="text-5xl md:text-8xl font-display font-medium text-text-primary mb-8 tracking-tighter leading-none">
                            Why <span className="text-primary">MOBOUI?</span>
                        </h2>
                        <p className="text-xl text-text-secondary max-w-2xl mx-auto font-medium">
                            We focus on premium design and developer experience, so you can focus on building your business.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: <Zap className="text-primary" />,
                                title: "Production Ready",
                                desc: "Every component is thoroughly tested and ready for your production app."
                            },
                            {
                                icon: <Target className="text-primary" />,
                                title: "Pixel Perfect",
                                desc: "Meticulously designed components that follow modern mobile design patterns."
                            },
                            {
                                icon: <Shield className="text-primary" />,
                                title: "Full Customization",
                                desc: "Simple props-based API that lets you change every aspect of the UI."
                            },
                            {
                                icon: <Palette className="text-primary" />,
                                title: "Dark/Light Support",
                                desc: "Full support for system dark and light modes across all frameworks."
                            }
                        ].map((feature, i) => (
                            <div key={i} className="p-10 rounded-[2.5rem] bg-background border border-border hover:border-primary/30 hover:shadow-glow-amber transition-all group relative overflow-hidden">
                                <div className="h-14 w-14 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-sm">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-text-primary mb-4 tracking-tighter">{feature.title}</h3>
                                <p className="text-text-secondary leading-relaxed text-sm font-medium">
                                    {feature.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32">
                <div className="container mx-auto px-6">
                    <div className="relative rounded-[4rem] bg-text-primary p-16 md:p-32 overflow-hidden shadow-2xl group">
                        <div className="absolute inset-0 bg-grid-white opacity-5" />
                        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 translate-x-24 group-hover:translate-x-12 transition-transform duration-1000" />

                        <div className="relative z-10 max-w-3xl text-center md:text-left">
                            <h2 className="text-5xl md:text-8xl font-display font-medium text-background mb-10 leading-none tracking-tighter">
                                Ready to build <br /> <span className="text-primary">faster?</span>
                            </h2>
                            <p className="text-background/60 text-xl font-medium mb-16 max-w-lg">
                                Join 10,000+ developers building beautiful apps with MOBOUI. Start today for free.
                            </p>
                            <div className="flex flex-wrap gap-6 justify-center md:justify-start">
                                <Link href="/components">
                                    <Button className="bg-primary text-primary-foreground hover:scale-105 rounded-2xl h-20 px-12 text-lg font-bold tracking-tight shadow-glow-amber transition-all">
                                        Get Started Free
                                        <ChevronRight size={20} className="ml-2" />
                                    </Button>
                                </Link>
                                <Link href="/pricing">
                                    <Button variant="outline" className="border-background/20 text-background hover:bg-background/10 rounded-2xl h-20 px-12 text-lg font-bold tracking-tight transition-all">
                                        View Pricing
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        <div className="absolute right-12 bottom-0 hidden lg:block opacity-20 group-hover:translate-y-4 transition-transform duration-700">
                            <Sparkles size={300} className="text-primary" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
