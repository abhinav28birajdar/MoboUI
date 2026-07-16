"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

interface FrameworkTabsProps {
    activeFramework: 'react-native' | 'flutter';
    onFrameworkChange: (framework: 'react-native' | 'flutter') => void;
}

export const FrameworkTabs: React.FC<FrameworkTabsProps> = ({
    activeFramework,
    onFrameworkChange
}) => {
    return (
        <div className="flex bg-secondary/30 p-1.5 rounded-2xl gap-2 w-full max-w-[400px] mx-auto border border-white/5">
            <button
                className={cn(
                    "flex-1 relative py-2.5 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 z-10",
                    activeFramework === 'react-native' ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                )}
                onClick={() => onFrameworkChange('react-native')}
            >
                {activeFramework === 'react-native' && (
                    <motion.div
                        layoutId="active-framework"
                        className="absolute inset-0 bg-primary rounded-xl shadow-lg shadow-primary/20 -z-10"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                )}
                <span className="text-lg">⚛️</span>
                React Native
            </button>

            <button
                className={cn(
                    "flex-1 relative py-2.5 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 z-10",
                    activeFramework === 'flutter' ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                )}
                onClick={() => onFrameworkChange('flutter')}
            >
                {activeFramework === 'flutter' && (
                    <motion.div
                        layoutId="active-framework"
                        className="absolute inset-0 bg-primary rounded-xl shadow-lg shadow-primary/20 -z-10"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                )}
                <span className="text-lg">🐦</span>
                Flutter
            </button>
        </div>
    );
};
