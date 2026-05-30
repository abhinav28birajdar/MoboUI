import type { Metadata } from "next";
import { User, Settings, FolderHeart, History, Shield, LogOut, Heart, Eye, LayoutGrid } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { components } from "@/lib/data/components";

export const metadata: Metadata = {
    title: "Account | MoboUI",
    description: "Manage your MoboUI account, submissions, and preferences.",
};

export default function AccountPage() {
    const portfolio = components.slice(0, 6);

    return (
        <div className="container max-w-7xl mx-auto py-12 md:py-16 px-6 relative">
            <div className="absolute top-1/4 right-0 w-[420px] h-[420px] bg-primary/10 blur-[140px] -z-10 rounded-full pointer-events-none" />

            <div className="rounded-2xl border border-border bg-white overflow-hidden shadow-sm mb-8">
                <div className="h-36 md:h-44 bg-primary" />
                <div className="px-6 md:px-8 pb-8 -mt-14 md:-mt-16">
                    <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-white border-4 border-white shadow-sm flex items-center justify-center">
                        <span className="text-2xl md:text-3xl font-black text-primary">DEV</span>
                    </div>

                    <div className="mt-4 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-text-primary">Developer One</h1>
                            <p className="text-text-secondary mt-1">dev_one@example.com</p>
                            <div className="mt-4 flex flex-wrap gap-2">
                                <span className="px-3 py-1 text-xs rounded-lg border border-amber-200 bg-amber-50 text-amber-700 font-semibold uppercase tracking-wider">Pro Member</span>
                                <span className="px-3 py-1 text-xs rounded-lg border border-border bg-surface text-text-secondary font-semibold uppercase tracking-wider">Member since 2026</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-3 md:min-w-[380px]">
                            <div className="card-premium p-4 text-center">
                                <p className="text-2xl font-black text-text-primary">24</p>
                                <p className="text-xs text-text-muted uppercase tracking-wider">Projects</p>
                            </div>
                            <div className="card-premium p-4 text-center">
                                <p className="text-2xl font-black text-text-primary">1.2k</p>
                                <p className="text-xs text-text-muted uppercase tracking-wider">Followers</p>
                            </div>
                            <div className="card-premium p-4 text-center">
                                <p className="text-2xl font-black text-text-primary">8.9k</p>
                                <p className="text-xs text-text-muted uppercase tracking-wider">Likes</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">
                <aside className="card-premium p-4 h-fit">
                    <nav className="space-y-2">
                        <Link href="/account" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-amber-50 text-amber-700 font-semibold border border-amber-100 transition-all">
                            <User className="w-5 h-5" /> Profile
                        </Link>
                        <Link href="/favorites" className="flex items-center gap-3 px-4 py-3 rounded-xl text-text-secondary hover:text-amber-700 hover:bg-amber-50 transition-all font-semibold">
                            <FolderHeart className="w-5 h-5" /> Favorites
                        </Link>
                        <Link href="/account/history" className="flex items-center gap-3 px-4 py-3 rounded-xl text-text-secondary hover:text-amber-700 hover:bg-amber-50 transition-all font-semibold">
                            <History className="w-5 h-5" /> Submissions
                        </Link>
                        <Link href="/account/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl text-text-secondary hover:text-amber-700 hover:bg-amber-50 transition-all font-semibold">
                            <Settings className="w-5 h-5" /> Preferences
                        </Link>
                        <Link href="/account/security" className="flex items-center gap-3 px-4 py-3 rounded-xl text-text-secondary hover:text-amber-700 hover:bg-amber-50 transition-all font-semibold">
                            <Shield className="w-5 h-5" /> Security
                        </Link>
                    </nav>

                    <div className="pt-6 border-t border-border mt-6">
                        <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all font-semibold w-full text-left">
                            <LogOut className="w-5 h-5" /> Sign Out
                        </button>
                    </div>
                </aside>

                <div className="space-y-8">
                    <section className="card-premium p-6">
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-xl font-bold text-text-primary">Portfolio Grid</h2>
                            <Button variant="ghost" className="text-primary">
                                <LayoutGrid className="w-4 h-4 mr-2" /> Manage
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                            {portfolio.map((item) => (
                                <Link key={item.slug} href={`/components/${item.slug}`} className="card-premium p-4">
                                    <p className="text-sm font-bold text-text-primary line-clamp-1">{item.name}</p>
                                    <p className="text-xs text-text-secondary mt-1 line-clamp-2">{item.description}</p>
                                    <div className="mt-3 flex items-center gap-3 text-xs text-text-muted">
                                        <span className="inline-flex items-center gap-1"><Eye className="w-3 h-3" /> 1.8k</span>
                                        <span className="inline-flex items-center gap-1"><Heart className="w-3 h-3" /> 264</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>

                    <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="card-premium p-6">
                            <h3 className="text-lg font-bold text-text-primary mb-3">Saved Collections</h3>
                            <p className="text-text-secondary text-sm mb-6">Curate components into reusable sets for projects and clients.</p>
                            <Button asChild className="w-full">
                                <Link href="/favorites">Open Favorites</Link>
                            </Button>
                        </div>

                        <div className="card-premium p-6">
                            <h3 className="text-lg font-bold text-text-primary mb-3">Submission History</h3>
                            <p className="text-text-secondary text-sm mb-6">Track pending and approved community uploads in one place.</p>
                            <Button asChild variant="outline" className="w-full">
                                <Link href="/account/history">View Submissions</Link>
                            </Button>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
