'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Smartphone, Play, Share2, Save, ArrowLeft, RefreshCw, X, ShieldAlert, Check, Loader2, Code2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import Editor from '@monaco-editor/react';
import { useAuthStore } from '@/lib/store/auth-store';
import { usePlaygroundStore } from '@/lib/store/playground-store';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase/client';
import { cn } from '@/lib/utils/cn';

// Sample snippets matching seeded database components
const SNIPPETS = [
  {
    name: 'Primary Button',
    frameworks: {
      'react-native': `import React from 'react';\nimport { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';\n\nexport default function PrimaryButton({ label = 'Click Me', loading = false, onPress }) {\n  return (\n    <TouchableOpacity \n      style={[styles.button, loading && styles.disabled]}\n      onPress={onPress}\n      disabled={loading}\n      activeOpacity={0.8}\n    >\n      {loading ? (\n        <ActivityIndicator color="#0A0A0B" />\n      ) : (\n        <Text style={styles.text}>{label}</Text>\n      )}\n    </TouchableOpacity>\n  );\n}\n\nconst styles = StyleSheet.create({\n  button: {\n    backgroundColor: '#FFCA03',\n    height: 48,\n    borderRadius: 8,\n    justifyContent: 'center',\n    alignItems: 'center',\n    paddingHorizontal: 24,\n    width: '100%',\n  },\n  disabled: {\n    opacity: 0.6,\n  },\n  text: {\n    color: '#0A0A0B',\n    fontSize: 16,\n    fontWeight: 'bold',\n  },\n});`,
      'expo': `import React from 'react';\nimport { Pressable, Text, StyleSheet, ActivityIndicator } from 'react-native';\n\nexport default function PrimaryButton({ label = 'Get Started', loading = false, onPress }) {\n  return (\n    <Pressable \n      style={({ pressed }) => [\n        styles.button,\n        pressed && styles.pressed,\n        loading && styles.disabled\n      ]}\n      onPress={onPress}\n      disabled={loading}\n    >\n      {loading ? (\n        <ActivityIndicator color="#0A0A0B" />\n      ) : (\n        <Text style={styles.text}>{label}</Text>\n      )}\n    </Pressable>\n  );\n}\n\nconst styles = StyleSheet.create({\n  button: {\n    backgroundColor: '#FFCA03',\n    height: 48,\n    borderRadius: 8,\n    justifyContent: 'center',\n    alignItems: 'center',\n    paddingHorizontal: 24,\n    width: '100%',\n  },\n  pressed: {\n    opacity: 0.8,\n  },\n  disabled: {\n    opacity: 0.6,\n  },\n  text: {\n    color: '#0A0A0B',\n    fontSize: 16,\n    fontWeight: 'bold',\n  },\n});`,
      'flutter': `import 'package:flutter/material.dart';\n\nclass PrimaryButton extends StatelessWidget {\n  final String label;\n  final bool loading;\n  final VoidCallback onPressed;\n\n  const PrimaryButton({\n    Key? key,\n    this.label = 'Click Me',\n    this.loading = false,\n    required this.onPressed,\n  }) : super(key: key);\n\n  @override\n  Widget build(BuildContext context) {\n    return SizedBox(\n      width: double.infinity,\n      height: 48,\n      child: ElevatedButton(\n        onPressed: loading ? null : onPressed,\n        style: ElevatedButton.styleFrom(\n          backgroundColor: const Color(0xFFFFCA03),\n          foregroundColor: const Color(0xFF0A0A0B),\n          shape: RoundedRectangleBorder(\n            borderRadius: BorderRadius.circular(8),\n          ),\n          elevation: 0,\n        ),\n        child: loading\n            ? const SizedBox(\n                width: 20,\n                height: 20,\n                child: CircularProgressIndicator(\n                  strokeWidth: 2,\n                  valueColor: AlwaysStoppedAnimation<Color>(Color(0xFF0A0A0B)),\n                ),\n              )\n            : Text(\n                label,\n                style: const TextStyle(\n                  fontWeight: FontWeight.bold,\n                  fontSize: 16,\n                ),\n              ),\n      ),\n    );\n  }\n}`
    }
  },
  {
    name: 'Profile Card',
    frameworks: {
      'react-native': `import React from 'react';\nimport { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';\n\nexport default function ProfileCard() {\n  return (\n    <View style={styles.card}>\n      <Image \n        source={{ uri: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=150&h=150&fit=crop' }}\n        style={styles.avatar}\n      />\n      <Text style={styles.name}>Julian Howard</Text>\n      <Text style={styles.handle}>@julian_dev</Text>\n      <Text style={styles.bio}>Full-stack mobile engineer building visual systems.</Text>\n      <TouchableOpacity style={styles.button}>\n        <Text style={styles.buttonText}>Follow</Text>\n      </TouchableOpacity>\n    </View>\n  );\n}\n\nconst styles = StyleSheet.create({\n  card: {\n    backgroundColor: '#18181B',\n    borderRadius: 12,\n    borderWidth: 1,\n    borderColor: '#27272A',\n    padding: 24,\n    alignItems: 'center',\n    width: '100%',\n  },\n  avatar: {\n    width: 64,\n    height: 64,\n    borderRadius: 32,\n    marginBottom: 12,\n    borderWidth: 2,\n    borderColor: '#FFCA03',\n  },\n  name: {\n    color: '#FAFAFA',\n    fontSize: 18,\n    fontWeight: 'bold',\n  },\n  handle: {\n    color: '#52525B',\n    fontSize: 12,\n    marginBottom: 12,\n  },\n  bio: {\n    color: '#A1A1AA',\n    fontSize: 13,\n    textAlign: 'center',\n    lineHeight: 18,\n    marginBottom: 16,\n  },\n  button: {\n    backgroundColor: '#FFCA03',\n    paddingHorizontal: 24,\n    paddingVertical: 8,\n    borderRadius: 8,\n  },\n  buttonText: {\n    color: '#0A0A0B',\n    fontWeight: 'bold',\n    fontSize: 13,\n  },\n});`,
      'expo': `import React from 'react';\nimport { View, Text, Image, StyleSheet, Pressable } from 'react-native';\n\nexport default function ProfileCard() {\n  return (\n    <View style={styles.card}>\n      <Image \n        source={{ uri: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=150&h=150&fit=crop' }}\n        style={styles.avatar}\n      />\n      <Text style={styles.name}>Julian Howard</Text>\n      <Text style={styles.handle}>@julian_dev</Text>\n      <Text style={styles.bio}>Full-stack mobile engineer building visual systems.</Text>\n      <Pressable style={styles.button}>\n        <Text style={styles.buttonText}>Follow</Text>\n      </Pressable>\n    </View>\n  );\n}\n\nconst styles = StyleSheet.create({\n  card: {\n    backgroundColor: '#18181B',\n    borderRadius: 12,\n    borderWidth: 1,\n    borderColor: '#27272A',\n    padding: 24,\n    alignItems: 'center',\n    width: '100%',\n  },\n  avatar: {\n    width: 64,\n    height: 64,\n    borderRadius: 32,\n    marginBottom: 12,\n    borderWidth: 2,\n    borderColor: '#FFCA03',\n  },\n  name: {\n    color: '#FAFAFA',\n    fontSize: 18,\n    fontWeight: 'bold',\n  },\n  handle: {\n    color: '#52525B',\n    fontSize: 12,\n    marginBottom: 12,\n  },\n  bio: {\n    color: '#A1A1AA',\n    fontSize: 13,\n    textAlign: 'center',\n    lineHeight: 18,\n    marginBottom: 16,\n  },\n  button: {\n    backgroundColor: '#FFCA03',\n    paddingHorizontal: 24,\n    paddingVertical: 8,\n    borderRadius: 8,\n  },\n  buttonText: {\n    color: '#0A0A0B',\n    fontWeight: 'bold',\n    fontSize: 13,\n  },\n});`,
      'flutter': `import 'package:flutter/material.dart';\n\nclass ProfileCard extends StatelessWidget {\n  const ProfileCard({Key? key}) : super(key: key);\n\n  @override\n  Widget build(BuildContext context) {\n    return Container(\n      padding: const EdgeInsets.all(24),\n      decoration: BoxDecoration(\n        color: const Color(0xFF18181B),\n        borderRadius: BorderRadius.circular(12),\n        border: Border.all(color: const Color(0xFF27272A)),\n      ),\n      child: Column(\n        mainAxisSize: MainAxisSize.min,\n        children: [\n          const CircleAvatar(\n            radius: 32,\n            backgroundImage: NetworkImage('https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=150&h=150&fit=crop'),\n          ),\n          const SizedBox(height: 12),\n          const Text(\n            'Julian Howard',\n            style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold),\n          ),\n          const Text(\n            '@julian_dev',\n            style: TextStyle(color: Color(0xFF52525B), fontSize: 12),\n          ),\n          const SizedBox(height: 12),\n          const Text(\n            'Full-stack mobile engineer building visual systems.',\n            textAlign: TextAlign.center,\n            style: TextStyle(color: Color(0xFFA1A1AA), fontSize: 13, height: 1.4),\n          ),\n          const SizedBox(height: 16),\n          ElevatedButton(\n            onPressed: () {},\n            style: ElevatedButton.styleFrom(\n              backgroundColor: const Color(0xFFFFCA03),\n              foregroundColor: const Color(0xFF0A0A0B),\n              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),\n            ),\n            child: const Text('Follow'),\n          ),\n        ],\n      ),\n    );\n  }\n}`
    }
  }
];

