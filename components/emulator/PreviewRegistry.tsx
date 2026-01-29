"use client";

import React from 'react';
import {
    Smartphone, Search, Layers,
    Home, Bell, CheckCircle,
    ChevronLeft, Settings,
    User, Moon, Sun, ShoppingCart
} from 'lucide-react';

// --- 1. FOUNDATION ---

const SafeViewPreview = () => (
    <div className="w-full h-full border-4 border-dashed border-primary/20 rounded-[2rem] p-4 flex flex-col">
        <div className="bg-primary/10 h-8 rounded-full mb-4 w-1/2" />
        <div className="flex-1 bg-white/5 rounded-2xl flex items-center justify-center text-[10px] text-white/20 font-mono">
            SAFE CONTENT AREA
        </div>
    </div>
);

const VStackPreview = () => (
    <div className="flex flex-col w-full gap-4 px-4 overflow-hidden">
        {[1, 2, 3].map(i => (
            <div key={i} className="h-16 bg-white/5 border border-dashed border-white/20 rounded-2xl flex items-center justify-center text-[10px] text-white/20 font-mono">
                BLOCK {i}
            </div>
        ))}
    </div>
);

const HStackPreview = () => (
    <div className="flex w-full gap-3 px-4">
        {[1, 2, 3].map(i => (
            <div key={i} className="flex-1 h-20 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center text-[10px] text-primary/50 font-bold">
                ITEM
            </div>
        ))}
    </div>
);

// --- 2. NAVIGATION ---

const HeaderBarPreview = () => (
    <div className="w-full absolute top-0 left-0 right-0 p-4 pt-12 bg-surface/80 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                <ChevronLeft className="text-white" size={20} />
            </div>
            <h3 className="text-white font-bold tracking-tight text-sm">Header Bar</h3>
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                <Settings className="text-white" size={18} />
            </div>
        </div>
    </div>
);

const TabBarPreview = () => (
    <div className="w-full absolute bottom-6 px-6">
        <div className="bg-surface/90 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-2 flex items-center justify-around shadow-2xl">
            {[Home, Search, Bell, User].map((Icon, i) => (
                <div key={i} className={`p-4 rounded-[1.5rem] transition-all duration-500 ${i === 0 ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'text-white/30'}`}>
                    <Icon size={20} />
                </div>
            ))}
        </div>
    </div>
);

// --- 3. DATA DISPLAY ---

const GlassCardPreview = () => (
    <div className="w-64 h-80 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-8 relative overflow-hidden flex flex-col justify-between group">
        <div className="absolute top-0 right-0 w-40 h-40 bg-primary/20 rounded-full blur-3xl -z-10 group-hover:bg-primary/40 transition-all duration-700" />
        <div>
            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8">
                <Layers className="text-primary" size={28} />
            </div>
            <h3 className="text-white font-black text-2xl mb-3 tracking-tighter">Glassmorphism</h3>
            <p className="text-white/40 text-[11px] leading-relaxed">Frosted glass design for modern apps.</p>
        </div>
        <button className="w-full py-4 bg-primary text-white text-xs font-black rounded-2xl transition-all">
            Get Started
        </button>
    </div>
);

const StatsCardPreview = () => (
    <div className="w-64 bg-surface border border-border rounded-3xl p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-muted-foreground uppercase">Revenue</span>
            <span className="text-green-500 font-bold text-[10px]">+12%</span>
        </div>
        <h2 className="text-3xl font-black text-white mb-4">$42,850</h2>
        <div className="flex items-end gap-1 h-12">
            {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                <div key={i} className="flex-1 bg-primary/20 rounded-t-sm" style={{ height: `${h}%` }} />
            ))}
        </div>
    </div>
);

// --- 4. INPUTS ---

const ButtonPreview = () => (
    <div className="flex flex-col gap-4 w-56">
        <button className="h-14 bg-primary text-white font-black rounded-2xl shadow-lg shadow-primary/20 active:scale-95 transition-all">PRIMARY ACTION</button>
        <button className="h-14 bg-white/5 border border-white/10 text-white/60 font-black rounded-2xl hover:bg-white/10 transition-all">SECONDARY</button>
    </div>
);

const OTPInputPreview = () => (
    <div className="flex gap-2">
        {[1, 2, 3, 4].map(i => (
            <div key={i} className="w-12 h-14 bg-surface border border-border rounded-xl flex items-center justify-center text-white text-xl font-bold">
                {i === 1 ? '5' : i === 2 ? '2' : ''}
            </div>
        ))}
    </div>
);

const SearchBarPreview = () => (
    <div className="w-full px-4">
        <div className="bg-surface border border-border rounded-2xl px-4 py-3 flex items-center gap-3">
            <Search className="text-white/30" size={18} />
            <span className="text-white/20 text-sm">Search everything...</span>
        </div>
    </div>
);

// --- 5. FEEDBACK ---

const ShimmerPreview = () => (
    <div className="flex flex-col gap-6 w-64">
        <div className="h-40 bg-white/5 rounded-[2rem] overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
        </div>
        <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
        </div>
    </div>
);

// --- 6. CONTROLS ---

const SegmentedControlPreview = () => (
    <div className="w-64 bg-surface/50 border border-border rounded-full p-1.5 flex shadow-inner">
        <div className="flex-1 py-3 bg-primary text-white text-[10px] font-black rounded-full text-center shadow-lg">MONTHLY</div>
        <div className="flex-1 py-3 text-white/30 text-[10px] font-black rounded-full text-center">ANNUAL</div>
    </div>
);

