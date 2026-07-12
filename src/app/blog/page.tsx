'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Newspaper, User, ChevronRight, RefreshCw, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState('All');

  const tags = ['All', 'Animations', 'Design Systems', 'Performance', 'Flutter', 'React Native'];

  // Fetch blogs from API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const url = selectedTag === 'All' ? '/api/blog' : `/api/blog?tag=${encodeURIComponent(selectedTag)}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error('Failed to load blog posts');
        const data = await res.json();
        setPosts(data.posts || []);
      } catch (err) {
        console.error(err);
        toast.error('Could not load blog posts.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [selectedTag]);

  const featuredPost = posts.find((p) => p.isFeatured) || posts[0];
  const listPosts = featuredPost ? posts.filter((p) => p.slug !== featuredPost.slug) : posts;

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-[#FAFAFA] pt-28 pb-32">
      <div className="container px-6 mx-auto">
        
        {/* Header */}
        <div className="max-w-4xl mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/5 text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500 mb-6">
            <Newspaper size={14} className="text-primary" />
            LATEST ARTICLES
          </div>

          <h1 className="text-5xl md:text-7xl font-display font-black tracking-tighter mb-6 uppercase">
            THE <span className="text-primary neon-text-glow">BLOG.</span>
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl font-medium leading-relaxed">
            Insights, tutorials, and engineering best practices from the creators of MOBOUI.
          </p>
        </div>

        {/* Tags filter buttons bar */}
        <div className="flex flex-wrap gap-2.5 mb-12 border-b border-[#27272A]/50 pb-6">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${
                selectedTag === tag
                  ? 'bg-[#C026D3] text-black border-[#C026D3]'
                  : 'bg-[#111113]/40 text-[#A1A1AA] border-[#27272A]/60 hover:text-white hover:border-[#C026D3]/40'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Blogs grid layout */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <RefreshCw className="animate-spin text-primary" size={24} />
            <span className="text-xs font-bold text-text-secondary uppercase tracking-widest">Loading Articles...</span>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20 bg-[#111113]/20 border border-dashed border-[#27272A] rounded-xl max-w-lg mx-auto space-y-4">
            <AlertCircle size={32} className="text-[#52525B] mx-auto" />
            <h3 className="font-display font-black text-lg uppercase tracking-tight">No Articles Found</h3>
            <p className="text-xs text-text-secondary font-medium">There are no articles associated with the selected tag.</p>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Featured Post Card (full width hero) */}
            {featuredPost && (
              <div className="group relative">
                <Link href={`/blog/${featuredPost.slug}`} className="block">
                  <div className="bg-[#111113]/40 border border-[#27272A]/50 rounded-2xl overflow-hidden flex flex-col lg:flex-row h-full hover:border-[#C026D3]/30 transition-all duration-300">
                    <div className="lg:w-1/2 aspect-video lg:aspect-auto overflow-hidden bg-zinc-900 relative">
                      <img
                        src={featuredPost.coverImageUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&fit=crop'}
                        alt={featuredPost.title}
                        className="object-cover w-full h-full group-hover:scale-102 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex-1 p-10 lg:p-16 flex flex-col justify-center space-y-6">
                      <div className="flex gap-2">
                        <span className="text-[#C026D3] text-[10px] font-black uppercase tracking-widest">
                          {featuredPost.category || 'Engineering'}
                        </span>
                      </div>
                      <h2 className="text-3xl md:text-4xl font-display font-black tracking-tight text-white group-hover:text-primary transition-colors leading-[0.95] uppercase">
                        {featuredPost.title}
                      </h2>
                      <p className="text-[#A1A1AA] text-sm font-medium leading-relaxed line-clamp-3">
                        {featuredPost.excerpt}
                      </p>
                      
                      <div className="pt-6 border-t border-[#27272A]/40 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full bg-primary/20 border border-[#C026D3]/30 flex items-center justify-center text-[10px] font-black text-primary">
                            M
                          </div>
                          <span className="text-xs font-bold text-white">MoboUI Team</span>
                        </div>
                        <div className="flex items-center gap-4 text-[10px] font-black text-[#52525B] uppercase tracking-widest">
                          <span className="flex items-center gap-1"><Calendar size={12} /> {new Date(featuredPost.publishedAt || featuredPost.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                          <span className="flex items-center gap-1"><Clock size={12} /> {featuredPost.readTimeMinutes} min read</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            )}

            {/* Remaining Posts Grid */}
            {listPosts.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
                {listPosts.map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                    <div className="flex flex-col h-full bg-[#111113]/40 border border-[#27272A]/50 rounded-2xl overflow-hidden hover:border-[#C026D3]/30 transition-all duration-300">
                      <div className="aspect-video overflow-hidden bg-zinc-900">
                        <img
                          src={post.coverImageUrl || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&fit=crop'}
                          alt={post.title}
                          className="object-cover w-full h-full group-hover:scale-102 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-8 flex flex-col flex-1 space-y-4">
                        <span className="text-[#C026D3] text-[9px] font-black uppercase tracking-widest">{post.category || 'Mobile'}</span>
                        <h3 className="text-xl font-display font-black text-white group-hover:text-primary transition-colors line-clamp-2 uppercase">
                          {post.title}
                        </h3>
                        <p className="text-[#A1A1AA] text-xs font-medium leading-relaxed line-clamp-3">
                          {post.excerpt}
                        </p>
                        
                        <div className="pt-6 border-t border-[#27272A]/30 flex items-center justify-between text-[9px] font-black text-[#52525B] uppercase tracking-widest mt-auto">
                          <span>{new Date(post.publishedAt || post.createdAt).toLocaleDateString()}</span>
                          <span>•</span>
                          <span>{post.readTimeMinutes} min read</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
