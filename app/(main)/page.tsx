import { HeroSection } from '@/components/home/HeroSection'
import { StatsSection } from '@/components/home/StatsSection'
import { FeaturedComponents } from '@/components/home/FeaturedComponents'
import { FrameworkSection } from '@/components/home/FrameworkSection'
import { PlaygroundPreview } from '@/components/home/PlaygroundPreview'
import { CommunityTeaser } from '@/components/home/CommunityTeaser'
import { CTASection } from '@/components/home/CTASection'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <StatsSection />
      <FeaturedComponents />
      <FrameworkSection />
      <PlaygroundPreview />
      <CommunityTeaser />
      <CTASection />
    </div>
  )
}
