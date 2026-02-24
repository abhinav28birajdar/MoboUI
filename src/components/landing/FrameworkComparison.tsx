"use client";

import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils/cn";

const features = [
    { name: "Language", rn: "TypeScript / JS", flutter: "Dart" },
    { name: "UI Paradigm", rn: "JSX / Components", flutter: "Widget Tree" },
    { name: "Styling", rn: "CSS / Styled System", flutter: "Widget Properties" },
    { name: "Hot Reload", rn: true, flutter: true },
    { name: "Performance", rn: "Near Native", flutter: "Native Skia" },
    { name: "Ecosystem", rn: "Massive (npm)", flutter: "Growing (pub.dev)" },
];

export function FrameworkComparison() {
    const [activeTab, setActiveTab] = useState<"rn" | "flutter">("rn");

    return (
        <section className="py-32 bg-black relative">
            <div className="container px-6 mx-auto">
                <div className="text-left mb-20">
                    <span className="text-primary font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Compare Ecosystems</span>
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">
                        React Native <span className="text-primary ">vs</span> Flutter
                    </h2>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Comparison Table */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.1
                                }
                            }
                        }}
                        className="bg-neutral-900/50 backdrop-blur-sm border border-white/5 rounded-[40px] overflow-hidden p-2"
                    >
                        <div className="grid grid-cols-3 p-8 border-b border-white/5 font-black text-xs uppercase tracking-widest text-primary">
                            <div>Feature</div>
                            <div className="text-center">React Native</div>
                            <div className="text-center">Flutter</div>
                        </div>
                        {features.map((f) => (
                            <motion.div
                                key={f.name}
                                variants={{
                                    hidden: { opacity: 0, x: -20 },
                                    visible: { opacity: 1, x: 0 }
                                }}
                                className="grid grid-cols-3 p-8 border-b border-white/5 last:border-0 hover:bg-neutral-900 transition-colors text-sm"
                            >
                                <div className="text-neutral-400 font-bold uppercase tracking-tight">{f.name}</div>
                                <div className="flex items-center justify-center text-white font-black ">
                                    {f.rn === true ? <Check className="text-primary" size={20} /> : <span>{f.rn}</span>}
                                </div>
                                <div className="flex items-center justify-center text-white font-black ">
                                    {f.flutter === true ? <Check className="text-primary" size={20} /> : <span>{f.flutter}</span>}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Interactive Preview */}
                    <div className="flex flex-col gap-8">
                        <div className="flex p-1 bg-neutral-900 rounded-full w-fit border border-white/5">
                            <button
                                onClick={() => setActiveTab("rn")}
                                className={cn(
                                    "px-10 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all",
                                    activeTab === "rn" ? "bg-primary text-black" : "text-neutral-500 hover:text-white"
                                )}
                            >
                                React Native
                            </button>
                            <button
                                onClick={() => setActiveTab("flutter")}
                                className={cn(
                                    "px-10 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all",
                                    activeTab === "flutter" ? "bg-primary text-black" : "text-neutral-500 hover:text-white"
                                )}
                            >
                                Flutter
                            </button>
                        </div>

                        <div className="relative aspect-video bg-neutral-950 rounded-[40px] border border-white/5 overflow-hidden flex items-center justify-center group shadow-2xl">
                            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:40px_40px]" />

                            <motion.div
                                key={activeTab}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ type: "spring", bounce: 0.5 }}
                                className="relative z-10"
                            >
                                {activeTab === "rn" ? (
                                    <div className="bg-primary text-black px-12 py-6 rounded-full font-black uppercase tracking-widest shadow-2xl shadow-primary/20">
                                        Hello React Native
                                    </div>
                                ) : (
                                    <div className="bg-white text-black px-12 py-6 rounded-full font-black uppercase tracking-widest shadow-2xl shadow-white/10">
                                        Hello Flutter
                                    </div>
                                )}
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
