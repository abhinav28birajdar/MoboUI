'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LayoutDashboard, Heart, FolderHeart, Settings, CreditCard, Key } from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();

  const links = [
    { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Favorites', href: '/favorites', icon: Heart },
    { label: 'Collections', href: '/collections', icon: FolderHeart },
    { label: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <div className="container mx-auto px-6 py-10 flex flex-col md:flex-row gap-10">
      {/* Sidebar Nav */}
      <aside className="w-full md:w-64 shrink-0 flex flex-col space-y-2">
        <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 px-4 mb-4">
          User Dashboard
        </h2>
        {links.map((link) => {
          const Icon = link.icon;
          const active = pathname === link.href;
          return (
            <Link key={link.href} href={link.href}>
              <span
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold uppercase tracking-wider transition-all cursor-pointer',
                  active
                    ? 'bg-fuchsia-600 text-white'
                    : 'text-slate-400 hover:text-white hover:bg-[#1a1a24]'
                )}
              >
                <Icon size={16} />
                {link.label}
              </span>
            </Link>
          );
        })}
      </aside>

      {/* Content */}
      <main className="flex-grow min-w-0">{children}</main>
    </div>
  );
}
