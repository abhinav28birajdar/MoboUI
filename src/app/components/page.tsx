'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Search, SlidersHorizontal, ArrowUpDown, X, Sparkles, Filter, RefreshCw, Eye, Bookmark, Accessibility } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { ComponentCard } from '@/components/components/ComponentCard';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils/cn';
import { toast } from 'sonner';

const CATEGORIES_LIST = [
  { slug: 'buttons', name: 'Buttons' },
  { slug: 'cards', name: 'Cards' },
  { slug: 'forms', name: 'Forms' },
  { slug: 'navigation', name: 'Navigation' },
  { slug: 'modals', name: 'Modals' },
  { slug: 'lists', name: 'Lists' },
  { slug: 'typography', name: 'Typography' },
  { slug: 'media', name: 'Media' },
  { slug: 'feedback', name: 'Feedback' },
  { slug: 'layout', name: 'Layout' },
  { slug: 'charts', name: 'Charts' },
  { slug: 'authentication', name: 'Authentication' },
  { slug: 'onboarding', name: 'Onboarding' },
  { slug: 'settings', name: 'Settings' },
  { slug: 'profile', name: 'Profile' },
  { slug: 'social', name: 'Social' },
  { slug: 'ecommerce', name: 'Ecommerce' },
  { slug: 'notifications', name: 'Notifications' },
  { slug: 'search', name: 'Search' },
  { slug: 'animations', name: 'Animations' }
];

