"use client";

import { motion } from "framer-motion";

export function LoadingSpinner() {
    return (
        <div className="flex flex-col items-center gap-4">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full"
            />
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest animate-pulse">
                Initializing Engine...
            </span>
        </div>
    );
}
