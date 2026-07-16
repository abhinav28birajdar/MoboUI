"use client";

import React, { useState } from 'react';
import { createReply } from '@/app/community/actions';
import { Button } from '@/components/ui/button';
import { Loader2, Send } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { useLoginPromptStore } from '@/store/login-prompt-store';

export function ReplyForm({ postId }: { postId: string }) {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { user } = useAuth();
  const openModal = useLoginPromptStore((state) => state.openModal);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    if (!user) {
      openModal('Join the Discussion', 'Sign in to post a reply in the community forum.');
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await createReply(postId, content);
      if (error) throw new Error(error);
      
      toast.success("Reply posted!");
      setContent('');
      router.refresh(); // Refresh the page to fetch the new reply in SSR
    } catch (error: any) {
      toast.error(error.message || "Failed to post reply.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 pt-8 border-t border-white/5">
      <h3 className="text-sm font-black uppercase tracking-widest mb-4">Post a Reply</h3>
      <div className="flex flex-col gap-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Share your thoughts or answer the question..."
          className="w-full bg-neutral-900/40 border border-white/10 rounded-2xl p-4 text-white placeholder:text-neutral-600 focus:outline-none focus:border-primary/50 min-h-[120px] transition-colors"
        />
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isSubmitting || !content.trim()}
            className="h-12 px-6 rounded-xl bg-primary hover:bg-primary/90 text-black font-black uppercase tracking-widest text-xs flex items-center gap-2"
          >
            {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
            Post Reply
          </Button>
        </div>
      </div>
    </form>
  );
}
