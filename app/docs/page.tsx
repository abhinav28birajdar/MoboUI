import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Code2, Smartphone, Palette, Zap, ArrowRight, Book } from "lucide-react";
import Link from 'next/link';

const guideCategories = [
    {
        title: "Getting Started",
        icon: Zap,
        description: "Learn how to integrate MobileUIKit components into your existing project seamlessly.",
        color: "text-yellow-400",
        bg: "bg-yellow-400/10"
    },
    {
        title: "React Native",
        icon: Smartphone,
        description: "Specific guides for Expo and Vanilla React Native implementations and best practices.",
        color: "text-blue-400",
        bg: "bg-blue-400/10"
    },
    {
        title: "Flutter",
        icon: Code2,
        description: "Comprehensive guides for building high-performance widgets in your Flutter apps.",
        color: "text-cyan-400",
        bg: "bg-cyan-400/10"
    },
    {
        title: "Theming",
        icon: Palette,
        description: "Deep dive into our custom theme system and design token architecture.",
        color: "text-pink-400",
        bg: "bg-pink-400/10"
    }
];

export default function DocsPage() {
    return (
        <div className="container px-4 py-20 mx-auto">
            <div className="max-w-3xl mb-16 px-4">
                <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Documentation Hub</Badge>
                <h1 className="text-4xl md:text-7xl font-extrabold mb-8 tracking-tighter leading-tight">Mastering Mobile <span className="gradient-text">UI Kits</span></h1>
                <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                    The definitive guide to building world-class mobile interfaces. From core concepts to advanced interaction design.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24 px-4">
                {guideCategories.map((cat) => (
                    <Link key={cat.title} href={`/docs/${cat.title.toLowerCase().replace(' ', '-')}`}>
                        <Card className="p-10 h-full group hover:border-primary/50 transition-all duration-500 bg-surface/10 backdrop-blur-sm relative overflow-hidden border-border/50">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -z-10 group-hover:bg-primary/10 transition-colors" />

                            <div className={`w-16 h-16 rounded-2xl ${cat.bg} flex items-center justify-center mb-8 border border-white/5 group-hover:scale-110 transition-transform`}>
                                <cat.icon className={`w-8 h-8 ${cat.color} group-hover:rotate-12 transition-transform`} />
                            </div>
                            <CardHeader className="p-0">
                                <div className="flex items-center justify-between mb-3">
                                    <CardTitle className="text-2xl font-bold tracking-tight">{cat.title}</CardTitle>
                                    <ArrowRight className="w-5 h-5 text-muted-foreground opacity-20 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
                                </div>
                                <CardDescription className="text-base text-muted-foreground/80 leading-relaxed italic">{cat.description}</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                ))}
            </div>

            <div className="max-w-4xl mx-auto px-6 py-12 bg-surface/20 rounded-[3rem] border border-border relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent" />
                <h2 className="text-3xl font-bold mb-10 border-b border-border pb-6 flex items-center gap-3">
                    <Book className="w-8 h-8 text-primary" /> Quick Start Guide
                </h2>
                <div className="space-y-12">
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-black text-xl shadow-lg shadow-primary/20">1</div>
                        <div>
                            <h3 className="text-xl font-bold mb-3 text-foreground tracking-tight underline decoration-primary/30 decoration-4 underline-offset-8">Browse the Library</h3>
                            <p className="text-muted-foreground leading-relaxed text-lg italic">Explore our vast library of battle-tested components designed for real mobile applications. Every component is optimized for performance and accessibility.</p>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center font-black text-xl shadow-lg shadow-accent/20">2</div>
                        <div>
                            <h3 className="text-xl font-bold mb-3 text-foreground tracking-tight underline decoration-accent/30 decoration-4 underline-offset-8">Copy Code Snippets</h3>
                            <p className="text-muted-foreground leading-relaxed text-lg italic">Simply click the copy button on any component code block. We provide comprehensive, fully-typed TypeScript and Dart code that you can paste directly into your editor.</p>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-secondary text-white flex items-center justify-center font-black text-xl shadow-lg shadow-secondary/20">3</div>
                        <div>
                            <h3 className="text-xl font-bold mb-3 text-foreground tracking-tight underline decoration-secondary/30 decoration-4 underline-offset-8">No Hidden Dependencies</h3>
                            <p className="text-muted-foreground leading-relaxed text-lg italic">Most of our core components require zero external libraries. This ensures your app stays lean, avoiding the &quot;dependency hell&quot; common in modern mobile development.</p>
                        </div>
                    </div>
                </div>

                <div className="mt-16 text-center">
                    <Button size="lg" className="rounded-full px-12 h-14 bg-primary hover:bg-primary/90 font-bold" asChild>
                        <Link href="/components">Start Building Now</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
