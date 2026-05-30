"use client";

import { ReactNativePreview } from "./ReactNativePreview";
import { FlutterPreview } from "./FlutterPreview";
import { motion } from "framer-motion";

interface PreviewPanelProps {
    framework: "react-native" | "flutter";
    code: string;
}

export function PreviewPanel({ framework, code }: PreviewPanelProps) {
    return (
        <div className="flex-1 flex flex-col items-center justify-center w-full h-full relative">
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px]" />
                <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-secondary/10 rounded-full blur-[80px]" />
            </div>

            <div className="relative z-10">
                <div className="mb-8 flex flex-col items-center gap-4">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-xl">
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(0,0,0,0.2)]" />
                        <span className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em]">
                            Rendering Output
                        </span>
                    </div>
                </div>

                <motion.div
                    layout
                    className="relative group cursor-default"
                >
                    {/* Shadow/Glow effect */}
                    <div className="absolute -inset-4 bg-primary/20 rounded-[4rem] blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-1000" />

                    {framework === "react-native" ? (
                        <ReactNativePreview code={code} isVisible={true} />
                    ) : (
                        <FlutterPreview code={code} isVisible={true} />
                    )}
                </motion.div>

                {/* Device Controls */}
                <div className="mt-10 flex items-center justify-center gap-3">
                    {["iPhone 15", "Pixel 8 Pro", "Galaxy S24"].map((device) => (
                        <button
                            key={device}
                            disabled={device !== "iPhone 15"}
                            className="px-5 py-2 rounded-xl bg-secondary/30 border border-white/5 text-[10px] font-bold text-muted-foreground uppercase tracking-widest hover:text-foreground hover:bg-secondary/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {device}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
