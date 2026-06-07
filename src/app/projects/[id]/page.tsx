'use client';

import React, { useEffect, useState, use } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Github, ExternalLink, Heart, Sparkles, Code, User, Laptop, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
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
  app_store_url?: string;
  play_store_url?: string;
  tags: string[];
  frameworks: string[];
  status: string;
  view_count: number;
  like_count: number;
  created_at: string;
  challenge?: string;
  solution?: string;
  author?: {
    full_name: string;
    avatar_url?: string;
  };
}

export default function ProjectDetail() {
  const params = useParams();
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  const id = params.id as string;

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/projects/${id}`);
        if (!res.ok) throw new Error('Failed to load project details');
        const data = await res.json();
        setProject(data);
        setLikesCount(data.like_count || 0);
      } catch (err) {
        console.error(err);
        toast.error('Could not load project case study');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProject();
    }
  }, [id]);

  const handleLike = async () => {
    try {
      const res = await fetch(`/api/projects/${id}`, { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        setLikesCount(data.likes);
        setLiked(!liked);
        toast.success(liked ? 'Removed from favorites' : 'Added to favorites!');
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-2 border-primary border-t-transparent animate-spin mx-auto mb-4" />
          <p className="text-neutral-400 font-medium">Loading project case study...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center pt-20">
        <div className="text-center">
          <h2 className="text-3xl font-heading font-black mb-4 uppercase">Project Not Found</h2>
          <Button onClick={() => router.push('/projects')} className="bg-primary text-black font-bold uppercase tracking-widest text-xs rounded-xl h-12 px-6">
            Back to Showcase
          </Button>
        </div>
      </div>
    );
  }

  const allImages = [
    project.thumbnail_url,
    ...(project.screenshots || [])
  ].filter(Boolean);

  const handlePrevImage = () => {
    setActiveImageIdx(prev => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setActiveImageIdx(prev => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-32">
      <div className="container px-6 mx-auto">
        {/* Back Button */}
        <div className="mb-10">
          <Link href="/projects" className="inline-flex items-center gap-2 text-neutral-500 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest">
            <ArrowLeft size={16} />
            Back to Showcase
          </Link>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <div>
              {project.status === 'featured' && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary text-black text-[9px] font-black uppercase tracking-widest rounded-full mb-6">
                  <Sparkles size={10} /> FEATURED CASE STUDY
                </div>
              )}
              <h1 className="text-4xl md:text-6xl font-heading font-black tracking-tighter mb-4 uppercase leading-[0.9]">
                {project.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-neutral-500 text-xs font-bold uppercase tracking-widest">
                <span className="flex items-center gap-1.5">
                  <User size={14} className="text-primary" /> Created by {project.author?.full_name || 'MoboUI User'}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} /> {new Date(project.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
            </div>

            {/* Screenshots Carousel */}
            {allImages.length > 0 && (
              <div className="space-y-4">
                <div className="aspect-[4/3] rounded-[3.5rem] overflow-hidden border border-white/5 bg-neutral-950 relative group">
                  <img
                    src={allImages[activeImageIdx]}
                    alt={`${project.title} preview`}
                    className="w-full h-full object-cover"
                  />
                  {allImages.length > 1 && (
                    <>
                      <button
                        onClick={handlePrevImage}
                        className="absolute left-6 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/90 text-white p-3 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        onClick={handleNextImage}
                        className="absolute right-6 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/90 text-white p-3 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </>
                  )}
                </div>

                {/* Thumbnails indicator strip */}
                {allImages.length > 1 && (
                  <div className="flex gap-3 overflow-x-auto py-2">
                    {allImages.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIdx(idx)}
                        className={`w-24 aspect-video rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                          idx === activeImageIdx ? 'border-primary scale-95' : 'border-white/5 opacity-55 hover:opacity-100'
                        }`}
                      >
                        <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Case study challenge & solution */}
            <div className="space-y-8">
              <h2 className="text-3xl font-heading font-black uppercase text-white tracking-tight">Case Study</h2>

              <div className="bg-neutral-900/30 border border-white/5 rounded-[2.5rem] p-10 space-y-6">
                <h3 className="text-xl font-heading font-black uppercase text-primary tracking-tight flex items-center gap-2">
                  <Laptop size={18} /> Overview
                </h3>
                <p className="text-neutral-300 text-md leading-relaxed font-medium">
                  {project.long_description || project.description}
                </p>
              </div>

              {/* Challenge & Solution details */}
              <div className="bg-neutral-900/30 border border-white/5 rounded-[2.5rem] p-10 space-y-6">
                <h3 className="text-xl font-heading font-black uppercase text-primary tracking-tight flex items-center gap-2">
                  <Code size={18} /> Engineering Challenge
                </h3>
                <p className="text-neutral-300 text-md leading-relaxed font-medium">
                  {project.challenge || "Optimizing layout parameters and background renders while maintaining maximum frame-rate throughput. Resolving custom spacing, layout shifts, and deep-nest telemetry updates across multiple device states."}
                </p>
              </div>

              <div className="bg-neutral-900/30 border border-white/5 rounded-[2.5rem] p-10 space-y-6">
                <h3 className="text-xl font-heading font-black uppercase text-primary tracking-tight flex items-center gap-2">
                  <Sparkles size={18} /> The Solution
                </h3>
                <p className="text-neutral-300 text-md leading-relaxed font-medium">
                  {project.solution || "Leveraging MoboUI templates, layout constraints, and customized rendering pipelines. By applying glassmorphic modules and caching rendering contexts, GPU utilization was minimized and frame rates remained locked at 120 FPS."}
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar Controls */}
          <div className="space-y-8 lg:sticky lg:top-28">
            <div className="bg-neutral-900/50 border border-white/5 rounded-[2.5rem] p-8 space-y-8 shadow-lg">
              {/* Tech Stack */}
              <div className="space-y-4">
                <span className="text-neutral-500 text-[10px] font-black uppercase tracking-widest block">Frameworks</span>
                <div className="flex flex-wrap gap-2">
                  {project.frameworks.map((fw) => (
                    <span key={fw} className="px-3 py-1.5 rounded-lg bg-neutral-950 border border-white/5 text-[9px] font-black text-neutral-300 uppercase tracking-widest">
                      {fw}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tags */}
              {project.tags && project.tags.length > 0 && (
                <div className="space-y-4 pt-6 border-t border-white/5">
                  <span className="text-neutral-500 text-[10px] font-black uppercase tracking-widest block">Project Tags</span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-[8px] font-black text-neutral-400 uppercase tracking-wider">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* External Links */}
              <div className="space-y-3 pt-6 border-t border-white/5">
                {project.github_url && (
                  <Button asChild variant="outline" className="w-full h-12 border-white/10 hover:bg-white/5 text-white font-bold uppercase tracking-widest text-[10px] rounded-xl flex items-center justify-center gap-2">
                    <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                      <Github size={14} /> View Repository
                    </a>
                  </Button>
                )}

                {project.demo_url && (
                  <Button asChild className="w-full h-12 bg-primary text-black font-bold uppercase tracking-widest text-[10px] rounded-xl flex items-center justify-center gap-2">
                    <a href={project.demo_url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink size={14} /> Open Live Demo
                    </a>
                  </Button>
                )}
              </div>

              {/* Like details */}
              <div className="flex items-center justify-between border-t border-white/5 pt-6">
                <button
                  onClick={handleLike}
                  className="flex items-center gap-2 text-neutral-400 hover:text-red-500 transition-colors font-bold uppercase text-[10px] tracking-widest"
                >
                  <Heart size={16} className={liked ? 'fill-red-500 text-red-500' : ''} />
                  <span>{liked ? 'Liked' : 'Like Case Study'}</span>
                </button>
                <span className="text-xs font-black text-white">{likesCount} Likes</span>
              </div>
            </div>

            {/* Showcase note */}
            <div className="p-6 bg-primary/5 border border-primary/20 rounded-[2rem] flex gap-3">
              <Sparkles size={16} className="text-primary flex-shrink-0 mt-0.5" />
              <p className="text-[10px] text-neutral-400 leading-normal font-medium">
                This project was created using MoboUI. If you have built an application using our design tokens or layout blocks, submit it to be showcased!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
