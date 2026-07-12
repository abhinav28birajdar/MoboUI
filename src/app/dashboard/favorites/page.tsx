"use client";

import React from 'react';
import { useFavorites } from '@/hooks/use-favorites';
import { ComponentCard } from '@/components/component-cards/component-card';
import { Heart, Library } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function FavoritesPage() {
  const { favorites, isLoading, toggle } = useFavorites();

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between bg-neutral-900/40 p-8 rounded-[2rem] border border-white/5">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tighter mb-2 flex items-center gap-3">
            <Heart className="text-primary fill-primary" size={32} />
            My Favorites
          </h1>
          <p className="text-neutral-500 font-medium text-sm">
            Quick access to all your saved components from the library and marketplace.
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-24">
          <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        </div>
      ) : favorites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favorites.map((fav: any) => (
            <ComponentCard
              key={fav.id}
              component={fav.component}
              isFavorited={true}
              onFavoriteToggle={() => toggle(fav.component.id)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center bg-neutral-900/20 border border-dashed border-white/10 rounded-[2rem] p-16 text-center">
          <Library size={48} className="text-neutral-700 mb-6" />
          <h3 className="text-xl font-black uppercase tracking-widest mb-2">No Favorites Yet</h3>
          <p className="text-neutral-500 text-sm max-w-sm font-medium leading-relaxed mb-8">
            You haven't saved any components yet. Explore the library to find UI elements for your next project.
          </p>
          <Link href="/components">
            <Button className="h-12 px-6 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold tracking-widest uppercase text-xs">
              Explore Library
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}