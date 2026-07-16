import React from 'react';
import { getAnalyticsData } from './actions';
import { AnalyticsCharts } from '@/components/dashboard/analytics-charts';
import { Eye, Download, Copy, Heart, TrendingUp } from 'lucide-react';
import { GlowEffect } from '@/components/shared/GlowEffect';

export const metadata = {
  title: 'Analytics Dashboard | MoboUI',
  description: 'View your component and project performance.',
};

export default async function AnalyticsPage() {
  const { data, error } = await getAnalyticsData();

  if (error || !data) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <h2 className="text-2xl font-black mb-2">Failed to load analytics</h2>
        <p className="text-neutral-500">{error || 'Unknown error occurred.'}</p>
      </div>
    );
  }

  const { chartData, summary } = data;

  const statCards = [
    { title: 'Total Views', value: summary.totalViews, icon: Eye, color: 'text-primary', bg: 'bg-primary/10' },
    { title: 'Copies', value: summary.totalCopies, icon: Copy, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { title: 'Downloads', value: summary.totalDownloads, icon: Download, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { title: 'Likes', value: summary.totalLikes, icon: Heart, color: 'text-pink-500', bg: 'bg-pink-500/10' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-12 relative">
      <GlowEffect className="top-0 right-0 opacity-5" size="lg" />

      {/* Header */}
      <div>
        <h1 className="text-3xl font-black uppercase tracking-tighter mb-2 flex items-center gap-3">
          Analytics <TrendingUp className="text-primary" />
        </h1>
        <p className="text-neutral-500 font-medium">Track how your components and projects are performing across the platform.</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-neutral-900/40 border border-white/5 p-6 rounded-[2rem] hover:bg-neutral-900/60 transition-colors">
              <div className="flex justify-between items-start mb-6">
                <div className={`w-12 h-12 rounded-2xl ${stat.bg} flex items-center justify-center`}>
                  <Icon className={stat.color} size={24} />
                </div>
              </div>
              <div>
                <div className="text-sm font-bold text-neutral-500 uppercase tracking-widest mb-1">{stat.title}</div>
                <div className="text-4xl font-black text-white">{stat.value.toLocaleString()}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Charts */}
      <div>
        <h2 className="text-xl font-black uppercase tracking-tighter mb-6">Performance Overview</h2>
        <AnalyticsCharts data={chartData} />
      </div>

      {/* Placeholder for top performing items */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-neutral-900/40 border border-white/5 p-8 rounded-[3rem]">
          <h3 className="text-lg font-black uppercase tracking-tighter mb-6">Top Components</h3>
          <div className="space-y-4">
            <p className="text-neutral-500 text-sm">More detailed component analytics coming soon...</p>
          </div>
        </div>
        <div className="bg-neutral-900/40 border border-white/5 p-8 rounded-[3rem]">
          <h3 className="text-lg font-black uppercase tracking-tighter mb-6">Audience Growth</h3>
          <div className="space-y-4">
            <p className="text-neutral-500 text-sm">Follower and audience tracking features coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
