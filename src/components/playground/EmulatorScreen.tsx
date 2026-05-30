"use client";

import React, { useState, useEffect } from "react";
import { AlertCircle, RefreshCw, Code2 } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { motion } from "framer-motion";

interface EmulatorScreenProps {
    code: string;
    framework: "Flutter" | "React Native" | "Expo";
    theme: "dark" | "light";
    isRunning: boolean;
    buttonText?: string;
}

export function EmulatorScreen({
    code,
    framework,
    theme,
    isRunning,
    buttonText = "Get Started"
}: EmulatorScreenProps) {
    const [renderedContent, setRenderedContent] = useState<React.ReactNode>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!isRunning) {
            setRenderedContent(null);
            setError(null);
            return;
        }

        setIsLoading(true);
        setError(null);

        // Simulate rendering delay
        const timer = setTimeout(() => {
            try {
                // Parse and render based on framework
                const content = renderComponent(code, framework, buttonText, theme);
                setRenderedContent(content);
                setIsLoading(false);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Unknown error");
                setIsLoading(false);
            }
        }, 800);

        return () => clearTimeout(timer);
    }, [code, framework, isRunning, buttonText, theme]);

    const renderComponent = (
        code: string,
        fw: string,
        text: string,
        mode: string
    ): React.ReactNode => {
        // Simple rendering based on keywords in code
        const lowerCode = code.toLowerCase();

        // Check for button component
        if (lowerCode.includes("button") || lowerCode.includes("mobutton")) {
            return renderButton(text, mode);
        }

        // Check for input component
        if (lowerCode.includes("input") || lowerCode.includes("textinput")) {
            return renderInput(mode);
        }

        // Check for container with text
        if (lowerCode.includes("container") || lowerCode.includes("view")) {
            return renderContainer(text, mode);
        }

        // Default render
        return renderButton(text, mode);
    };

    const renderButton = (label: string, mode: string) => {
        return (
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="relative z-10 flex flex-col gap-6 items-center"
            >
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gradient-to-br from-amber-300 to-amber-400 text-gray-900 font-bold text-lg rounded-3xl shadow-lg hover:shadow-xl transition-all cursor-pointer border-2 border-amber-500/30"
                >
                    {label}
                </motion.button>
                <div className="text-center space-y-2">
                    <p className={cn("text-sm font-semibold", mode === "dark" ? "text-white" : "text-gray-900")}>
                        Component Rendered
                    </p>
                    <p className={cn("text-xs", mode === "dark" ? "text-gray-400" : "text-gray-600")}>
                        Interactive button preview
                    </p>
                </div>
            </motion.div>
        );
    };

    const renderInput = (mode: string) => {
        return (
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="relative z-10 w-3/4 flex flex-col gap-4"
            >
                <div className="space-y-2">
                    <label className={cn("text-xs font-bold uppercase tracking-wider", mode === "dark" ? "text-gray-300" : "text-gray-700")}>
                        Input Field
                    </label>
                    <input
                        type="text"
                        placeholder="Enter text..."
                        className={cn(
                            "w-full px-4 py-3 rounded-2xl border-2 font-semibold outline-none transition-all",
                            mode === "dark"
                                ? "bg-gray-800 border-gray-600 text-white placeholder:text-gray-500 focus:border-amber-400"
                                : "bg-gray-100 border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-amber-400"
                        )}
                    />
                </div>
                <div className={cn("text-xs p-3 rounded-xl", mode === "dark" ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-700")}>
                    Input component rendered successfully
                </div>
            </motion.div>
        );
    };

    const renderContainer = (label: string, mode: string) => {
        return (
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="relative z-10 flex flex-col items-center justify-center gap-4"
            >
                <div className={cn(
                    "w-3/4 p-6 rounded-3xl border-2 text-center",
                    mode === "dark"
                        ? "bg-gray-800/50 border-amber-400/30"
                        : "bg-gray-100 border-amber-300/50"
                )}>
                    <p className={cn("text-lg font-bold", mode === "dark" ? "text-white" : "text-gray-900")}>
                        {label}
                    </p>
                </div>
                <p className={cn("text-xs", mode === "dark" ? "text-gray-400" : "text-gray-600")}>
                    Container component preview
                </p>
            </motion.div>
        );
    };

    return (
        <div className={cn(
            "w-full h-full rounded-[2.5rem] md:rounded-[3.5rem] flex flex-col items-center justify-center transition-all duration-700 overflow-hidden relative",
            theme === "dark" ? "bg-black" : "bg-white"
        )}>
            <div className="absolute inset-0 bg-grid-pattern opacity-5" />

            {/* Loading State */}
            {isLoading && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="relative z-10 flex flex-col items-center gap-4"
                >
                    <div className="w-12 h-12 border-3 border-amber-400 border-t-transparent rounded-full animate-spin" />
                    <p className={cn("text-xs font-bold uppercase tracking-wider", theme === "dark" ? "text-gray-400" : "text-gray-600")}>
                        Rendering...
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
                    <div className={cn("p-3 rounded-full", theme === "dark" ? "bg-red-900/20" : "bg-red-100")}>
                        <AlertCircle size={32} className={theme === "dark" ? "text-red-400" : "text-red-600"} />
                    </div>
                    <div className="text-center">
                        <p className={cn("text-sm font-bold mb-2", theme === "dark" ? "text-red-400" : "text-red-600")}>
                            Render Error
                        </p>
                        <p className={cn("text-xs", theme === "dark" ? "text-gray-400" : "text-gray-600")}>
                            {error.substring(0, 60)}...
                        </p>
                    </div>
                    <button
                        className={cn(
                            "mt-4 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2",
                            theme === "dark"
                                ? "bg-red-900/30 text-red-400 hover:bg-red-900/50"
                                : "bg-red-100 text-red-600 hover:bg-red-200"
                        )}
                    >
                        <RefreshCw size={14} />
                        Retry
                    </button>
                </motion.div>
            )}

            {/* Rendered Content */}
            {isRunning && !isLoading && !error && renderedContent && (
                <div className="relative z-10 w-full h-full flex items-center justify-center px-4">
                    {renderedContent}
                </div>
            )}

            {/* Idle State */}
            {!isRunning && (
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="relative z-10 flex flex-col items-center gap-4 px-6"
                >
                    <div className={cn("p-3 rounded-full", theme === "dark" ? "bg-gray-800" : "bg-gray-100")}>
                        <Code2 size={32} className={theme === "dark" ? "text-gray-400" : "text-gray-600"} />
                    </div>
                    <div className="text-center">
                        <p className={cn("text-sm font-bold mb-1", theme === "dark" ? "text-gray-300" : "text-gray-700")}>
                            Ready to Render
                        </p>
                        <p className={cn("text-xs", theme === "dark" ? "text-gray-500" : "text-gray-600")}>
                            Click "Run Code" to preview component
                        </p>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
