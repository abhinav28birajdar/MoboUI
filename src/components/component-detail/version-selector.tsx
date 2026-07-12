"use client";

import React, { useState } from 'react';
import { History, ChevronDown, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from '@/lib/utils/cn';

interface Version {
  id: string;
  version: string;
  code: any;
  changelog: string;
  created_at: string;
}

interface VersionSelectorProps {
  versions: Version[];
  currentVersion: string;
  onVersionSelect: (version: Version) => void;
}

export function VersionSelector({ versions, currentVersion, onVersionSelect }: VersionSelectorProps) {
  if (!versions || versions.length === 0) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 gap-2 bg-neutral-900/50 border-white/10 text-xs font-bold text-neutral-300">
          <History size={14} />
          v{currentVersion}
          <ChevronDown size={14} className="text-neutral-500" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-neutral-900 border-white/10 right-0">
        <div className="px-2 py-2 text-[10px] font-black uppercase tracking-widest text-neutral-500">
          Version History
        </div>
        {versions.map((v) => {
          const isCurrent = v.version === currentVersion;
          return (
            <DropdownMenuItem 
              key={v.id}
              onClick={() => onVersionSelect(v)}
              className={cn(
                "flex flex-col items-start gap-1 p-3 cursor-pointer focus:bg-white/5",
                isCurrent && "bg-primary/10"
              )}
            >
              <div className="flex items-center justify-between w-full">
                <span className={cn("font-bold text-sm", isCurrent ? "text-primary" : "text-white")}>
                  v{v.version}
                </span>
                {isCurrent && <Check size={14} className="text-primary" />}
              </div>
              {v.changelog && (
                <span className="text-xs text-neutral-500 line-clamp-1">
                  {v.changelog}
                </span>
              )}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
