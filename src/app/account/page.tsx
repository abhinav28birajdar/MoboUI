import type { Metadata } from "next";
import { User, Settings, FolderHeart, History, Shield, LogOut } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
    title: "Account | MoboUI",
    description: "Manage your MoboUI account, submissions, and preferences.",
};

export default function AccountPage() {
    return (
        <div className="container max-w-5xl mx-auto py-16 px-6 relative">
            <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-amber-500/5 blur-[150px] -z-10 rounded-full pointer-events-none" />

            <h1 className="text-4xl font-heading font-black tracking-tighter text-white uppercase  mb-10">
                My Account
            </h1>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar */}
                <div className="w-full md:w-64 shrink-0 space-y-2">
                    <Link href="/account" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-amber-500/10 text-amber-500 font-bold border border-amber-500/20 transition-all">
                        <User className="w-5 h-5" /> Profile
                    </Link>
                    <Link href="/favorites" className="flex items-center gap-3 px-4 py-3 rounded-xl text-neutral-400 hover:text-white hover:bg-white/5 transition-all font-semibold">
                        <FolderHeart className="w-5 h-5" /> Favorites
                    </Link>
                    <Link href="/account/history" className="flex items-center gap-3 px-4 py-3 rounded-xl text-neutral-400 hover:text-white hover:bg-white/5 transition-all font-semibold">
                        <History className="w-5 h-5" /> Submissions
                    </Link>
                    <Link href="/account/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl text-neutral-400 hover:text-white hover:bg-white/5 transition-all font-semibold">
                        <Settings className="w-5 h-5" /> Preferences
                    </Link>
                    <Link href="/account/security" className="flex items-center gap-3 px-4 py-3 rounded-xl text-neutral-400 hover:text-white hover:bg-white/5 transition-all font-semibold">
                        <Shield className="w-5 h-5" /> Security
                    </Link>

                    <div className="pt-8 border-t border-white/5 mt-8 border-dashed">
                        <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all font-bold w-full text-left">
                            <LogOut className="w-5 h-5" /> Sign Out
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 space-y-8">
                    <div className="card-neon flex flex-col sm:flex-row items-start sm:items-center gap-6 p-8 relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-2 h-full bg-amber-500 group-hover:w-3 transition-all" />
                        <div className="w-24 h-24 rounded-full bg-neutral-800 border-2 border-amber-500/50 flex flex-col justify-center items-center overflow-hidden relative shadow-[0_0_15px_rgba(132,204,22,0.3)]">
                            <span className="text-3xl font-heading font-black text-amber-500">DEV</span>
                        </div>
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold text-white mb-1">Developer One</h2>
                            <p className="text-neutral-500 font-mono text-sm mb-4">dev_one@example.com</p>
                            <div className="flex items-center gap-3">
                                <div className="bg-white/5 px-3 py-1 rounded-lg border border-white/10 text-xs font-bold text-neutral-300 uppercase tracking-widest">
                                    Member since 2026
                                </div>
                                <div className="bg-amber-500/10 px-3 py-1 rounded-lg border border-amber-500/30 text-xs font-bold text-amber-500 uppercase tracking-widest flex items-center gap-1">
                                    <User className="w-3 h-3" /> Pro
                                </div>
                            </div>
                        </div>
                        <Button variant="outline" className="text-neutral-400 border-white/10 hover:text-white hover:bg-white/5 hidden sm:flex">
                            Edit Profile
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="card-neon p-6 hover:border-amber-500/30 transition-colors">
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <FolderHeart className="w-5 h-5 text-amber-500" /> My Collections
                            </h3>
                            <p className="text-neutral-500 text-sm mb-6 h-10">
                                You have 12 saved components across 3 collections.
                            </p>
                            <Button asChild className="w-full bg-white/5 text-white hover:bg-white/10 border border-white/10">
                                <Link href="/favorites">View Favorites</Link>
                            </Button>
                        </div>

                        <div className="card-neon p-6 hover:border-amber-500/30 transition-colors">
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <History className="w-5 h-5 text-amber-500" /> Recent Activity
                            </h3>
                            <p className="text-neutral-500 text-sm mb-6 h-10">
                                2 components pending review. 1 approved this month.
                            </p>
                            <Button asChild className="w-full bg-white/5 text-white hover:bg-white/10 border border-white/10">
                                <Link href="/account/history">View Submissions</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
