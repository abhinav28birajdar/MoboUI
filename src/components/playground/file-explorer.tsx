"use client";

import React from "react";
import { Folder, FileCode, Plus } from "lucide-react";
import { usePlaygroundStore } from "@/lib/store/playground-store";
import { cn } from "@/lib/utils/cn";

export function FileExplorer() {
  const {
    framework,
    files,
    activeFile,
    setActiveFile,
    projects,
    activeProjectId,
    loadProject,
    createProject
  } = usePlaygroundStore();

  return (
    <div className="space-y-4">
      {/* Project selector dropdown */}
      <div className="space-y-2">
        <span className="text-[9px] font-black text-zinc-500 uppercase tracking-wider">Saved Projects</span>
        <div className="flex gap-2">
          <select
            value={activeProjectId || ""}
            onChange={(e) => e.target.value ? loadProject(e.target.value) : null}
            className="flex-1 h-8 bg-zinc-900 border border-zinc-800 rounded px-2 text-[11px] text-zinc-300"
          >
            <option value="">-- Sandbox Project --</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
          <button
            onClick={() => {
              const name = prompt("Enter project name:");
              if (name) createProject(name, framework);
            }}
            className="h-8 w-8 bg-zinc-900 border border-zinc-800 rounded flex items-center justify-center text-zinc-300 hover:text-white"
            title="New Project"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>

      <div className="space-y-1 mt-6">
        <span className="text-[9px] font-black text-zinc-500 uppercase tracking-wider block mb-2">Project Files</span>
        <div className="flex items-center gap-2 text-xs text-zinc-400 font-bold px-1.5 py-1">
          <Folder size={14} className="text-amber-500" />
          <span>{framework === 'flutter' ? 'lib/' : 'Project root'}</span>
        </div>
        
        {Object.keys(files).map((path) => {
          const isDartOrJs = path.endsWith('.dart') || path.endsWith('.js') || path.endsWith('.tsx');
          const isActive = activeFile === path;
          return (
            <div
              key={path}
              onClick={() => setActiveFile(path)}
              className={cn(
                "flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all",
                isActive ? "bg-[#C026D3]/10 text-[#C026D3]" : "text-zinc-400 hover:bg-zinc-900/60 hover:text-white"
              )}
            >
              <div className="flex items-center gap-2">
                <FileCode size={14} className={isDartOrJs ? "text-cyan-500" : "text-zinc-500"} />
                <span className={cn(path.startsWith('lib/') && "pl-2")}>
                  {path.startsWith('lib/') ? path.split('/')[1] : path}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}