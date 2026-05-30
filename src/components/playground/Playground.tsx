"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FrameworkTabs } from "./FrameworkTabs";
import { LiveEditor } from "./LiveEditor";
import { PreviewPanel } from "./PreviewPanel";
import { usePlaygroundStore } from "@/lib/store/playground-store";
import { components as componentsData } from "@/lib/data/components";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play, Copy } from "lucide-react";

const TEMPLATES = {
  "react-native": `import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function App() {
  const [count, setCount] = React.useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello React Native! 🚀</Text>
      <Text style={styles.subtitle}>Click the button below</Text>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={() => setCount(count + 1)}
      >
        <Text style={styles.buttonText}>
          Clicked {count} times
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0A0A0A',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#9CA3AF',
    marginBottom: 32,
  },
  button: {
    backgroundColor: '#77D970',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
  },
  buttonText: {
    color: '#0A0A0A',
    fontSize: 16,
    fontWeight: '600',
  },
});`,
  flutter: `import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData.dark(),
      home: HomePage(),
    );
  }
}

class HomePage extends StatefulWidget {
  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  int count = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xFF0A0A0A),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              'Hello Flutter! 🐦',
              style: TextStyle(
                fontSize: 28,
                fontWeight: FontWeight.bold,
                color: Colors.white,
              ),
            ),
            SizedBox(height: 8),
            Text(
              'Click the button below',
              style: TextStyle(
                fontSize: 16,
                color: Color(0xFF9CA3AF),
              ),
            ),
            SizedBox(height: 32),
            ElevatedButton(
              onPressed: () {
                setState(() {
                  count++;
                });
              },
              style: ElevatedButton.styleFrom(
                backgroundColor: Color(0xFF77D970),
                foregroundColor: Color(0xFF0A0A0A),
                padding: EdgeInsets.symmetric(
                  vertical: 16,
                  horizontal: 32,
                ),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
                elevation: 0,
              ),
              child: Text(
                'Clicked $count times',
                style: TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}`,
};


export function Playground() {
  const { code, framework, setCode, setFramework } = usePlaygroundStore();
  const [mounted, setMounted] = useState(false);
  const searchParams = useSearchParams();
  const templateSlug = searchParams.get("template");

  useEffect(() => {
    setMounted(true);

    // Handle template from URL
    if (templateSlug) {
      const template = componentsData.find(c => c.slug === templateSlug || c.id === templateSlug);
      if (template) {
        const targetFramework = template.framework === 'flutter' ? 'flutter' : 'react-native';
        const targetCode = (targetFramework === 'flutter' ? template.code.dart : template.code.typescript) || "";

        setFramework(targetFramework);
        setCode(targetCode);
        return;
      }
    }

    // Default template if no code
    if (!code && !templateSlug) {
      setCode(TEMPLATES[framework]);
    }
  }, [templateSlug, mounted]); // Dependency on mounted to ensure hydration first

  const handleFrameworkChange = (newFramework: "react-native" | "flutter") => {
    setFramework(newFramework);
    setCode(TEMPLATES[newFramework]);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-black pt-32 pb-12">
      {/* Page Header */}
      <div className="container mx-auto px-6 text-left mb-16">
        <span className="text-primary font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Interactive Lab</span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl lg:text-8xl font-heading font-black tracking-tighter uppercase text-white mb-6"
        >
          Live Mobile <span className="text-primary ">Playground.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-neutral-400 max-w-2xl font-sans mb-12"
        >
          Test your React Native and Flutter code in real-time. Built with Expo Snack and DartPad for a native-like experience.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <FrameworkTabs activeFramework={framework} onFrameworkChange={handleFrameworkChange} />
        </motion.div>
      </div>

      {/* Split Layout */}
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 h-[800px]">
          {/* Left Panel: Code Editor */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col bg-neutral-900/50 border border-white/5 rounded-[40px] overflow-hidden shadow-2xl"
          >
            <div className="flex items-center justify-between px-8 py-6 bg-neutral-900 border-b border-white/5">
              <div className="flex items-center gap-4">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-neutral-800" />
                  <div className="w-3 h-3 rounded-full bg-neutral-800" />
                  <div className="w-3 h-3 rounded-full bg-neutral-800" />
                </div>
                <div className="h-4 w-px bg-white/10" />
                <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest font-black">
                  {framework === "react-native" ? "App.tsx" : "main.dart"}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <Button
                  size="sm"
                  className="h-10 gap-2 bg-primary text-black hover:bg-white font-black text-[10px] px-6 rounded-full shadow-lg shadow-primary/20 transition-all uppercase tracking-widest"
                  onClick={() => {
                    // Force re-execution or show feedback
                    const oldCode = code;
                    setCode("");
                    setTimeout(() => setCode(oldCode), 10);
                  }}
                >
                  <Play size={10} fill="currentColor" />
                  Run
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-10 gap-2 text-neutral-500 hover:text-white text-[10px] font-black uppercase tracking-widest"
                  onClick={() => {
                    navigator.clipboard.writeText(code);
                  }}
                >
                  <Copy size={12} />
                  Copy
                </Button>
              </div>
            </div>

            <div className="flex-1 min-h-0">
              <LiveEditor
                code={code}
                onChange={(val) => setCode(val || "")}
                language={framework === "react-native" ? "typescript" : "dart"}
              />
            </div>
          </motion.div>

          {/* Right Panel: Mobile Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col bg-neutral-900/50 border border-white/5 rounded-[40px] overflow-hidden shadow-2xl relative"
          >
            <div className="flex items-center justify-between px-8 py-6 bg-neutral-900 border-b border-white/5">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Live Preview</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(0,0,0,0.2)]" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Syncing</span>
                </div>
              </div>
            </div>

            <div className="flex-1 flex items-center justify-center p-12 bg-black/50">
              <PreviewPanel framework={framework} code={code} />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