export default function PlaygroundPage() {
  const router = useRouter();
  const { user, profile } = useAuthStore();
  const { code, framework, device, setCode, setFramework, setDevice, resetCode } = usePlaygroundStore();

  const [saving, setSaving] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [copied, setCopied] = useState(false);

  // Formatter function (simple tab indent replacement)
  const handleFormat = () => {
    try {
      // Basic formatting helper
      const formatted = code
        .split('\n')
        .map((line) => line.trimRight())
        .join('\n');
      setCode(formatted);
      toast.success('Code formatted');
    } catch (err) {
      toast.error('Format failed');
    }
  };

  const handleSnippetSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (!val) return;
    
    const selected = SNIPPETS.find((s) => s.name === val);
    if (selected) {
      const codeKey = framework === 'flutter' ? 'flutter' : framework === 'expo' ? 'expo' : 'react-native';
      const snippetCode = selected.frameworks[codeKey as keyof typeof selected.frameworks];
      setCode(snippetCode);
      toast.success(`${selected.name} snippet loaded!`);
    }
    // reset selection
    e.target.value = '';
  };

  const handleSavePlayground = async () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    try {
      setSaving(true);
      // Call Supabase insertion logic to store playground project configurations
      const { data, error } = await supabase
        .from('submissions')
        .insert({
          title: `Playground ${framework.toUpperCase()} Project`,
          code,
          framework: framework === 'expo' ? 'expo' : framework === 'flutter' ? 'flutter' : 'react-native',
          user_id: user.id,
          status: 'pending'
        })
        .select()
        .single();

      if (error) throw error;
      toast.success('Playground project saved to your account!');
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || 'Failed to save playground.');
    } finally {
      setSaving(false);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    toast.success('Shareable playground link copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  const snackUrl = `https://snack.expo.dev/embedded?code=${encodeURIComponent(code)}&preview=true&platform=ios&theme=dark`;
  const dartPadUrl = `https://dartpad.dev/embed-flutter.html?theme=dark&run=true&split=0&code=${encodeURIComponent(code)}`;

  return (
    <div className="h-screen w-screen flex flex-col bg-[#0A0A0B] text-[#FAFAFA] overflow-hidden">
      
      {/* HEADER BAR */}
      <header className="h-16 shrink-0 border-b border-[#27272A]/50 bg-[#111113] px-6 flex items-center justify-between z-20">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FFCA03] text-black">
              <Code2 size={20} strokeWidth={2.5} />
            </div>
            <span className="font-display font-black text-base uppercase tracking-tight hidden sm:inline">Playground</span>
          </Link>
          <div className="h-5 w-px bg-[#27272A]/85" />
          
          {/* Framework dropdown selector */}
          <div className="relative">
            <select
              value={framework}
              onChange={(e) => setFramework(e.target.value as any)}
              className="h-9 px-3 pr-8 bg-[#18181B] border border-[#27272A]/50 rounded-lg text-xs font-black uppercase tracking-wider text-[#FFCA03] focus:outline-none cursor-pointer appearance-none min-w-[120px]"
            >
              <option value="react-native">React Native</option>
              <option value="expo">Expo</option>
              <option value="flutter">Flutter</option>
            </select>
          </div>
        </div>

        {/* Toolbar & options center/right */}
        <div className="flex items-center gap-3">
          {/* Device toggle selection */}
          <div className="flex bg-[#18181B] p-1 rounded-lg border border-[#27272A]/50 shrink-0">
            <button
              onClick={() => setDevice('iphone')}
              className={cn(
                "px-2.5 py-1 rounded text-[10px] font-black uppercase tracking-wider transition-all",
                device === 'iphone' ? "bg-[#FFCA03] text-black" : "text-[#52525B] hover:text-white"
              )}
            >
              iPhone
            </button>
            <button
              onClick={() => setDevice('android')}
              className={cn(
                "px-2.5 py-1 rounded text-[10px] font-black uppercase tracking-wider transition-all",
                device === 'android' ? "bg-[#FFCA03] text-black" : "text-[#52525B] hover:text-white"
              )}
            >
              Android
            </button>
          </div>

          <Button
            onClick={handleShare}
            variant="outline"
            className="h-9 rounded-lg border-[#27272A] text-white hover:bg-white/5 text-xs font-bold uppercase tracking-wider"
          >
            <Share2 size={14} className="mr-1.5" /> Share
          </Button>

          <Button
            onClick={handleSavePlayground}
            disabled={saving}
            className="h-9 rounded-lg btn-primary border-0 text-xs font-black uppercase tracking-wider"
          >
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} className="mr-1.5" />}
            Save
          </Button>

          <div className="h-5 w-px bg-[#27272A]/85" />
          
          {/* User profile avatar or log-in trigger */}
          {user ? (
            <Link href="/dashboard" className="h-8 w-8 rounded-full bg-[#FFCA03] flex items-center justify-center text-black font-black text-xs uppercase cursor-pointer">
              {profile?.full_name?.charAt(0) || user.email?.charAt(0) || 'U'}
            </Link>
          ) : (
            <Link href="/login" className="text-xs font-black text-[#A1A1AA] hover:text-[#FFCA03] uppercase tracking-widest pl-1">
              Sign In
            </Link>
          )}
        </div>
      </header>

      {/* SPLIT PANEL SECTION */}
      <div className="flex-1 min-h-0 bg-[#0A0A0B] relative">
        <PanelGroup direction="horizontal">
          
          {/* LEFT PANEL: CODE EDITOR & SNIPPET OPTIONS */}
          <Panel defaultSize={50} minSize={30} className="flex flex-col h-full bg-[#050506]">
            
            {/* Editor toolbar */}
            <div className="h-12 shrink-0 border-b border-[#27272A]/50 bg-[#111113]/80 px-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-black uppercase text-[#52525B] tracking-widest">Editor Canvas</span>
              </div>
              <div className="flex items-center gap-3">
                
                {/* Snippets selection dropdown */}
                <select
                  onChange={handleSnippetSelect}
                  defaultValue=""
                  className="h-8 px-2 bg-black border border-[#27272A]/60 rounded text-[10px] font-black uppercase tracking-wider text-[#A1A1AA] focus:outline-none cursor-pointer"
                >
                  <option value="">-- Load Snippet --</option>
                  {SNIPPETS.map((snip) => (
                    <option key={snip.name} value={snip.name}>{snip.name}</option>
                  ))}
                </select>

                <button
                  onClick={handleFormat}
                  className="text-[10px] font-black uppercase text-[#A1A1AA] hover:text-[#FFCA03] transition-colors"
                >
                  Format
                </button>
                <button
                  onClick={resetCode}
                  className="text-[10px] font-black uppercase text-red-500/80 hover:text-red-500 transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Monaco Editor Container */}
            <div className="flex-grow min-h-0 overflow-hidden bg-black">
              <Editor
                height="100%"
                language={framework === 'flutter' ? 'dart' : 'typescript'}
                theme="vs-dark"
                value={code}
                onChange={(val) => setCode(val || '')}
                options={{
                  fontSize: 14,
                  fontFamily: "'JetBrains Mono', monospace",
                  minimap: { enabled: false },
                  wordWrap: 'off',
                  lineNumbers: 'on',
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  padding: { top: 16, bottom: 16 },
                }}
              />
            </div>
          </Panel>

          {/* DRAGGABLE DIVIDER RESIZE HANDLE */}
          <PanelResizeHandle className="w-[3px] bg-[#27272A]/30 hover:bg-[#FFCA03]/40 cursor-col-resize transition-colors z-10" />

          {/* RIGHT PANEL: LIVE EMULATOR PREVIEW VIEW */}
          <Panel defaultSize={50} minSize={30} className="flex flex-col h-full bg-[#0A0A0B]">
            <div className="h-12 shrink-0 border-b border-[#27272A]/50 bg-[#111113]/80 px-4 flex items-center justify-between">
              <span className="text-[10px] font-black uppercase text-[#52525B] tracking-widest">Active Device Emulator</span>
              <button
                onClick={() => toast.success('Preview refreshed')}
                className="text-[10px] font-black uppercase text-[#A1A1AA] hover:text-[#FFCA03] transition-colors flex items-center gap-1"
              >
                <RefreshCw size={11} /> Refresh
              </button>
            </div>

            {/* Device Rendering Canvas Area */}
            <div className="flex-1 flex flex-col items-center justify-center p-6 bg-black relative">
              <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />
              
              {/* Device Physical Mockup */}
              <div className="relative w-[280px] h-[550px] bg-[#0A0A0B] rounded-[3rem] border-[10px] border-[#1C1C1E] shadow-2xl p-3 flex flex-col overflow-hidden">
                
                {/* Notch dynamics */}
                {device === 'iphone' ? (
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-full z-20 flex items-center justify-center" />
                ) : (
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-black rounded-full z-20" />
                )}

                {/* Device Screen Frame Viewport */}
                <div className="flex-grow rounded-[2rem] bg-[#111113] overflow-hidden relative border border-[#27272A]/50">
                  {framework === 'flutter' ? (
                    // Flutter DartPad rendering button
                    <div className="w-full h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                      <Code2 className="text-[#3B82F6]/60" size={36} />
                      <p className="text-[10px] font-black uppercase tracking-wider text-[#52525B]">Flutter DartPad preview</p>
                      <Button
                        asChild
                        className="h-10 rounded-lg btn-primary border-0 text-[10px] font-black uppercase tracking-wider px-4"
                      >
                        <a href={dartPadUrl} target="_blank" rel="noopener noreferrer">
                          Preview in DartPad →
                        </a>
                      </Button>
                    </div>
                  ) : (
                    // React Native/Expo Snack Embedded iframe
                    <iframe
                      src={snackUrl}
                      className="w-full h-full border-none bg-black"
                      title="React Native Preview"
                      key={`${framework}-${device}`}
                    />
                  )}
                </div>

                {device === 'iphone' && (
                  <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 w-24 h-1 bg-white/30 rounded-full" />
                )}
              </div>
            </div>
          </Panel>
        </PanelGroup>
      </div>

      {/* LOGIN ERROR NOTIFICATION DIALOG MODAL */}
      <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
        <DialogContent className="sm:max-w-md bg-[#111113] border border-[#27272A]/85 text-[#FAFAFA] rounded-2xl p-6">
          <DialogHeader className="space-y-3">
            <div className="h-12 w-12 rounded-full bg-[#FFCA03]/10 border border-[#FFCA03]/20 flex items-center justify-center mx-auto text-[#FFCA03] mb-2">
              <ShieldAlert size={24} />
            </div>
            <DialogTitle className="text-center font-display font-black text-xl uppercase tracking-tight">Login Required</DialogTitle>
            <DialogDescription className="text-center text-[#A1A1AA] text-sm font-medium">
              You must log in to your MOBOUI developer profile to save custom playground configurations.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 mt-6">
            <Button
              variant="outline"
              onClick={() => setShowAuthModal(false)}
              className="flex-1 h-12 rounded-xl border-[#27272A] text-white hover:bg-white/5"
            >
              Cancel
            </Button>
            <Button
              asChild
              onClick={() => setShowAuthModal(false)}
              className="flex-1 h-12 rounded-xl btn-primary border-0"
            >
              <Link href="/login" className="flex items-center justify-center">
                Sign In
              </Link>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
