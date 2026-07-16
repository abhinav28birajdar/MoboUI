'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, Sparkles, ShieldAlert } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { useAuthStore } from '@/lib/store/auth-store';
import { useFavoritesStore } from '@/lib/stores/favorites-store';
import type { Component } from '@/lib/types/component';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface ComponentCardProps {
  component: Component;
}

export const ComponentCard = ({ component }: ComponentCardProps) => {
  const { user } = useAuthStore();
  const { toggleFavorite, isFavorited } = useFavoritesStore();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const {
    id,
    name,
    slug,
    category,
    description,
    is_premium: isPremium = false,
    is_new: isNew = false,
    favorite_count = 0,
    framework,
    image_url,
    preview_image_url
  } = component;

  const favorited = isFavorited(id || slug);
  const displayImage = image_url || preview_image_url || '';
  const categorySlug = typeof category === 'string' 
    ? category.toLowerCase().replace(/\s+/g, '-') 
    : (category as any)?.slug || 'general';

  // Compute frameworks list based on component record
  const frameworksList: string[] = [];
  if (framework === 'both') {
    frameworksList.push('Flutter', 'React Native', 'Expo');
  } else if (framework === 'react-native') {
    frameworksList.push('React Native');
  } else if (framework === 'expo') {
    frameworksList.push('Expo');
  } else if (framework === 'flutter') {
    frameworksList.push('Flutter');
  } else {
    // Default fallback based on code content availability
    if (component.code?.dart) frameworksList.push('Flutter');
    if (component.code?.typescript) frameworksList.push('React Native', 'Expo');
  }

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      setShowAuthModal(true);
      return;
    }

    await toggleFavorite(id || slug);
  };

  return (
    <>
      <Link href={`/components/${categorySlug}/${slug}`} className="group block h-full">
        <div className="relative flex flex-col h-full bg-bg-card border border-border-subtle rounded-[10px] overflow-hidden transition-all duration-300 hover:border-accent/40 hover:shadow-[0_0_24px_rgba(192,38,211,0.15)] hover:scale-[1.01]">
          
          {/* Image/Preview container */}
          <div className="relative aspect-[16/9] bg-bg-surface overflow-hidden">
            {displayImage ? (
              <img
                src={displayImage}
                alt={name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center border-b border-border-subtle bg-grid-pattern bg-[size:20px_20px] opacity-25">
                <Sparkles size={24} className="text-text-muted" />
              </div>
            )}

            {/* Badges on top-left */}
            <div className="absolute top-3 left-3 flex gap-2 z-10">
              {isNew && (
                <span className="px-2.5 py-1 rounded bg-accent text-white text-[9px] font-black uppercase tracking-widest">
                  NEW
                </span>
              )}
              {isPremium && (
                <span className="px-2.5 py-1 rounded bg-black/80 border border-warning text-warning text-[9px] font-black uppercase tracking-widest shadow-md">
                  PRO
                </span>
              )}
            </div>

            {/* Favorite button on top-right */}
            <button
              onClick={handleFavoriteClick}
              className={cn(
                "absolute top-3 right-3 z-10 h-8 w-8 rounded-full flex items-center justify-center backdrop-blur-md border border-border-subtle text-text-secondary hover:text-accent hover:border-accent/50 transition-all",
                favorited ? "bg-accent/10 border-accent/30 text-accent" : "bg-black/40"
              )}
              aria-label={favorited ? "Remove favorite" : "Favorite component"}
            >
              <Heart size={14} className={cn("transition-transform active:scale-125", favorited && "fill-current")} />
            </button>
          </div>

          {/* Metadata content info */}
          <div className="p-5 flex flex-col flex-grow">
            <div className="flex flex-wrap gap-1 mb-3">
              {frameworksList.map((fw) => (
                <span
                  key={fw}
                  className={cn(
                    "px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider",
                    fw === 'Flutter' && "bg-blue-500/10 text-blue-400",
                    fw === 'React Native' && "bg-cyan-500/10 text-cyan-400",
                    fw === 'Expo' && "bg-white/10 text-text-primary"
                  )}
                >
                  {fw}
                </span>
              ))}
            </div>

            <h3 className="text-base font-display font-black tracking-tight text-text-primary group-hover:text-accent transition-colors mb-1 truncate">
              {name}
            </h3>

            <p className="text-text-secondary text-xs font-medium leading-relaxed line-clamp-2 mb-4">
              {description}
            </p>

            <div className="mt-auto pt-4 border-t border-border-subtle/40 flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-full bg-bg-surface text-text-secondary text-[9px] font-bold uppercase tracking-wider">
                {typeof category === 'string' ? category : (category as any)?.name}
              </span>
              
              <div className="flex items-center gap-1.5 text-text-muted">
                <Heart size={12} className={cn(favorited && "text-accent fill-current")} />
                <span className="text-[10px] font-bold tracking-widest">{favorite_count + (favorited ? 1 : 0)}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>

      {/* Login Prompt Dialog Modal */}
      <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
        <DialogContent className="sm:max-w-md bg-bg-card border border-border-subtle text-text-primary rounded-2xl p-6">
          <DialogHeader className="space-y-3">
            <div className="h-12 w-12 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto text-accent mb-2">
              <ShieldAlert size={24} />
            </div>
            <DialogTitle className="text-center font-display font-black text-xl uppercase tracking-tight">Login Required</DialogTitle>
            <DialogDescription className="text-center text-text-secondary text-sm font-medium">
              You must have an active session to save custom components. Click below to continue.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 mt-6">
            <Button
              variant="secondary"
              onClick={() => setShowAuthModal(false)}
              className="flex-1 h-12 rounded-xl"
            >
              Cancel
            </Button>
            <Button
              asChild
              variant="default"
              onClick={() => setShowAuthModal(false)}
              className="flex-1 h-12 rounded-xl border-0"
            >
              <Link href="/login" className="flex items-center justify-center">
                Log In
              </Link>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
