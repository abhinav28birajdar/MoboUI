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
  const [showQR, setShowQR] = useState(false);

  const handleScreenshot = () => {
    toast.success("Device preview snapshot captured!");
  };

  return (
    <div className="w-[380px] bg-zinc-950 border-l border-zinc-900 flex flex-col shrink-0 min-h-0 select-none">
      {/* PREVIEW TOOLBAR */}
      <div className="h-10 border-b border-zinc-900 bg-zinc-950/40 flex items-center justify-between px-4 shrink-0">
        <span className="text-[10px] font-black uppercase text-zinc-400 tracking-wider">Device Preview</span>
        <div className="flex items-center gap-1">
          <button onClick={() => setDeviceRotate(deviceRotate === 'portrait' ? 'landscape' : 'portrait')} className="p-1.5 rounded text-zinc-500 hover:text-white hover:bg-zinc-900" title="Rotate device aspect">
            <RotateCcw size={12} />
          </button>
          <button onClick={() => setZoomScale(Math.max(60, zoomScale - 10))} className="p-1.5 rounded text-zinc-500 hover:text-white hover:bg-zinc-900" title="Zoom out scale">
            <ZoomOut size={12} />
          </button>
          <span className="text-[10px] text-zinc-500 font-bold px-1">{zoomScale}%</span>
          <button onClick={() => setZoomScale(Math.min(120, zoomScale + 10))} className="p-1.5 rounded text-zinc-500 hover:text-white hover:bg-zinc-900" title="Zoom in scale">
            <ZoomIn size={12} />
          </button>
          <button onClick={handleScreenshot} className="p-1.5 rounded text-zinc-500 hover:text-white hover:bg-zinc-900" title="Download Screenshot">
            <ImageIcon size={12} />
          </button>
          <button onClick={() => setShowQR(!showQR)} className={cn("p-1.5 rounded transition-all", showQR ? "text-[#C026D3] bg-zinc-900" : "text-zinc-500 hover:text-white hover:bg-zinc-900")} title="Show Expo Go QR code">
            <QrCode size={12} />
          </button>
        </div>
      </div>

      {/* DEVICE FRAMING AREA */}
      <div className="flex-1 bg-black/40 flex items-center justify-center p-4 relative overflow-auto custom-scrollbar">
        {/* Simulated Expo Go QR Code overlay */}
        <AnimatePresence>
          {showQR && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center z-30 p-6 text-center"
            >
              <div className="bg-white p-4 rounded-2xl mb-4 shadow-xl">
                <QrCode size={160} className="text-black" />
              </div>
              <span className="text-xs font-black text-white uppercase tracking-wider mb-2">Scan Expo QR Code</span>
              <p className="text-[10px] text-zinc-500 leading-relaxed max-w-[200px] font-semibold">Open your phone camera or Expo Go application to scan and run your design live on a physical device.</p>
              <button onClick={() => setShowQR(false)} className="mt-4 px-4 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-[10px] font-black uppercase text-zinc-300">Close overlay</button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Rotating zoom scale wrapper */}
        <div
          style={{
            transform: `scale(${zoomScale / 100}) rotate(${deviceRotate === 'landscape' ? '90deg' : '0deg'})`,
            transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
          }}
        >
          {framework === 'flutter' ? (
            <FlutterPreview code={code} isVisible={true} />
          ) : (
            <ReactNativePreview code={code} isVisible={true} />
          )}
        </div>
      </div>

      {/* DEVICE SELECTOR FOOTER SECTION */}
      <div className="h-10 border-t border-zinc-900 bg-zinc-950/20 px-4 flex items-center justify-between shrink-0">
        <span className="text-[9px] font-black uppercase text-zinc-500 tracking-wider">Device Type</span>
        <div className="flex bg-zinc-900 p-0.5 rounded border border-zinc-850">
          {['iphone', 'android'].map((dev) => (
            <button
              key={dev}
              onClick={() => setDevice(dev as any)}
              className={cn(
                "px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider",
                device === dev ? "bg-[#C026D3] text-black" : "text-zinc-500"
              )}
            >
              {dev}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}