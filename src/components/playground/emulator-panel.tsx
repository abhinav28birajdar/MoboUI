"use client";

import React, { useState } from "react";
import { RotateCcw, ZoomIn, ZoomOut, Image as ImageIcon, QrCode } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePlaygroundStore } from "@/lib/store/playground-store";
import { ReactNativePreview } from "./ReactNativePreview";
import { FlutterPreview } from "./FlutterPreview";
import { cn } from "@/lib/utils/cn";
import { toast } from "sonner";

export function EmulatorPanel() {
  const { framework, code, device, setDevice } = usePlaygroundStore();
  const [deviceRotate, setDeviceRotate] = useState<'portrait' | 'landscape'>('portrait');
  const [zoomScale, setZoomScale] = useState<number>(100);

  const hasCode = code && code.trim().length > 0;

  return (
    <div className="w-full h-full bg-[#0A0A0B] flex flex-col shrink-0 min-h-0 select-none">
      {/* PREVIEW TOOLBAR */}
      <div className="h-14 border-b border-white/10 bg-black flex items-center justify-between px-6 shrink-0">
        <span className="text-xs font-black uppercase text-white tracking-widest">Live Simulator</span>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] text-green-500 font-bold uppercase tracking-wider">Active</span>
        </div>
      </div>

      {/* DEVICE FRAMING AREA */}
      <div className="flex-1 flex items-center justify-center p-4 relative overflow-auto custom-scrollbar">
        {/* Rotating zoom scale wrapper */}
        <div
          className="w-[340px] h-[720px] rounded-[3rem] overflow-hidden border-[12px] border-[#18181B] bg-black shadow-2xl relative flex flex-col items-center"
          style={{
            transform: `scale(${zoomScale / 100}) rotate(${deviceRotate === 'landscape' ? '90deg' : '0deg'})`,
            transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
          }}
        >
          {/* Simulated Notch / Dynamic Island */}
          <div className="absolute top-0 w-36 h-7 bg-[#18181B] rounded-b-3xl z-50 flex items-center justify-center gap-2" style={{boxShadow: '0 4px 10px rgba(0,0,0,0.5)'}}>
            <div className="w-1.5 h-1.5 rounded-full bg-black" />
            <div className="w-3 h-3 rounded-full bg-[#111] shadow-inner" />
          </div>

          <div className="w-full h-full relative overflow-hidden bg-[#0A0A0B] flex flex-col items-center justify-center">
            {!hasCode ? (
              <div className="flex flex-col items-center justify-center p-8 text-center mt-20">
                <h3 className="text-xl font-black uppercase tracking-tight text-white mb-4">App Standby</h3>
                <p className="text-xs text-zinc-500 mb-8 leading-relaxed">
                  Import a component or use a recognized class name like PrimaryButton to trigger a preview.
                </p>
                <button className="flex items-center justify-center gap-2 px-6 py-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded-md text-[10px] font-black uppercase tracking-widest transition-colors">
                  <RotateCcw size={14} /> Refresh
                </button>
              </div>
            ) : (
              framework === 'flutter' ? (
                <FlutterPreview code={code} isVisible={true} />
              ) : (
                <ReactNativePreview code={code} isVisible={true} />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}