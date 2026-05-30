"use client";

import { motion } from "framer-motion";
import MobileFrame from "@/components/emulator/MobileFrame";
import PreviewRegistry from "@/components/emulator/PreviewRegistry";
import { useEffect, useState } from "react";

const showcaseComponents = [
    "glass-card",
    "stats-card",
    "product-detail",
    "music-player",
    "profile-card",
    "image-showcase-1",
    "image-showcase-2",
];

export function HeroEmulator() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % showcaseComponents.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative z-10 perspective-[2000px] group">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full opacity-50 -z-10 group-hover:opacity-70 transition-opacity duration-700" />

            <motion.div
                initial={{ rotateY: -15, rotateX: 5, y: 50, opacity: 0 }}
                animate={{ rotateY: -12, rotateX: 5, y: 0, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="relative transform-preserve-3d transition-transform duration-500 hover:rotate-y-0 hover:rotate-x-0"
            >
                <MobileFrame
                    componentId={showcaseComponents[currentIndex]}
                    device="iphone-14-pro"
                >
                    <PreviewRegistry componentId={showcaseComponents[currentIndex]} />
                </MobileFrame>

                {/* Floating Elements */}
                <motion.div
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -right-20 top-40 bg-background/80 backdrop-blur-md border border-white/10 p-4 rounded-2xl shadow-xl hidden lg:block"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <div className="w-3 h-3 rounded-full bg-primary" />
                    </div>
                    <div className="mt-3 space-y-2">
                        <div className="h-2 w-24 bg-white/10 rounded" />
                        <div className="h-2 w-16 bg-white/10 rounded" />
                    </div>
                </motion.div>

                <motion.div
                    animate={{ y: [0, 20, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute -left-16 bottom-40 bg-background/80 backdrop-blur-md border border-white/10 p-4 rounded-2xl shadow-xl hidden lg:block"
                >
                    <div className="font-mono text-[10px] text-primary">
                        &lt;Component /&gt;
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}
