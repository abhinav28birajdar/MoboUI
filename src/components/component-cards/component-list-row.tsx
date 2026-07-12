import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Component } from '@/types/component';
import { getFrameworkIcon, getFrameworkColor, formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Eye, Copy, Heart, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ComponentListRowProps {
  component: Component;
  className?: string;
  isFavorited?: boolean;
  onFavoriteToggle?: (id: string) => void;
}

export function ComponentListRow({ component, className, isFavorited, onFavoriteToggle }: ComponentListRowProps) {
  const Icon = getFrameworkIcon(component.framework);
  
  return (
    <div className={`group flex items-center gap-4 rounded-xl border border-[#2a2a38] bg-[#1a1a24] p-3 transition-all duration-200 hover:border-fuchsia-600 hover:bg-[#20202d] ${className || ''}`}>
      {/* Thumbnail */}
      <Link href={`/components/${component.slug}`} className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg bg-[#0f0f14]">
        <Image 
          src={component.thumbnail_url || '/placeholder-component.png'} 
          alt={component.name}
          fill
          className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-200"
        />
      </Link>

      {/* Content */}
      <div className="flex flex-1 items-center justify-between min-w-0">
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Link href={`/components/${component.slug}`} className="text-sm font-bold text-white hover:text-fuchsia-400 truncate">
              {component.name}
            </Link>
            {component.is_new && <Badge className="bg-fuchsia-600 h-4 px-1.5 text-[9px]">NEW</Badge>}
          </div>
          <div className="flex items-center gap-3 text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <Icon size={10} className={getFrameworkColor(component.framework)} />
              <span className="uppercase tracking-wider">{component.framework}</span>
            </span>
            <span className="w-1 h-1 rounded-full bg-[#2a2a38]" />
            <span className="truncate">{component.category?.name || 'Category'}</span>
          </div>
        </div>

        {/* Stats & Actions */}
        <div className="flex items-center gap-6 shrink-0">
          <div className="hidden sm:flex items-center gap-4 text-[11px] font-mono text-slate-500">
            <span className="flex items-center gap-1.5" title="Views"><Eye size={12} /> {component.view_count}</span>
            <span className="flex items-center gap-1.5" title="Copies"><Copy size={12} /> {component.copy_count}</span>
            <span className="flex items-center gap-1.5" title="Added"><Clock size={12} /> {formatDate(component.created_at)}</span>
          </div>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className={`h-8 w-8 ${isFavorited ? 'text-red-500' : 'text-slate-500 hover:text-white'}`}
            onClick={() => onFavoriteToggle?.(component.id)}
          >
            <Heart size={16} className={isFavorited ? "fill-current" : ""} />
          </Button>
        </div>
      </div>
    </div>
  );
}