// --- 7. SOCIAL ---

const StoryRingPreview = () => (
    <div className="flex items-center gap-4">
        {[1, 2, 3].map(i => (
            <div key={i} className="p-1 rounded-full border-2 border-primary animate-pulse">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                    <User className="text-white/20" size={32} />
                </div>
            </div>
        ))}
    </div>
);

// --- 8. ECOMMERCE ---

const ProductGridPreview = () => (
    <div className="grid grid-cols-2 gap-4 w-full px-4">
        {[1, 2].map(i => (
            <div key={i} className="bg-surface rounded-3xl p-3 border border-border">
                <div className="aspect-square bg-muted rounded-2xl mb-3 overflow-hidden" />
                <div className="h-3 w-3/4 bg-white/10 rounded-full mb-2" />
                <div className="flex justify-between items-center">
                    <div className="h-4 w-1/3 bg-primary/20 rounded-full" />
                    <ShoppingCart size={14} className="text-primary" />
                </div>
            </div>
        ))}
    </div>
);

// --- 9. AUTH ---

const AuthSocialPreview = () => (
    <div className="flex flex-col gap-3 w-64">
        <button className="h-14 bg-white text-black font-black rounded-2xl flex items-center justify-center gap-3">Sign in with Google</button>
        <button className="h-14 bg-black border border-white/20 text-white font-black rounded-2xl flex items-center justify-center gap-3">Sign in with Apple</button>
    </div>
);

// --- 10. CHARTS ---

const ProgressRingPreview = () => (
    <div className="relative w-40 h-40 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90">
            <circle cx="80" cy="80" r="70" fill="transparent" stroke="currentColor" strokeWidth="12" className="text-white/5" />
            <circle cx="80" cy="80" r="70" fill="transparent" stroke="currentColor" strokeWidth="12" strokeDasharray={440} strokeDashoffset={440 * 0.3} strokeLinecap="round" className="text-primary animate-pulse" />
        </svg>
        <div className="absolute flex flex-col items-center">
            <span className="text-4xl font-black text-white">70%</span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold font-mono">GOAL</span>
        </div>
    </div>
);

// --- 11. UTILITY ---

const ThemeSwitchPreview = () => (
    <div className="w-32 h-14 bg-surface border border-border rounded-full flex items-center p-1 relative">
        <div className="w-12 h-12 bg-primary rounded-full absolute left-1 flex items-center justify-center shadow-lg">
            <Sun size={20} className="text-white" />
        </div>
        <div className="w-full flex justify-between px-4">
            <div className="w-1" />
            <Moon size={18} className="text-white/20" />
        </div>
    </div>
);

// --- 12. ANIMATIONS ---

const LottiePreview = () => (
    <div className="flex flex-col items-center gap-6">
        <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 animate-bounce">
            <CheckCircle className="w-16 h-16 text-primary" />
        </div>
        <p className="text-primary font-bold text-xs uppercase tracking-widest animate-pulse">Playing Lottie...</p>
    </div>
);

// Registry Mapping for all 12 Categories
const PREVIEWS: Record<string, React.FC<unknown>> = {
    // 1. Foundation
    'safe-area': SafeViewPreview,
    'vstack': VStackPreview,
    'hstack': HStackPreview,
    // 2. Navigation
    'header-bar': HeaderBarPreview,
    'bottom-tabs': TabBarPreview,
    // 3. Data Display
    'glass-card': GlassCardPreview,
    'stats-card': StatsCardPreview,
    // 4. Inputs
    'primary-button': ButtonPreview,
    'otp-input': OTPInputPreview,
    'search-bar': SearchBarPreview,
    // 5. Feedback
    'shimmer': ShimmerPreview,
    // 6. Controls
    'segmented-control': SegmentedControlPreview,
    // 7. Social
    'story-ring': StoryRingPreview,
    // 8. Ecommerce
    'product-grid': ProductGridPreview,
    // 9. Auth
    'auth-social': AuthSocialPreview,
    // 10. Charts
    'progress-ring': ProgressRingPreview,
    // 11. Utility
    'theme-switch': ThemeSwitchPreview,
    // 12. Animations
    'lottie-wrapper': LottiePreview,
};

export default function PreviewRegistry({ componentId }: { componentId?: string }) {
    const Preview = componentId ? PREVIEWS[componentId] : null;

    if (!Preview) {
        return (
            <div className="flex flex-col items-center justify-center gap-8 h-full text-center p-10">
                <div className="w-32 h-32 rounded-[3.5rem] bg-gradient-to-br from-white/5 to-transparent flex items-center justify-center border border-white/10 shadow-2xl relative">
                    <Smartphone size={48} className="text-white/10" />
                </div>
                <div className="space-y-4">
                    <h2 className="text-white font-black text-2xl tracking-tighter uppercase italic">Simulator</h2>
                    <p className="text-white/20 text-[11px] leading-relaxed max-w-[240px] mx-auto">
                        BRIDGE ACTIVE • SELECT COMPONENT TO BEGIN RENDERING
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-full flex items-center justify-center p-4">
            {/* @ts-expect-error - Dynamic preview mapping */}
            <Preview />
        </div>
    );
}