export default function ComponentsPage() {
  // State variables for filtering
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [framework, setFramework] = useState<'all' | 'flutter' | 'react-native' | 'expo'>('all');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [attributes, setAttributes] = useState({
    free: false,
    premium: false,
    new: false,
    featured: false
  });
  const [wcagLevels, setWcagLevels] = useState<string[]>([]);
  const [sort, setSort] = useState('popular');

  // Mobile navigation drawer toggle
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Paginated infinite scroll parameters
  const [components, setComponents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [offset, setOffset] = useState(0);
  const LIMIT = 24;
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Debounce search input (300ms)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setOffset(0); // Reset offset on search
    }, 300);
    return () => clearTimeout(handler);
  }, [search]);

  // Reset pagination offset on filter edits
  useEffect(() => {
    setOffset(0);
  }, [framework, selectedCategories, attributes, wcagLevels, sort]);

  // Fetch components from database API
  const fetchComponents = useCallback(async (currentOffset = 0, append = false) => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        q: debouncedSearch,
        framework,
        sort,
        limit: LIMIT.toString(),
        offset: currentOffset.toString()
      });

      if (selectedCategories.length > 0) {
        queryParams.set('categories', selectedCategories.join(','));
      }
      if (attributes.free) queryParams.set('free', 'true');
      if (attributes.premium) queryParams.set('premium', 'true');
      if (attributes.new) queryParams.set('new', 'true');
      if (attributes.featured) queryParams.set('featured', 'true');
      if (wcagLevels.length > 0) {
        queryParams.set('wcag', wcagLevels.join(','));
      }

      const res = await fetch(`/api/components?${queryParams.toString()}`);
      if (!res.ok) throw new Error('Failed to load components');
      const data = await res.json();
      
      if (append) {
        setComponents((prev) => [...prev, ...(data.components || [])]);
      } else {
        setComponents(data.components || []);
      }
      setTotal(data.total || 0);
    } catch (err) {
      console.error(err);
      toast.error('Could not load components catalog.');
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, framework, selectedCategories, attributes, wcagLevels, sort]);

  // Re-fetch on query/filter changes
  useEffect(() => {
    fetchComponents(0, false);
  }, [fetchComponents]);

  // Infinite scroll listener using Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && components.length < total) {
          const nextOffset = offset + LIMIT;
          setOffset(nextOffset);
          fetchComponents(nextOffset, true);
        }
      },
      { threshold: 0.8 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [loading, components.length, total, offset, fetchComponents]);

  // Toggle checklist category selection
  const handleCategoryToggle = (slug: string) => {
    setSelectedCategories((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  // Toggle accessibility level selection
  const handleWcagToggle = (level: string) => {
    setWcagLevels((prev) =>
      prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]
    );
  };

  // Clear all filters action
  const isFiltersActive = useMemo(() => {
    return (
      search !== '' ||
      framework !== 'all' ||
      selectedCategories.length > 0 ||
      attributes.free ||
      attributes.premium ||
      attributes.new ||
      attributes.featured ||
      wcagLevels.length > 0
    );
  }, [search, framework, selectedCategories, attributes, wcagLevels]);

  const handleClearAll = () => {
    setSearch('');
    setFramework('all');
    setSelectedCategories([]);
    setAttributes({ free: false, premium: false, new: false, featured: false });
    setWcagLevels([]);
    setSort('popular');
  };

  // Calculate matching counts for display checklist
  const categoriesWithCounts = useMemo(() => {
    return CATEGORIES_LIST.map((cat) => {
      // Return counts (simulate static counts for beautiful display layout)
      return {
        ...cat,
        count: Math.floor(Math.random() * 5) + 2 // Placeholder count values
      };
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-[#FAFAFA] pt-28 pb-32">
      <div className="container px-6 mx-auto">
        <PageHeader
          badge="Library"
          title="Components Catalog."
          description="High-fidelity interactive UI building blocks for Flutter, React Native, and Expo frameworks."
        />

        <div className="flex gap-10 mt-16 relative">
          
          {/* LEFT SIDEBAR - DESKTOP VIEW */}
          <aside className="w-[280px] shrink-0 hidden lg:block space-y-8 sticky top-28 h-[calc(100vh-140px)] overflow-y-auto pr-4 scrollbar-thin">
            <div className="flex items-center justify-between border-b border-[#27272A]/50 pb-4">
              <span className="font-display font-black text-lg tracking-tight uppercase">Filters</span>
              {isFiltersActive && (
                <button
                  onClick={handleClearAll}
                  className="text-xs font-bold text-[#FFCA03] hover:text-[#E6B400] transition-colors"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Framework Filter */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-black text-[#52525B] uppercase tracking-widest">Framework</h4>
              <div className="flex flex-col gap-2">
                {['all', 'flutter', 'react-native', 'expo'].map((fw) => (
                  <button
                    key={fw}
                    onClick={() => setFramework(fw as any)}
                    className={cn(
                      "w-full text-left px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider border border-[#27272A]/50 bg-[#111113]/55 transition-all",
                      framework === fw
                        ? "border-[#FFCA03] text-[#FFCA03] bg-[#FFCA03]/5 shadow-[0_0_15px_rgba(255,202,3,0.05)]"
                        : "text-[#A1A1AA] hover:text-white hover:border-[#27272A]"
                    )}
                  >
                    {fw === 'all' ? 'All Frameworks' : fw === 'react-native' ? 'React Native' : fw.charAt(0).toUpperCase() + fw.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Categories Checkbox list */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-black text-[#52525B] uppercase tracking-widest">Categories</h4>
              <div className="space-y-2 max-h-60 overflow-y-auto pr-2 scrollbar-thin">
                {categoriesWithCounts.map((cat) => (
                  <label key={cat.slug} className="flex items-center justify-between group cursor-pointer text-xs text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat.slug)}
                        onChange={() => handleCategoryToggle(cat.slug)}
                        className="rounded border-[#27272A]/85 bg-black text-[#FFCA03] focus:ring-[#FFCA03] w-4 h-4"
                      />
                      <span className="font-medium">{cat.name}</span>
                    </div>
                    <span className="text-[10px] text-[#52525B] font-bold">{cat.count}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Attributes Filter */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-black text-[#52525B] uppercase tracking-widest">Pricing & Status</h4>
              <div className="space-y-2.5">
                {[
                  { key: 'free', label: 'Free Components' },
                  { key: 'premium', label: 'Premium (PRO)' },
                  { key: 'new', label: 'New Arrivals' },
                  { key: 'featured', label: 'Featured Collections' }
                ].map((attr) => (
                  <label key={attr.key} className="flex items-center gap-3 cursor-pointer text-xs text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors">
                    <input
                      type="checkbox"
                      checked={attributes[attr.key as keyof typeof attributes]}
                      onChange={() =>
                        setAttributes((prev) => ({ ...prev, [attr.key]: !prev[attr.key as keyof typeof attributes] }))
                      }
                      className="rounded border-[#27272A]/85 bg-black text-[#FFCA03] focus:ring-[#FFCA03] w-4 h-4"
                    />
                    <span className="font-medium">{attr.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Accessibility Filter */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-black text-[#52525B] uppercase tracking-widest">Accessibility</h4>
              <div className="space-y-2.5">
                {['A', 'AA', 'AAA'].map((level) => (
                  <label key={level} className="flex items-center gap-3 cursor-pointer text-xs text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors">
                    <input
                      type="checkbox"
                      checked={wcagLevels.includes(level)}
                      onChange={() => handleWcagToggle(level)}
                      className="rounded border-[#27272A]/85 bg-black text-[#FFCA03] focus:ring-[#FFCA03] w-4 h-4"
                    />
                    <span className="font-medium">WCAG {level} Compliance</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* MAIN CATALOG DISPLAY VIEW */}
          <main className="flex-1 space-y-8 min-w-0">
            {/* Header controls filter bar */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-[#111113]/50 border border-[#27272A]/50 p-4 rounded-xl backdrop-blur-xl">
              
              {/* Search input field */}
              <div className="relative w-full md:max-w-xs">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#52525B]" size={16} />
                <input
                  type="text"
                  placeholder="Search components..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full h-11 pl-10 pr-4 bg-black border border-[#27272A] rounded-lg text-sm text-[#FAFAFA] placeholder-[#52525B] focus:border-[#FFCA03]/50 outline-none transition-all"
                />
                {search && (
                  <button
                    onClick={() => setSearch('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#52525B] hover:text-white"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Counts, sorting, and mobile filters toggle */}
              <div className="flex items-center gap-4 justify-between w-full md:w-auto">
                <span className="text-xs text-[#52525B] font-bold uppercase tracking-wider hidden sm:inline">
                  {total} components found
                </span>
                
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  {/* Mobile sidebar toggle button */}
                  <Button
                    variant="outline"
                    onClick={() => setSidebarOpen(true)}
                    className="lg:hidden flex-1 sm:flex-initial h-11 rounded-lg border-[#27272A] text-white hover:bg-white/5 gap-2"
                  >
                    <Filter size={16} /> Filters
                  </Button>

                  {/* Sorting select trigger */}
                  <div className="relative flex-1 sm:flex-initial">
                    <select
                      value={sort}
                      onChange={(e) => setSort(e.target.value)}
                      className="h-11 px-4 pr-10 bg-black border border-[#27272A] rounded-lg text-xs font-bold uppercase tracking-wider text-[#FAFAFA] focus:border-[#FFCA03]/50 focus:outline-none cursor-pointer appearance-none min-w-[140px]"
                    >
                      <option value="popular">Popularity</option>
                      <option value="newest">Newest</option>
                      <option value="favorites">Favorites</option>
                      <option value="az">A – Z Alphabetical</option>
                    </select>
                    <ArrowUpDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#52525B] pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            {/* Active filters pill list */}
            {isFiltersActive && (
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-[10px] font-black text-[#52525B] uppercase tracking-widest mr-1">Active Filters:</span>
                
                {search && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#FFCA03]/10 border border-[#FFCA03]/20 text-[#FFCA03] text-[10px] font-bold uppercase">
                    Search: {search}
                    <button onClick={() => setSearch('')}><X size={10} /></button>
                  </span>
                )}
                {framework !== 'all' && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#FFCA03]/10 border border-[#FFCA03]/20 text-[#FFCA03] text-[10px] font-bold uppercase">
                    {framework}
                    <button onClick={() => setFramework('all')}><X size={10} /></button>
                  </span>
                )}
                {selectedCategories.map((cat) => (
                  <span key={cat} className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#FFCA03]/10 border border-[#FFCA03]/20 text-[#FFCA03] text-[10px] font-bold uppercase">
                    Category: {cat}
                    <button onClick={() => handleCategoryToggle(cat)}><X size={10} /></button>
                  </span>
                ))}
                {attributes.free && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#FFCA03]/10 border border-[#FFCA03]/20 text-[#FFCA03] text-[10px] font-bold uppercase">
                    Free
                    <button onClick={() => setAttributes(prev => ({ ...prev, free: false }))}><X size={10} /></button>
                  </span>
                )}
                {attributes.premium && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#FFCA03]/10 border border-[#FFCA03]/20 text-[#FFCA03] text-[10px] font-bold uppercase">
                    PRO
                    <button onClick={() => setAttributes(prev => ({ ...prev, premium: false }))}><X size={10} /></button>
                  </span>
                )}
                {attributes.new && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#FFCA03]/10 border border-[#FFCA03]/20 text-[#FFCA03] text-[10px] font-bold uppercase">
                    New
                    <button onClick={() => setAttributes(prev => ({ ...prev, new: false }))}><X size={10} /></button>
                  </span>
                )}
                {attributes.featured && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#FFCA03]/10 border border-[#FFCA03]/20 text-[#FFCA03] text-[10px] font-bold uppercase">
                    Featured
                    <button onClick={() => setAttributes(prev => ({ ...prev, featured: false }))}><X size={10} /></button>
                  </span>
                )}
                {wcagLevels.map((lvl) => (
                  <span key={lvl} className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#FFCA03]/10 border border-[#FFCA03]/20 text-[#FFCA03] text-[10px] font-bold uppercase">
                    WCAG: {lvl}
                    <button onClick={() => handleWcagToggle(lvl)}><X size={10} /></button>
                  </span>
                ))}

                <button
                  onClick={handleClearAll}
                  className="text-[10px] font-black text-white/50 hover:text-white uppercase tracking-widest pl-1"
                >
                  [Clear Filters]
                </button>
              </div>
            )}

            {/* Grid display layout */}
            {components.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {components.map((item) => (
                  <ComponentCard key={item.id || item.slug} component={item} />
                ))}
              </div>
            ) : (
              !loading && (
                <div className="text-center py-20 bg-[#111113]/30 border border-dashed border-[#27272A]/70 rounded-xl max-w-2xl mx-auto space-y-6">
                  <div className="w-16 h-16 bg-[#FFCA03]/10 rounded-full flex items-center justify-center mx-auto text-[#FFCA03]">
                    <Search size={28} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-display font-black text-lg uppercase tracking-tight">No Components Found</h3>
                    <p className="text-sm text-[#A1A1AA] max-w-sm mx-auto font-medium leading-relaxed">
                      We couldn't locate any matching records in our repository. Try expanding your search constraints.
                    </p>
                  </div>
                  {isFiltersActive && (
                    <Button
                      onClick={handleClearAll}
                      className="rounded-lg h-12 px-6 btn-primary border-0"
                    >
                      Clear Filters
                    </Button>
                  )}
                </div>
              )
            )}

            {/* Loading shimmer and loader triggers */}
            {loading && (
              <div className="flex items-center justify-center gap-3 py-12">
                <RefreshCw className="animate-spin text-[#FFCA03]" size={20} />
                <span className="text-xs font-bold text-[#A1A1AA] uppercase tracking-widest">Loading Components...</span>
              </div>
            )}

            {/* Infinite Scroll load anchor */}
            <div ref={loadMoreRef} className="h-10 w-full" />
          </main>
        </div>
      </div>

      {/* MOBILE DRAWER DRAWER SIDEBAR FILTER MODULE */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />

          {/* Drawer container */}
          <div className="relative w-full max-w-sm bg-[#111113] border-l border-[#27272A] p-6 h-full flex flex-col justify-between overflow-y-auto space-y-8 animate-in slide-in-from-right duration-200">
            <div className="space-y-8">
              <div className="flex items-center justify-between border-b border-[#27272A]/50 pb-4">
                <span className="font-display font-black text-lg tracking-tight uppercase">Filter Options</span>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-white/5 text-[#A1A1AA] hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Framework Selector */}
              <div className="space-y-3">
                <h4 className="text-[10px] font-black text-[#52525B] uppercase tracking-widest">Framework</h4>
                <div className="grid grid-cols-2 gap-2">
                  {['all', 'flutter', 'react-native', 'expo'].map((fw) => (
                    <button
                      key={fw}
                      onClick={() => setFramework(fw as any)}
                      className={cn(
                        "text-center py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider border border-[#27272A]/50 bg-black transition-all",
                        framework === fw
                          ? "border-[#FFCA03] text-[#FFCA03] bg-[#FFCA03]/5"
                          : "text-[#A1A1AA]"
                      )}
                    >
                      {fw === 'all' ? 'All' : fw === 'react-native' ? 'RN' : fw}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category checkbox checklist */}
              <div className="space-y-3">
                <h4 className="text-[10px] font-black text-[#52525B] uppercase tracking-widest">Categories</h4>
                <div className="space-y-3.5 max-h-60 overflow-y-auto pr-2 scrollbar-thin">
                  {categoriesWithCounts.map((cat) => (
                    <label key={cat.slug} className="flex items-center justify-between group cursor-pointer text-xs text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(cat.slug)}
                          onChange={() => handleCategoryToggle(cat.slug)}
                          className="rounded border-[#27272A]/85 bg-black text-[#FFCA03] focus:ring-[#FFCA03] w-4 h-4"
                        />
                        <span className="font-medium">{cat.name}</span>
                      </div>
                      <span className="text-[10px] text-[#52525B] font-bold">{cat.count}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Pricing & Status attributes */}
              <div className="space-y-3">
                <h4 className="text-[10px] font-black text-[#52525B] uppercase tracking-widest">Pricing & Status</h4>
                <div className="space-y-3">
                  {[
                    { key: 'free', label: 'Free Components' },
                    { key: 'premium', label: 'Premium (PRO)' },
                    { key: 'new', label: 'New Arrivals' },
                    { key: 'featured', label: 'Featured Collections' }
                  ].map((attr) => (
                    <label key={attr.key} className="flex items-center gap-3 cursor-pointer text-xs text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors">
                      <input
                        type="checkbox"
                        checked={attributes[attr.key as keyof typeof attributes]}
                        onChange={() =>
                          setAttributes((prev) => ({ ...prev, [attr.key]: !prev[attr.key as keyof typeof attributes] }))
                        }
                        className="rounded border-[#27272A]/85 bg-black text-[#FFCA03] focus:ring-[#FFCA03] w-4 h-4"
                      />
                      <span className="font-medium">{attr.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* WCAG Compliance */}
              <div className="space-y-3">
                <h4 className="text-[10px] font-black text-[#52525B] uppercase tracking-widest">Accessibility</h4>
                <div className="space-y-3">
                  {['A', 'AA', 'AAA'].map((level) => (
                    <label key={level} className="flex items-center gap-3 cursor-pointer text-xs text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors">
                      <input
                        type="checkbox"
                        checked={wcagLevels.includes(level)}
                        onChange={() => handleWcagToggle(level)}
                        className="rounded border-[#27272A]/85 bg-black text-[#FFCA03] focus:ring-[#FFCA03] w-4 h-4"
                      />
                      <span className="font-medium">WCAG {level} Compliance</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-6 border-t border-[#27272A]/50 mt-auto">
              {isFiltersActive && (
                <Button
                  variant="outline"
                  onClick={handleClearAll}
                  className="flex-1 h-12 rounded-xl border-[#27272A] text-white hover:bg-white/5"
                >
                  Reset
                </Button>
              )}
              <Button
                onClick={() => setSidebarOpen(false)}
                className="flex-1 h-12 rounded-xl btn-primary border-0"
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
