'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronRight, Bookmark, Share2, Play, Check, Copy, Sparkles, Smartphone, Moon, Sun, ArrowLeft, RefreshCw, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/lib/store/auth-store';
import { useFavoritesStore } from '@/lib/stores/favorites-store';
import { usePlaygroundStore } from '@/lib/store/playground-store';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { ComponentCard } from '@/components/components/ComponentCard';
import { toast } from 'sonner';
import { cn } from '@/lib/utils/cn';

interface PageParams {
  category: string;
  slug: string;
}

export default function ComponentDetailPage({ params }: { params: Promise<PageParams> }) {
  const router = useRouter();
  const { category: categoryParam, slug: slugParam } = use(params);

  const { user } = useAuthStore();
  const { toggleFavorite, isFavorited } = useFavoritesStore();
  const { setCode, setFramework } = usePlaygroundStore();

  const [component, setComponent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Custom states for detail interactions
  const [activeTab, setActiveTab] = useState<'flutter' | 'react-native' | 'expo' | 'web'>('react-native');
  const [device, setDevice] = useState<'iphone' | 'android'>('iphone');
  const [deviceTheme, setDeviceTheme] = useState<'dark' | 'light'>('dark');
  const [copied, setCopied] = useState(false);
  const [related, setRelated] = useState<any[]>([]);

  // Fetch component detail and increment view count
  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/components/${slugParam}`);
        if (!res.ok) {
          throw new Error('Component not found');
        }
        const data = await res.json();
        setComponent(data);

        // Fetch related components in the same category
        const relRes = await fetch(`/api/components?limit=4&categories=${categoryParam}`);
        if (relRes.ok) {
          const relData = await relRes.json();
          // Filter out current component
          const filtered = (relData.components || []).filter((c: any) => c.slug !== slugParam).slice(0, 3);
          setRelated(filtered);
        }
      } catch (err: any) {
        setError(err.message || 'Could not fetch component details');
      } finally {
        setLoading(false);
      }
    };

    if (slugParam) {
      fetchDetail();
    }
  }, [slugParam, categoryParam]);

  // Determine starting tab based on framework support
  useEffect(() => {
    if (component) {
      if (component.framework === 'flutter') {
        setActiveTab('flutter');
      } else {
        setActiveTab('react-native');
      }
    }
  }, [component]);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success('Code copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenPlayground = () => {
    if (!component) return;
    const selectedCode = 
      activeTab === 'flutter' 
        ? component.code?.dart || '' 
        : component.code?.typescript || component.code?.javascript || '';
    
    setCode(selectedCode);
    setFramework(activeTab === 'flutter' ? 'flutter' : activeTab === 'expo' ? 'expo' : 'react-native');
    router.push('/playground');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0B] flex flex-col items-center justify-center space-y-6">
        <RefreshCw className="w-12 h-12 text-[#FFCA03] animate-spin" />
        <p className="text-[10px] font-black uppercase text-[#52525B] tracking-[0.3em]">Loading Emulator Spec...</p>
      </div>
    );
  }

  if (error || !component) {
    return (
      <div className="min-h-screen bg-[#0A0A0B] text-[#FAFAFA] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 bg-red-950/20 border border-red-900/40 rounded-full flex items-center justify-center text-red-500 mb-6">
          <AlertCircle size={28} />
        </div>
        <h1 className="text-3xl font-display font-black uppercase tracking-tight mb-3">Component Not Found</h1>
        <p className="text-[#A1A1AA] text-sm max-w-sm mb-8">
          The requested component doesn't exist or may have been deleted from the catalog.
        </p>
        <Button asChild className="h-12 px-6 btn-primary border-0 rounded-lg">
          <Link href="/components">Return to Catalog</Link>
        </Button>
      </div>
    );
  }

  const favorited = isFavorited(component.id || component.slug);
  const activeCode = 
    activeTab === 'flutter' 
      ? component.code?.dart || '// No Flutter Code Available' 
      : activeTab === 'expo' 
      ? component.code?.typescript || component.code?.javascript || '// No Expo Code' 
      : activeTab === 'react-native' 
      ? component.code?.typescript || component.code?.javascript || '// No React Native Code' 
      : component.code?.web_code || '// Web fallback view';

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-[#FAFAFA] pt-24 pb-32">
      <div className="container px-6 mx-auto">
        
        {/* Breadcrumb path navigation */}
        <nav className="flex items-center gap-2 text-xs font-bold text-[#52525B] uppercase tracking-wider mb-8">
          <Link href="/components" className="hover:text-white transition-colors">Components</Link>
          <ChevronRight size={14} />
          <Link href={`/components?categories=${categoryParam}`} className="hover:text-white transition-colors capitalize">{categoryParam.replace(/-/g, ' ')}</Link>
          <ChevronRight size={14} />
          <span className="text-[#A1A1AA]">{component.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT COLUMN: INFORMATION & CODE EDITOR TAB BLOCKS */}
          <div className="lg:col-span-7 space-y-12">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="px-2.5 py-1 rounded bg-[#FFCA03]/10 border border-[#FFCA03]/20 text-[#FFCA03] text-[9px] font-black uppercase tracking-widest">
                  {component.category_name || categoryParam.replace(/-/g, ' ')}
                </span>
                {component.is_new && (
                  <span className="px-2.5 py-1 rounded bg-[#22C55E]/10 border border-[#22C55E]/20 text-[#22C55E] text-[9px] font-black uppercase tracking-widest">
                    NEW
                  </span>
                )}
                {component.is_premium && (
                  <span className="px-2.5 py-1 rounded bg-[#FFCA03] text-[#0A0A0B] text-[9px] font-black uppercase tracking-widest">
                    PRO
                  </span>
                )}
              </div>
              
              <h1 className="text-4xl md:text-5xl font-display font-black text-white mb-4 tracking-tighter uppercase leading-[0.95]">
                {component.name}
              </h1>
              
              <p className="text-[#A1A1AA] text-base font-medium leading-relaxed max-w-xl">
                {component.description}
              </p>
            </div>

            {/* Tags section */}
            {component.tags && component.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {component.tags.map((tag: string) => (
                  <span key={tag} className="px-3 py-1.5 rounded bg-[#18181B] border border-[#27272A]/50 text-xs font-bold text-[#A1A1AA] hover:border-[#FFCA03]/30 hover:text-white transition-all cursor-pointer">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Accessibility features grid */}
            <div className="flex flex-wrap gap-4 py-4 border-y border-[#27272A]/50">
              <div className="flex items-center gap-2 text-xs font-bold text-[#A1A1AA] uppercase tracking-wide">
                <span className="h-2 w-2 rounded-full bg-[#FFCA03] shadow-[0_0_10px_rgba(255,202,3,0.5)]" />
                <span>WCAG: {component.wcag_level || 'AA'}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#A1A1AA] uppercase tracking-wide">
                <span className="h-2 w-2 rounded-full bg-[#22C55E]" />
                <span>Dark Mode Support</span>
              </div>
              {component.supports_rtl && (
                <div className="flex items-center gap-2 text-xs font-bold text-[#A1A1AA] uppercase tracking-wide">
                  <span className="h-2 w-2 rounded-full bg-[#3B82F6]" />
                  <span>RTL Support</span>
                </div>
              )}
            </div>

            {/* Framework Code Tabs */}
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#27272A]/50 pb-px">
                <div className="flex gap-8">
                  {[
                    { key: 'react-native', label: 'React Native' },
                    { key: 'expo', label: 'Expo' },
                    { key: 'flutter', label: 'Flutter' },
                    { key: 'web', label: 'Web Code' }
                  ].map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key as any)}
                      className={cn(
                        "pb-3.5 text-xs font-black uppercase tracking-widest border-b-2 border-transparent transition-all",
                        activeTab === tab.key
                          ? "border-[#FFCA03] text-[#FFCA03]"
                          : "text-[#52525B] hover:text-[#A1A1AA]"
                      )}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
                
                <Button
                  onClick={handleOpenPlayground}
                  className="h-10 rounded-lg btn-secondary text-xs uppercase tracking-wider font-black mb-1 px-4 border-0"
                >
                  <Play size={12} className="mr-1.5 fill-current" /> Open Playground
                </Button>
              </div>

              {/* CodeBlock Container */}
              <div className="relative group rounded-xl overflow-hidden border border-[#27272A]/50 bg-black/60 font-mono text-sm leading-relaxed">
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#27272A]/50 bg-[#111113]">
                  {/* macOS circles */}
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E]" />
                  </div>
                  <span className="text-[10px] font-black uppercase text-[#52525B] tracking-wider">{activeTab}</span>
                  <button
                    onClick={() => handleCopyCode(activeCode)}
                    className="text-[10px] font-black uppercase text-[#A1A1AA] hover:text-[#FFCA03] transition-colors flex items-center gap-1.5"
                  >
                    {copied ? <Check size={11} className="text-[#22C55E]" /> : <Copy size={11} />}
                    <span>{copied ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
                <div className="overflow-x-auto max-h-[450px]">
                  <SyntaxHighlighter
                    language={activeTab === 'flutter' ? 'dart' : 'tsx'}
                    style={tomorrow}
                    customStyle={{
                      margin: 0,
                      padding: '1.5rem',
                      background: 'transparent',
                      fontSize: '13px',
                      fontFamily: 'var(--font-code), monospace',
                    }}
                  >
                    {activeCode}
                  </SyntaxHighlighter>
                </div>
              </div>
            </div>

            {/* Props Table */}
            {component.props && component.props.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-display font-black text-xl uppercase tracking-tight">API Reference</h3>
                <div className="rounded-xl border border-[#27272A]/50 bg-[#111113]/40 overflow-hidden">
                  <table className="w-full border-collapse text-left text-sm">
                    <thead>
                      <tr className="border-b border-[#27272A]/60 bg-[#111113]">
                        <th className="p-4 font-black uppercase text-[10px] text-[#A1A1AA] tracking-wider">Prop Name</th>
                        <th className="p-4 font-black uppercase text-[10px] text-[#A1A1AA] tracking-wider">Type</th>
                        <th className="p-4 font-black uppercase text-[10px] text-[#A1A1AA] tracking-wider">Required</th>
                        <th className="p-4 font-black uppercase text-[10px] text-[#A1A1AA] tracking-wider">Default</th>
                        <th className="p-4 font-black uppercase text-[10px] text-[#A1A1AA] tracking-wider">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#27272A]/30">
                      {component.props.map((prop: any) => (
                        <tr key={prop.name} className="hover:bg-white/2 transition-colors">
                          <td className="p-4 font-bold text-white font-mono text-xs">{prop.name}</td>
                          <td className="p-4 text-[#FFCA03] font-mono text-xs">{prop.type}</td>
                          <td className="p-4 text-xs font-semibold">{prop.required ? 'Yes' : 'No'}</td>
                          <td className="p-4 text-[#A1A1AA] font-mono text-xs">{prop.default || '-'}</td>
                          <td className="p-4 text-[#A1A1AA] text-xs font-medium leading-relaxed">{prop.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: STICKY DEVICE PREVIEW EMULATOR MODULE */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
            
            {/* Device frame wrapper container */}
            <div className="bg-[#111113]/80 border border-[#27272A]/50 rounded-2xl p-6 backdrop-blur-xl space-y-6 flex flex-col items-center">
              <div className="flex items-center justify-between w-full border-b border-[#27272A]/50 pb-4">
                <div className="flex items-center gap-2">
                  <Smartphone size={16} className="text-[#FFCA03]" />
                  <span className="text-xs font-black uppercase tracking-widest text-[#FAFAFA]">Interactive Frame</span>
                </div>

                {/* Device Selector options */}
                <div className="flex bg-[#18181B] p-1 rounded-lg border border-[#27272A]">
                  <button
                    onClick={() => setDevice('iphone')}
                    className={cn(
                      "px-3 py-1 rounded text-[10px] font-black uppercase tracking-wider transition-all",
                      device === 'iphone' ? "bg-[#FFCA03] text-black" : "text-[#52525B] hover:text-white"
                    )}
                  >
                    iPhone 15
                  </button>
                  <button
                    onClick={() => setDevice('android')}
                    className={cn(
                      "px-3 py-1 rounded text-[10px] font-black uppercase tracking-wider transition-all",
                      device === 'android' ? "bg-[#FFCA03] text-black" : "text-[#52525B] hover:text-white"
                    )}
                  >
                    Pixel 8
                  </button>
                </div>
              </div>

              {/* Physical Render Mock Frame */}
              <div className="relative w-[280px] h-[550px] bg-[#0A0A0B] rounded-[3rem] border-[10px] border-[#1C1C1E] shadow-2xl p-3 flex flex-col overflow-hidden">
                
                {/* Dynamic notch layouts */}
                {device === 'iphone' ? (
                  // iPhone Notch Island
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-full z-20 flex items-center justify-center">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#050505] mr-auto ml-3 border border-zinc-800" />
                  </div>
                ) : (
                  // Android Punch Hole Camera
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-black rounded-full z-20" />
                )}

                {/* Simulated App Screen Canvas */}
                <div className="flex-1 rounded-[2rem] bg-[#111113] overflow-hidden relative flex flex-col items-center justify-center p-4 border border-[#27272A]/50">
                  <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
                  
                  {/* Real HTML fallback component demo representation */}
                  <div className="w-full text-center space-y-4 relative z-10 animate-pulse">
                    <Sparkles className="mx-auto text-[#FFCA03]/40" size={32} />
                    <p className="text-[10px] font-black uppercase text-[#52525B] tracking-widest">
                      Preview Active
                    </p>
                    <p className="text-xs text-[#A1A1AA] max-w-[180px] mx-auto leading-relaxed">
                      Use the "Open Playground" view to compile, format, and run the {component.name} code instantly.
                    </p>
                  </div>
                </div>

                {/* iPhone Home indicator swipe bar */}
                {device === 'iphone' && (
                  <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 w-24 h-1 bg-white/30 rounded-full" />
                )}
              </div>

              {/* Bottom Actions grid */}
              <div className="w-full grid grid-cols-2 gap-4">
                <Button
                  onClick={handleFavoriteClick}
                  variant="outline"
                  className={cn(
                    "h-14 rounded-xl border-[#27272A] text-[#FAFAFA] hover:bg-[#FFCA03]/10 hover:text-[#FFCA03] font-bold uppercase text-xs tracking-wider transition-all",
                    favorited && "border-[#FFCA03]/30 text-[#FFCA03] bg-[#FFCA03]/5"
                  )}
                >
                  <Bookmark size={16} className={cn("mr-2", favorited && "fill-current")} />
                  {favorited ? 'Saved' : 'Save'} ({component.favorite_count + (favorited ? 1 : 0)})
                </Button>
                
                <Button
                  onClick={handleShare}
                  variant="outline"
                  className="h-14 rounded-xl border-[#27272A] text-white hover:bg-white/5 font-bold uppercase text-xs tracking-wider"
                >
                  <Share2 size={16} className="mr-2" /> Share
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* RELATED COMPONENTS */}
        {related.length > 0 && (
          <div className="mt-24 pt-16 border-t border-[#27272A]/50 space-y-8">
            <h3 className="font-display font-black text-2xl uppercase tracking-tight">Related Components</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((item) => (
                <ComponentCard key={item.id || item.slug} component={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  async function handleFavoriteClick() {
    if (!user) {
      toast.error('You must sign in to save custom components.');
      router.push('/login');
      return;
    }
    await toggleFavorite(component.id || component.slug);
  }
}
