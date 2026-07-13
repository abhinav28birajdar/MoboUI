"use client";

import React, { useState, useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import { 
  Folder, FileCode, Package, Cpu, LayoutGrid, Users, BookOpen, GraduationCap, Settings,
  Play, RotateCcw, Smartphone, Laptop, ZoomIn, ZoomOut, Image, QrCode, Terminal as TerminalIcon, 
  Trash2, RefreshCw, Send, Check, Code, Sparkles, Search, Plus, Trash, Edit, X, Save, Share2, 
  Download, ArrowUpRight, HelpCircle, FileText, ChevronRight, User, MessageSquare
} from "lucide-react";
import { usePlaygroundStore, EditorSettings } from "@/lib/store/playground-store";
import { TEMPLATES_DATA, COMPONENT_LIBRARY, DOCS_DATA, TUTORIALS } from "@/lib/data/playground-templates";
import { FileExplorer } from "./file-explorer";
import { PlaygroundToolbar } from "./playground-toolbar";
import { MonacoEditorWrapper } from "./monaco-editor";
import { BottomPanel } from "./bottom-panel";
import { EmulatorPanel } from "./emulator-panel";
import { ReactNativePreview } from "./ReactNativePreview";
import { FlutterPreview } from "./FlutterPreview";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase/client";



interface PlaygroundIDEProps {
  initialCode?: string;
  initialFramework?: 'react-native' | 'expo' | 'flutter';
}

export function PlaygroundIDE({ initialCode, initialFramework }: PlaygroundIDEProps) {
  // Store integration
  const {
    code, framework, device, files, activeFile, openTabs, activeSidebarTab,
    terminalLogs, consoleLogs, editorSettings, packages, projects, activeProjectId,
    setCode, setFramework, setDevice, updateFile, setActiveFile, openFileInTab,
    closeFileTab, setActiveSidebarTab, addTerminalLog, clearTerminalLogs,
    addConsoleLog, clearConsoleLogs, updateEditorSettings, installPackage, removePackage,
    createProject, deleteProject, loadProject, duplicateProject, renameProject, resetCode
  } = usePlaygroundStore();

  const editorRef = useRef<any>(null);
  const monacoRef = useRef<any>(null);

  // States
  
  
  // AI assistant states
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiChat, setAiChat] = useState<Array<{ sender: 'user' | 'assistant'; text: string }>>([
    { sender: 'assistant', text: "Hello! I am your AI Development Assistant. Click any of the shortcut actions below, or ask me to write a custom widget/screen for you!" }
  ]);
  const [aiLoading, setAiLoading] = useState(false);

  // Package Manager Search
  const [pkgSearch, setPkgSearch] = useState("");

  // Projects list UI states
  const [newProjName, setNewProjName] = useState("");
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameText, setRenameText] = useState("");

  // Collaboration mock states
  const [chatInput, setChatInput] = useState("");
  const [collabMessages, setCollabMessages] = useState<Array<{ user: string; text: string; time: string }>>([
    { user: "abhinav", text: "Working on the main layout", time: "15:02" },
    { user: "copilot", text: "Would you like me to optimize the flex grid properties?", time: "15:03" }
  ]);

  // Apply initial codes if provided
  useEffect(() => {
    if (initialFramework) {
      setFramework(initialFramework);
    }
    if (initialCode) {
      setCode(initialCode);
    }
  }, [initialCode, initialFramework]);

  // Handle Collaborative Playground Loading & Realtime
  const params = useParams();
  const sessionId = params?.id as string | undefined;

  useEffect(() => {
    if (!sessionId) return;

    let channel: any;

    const fetchSessionAndConnect = async () => {
      try {
        const res = await fetch(`/api/playground/${sessionId}`);
        if (res.ok) {
          const data = await res.json();
          // Hydrate the store
          if (data.active_framework) setFramework(data.active_framework);
          if (data.device_type) setDevice(data.device_type);
          
          let fetchedCode = '';
          if (data.active_framework === 'flutter') fetchedCode = data.code_flutter;
          if (data.active_framework === 'react-native') fetchedCode = data.code_react_native;
          if (data.active_framework === 'expo') fetchedCode = data.code_expo;
          if (data.active_framework === 'web') fetchedCode = data.code_web;
          
          if (fetchedCode) setCode(fetchedCode);
          
          toast.success("Joined shared playground session");

          // Connect to Supabase Realtime for this session
          if (supabase) {
            channel = supabase.channel(`playground:${sessionId}`, {
              config: { presence: { key: 'viewer' } }
            });

            channel
              .on('presence', { event: 'sync' }, () => {
                const newState = channel.presenceState();
                // You could parse the newState to show active viewers avatars here
              })
              .on('broadcast', { event: 'code-change' }, (payload: any) => {
                if (payload.code) {
                  setCode(payload.code);
                }
              })
              .subscribe((status: string) => {
                if (status === 'SUBSCRIBED') {
                  channel.track({ online_at: new Date().toISOString() });
                }
              });
          }
        }
      } catch (err) {
        console.error("Failed to fetch session", err);
        toast.error("Failed to load shared playground");
      }
    };

    fetchSessionAndConnect();

    return () => {
      if (channel) supabase.removeChannel(channel);
    };
  }, [sessionId]);

  // Handle Code Changes and Broadcast
  const handleEditorChange = (value: string | undefined) => {
    if (value === undefined) return;
    setCode(value);
    
    // Broadcast if in a shared session
    if (sessionId && supabase) {
      const channel = supabase.channel(`playground:${sessionId}`);
      // Send the broadcast (doesn't wait for response)
      channel.send({
        type: 'broadcast',
        event: 'code-change',
        payload: { code: value }
      });
    }
  };

  // Handle Monaco Mount
  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
  };

  // Insert code at active Monaco cursor
  const handleInsertCodeSnippet = (snippet: string) => {
    if (editorRef.current && monacoRef.current) {
      const editor = editorRef.current;
      const monaco = monacoRef.current;
      const position = editor.getPosition();
      const range = new monaco.Range(
        position.lineNumber,
        position.column,
        position.lineNumber,
        position.column
      );
      editor.executeEdits("playground", [
        {
          range,
          text: snippet,
          forceMoveMarkers: true,
        },
      ]);
      editor.focus();
      toast.success("Code snippet inserted!");
    } else {
      setCode(code + "\n" + snippet);
      toast.success("Code snippet appended!");
    }
  };

  

  // AI Assistant trigger actions
  const handleAiAction = (actionType: 'explain' | 'optimize' | 'convert' | 'fix') => {
    setAiLoading(true);
    let promptText = "";
    if (actionType === 'explain') promptText = `Explain the following code snippet:\n${code}`;
    else if (actionType === 'optimize') promptText = `Optimize performance for the current components:\n${code}`;
    else if (actionType === 'fix') promptText = `Look for errors and write fixes:\n${code}`;
    else promptText = `Convert the code from ${framework === 'flutter' ? 'Flutter' : 'React Native'} to ${framework === 'flutter' ? 'React Native' : 'Flutter'}:\n${code}`;

    setAiChat(prev => [...prev, { sender: 'user', text: `Run command: ${actionType.toUpperCase()}` }]);

    setTimeout(() => {
      setAiLoading(false);
      let reply = "";
      if (actionType === 'explain') {
        reply = `Here is a breakdown of your current file:
1. **Component Design**: The container sets a dark layout matching MoboUI's visual aesthetic.
2. **State Management**: Uses state hooks that trigger updates when interactive nodes are tapped.
3. **Structure**: Utilizes flex box properties (${framework === 'flutter' ? 'Columns/Rows' : 'flexDirection'}) to position elements neatly.`;
      } else if (actionType === 'optimize') {
        reply = `I have optimized the current template. Major changes:
- Converted structural children layout to use caching.
- Optimized border shadow rendering to decrease composition passes.
- Cleaned up duplicate styling nodes.

Click "Apply Code" to overwrite the editor with the optimized version.`;
      } else if (actionType === 'fix') {
        reply = `All checks passed! No compilation or structural bugs found. Syntax checks are perfectly balanced.`;
      } else {
        reply = `Here is the converted component:

\`\`\`${framework === 'flutter' ? 'javascript' : 'dart'}
${framework === 'flutter' ? '// React Native conversion\nexport default function App() {\n  return <Text>Converted</Text>;\n}' : '// Flutter conversion\nclass ConvertedWidget extends StatelessWidget {\n  Widget build(c) => Text("Converted");\n}'}
\`\`\``;
      }
      setAiChat(prev => [...prev, { sender: 'assistant', text: reply }]);
    }, 1200);
  };

  const handleCustomAiChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiPrompt.trim()) return;

    const userText = aiPrompt;
    setAiChat(prev => [...prev, { sender: 'user', text: userText }]);
    setAiPrompt("");
    setAiLoading(true);

    setTimeout(() => {
      setAiLoading(false);
      setAiChat(prev => [...prev, {
        sender: 'assistant',
        text: `Based on your request "${userText}", here is a helpful developer recommendation:
- For high-performance responsive spacing, use dynamic dimensions.
- Keep variables clean in hooks/builders.
- You can add code templates using the **Components** sidebar tab.`
      }]);
    }, 1000);
  };

  

  // Handle template selection
  const handleSelectTemplate = (templateKey: 'calculator' | 'todo') => {
    const data = TEMPLATES_DATA[templateKey];
    if (data) {
      const targetFramework = framework === 'flutter' ? 'flutter' : 'react-native';
      const projFiles = data[targetFramework];
      if (projFiles) {
        Object.entries(projFiles).forEach(([path, content]) => {
          updateFile(path, content as string);
        });
        const mainFile = framework === 'flutter' ? 'lib/main.dart' : 'App.js';
        setActiveFile(mainFile);
        toast.success(`Loaded ${templateKey} starter template!`);
      }
    }
  };

  // Search Packages List
  const simulatedPackages = [
    { name: "react-navigation", desc: "Routing and navigation for React Native apps" },
    { name: "react-native-reanimated", desc: "Powerful animation library for React Native" },
    { name: "react-native-screens", desc: "Native navigation container optimization" },
    { name: "provider", desc: "State management wrapper for Flutter widget trees" },
    { name: "shared_preferences", desc: "Key-value persistent offline caching" },
    { name: "dio", desc: "HTTP network request handler for Dart/Flutter" }
  ].filter(pkg => pkg.name.toLowerCase().includes(pkgSearch.toLowerCase()));

  return (
    <div className="h-[calc(100vh-80px)] flex flex-col bg-[#050506] text-white overflow-hidden relative">
      
      <PlaygroundToolbar />

      {/* WORKSPACE DIVIDER CONTAINER */}
      <div className="flex-grow flex min-h-0">
        
        {/* ACTIVITY BAR - VERTICAL LINE (LEFTMOST) */}
        <div className="w-12 bg-zinc-950 border-r border-zinc-900 flex flex-col justify-between py-4 select-none shrink-0 items-center">
          <div className="flex flex-col gap-2 w-full items-center">
            {[
              { id: 'explorer', icon: Folder, tooltip: "File Explorer" },
              { id: 'components', icon: LayoutGrid, tooltip: "Components Library" },
              { id: 'packages', icon: Package, tooltip: "Package Manager" },
              { id: 'assistant', icon: Cpu, tooltip: "AI Dev Assistant" },
              { id: 'templates', icon: Code, tooltip: "Project Templates" },
              { id: 'collaboration', icon: Users, tooltip: "Collaboration" },
              { id: 'docs', icon: BookOpen, tooltip: "API Documentation" },
              { id: 'learning', icon: GraduationCap, tooltip: "Tutorials Hub" },
            ].map((tab) => {
              const Icon = tab.icon;
              const active = activeSidebarTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveSidebarTab(tab.id as any)}
                  className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center transition-all group relative",
                    active ? "bg-zinc-900 text-[#C026D3] border-l-2 border-[#C026D3]" : "text-zinc-500 hover:text-white"
                  )}
                  title={tab.tooltip}
                >
                  <Icon size={18} />
                </button>
              );
            })}
          </div>

          <div>
            <button
              onClick={() => setActiveSidebarTab('settings')}
              className={cn(
                "w-10 h-10 rounded-lg flex items-center justify-center transition-all text-zinc-500 hover:text-white",
                activeSidebarTab === 'settings' && "bg-zinc-900 text-[#C026D3]"
              )}
            >
              <Settings size={18} />
            </button>
          </div>
        </div>

        {/* EXPANDABLE SIDEBAR */}
        <div className="w-72 bg-zinc-950/50 border-r border-zinc-900 flex flex-col shrink-0 min-h-0 select-none">
          
          {/* SIDEBAR TITLE */}
          <div className="h-10 border-b border-zinc-900/60 px-4 flex items-center bg-zinc-950/20">
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
              {activeSidebarTab === 'explorer' && "Workspace Explorer"}
              {activeSidebarTab === 'components' && "MoboUI Component Library"}
              {activeSidebarTab === 'packages' && "Package Installer"}
              {activeSidebarTab === 'assistant' && "AI Sandbox Agent"}
              {activeSidebarTab === 'templates' && "Starter Templates"}
              {activeSidebarTab === 'collaboration' && "Interactive Share"}
              {activeSidebarTab === 'docs' && "API Reference Catalogs"}
              {activeSidebarTab === 'learning' && "Developer Lab Lessons"}
              {activeSidebarTab === 'settings' && "Playground Configs"}
            </span>
          </div>

          {/* SIDEBAR SCROLL AREA */}
          <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
            
            {/* FILE EXPLORER VIEW */}
            {activeSidebarTab === 'explorer' && (
              <FileExplorer />
            )}

            {/* COMPONENT LIBRARY PANEL */}
            {activeSidebarTab === 'components' && (
              <div className="space-y-4">
                <p className="text-[11px] text-zinc-400 leading-relaxed font-medium mb-3">
                  Click a component snippet to insert it directly into the Monaco editor canvas at your current cursor position.
                </p>
                <div className="flex flex-col gap-2">
                  {(COMPONENT_LIBRARY[framework === 'flutter' ? 'flutter' : 'react-native'] || []).map((comp) => (
                    <button
                      key={comp.name}
                      onClick={() => handleInsertCodeSnippet(comp.code)}
                      className="flex items-center justify-between w-full p-2.5 rounded-lg border border-zinc-900 bg-zinc-950 text-left hover:border-[#C026D3]/40 transition-all group"
                    >
                      <div>
                        <span className="text-xs font-bold text-zinc-200 group-hover:text-[#C026D3]">{comp.name}</span>
                        <p className="text-[9px] text-zinc-500 font-semibold uppercase tracking-wider">{framework === 'flutter' ? 'Widget' : 'Component'}</p>
                      </div>
                      <Plus size={12} className="text-zinc-500 group-hover:text-white" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* PACKAGE MANAGER VIEW */}
            {activeSidebarTab === 'packages' && (
              <div className="space-y-4">
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-2.5 text-zinc-500" />
                  <input
                    type="text"
                    value={pkgSearch}
                    onChange={(e) => setPkgSearch(e.target.value)}
                    placeholder="Search packages..."
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-9 pr-4 py-1.5 text-xs text-zinc-300 focus:outline-none"
                  />
                </div>

                <div className="space-y-2 mt-4">
                  <span className="text-[9px] font-black text-zinc-500 uppercase tracking-wider block mb-2">Installed Dependencies</span>
                  <div className="flex flex-wrap gap-1.5">
                    {packages.map(p => (
                      <span key={p} className="flex items-center gap-1 px-2 py-1 bg-zinc-900 text-[10px] rounded border border-zinc-800 text-zinc-300">
                        <span>{p}</span>
                        <X size={10} className="cursor-pointer text-zinc-500 hover:text-red-500" onClick={() => removePackage(p)} />
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 mt-6">
                  <span className="text-[9px] font-black text-zinc-500 uppercase tracking-wider block mb-2">Available online</span>
                  {simulatedPackages.map(pkg => {
                    const isInstalled = packages.includes(pkg.name);
                    return (
                      <div key={pkg.name} className="p-3 bg-zinc-950/80 border border-zinc-900 rounded-xl space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-black text-zinc-300">{pkg.name}</span>
                          <button
                            onClick={() => isInstalled ? removePackage(pkg.name) : installPackage(pkg.name)}
                            className={cn(
                              "px-2 py-1 rounded text-[9px] font-black uppercase tracking-wider",
                              isInstalled ? "bg-red-950 text-red-400 border border-red-900" : "bg-[#C026D3] text-black"
                            )}
                          >
                            {isInstalled ? "Uninstall" : "Install"}
                          </button>
                        </div>
                        <p className="text-[10px] text-zinc-500 font-medium leading-relaxed">{pkg.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* AI ASSISTANT PANEL */}
            {activeSidebarTab === 'assistant' && (
              <div className="flex flex-col h-full space-y-4">
                <span className="text-[10px] font-black uppercase text-zinc-500 tracking-wider">Quick Actions</span>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => handleAiAction('explain')} className="flex items-center gap-1.5 p-2 bg-zinc-900 border border-zinc-800 rounded-lg text-left text-[11px] font-bold text-zinc-300 hover:border-[#C026D3]/40">
                    <Sparkles size={11} className="text-[#C026D3]" /> Explain Code
                  </button>
                  <button onClick={() => handleAiAction('optimize')} className="flex items-center gap-1.5 p-2 bg-zinc-900 border border-zinc-800 rounded-lg text-left text-[11px] font-bold text-zinc-300 hover:border-[#C026D3]/40">
                    <Code size={11} className="text-purple-400" /> Optimize
                  </button>
                  <button onClick={() => handleAiAction('convert')} className="flex items-center gap-1.5 p-2 bg-zinc-900 border border-zinc-800 rounded-lg text-left text-[11px] font-bold text-zinc-300 hover:border-[#C026D3]/40">
                    <RefreshCw size={11} className="text-cyan-400" /> Convert F⇄RN
                  </button>
                  <button onClick={() => handleAiAction('fix')} className="flex items-center gap-1.5 p-2 bg-zinc-900 border border-zinc-800 rounded-lg text-left text-[11px] font-bold text-zinc-300 hover:border-[#C026D3]/40">
                    <HelpCircle size={11} className="text-green-400" /> Check Bugs
                  </button>
                </div>

                <div className="h-px bg-zinc-900/60 my-4" />

                <div className="flex-grow flex flex-col space-y-3 min-h-[160px] bg-zinc-950 p-3 rounded-xl border border-zinc-900 overflow-y-auto max-h-[260px] custom-scrollbar">
                  {aiChat.map((chat, i) => (
                    <div key={i} className={cn("flex flex-col gap-1 text-[11px] max-w-[85%] rounded-lg p-2.5", chat.sender === 'user' ? "bg-zinc-900/80 text-zinc-300 self-end" : "bg-[#C026D3]/5 border border-[#C026D3]/10 text-zinc-200 self-start")}>
                      <span className="text-[8px] uppercase tracking-wider text-zinc-500">{chat.sender === 'user' ? "You" : "AI Assistant"}</span>
                      <p className="leading-relaxed whitespace-pre-wrap">{chat.text}</p>
                    </div>
                  ))}
                  {aiLoading && (
                    <div className="flex items-center gap-2 text-zinc-500 text-[10px] animate-pulse">
                      <Sparkles size={11} className="animate-spin text-[#C026D3]" />
                      <span>Thinking...</span>
                    </div>
                  )}
                </div>

                <form onSubmit={handleCustomAiChat} className="flex gap-2">
                  <input
                    type="text"
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    placeholder="Ask AI to write code..."
                    className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-zinc-300 focus:outline-none"
                  />
                  <button type="submit" className="h-8 w-8 bg-[#C026D3] text-black rounded-lg flex items-center justify-center hover:bg-[#C026D3]/90">
                    <Send size={12} />
                  </button>
                </form>
              </div>
            )}

            {/* STARTER TEMPLATES VIEW */}
            {activeSidebarTab === 'templates' && (
              <div className="space-y-4">
                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block mb-2">Framework Templates</span>
                <div className="flex flex-col gap-3">
                  <div className="p-3.5 bg-zinc-950/70 border border-zinc-900 rounded-xl space-y-2 hover:border-[#C026D3]/30 transition-all cursor-pointer" onClick={() => handleSelectTemplate('calculator')}>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-zinc-200">Calculator App</span>
                      <ArrowUpRight size={12} className="text-zinc-500" />
                    </div>
                    <p className="text-[10px] text-zinc-500 font-semibold leading-relaxed">Full grid layout calculator with state hooks logic.</p>
                  </div>

                  <div className="p-3.5 bg-zinc-950/70 border border-zinc-900 rounded-xl space-y-2 hover:border-[#C026D3]/30 transition-all cursor-pointer" onClick={() => handleSelectTemplate('todo')}>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-zinc-200">Todo Tasks List</span>
                      <ArrowUpRight size={12} className="text-zinc-500" />
                    </div>
                    <p className="text-[10px] text-zinc-500 font-semibold leading-relaxed">Simple todo list with addition, removal, and visual cards.</p>
                  </div>
                </div>
              </div>
            )}

            {/* INTERACTIVE SHARING VIEW */}
            {activeSidebarTab === 'collaboration' && (
              <div className="space-y-4">
                <div className="p-3.5 bg-zinc-900/20 border border-zinc-900 rounded-xl space-y-3 text-center">
                  <Users className="mx-auto text-zinc-400" size={24} />
                  <span className="text-xs font-black text-zinc-300 uppercase tracking-wide block">Mock Live Share</span>
                  <p className="text-[10px] text-zinc-500 leading-relaxed font-semibold">Generate a sharing token to collaborate with your team in real time.</p>
                  <button onClick={() => {
                    navigator.clipboard.writeText("https://moboui.dev/live-share/7ig2ba9");
                    toast.success("Live Share link copied to clipboard!");
                  }} className="w-full py-1.5 bg-[#C026D3]/10 text-[#C026D3] border border-[#C026D3]/20 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-[#C026D3]/25 transition-all">
                    Start Session
                  </button>
                </div>

                <div className="space-y-2">
                  <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest block mb-2">Session Users</span>
                  <div className="flex items-center gap-3 px-1">
                    <span className="h-2 w-2 rounded-full bg-green-500" />
                    <span className="text-xs text-zinc-300 font-bold">abhinav (you)</span>
                  </div>
                  <div className="flex items-center gap-3 px-1">
                    <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs text-zinc-300 font-bold">copilot (AI agent)</span>
                  </div>
                </div>

                <div className="space-y-2.5 mt-6 border-t border-zinc-900/60 pt-4">
                  <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest block mb-1">Inline Comments</span>
                  <div className="space-y-2 max-h-[160px] overflow-y-auto">
                    {collabMessages.map((m, idx) => (
                      <div key={idx} className="p-2 bg-zinc-950 border border-zinc-900/50 rounded-lg text-[10px] leading-relaxed">
                        <div className="flex justify-between font-bold text-zinc-400 mb-1">
                          <span>@{m.user}</span>
                          <span className="opacity-65 text-[8px]">{m.time}</span>
                        </div>
                        <p className="text-zinc-300 font-medium">{m.text}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex gap-2 mt-2">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Comment..."
                      className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-2 py-1 text-xs text-zinc-300 focus:outline-none"
                    />
                    <button onClick={() => {
                      if (!chatInput) return;
                      setCollabMessages([...collabMessages, { user: "abhinav", text: chatInput, time: new Date().toLocaleTimeString().substring(0, 5) }]);
                      setChatInput("");
                    }} className="h-7 px-2 bg-zinc-850 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 rounded-lg text-xs">
                      Send
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* DOCUMENTATION PANEL */}
            {activeSidebarTab === 'docs' && (
              <div className="space-y-4">
                <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest block mb-2">API Documentation</span>
                {DOCS_DATA[framework === 'flutter' ? 'flutter' : 'react-native'].map((doc) => (
                  <div key={doc.title} className="p-3 bg-zinc-950 border border-zinc-900 rounded-xl space-y-2">
                    <h4 className="text-xs font-black text-[#C026D3]">{doc.title}</h4>
                    <p className="text-[10px] text-zinc-500 font-semibold leading-relaxed">{doc.body}</p>
                  </div>
                ))}
                <a href={framework === 'flutter' ? "https://docs.flutter.dev" : "https://reactnative.dev/docs/getting-started"} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-zinc-400 hover:text-white mt-4 block text-center">
                  <span>View Full Website Docs</span> <ArrowUpRight size={10} />
                </a>
              </div>
            )}

            {/* TUTORIAL LESSONS HUB */}
            {activeSidebarTab === 'learning' && (
              <div className="space-y-4">
                <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest block mb-2">Interactive Challenges</span>
                <div className="flex flex-col gap-3">
                  {TUTORIALS.map((tut) => (
                    <div key={tut.title} className="p-3.5 bg-zinc-950 border border-zinc-900 rounded-xl space-y-2 hover:border-[#C026D3]/20 transition-all cursor-pointer">
                      <div className="flex justify-between items-center">
                        <h4 className="text-xs font-black text-zinc-200 leading-snug">{tut.title}</h4>
                        <span className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 text-[8px] text-[#C026D3] font-bold uppercase rounded">{tut.xp}</span>
                      </div>
                      <p className="text-[10px] text-zinc-500 font-semibold leading-relaxed">{tut.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CONFIGURATION OPTIONS PANEL */}
            {activeSidebarTab === 'settings' && (
              <div className="space-y-4">
                <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest block mb-2">IDE Configuration</span>
                
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-wider">Font Size: {editorSettings.fontSize}px</label>
                    <input
                      type="range"
                      min={10}
                      max={20}
                      value={editorSettings.fontSize}
                      onChange={(e) => updateEditorSettings({ fontSize: parseInt(e.target.value) })}
                      className="w-full accent-[#C026D3]"
                    />
                  </div>

                  <div className="space-y-1.5 flex justify-between items-center">
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-wider">Line Numbers</label>
                    <input
                      type="checkbox"
                      checked={editorSettings.lineNumbers === 'on'}
                      onChange={(e) => updateEditorSettings({ lineNumbers: e.target.checked ? 'on' : 'off' })}
                      className="rounded bg-zinc-900 border-zinc-800 accent-[#C026D3]"
                    />
                  </div>

                  <div className="space-y-1.5 flex justify-between items-center">
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-wider">Minimap Viewer</label>
                    <input
                      type="checkbox"
                      checked={editorSettings.minimap}
                      onChange={(e) => updateEditorSettings({ minimap: e.target.checked })}
                      className="rounded bg-zinc-900 border-zinc-800 accent-[#C026D3]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-wider">Cursor Animation</label>
                    <select
                      value={editorSettings.cursorAnimation}
                      onChange={(e) => updateEditorSettings({ cursorAnimation: e.target.value as any })}
                      className="w-full h-8 bg-zinc-900 border border-zinc-800 rounded px-2 text-xs"
                    >
                      <option value="blink">Blink</option>
                      <option value="smooth">Smooth</option>
                      <option value="phase">Phase</option>
                      <option value="expand">Expand</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
            
          </div>
        </div>

        {/* EDITOR AREA & CODE CANVAS (CENTER SPLIT) */}
        <div className="flex-1 flex flex-col min-w-0 bg-black">
          
          {/* EDITOR TABS BAR */}
          <div className="h-10 border-b border-zinc-900 bg-zinc-950 flex items-center justify-between px-4 select-none overflow-x-auto shrink-0 scrollbar-none">
            <div className="flex items-center gap-1.5">
              {openTabs.map((path) => {
                const isActive = activeFile === path;
                const basename = path.includes('/') ? path.split('/').pop() : path;
                return (
                  <div
                    key={path}
                    className={cn(
                      "flex items-center gap-2 h-7 px-3 rounded-t-lg text-[11px] font-bold cursor-pointer transition-all border-t-2 border-transparent",
                      isActive ? "bg-black text-[#C026D3] border-t-[#C026D3]" : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/30"
                    )}
                    onClick={() => setActiveFile(path)}
                  >
                    <span>{basename}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        closeFileTab(path);
                      }}
                      className="text-zinc-500 hover:text-red-500 transition-colors ml-1"
                    >
                      <X size={10} />
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  try {
                    // Simple formatting helper
                    const formatted = code
                      .split("\n")
                      .map((line) => line.trimEnd())
                      .join("\n");
                    setCode(formatted);
                    toast.success("Code formatted!");
                  } catch (err) {
                    toast.error("Format error.");
                  }
                }}
                className="text-[10px] font-black uppercase text-zinc-500 hover:text-white"
              >
                Format
              </button>
            </div>
          </div>

          {/* MONACO CODE EDITOR CANVAS */}
          <MonacoEditorWrapper onMount={handleEditorDidMount} />

          {/* RESIZABLE LOGS / TERMINAL LOWER CONTAINER */}
          <BottomPanel />
        </div>

        {/* LIVE MOBILE PREVIEW COLUMN (RIGHT SPLIT) */}
        <EmulatorPanel />

      </div>

      {/* FOOTER STATUS BAR */}
      <div className="h-6 border-t border-zinc-900 bg-zinc-950 flex items-center justify-between px-6 text-[10px] font-bold text-zinc-500 select-none shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            <span>IDE Status: Connected</span>
          </div>
          <span>•</span>
          <span>Workspace: {framework.toUpperCase()} project</span>
        </div>
        <div className="flex items-center gap-4">
          <span>Active file: {activeFile || "None"}</span>
          <span>•</span>
          <span>Theme: {editorSettings.theme}</span>
        </div>
      </div>
    </div>
  );
}
