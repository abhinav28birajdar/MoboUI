'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ExternalLink, Github, Heart, Share2, Award, Sparkles, Filter, ArrowUpDown, Laptop, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

interface Project {
  id: string;
  title: string;
  description: string;
  long_description?: string;
  thumbnail_url: string;
  screenshots: string[];
  demo_url?: string;
  github_url?: string;
  tags: string[];
  frameworks: string[];
  status: string;
  view_count: number;
  like_count: number;
  created_at: string;
  author?: {
    full_name: string;
    avatar_url?: string;
  };
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [framework, setFramework] = useState('all');
  const [sort, setSort] = useState('popular');

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const queryParams = new URLSearchParams({
          q: debouncedSearch,
          framework,
          sort,
        });

        const res = await fetch(`/api/projects?${queryParams.toString()}`);
        if (!res.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data = await res.json();
        setProjects(data.projects || []);
      } catch (err) {
        console.error(err);
        toast.error('Could not load showcase projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [debouncedSearch, framework, sort]);

  const handleLike = async (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const res = await fetch(`/api/projects/${id}`, { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        setProjects(prev =>
          prev.map(p => (p.id === id ? { ...p, like_count: data.likes } : p))
        );
        toast.success('Project favorited!');
      }
    } catch (err) {
      console.error(err);
    }
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
            <Award size={14} className="text-primary" />
            Built with MOBOUI
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-heading font-black tracking-tighter mb-6 uppercase">
            COMMUNITY <span className="text-primary neon-text-glow">SHOWCASE.</span>
          </h1>
          <p className="text-xl text-neutral-400 max-w-2xl font-medium leading-relaxed">
            Be inspired by what world-class developers are building using our enterprise mobile component library.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-neutral-900/50 border border-white/5 p-6 rounded-[2.5rem] mb-12 flex flex-col gap-6 lg:flex-row lg:items-center justify-between shadow-sm">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
            <Input
              type="text"
              placeholder="Search showcase projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-black border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-sm focus:border-primary/50 focus:outline-none transition-all text-white font-medium placeholder:text-neutral-600 h-12"
            />
          </div>

          {/* Filters Selects */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Framework */}
            <div className="flex items-center gap-2">
              <Filter size={14} className="text-neutral-500" />
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
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <ArrowUpDown size={14} className="text-neutral-500" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="bg-black border border-white/10 text-neutral-300 rounded-xl px-3 py-2 text-xs font-bold uppercase tracking-wider focus:outline-none focus:border-primary cursor-pointer h-10"
              >
                <option value="popular">Most Popular</option>
                <option value="newest">Newest</option>
                <option value="views">Most Viewed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Listings Grid */}
        {loading ? (
          <div className="py-24 text-center">
            <div className="w-12 h-12 rounded-full border-2 border-primary border-t-transparent animate-spin mx-auto mb-4" />
            <p className="text-neutral-400 font-medium">Loading showcase applications...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="py-24 text-center bg-neutral-900/20 border border-dashed border-white/10 rounded-[3rem]">
            <Laptop size={48} className="mx-auto text-neutral-600 mb-4" />
            <h3 className="text-xl font-heading font-black mb-2 uppercase text-neutral-400">No Projects Found</h3>
            <p className="text-neutral-500 text-sm max-w-sm mx-auto font-medium">
              We couldn't find any showcase projects matching your search filter rules.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 text-left">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group relative"
              >
                <div className="flex flex-col md:flex-row h-full bg-neutral-900/40 border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-primary/30 hover:shadow-[0_0_50px_rgba(255,202,3,0.05)] transition-all duration-500">
                  {/* Image */}
                  <div className="md:w-2/5 aspect-[3/4] md:aspect-auto relative overflow-hidden bg-neutral-950">
                    <img
                      src={project.thumbnail_url}
                      alt={project.title}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                    />
                    {project.status === 'featured' && (
                      <div className="absolute top-6 left-6 px-4 py-2 bg-primary text-black text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg flex items-center gap-1">
                        <Sparkles size={10} /> FEATURED
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 p-8 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-2xl font-black text-white tracking-tight uppercase leading-snug group-hover:text-primary transition-colors">
                            {project.title}
                          </h3>
                          <p className="text-neutral-500 text-[9px] font-black uppercase tracking-wider mt-1">
                            by {project.author?.full_name || 'MoboUI User'}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          {project.github_url && (
                            <a
                              href={project.github_url}
                              target="_blank"
                              rel="noreferrer"
                              className="p-2 bg-white/5 border border-white/5 hover:border-primary/30 rounded-xl text-neutral-400 hover:text-white transition-colors"
                            >
                              <Github size={14} />
                            </a>
                          )}
                          {project.demo_url && (
                            <a
                              href={project.demo_url}
                              target="_blank"
                              rel="noreferrer"
                              className="p-2 bg-white/5 border border-white/5 hover:border-primary/30 rounded-xl text-neutral-400 hover:text-white transition-colors"
                            >
                              <ExternalLink size={14} />
                            </a>
                          )}
                        </div>
                      </div>

                      <p className="text-neutral-400 text-xs leading-relaxed font-medium line-clamp-3">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {project.frameworks.map((fw) => (
                          <span
                            key={fw}
                            className="px-2.5 py-1 rounded bg-black/60 border border-white/5 text-[8px] font-black text-primary uppercase tracking-wider"
                          >
                            {fw}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-6">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={(e) => handleLike(project.id, e)}
                          className="flex items-center gap-1.5 group/like cursor-pointer"
                        >
                          <Heart
                            size={16}
                            className="text-neutral-500 group-hover/like:text-red-500 transition-colors"
                          />
                          <span className="text-xs font-black text-neutral-400 group-hover/like:text-white">
                            {project.like_count}
                          </span>
                        </button>
                      </div>

                      <Button
                        asChild
                        className="rounded-xl h-10 px-5 font-black text-[9px] uppercase tracking-widest bg-primary text-black hover:bg-primary/95 transition-all"
                      >
                        <Link href={`/projects/${project.id}`}>CASE STUDY</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* CTA banner */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-32 p-16 bg-neutral-900/50 rounded-[3rem] border border-white/5 text-center relative overflow-hidden group shadow-sm"
        >
          <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <h2 className="text-4xl md:text-5xl font-heading font-black text-white tracking-tighter mb-6 uppercase">
            Built something <span className="text-primary">amazing?</span>
          </h2>
          <p className="text-lg text-neutral-400 max-w-xl mx-auto mb-10 font-medium">
            Submit your application to be featured in our showcase and reach thousands of developers.
          </p>
          <Button
            asChild
            size="lg"
            className="rounded-2xl h-16 px-12 bg-primary text-black font-black text-md uppercase tracking-widest hover:scale-105 transition-all border-0"
          >
            <Link href="/projects/submit">
              Submit Project <Sparkles size={18} className="ml-2" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
