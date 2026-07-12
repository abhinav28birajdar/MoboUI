"use client";

import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from 'recharts';

interface ChartData {
  date: string;
  views: number;
  downloads: number;
  likes: number;
  copies: number;
}

interface AnalyticsChartsProps {
  data: ChartData[];
}

export function AnalyticsCharts({ data }: AnalyticsChartsProps) {
  const [activeTab, setActiveTab] = useState<'views' | 'engagement'>('views');

  // Format date for X-axis
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(date);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-neutral-900 border border-white/10 p-4 rounded-2xl shadow-xl">
          <p className="text-white font-bold mb-2">{formatDate(label)}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center justify-between gap-4 text-sm mb-1">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                <span className="text-neutral-400 capitalize">{entry.name}</span>
              </div>
              <span className="font-bold text-white">{entry.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="flex bg-neutral-900/50 p-1 rounded-xl w-fit border border-white/5">
        <button
          onClick={() => setActiveTab('views')}
          className={`px-6 py-2 rounded-lg text-sm font-bold transition-colors ${
            activeTab === 'views' ? 'bg-white/10 text-white' : 'text-neutral-500 hover:text-white'
          }`}
        >
          Views & Copies
        </button>
        <button
          onClick={() => setActiveTab('engagement')}
          className={`px-6 py-2 rounded-lg text-sm font-bold transition-colors ${
            activeTab === 'engagement' ? 'bg-white/10 text-white' : 'text-neutral-500 hover:text-white'
          }`}
        >
          Engagement (Likes/Downloads)
        </button>
      </div>

      <div className="h-[400px] w-full bg-neutral-900/30 border border-white/5 rounded-3xl p-6 pt-10">
        <ResponsiveContainer width="100%" height="100%">
          {activeTab === 'views' ? (
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FFCA03" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#FFCA03" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorCopies" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
              <XAxis dataKey="date" tickFormatter={formatDate} stroke="#ffffff40" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#ffffff40" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
              <Area type="monotone" dataKey="views" name="Views" stroke="#FFCA03" strokeWidth={3} fillOpacity={1} fill="url(#colorViews)" />
              <Area type="monotone" dataKey="copies" name="Copies" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorCopies)" />
            </AreaChart>
          ) : (
            <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
              <XAxis dataKey="date" tickFormatter={formatDate} stroke="#ffffff40" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#ffffff40" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
              <Bar dataKey="likes" name="Likes" fill="#EC4899" radius={[4, 4, 0, 0]} />
              <Bar dataKey="downloads" name="Downloads" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
