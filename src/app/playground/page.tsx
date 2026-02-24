"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    Play,
    Code2,
    Copy,
    RotateCcw,
    Share2,
    Download,
    Maximize2,
    Minimize2,
    Moon,
    Sun,
    Check,
    Smartphone,
    Terminal
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import { GlowEffect } from "@/components/shared/GlowEffect";
import { toast } from "react-hot-toast";
import Editor from "@monaco-editor/react";

const FRAMEWORKS = ["Flutter", "React Native", "Expo"];
const DEVICES = ["iPhone 15 Pro", "Pixel 8 Pro", "iPhone SE"];

export default function PlaygroundPage() {
    const [activeFramework, setActiveFramework] = useState("Flutter");
    const [activeDevice, setActiveDevice] = useState("iPhone 15 Pro");
    const [deviceTheme, setDeviceTheme] = useState<"dark" | "light">("dark");
    const [showCode, setShowCode] = useState(true);
    const [isCopied, setIsCopied] = useState(false);

    const [code, setCode] = useState(activeFramework === "Flutter"
        ? `// Flutter Component Playground
import 'package:flutter/material.dart';

class MOPlayground extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Center(
      child: Container(
        padding: EdgeInsets.all(32),
        decoration: BoxDecoration(
          color: Color(0xFFD97706),
          borderRadius: BorderRadius.circular(24),
          boxShadow: [
            BoxShadow(
              color: Color(0xFFD97706).withOpacity(0.3),
              blurRadius: 20,
              offset: Offset(0, 10),
            ),
          ],
        ),
        child: Text(
          'Get Started', 
          style: TextStyle(
            color: Colors.white,
            fontWeight: FontWeight.bold,
            fontSize: 18,
          ),
        ),
      ),
    );
  }
}`
        : `// React Native Component Playground
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const Playground = () => {
  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <Text style={styles.text}>Get Started</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 32,
  },
  button: {
    backgroundColor: '#d97706',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 24,
    shadowColor: '#d97706',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  text: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
});`);

    const handleFrameworkChange = (fw: string) => {
        setActiveFramework(fw);
        // Update code template based on framework
        if (fw === "Flutter") {
            setCode(`// Flutter Component Playground
import 'package:flutter/material.dart';

class MOPlayground extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Center(
      child: Container(
        padding: EdgeInsets.all(32),
        decoration: BoxDecoration(
          color: Color(0xFFD97706),
          borderRadius: BorderRadius.circular(24),
        ),
        child: Text('Get Started', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
      ),
    );
  }
}`);
        } else {
            setCode(`// React Native Component Playground
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const Playground = () => {
  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <Text style={styles.text}>Get Started</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#d97706',
    padding: 24,
    borderRadius: 24,
  },
  text: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});`);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setIsCopied(true);
        toast.success("Code copied!");
        setTimeout(() => setIsCopied(false), 2000);
    };

    const handleDownload = () => {
        const element = document.createElement("a");
        const file = new Blob([code], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = `playground_${activeFramework.toLowerCase().replace(' ', '_')}.${activeFramework === "Flutter" ? 'dart' : 'tsx'}`;
        document.body.appendChild(element);
        element.click();
        toast.success("Download started");
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: 'MOBOUI Playground',
                text: 'Check out my custom component configuration!',
                url: window.location.href,
            }).catch(console.error);
        } else {
            navigator.clipboard.writeText(window.location.href);
            toast.success("Link copied!");
        }
    };

    return (
        <div className="h-screen pt-20 flex flex-col bg-background text-text-primary overflow-hidden">
            {/* Header Toolbar */}
            <div className="h-24 border-b border-border flex items-center justify-between px-10 bg-surface/80 backdrop-blur-xl">
                <div className="flex items-center gap-10">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground shadow-glow-amber">
                            <Play size={18} fill="currentColor" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-display font-medium tracking-tighter text-text-primary text-2xl leading-none">Playground</span>
                            <span className="text-[10px] font-bold text-text-muted tracking-[0.1em] mt-1 uppercase">Real-time Engine v3.0</span>
                        </div>
                    </div>
                    <div className="h-10 w-px bg-border" />
                    <div className="flex gap-2 bg-background p-1.5 rounded-2xl border border-border shadow-sm">
                        {FRAMEWORKS.map(fw => (
                            <button
                                key={fw}
                                onClick={() => handleFrameworkChange(fw)}
                                className={cn(
                                    "px-6 py-2 rounded-xl text-xs font-bold transition-all",
                                    activeFramework === fw ? "bg-primary text-primary-foreground shadow-glow-amber" : "text-text-muted hover:text-text-primary"
                                )}
                            >
                                {fw}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <Button
                        variant="outline"
                        onClick={handleShare}
                        className="rounded-xl h-14 px-8 border-border bg-background text-text-primary font-bold text-sm hover:bg-surface-elevated"
                    >
                        <Share2 size={18} className="mr-2" />
                        Share
                    </Button>
                    <Button
                        onClick={handleCopy}
                        className="rounded-xl h-14 px-10 bg-primary text-primary-foreground font-bold text-sm shadow-glow-amber hover:scale-[1.02] transition-all"
                    >
                        {isCopied ? <Check size={20} className="mr-2" /> : <Copy size={20} className="mr-2" />}
                        {isCopied ? "Copied" : "Copy Code"}
                    </Button>
                </div>
            </div>

            {/* Main Content Areas */}
            <div className="flex-grow flex overflow-hidden">
                {/* Left Column: Controls (340px) */}
                <div className="w-[340px] border-r border-border overflow-y-auto p-10 space-y-12 bg-surface/30">
                    <div>
                        <h3 className="text-[11px] font-bold text-text-muted uppercase tracking-[0.2em] mb-8">Device Settings</h3>
                        <div className="space-y-6">
                            <div className="space-y-3">
                                <label className="text-[10px] font-bold uppercase text-text-muted tracking-widest ml-1">Preview Device</label>
                                <div className="relative group">
                                    <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted w-4 h-4" />
                                    <select
                                        value={activeDevice}
                                        onChange={(e) => setActiveDevice(e.target.value)}
                                        className="w-full h-14 bg-background border border-border rounded-2xl pl-12 pr-4 text-sm font-bold text-text-primary appearance-none focus:border-primary/50 transition-all outline-none shadow-sm"
                                    >
                                        {DEVICES.map(d => <option key={d}>{d}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div className="flex items-center justify-between p-6 bg-background rounded-2xl border border-border shadow-sm">
                                <span className="text-[10px] font-bold uppercase text-text-muted tracking-widest">Theme Mode</span>
                                <button
                                    onClick={() => setDeviceTheme(deviceTheme === "dark" ? "light" : "dark")}
                                    className="h-12 w-12 flex items-center justify-center rounded-xl bg-surface border border-border text-primary hover:bg-surface-elevated transition-all"
                                >
                                    {deviceTheme === "dark" ? <Moon size={20} /> : <Sun size={20} />}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-[11px] font-bold text-text-muted uppercase tracking-[0.2em] mb-8">Component Visuals</h3>
                        <div className="space-y-8">
                            <div className="space-y-3">
                                <label className="text-[10px] font-bold uppercase text-text-muted tracking-widest ml-1">Button Text</label>
                                <input
                                    type="text"
                                    defaultValue="Get Started"
                                    className="w-full h-14 bg-background border border-border rounded-2xl px-5 text-sm font-bold text-text-primary focus:border-primary/50 outline-none transition-all shadow-sm"
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-bold uppercase text-text-muted tracking-widest ml-1">Variant Type</label>
                                <div className="grid grid-cols-2 gap-3">
                                    {["solid", "outline", "ghost", "minimal"].map(v => (
                                        <button
                                            key={v}
                                            className={cn(
                                                "py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest border transition-all",
                                                v === "solid" ? "bg-primary text-primary-foreground border-primary shadow-glow-amber" : "bg-background border-border text-text-muted hover:border-primary/30"
                                            )}
                                        >
                                            {v}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <Button
                        variant="ghost"
                        className="w-full h-14 rounded-2xl text-text-muted font-bold text-[11px] uppercase tracking-widest mt-auto hover:bg-destructive/10 hover:text-destructive"
                        onClick={() => { }}
                    >
                        <RotateCcw size={16} className="mr-2" />
                        Reset All Settings
                    </Button>
                </div>

                {/* Middle Column: Preview (Flex) */}
                <div className="flex-grow flex flex-col items-center justify-center relative bg-background overflow-hidden p-10">
                    <div className="absolute inset-0 bg-grid-pattern opacity-5" />
                    <GlowEffect className="opacity-10" color="amber" size="xl" />

                    {/* Phone Mockup Container */}
                    <div className="relative animate-in zoom-in-95 duration-1000">
                        <div className="w-[360px] h-[720px] rounded-[4.5rem] border-[14px] border-text-primary/5 bg-text-primary p-4 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] relative">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-10 bg-text-primary/10 rounded-b-[2.5rem] z-20" />
                            <div className={cn("w-full h-full rounded-[3.5rem] flex items-center justify-center transition-colors duration-700 overflow-hidden relative shadow-inner", deviceTheme === "dark" ? "bg-black" : "bg-white")}>
                                <div className="absolute inset-0 bg-grid-pattern opacity-5" />
                                {/* Component Render Simulation */}
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="relative z-10 p-4 bg-primary text-primary-foreground font-bold py-5 px-12 rounded-[2rem] shadow-glow-amber text-lg cursor-pointer"
                                >
                                    Get Started
                                </motion.div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Preview Toolbar */}
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-surface/40 backdrop-blur-md p-2 rounded-2xl border border-border shadow-xl">
                        <Button variant="secondary" size="icon" className="h-12 w-12 rounded-xl text-text-muted hover:text-text-primary"><Minimize2 size={20} /></Button>
                        <div className="px-8 text-xs font-bold text-text-primary tracking-tight">100% Precision</div>
                        <Button variant="secondary" size="icon" className="h-12 w-12 rounded-xl text-text-muted hover:text-text-primary"><Maximize2 size={20} /></Button>
                    </div>
                </div>

                {/* Right Column: Editor */}
                {showCode && (
                    <div className="w-[580px] border-l border-border flex flex-col bg-surface/50 animate-in slide-in-from-right duration-500 overflow-hidden">
                        <div className="h-24 border-b border-border flex items-center justify-between px-10 bg-surface-elevated/40">
                            <div className="flex items-center gap-4">
                                <Terminal size={18} className="text-primary" />
                                <span className="text-xs font-bold text-text-primary tracking-widest uppercase">Live Editor</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={handleDownload}
                                    className="h-12 w-12 text-text-muted hover:text-primary transition-all rounded-xl"
                                >
                                    <Download size={20} />
                                </Button>
                            </div>
                        </div>
                        <div className="flex-grow overflow-hidden relative">
                            <Editor
                                height="100%"
                                defaultLanguage={activeFramework === "Flutter" ? "dart" : "typescript"}
                                language={activeFramework === "Flutter" ? "dart" : "typescript"}
                                theme={deviceTheme === "dark" ? "vs-dark" : "light"}
                                value={code}
                                onChange={(value) => setCode(value || "")}
                                options={{
                                    fontSize: 14,
                                    fontFamily: "'JetBrains Mono', monospace",
                                    minimap: { enabled: false },
                                    scrollBeyondLastLine: false,
                                    lineNumbers: "on",
                                    padding: { top: 32 },
                                    roundedSelection: true,
                                    automaticLayout: true,
                                }}
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Floating Toggle Editor */}
            <button
                onClick={() => setShowCode(!showCode)}
                className="fixed bottom-10 right-10 h-20 w-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-glow-amber hover:scale-110 transition-all z-50 lg:hidden"
            >
                <Code2 size={28} />
            </button>
        </div>
    );
}
