import React from 'react';
import Link from 'next/link';
import { Eye, Heart, Clock, CheckCircle, AlertCircle, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    description: string | null;
    cover_image_url: string | null;
    framework: string | null;
    status: 'pending' | 'approved' | 'rejected' | string;
    view_count: number;
    like_count: number;
    created_at: string;
    tags: string[];
  };
}

export function ProjectCard({ project }: ProjectCardProps) {
  const isApproved = project.status === 'approved';
  const isPending = project.status === 'pending';
  const isRejected = project.status === 'rejected';

  // Format date
  const date = new Date(project.created_at);
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date);

  return (
    <div className="group flex flex-col h-full bg-neutral-900/40 border border-white/5 rounded-[2rem] overflow-hidden hover:border-primary/30 hover:shadow-[0_0_30px_rgba(255,202,3,0.05)] transition-all duration-500">
      {/* Thumbnail */}
      <div className="aspect-video relative overflow-hidden bg-neutral-950 border-b border-white/5">
        {project.cover_image_url ? (
          <img
            src={project.cover_image_url}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-neutral-900/50">
            <span className="text-neutral-700 font-black text-4xl uppercase tracking-tighter opacity-20">
              {project.framework || 'MOBOUI'}
            </span>
          </div>
        )}
        
        {/* Status Badge */}
        <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full border bg-black/80 backdrop-blur-md text-[10px] font-black uppercase tracking-wider">
          {isApproved && (
            <><CheckCircle size={12} className="text-green-500" /> <span className="text-green-500">Approved</span></>
          )}
          {isPending && (
            <><Clock size={12} className="text-yellow-500" /> <span className="text-yellow-500">Pending</span></>
          )}
          {isRejected && (
            <><AlertCircle size={12} className="text-red-500" /> <span className="text-red-500">Rejected</span></>
          )}
          {!isApproved && !isPending && !isRejected && (
            <span className="text-neutral-400">{project.status}</span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <span className="text-primary text-[9px] font-black uppercase tracking-widest bg-primary/10 px-2 py-0.5 rounded-sm">
            {project.framework || 'React Native'}
          </span>
          <div className="flex items-center gap-1 text-[10px] text-neutral-500 font-bold">
            <Calendar size={12} />
            <span>{formattedDate}</span>
          </div>
        </div>

        <h3 className="text-lg font-black text-white tracking-tight leading-snug group-hover:text-primary transition-colors line-clamp-1 mb-2">
          {project.title}
        </h3>

        <p className="text-neutral-500 text-xs line-clamp-2 mb-6 font-medium leading-relaxed">
          {project.description || 'No description provided.'}
        </p>

        {/* Tags */}
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-6 mt-auto">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-[9px] font-bold text-neutral-400 uppercase tracking-wider"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-[9px] font-bold text-neutral-400">
                +{project.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
          <div className="flex items-center gap-4 text-xs text-neutral-400 font-bold">
            <div className="flex items-center gap-1.5">
              <Eye size={14} className="text-neutral-500" />
              <span>{project.view_count || 0}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Heart size={14} className="text-neutral-500" />
              <span>{project.like_count || 0}</span>
            </div>
          </div>

          <Link href={`/marketplace/${project.id}`} className="text-[10px] font-black uppercase tracking-wider text-neutral-400 hover:text-white transition-colors flex items-center gap-1">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}