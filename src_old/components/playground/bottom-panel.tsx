"use client";

import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import { usePlaygroundStore } from "@/lib/store/playground-store";
import { cn } from "@/lib/utils/cn";

export function BottomPanel() {
  const {
    framework,
    terminalLogs,
    consoleLogs,
    addTerminalLog,
    clearTerminalLogs,
    addConsoleLog,
    clearConsoleLogs,
  } = usePlaygroundStore();

  const [terminalInput, setTerminalInput] = useState("");
  const [consoleTab, setConsoleTab] = useState<'terminal' | 'console' | 'doctor' | 'network'>('terminal');

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;

    const cmd = terminalInput.trim().toLowerCase();
    addTerminalLog(`$ ${terminalInput}`);
    setTerminalInput("");

    setTimeout(() => {
      if (cmd === 'help') {
        addTerminalLog("Supported commands:\n  help - Show list of commands\n  flutter doctor - Perform setup verification\n  flutter pub get - Pull dependencies\n  npm install - Download react modules\n  flutter run / expo start - Launch dynamic bundler runtime\n  clear - Reset terminal logs");
      } else if (cmd === 'clear') {
        clearTerminalLogs();
      } else if (cmd === 'flutter doctor') {
        addTerminalLog("Checking setup logs...\n[✓] Flutter SDK v3.16.5 - Web browser compilation active\n[✓] Android Toolchain - Emulator simulator setup successful\n[✓] VS Code extension support active\n[✓] Network configurations verified\n• System is clean and running perfectly.");
      } else if (cmd === 'flutter pub get' || cmd === 'npm install' || cmd === 'yarn install') {
        addTerminalLog("Fetching configuration files...");
        addTerminalLog("Resolving dependencies...");
        let dotCount = 0;
        const interval = setInterval(() => {
          addTerminalLog("Downloading package graphs" + ".".repeat(dotCount));
          dotCount++;
          if (dotCount > 4) {
            clearInterval(interval);
            addTerminalLog("✓ Setup completes. All packages downloaded correctly.");
          }
        }, 300);
      } else if (cmd === 'flutter run' || cmd === 'expo start' || cmd === 'yarn start') {
        addTerminalLog("Starting compiler compiler engine...");
        addTerminalLog("Resolving local cache bundles...");
        addTerminalLog("✓ Hot reload bundler server running successfully.");
        addConsoleLog("Live compiler session refreshed.", "info");
      } else {
        addTerminalLog(`bash: command not found: ${cmd}. Type 'help' to see list of valid commands.`);
      }
    }, 100);
  };

  return (
    <div className="h-56 border-t border-zinc-900 bg-zinc-950 flex flex-col shrink-0 min-h-0">
      {/* LOGS HEADER TABS */}
      <div className="h-9 border-b border-zinc-900/60 bg-zinc-950/40 flex items-center justify-between px-6 select-none shrink-0">
        <div className="flex gap-6">
          {[
            { id: 'terminal', label: 'Terminal Output' },
            { id: 'console', label: 'Console Logs' },
            { id: 'doctor', label: framework === 'flutter' ? 'Flutter Doctor' : 'Metro Bundler' },
            { id: 'network', label: 'Network requests' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setConsoleTab(t.id as any)}
              className={cn(
                "text-[10px] font-black uppercase tracking-wider pb-px border-b-2 border-transparent transition-all",
                consoleTab === t.id ? "text-[#C026D3] border-t-[#C026D3]" : "text-zinc-500 hover:text-zinc-300"
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        <button onClick={() => {
          if (consoleTab === 'terminal') clearTerminalLogs();
          else if (consoleTab === 'console') clearConsoleLogs();
        }} className="text-zinc-500 hover:text-white transition-colors" title="Clear panel logs">
          <Trash2 size={12} />
        </button>
      </div>

      {/* TABBED LOG CONTENT SCROLL */}
      <div className="flex-1 overflow-y-auto p-4 font-mono text-[11px] leading-relaxed custom-scrollbar bg-black/40">
        
        {/* TERMINAL TAB */}
        {consoleTab === 'terminal' && (
          <div className="space-y-1">
            {terminalLogs.map((log, i) => (
              <p key={i} className="text-zinc-400 whitespace-pre-wrap">{log}</p>
            ))}
            <form onSubmit={handleTerminalSubmit} className="flex items-center gap-1.5 mt-2">
              <span className="text-[#C026D3] font-black font-sans">$</span>
              <input
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                placeholder="Type command here (e.g. flutter doctor)..."
                className="flex-1 bg-transparent text-white border-none outline-none focus:ring-0 p-0 text-[11px] font-mono"
              />
            </form>
          </div>
        )}

        {/* CONSOLE TAB */}
        {consoleTab === 'console' && (
          <div className="space-y-1.5">
            {consoleLogs.length === 0 && (
              <p className="text-zinc-600 italic">No dynamic log events recorded.</p>
            )}
            {consoleLogs.map((log, i) => (
              <div key={i} className="flex gap-2">
                <span className="text-zinc-600">[{log.timestamp}]</span>
                <span className={cn(
                  log.type === 'error' && "text-red-500",
                  log.type === 'warn' && "text-amber-500",
                  log.type === 'info' && "text-cyan-400"
                )}>{log.message}</span>
              </div>
            ))}
          </div>
        )}

        {/* FLUTTER DOCTOR / METRO BUNDLER TAB */}
        {consoleTab === 'doctor' && (
          <div className="text-zinc-400 space-y-1">
            {framework === 'flutter' ? (
              <>
                <p className="text-zinc-500">[✓] Flutter (Channel stable, 3.16.5, on Microsoft Windows, locale en-US)</p>
                <p className="text-zinc-500">[✓] Android toolchain - develop for Android devices (Android SDK version 34.0.0)</p>
                <p className="text-zinc-500">[✓] Chrome - develop for the web</p>
                <p className="text-zinc-500">[✓] Android Studio (version 2022.3)</p>
                <p className="text-zinc-500">[✓] Connected device (1 available)</p>
                <p className="text-zinc-500">• No issues found!</p>
              </>
            ) : (
              <>
                <p className="text-[#22c55e]">Starting Metro bundler server...</p>
                <p className="text-zinc-500">Android emulator connection established successfully.</p>
                <p className="text-zinc-500">iOS device simulator offline (caching active).</p>
                <p className="text-zinc-500">Watching folder assets graphs...</p>
                <p className="text-zinc-500">Metro Bundler initialized successfully at port 8081.</p>
              </>
            )}
          </div>
        )}

        {/* NETWORK MONITORS TAB */}
        {consoleTab === 'network' && (
          <div className="space-y-1 text-zinc-500">
            <div className="flex gap-4 border-b border-zinc-900 pb-1 font-bold text-zinc-400">
              <span className="w-10">Method</span>
              <span className="w-12">Status</span>
              <span className="flex-1">URL Path</span>
              <span className="w-16">Latency</span>
            </div>
            <div className="flex gap-4">
              <span className="w-10 text-green-400 font-bold">GET</span>
              <span className="w-12 text-green-500">200 OK</span>
              <span className="flex-1 font-mono">/api/v1/components/primary-button</span>
              <span className="w-16 text-zinc-600">42ms</span>
            </div>
            <div className="flex gap-4">
              <span className="w-10 text-green-400 font-bold">GET</span>
              <span className="w-12 text-green-500">200 OK</span>
              <span className="flex-1 font-mono">/cdn/cdnjs/babel-standalone/babel.min.js</span>
              <span className="w-16 text-zinc-600">118ms</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}