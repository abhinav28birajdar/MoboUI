import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Palette, Copy, Check } from "lucide-react";

const themes = [
    {
        name: "Dark Elegant",
        colors: ["#8b5cf6", "#3b82f6", "#0a0a0a", "#ffffff"],
        description: "Premium dark mode with vibrant purple accents. Perfect for modern professional apps."
    },
    {
        name: "Glassmorphism",
        colors: ["#ffffff", "#cccccc", "#111111", "#ffffff"],
        description: "Modern frosted glass effects for high-end interfaces and luxury brand apps."
    },
    {
        name: "Neon Cyber",
        colors: ["#39ff14", "#ff00ff", "#000000", "#ffffff"],
        description: "Cyberpunk inspired neon aesthetic. High contrast and futuristic vibes."
    },
    {
        name: "Minimal Clean",
        colors: ["#000000", "#666666", "#ffffff", "#000000"],
        description: "Pure and focused design with perfect accessibility and timeless aesthetic."
    },
    {
        name: "Gradient Pop",
        colors: ["#f472b6", "#60a5fa", "#ffffff", "#1e1e1e"],
        description: "Fun and energetic theme with soft gradients and playful typography."
    },
    {
        name: "Nature Green",
        colors: ["#10b981", "#059669", "#f0fdf4", "#064e3b"],
        description: "Eco-friendly, soothing palette inspired by natural environments."
    }
];

export default function ThemesPage() {
    return (
        <div className="container px-4 py-20 mx-auto">
            <div className="max-w-3xl mb-16">
                <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors">Visual Design</Badge>
                <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">Theme <span className="gradient-text">Gallery</span></h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                    Beautiful theme presets tailored for mobile devices. Customize, preview, and export configurations for React Native and Flutter in one click.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {themes.map((theme) => (
                    <Card key={theme.name} className="overflow-hidden group hover:border-primary/50 transition-all duration-500 bg-surface/10 backdrop-blur-sm">
                        <div className="h-48 p-8 flex flex-col justify-end gap-4 relative overflow-hidden bg-gradient-to-br from-surface to-background">
                            <div className="absolute top-0 left-0 w-full h-full bg-grid-white/[0.02] -z-10" />
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />

                            <div className="flex -space-x-3 relative z-10 transition-transform duration-500 group-hover:translate-x-2">
                                {theme.colors.map((color, i) => (
                                    <div
                                        key={i}
                                        className="w-12 h-12 rounded-full border-4 border-background shadow-2xl relative"
                                        style={{ backgroundColor: color, zIndex: 10 - i }}
                                    />
                                ))}
                            </div>
                        </div>
                        <CardHeader className="pt-8">
                            <CardTitle className="text-2xl">{theme.name}</CardTitle>
                            <CardDescription className="text-base leading-relaxed opacity-80">{theme.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex items-center gap-4 pb-8">
                            <Button className="flex-1 rounded-full h-12 font-bold bg-primary hover:bg-primary/90 transition-all active:scale-95 shadow-lg shadow-primary/10">
                                <Palette className="w-4 h-4 mr-2" /> Apply
                            </Button>
                            <Button variant="outline" size="icon" className="rounded-full h-12 w-12 hover:bg-muted transition-all">
                                <Copy className="w-4 h-4" />
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
