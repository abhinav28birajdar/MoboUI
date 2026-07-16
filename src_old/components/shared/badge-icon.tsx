"use client";

import React from 'react';
import { cn } from '@/lib/utils/cn';
import { BadgeDefinition } from '@/lib/data/badges';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface BadgeIconProps {
  badge: BadgeDefinition;
  size?: 'sm' | 'md' | 'lg';
  showTooltip?: boolean;
  className?: string;
}

export function BadgeIcon({ badge, size = 'md', showTooltip = true, className }: BadgeIconProps) {
  const Icon = badge.icon;
  
  const sizeClasses = {
    sm: 'w-6 h-6 p-1',
    md: 'w-8 h-8 p-1.5',
    lg: 'w-12 h-12 p-2.5',
  };

  const iconSizes = {
    sm: 12,
    md: 16,
    lg: 24,
  };

  const badgeElement = (
    <div className={cn(
      "rounded-full flex items-center justify-center border border-white/5",
      badge.bgColorClass,
      badge.colorClass,
      sizeClasses[size],
      className
    )}>
      <Icon size={iconSizes[size]} strokeWidth={2.5} />
    </div>
  );

  if (!showTooltip) return badgeElement;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          {badgeElement}
        </TooltipTrigger>
        <TooltipContent className="bg-neutral-900 border-white/10 text-white p-3 rounded-xl max-w-[200px]">
          <p className="font-black uppercase tracking-wider text-xs mb-1">{badge.name}</p>
          <p className="text-[10px] text-neutral-400 leading-relaxed">{badge.description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
