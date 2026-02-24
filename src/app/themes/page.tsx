'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, Download, Save, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

export default function ThemeCustomizerPage() {
    const [primary, setPrimary] = useState('#007AFF');
    const [secondary, setSecondary] = useState('#5856D6');
    const [radius, setRadius] = useState(0.5); // rem
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const previewStyle = {
        '--preview-primary': primary,
        '--preview-secondary': secondary,
        '--preview-radius': `${radius}rem`,
    } as React.CSSProperties;

    const copyConfig = () => {
        const config = `
export const theme = {
  colors: {
    primary: '${primary}',
    secondary: '${secondary}',
  },
  borderRadius: '${radius}rem',
};`;
        navigator.clipboard.writeText(config);
        toast.success("Theme config copied!");
    };

    if (!mounted) return null;

    return (
        <div className="flex flex-col lg:flex-row h-[calc(100vh-3.5rem)] overflow-hidden">
            {/* LEFT PANEL: Editor */}
            <div className="w-full lg:w-[320px] bg-background border-r flex flex-col h-full overflow-y-auto p-6 scrollbar-hide">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold">Theme Editor</h1>
                    <p className="text-muted-foreground text-sm">Customize your design system.</p>
                </div>

                <div className="space-y-8 flex-1">
                    <div className="space-y-4">
                        <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Colors</h3>

                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="primary">Primary Color</Label>
                                <div className="flex gap-2">
                                    <Input
                                        id="primary"
                                        type="color"
                                        value={primary}
                                        onChange={(e) => setPrimary(e.target.value)}
                                        className="w-12 h-10 p-1"
                                    />
                                    <Input
                                        value={primary}
                                        onChange={(e) => setPrimary(e.target.value)}
                                        className="font-mono"
                                    />
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="secondary">Secondary Color</Label>
                                <div className="flex gap-2">
                                    <Input
                                        id="secondary"
                                        type="color"
                                        value={secondary}
                                        onChange={(e) => setSecondary(e.target.value)}
                                        className="w-12 h-10 p-1"
                                    />
                                    <Input
                                        value={secondary}
                                        onChange={(e) => setSecondary(e.target.value)}
                                        className="font-mono"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Shape</h3>

                        <div className="grid gap-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="radius">Border Radius</Label>
                                <span className="text-xs text-muted-foreground">{radius}rem</span>
                            </div>
                            <input
                                id="radius"
                                type="range"
                                min="0"
                                max="2"
                                step="0.1"
                                value={radius}
                                onChange={(e) => setRadius(parseFloat(e.target.value))}
                                className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer"
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t space-y-3">
                    <Button className="w-full" onClick={copyConfig}>
                        <Copy className="mr-2 h-4 w-4" /> Copy Config
                    </Button>
                    <Button variant="outline" className="w-full">
                        <Download className="mr-2 h-4 w-4" /> Export JSON
                    </Button>
                </div>
            </div>

            {/* RIGHT PANEL: Preview */}
            <div className="flex-1 bg-slate-50 dark:bg-slate-900 overflow-y-auto p-8 lg:p-12 relative">
                <div className="max-w-4xl mx-auto space-y-12" style={previewStyle}>

                    <section>
                        <h2 className="text-xl font-bold mb-6">Preview Components</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <Card className="border-2" style={{ borderColor: 'var(--preview-primary)', borderRadius: 'var(--preview-radius)' }}>
                                <CardHeader>
                                    <CardTitle style={{ color: 'var(--preview-primary)' }}>Primary Card</CardTitle>
                                    <CardDescription>Using the primary color for accents.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <button
                                        className="w-full py-2 px-4 text-white font-medium transition-opacity hover:opacity-90"
                                        style={{ backgroundColor: 'var(--preview-primary)', borderRadius: 'var(--preview-radius)' }}
                                    >
                                        Primary Button
                                    </button>
                                    <button
                                        className="w-full py-2 px-4 border font-medium transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
                                        style={{
                                            borderColor: 'var(--preview-secondary)',
                                            color: 'var(--preview-secondary)',
                                            borderRadius: 'var(--preview-radius)'
                                        }}
                                    >
                                        Secondary Outline
                                    </button>
                                </CardContent>
                            </Card>

                            <div className="space-y-6">
                                <div className="p-6 bg-white dark:bg-card rounded-xl shadow-sm border space-y-4" style={{ borderRadius: 'var(--preview-radius)' }}>
                                    <div className="space-y-2">
                                        <Label>Email Address</Label>
                                        <Input placeholder="Enter your email" style={{ borderRadius: 'var(--preview-radius)' }} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Password</Label>
                                        <Input type="password" placeholder="••••••••" style={{ borderRadius: 'var(--preview-radius)' }} />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 rounded border" style={{ borderColor: 'var(--preview-primary)' }}></div>
                                        <span className="text-sm">Remember me</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map(i => (
                            <div
                                key={i}
                                className="aspect-square flex items-center justify-center text-white font-bold text-xl shadow-lg"
                                style={{
                                    backgroundColor: i % 2 === 0 ? 'var(--preview-primary)' : 'var(--preview-secondary)',
                                    borderRadius: 'var(--preview-radius)',
                                    opacity: 1 - (i * 0.1)
                                }}
                            >
                                {i}
                            </div>
                        ))}
                    </section>
                </div>

                <div className="fixed bottom-6 right-6">
                    <Button size="icon" className="rounded-full h-12 w-12 shadow-xl" onClick={() => {
                        setPrimary('#007AFF');
                        setSecondary('#5856D6');
                        setRadius(0.5);
                    }}>
                        <RefreshCw className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
