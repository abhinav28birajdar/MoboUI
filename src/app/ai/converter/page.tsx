'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ArrowRightLeft, Copy, Download, Loader2, Check, RefreshCw, Share2, Terminal, ArrowRight } from 'lucide-react';
import Editor from "@monaco-editor/react";
import { toast } from 'react-hot-toast';
import { GlowEffect } from "@/components/shared/GlowEffect";

export default function AIConverterPage() {
    const [sourceCode, setSourceCode] = useState('');
    const [isConverting, setIsConverting] = useState(false);
    const [convertedCode, setConvertedCode] = useState<string | null>(null);
    const [fromFramework, setFromFramework] = useState<'react-native' | 'flutter'>('react-native');
    const [copied, setCopied] = useState(false);

    const handleConvert = async () => {
        if (!sourceCode) return;
        setIsConverting(true);

        try {
            const toFramework = fromFramework === 'react-native' ? 'flutter' : 'react-native';
            // Mocking conversion
            await new Promise(resolve => setTimeout(resolve, 2000));

            const mockOutput = toFramework === 'flutter'
                ? `// Converted to Flutter\nimport 'package:flutter/material.dart';\n\nclass ConvertedComponent extends StatelessWidget {\n  @override\n  Widget build(BuildContext context) {\n    return Center(\n      child: Container(\n        padding: EdgeInsets.all(32),\n        decoration: BoxDecoration(\n          color: Color(0xFFD97706),\n          borderRadius: BorderRadius.circular(24),\n        ),\n        child: Text('Converted from React Native', style: TextStyle(color: Colors.white)),\n      ),\n    );\n  }\n}`
                : `// Converted to React Native\nimport React from 'react';\nimport { View, Text, StyleSheet } from 'react-native';\n\nexport const Converted = () => (\n  <View style={styles.container}>\n    <Text style={styles.text}>Converted from Flutter</Text>\n  </View>\n);\n\nconst styles = StyleSheet.create({\n  container: { backgroundColor: '#FFCA03', padding: 32, borderRadius: 24 },\n  text: { color: '#111827', fontWeight: 'bold' }\n});`;

            setConvertedCode(mockOutput);
            toast.success(`Translated to ${toFramework === 'flutter' ? 'Flutter' : 'React Native'}!`);
        } catch (error) {
            toast.error("Conversion failed.");
        } finally {
            setIsConverting(false);
        }
    };

    const toggleFrameworks = () => {
        setFromFramework(prev => prev === 'react-native' ? 'flutter' : 'react-native');
        setSourceCode('');
        setConvertedCode(null);
    };

    const handleCopy = () => {
        if (convertedCode) {
            navigator.clipboard.writeText(convertedCode);
            setCopied(true);
            toast.success("Copied!");
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleDownload = () => {
        if (!convertedCode) return;
        const toFramework = fromFramework === 'react-native' ? 'flutter' : 'react-native';
        const element = document.createElement("a");
        const file = new Blob([convertedCode], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = `converted_${toFramework}.${toFramework === 'flutter' ? 'dart' : 'tsx'}`;
        document.body.appendChild(element);
        element.click();
        toast.success("Download started");
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: 'motion.dev AI Converter',
                text: 'Easily translate mobile code between frameworks!',
                url: window.location.href,
            }).catch(console.error);
        } else {
            navigator.clipboard.writeText(window.location.href);
            toast.success("Link copied!");
        }
    };

    return (
        <div className="min-h-screen bg-background pt-32 pb-24 relative overflow-hidden">
            <GlowEffect className="top-0 left-0 opacity-10" color="amber" size="xl" />
            <div className="absolute inset-0 bg-grid-pattern opacity-5" />

            <div className="container mx-auto px-8 max-w-7xl relative z-10">
                <div className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-surface border border-border text-text-muted text-[10px] font-medium tracking-[0.2em] mb-10 uppercase"
                    >
                        <RefreshCw size={14} className="text-text-muted transition-colors group-hover:text-primary" />
                        CROSS-STACK BRIDGE 2.1
                    </motion.div>
                    <h1 className="text-7xl md:text-9xl font-display font-medium tracking-tighter mb-10 leading-none">
                        AI CODE <br /><span className="text-primary italic">CONVERTER.</span>
                    </h1>
                    <p className="text-xl text-text-secondary max-w-3xl mx-auto font-medium leading-relaxed">
                        Seamlessly translate mobile components between <span className="text-text-primary">React Native</span> and <span className="text-text-primary">Flutter</span>.
                    </p>
                </div>

                <div className="flex flex-col gap-12">
                    {/* Control Bar */}
                    <div className="flex flex-col md:flex-row items-center justify-between bg-surface/50 backdrop-blur-xl border border-border p-8 rounded-[3rem] shadow-sm gap-10 transition-all hover:border-border-hover">
                        <div className="flex items-center gap-12">
                            <div className="flex flex-col items-center">
                                <span className="text-[10px] font-medium tracking-[0.3em] mb-4 text-text-muted uppercase">SOURCE</span>
                                <div className="px-8 py-4 rounded-[2rem] bg-background border border-border text-text-primary font-medium text-xs tracking-tight shadow-sm">
                                    {fromFramework === 'react-native' ? 'React Native' : 'Flutter'}
                                </div>
                            </div>

                            <Button
                                variant="outline"
                                size="icon"
                                onClick={toggleFrameworks}
                                className="rounded-2xl h-16 w-16 hover:bg-surface-elevated transition-all border-border group"
                            >
                                <ArrowRightLeft className="text-text-muted group-hover:text-primary transition-all group-active:rotate-180 duration-500" size={24} />
                            </Button>

                            <div className="flex flex-col items-center">
                                <span className="text-[10px] font-medium tracking-[0.3em] mb-4 text-text-muted uppercase">TARGET</span>
                                <div className="px-8 py-4 rounded-[2rem] bg-background border border-border text-text-muted font-medium text-xs tracking-tight">
                                    {fromFramework === 'react-native' ? 'Flutter' : 'React Native'}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-5">
                            <Button
                                variant="outline"
                                onClick={handleShare}
                                className="h-16 w-16 rounded-[2rem] border-border text-text-muted hover:text-primary transition-all bg-background font-medium"
                            >
                                <Share2 size={24} />
                            </Button>
                            <Button
                                onClick={handleConvert}
                                disabled={!sourceCode || isConverting}
                                className="bg-primary text-primary-foreground font-medium px-14 h-16 rounded-[2rem] hover:scale-[1.02] shadow-glow-amber transition-all disabled:opacity-50 text-lg tracking-tight"
                            >
                                {isConverting ? <Loader2 className="animate-spin w-6 h-6" /> : <div className="flex items-center gap-3">Sync Architecture <ArrowRight size={20} /></div>}
                            </Button>
                        </div>
                    </div>

                    {/* Editor Grid */}
                    <div className="grid lg:grid-cols-2 gap-12 h-[600px]">
                        <div className="flex flex-col space-y-6">
                            <div className="flex items-center justify-between px-6">
                                <Label className="text-[10px] font-medium text-text-muted tracking-[0.3em] uppercase">Input Console</Label>
                                <Button variant="ghost" size="sm" className="text-[10px] h-10 text-text-muted font-medium hover:text-destructive transition-colors uppercase tracking-widest" onClick={() => setSourceCode('')}>Wipe Clean</Button>
                            </div>
                            <div className="flex-1 rounded-[3rem] overflow-hidden border border-border bg-surface shadow-xl">
                                <Editor
                                    height="100%"
                                    language={fromFramework === 'react-native' ? 'typescript' : 'dart'}
                                    theme="vs-dark"
                                    value={sourceCode}
                                    onChange={(val) => setSourceCode(val || '')}
                                    options={{
                                        fontSize: 14,
                                        fontFamily: "'JetBrains Mono', monospace",
                                        minimap: { enabled: false },
                                        padding: { top: 32, bottom: 32 },
                                        scrollBeyondLastLine: false,
                                        placeholder: "Paste code here...",
                                        lineNumbers: "on",
                                    }}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col space-y-6">
                            <div className="flex items-center justify-between px-6">
                                <Label className="text-[10px] font-medium text-text-muted tracking-[0.3em] uppercase">Output Stream</Label>
                                {convertedCode && (
                                    <div className="flex gap-3">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={handleCopy}
                                            className="text-[10px] h-10 font-medium text-primary hover:bg-primary/10 rounded-xl px-4 uppercase tracking-widest"
                                        >
                                            {copied ? <Check size={16} className="mr-2" /> : <Copy size={16} className="mr-2" />}
                                            {copied ? 'Copied' : 'Copy Result'}
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={handleDownload}
                                            className="text-[10px] h-10 font-medium text-text-muted hover:text-primary rounded-xl px-4 transition-all"
                                        >
                                            <Download size={16} />
                                        </Button>
                                    </div>
                                )}
                            </div>
                            <div className="flex-1 bg-surface border border-border rounded-[3rem] overflow-hidden relative group shadow-xl">
                                {convertedCode ? (
                                    <Editor
                                        height="100%"
                                        language={fromFramework === 'react-native' ? 'dart' : 'typescript'}
                                        theme="vs-dark"
                                        value={convertedCode}
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
                                ) : (
                                    <div className="h-full flex flex-col items-center justify-center p-12 text-center relative z-10 bg-surface">
                                        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
                                        <div className="w-24 h-24 rounded-[2.5rem] bg-background border border-border flex items-center justify-center mb-10 shadow-sm">
                                            <Terminal className="text-text-muted/30" size={36} />
                                        </div>
                                        <p className="text-[10px] font-medium text-text-muted uppercase tracking-[0.2em] max-w-xs">Awaiting Source Material...</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

