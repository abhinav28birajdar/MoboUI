import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  size?: number;
  className?: string;
}

export function StarRating({ rating, maxStars = 5, size = 16, className }: StarRatingProps) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      {[...Array(maxStars)].map((_, i) => {
        const isFilled = i < Math.floor(rating);
        const isHalf = !isFilled && i < rating;
        
        return (
          <div key={i} className="relative">
            <Star 
              size={size} 
              className={isFilled ? "fill-primary text-primary" : "text-neutral-700"} 
            />
            {isHalf && (
              <div className="absolute top-0 left-0 overflow-hidden w-1/2">
                <Star size={size} className="fill-primary text-primary" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
