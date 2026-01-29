"use client";

import React, { useState, useMemo } from 'react';
import Editor from "@monaco-editor/react";
import MobileFrame from "@/components/emulator/MobileFrame";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Play, RotateCcw, Download, Share2, Terminal } from "lucide-react";

const RN_TEMPLATE = `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

/**
 * MobileUIKit Playground
 * Try editing the code below to see live changes!
 * Keywords to trigger preview: 
 * - PrimaryButton
 * - OTPInput
 * - ProductCard
 * - ChatBubble
 * - GlassCard
 * - HeaderBar
 * - SegmentedControl
 */
export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Hello Mobile UI! 🚀</Text>
        <Text style={styles.subtitle}>
          Build beautiful apps faster with copy-paste components.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0a0a0a',
    padding: 24,
  },
  card: {
    padding: 24,
    borderRadius: 20,
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#333',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  title: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    color: '#a0a0a0',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
});`;

export default function PlaygroundPage() {
    const [code, setCode] = useState(RN_TEMPLATE);
    const [framework, setFramework] = useState('react-native');

    // Dynamic Keyword Detection to simulate "Running" code
    const detectedComponent = useMemo(() => {
        const lowerCode = code.toLowerCase();
        if (lowerCode.includes('primarybutton')) return 'primary-button';
        if (lowerCode.includes('otpinput')) return 'otp-input';
        if (lowerCode.includes('productcard')) return 'product-grid';
        if (lowerCode.includes('chatbubble')) return 'chat-bubble';
        if (lowerCode.includes('progressring')) return 'progress-ring';
        if (lowerCode.includes('glasscard')) return 'glass-card';
        if (lowerCode.includes('vstack')) return 'vstack';
        if (lowerCode.includes('hstack')) return 'hstack';
        if (lowerCode.includes('safearea')) return 'safe-area';
        if (lowerCode.includes('headerbar') || lowerCode.includes('header')) return 'header-bar';
        if (lowerCode.includes('segmentedcontrol')) return 'segmented-control';
        if (lowerCode.includes('shimmer')) return 'shimmer';
        if (lowerCode.includes('lottie')) return 'lottie-wrapper';
        if (lowerCode.includes('socialauth') || lowerCode.includes('google')) return 'auth-social';
        if (lowerCode.includes('storyring')) return 'story-ring';
        if (lowerCode.includes('statscard')) return 'stats-card';
        if (lowerCode.includes('themeswitch')) return 'theme-switch';
        return undefined;
    }, [code]);

    return (
        <div className="flex flex-col h-[calc(100vh-64px)] overflow-hidden">
            {/* Top Toolbar */}
            <div className="h-14 border-b border-border bg-surface/50 backdrop-blur-md flex items-center justify-between px-6 flex-shrink-0 z-10">
                <div className="flex items-center gap-6">
                    <Tabs value={framework} onValueChange={setFramework}>
                        <TabsList className="h-8 bg-black/20">
                            <TabsTrigger value="react-native" className="text-xs px-4">React Native</TabsTrigger>
                            <TabsTrigger value="flutter" className="text-xs px-4">Flutter</TabsTrigger>
                        </TabsList>
                    </Tabs>

                    <div className="h-8 w-px bg-border hidden md:block" />

                    <div className="hidden md:flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="h-8 rounded-full text-xs font-bold" onClick={() => setCode(RN_TEMPLATE)}>
                            <RotateCcw className="w-4 h-4 mr-2" /> Reset
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 rounded-full text-xs font-bold">
                            <Download className="w-4 h-4 mr-2" /> Export
                        </Button>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="rounded-full h-8 px-4 text-xs font-bold border-primary/20 hover:border-primary/50 transition-colors">
                        <Share2 className="w-4 h-4 mr-2" /> Share
                    </Button>
                    <Button size="sm" className="rounded-full h-8 px-6 bg-primary hover:bg-primary/90 text-xs font-extrabold uppercase tracking-wider transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20">
                        <Play className="w-4 h-4 mr-2 fill-current" /> Run App
                    </Button>
                </div>
            </div>

            {/* Main content area */}
            <div className="flex-1 flex overflow-hidden relative">
                {/* Editor - Left */}
                <div className="flex-1 border-r border-border bg-[#1e1e1e] relative">
                    <div className="absolute top-0 right-0 p-4 z-10 opacity-30 pointer-events-none">
                        <span className="text-[10px] font-bold tracking-widest text-primary uppercase">Monaco Editor v0.46</span>
                    </div>
                    <Editor
                        height="100%"
                        language={framework === 'react-native' ? "typescript" : "dart"}
                        theme="vs-dark"
                        value={code}
                        onChange={(v) => setCode(v || '')}
                        options={{
                            fontSize: 14,
                            fontFamily: "var(--font-jetbrains-mono)",
                            minimap: { enabled: false },
                            scrollBeyondLastLine: false,
                            automaticLayout: true,
                            padding: { top: 20 },
                            lineNumbers: "on",
                            roundedSelection: true,
                            cursorSmoothCaretAnimation: "on",
                            formatOnPaste: true,
                        }}
                    />
                </div>

                {/* Preview - Right */}
                <div className="hidden lg:flex w-[550px] bg-background p-10 overflow-auto items-center justify-center bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent relative">
                    <div className="absolute top-4 left-4 flex flex-col gap-1 items-start">
                        <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">Live Simulator</span>
                        <div className="flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-[10px] text-green-500/80 font-bold uppercase tracking-widest">Active</span>
                        </div>
                    </div>

                    <MobileFrame componentId={detectedComponent}>
                        <div className="flex flex-col items-center justify-center h-full text-center p-6 space-y-6">
                            <div className="w-24 h-24 rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center relative overflow-hidden group">
                                <Play className="w-10 h-10 text-primary group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute inset-x-0 bottom-0 h-1 bg-primary" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold mb-2 uppercase tracking-tighter">App Standby</h2>
                                <p className="text-muted-foreground text-xs leading-relaxed max-w-[200px] mx-auto opacity-70">
                                    Import a component or use a recognized class name like <span className="text-primary font-bold font-mono">PrimaryButton</span> to trigger a preview.
                                </p>
                            </div>
                            <div className="flex items-center gap-4 pt-4">
                                <div className="h-10 w-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors" onClick={() => setCode(RN_TEMPLATE)}><RotateCcw className="w-4 h-4" /></div>
                                <Button size="sm" className="rounded-full bg-surface border border-white/5 h-10 px-6">Refresh</Button>
                            </div>
                        </div>
                    </MobileFrame>

                    <div className="absolute bottom-6 right-6">
                        <Badge variant="outline" className="text-[8px] bg-black/40 border-white/10 uppercase tracking-[0.2em] px-3 py-1.5">60 FPS Render</Badge>
                    </div>
                </div>
            </div>

            {/* Console / Bottom Bar */}
            <div className="h-10 border-t border-border bg-black/80 backdrop-blur-md flex items-center px-6 gap-4 text-[9px] font-mono text-muted-foreground/60 uppercase tracking-[0.3em] flex-shrink-0">
                <div className="flex items-center gap-2 text-primary/80">
                    <Terminal className="w-3.5 h-3.5" />
                    <span className="font-bold">System Status: Nominal</span>
                </div>
                <div className="h-3 w-px bg-border/50 mx-2" />
                <span>Syncing with Emulator...</span>
                <div className="flex-1" />
                <div className="flex items-center gap-6">
                    <span className="hover:text-foreground cursor-default transition-colors">Line {code.split('\n').length}, Col 1</span>
                    <span className="flex items-center gap-1.5">
                        <div className="w-1 h-1 rounded-full bg-primary" />
                        TypeScript v5.4
                    </span>
                    <span className="font-bold tracking-tighter">12.4ms Latency</span>
                </div>
            </div>
        </div>
    );
}
