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
    <div className="h-[calc(100vh-80px)] flex flex-col bg-[#0A0A0B] text-white overflow-hidden relative">
      
      {/* Custom Topbar matching the screenshot */}
      <div className="h-14 border-b border-white/10 bg-black flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-4">
          {/* Framework Toggle */}
          <div className="flex bg-[#18181B] p-1 rounded-lg border border-white/10">
            <button
              onClick={() => setFramework('react-native')}
              className={cn(
                "px-4 py-1.5 rounded-md text-xs font-black uppercase tracking-wider transition-all",
                framework === 'react-native' ? "bg-white text-black" : "text-zinc-500 hover:text-white"
              )}
            >
              React Native
            </button>
            <button
              onClick={() => setFramework('flutter')}
              className={cn(
                "px-4 py-1.5 rounded-md text-xs font-black uppercase tracking-wider transition-all",
                framework === 'flutter' ? "bg-[#0284C7] text-white" : "text-zinc-500 hover:text-white"
              )}
            >
              Flutter
            </button>
          </div>
          <div className="h-4 w-px bg-white/10 mx-2" />
          <button 
            onClick={resetCode}
            className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-zinc-400 hover:text-white transition-colors"
          >
            <RotateCcw size={14} /> Reset
          </button>
          <button 
            className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-zinc-400 hover:text-white transition-colors"
          >
            <Download size={14} /> Export
          </button>
        </div>

        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-zinc-300 hover:text-white transition-colors px-4 py-2 rounded-lg border border-white/10 bg-[#18181B]">
            <Share2 size={14} /> Share
          </button>
          <button className="flex items-center gap-2 text-xs font-black uppercase tracking-wider bg-[#C026D3] text-black hover:bg-[#C026D3]/90 transition-colors px-6 py-2 rounded-lg">
            <Play size={14} className="fill-current" /> RUN APP
          </button>
        </div>
      </div>

      {/* WORKSPACE CONTAINER */}
      <div className="flex-grow flex min-h-0 bg-[#050506]">
        
        {/* EDITOR AREA (LEFT SPLIT) */}
        <div className="flex-1 flex flex-col min-w-0 bg-[#0A0A0B] relative border-r border-white/10">
          {/* Watermark */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.03] z-0">
            <span className="text-6xl font-black uppercase tracking-[0.5em] text-white whitespace-nowrap rotate-[-45deg]">
              MONACO EDITOR V0.46
            </span>
          </div>
          
          {/* MONACO CODE EDITOR CANVAS */}
          <div className="flex-1 relative z-10">
            <MonacoEditorWrapper onMount={handleEditorDidMount} />
          </div>
        </div>

        {/* LIVE MOBILE PREVIEW COLUMN (RIGHT SPLIT) */}
        <div className="w-[450px] shrink-0 bg-[#0A0A0B]">
          <EmulatorPanel />
        </div>

      </div>
    </div>
  );
}
