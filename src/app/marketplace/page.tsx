'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ShoppingBag, Filter, ArrowUpDown, Star, Download, Flame, Check } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'react-hot-toast';

interface MarketplaceItem {
  id: string;
  title: string;
  description: string;
  priceCents: number;
  currency: string;
  downloads: number;
  ratingAverage: number;
  ratingCount: number;
  isActive: boolean;
  imageUrl: string;
  frameworks: string[];
  category: string;
  seller?: {
    name: string;
    avatarUrl?: string;
    isVerified: boolean;
  };
}

export default function MarketplacePage() {
  const [items, setItems] = useState<MarketplaceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [framework, setFramework] = useState('all');
  const [pricing, setPricing] = useState('all');
  const [sort, setSort] = useState('popular');

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'Finance & Banking', label: 'Finance & Banking' },
    { value: 'Authentication & Security', label: 'Auth & Security' },
    { value: 'Health & Fitness', label: 'Health & Fitness' },
    { value: 'Lists', label: 'Lists' },
  ];

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const queryParams = new URLSearchParams({
          q: debouncedSearch,
          category,
          framework,
          pricing,
          sort,
        });

        const res = await fetch(`/api/marketplace?${queryParams.toString()}`);
        if (!res.ok) {
          throw new Error('Failed to fetch marketplace items');
        }
        const data = await res.json();
        setItems(data.items || []);
      } catch (err) {
        console.error(err);
        toast.error('Could not load marketplace items');
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [debouncedSearch, category, framework, pricing, sort]);

  const formatPrice = (cents: number) => {
    if (cents === 0) return 'FREE';
    return `$${(cents / 100).toFixed(2)}`;
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-32">
      <div className="container px-6 mx-auto">
        {/* Header */}
        <div className="max-w-4xl mb-16 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/5 text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500 mb-8"
          >
            <ShoppingBag size={14} className="text-primary" />
            COMMUNITY MARKETPLACE
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-heading font-black tracking-tighter mb-6 uppercase">
            THE <span className="text-primary neon-text-glow">MARKETPLACE.</span>
          </h1>
          <p className="text-xl text-neutral-400 max-w-2xl font-medium leading-relaxed">
            Premium, production-ready modules, screen packages, and theme definitions curated for Next-gen products.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-neutral-900/50 border border-white/5 p-6 rounded-[2.5rem] mb-12 flex flex-col gap-6 lg:flex-row lg:items-center justify-between shadow-sm">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
            <Input
              type="text"
              placeholder="Search marketplace items..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-black border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-sm focus:border-primary/50 focus:outline-none transition-all text-white font-medium placeholder:text-neutral-600 h-12"
            />
          </div>

          {/* Filters Selects */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Category */}
            <div className="flex items-center gap-2">
              <Filter size={14} className="text-neutral-500" />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-black border border-white/10 text-neutral-300 rounded-xl px-3 py-2 text-xs font-bold uppercase tracking-wider focus:outline-none focus:border-primary cursor-pointer h-10"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value} className="bg-neutral-900 text-neutral-300">
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Framework */}
            <select
              value={framework}
              onChange={(e) => setFramework(e.target.value)}
              className="bg-black border border-white/10 text-neutral-300 rounded-xl px-3 py-2 text-xs font-bold uppercase tracking-wider focus:outline-none focus:border-primary cursor-pointer h-10"
            >
              <option value="all">All Frameworks</option>
              <option value="react-native">React Native</option>
              <option value="expo">Expo</option>
              <option value="flutter">Flutter</option>
            </select>

            {/* Pricing */}
            <select
              value={pricing}
              onChange={(e) => setPricing(e.target.value)}
              className="bg-black border border-white/10 text-neutral-300 rounded-xl px-3 py-2 text-xs font-bold uppercase tracking-wider focus:outline-none focus:border-primary cursor-pointer h-10"
            >
              <option value="all">All Pricing</option>
              <option value="free">Free Only</option>
              <option value="paid">Paid Only</option>
            </select>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <ArrowUpDown size={14} className="text-neutral-500" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="bg-black border border-white/10 text-neutral-300 rounded-xl px-3 py-2 text-xs font-bold uppercase tracking-wider focus:outline-none focus:border-primary cursor-pointer h-10"
              >
                <option value="popular">Popularity</option>
                <option value="newest">Newest</option>
                <option value="rating">Highest Rating</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Listings Grid */}
        {loading ? (
          <div className="py-24 text-center">
            <div className="w-12 h-12 rounded-full border-2 border-primary border-t-transparent animate-spin mx-auto mb-4" />
            <p className="text-neutral-400 font-medium">Fetching marketplace components...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="py-24 text-center bg-neutral-900/20 border border-dashed border-white/10 rounded-[3rem]">
            <Flame size={48} className="mx-auto text-neutral-600 mb-4" />
            <h3 className="text-xl font-heading font-black mb-2 uppercase text-neutral-400">No Items Found</h3>
            <p className="text-neutral-500 text-sm max-w-sm mx-auto font-medium">
              We couldn't find any listings matching your search filters. Try revising your queries.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item) => (
              <Link key={item.id} href={`/marketplace/${item.id}`} className="group">
                <div className="flex flex-col h-full bg-neutral-900/40 border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-primary/30 hover:shadow-[0_0_50px_rgba(255,202,3,0.05)] transition-all duration-500">
                  {/* Thumbnail */}
                  <div className="aspect-video relative overflow-hidden bg-neutral-950">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 font-mono text-[10px] font-black text-primary">
                      {formatPrice(item.priceCents)}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-8 flex-1 flex flex-col">
                    <div className="text-primary text-[9px] font-black uppercase tracking-widest mb-3">
                      {item.category}
                    </div>

                    <h3 className="text-xl font-black text-white tracking-tight leading-snug group-hover:text-primary transition-colors line-clamp-2 uppercase mb-3">
                      {item.title}
                    </h3>

                    <p className="text-neutral-500 text-xs line-clamp-2 mb-6 font-medium leading-relaxed">
                      {item.description}
                    </p>

                    {/* Features list snippets */}
                    <div className="flex flex-wrap gap-1.5 mb-6 mt-auto">
                      {item.frameworks.map((fw) => (
                        <span
                          key={fw}
                          className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-[8px] font-black text-neutral-400 uppercase tracking-wider"
                        >
                          {fw}
                        </span>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-auto">
                      <div className="flex items-center gap-1.5 text-xs text-neutral-400 font-bold">
                        <Star size={14} className="fill-yellow-500 text-yellow-500" />
                        <span>{item.ratingAverage.toFixed(1)}</span>
                        <span className="text-neutral-600 font-normal">({item.ratingCount})</span>
                      </div>

                      <div className="flex items-center gap-1 text-xs text-neutral-500 font-bold uppercase tracking-widest">
                        <Download size={14} />
                        <span>{item.downloads}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
