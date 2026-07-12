"use client";

import React, { useEffect, useState } from 'react';
import { getReplies } from '@/app/community/actions';
import { Loader2 } from 'lucide-react';

export function ReplyList({ postId }: { postId: string }) {
  const [replies, setReplies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchReplies = async () => {
      const data = await getReplies(postId);
      if (isMounted) {
        setReplies(data || []);
        setLoading(false);
      }
    };
    fetchReplies();

    return () => { isMounted = false; };
  }, [postId]);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (replies.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-neutral-500 font-bold uppercase tracking-widest text-xs">No Replies Yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {replies.map((reply) => {
        const date = new Date(reply.created_at);
        const formattedDate = new Intl.DateTimeFormat('en-US', {
          month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric'
        }).format(date);

        return (
          <div key={reply.id} className="p-6 rounded-3xl bg-neutral-900/30 border border-white/5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-black/50 border border-white/10 shrink-0">
                {reply.author?.avatar_url ? (
                  <img src={reply.author.avatar_url} alt={reply.author.username} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-neutral-600 font-bold uppercase text-[10px]">
                    {reply.author?.username?.charAt(0) || 'U'}
                  </div>
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm">
                    {reply.author?.full_name || reply.author?.username || 'Unknown User'}
                  </span>
                  {reply.is_answer && (
                    <span className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-500 text-[10px] font-black uppercase tracking-wider">
                      Accepted Answer
                    </span>
                  )}
                </div>
                <div className="text-neutral-500 text-[10px]">{formattedDate}</div>
              </div>
            </div>
            
            <p className="text-neutral-300 text-sm leading-relaxed whitespace-pre-wrap">
              {reply.content}
            </p>
          </div>
        );
      })}
    </div>
  );
}
