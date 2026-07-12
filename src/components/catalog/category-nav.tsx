'use client';

import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface CategoryNavProps {
  categories: { name: string; slug: string; count?: number }[];
  selectedCategories: string[];
  onToggleCategory: (slug: string) => void;
  onClearAll?: () => void;
  className?: string;
}

export function CategoryNav({ categories, selectedCategories, onToggleCategory, onClearAll, className }: CategoryNavProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(true);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setShowLeftScroll(scrollLeft > 0);
    setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener('resize', handleScroll);
    return () => window.removeEventListener('resize', handleScroll);
  }, [categories]);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = 200;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <div className={cn("relative flex items-center w-full", className)}>
      {showLeftScroll && (
        <button 
          onClick={() => scroll('left')}
          className="absolute left-0 z-10 flex h-full items-center justify-center bg-gradient-to-r from-bg-base via-bg-base/90 to-transparent pr-4 pl-2"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-bg-card border border-border-subtle shadow-md hover:bg-white/5 hover:text-white transition-colors">
            <ChevronLeft size={16} />
          </div>
        </button>
      )}

      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex w-full gap-2 overflow-x-auto scrollbar-none py-1 scroll-smooth px-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <button
          onClick={() => onClearAll && onClearAll()}
          className={cn(
            "flex-none px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all border",
            selectedCategories.length === 0
              ? "bg-fuchsia-600/10 border-fuchsia-600/30 text-fuchsia-400"
              : "bg-bg-card border-border-subtle text-text-secondary hover:text-white hover:bg-white/5"
          )}
        >
          All
        </button>
        {categories.map((category) => {
          const isActive = selectedCategories.includes(category.slug);

          return (
            <button
              key={category.slug}
              onClick={() => onToggleCategory(category.slug)}
              className={cn(
                "flex-none px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all border whitespace-nowrap",
                isActive
                  ? "bg-fuchsia-600 border-fuchsia-500 text-white shadow-[0_0_15px_rgba(192,38,211,0.2)]"
                  : "bg-bg-card border-border-subtle text-text-secondary hover:text-white hover:bg-white/5"
              )}
            >
              {category.name}
            </button>
          );
        })}
      </div>

      {showRightScroll && (
        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 z-10 flex h-full items-center justify-center bg-gradient-to-l from-bg-base via-bg-base/90 to-transparent pl-4 pr-2"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-bg-card border border-border-subtle shadow-md hover:bg-white/5 hover:text-white transition-colors">
            <ChevronRight size={16} />
          </div>
        </button>
      )}
    </div>
  );
}