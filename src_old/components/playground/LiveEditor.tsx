"use client";

import { Editor } from "@monaco-editor/react";
import { JetBrains_Mono } from "next/font/google";
import { cn } from "@/lib/utils/cn";

const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"] });

interface LiveEditorProps {
    code: string;
    onChange: (value: string | undefined) => void;
    language: "typescript" | "dart";
}

export function LiveEditor({ code, onChange, language }: LiveEditorProps) {
    return (
        <div className="flex-1 relative group h-full">
            <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-surface/50 backdrop-blur-md border border-white/5 text-[9px] font-mono uppercase tracking-widest text-white/30 group-hover:text-white/60 transition-colors pointer-events-none">
                {language === "typescript" ? "TypeScript v5.4" : "Dart v3.2"}
            </div>
            <div className="absolute top-4 right-20 z-10 opacity-30 text-[9px] font-mono uppercase tracking-[0.3em] pointer-events-none hidden lg:block">
                Monaco Editor v0.46
            </div>
            <Editor
                height="100%"
                language={language}
                theme="vs-dark"
                value={code}
                onChange={onChange}
                options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    fontFamily: "var(--font-mono)",
                    padding: { top: 20 },
                    scrollBeyondLastLine: false,
                    lineNumbers: "on",
                    cursorSmoothCaretAnimation: "on",
                    formatOnPaste: true,
                    automaticLayout: true,
                    scrollbar: {
                        vertical: "hidden",
                        horizontal: "hidden",
                    },
                }}
                className={cn(jetbrainsMono.className)}
            />
        </div>
    );
}
