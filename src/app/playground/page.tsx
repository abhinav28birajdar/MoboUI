"use client";

import React, { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import {
    Play,
    Code2,
    Copy,
    RotateCcw,
    Share2,
    Download,
    Moon,
    Sun,
    Check,
    Smartphone,
    Terminal,
    Zap,
    RefreshCw,
    Volume2,
    Eye,
    Palette,
    Settings,
    ArrowRight,
    X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import { GlowEffect } from "@/components/shared/GlowEffect";
import { EmulatorScreen } from "@/components/playground/EmulatorScreen";
import { toast } from "react-hot-toast";
import Editor from "@monaco-editor/react";

const FRAMEWORKS = ["Flutter", "React Native", "Expo"];
const DEVICES = {
    "iPhone 15 Pro": { width: 393, height: 852, brand: "Apple" },
    "iPhone SE": { width: 375, height: 667, brand: "Apple" },
    "Pixel 8 Pro": { width: 412, height: 915, brand: "Google" },
    "Pixel 7": { width: 412, height: 867, brand: "Google" },
};

const DEMO_TEMPLATES = {
    Flutter: {
        button: `import 'package:flutter/material.dart';

class MOButton extends StatelessWidget {
  final String label;
  final VoidCallback onPressed;

  const MOButton({
    required this.label,
    required this.onPressed,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onPressed,
      child: Container(
        padding: EdgeInsets.symmetric(
          horizontal: 32,
          vertical: 16,
        ),
        decoration: BoxDecoration(
          color: Color(0xFFFFCA03),
          borderRadius: BorderRadius.circular(24),
          boxShadow: [
            BoxShadow(
              color: Color(0xFFFFCA03).withOpacity(0.3),
              spreadRadius: 4,
              blurRadius: 12,
            )
          ],
        ),
        child: Text(
          label,
          style: TextStyle(
            color: Color(0xFF0A0A0A),
            fontWeight: FontWeight.bold,
            fontSize: 16,
          ),
        ),
      ),
    );
  }
}`,
        input: `import 'package:flutter/material.dart';

class MOInput extends StatefulWidget {
  final String placeholder;

  const MOInput({required this.placeholder});

  @override
  State<MOInput> createState() => _MOInputState();
}

class _MOInputState extends State<MOInput> {
  late TextEditingController _controller;

  @override
  void initState() {
    super.initState();
    _controller = TextEditingController();
  }

  @override
  Widget build(BuildContext context) {
    return TextField(
      controller: _controller,
      decoration: InputDecoration(
        hintText: widget.placeholder,
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(16),
          borderSide: BorderSide.none,
        ),
        filled: true,
        fillColor: Colors.grey[100],
        contentPadding: EdgeInsets.all(16),
      ),
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }
}`,
    },
    "React Native": {
        button: `import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export const MOButton = ({ label, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FFCA03',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 24,
    shadowColor: '#FFCA03',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  text: {
    color: '#0A0A0A',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});`,
        input: `import React, { useState } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';

export const MOInput = ({ placeholder }) => {
  const [value, setValue] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#999"
        value={value}
        onChangeText={setValue}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  input: {
    borderRadius: 16,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 14,
    color: '#0A0A0A',
  },
});`,
    },
    Expo: {
        button: `import { Pressable, Text, StyleSheet } from 'react-native';

export default function MOButton({ label, onPress }) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        pressed && styles.buttonPressed,
      ]}
      onPress={onPress}
    >
      <Text style={styles.text}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FFCA03',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 24,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  text: {
    color: '#0A0A0A',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});`,
        input: `import { TextInput, StyleSheet } from 'react-native';
import { useState } from 'react';

export default function MOInput({ placeholder }) {
  const [value, setValue] = useState('');

  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      value={value}
      onChangeText={setValue}
      placeholderTextColor="#999"
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderRadius: 16,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 14,
    color: '#0A0A0A',
  },
});`,
    },
};

export default function PlaygroundPage() {
    const [activeFramework, setActiveFramework] = useState("Flutter");
    const [activeDevice, setActiveDevice] = useState("iPhone 15 Pro");
    const [deviceTheme, setDeviceTheme] = useState<"dark" | "light">("dark");
    const [showCode, setShowCode] = useState(true);
    const [isCopied, setIsCopied] = useState(false);
    const [isRunning, setIsRunning] = useState(false);
    const [showConsole, setShowConsole] = useState(false);
    const [consoleOutput, setConsoleOutput] = useState<string[]>(["Console ready...", "Waiting for code execution..."]);
    const [activeTemplate, setActiveTemplate] = useState("button");
    const [showWatchDemo, setShowWatchDemo] = useState(false);
    const [buttonText, setButtonText] = useState("Get Started");
    const [selectedVariant, setSelectedVariant] = useState("solid");

    const [code, setCode] = useState(DEMO_TEMPLATES.Flutter.button);

    const handleFrameworkChange = (fw: string) => {
        setActiveFramework(fw);
        setCode(DEMO_TEMPLATES[fw as keyof typeof DEMO_TEMPLATES].button);
        setActiveTemplate("button");
    };

    const handleTemplateChange = (template: string) => {
        setActiveTemplate(template);
        setCode(DEMO_TEMPLATES[activeFramework as keyof typeof DEMO_TEMPLATES][template as keyof typeof DEMO_TEMPLATES.Flutter]);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setIsCopied(true);
        toast.success("Code copied!");
        setTimeout(() => setIsCopied(false), 2000);
    };

    const handleRun = useCallback(() => {
        setIsRunning(true);
        setShowConsole(true);
        setConsoleOutput([]);
        
        const messages = [
            `[${new Date().toLocaleTimeString()}] ⚙️ Initializing ${activeFramework} compiler...`,
            `[${new Date().toLocaleTimeString()}] 📦 Loading dependencies...`,
            `[${new Date().toLocaleTimeString()}] 🔍 Parsing code structure...`,
            `[${new Date().toLocaleTimeString()}] ✓ Syntax validation passed`,
            `[${new Date().toLocaleTimeString()}] 🎨 Rendering component preview...`,
            `[${new Date().toLocaleTimeString()}] 🚀 Hot reload enabled on ${activeDevice}`,
            `[${new Date().toLocaleTimeString()}] ✓ ${activeFramework} emulator running successfully!`,
            `[${new Date().toLocaleTimeString()}] 📱 Device: ${DEVICES[activeDevice as keyof typeof DEVICES].brand} ${activeDevice}`,
            `[${new Date().toLocaleTimeString()}] 🎯 Ready for testing...`,
        ];

        let index = 0;
        const interval = setInterval(() => {
            if (index < messages.length) {
                setConsoleOutput((prev) => [...prev, messages[index]]);
                index++;
            } else {
                clearInterval(interval);
            }
        }, 300);

        setTimeout(() => {
            toast.success(`${activeFramework} running on ${activeDevice}!`);
        }, 1000);
    }, [activeFramework, activeDevice]);

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
        <div className="min-h-screen flex flex-col bg-background text-text-primary">
            {/* Header */}
            <div className="h-24 border-b border-border flex items-center justify-between px-6 md:px-10 bg-surface/40 backdrop-blur-xl sticky top-0 z-40">
                <div className="flex items-center gap-4 md:gap-10">
                    <div className="flex items-center gap-3 md:gap-4">
                        <div className="w-10 md:w-12 h-10 md:h-12 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground">
                            <Play size={18} fill="currentColor" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-display font-medium tracking-tighter text-text-primary text-lg md:text-2xl leading-none">Playground</span>
                            <span className="text-[9px] md:text-[10px] font-bold text-text-muted tracking-[0.1em] mt-1 uppercase hidden sm:inline">Real-time Engine v3.0</span>
                        </div>
                    </div>
                    <div className="h-10 w-px bg-border hidden md:block" />
                    <div className="flex gap-2 bg-background p-1.5 rounded-2xl border border-border shadow-sm">
                        {FRAMEWORKS.map(fw => (
                            <button
                                key={fw}
                                onClick={() => handleFrameworkChange(fw)}
                                className={cn(
                                    "px-3 md:px-6 py-2 rounded-xl text-[10px] md:text-xs font-bold transition-all",
                                    activeFramework === fw ? "bg-primary text-primary-foreground" : "text-text-muted hover:text-text-primary"
                                )}
                            >
                                {fw}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-2 md:gap-4">
                    <Button
                        onClick={() => setShowWatchDemo(true)}
                        className="hidden sm:flex rounded-xl h-12 md:h-14 px-4 md:px-8 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-bold text-xs md:text-sm hover:shadow-lg transition-all gap-2"
                    >
                        <Eye size={16} />
                        Watch Demo
                    </Button>
                    <Button
                        onClick={handleCopy}
                        className="rounded-xl h-12 md:h-14 px-3 md:px-6 bg-primary text-primary-foreground font-bold text-xs md:text-sm hover:bg-primary/90 transition-all"
                        title="Copy code"
                    >
                        {isCopied ? <Check size={18} /> : <Copy size={18} />}
                        <span className="hidden md:inline ml-2">{isCopied ? "Copied" : "Copy"}</span>
                    </Button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-grow flex flex-col lg:flex-row overflow-hidden gap-0">
                {/* Left Sidebar - Controls (340px on desktop) */}
                <div className="w-full lg:w-[320px] border-b lg:border-b-0 lg:border-r border-border overflow-y-auto p-6 md:p-10 space-y-8 bg-surface/30">
                    {/* Device Settings */}
                    <div>
                        <h3 className="text-[11px] font-bold text-text-muted uppercase tracking-[0.2em] mb-8">Device Settings</h3>
                        <div className="space-y-6">
                            <div className="space-y-3">
                                <label className="text-[10px] font-bold uppercase text-text-muted tracking-widest ml-1">Preview Device</label>
                                <div className="relative group">
                                    <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted w-4 h-4 z-10" />
                                    <select
                                        value={activeDevice}
                                        onChange={(e) => setActiveDevice(e.target.value)}
                                        className="w-full h-12 md:h-14 bg-background border border-border rounded-2xl pl-12 pr-4 text-sm font-bold text-text-primary appearance-none focus:border-primary/50 transition-all outline-none shadow-sm cursor-pointer"
                                    >
                                        {Object.keys(DEVICES).map(device => (
                                            <option key={device}>{device}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="flex items-center justify-between p-4 md:p-6 bg-background rounded-2xl border border-border shadow-sm">
                                <span className="text-[10px] font-bold uppercase text-text-muted tracking-widest">Theme Mode</span>
                                <button
                                    onClick={() => setDeviceTheme(deviceTheme === "dark" ? "light" : "dark")}
                                    className="h-10 md:h-12 w-10 md:w-12 flex items-center justify-center rounded-xl bg-surface border border-border text-primary hover:bg-surface-elevated transition-all"
                                    title={`Switch to ${deviceTheme === "dark" ? "light" : "dark"} mode`}
                                >
                                    {deviceTheme === "dark" ? <Moon size={18} /> : <Sun size={18} />}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Component Templates */}
                    <div>
                        <h3 className="text-[11px] font-bold text-text-muted uppercase tracking-[0.2em] mb-8">Component Template</h3>
                        <div className="grid grid-cols-2 md:grid-cols-1 gap-3">
                            {["button", "input"].map(template => (
                                <button
                                    key={template}
                                    onClick={() => handleTemplateChange(template)}
                                    className={cn(
                                        "py-3 md:py-4 px-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest border transition-all capitalize",
                                        activeTemplate === template ? "bg-primary text-primary-foreground border-primary shadow-glow-amber" : "bg-background border-border text-text-muted hover:border-primary/30"
                                    )}
                                >
                                    {template}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Component Settings */}
                    <div className="space-y-6">
                        <div className="space-y-3">
                            <label className="text-[10px] font-bold uppercase text-text-muted tracking-widest ml-1">Button Label</label>
                            <input
                                type="text"
                                value={buttonText}
                                onChange={(e) => setButtonText(e.target.value)}
                                className="w-full h-12 md:h-14 bg-background border border-border rounded-2xl px-5 text-sm font-bold text-text-primary focus:border-primary/50 outline-none transition-all shadow-sm"
                                placeholder="Enter button text"
                            />
                        </div>

                        <div className="space-y-3">
                            <label className="text-[10px] font-bold uppercase text-text-muted tracking-widest ml-1">Variant Style</label>
                            <div className="grid grid-cols-2 md:grid-cols-1 gap-3">
                                {["solid", "outline", "ghost"].map(v => (
                                    <button
                                        key={v}
                                        onClick={() => setSelectedVariant(v)}
                                        className={cn(
                                            "py-3 md:py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest border transition-all capitalize",
                                            selectedVariant === v ? "bg-primary text-primary-foreground border-primary" : "bg-background border-border text-text-muted hover:border-primary/30"
                                        )}
                                    >
                                        {v}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <Button
                        onClick={() => {
                            setButtonText("Get Started");
                            setSelectedVariant("solid");
                            setActiveTemplate("button");
                            setConsoleOutput(["Console cleared"]);
                        }}
                        className="w-full h-12 md:h-14 rounded-2xl text-text-muted font-bold text-[11px] uppercase tracking-widest hover:bg-destructive/10 hover:text-destructive transition-all border border-border bg-background"
                    >
                        <RotateCcw size={16} className="mr-2" />
                        Reset All
                    </Button>
                </div>

                {/* Middle Section - Preview */}
                <div className="flex-grow flex flex-col items-center justify-center relative bg-background overflow-hidden p-4 md:p-10 min-h-[500px] lg:min-h-auto">
                    <div className="absolute inset-0 bg-grid-pattern opacity-5" />
                    <GlowEffect className="opacity-10" color="amber" size="xl" />

                    {/* Device Status Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute top-4 md:top-8 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-surface/80 backdrop-blur-md px-4 md:px-6 py-2 md:py-3 rounded-2xl border border-border shadow-lg z-30 text-center"
                    >
                        <div className={cn(
                            "w-2 h-2 md:w-3 md:h-3 rounded-full",
                            isRunning ? "bg-green-500 animate-pulse" : "bg-text-muted"
                        )} />
                        <span className="text-[9px] md:text-xs font-bold text-text-muted tracking-widest uppercase">
                            {DEVICES[activeDevice as keyof typeof DEVICES].brand} • {activeDevice}
                        </span>
                        {isRunning && (
                            <span className="text-[9px] font-bold text-green-500 tracking-widest uppercase ml-2">RUNNING</span>
                        )}
                    </motion.div>

                    {/* Phone Mockup */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative"
                    >
                        <div className="relative w-[280px] md:w-[360px] h-[560px] md:h-[720px] rounded-[3.5rem] md:rounded-[4.5rem] border-[10px] md:border-[14px] border-text-primary/10 bg-text-primary/5 p-3 md:p-4 shadow-lg">
                            {/* Notch */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-8 md:h-10 bg-text-primary/20 rounded-b-[1.5rem] md:rounded-b-[2.5rem] z-20 flex items-center justify-between px-4 md:px-6">
                                <span className="text-[7px] md:text-[8px] font-bold text-text-muted">9:41</span>
                                <div className="flex items-center gap-1">
                                    <Zap size={9} className="text-text-muted md:w-[10px]" />
                                    <Volume2 size={9} className="text-text-muted md:w-[10px]" />
                                </div>
                            </div>

                            {/* Emulator Screen Content */}
                            <EmulatorScreen
                                code={code}
                                framework={activeFramework as "Flutter" | "React Native" | "Expo"}
                                theme={deviceTheme}
                                isRunning={isRunning}
                                buttonText={buttonText}
                            />
                        </div>
                    </motion.div>

                    {/* Bottom Toolbar */}
                    <div className="absolute bottom-4 md:bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 md:gap-4 bg-surface/80 backdrop-blur-xl p-2 md:p-3 rounded-2xl border border-border shadow-lg z-30 flex-wrap justify-center">
                        <Button
                            onClick={handleRun}
                            className={cn(
                                "h-10 md:h-12 px-4 md:px-6 rounded-xl font-bold text-[10px] md:text-xs uppercase tracking-widest transition-all",
                                isRunning
                                    ? "bg-green-500 text-white hover:bg-green-600"
                                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                            )}
                        >
                            {isRunning ? (
                                <>
                                    <RefreshCw size={12} className="mr-2 animate-spin md:w-[14px] md:h-[14px]" />
                                    Running
                                </>
                            ) : (
                                <>
                                    <Play size={12} className="mr-2 fill-current md:w-[14px] md:h-[14px]" />
                                    Run
                                </>
                            )}
                        </Button>
                        <div className="px-3 md:px-6 py-2 text-[9px] md:text-xs font-bold text-text-primary bg-background rounded-xl border border-border hidden sm:block">
                            100% Fidelity
                        </div>
                        <Button
                            onClick={() => setShowConsole(!showConsole)}
                            className="h-10 md:h-12 w-10 md:w-12 rounded-xl hover:bg-surface-elevated text-primary flex items-center justify-center"
                            title="Toggle console"
                        >
                            <Terminal size={16} className="md:w-[18px] md:h-[18px]" />
                        </Button>
                    </div>
                </div>

                {/* Right Sidebar - Editor + Console */}
                {showCode && (
                    <div className="w-full lg:w-[480px] border-t lg:border-t-0 lg:border-l border-border flex flex-col bg-surface/50 overflow-hidden">
                        <div className="h-16 md:h-24 border-b border-border flex items-center justify-between px-4 md:px-10 bg-surface-elevated/40">
                            <div className="flex items-center gap-3 md:gap-4">
                                <Terminal size={16} className="text-primary md:w-[18px] md:h-[18px]" />
                                <div className="flex flex-col">
                                    <span className="text-[10px] md:text-xs font-bold text-text-primary tracking-widest uppercase">Live Editor</span>
                                    <span className="text-[8px] md:text-[9px] text-text-muted mt-1">{activeFramework === "Flutter" ? "Dart" : "TypeScript"}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button
                                    onClick={handleDownload}
                                    className="h-10 md:h-12 w-10 md:w-12 text-text-muted hover:text-primary transition-all rounded-xl hover:bg-surface flex items-center justify-center"
                                    title="Download code"
                                >
                                    <Download size={16} className="md:w-[20px] md:h-[20px]" />
                                </Button>
                            </div>
                        </div>

                        {/* Editor Section */}
                        <div className={cn(
                            "overflow-hidden relative transition-all duration-300",
                            showConsole ? "h-[400px] md:h-[500px]" : "flex-grow"
                        )}>
                            <Editor
                                height="100%"
                                defaultLanguage={activeFramework === "Flutter" ? "dart" : "typescript"}
                                language={activeFramework === "Flutter" ? "dart" : "typescript"}
                                theme={deviceTheme === "dark" ? "vs-dark" : "light"}
                                value={code}
                                onChange={(value) => setCode(value || "")}
                                options={{
                                    fontSize: 12,
                                    fontFamily: "'JetBrains Mono', monospace",
                                    minimap: { enabled: false },
                                    scrollBeyondLastLine: false,
                                    lineNumbers: "on",
                                    padding: { top: 12, bottom: 12 },
                                    roundedSelection: true,
                                    automaticLayout: true,
                                    wordWrap: "on",
                                }}
                            />
                        </div>

                        {/* Console Section */}
                        {showConsole && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", minHeight: 200, opacity: 1 }}
                                className="border-t border-border bg-background/50 overflow-hidden flex flex-col"
                            >
                                <div className="h-12 md:h-14 border-b border-border flex items-center justify-between px-4 md:px-10 bg-surface-elevated/20">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                        <span className="text-[10px] md:text-xs font-bold text-text-primary tracking-widest uppercase">Console Output</span>
                                    </div>
                                    <Button
                                        onClick={() => setConsoleOutput(["Console cleared"])}
                                        className="text-[8px] md:text-[9px] text-text-muted hover:text-text-primary bg-transparent border-0 p-2"
                                    >
                                        Clear
                                    </Button>
                                </div>
                                <div className="flex-1 overflow-y-auto p-3 md:p-6 space-y-2 font-mono text-[11px] md:text-xs bg-black/40 bg-[url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22><defs><pattern id=%22grid%22 width=%22100%22 height=%22100%22 patternUnits=%22userSpaceOnUse%22><path d=%22M 100 0 L 0 0 0 100%22 fill=%22none%22 stroke=%22rgba(255,255,255,0.05)%22 stroke-width=%220.5%22/></pattern></defs><rect width=%22100%22 height=%22100%22 fill=%22%23000%22/><rect width=%22100%22 height=%22100%22 fill=%22url(%23grid)%22/></svg>')]">
                                    {consoleOutput.map((log, idx) => (
                                        <div key={idx} className="text-green-400/80 break-words">
                                            <span className="text-text-muted">›</span> {log}
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </div>
                )}
            </div>

            {/* Toggle Editor Button - Mobile */}
            <button
                onClick={() => setShowCode(!showCode)}
                className="fixed bottom-6 right-6 h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-all z-40 lg:hidden font-bold text-center text-xs shadow-lg"
                title={showCode ? "Hide code editor" : "Show code editor"}
            >
                {showCode ? "Hide Code" : "Show Code"}
            </button>

            {/* Watch Demo Modal */}
            {showWatchDemo && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
                    onClick={() => setShowWatchDemo(false)}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-surface-elevated border border-border rounded-3xl overflow-hidden max-w-2xl w-full shadow-2xl"
                    >
                        {/* Modal Header */}
                        <div className="h-16 md:h-20 border-b border-border flex items-center justify-between px-6 md:px-10 bg-surface/50">
                            <h2 className="text-xl md:text-2xl font-bold text-text-primary">Watch Demo</h2>
                            <button
                                onClick={() => setShowWatchDemo(false)}
                                className="text-text-muted hover:text-text-primary transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6 md:p-10 space-y-6">
                            <div className="space-y-4">
                                <h3 className="text-lg md:text-xl font-bold text-text-primary flex items-center gap-3">
                                    <Play size={20} className="text-primary" fill="currentColor" />
                                    How to Use the Playground
                                </h3>
                                <ul className="space-y-3 text-text-muted text-sm md:text-base">
                                    <li className="flex gap-3">
                                        <span className="text-primary font-bold">1.</span>
                                        <span>Select your framework (Flutter, React Native, or Expo)</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-primary font-bold">2.</span>
                                        <span>Choose a component template (Button or Input)</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-primary font-bold">3.</span>
                                        <span>Customize the device, theme, and styling options</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-primary font-bold">4.</span>
                                        <span>Edit the code in the live editor with real-time syntax highlighting</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-primary font-bold">5.</span>
                                        <span>Click "Run Code" to execute and see the preview on the device mockup</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-primary font-bold">6.</span>
                                        <span>Use the console to debug and track execution logs in real-time</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-primary font-bold">7.</span>
                                        <span>Copy your code or download it as a file for your project</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="p-4 md:p-6 bg-primary/10 border border-primary/30 rounded-2xl space-y-2">
                                <h4 className="font-bold text-text-primary flex items-center gap-2">
                                    <Zap size={18} className="text-primary" />
                                    Pro Tips
                                </h4>
                                <ul className="text-xs md:text-sm text-text-muted space-y-2 ml-6">
                                    <li>• Toggle between Dark and Light mode to test different themes</li>
                                    <li>• The console shows real-time compilation and execution logs</li>
                                    <li>• Your changes in the editor are reflected immediately</li>
                                    <li>• Use the Reset button to restore default settings</li>
                                </ul>
                            </div>

                            <Button
                                onClick={() => setShowWatchDemo(false)}
                                className="w-full h-12 md:h-14 bg-primary text-primary-foreground font-bold text-sm md:text-base rounded-2xl hover:bg-primary/90 transition-all"
                            >
                                <ArrowRight size={18} className="mr-2" />
                                Start Coding Now
                            </Button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
}

// The X icon is already imported from lucide-react above
