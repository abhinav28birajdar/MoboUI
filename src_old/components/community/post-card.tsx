import React from 'react';
import Link from 'next/link';
import { MessageSquare, Heart, Eye } from 'lucide-react';

interface PostCardProps {
  post: any;
}

export function PostCard({ post }: PostCardProps) {
  const date = new Date(post.created_at);
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date);

  return (
    <Link href={`/community/${post.id}`} className="block">
      <div className="p-6 rounded-[2rem] bg-neutral-900/40 border border-white/5 hover:border-primary/30 hover:bg-neutral-900/60 hover:shadow-[0_0_30px_rgba(255,202,3,0.05)] transition-all duration-300">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className="w-12 h-12 rounded-xl overflow-hidden bg-black/50 border border-white/10 shrink-0">
            {post.author?.avatar_url ? (
              <img src={post.author.avatar_url} alt={post.author.username} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-neutral-600 font-bold uppercase text-xs">
                {post.author?.username?.charAt(0) || 'U'}
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="font-bold text-white truncate max-w-[200px]">
                {post.author?.full_name || post.author?.username || 'Unknown User'}
              </span>
              <span className="text-neutral-500 text-xs">@{post.author?.username || 'unknown'}</span>
              <span className="text-neutral-600 text-xs mx-1">•</span>
              <span className="text-neutral-500 text-xs">{formattedDate}</span>
              
              {post.category && (
                <span className="ml-auto px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-wider">
                  {post.category}
                </span>
              )}
            </div>

            <h3 className="text-lg font-black text-white leading-snug mb-2 line-clamp-2">
              {post.title}
            </h3>
            
            <p className="text-neutral-400 text-sm line-clamp-2 mb-4 leading-relaxed">
              {post.content}
            </p>

            <div className="flex items-center gap-6 mt-4">
              <div className="flex items-center gap-2 text-neutral-500 hover:text-white transition-colors group">
                <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-white/10 flex items-center justify-center">
                  <Heart size={14} />
                </div>
                <span className="text-xs font-bold">{post.likes || 0}</span>
              </div>
              
              <div className="flex items-center gap-2 text-neutral-500 hover:text-primary transition-colors group">
                <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-primary/10 flex items-center justify-center">
                  <MessageSquare size={14} />
                </div>
                <span className="text-xs font-bold">{post.replies_count || 0}</span>
              </div>

              <div className="flex items-center gap-2 text-neutral-600 ml-auto">
                <Eye size={14} />
                <span className="text-xs font-bold">{post.views || 0}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
