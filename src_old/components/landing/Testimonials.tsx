"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
    {
        name: "Alex Johnson",
        role: "Senior Mobile Dev",
        company: "TechFlow",
        content: "MobileUI saved me weeks of development time. The components are pixel-perfect and the React Native code is cleaner than what I write myself.",
        rating: 5,
    },
    {
        name: "Sarah Chen",
        role: "Flutter Developer",
        company: "StartupInc",
        content: "Finally a component library that treats Flutter as a first-class citizen. The dual preview mode is a game changer for cross-platform teams.",
        rating: 5,
    },
    {
        name: "Michael Brown",
        role: "Product Designer",
        company: "DesignCo",
        content: "The attention to detail in the design tokens and animations is incredible. It feels like a premium iOS app out of the box.",
        rating: 5,
    },
    {
        name: "Emily Davis",
        role: "Frontend Lead",
        company: "WebScale",
        content: "Having both Expo and Flutter code side-by-side makes migrating or maintaining dual codebases so much easier. Highly recommended.",
        rating: 5,
    },
    {
        name: "David Wilson",
        role: "Indie Hacker",
        company: "ShipFast",
        content: "I built my MVP in a weekend using MoboUI. The copy-paste workflow is exactly what I needed to move fast without breaking things.",
        rating: 5,
    },
];

export function Testimonials() {
    return (
        <section className="py-24 bg-background overflow-hidden">
            <div className="container px-4 mx-auto mb-16 text-center">
                <h2 className="text-3xl md:text-5xl font-black mb-6">
                    Loved by <span className="text-primary">Developers</span>
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                    Join thousands of developers building beautiful mobile apps faster.
                </p>
            </div>

            <div className="relative w-full mask-gradient-x">
                <div className="flex gap-6 animate-marquee w-max hover:[animation-play-state:paused] px-4">
                    {[...testimonials, ...testimonials].map((t, i) => (
                        <Card key={i} className="w-[350px] md:w-[450px] shrink-0 bg-secondary/10 border-white/5 hover:border-primary/50 transition-colors">
                            <CardContent className="p-6 md:p-8 flex flex-col gap-4">
                                <div className="flex gap-1 text-yellow-500 mb-2">
                                    {[...Array(t.rating)].map((_, i) => (
                                        <Star key={i} size={16} fill="currentColor" />
                                    ))}
                                </div>
                                <p className="text-lg font-medium leading-relaxed">"{t.content}"</p>
                                <div className="flex items-center gap-4 mt-4">
                                    <Avatar className="h-10 w-10 border border-white/10">
                                        <AvatarFallback className="bg-primary/20 text-primary font-bold">
                                            {t.name[0]}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h4 className="font-bold text-sm">{t.name}</h4>
                                        <p className="text-xs text-muted-foreground">{t.role} @ {t.company}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Gradient Masks */}
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
            </div>
        </section>
    );
}
