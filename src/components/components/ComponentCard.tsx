'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, AlertCircle, X, ShieldAlert } from 'lucide-react';
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
        <div className="relative flex flex-col h-full bg-[#111113]/85 border border-[#27272A]/50 rounded-xl overflow-hidden transition-all duration-300 hover:border-[#FFCA03]/30 hover:shadow-[0_0_30px_rgba(255,202,3,0.15)] hover:-translate-y-1">
          
          {/* Image/Preview container */}
          <div className="relative aspect-[16/9] bg-[#18181B] overflow-hidden">
            {displayImage ? (
              <img
                src={displayImage}
                alt={name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center border-b border-[#27272A]/50 bg-grid-pattern bg-[size:20px_20px] opacity-25">
                <Sparkles size={24} className="text-[#52525B]" />
              </div>
            )}

            {/* Badges on top-left */}
            <div className="absolute top-3 left-3 flex gap-2 z-10">
              {isPremium && (
                <span className="px-2.5 py-1 rounded bg-[#FFCA03] text-[#0A0A0B] text-[9px] font-black uppercase tracking-widest">
                  PRO
                </span>
              )}
              {isNew && (
                <span className="px-2.5 py-1 rounded bg-[#22C55E] text-[#FAFAFA] text-[9px] font-black uppercase tracking-widest">
                  NEW
                </span>
              )}
            </div>

            {/* Favorite button on top-right */}
            <button
              onClick={handleFavoriteClick}
              className={cn(
                "absolute top-3 right-3 z-10 h-8 w-8 rounded-full flex items-center justify-center backdrop-blur-md border border-[#27272A]/70 text-[#A1A1AA] hover:text-[#FFCA03] hover:border-[#FFCA03]/50 transition-all",
                favorited ? "bg-[#FFCA03]/10 border-[#FFCA03]/30 text-[#FFCA03]" : "bg-black/40"
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
                    fw === 'Flutter' && "bg-[#3B82F6]/10 text-[#3B82F6]",
                    fw === 'React Native' && "bg-[#22D3EE]/10 text-[#22D3EE]",
                    fw === 'Expo' && "bg-white/10 text-white"
                  )}
                >
                  {fw}
                </span>
              ))}
            </div>

            <h3 className="text-base font-display font-black tracking-tight text-[#FAFAFA] group-hover:text-[#FFCA03] transition-colors mb-1 truncate">
              {name}
            </h3>

            <p className="text-[#A1A1AA] text-xs font-medium leading-relaxed line-clamp-2 mb-4">
              {description}
            </p>

            <div className="mt-auto pt-4 border-t border-[#27272A]/40 flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-full bg-[#18181B] text-[#A1A1AA] text-[9px] font-bold uppercase tracking-wider">
                {typeof category === 'string' ? category : (category as any)?.name}
              </span>
              
              <div className="flex items-center gap-1.5 text-[#52525B]">
                <Heart size={12} className={cn(favorited && "text-[#FFCA03] fill-current")} />
                <span className="text-[10px] font-bold tracking-widest">{favorite_count + (favorited ? 1 : 0)}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>

      {/* Login Prompt Dialog Modal */}
      <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
        <DialogContent className="sm:max-w-md bg-[#111113] border border-[#27272A]/80 text-[#FAFAFA] rounded-2xl p-6">
          <DialogHeader className="space-y-3">
            <div className="h-12 w-12 rounded-full bg-[#FFCA03]/10 border border-[#FFCA03]/20 flex items-center justify-center mx-auto text-[#FFCA03] mb-2">
              <ShieldAlert size={24} />
            </div>
            <DialogTitle className="text-center font-display font-black text-xl uppercase tracking-tight">Login Required</DialogTitle>
            <DialogDescription className="text-center text-[#A1A1AA] text-sm font-medium">
              You must have an active session to save custom components. Click below to continue.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 mt-6">
            <Button
              variant="outline"
              onClick={() => setShowAuthModal(false)}
              className="flex-1 h-12 rounded-xl border-[#27272A] text-white hover:bg-white/5"
            >
              Cancel
            </Button>
            <Button
              asChild
              onClick={() => setShowAuthModal(false)}
              className="flex-1 h-12 rounded-xl btn-primary border-0"
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
