"use client";

import React, { useState } from 'react';
import { Star, Loader2, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { submitReview } from '@/lib/api/reviews';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface ReviewFormProps {
  componentId: string;
}

export function ReviewForm({ componentId }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error('Please select a star rating.');
      return;
    }
    if (!comment.trim()) {
      toast.error('Please enter a comment.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await submitReview(componentId, rating, comment);
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success('Review submitted successfully!');
        setRating(0);
        setComment('');
        router.refresh();
      }
    } catch (error) {
      toast.error('An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-neutral-900/30 border border-white/5 rounded-[2rem] p-8">
      <h3 className="text-xl font-black uppercase tracking-tighter text-white mb-6">Leave a Review</h3>
      
      <div className="mb-6">
        <label className="block text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-2">
          Your Rating
        </label>
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setRating(star)}
              className="focus:outline-none transition-transform hover:scale-110"
            >
              <Star
                size={28}
                className={`transition-colors ${
                  star <= (hoverRating || rating)
                    ? 'fill-primary text-primary'
                    : 'text-neutral-700'
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-2">
          Your Comment
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="What did you think about this component?"
          className="w-full bg-black/50 border border-white/10 text-white rounded-xl px-4 py-4 text-sm focus:outline-none focus:border-primary/50 min-h-[120px]"
        />
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={isSubmitting || rating === 0 || !comment.trim()}
          className="h-12 px-8 rounded-xl bg-primary hover:bg-primary/90 text-black font-black uppercase tracking-widest text-xs flex items-center gap-2"
        >
          {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
          Submit Review
        </Button>
      </div>
    </form>
  );
}
