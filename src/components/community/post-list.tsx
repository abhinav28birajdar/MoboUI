"use client";

import React, { useEffect, useState } from 'react';
import { getPosts } from '@/app/community/actions';
import { PostCard } from './post-card';
import { Loader2, MessageSquareOff } from 'lucide-react';

export function PostList({ initialCategory = 'All' }: { initialCategory?: string }) {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchPosts = async () => {
      setLoading(true);
      const { data } = await getPosts(initialCategory);
      if (isMounted) {
        setPosts(data || []);
        setLoading(false);
      }
    };
    fetchPosts();

    return () => { isMounted = false; };
  }, [initialCategory]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 space-y-4">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
        <p className="text-neutral-500 font-bold uppercase tracking-widest text-xs">Loading Discussions</p>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 space-y-4 border border-dashed border-white/10 rounded-[3rem] bg-black/20">
        <MessageSquareOff className="w-16 h-16 text-neutral-700" />
        <h3 className="text-xl font-black text-white uppercase tracking-tighter">No Posts Found</h3>
        <p className="text-neutral-500 text-sm max-w-sm text-center">There are no discussions in this category yet. Be the first to start one!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
