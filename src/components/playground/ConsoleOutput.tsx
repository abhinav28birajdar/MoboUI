"use client";

import { Terminal, Trash2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

interface Log {
    type: "info" | "error" | "warn";
    message: string;
    timestamp: string;
}

interface ConsoleOutputProps {
    logs: Log[];
    onClear: () => void;
}

export function ConsoleOutput({ logs, onClear }: ConsoleOutputProps) {
    return (
        <div className="flex flex-col h-full bg-[#0a0a0a] border-t border-white/5 font-mono text-xs">
            <div className="h-8 flex items-center justify-between px-4 bg-white/5 border-b border-white/5">
                <div className="flex items-center gap-2 text-muted-foreground">
                    <Terminal size={14} />
                    <span className="font-bold">CONSOLE</span>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={onClear}>
                        <Trash2 size={12} />
                    </Button>
                </div>
            </div>
            <ScrollArea className="flex-1 p-4">
                <div className="flex flex-col gap-2">
                    {logs.length === 0 && (
                        <div className="text-muted-foreground opacity-50 ">No logs execution...</div>
                    )}
                    {logs.map((log, i) => (
                        <div key={i} className="flex gap-2">
                            <span className="text-muted-foreground opacity-50">[{log.timestamp}]</span>
                            <span className={
                                log.type === "error" ? "text-red-500" :
                                    log.type === "warn" ? "text-yellow-500" :
                                        "text-blue-400"
                            }>
                                {log.message}
                            </span>
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
}
