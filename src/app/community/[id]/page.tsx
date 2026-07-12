import React from 'react';
import { getPostById } from '@/app/community/actions';
import { notFound } from 'next/navigation';
import { GlowEffect } from '@/components/shared/GlowEffect';
import Link from 'next/link';
import { ArrowLeft, MessageSquare, Heart, Eye } from 'lucide-react';
import { ReplyList } from '@/components/community/reply-list';
import { ReplyForm } from '@/components/community/reply-form';

export async function generateMetadata({ params }: { params: { id: string } }) {
  const post = await getPostById(params.id);
  if (!post) return { title: 'Post Not Found | MoboUI Community' };
  return {
    title: `${post.title} | MoboUI Community`,
    description: post.content.substring(0, 160),
  };
}

export default async function PostDetailPage({ params }: { params: { id: string } }) {
  const post = await getPostById(params.id);

  if (!post) {
    notFound();
  }

  const date = new Date(post.created_at);
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric'
  }).format(date);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-black relative">
      <GlowEffect className="top-0 right-1/4 opacity-10" size="xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Back Navigation */}
          <Link href="/community" className="inline-flex items-center gap-2 text-neutral-400 hover:text-white font-bold uppercase text-[10px] tracking-widest transition-colors mb-12">
            <ArrowLeft size={14} />
            Back to Discussions
          </Link>

          {/* Original Post */}
          <div className="bg-neutral-900/40 border border-white/5 p-8 md:p-12 rounded-[3rem] mb-8">
            <div className="flex items-center gap-3 mb-8">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-wider">
                {post.category}
              </span>
              <span className="text-neutral-500 text-xs font-medium">{formattedDate}</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-8">
              {post.title}
            </h1>

            <div className="flex items-center gap-4 mb-10 pb-10 border-b border-white/5">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-black/50 border border-white/10 shrink-0">
                {post.author?.avatar_url ? (
                  <img src={post.author.avatar_url} alt={post.author.username} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-neutral-600 font-bold uppercase text-xs">
                    {post.author?.username?.charAt(0) || 'U'}
                  </div>
                )}
              </div>
              <div>
                <div className="font-bold text-white">
                  {post.author?.full_name || post.author?.username || 'Unknown User'}
                </div>
                <div className="text-neutral-500 text-sm">@{post.author?.username || 'unknown'}</div>
              </div>
            </div>

            <div className="prose prose-invert max-w-none mb-12">
              <p className="text-lg leading-relaxed text-neutral-300 whitespace-pre-wrap">
                {post.content}
              </p>
            </div>

            {/* Post Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-10">
                {post.tags.map((tag: string) => (
                  <span key={tag} className="px-3 py-1 rounded-lg bg-white/5 border border-white/5 text-xs font-bold text-neutral-400">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Post Stats */}
            <div className="flex items-center gap-8 pt-6 border-t border-white/5">
              <div className="flex items-center gap-2 text-neutral-500">
                <Heart size={18} />
                <span className="font-bold">{post.likes || 0} Likes</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-500">
                <MessageSquare size={18} />
                <span className="font-bold">{post.replies_count || 0} Replies</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-500 ml-auto">
                <Eye size={18} />
                <span className="font-bold">{post.views || 0} Views</span>
              </div>
            </div>
          </div>

          {/* Replies Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-black uppercase tracking-tighter mb-8 flex items-center gap-3">
              <MessageSquare className="text-primary" size={24} />
              Discussion ({post.replies_count || 0})
            </h2>

            <ReplyList postId={post.id} />
            <ReplyForm postId={post.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
