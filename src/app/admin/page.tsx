"use client";

import React from "react";
import Link from "next/link";
import {
  Users,
  Layers,
  TrendingUp,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  Upload,
  BarChart3,
  Settings,
} from "lucide-react";
import { useFrontendAppStore } from "@/lib/store/frontend-app-store";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import { AuthGuard } from "@/components/shared/AuthGuard";

export default function AdminDashboardPage() {
  const components = useFrontendAppStore((state) => state.components);
  const favorites = useFrontendAppStore((state) => state.favorites);
  const submissions = useFrontendAppStore((state) => state.submissions);

  const stats = [
    {
      label: "Library Components",
      value: `${components.length}`,
      change: "+6%",
      positive: true,
      icon: <Layers className="text-amber-600" />,
    },
    {
      label: "Saved Favorites",
      value: `${favorites.length}`,
      change: "+14%",
      positive: true,
      icon: <Users className="text-blue-600" />,
    },
    {
      label: "Submissions",
      value: `${submissions.length}`,
      change: submissions.length > 0 ? "+22%" : "0%",
      positive: true,
      icon: <Upload className="text-primary" />,
    },
    {
      label: "Engagement",
      value: "93%",
      change: "-1%",
      positive: false,
      icon: <TrendingUp className="text-amber-500" />,
    },
  ];

  const latestSubmissions = submissions.slice(0, 4);

  return (
    <AuthGuard requireAdmin>
      <div className="container mx-auto px-4 py-24 max-w-[1400px]">
      <div className="grid grid-cols-1 xl:grid-cols-[260px_1fr] gap-8">
        <aside className="card-premium p-4 h-fit sticky top-24">
          <p className="px-3 py-2 text-[11px] uppercase tracking-[0.2em] font-bold text-text-muted">Dashboard</p>
          <nav className="space-y-1">
            <a className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-amber-50 text-amber-700 font-semibold border border-amber-100">
              <BarChart3 className="w-4 h-4" /> Overview
            </a>
            <Link href="/admin/upload" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-text-secondary hover:text-amber-700 hover:bg-amber-50 transition-colors font-semibold">
              <Upload className="w-4 h-4" /> Upload Queue
            </Link>
            <a className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-text-secondary hover:text-amber-700 hover:bg-amber-50 transition-colors font-semibold">
              <Activity className="w-4 h-4" /> Activity Feed
            </a>
            <a className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-text-secondary hover:text-amber-700 hover:bg-amber-50 transition-colors font-semibold">
              <Settings className="w-4 h-4" /> Settings
            </a>
          </nav>
        </aside>

        <div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight text-text-primary">Admin Dashboard</h1>
              <p className="text-text-secondary mt-2">Frontend-only analytics, moderation, and publishing workflow.</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="secondary">Export CSV</Button>
              <Button variant="neon">Refresh Snapshot</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="card-premium p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-surface border border-border flex items-center justify-center">
                    {stat.icon}
                  </div>
                  <div className={cn("inline-flex items-center text-xs font-semibold", stat.positive ? "text-primary" : "text-red-500")}>
                    {stat.positive ? <ArrowUpRight size={14} className="mr-1" /> : <ArrowDownRight size={14} className="mr-1" />}
                    {stat.change}
                  </div>
                </div>
                <p className="text-xs uppercase tracking-[0.16em] text-text-muted font-bold">{stat.label}</p>
                <p className="text-3xl font-black text-text-primary mt-1">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 2xl:grid-cols-[1.35fr_1fr] gap-8">
            <section className="card-premium p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
                  <Clock size={18} className="text-amber-600" /> Recent Upload Activity
                </h2>
                <Button variant="ghost">View All</Button>
              </div>

              {latestSubmissions.length === 0 ? (
                <div className="rounded-xl border border-dashed border-border bg-surface p-8 text-center">
                  <p className="text-text-secondary text-sm">No submissions yet. Use Upload page to add one.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {latestSubmissions.map((submission) => (
                    <div key={submission.id} className="rounded-xl border border-border bg-white p-4 hover:border-amber-300 transition-colors">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="font-semibold text-text-primary">{submission.title}</p>
                          <p className="text-xs text-text-secondary mt-1">by {submission.author}</p>
                        </div>
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-100">Pending</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section className="space-y-4">
              <div className="card-premium p-6">
                <h3 className="text-lg font-bold text-text-primary mb-4">System Status</h3>
                <div className="space-y-3">
                  {[
                    { label: "Frontend Store", status: "Healthy", icon: <CheckCircle2 size={16} />, color: "text-primary" },
                    { label: "Upload Pipeline", status: "Operational", icon: <CheckCircle2 size={16} />, color: "text-primary" },
                    { label: "Search Index", status: "Synced", icon: <CheckCircle2 size={16} />, color: "text-primary" },
                    { label: "Content Queue", status: "Monitoring", icon: <AlertCircle size={16} />, color: "text-amber-500" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between text-sm">
                      <span className="text-text-secondary">{item.label}</span>
                      <span className={cn("inline-flex items-center gap-1 font-semibold", item.color)}>
                        {item.icon}
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-primary p-6 text-primary-foreground shadow-[0_4px_12px_rgba(0,0,0,0.2)]">
                <h3 className="text-xl font-black tracking-tight mb-2">Publish Faster</h3>
                <p className="text-primary-foreground/85 text-sm mb-5">Use the upload workflow to ship polished components with live preview and tags.</p>
                <Button asChild className="w-full bg-primary-foreground text-primary hover:bg-amber-50">
                  <Link href="/admin/upload">Go To Upload</Link>
                </Button>
              </div>
            </section>
          </div>
        </div>
      </div>
      </div>
    </AuthGuard>
  );
}
