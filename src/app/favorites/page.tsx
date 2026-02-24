import type { Metadata } from "next";
import { FolderHeart, Plus, Share2, MoreVertical, LayoutGrid, List } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
    title: "Favorites | MoboUI",
    description: "Your saved MoboUI components.",
};

export default function FavoritesPage() {
    return (
        <div className="container mx-auto py-16 px-6 relative">
            <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-amber-500/5 blur-[150px] -z-10 rounded-full pointer-events-none" />

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                    <h1 className="text-4xl font-heading font-black tracking-tighter text-white uppercase  mb-4">
                        Collections & Favorites
                    </h1>
                    <p className="text-neutral-400 text-lg">
                        Organize and access your favorite components.
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 bg-black p-1 rounded-xl border border-white/10 hidden sm:flex">
                        <Button variant="ghost" size="icon" className="h-10 w-10 text-amber-500 bg-amber-500/10 rounded-lg shadow-sm">
                            <LayoutGrid className="w-5 h-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-10 w-10 text-neutral-500 hover:text-white rounded-lg transition-colors">
                            <List className="w-5 h-5" />
                        </Button>
                    </div>
                    <Button className="btn-primary animate-pulse shadow-[0_0_20px_rgba(132,204,22,0.4)]">
                        <Plus className="w-5 h-5 mr-2" /> New Collection
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map((collection) => (
                    <div key={collection} className="card-neon overflow-hidden group">
                        <div className="h-40 bg-neutral-950 border-b border-white/5 p-4 flex gap-2">
                            <div className="flex-1 bg-amber-500/5 rounded-lg border border-amber-500/10 flex items-center justify-center">
                                <span className="text-neutral-600 font-mono text-xs uppercase">Preview 1</span>
                            </div>
                            <div className="w-1/3 flex flex-col gap-2">
                                <div className="flex-1 bg-amber-500/5 rounded-lg border border-amber-500/10 flex items-center justify-center">
                                    <span className="text-neutral-600 font-mono text-[10px] uppercase">Preview 2</span>
                                </div>
                                <div className="flex-1 bg-amber-500/5 rounded-lg border border-amber-500/10 flex items-center justify-center relative">
                                    <span className="text-amber-500 font-bold text-xs uppercase">+4</span>
                                </div>
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-xl font-bold text-white group-hover:text-amber-500 transition-colors">
                                    {collection === 1 ? "Auth Screens" : collection === 2 ? "Glass UI" : "E-commerce"}
                                </h3>
                                <button className="text-neutral-500 hover:text-white transition-colors">
                                    <MoreVertical className="w-5 h-5" />
                                </button>
                            </div>
                            <p className="text-neutral-400 text-sm mb-4">
                                {collection === 1 ? "12 components" : collection === 2 ? "5 components" : "8 components"}
                            </p>

                            <div className="flex items-center gap-3">
                                <Button size="sm" variant="outline" className="w-full border-white/10 text-neutral-300 hover:text-white hover:bg-white/5 transition-all">
                                    Open Collection
                                </Button>
                                <Button size="icon" variant="outline" className="h-9 w-9 border-white/10 text-neutral-300 hover:text-white hover:bg-white/5 transition-all shrink-0">
                                    <Share2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Create new collection card */}
                <div className="card-neon border-dashed hover:bg-white/5 transition-all cursor-pointer flex flex-col items-center justify-center min-h-[300px] gap-4">
                    <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-2">
                        <FolderHeart className="w-8 h-8 text-amber-500" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Create Collection</h3>
                    <p className="text-neutral-500 text-sm text-center px-8">
                        Group your favorite components together for easy access on your next project.
                    </p>
                </div>
            </div>
        </div>
    );
}
