"use client";

import { PageHeader } from "@/components/shared/PageHeader";
import { CheckCircle2, AlertCircle, Clock } from "lucide-react";

export default function StatusPage() {
    return (
        <div className="container mx-auto px-4 py-32 bg-background">
            <div className="max-w-3xl mx-auto">
                <PageHeader
                    badge="System Status"
                    title="All Systems/Operational."
                    description="Real-time status of our services and API performance."
                    centered
                />

                <div className="mt-20 space-y-6">
                    <div className="p-8 bg-surface border border-border rounded-[2.5rem] flex items-center justify-between shadow-sm">
                        <div className="flex items-center gap-6">
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                <CheckCircle2 size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-text-primary uppercase  tracking-tighter">Website & App</h3>
                                <p className="text-xs text-text-muted font-bold uppercase tracking-widest">Global CDN Delivery</p>
                            </div>
                        </div>
                        <span className="px-4 py-1.5 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-full">Operational</span>
                    </div>

                    <div className="p-8 bg-surface border border-border rounded-[2.5rem] flex items-center justify-between shadow-sm">
                        <div className="flex items-center gap-6">
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                <CheckCircle2 size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-text-primary uppercase  tracking-tighter">Component API</h3>
                                <p className="text-xs text-text-muted font-bold uppercase tracking-widest">34ms Response Time</p>
                            </div>
                        </div>
                        <span className="px-4 py-1.5 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-full">Operational</span>
                    </div>

                    <div className="p-8 bg-surface border border-border rounded-[2.5rem] flex items-center justify-between shadow-sm">
                        <div className="flex items-center gap-6">
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                <CheckCircle2 size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-text-primary uppercase  tracking-tighter">Playground Services</h3>
                                <p className="text-xs text-text-muted font-bold uppercase tracking-widest">99.9% Uptime</p>
                            </div>
                        </div>
                        <span className="px-4 py-1.5 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-full">Operational</span>
                    </div>
                </div>

                <div className="mt-20 p-12 bg-surface border border-border rounded-[3rem] text-center">
                    <h4 className="text-sm font-black text-text-muted uppercase tracking-[0.3em] mb-4">Past Incidents</h4>
                    <p className="text-text-secondary font-medium">No incidents reported in the last 90 days.</p>
                </div>
            </div>
        </div>
    );
}
