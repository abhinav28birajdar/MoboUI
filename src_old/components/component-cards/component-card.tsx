import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Component } from '@/types/component';
import { getFrameworkIcon, getFrameworkColor } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Eye, Copy, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ComponentCardProps {
  component: Component;
  className?: string;
  isFavorited?: boolean;
  onFavoriteToggle?: (id: string) => void;
}

export function ComponentCard({ component, className, isFavorited, onFavoriteToggle }: ComponentCardProps) {
  const Icon = getFrameworkIcon(component.framework);
  
  return (
    <div className={`group relative flex flex-col rounded-xl border border-[#2a2a38] bg-[#1a1a24] overflow-hidden transition-all duration-300 hover:border-fuchsia-600 hover:shadow-[0_8px_30px_rgb(192,38,211,0.12)] ${className || ''}`}>
      {/* Thumbnail Header */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0f0f14] p-4 flex items-center justify-center">
        <Image 
          src={component.thumbnail_url || '/placeholder-component.png'} 
          alt={component.name}
          fill
          className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300 group-hover:scale-105"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {component.is_new && (
            <Badge className="bg-fuchsia-600 text-white border-none shadow-[0_0_12px_rgba(192,38,211,0.4)]">New</Badge>
          )}
          {component.is_pro && (
            <Badge variant="pro">PRO</Badge>
          )}
        </div>
        
        {/* Quick Actions (Hover) */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Button 
            variant="secondary" 
            size="icon" 
            className={`h-8 w-8 rounded-full shadow-lg ${isFavorited ? 'text-red-500' : 'text-slate-400 hover:text-white'}`}
            onClick={(e) => { e.preventDefault(); onFavoriteToggle?.(component.id); }}
          >
            <Heart size={14} className={isFavorited ? "fill-current" : ""} />
          </Button>
        </div>
        
        {/* Overlay Link */}
        <Link href={`/components/${typeof component.category === 'object' ? component.category.slug : component.category}/${component.slug}`} className="absolute inset-0 z-10" aria-label={`View ${component.name}`} />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        <div className="flex items-center justify-between mb-2">
          <Link href={`/components/${typeof component.category === 'object' ? component.category.slug : component.category}/${component.slug}`} className="text-base font-bold text-white hover:text-fuchsia-400 transition-colors line-clamp-1">
            {component.name}
          </Link>
          <div className="flex items-center gap-1 shrink-0 bg-[#0f0f14] px-2 py-1 rounded-md border border-[#2a2a38]">
            <Icon size={12} className={getFrameworkColor(component.framework)} />
          </div>
        </div>
        
        <p className="text-xs text-slate-400 line-clamp-2 mb-4 flex-1">
          {component.description}
        </p>
        
        {/* Stats footer */}
        <div className="flex items-center justify-between pt-3 border-t border-[#2a2a38] text-[10px] text-slate-500 font-mono">
          <div className="flex gap-3">
            <span className="flex items-center gap-1.5"><Eye size={12} /> {component.view_count}</span>
            <span className="flex items-center gap-1.5"><Copy size={12} /> {component.copy_count}</span>
          </div>
          <span className="capitalize">{component.category?.name || 'Component'}</span>
        </div>
      </div>
    </div>
  );
}
