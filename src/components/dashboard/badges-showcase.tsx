"use client";

import React, { useEffect, useState } from 'react';
import { BADGE_DICTIONARY, BadgeDefinition } from '@/lib/data/badges';
import { BadgeIcon } from '@/components/shared/badge-icon';
import { getMockUserBadges } from '@/lib/api/badges';
import { Lock } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface BadgesShowcaseProps {
  userId: string;
}

export function BadgesShowcase({ userId }: BadgesShowcaseProps) {
  const [earnedBadges, setEarnedBadges] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBadges = async () => {
      try {
        // Normally use getUserBadges, but for this demo using mock to show the UI
        const badges = await getMockUserBadges(userId);
        setEarnedBadges(badges);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBadges();
  }, [userId]);

  if (loading) {
    return <div className="h-40 animate-pulse bg-neutral-900/50 rounded-3xl" />;
  }

  const earnedIds = earnedBadges.map(b => b.badge_id);
  const allBadges = Object.values(BADGE_DICTIONARY);

  return (
    <div className="bg-neutral-900/40 border border-white/5 p-8 rounded-[2rem]">
      <div className="mb-6">
        <h3 className="text-xl font-black uppercase tracking-tighter text-white">Achievements</h3>
        <p className="text-sm text-neutral-500 font-medium">Unlock badges by contributing to the MOBOUI community.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {allBadges.map((badge: BadgeDefinition) => {
          const isEarned = earnedIds.includes(badge.id);

          return (
            <div 
              key={badge.id}
              className={cn(
                "relative p-4 rounded-2xl flex flex-col items-center justify-center text-center border transition-all",
                isEarned 
                  ? "bg-black/40 border-white/10 hover:border-white/20 hover:bg-black/60 cursor-pointer" 
                  : "bg-black/20 border-white/5 opacity-50 grayscale select-none"
              )}
            >
              <BadgeIcon badge={badge} size="lg" showTooltip={false} className="mb-3" />
              
              <div className="font-bold text-xs text-white mb-1 leading-tight">{badge.name}</div>
              <div className="text-[9px] text-neutral-500 leading-tight">
                {isEarned ? (
                  "Unlocked"
                ) : (
                  <span className="flex items-center justify-center gap-1">
                    <Lock size={8} /> Locked
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
