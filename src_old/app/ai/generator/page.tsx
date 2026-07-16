'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sparkles, Download, Wand2, Loader2, Share2, Terminal } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Editor from "@monaco-editor/react";
import { toast } from 'react-hot-toast';
import { GlowEffect } from "@/components/shared/GlowEffect";

export default function AIGeneratorPage() {
    const [prompt, setPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedCode, setGeneratedCode] = useState<{ flutter: string; reactNative: string } | null>(null);

    const handleGenerate = async () => {
        if (!prompt) return;
        setIsGenerating(true);

        try {
            // Mocking the API response
            await new Promise(resolve => setTimeout(resolve, 2000));

            setGeneratedCode({
                flutter: `// Generated Flutter Component\nimport 'package:flutter/material.dart';\n\nclass CustomGenerated extends StatelessWidget {\n  @override\n  Widget build(BuildContext context) {\n    return Center(\n      child: Container(\n        padding: EdgeInsets.all(24),\n        decoration: BoxDecoration(\n          color: Color(0xFFD97706),\n          borderRadius: BorderRadius.circular(20),\n        ),\n        child: Text("${prompt}", style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),\n      ),\n    );\n  }\n}`,
                reactNative: `// Generated React Native Component\nimport React from 'react';\nimport { View, Text, StyleSheet } from 'react-native';\n\nexport const CustomGenerated = () => (\n  <View style={styles.container}>\n    <View style={styles.button}>\n      <Text style={styles.text}>${prompt}</Text>\n    </View>\n  </View>\n);\n\nconst styles = StyleSheet.create({\n  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },\n  button: { backgroundColor: '#C026D3', padding: 20, borderRadius: 20 },\n  text: { color: '#111827', fontWeight: 'bold' }\n});`,
            });
            toast.success("Component generated!");
        } catch (error) {
            toast.error("Generation failed.");
        } finally {
            setIsGenerating(false);
        }
    };

    const handleDownload = (code: string, framework: string) => {
        const element = document.createElement("a");
        const file = new Blob([code], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = `generated_${framework}.${framework === 'flutter' ? 'dart' : 'tsx'}`;
        document.body.appendChild(element);
        element.click();
        toast.success("Download started");
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: 'motion.dev AI Generator',
                text: `Check out this component I generated: ${prompt}`,
                url: window.location.href,
            }).catch(console.error);
        } else {
            navigator.clipboard.writeText(window.location.href);
            toast.success("Link copied!");
        }
    };

    return (
        <div className="min-h-screen bg-background pt-32 pb-24 relative overflow-hidden">
            <GlowEffect className="top-0 right-0 opacity-10" color="amber" size="xl" />
            <div className="absolute inset-0 bg-grid-pattern opacity-5" />

            <div className="container mx-auto px-8 max-w-7xl relative z-10">
                <div className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-surface border border-border text-text-muted text-[10px] font-medium tracking-[0.2em] mb-10 uppercase"
                    >
                        <Sparkles size={14} className="text-text-muted transition-colors group-hover:text-primary" />
                        AI ENGINE 3.0 (BETA)
                    </motion.div>
                    <h1 className="text-7xl md:text-9xl font-display font-medium tracking-tighter mb-10 leading-none">
                        AI COMPONENT <br /><span className="text-primary italic">GENERATOR.</span>
                    </h1>
                    <p className="text-xl text-text-secondary max-w-3xl mx-auto font-medium leading-relaxed">
                        Describe your mobile UI vision and watch our AI engineer build production-ready components for Flutter and React Native.
                    </p>
                </div>

                <div className="grid gap-16">
                    {/* Input Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative group"
                    >
                        <div className="relative bg-surface/50 backdrop-blur-xl border border-border p-10 rounded-[3.5rem] shadow-sm transition-all hover:border-border-hover">
                            <div className="flex flex-col md:flex-row gap-8 items-end">
                                <div className="flex-1 space-y-4 w-full">
                                    <Label className="text-[10px] font-medium uppercase tracking-widest text-text-muted ml-3">Vision Prompt</Label>
                                    <div className="relative">
                                        <Wand2 className="absolute left-8 top-1/2 -translate-y-1/2 text-text-muted w-6 h-6" />
                                        <Input
                                            placeholder="A modern glassmorphic bank card with real-time balance animation..."
                                            value={prompt}
                                            onChange={(e) => setPrompt(e.target.value)}
                                            className="h-24 pl-20 text-xl border-border bg-background rounded-[2rem] focus-visible:ring-primary/20 focus-visible:border-primary placeholder:text-text-muted/50 font-medium shadow-inner"
                                        />
                                    </div>
                                </div>
                                <Button
                                    size="lg"
                                    onClick={handleGenerate}
                                    disabled={!prompt || isGenerating}
                                    className="h-24 px-14 rounded-[2rem] bg-primary text-primary-foreground font-medium text-xl hover:scale-[1.02] shadow-glow-fuchsia transition-all tracking-tight disabled:opacity-50"
                                >
                                    {isGenerating ? (
                                        <Loader2 className="animate-spin w-8 h-8" />
                                    ) : (
                                        <div className="flex items-center gap-3">
                                            Forge Component <Sparkles size={24} />
                                        </div>
                                    )}
                                </Button>
                            </div>

                            <div className="mt-12 flex flex-wrap gap-4 items-center">
                                <span className="text-[10px] font-medium text-text-muted uppercase tracking-[0.2em] mr-4">Common Cookbooks:</span>
                                {['Neon Login Area', 'Glass Credit Card', 'Auth Suite', 'Finance Tracker'].map((suggestion) => (
                                    <button
                                        key={suggestion}
                                        onClick={() => setPrompt(suggestion)}
                                        className="px-6 py-3 rounded-2xl bg-background border border-border text-[10px] font-medium text-text-muted hover:border-primary/50 hover:text-primary transition-all tracking-tight"
                                    >
                                        {suggestion}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Results Section */}
                    <AnimatePresence>
                        {generatedCode && (
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="grid lg:grid-cols-5 gap-12"
                            >
                                <div className="lg:col-span-3">
                                    <Tabs defaultValue="react-native" className="w-full">
                                        <div className="flex items-center justify-between mb-8">
                                            <TabsList className="bg-surface border border-border p-1.5 rounded-2xl shadow-sm">
                                                <TabsTrigger value="react-native" className="rounded-xl data-[state=active]:bg-background data-[state=active]:text-primary font-medium h-12 px-10 text-xs tracking-tight transition-all">
                                                    React Native
                                                </TabsTrigger>
                                                <TabsTrigger value="flutter" className="rounded-xl data-[state=active]:bg-background data-[state=active]:text-primary font-medium h-12 px-10 text-xs tracking-tight transition-all">
                                                    Flutter
                                                </TabsTrigger>
                                            </TabsList>
                                            <div className="flex gap-3">
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={handleShare}
                                                    className="h-12 w-12 rounded-2xl bg-surface border border-border text-text-muted hover:text-primary shadow-sm hover:border-primary/30 transition-all font-medium"
                                                >
                                                    <Share2 size={18} />
                                                </Button>
                                                <Button
                                                    variant="secondary"
                                                    size="icon"
                                                    onClick={() => handleDownload(generatedCode.reactNative, 'react-native')}
                                                    className="h-12 w-12 rounded-2xl bg-surface border border-border text-text-muted hover:text-primary shadow-sm hover:border-primary/30 transition-all font-medium"
                                                >
                                                    <Download size={18} />
                                                </Button>
                                            </div>
                                        </div>

                                        <TabsContent value="react-native" className="mt-0">
                                            <div className="rounded-[3rem] overflow-hidden border border-border bg-surface shadow-xl relative group h-[500px]">
                                                <Editor
                                                    height="100%"
                                                    language="typescript"
                                                    theme="vs-dark"
                                                    value={generatedCode.reactNative}
                                                    options={{
                                                        fontSize: 14,
                                                        fontFamily: "'JetBrains Mono', monospace",
                                                        minimap: { enabled: false },
                                                        padding: { top: 24, bottom: 24 },
                                                        scrollBeyondLastLine: false,
                                                        readOnly: true,
                                                    }}
                                                />
                                            </div>
                                        </TabsContent>

                                        <TabsContent value="flutter" className="mt-0">
                                            <div className="rounded-[3rem] overflow-hidden border border-border bg-surface shadow-xl relative group h-[500px]">
                                                <Editor
                                                    height="100%"
                                                    language="dart"
                                                    theme="vs-dark"
                                                    value={generatedCode.flutter}
                                                    options={{
                                                        fontSize: 14,
                                                        fontFamily: "'JetBrains Mono', monospace",
                                                        minimap: { enabled: false },
                                                        padding: { top: 24, bottom: 24 },
                                                        scrollBeyondLastLine: false,
                                                        readOnly: true,
                                                    }}
                                                />
                                            </div>
                                        </TabsContent>
                                    </Tabs>
                                </div>

                                {/* Preview / Status Section */}
                                <div className="lg:col-span-2 space-y-8 flex flex-col h-full">
                                    <div className="flex-grow bg-surface/40 backdrop-blur-xl border border-border rounded-[3.5rem] p-12 flex flex-col items-center justify-center text-center relative overflow-hidden">
                                        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
                                        <div className="w-28 h-28 rounded-[2.5rem] bg-surface border border-border flex items-center justify-center mb-10 shadow-sm">
                                            <Terminal className="text-primary" size={40} />
                                        </div>
                                        <h3 className="text-4xl font-display font-medium text-text-primary tracking-tighter mb-6 leading-none">Live Render <br /><span className="text-primary italic">Coming Soon.</span></h3>
                                        <p className="text-text-secondary font-medium max-w-xs mx-auto mb-12 text-sm leading-relaxed">
                                            Our engineering team is finalizing the real-time simulation engine for dynamic AI previews.
                                        </p>
                                        <div className="h-1.5 w-24 bg-border rounded-full relative overflow-hidden">
                                            <div className="absolute inset-0 bg-primary animate-pulse" style={{ width: '40%' }} />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

