import type { Metadata } from "next";
import { Tag, CheckCircle2, Star } from "lucide-react";

export const metadata: Metadata = {
    title: "Changelog | MoboUI",
    description: "Latest updates and component releases for MoboUI.",
};

const changelog = [
    {
        version: "v2.0.0",
        date: "February 20, 2026",
        title: "The Neon Expansion",
        type: "major",
        changes: [
            "Complete platform redesign with Dark Neon Lime theme",
            "Added 25+ new mobile-ready components",
            "Introduced fully interactive Live Playground for React Native & Flutter",
            "New comprehensive documentation for all frameworks",
            "Added community submission and favorites system"
        ]
    },
    {
        version: "v1.5.0",
        date: "January 15, 2026",
        title: "Advanced Inputs Update",
        type: "minor",
        changes: [
            "Added OTP Input component",
            "Added Range Slider with custom thumbs",
            "Improved cross-platform consistency for switch components",
            "Fixed border-radius bugs on some Android simulator frames"
        ]
    },
    {
        version: "v1.2.0",
        date: "December 05, 2025",
        title: "Motion & Animation",
        type: "minor",
        changes: [
            "New animated button styles",
            "Added Shimmer Placeholder for loading states",
            "Added Skeleton Loader UI patterns",
            "Optimized framer-motion dependencies for web preview"
        ]
    }
];

export default function ChangelogPage() {
    return (
        <div className="container max-w-4xl mx-auto py-16 px-6 relative">
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-96 bg-primary/10 blur-[100px] -z-10 rounded-full pointer-events-none" />

            <div className="flex flex-col gap-6 mb-16">
                <h1 className="text-5xl font-heading font-black tracking-tighter text-white uppercase ">
                    Changelog
                </h1>
                <p className="text-neutral-400 text-lg">
                    Keep track of our latest components, features, and improvements.
                </p>
            </div>

            <div className="space-y-16 relative">
                {/* Timeline Line */}
                <div className="absolute left-4 top-2 bottom-0 w-px bg-white/10 md:left-[120px]" />

                {changelog.map((log) => (
                    <div key={log.version} className="relative flex flex-col md:flex-row gap-8 items-start group">
                        {/* Timeline Dot */}
                        <div className="absolute left-[11px] md:left-[115px] top-6 w-3 h-3 bg-primary rounded-full shadow-[0_0_10px_rgba(0,0,0,0.2)] z-10 hidden md:block group-hover:scale-150 transition-all" />

                        {/* Date Section */}
                        <div className="md:w-[100px] shrink-0 pt-4 flex items-center md:items-start md:flex-col gap-2">
                            <span className="text-primary font-mono text-sm shadow-sm">{log.date}</span>
                        </div>

                        {/* Content Card */}
                        <div className="flex-1 card-neon ml-8 md:ml-0 relative">
                            <div className="flex flex-wrap items-center gap-3 mb-6">
                                <div className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold font-mono border border-primary/20">
                                    <Tag className="w-3 h-3" />
                                    {log.version}
                                </div>
                                {log.type === 'major' && (
                                    <div className="flex items-center gap-1 text-fuchsia-550 text-xs font-bold uppercase tracking-widest">
                                        <Star className="w-3 h-3" fill="currentColor" /> Major Release
                                    </div>
                                )}
                            </div>

                            <h2 className="text-2xl font-bold text-white mb-6">
                                {log.title}
                            </h2>

                            <ul className="space-y-4">
                                {log.changes.map((change, i) => (
                                    <li key={i} className="flex items-start gap-3 text-neutral-300">
                                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                        <span>{change}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
