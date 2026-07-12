"use client";

import React, { useState, useEffect } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { motion } from "framer-motion";

interface AdvancedEmulatorProps {
    code: string;
    framework: "Flutter" | "React Native" | "Expo";
    theme: "dark" | "light";
    isRunning: boolean;
}

export function AdvancedEmulator({
    code,
    framework,
    theme,
    isRunning,
}: AdvancedEmulatorProps) {
    const [output, setOutput] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!isRunning) {
            setOutput("");
            setError(null);
            return;
        }

        setIsLoading(true);
        setError(null);

        // Parse code to extract render output
        const timer = setTimeout(() => {
            try {
                const result = parseAndExecuteCode(code, framework);
                setOutput(result);
                setIsLoading(false);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Parse error");
                setIsLoading(false);
            }
        }, 800);

        return () => clearTimeout(timer);
    }, [code, framework, isRunning]);

    const parseAndExecuteCode = (codeStr: string, fw: string): string => {
        const lowerCode = codeStr.toLowerCase();

        // Extract text from code
        const textMatch = codeStr.match(/['"]([^'"]*Get Started[^'"]*)['"]/i) ||
                         codeStr.match(/['"]([^'"]+)['"]/);
        const text = textMatch ? textMatch[1] : "Component";

        // Determine component type
        if (lowerCode.includes("button") || lowerCode.includes("mobutton") || lowerCode.includes("pressable")) {
            return `<button>${text}</button>`;
        }
        if (lowerCode.includes("input") || lowerCode.includes("textinput")) {
            return `<input placeholder="Enter text..." />`;
        }
        if (lowerCode.includes("card")) {
            return `<card>${text}</card>`;
        }

        return `<component>${text}</component>`;
    };

    const bgColor = theme === "dark" ? "#000000" : "#FFFFFF";
    const textColor = theme === "dark" ? "#FFFFFF" : "#000000";
    const borderColor = theme === "dark" ? "#333333" : "#E5E5E5";

    return (
        <div
            className={cn(
                "w-full h-full rounded-[2.5rem] md:rounded-[3.5rem] flex flex-col items-center justify-center transition-all duration-700 overflow-hidden relative",
                theme === "dark" ? "bg-black" : "bg-white"
            )}
            style={{ backgroundColor: bgColor, color: textColor }}
        >
            <div className="absolute inset-0 bg-grid-pattern opacity-5" />

            {/* Loading State */}
            {isLoading && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="relative z-10 flex flex-col items-center gap-4"
                >
                    <div
                        className="w-12 h-12 border-4 rounded-full animate-spin"
                        style={{ borderColor: `${borderColor}40`, borderTopColor: "#C026D3" }}
                    />
                    <p className="text-xs font-bold uppercase tracking-wider" style={{ color: theme === "dark" ? "#888" : "#666" }}>
                        Compiling...
                    </p>
                </motion.div>
            )}

            {/* Error State */}
            {error && !isLoading && (
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="relative z-10 flex flex-col items-center gap-4 px-6"
                >
                    <AlertCircle size={40} color="#EF4444" />
                    <div className="text-center">
                        <p className="text-sm font-bold mb-2" style={{ color: "#EF4444" }}>
                            Error
                        </p>
                        <p className="text-xs" style={{ color: theme === "dark" ? "#999" : "#666" }}>
                            {error}
                        </p>
                    </div>
                </motion.div>
            )}

            {/* Rendered Output */}
            {isRunning && !isLoading && !error && (
                <motion.div
                    initial={{ scale: 0.8, opacity: 0, y: 10 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="relative z-10 flex flex-col items-center gap-6"
                >
                    {/* Button Preview */}
                    <motion.button
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 bg-gradient-to-br from-fuchsia-500 to-fuchsia-600 text-white font-bold text-lg rounded-3xl shadow-lg hover:shadow-xl transition-all cursor-pointer border border-fuchsia-500/30"
                    >
                        {output.includes("<button>") ? output.match(/>([^<]+)</)?.[1] || "Get Started" : "Get Started"}
                    </motion.button>

                    {/* Info */}
                    <div className="text-center space-y-1">
                        <p className="text-sm font-semibold" style={{ color: textColor }}>
                            Render Success
                        </p>
                        <p className="text-xs" style={{ color: theme === "dark" ? "#999" : "#666" }}>
                            Component running on device
                        </p>
                    </div>
                </motion.div>
            )}

            {/* Idle State */}
            {!isRunning && (
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="relative z-10 flex flex-col items-center gap-4 px-6"
                >
                    <div
                        className="p-3 rounded-full"
                        style={{ backgroundColor: theme === "dark" ? "#222" : "#F3F4F6" }}
                    >
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity }}>
                            <RefreshCw size={32} style={{ color: theme === "dark" ? "#666" : "#999" }} />
                        </motion.div>
                    </div>
                    <div className="text-center">
                        <p className="text-sm font-bold mb-1" style={{ color: textColor }}>
                            Ready
                        </p>
                        <p className="text-xs" style={{ color: theme === "dark" ? "#666" : "#999" }}>
                            Press Run Code to execute
                        </p>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
