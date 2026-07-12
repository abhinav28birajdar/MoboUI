"use client";

import React from "react";
import { Play, RotateCcw, Download } from "lucide-react";
import { usePlaygroundStore } from "@/lib/store/playground-store";
import { cn } from "@/lib/utils/cn";
import { toast } from "sonner";

export function PlaygroundToolbar() {
  const {
    framework,
    setFramework,
    projects,
    activeProjectId,
    editorSettings,
    updateEditorSettings,
    resetCode,
    addConsoleLog,
    files
  } = usePlaygroundStore();

  const handleExportZIP = () => {
    const textFiles = Object.entries(files).map(([path, content]) => `${path}:\n${content}`).join("\n\n---\n\n");
    const element = document.createElement("a");
    const file = new Blob([textFiles], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${framework}-project-moboui.txt`;
    document.body.appendChild(element);
    element.click();
    toast.success("Workspace project structure exported successfully!");
  };

  return (
    <div className="h-14 border-b border-zinc-900 bg-zinc-950/90 flex items-center justify-between px-6 z-10 shrink-0 select-none">
      
      {/* Left Project Settings */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#C026D3]" />
          <span className="text-xs font-black uppercase tracking-widest text-zinc-300">
            {activeProjectId ? projects.find(p => p.id === activeProjectId)?.name : "Active Playground"}
          </span>
        </div>

        <div className="h-4 w-px bg-zinc-800" />

        {/* Framework switcher */}
        <div className="flex bg-zinc-900 p-0.5 rounded-lg border border-zinc-800">
          <button
            onClick={() => setFramework('react-native')}
            className={cn(
              "px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-wider transition-all",
              framework === 'react-native' || framework === 'expo' ? "bg-[#C026D3] text-black" : "text-zinc-500 hover:text-zinc-300"
            )}
          >
            React Native
          </button>
          <button
            onClick={() => setFramework('flutter')}
            className={cn(
              "px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-wider transition-all",
              framework === 'flutter' ? "bg-[#C026D3] text-black" : "text-zinc-500 hover:text-zinc-300"
            )}
          >
            Flutter
          </button>
        </div>
      </div>

      {/* Toolbar Center / Right */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => {
            addConsoleLog("Compilation triggered.", "info");
            toast.success("Hot reload triggered!");
          }}
          className="flex items-center gap-1.5 h-9 px-4 rounded-xl bg-[#C026D3] text-black hover:bg-[#C026D3]/90 text-xs font-black uppercase tracking-wider transition-all"
        >
          <Play size={12} fill="black" />
          <span>Run</span>
        </button>

        <button
          onClick={() => {
            resetCode();
            toast.success("Editor reset.");
          }}
          className="flex items-center gap-1.5 h-9 px-3 rounded-xl border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900 text-xs font-black uppercase tracking-wider transition-all"
        >
          <RotateCcw size={12} />
          <span>Reset</span>
        </button>

        <button
          onClick={handleExportZIP}
          className="flex items-center gap-1.5 h-9 px-3 rounded-xl border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900 text-xs font-black uppercase tracking-wider transition-all"
        >
          <Download size={12} />
          <span>Export</span>
        </button>

        <div className="h-4 w-px bg-zinc-800" />

        {/* Theme Dropdown */}
        <select
          value={editorSettings.theme}
          onChange={(e) => updateEditorSettings({ theme: e.target.value })}
          className="h-9 px-3 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-zinc-400 font-bold uppercase tracking-wider focus:outline-none cursor-pointer"
        >
          <option value="vs-dark">VS Dark</option>
          <option value="light">Light</option>
          <option value="hc-black">High Contrast</option>
        </select>
      </div>
    </div>
  );
}