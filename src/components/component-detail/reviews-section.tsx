import React from 'react';
import { getReviews, getComponentRating } from '@/lib/api/reviews';
import { StarRating } from './star-rating';
import { ReviewForm } from './review-form';
import { MessageSquare } from 'lucide-react';
import { getMockUserBadges } from '@/lib/api/badges';
import { BadgeIcon } from '@/components/shared/badge-icon';

interface ReviewsSectionProps {
  componentId: string;
}

export async function ReviewsSection({ componentId }: ReviewsSectionProps) {
  const [reviews, ratingStats] = await Promise.all([
    getReviews(componentId),
    getComponentRating(componentId)
  ]);

  // Fetch badges for all reviewers concurrently (using mock for now)
  const reviewersBadges = await Promise.all(
    reviews.map(async (r: any) => {
      const badges = await getMockUserBadges(r.user_id);
      return { userId: r.user_id, badges };
    })
  );
  const badgeMap = reviewersBadges.reduce((acc, curr) => {
    acc[curr.userId] = curr.badges;
    return acc;
  }, {} as Record<string, any[]>);

  return (
    <div className="space-y-12 mt-16 pt-16 border-t border-white/10">
      <div className="flex flex-col md:flex-row gap-12">
        {/* Rating Summary */}
        <div className="md:w-1/3">
          <h2 className="text-2xl font-black uppercase tracking-tighter text-white mb-6">
            Reviews & Ratings
          </h2>
          
          <div className="bg-neutral-900/30 border border-white/5 rounded-[2rem] p-8 mb-8 text-center">
            <div className="text-6xl font-black text-white mb-2">{ratingStats.average.toFixed(1)}</div>
            <div className="flex justify-center mb-2">
              <StarRating rating={ratingStats.average} size={24} />
            </div>
            <p className="text-neutral-500 text-sm font-medium">Based on {ratingStats.count} reviews</p>
          </div>

          <div className="space-y-3">
            {[5, 4, 3, 2, 1].map((star, index) => {
              const count = ratingStats.distribution[star - 1] || 0;
              const percentage = ratingStats.count > 0 ? (count / ratingStats.count) * 100 : 0;
              return (
                <div key={star} className="flex items-center gap-3">
                  <div className="flex items-center gap-1 w-12 text-sm font-bold text-neutral-400">
                    {star} <StarRating rating={1} size={12} maxStars={1} />
                  </div>
                  <div className="flex-1 h-2 bg-neutral-900 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all duration-500" 
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <div className="w-8 text-right text-xs font-medium text-neutral-500">{count}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Reviews List & Form */}
        <div className="md:w-2/3 space-y-8">
          <ReviewForm componentId={componentId} />

          <div className="space-y-6 mt-12">
            <h3 className="text-lg font-black uppercase tracking-tighter text-white flex items-center gap-2">
              <MessageSquare size={18} className="text-primary" /> Community Feedback
            </h3>

            {reviews.length === 0 ? (
              <div className="p-8 text-center border border-dashed border-white/10 rounded-[2rem] bg-neutral-900/20">
                <p className="text-neutral-500 font-medium">No reviews yet. Be the first to share your thoughts!</p>
              </div>
            ) : (
              reviews.map((review: any) => {
                const date = new Date(review.created_at).toLocaleDateString('en-US', {
                  month: 'short', day: 'numeric', year: 'numeric'
                });

                return (
                  <div key={review.id} className="p-6 rounded-3xl bg-neutral-900/30 border border-white/5">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-black/50 border border-white/10 shrink-0">
                          {review.author?.avatar_url ? (
                            <img src={review.author.avatar_url} alt={review.author.username} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-neutral-600 font-bold uppercase text-xs">
                              {review.author?.username?.charAt(0) || 'U'}
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <div className="font-bold text-white text-sm">
                              {review.author?.full_name || review.author?.username || 'Unknown User'}
                            </div>
                            <div className="flex -space-x-1">
                              {badgeMap[review.user_id]?.slice(0, 3).map((badge: any) => (
                                <BadgeIcon key={badge.id} badge={badge} size="sm" className="bg-black/50" />
                              ))}
                            </div>
                          </div>
                          <div className="text-neutral-500 text-[10px]">{date}</div>
                        </div>
                      </div>
                      <StarRating rating={review.rating} size={14} />
                    </div>
                    <p className="text-neutral-300 text-sm leading-relaxed whitespace-pre-wrap">
                      {review.comment}
                    </p>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
