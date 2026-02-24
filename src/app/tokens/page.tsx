"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Settings, Download, Plus, Palette, Type, Box } from "lucide-react";

export default function TokensPage() {
    return (
        <div className="container px-4 py-20 mx-auto">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-16 gap-6">
                <div>
                    <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">Design System</Badge>
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tighter">Design <span className="gradient-text">Tokens</span></h1>
                    <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                        Maintain consistency across your mobile applications with a unified design token system.
                    </p>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" className="rounded-full h-12 px-6 font-bold hover:bg-muted"><Download className="w-4 h-4 mr-2" /> Export JSON</Button>
                    <Button className="rounded-full h-12 px-8 bg-primary hover:bg-primary/90 font-bold shadow-lg shadow-primary/20"><Plus className="w-4 h-4 mr-2" /> Create Token</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Colors Card */}
                <Card className="lg:col-span-8 bg-surface/10 border-border/50 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
                    <CardHeader className="border-b border-white/5 bg-white/5 p-8">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                <Palette className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <CardTitle className="text-2xl">Color Palette</CardTitle>
                                <CardDescription>Semantic color mapping for all UI elements.</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {[
                                { name: 'Primary', var: 'bg-primary', hex: '#8b5cf6' },
                                { name: 'Secondary', var: 'bg-secondary', hex: '#3b82f6' },
                                { name: 'Accent', var: 'bg-accent', hex: '#a855f7' },
                                { name: 'Muted', var: 'bg-muted', hex: '#27272a' },
                                { name: 'Surface', var: 'bg-surface', hex: '#18181b' },
                                { name: 'Background', var: 'bg-background', hex: '#09090b' },
                            ].map(c => (
                                <div key={c.name} className="space-y-4 group">
                                    <div className={`aspect-square rounded-[2rem] ${c.var} border border-white/10 shadow-2xl transition-transform group-hover:scale-105 group-hover:-rotate-2 duration-300 cursor-pointer`} />
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1">{c.name}</p>
                                        <p className="text-xs font-bold font-mono tracking-wider">{c.hex}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Typography Card */}
                <Card className="lg:col-span-4 bg-surface/10 border-border/50 h-full">
                    <CardHeader className="border-b border-white/5 bg-white/5 p-8">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                                <Type className="w-5 h-5 text-accent" />
                            </div>
                            <div>
                                <CardTitle className="text-2xl">Typography</CardTitle>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-8 space-y-8">
                        {[
                            { n: "Heading 1", s: "32px", w: "800", samp: "Aa" },
                            { n: "Heading 2", s: "24px", w: "700", samp: "Aa" },
                            { n: "Body Large", s: "18px", w: "400", samp: "Aa" },
                            { n: "Body Small", s: "14px", w: "400", samp: "Aa" },
                            { n: "Caption", s: "12px", w: "600", samp: "AA" },
                        ].map(t => (
                            <div key={t.n} className="flex items-center justify-between group cursor-pointer hover:bg-white/5 p-3 -m-3 rounded-2xl transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center font-bold text-lg">{t.samp}</div>
                                    <div>
                                        <p className="font-bold text-sm tracking-tight">{t.n}</p>
                                        <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest">{t.s} • {t.w} weight</p>
                                    </div>
                                </div>
                                <Settings className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Spacing & Radius */}
                <Card className="lg:col-span-12 bg-surface/10 border-border/50">
                    <CardHeader className="border-b border-white/5 bg-white/5 p-8">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                                <Box className="w-5 h-5 text-secondary" />
                            </div>
                            <div>
                                <CardTitle className="text-2xl">Layout & Spacing</CardTitle>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-6">Spacing Scale</p>
                                <div className="flex items-end gap-3 h-20">
                                    {[4, 8, 12, 16, 24, 32, 48].map(s => (
                                        <div key={s} className="flex flex-col items-center gap-2">
                                            <div className="w-4 bg-secondary/40 rounded-t-sm transition-all hover:bg-secondary" style={{ height: `${s * 2}px` }} />
                                            <span className="text-[8px] font-mono opacity-50">{s}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="md:col-span-2">
                                <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-6 text-center md:text-left">Border Radius</p>
                                <div className="flex flex-wrap justify-center md:justify-start gap-8">
                                    {[
                                        { n: 'Small', v: '8px', r: 'rounded-sm' },
                                        { n: 'Medium', v: '12px', r: 'rounded-md' },
                                        { n: 'Large', v: '16px', r: 'rounded-lg' },
                                        { n: 'Full', v: '999px', r: 'rounded-full' },
                                    ].map(r => (
                                        <div key={r.n} className="flex flex-col items-center gap-3">
                                            <div className={`w-16 h-16 bg-muted/50 border border-white/20 ${r.r} hover:border-primary/50 transition-colors duration-500`} />
                                            <div className="text-center">
                                                <p className="text-xs font-bold">{r.n}</p>
                                                <p className="text-[10px] text-muted-foreground font-mono">{r.v}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
