'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { ChevronLeft, ChevronRight, Filter, Laptop, Phone, Smartphone, Tablet } from 'lucide-react';
import { categories as mockCategories } from '@/lib/data/components-data';

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [collapsed, setCollapsed] = React.useState(false);

  const activeCategory = searchParams.get('category') || '';
  const activeFramework = searchParams.get('framework') || 'all';

  const handleFrameworkChange = (framework: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (framework === 'all') {
      params.delete('framework');
    } else {
      params.set('framework', framework);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleCategoryChange = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (activeCategory === slug) {
      params.delete('category');
    } else {
      params.set('category', slug);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const frameworks = [
    { id: 'all', label: 'All Frameworks', icon: Laptop },
    { id: 'react_native', label: 'React Native', icon: Smartphone },
    { id: 'flutter', label: 'Flutter', icon: Smartphone },
    { id: 'expo', label: 'Expo', icon: Smartphone },
    { id: 'web', label: 'Web', icon: Laptop },
  ];

  const tags = ['buttons', 'cards', 'fintech', 'animations', 'charts', 'input', 'toast', 'shimmer', 'accessibility'];

  return (
    <aside
      className={cn(
        'sticky top-24 h-[calc(100vh-8rem)] border-r border-[#2a2a38] bg-[#0f0f14] transition-all duration-300 flex flex-col',
        collapsed ? 'w-16' : 'w-64',
        className
      )}
    >
      {/* Collapse Trigger */}
      <div className="flex justify-end p-2 border-b border-[#2a2a38]">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-slate-400 hover:text-white"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </Button>
      </div>

      <div className={cn('flex-1 overflow-y-auto p-4 space-y-6', collapsed && 'p-2')}>
        {/* Framework Filter */}
        <div className="space-y-2">
          {!collapsed && (
            <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Filter size={10} /> Framework
            </h4>
          )}
          <div className="space-y-1">
            {frameworks.map((fw) => {
              const active = activeFramework === fw.id;
              const Icon = fw.icon;
              return (
                <Button
                  key={fw.id}
                  variant={active ? 'default' : 'ghost'}
                  className={cn(
                    'w-full justify-start gap-3 h-10',
                    active ? 'bg-fuchsia-600 text-white' : 'text-slate-400 hover:text-white',
                    collapsed && 'justify-center px-0'
                  )}
                  onClick={() => handleFrameworkChange(fw.id)}
                  title={fw.label}
                >
                  <Icon size={16} />
                  {!collapsed && <span className="text-xs font-bold">{fw.label}</span>}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Categories List */}
        <div className="space-y-2">
          {!collapsed && (
            <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-500">
              Categories
            </h4>
          )}
          <div className="space-y-1">
            {mockCategories.map((cat) => {
              const active = activeCategory === cat.slug;
              return (
                <Button
                  key={cat.id}
                  variant={active ? 'default' : 'ghost'}
                  className={cn(
                    'w-full justify-start gap-3 h-10',
                    active ? 'bg-fuchsia-600 text-white' : 'text-slate-400 hover:text-white',
                    collapsed && 'justify-center px-0'
                  )}
                  onClick={() => handleCategoryChange(cat.slug)}
                  title={cat.name}
                >
                  <span className="text-base shrink-0">{cat.icon}</span>
                  {!collapsed && (
                    <div className="flex items-center justify-between w-full">
                      <span className="text-xs font-bold">{cat.name}</span>
                      <span className="text-[10px] text-slate-500 font-mono">{cat.count}</span>
                    </div>
                  )}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Tag Cloud */}
        {!collapsed && (
          <div className="space-y-2 pt-2 border-t border-[#2a2a38]">
            <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-500">
              Popular Tags
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-[#1a1a24] hover:bg-[#2a2a38] text-[10px] font-bold text-slate-400 hover:text-white rounded-md cursor-pointer border border-[#2a2a38]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
