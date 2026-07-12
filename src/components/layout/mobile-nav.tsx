'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Smartphone, Sparkles, Search, User } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';

export function MobileNav() {
  const pathname = usePathname();
  const { user } = useAuth();

  const tabs = [
    { label: 'Components', href: '/components', icon: Smartphone },
    { label: 'Playground', href: '/playground', icon: Sparkles },
    { label: 'Search', href: '/search', icon: Search },
    { label: 'Profile', href: user ? `/profile/${user.id}` : '/login', icon: User },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 h-16 bg-[#0f0f14]/85 backdrop-blur-lg border-t border-[#2a2a38] flex items-center justify-around px-4">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const active = pathname?.startsWith(tab.href);
        return (
          <Link
            key={tab.label}
            href={tab.href}
            className={cn(
              'flex flex-col items-center justify-center space-y-1 text-slate-500 hover:text-white transition-colors duration-200',
              active && 'text-fuchsia-600'
            )}
          >
            <Icon className="h-5 w-5" />
            <span className="text-[9px] font-bold uppercase tracking-wider">{tab.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
