import React from 'react'
import { CommunityHero } from '@/components/community/CommunityHero'
import { ShowcaseGrid } from '@/components/community/ShowcaseGrid'
import { ContributorWall } from '@/components/community/ContributorWall'
import { DiscordBanner } from '@/components/community/DiscordBanner'

export default function CommunityPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-zinc-950">
      <CommunityHero />
      <ShowcaseGrid />
      <ContributorWall />
      <DiscordBanner />
    </div>
  )
}
