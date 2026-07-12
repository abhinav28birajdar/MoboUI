"use client";

import React from "react";
import Editor from "@monaco-editor/react";
import { FileText } from "lucide-react";
import { usePlaygroundStore } from "@/lib/store/playground-store";

interface MonacoEditorWrapperProps {
  onMount: (editor: any, monaco: any) => void;
}

export function MonacoEditorWrapper({ onMount }: MonacoEditorWrapperProps) {
  const { code, setCode, activeFile, editorSettings } = usePlaygroundStore();

  return (
    <div className="flex-1 min-h-0 relative">
      {activeFile ? (
        <Editor
          height="100%"
          language={activeFile.endsWith('.dart') || activeFile.endsWith('.yaml') ? 'dart' : 'typescript'}
          theme={editorSettings.theme}
          value={code}
          onChange={(val) => setCode(val || '')}
          onMount={onMount}
          options={{
            fontSize: editorSettings.fontSize,
            fontFamily: editorSettings.fontFamily,
            minimap: { enabled: editorSettings.minimap },
            wordWrap: editorSettings.wordWrap,
            lineNumbers: editorSettings.lineNumbers,
            cursorBlinking: editorSettings.cursorAnimation as any,
            automaticLayout: true,
            padding: { top: 16, bottom: 16 },
          }}
        />
      ) : (
        <div className="h-full flex flex-col items-center justify-center text-zinc-600 gap-2">
          <FileText size={32} strokeWidth={1} />
          <span className="text-xs font-semibold">No active file open in workspace</span>
        </div>
      )}
    </div>
  );
}