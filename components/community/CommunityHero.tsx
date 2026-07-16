import React from 'react'
import { Button } from '../ui/Button'
import { SectionLabel } from '../ui/SectionLabel'

export function CommunityHero() {
  return (
    <section className="relative py-24 overflow-hidden flex flex-col items-center justify-center text-center">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-800/40 via-bg-dark to-bg-dark -z-10" />
      <div className="mx-auto max-w-4xl px-6">
        <SectionLabel className="mb-4 inline-block">COMMUNITY</SectionLabel>
        <h1 className="text-5xl md:text-7xl font-black text-white mb-6">Built by developers,<br/>for developers.</h1>
        <p className="text-lg text-zinc-400 mb-10 max-w-2xl mx-auto">
          Share your projects, discover inspiration, and connect with mobile UI enthusiasts worldwide.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="w-full sm:w-auto bg-[#5865F2] hover:bg-[#4752C4]">
            Join Discord
          </Button>
          <Button variant="outline" size="lg" className="w-full sm:w-auto">
            Submit Your Project
          </Button>
        </div>
      </div>
    </section>
  )
}
