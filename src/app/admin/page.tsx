"use client";

import React from "react";
import {
    Users,
    Layers,
    TrendingUp,
    DollarSign,
    ArrowUpRight,
    ArrowDownRight,
    Clock,
    CheckCircle2,
    XCircle,
    AlertCircle
} from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";

export default function AdminDashboardPage() {
    return (
        <div className="container mx-auto px-4 py-32">
            <div className="flex justify-between items-end mb-12">
                <PageHeader
                    title="Admin Dashboard"
                    description="Manage users, components, and monitor site performance."
                />
                <div className="flex gap-4 mb-4">
                    <Button variant="secondary" className="rounded-xl border-white/5 bg-neutral-900">
                        Export Report
                    </Button>
                    <Button variant="neon" className="rounded-xl">
                        Refresh Data
                    </Button>
                </div>
            </div>

            {/* KPI Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {[
                    { label: "Total Users", value: "12,842", change: "+12%", positive: true, icon: <Users className="text-blue-500" /> },
                    { label: "Approved Components", value: "48", change: "+4", positive: true, icon: <Layers className="text-amber-500" /> },
                    { label: "Monthly Revenue", value: "$4,290", change: "-2%", positive: false, icon: <TrendingUp className="text-purple-500" /> },
                    { label: "Active Subscriptions", value: "382", change: "+18%", positive: true, icon: <DollarSign className="text-green-500" /> },
                ].map((stat, i) => (
                    <div key={i} className="p-8 rounded-[2rem] bg-neutral-900 border border-white/5 shadow-xl">
                        <div className="flex justify-between items-start mb-6">
                            <div className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center">
                                {stat.icon}
                            </div>
                            <div className={cn("flex items-center text-xs font-bold", stat.positive ? "text-green-500" : "text-red-500")}>
                                {stat.positive ? <ArrowUpRight size={14} className="mr-1" /> : <ArrowDownRight size={14} className="mr-1" />}
                                {stat.change}
                            </div>
                        </div>
                        <div className="space-y-1">
                            <span className="text-xs font-black text-neutral-500 uppercase tracking-widest">{stat.label}</span>
                            <p className="text-3xl font-black text-white">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-12">
                {/* Recent Submissions Queue */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                            <Clock size={20} className="text-amber-500" />
                            Pending Reviews
                        </h3>
                        <Button variant="ghost" className="text-amber-500 text-sm font-bold">View All</Button>
                    </div>

                    <div className="space-y-4">
                        {[
                            { name: "Neo-Classic Button", author: "@dev_sarah", date: "2 hours ago", status: "PENDING" },
                            { name: "Glass Morphic Picker", author: "@alex_code", date: "5 hours ago", status: "PENDING" },
                            { name: "Animated Tab Bar", author: "@marcus_ui", date: "Yesterday", status: "UNDER_REVIEW" },
                        ].map((sub, i) => (
                            <div key={i} className="flex items-center justify-between p-6 rounded-3xl bg-neutral-900/50 border border-white/5 hover:bg-neutral-900 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-2xl bg-neutral-800 flex items-center justify-center">
                                        <Layers size={20} className="text-neutral-500" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white">{sub.name}</h4>
                                        <p className="text-xs text-neutral-500">by {sub.author} • {sub.date}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Button size="sm" variant="outline" className="h-9 px-4 rounded-xl border-white/10 text-xs font-bold hover:text-red-500 hover:border-red-500/50">Reject</Button>
                                    <Button size="sm" variant="neon" className="h-9 px-4 rounded-xl text-xs font-bold">Approve</Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions / System Status */}
                <div className="space-y-8">
                    <div className="p-8 rounded-[2.5rem] bg-neutral-900 border border-white/5">
                        <h3 className="text-lg font-bold text-white mb-6">System Health</h3>
                        <div className="space-y-6">
                            {[
                                { label: "API Latency", status: "Operational", color: "text-green-500", icon: <CheckCircle2 size={16} /> },
                                { label: "Database", status: "Healthy", color: "text-green-500", icon: <CheckCircle2 size={16} /> },
                                { label: "Stripe Webhooks", status: "Operational", color: "text-green-500", icon: <CheckCircle2 size={16} /> },
                                { label: "Storage", status: "92% Full", color: "text-yellow-500", icon: <AlertCircle size={16} /> },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-neutral-400">{item.label}</span>
                                    <div className={cn("flex items-center gap-1.5 text-xs font-bold", item.color)}>
                                        {item.icon}
                                        {item.status}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative group overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-amber-500 to-amber-600 p-8 shadow-xl shadow-amber-500/20">
                        <div className="relative z-10 text-black">
                            <h3 className="text-xl font-black mb-2 uppercase tracking-tighter">Premium Sales</h3>
                            <p className="text-black/60 text-sm font-bold mb-6">Track your subscription growth.</p>
                            <Button className="w-full bg-black text-white hover:bg-neutral-900 rounded-2xl h-12 font-bold transition-all group-hover:scale-[1.02]">
                                View Finance
                            </Button>
                        </div>
                        <DollarSign size={160} className="absolute -right-8 -bottom-8 text-black/10 transition-transform group-hover:scale-110" />
                    </div>
                </div>
            </div>
        </div>
    );
}

// Helper for cn in case it's not imported in local scope
import { cn } from "@/lib/utils/cn";
