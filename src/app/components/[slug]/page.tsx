'use client';

import React, { useState } from "react";
import { ChevronLeft, Star, Copy, Share2, Heart, ExternalLink, Smartphone, Layers, Check } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import { GlowEffect } from "@/components/shared/GlowEffect";
import Editor from "@monaco-editor/react";
import { toast } from "react-hot-toast";

const FRAMEWORKS = ["Flutter", "React Native", "Expo"];

export default function ComponentDetailPage({ params }: { params: { slug: string } }) {
    const slugName = params.slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    const [activeFramework, setActiveFramework] = useState("Flutter");
    const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
    const [isCopied, setIsCopied] = useState(false);

    const codeSnippet = activeFramework === "Flutter"
        ? `// Flutter Code for Primary Button
import 'package:flutter/material.dart';

class MOButton extends StatelessWidget {
  final String label;
  const MOButton({required this.label, Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: () {},
      style: ElevatedButton.styleFrom(
        backgroundColor: Color(0xFFD97706),
        padding: EdgeInsets.symmetric(horizontal: 32, vertical: 16),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      ),
      child: Text(label, style: TextStyle(fontWeight: FontWeight.bold)),
    );
  }
}`
        : `// React Native Code for Primary Button
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export const MOButton = ({ label }) => {
  return (
    <TouchableOpacity style={styles.button}>
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#D97706',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 16,
  },
  text: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});`;

    const handleCopy = () => {
        navigator.clipboard.writeText(codeSnippet);
        setIsCopied(true);
        toast.success("Copied to clipboard!");
        setTimeout(() => setIsCopied(false), 2000);
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: 'motion.dev - Primary Button',
                text: 'Production-ready mobile UI component.',
                url: window.location.href,
            }).catch(console.error);
        } else {
            navigator.clipboard.writeText(window.location.href);
            toast.success("Link copied!");
        }
    };

    return (
        <div className="relative pt-32 pb-24 min-h-screen bg-background overflow-hidden">
            <GlowEffect className="top-0 right-0 opacity-10" color="amber" size="xl" />
            <div className="absolute inset-0 bg-grid-pattern opacity-5" />

            <div className="container mx-auto px-8 relative z-10">
                {/* Breadcrumb & Navigation */}
                <div className="flex items-center justify-between mb-16">
                    <Link href="/components" className="flex items-center text-text-muted hover:text-text-primary transition-all group px-4 py-2 bg-surface/50 rounded-xl border border-border">
                        <ChevronLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Back to Library</span>
                    </Link>
                    <div className="flex gap-4">
                        <Button
                            variant="secondary"
                            size="icon"
                            className="rounded-2xl h-12 w-12 bg-surface border border-border text-text-muted hover:text-red-500 shadow-sm"
                        >
                            <Heart size={20} />
                        </Button>
                        <Button
                            variant="secondary"
                            size="icon"
                            onClick={handleShare}
                            className="rounded-2xl h-12 w-12 bg-surface border border-border text-text-muted hover:text-primary shadow-sm"
                        >
                            <Share2 size={20} />
                        </Button>
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-24 items-start">
                    {/* Left Column: Visuals */}
                    <div className="space-y-12">
                        <div className="relative aspect-square bg-surface/30 border border-border rounded-[4rem] p-12 overflow-hidden group shadow-sm">
                            <div className="absolute inset-0 bg-grid-pattern opacity-5" />

                            {/* Controls for mockup */}
                            <div className="absolute top-12 left-12 right-12 flex justify-between items-center z-20">
                                <div className="flex bg-background/50 backdrop-blur-md p-1.5 rounded-2xl border border-border shadow-sm">
                                    <button className="p-3 rounded-xl bg-primary text-primary-foreground shadow-glow-amber transition-all">
                                        <Smartphone size={18} />
                                    </button>
                                    <button className="p-3 rounded-xl text-text-muted hover:text-text-primary transition-all">
                                        <Smartphone size={18} className="rotate-90" />
                                    </button>
                                </div>
                            </div>

                            {/* Mockup area */}
                            <div className="w-full h-full flex items-center justify-center">
                                <div className="relative w-[320px] h-[640px] rounded-[4.5rem] border-[14px] border-text-primary/5 bg-text-primary p-4 shadow-2xl">
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-8 bg-text-primary/10 rounded-b-3xl z-20" />
                                    <div className="w-full h-full rounded-[3.5rem] bg-background flex flex-col items-center justify-center p-10 gap-10 overflow-hidden relative">
                                        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
                                        <div className="flex-grow flex items-center justify-center">
                                            <div className="px-10 py-5 bg-primary text-primary-foreground font-bold rounded-2xl shadow-glow-amber text-lg">
                                                {slugName}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Framework Tabs for visuals */}
                        <div className="flex justify-center gap-4">
                            {FRAMEWORKS.map(fw => (
                                <button
                                    key={fw}
                                    onClick={() => setActiveFramework(fw)}
                                    className={cn(
                                        "px-10 py-4 rounded-[1.5rem] text-[10px] font-bold uppercase tracking-widest transition-all border",
                                        activeFramework === fw ? "bg-primary text-primary-foreground border-primary shadow-glow-amber" : "bg-surface text-text-muted border-border hover:border-primary/50 shadow-sm"
                                    )}
                                >
                                    {fw}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Info & Code */}
                    <div className="space-y-16">
                        <div>
                            <div className="flex items-center gap-5 mb-10">
                                <span className="px-5 py-2 bg-primary/10 text-primary text-[10px] font-bold tracking-widest uppercase rounded-full border border-primary/20">
                                    UI Components
                                </span>
                                <div className="flex items-center gap-2 text-text-muted font-bold text-xs uppercase tracking-tight">
                                    <Star size={16} fill="var(--primary)" className="text-primary" />
                                    <span>4.9 High Rating</span>
                                </div>
                            </div>

                            <h1 className="text-7xl md:text-8xl font-display font-medium text-text-primary mb-10 tracking-tighter leading-none">
                                {slugName.split(' ').slice(0, -1).join(' ')} <br /><span className="text-primary italic">{slugName.split(' ').slice(-1)}.</span>
                            </h1>

                            <p className="text-text-secondary text-xl leading-relaxed mb-16 font-medium max-w-xl">
                                A highly customizable interactive component with support for haptic feedback, loading states, and premium animations.
                            </p>

                            <div className="flex flex-wrap gap-5">
                                <Button
                                    onClick={handleCopy}
                                    className="rounded-3xl h-20 px-12 flex-1 bg-primary text-primary-foreground font-bold text-lg shadow-glow-amber hover:scale-[1.02] transition-all tracking-tight"
                                >
                                    {isCopied ? <Check size={24} className="mr-3" /> : <Copy size={24} className="mr-3" />}
                                    {isCopied ? "Copied" : "Copy Source"}
                                </Button>
                                <Link href="/playground" className="flex-1">
                                    <Button variant="outline" className="rounded-3xl h-20 px-12 w-full border-border bg-surface text-text-primary hover:bg-surface-elevated font-bold text-lg tracking-tight transition-all">
                                        <ExternalLink size={24} className="mr-3" />
                                        Playground
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        {/* Accordion/Tabs for Details */}
                        <div className="space-y-10">
                            <div className="border-b border-border flex gap-12">
                                <button
                                    onClick={() => setActiveTab("preview")}
                                    className={cn("pb-8 font-bold uppercase tracking-widest text-[11px] transition-all relative", activeTab === "preview" ? "text-text-primary" : "text-text-muted")}
                                >
                                    Documentation
                                    {activeTab === "preview" && <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full" />}
                                </button>
                                <button
                                    onClick={() => setActiveTab("code")}
                                    className={cn("pb-8 font-bold uppercase tracking-widest text-[11px] transition-all relative", activeTab === "code" ? "text-text-primary" : "text-text-muted")}
                                >
                                    View Source
                                    {activeTab === "code" && <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full" />}
                                </button>
                            </div>

                            {activeTab === "preview" ? (
                                <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <div className="grid grid-cols-2 gap-10">
                                        <div className="p-10 rounded-[2.5rem] bg-surface/50 border border-border shadow-sm">
                                            <span className="text-[10px] text-text-muted uppercase tracking-widest font-bold block mb-3">Version</span>
                                            <span className="text-text-primary font-bold text-2xl tracking-tighter">1.2.0 Stable</span>
                                        </div>
                                        <div className="p-10 rounded-[2.5rem] bg-surface/50 border border-border shadow-sm">
                                            <span className="text-[10px] text-text-muted uppercase tracking-widest font-bold block mb-3">Licensing</span>
                                            <span className="text-text-primary font-bold text-2xl tracking-tighter">MIT Enterprise</span>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <h3 className="text-sm font-bold text-text-primary uppercase tracking-widest flex items-center gap-3">
                                            <Layers size={18} className="text-primary" />
                                            Runtime Dependencies
                                        </h3>
                                        <div className="p-10 rounded-[2.5rem] bg-surface border border-border font-mono text-sm text-primary shadow-inner">
                                            {activeFramework === "Flutter" ? "flutter_hooks: ^0.20.0" : "lucide-react-native: latest"}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="rounded-[3rem] overflow-hidden border border-border bg-surface bg-surface shadow-xl h-[500px] animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <div className="p-6 bg-surface-elevated/50 flex justify-between items-center border-b border-border px-10">
                                        <span className="text-[10px] font-bold text-text-muted tracking-widest uppercase italic brand-text">{activeFramework.toLowerCase()}.{activeFramework === "Flutter" ? "dart" : "tsx"}</span>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={handleCopy}
                                            className="h-10 px-6 text-primary uppercase text-[10px] font-bold tracking-widest hover:bg-primary/10 rounded-xl transition-all"
                                        >
                                            {isCopied ? <Check size={16} className="mr-2" /> : <Copy size={16} className="mr-2" />}
                                            {isCopied ? "Copied" : "Copy"}
                                        </Button>
                                    </div>
                                    <div className="h-full">
                                        <Editor
                                            height="100%"
                                            language={activeFramework === "Flutter" ? "dart" : "typescript"}
                                            theme="vs-dark"
                                            value={codeSnippet}
                                            options={{
                                                fontSize: 14,
                                                fontFamily: "'JetBrains Mono', monospace",
                                                minimap: { enabled: false },
                                                padding: { top: 32, bottom: 32 },
                                                scrollBeyondLastLine: false,
                                                readOnly: true,
                                                lineNumbers: "on",
                                            }}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

