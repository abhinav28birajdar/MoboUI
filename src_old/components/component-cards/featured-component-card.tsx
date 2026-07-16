import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Component } from '@/types/component';
import { getFrameworkIcon, getFrameworkColor } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Download, Eye } from 'lucide-react';

interface FeaturedComponentCardProps {
  component: Component;
  className?: string;
}

export function FeaturedComponentCard({ component, className }: FeaturedComponentCardProps) {
  const Icon = getFrameworkIcon(component.framework);
  
  return (
    <div className={`group relative grid md:grid-cols-2 overflow-hidden rounded-2xl border border-[#2a2a38] bg-[#1a1a24] transition-all duration-300 hover:border-fuchsia-600 hover:shadow-[0_8px_40px_rgb(192,38,211,0.15)] ${className || ''}`}>
      {/* Visual Side */}
      <div className="relative aspect-video md:aspect-auto h-full w-full bg-[#0f0f14] flex items-center justify-center p-6 border-b md:border-b-0 md:border-r border-[#2a2a38] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-fuchsia-600/5 to-transparent pointer-events-none" />
        <Image 
          src={component.thumbnail_url || '/placeholder-component.png'} 
          alt={component.name}
          fill
          className="object-cover opacity-90 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"
        />
        {/* Badges Overlay */}
        <div className="absolute top-4 left-4 flex gap-2">
          {component.is_new && <Badge className="bg-fuchsia-600 text-white border-none shadow-[0_0_12px_rgba(192,38,211,0.4)] px-3">Featured</Badge>}
          {component.is_pro && <Badge variant="pro">PRO</Badge>}
        </div>
      </div>

      {/* Content Side */}
      <div className="flex flex-col justify-center p-6 md:p-8 relative z-10 bg-gradient-to-l from-transparent to-[#1a1a24]/50">
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#0f0f14] border border-[#2a2a38]">
            <Icon size={16} className={getFrameworkColor(component.framework)} />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{component.framework}</span>
        </div>
        
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight">
          {component.name}
        </h3>
        
        <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-8">
          {component.long_description || component.description}
        </p>
        
        <div className="flex flex-wrap items-center gap-4 mt-auto">
          <Button asChild className="gap-2 px-6">
            <Link href={`/components/${component.slug}`}>
              View Details <ArrowRight size={16} />
            </Link>
          </Button>
          
          <div className="flex items-center gap-4 text-xs font-mono text-slate-500 ml-auto">
            <span className="flex items-center gap-1.5"><Eye size={14} /> {component.view_count} views</span>
            <span className="flex items-center gap-1.5"><Download size={14} /> {component.copy_count} copies</span>
          </div>
        </div>
      </div>
    </div>
  );
}
