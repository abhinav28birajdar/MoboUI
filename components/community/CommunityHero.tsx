import React from 'react'
import { Button } from '../ui/Button'
import { SectionLabel } from '../ui/SectionLabel'

export function CommunityHero() {
  return (
    <section className="relative py-24 overflow-hidden flex flex-col items-center justify-center text-center">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-800/40 via-bg-dark to-bg-dark -z-10" />
      <div className="mx-auto max-w-4xl px-6">
        <SectionLabel className="mb-4 inline-block">COMMUNITY</SectionLabel>
        <h1 className="text-5xl md:text-7xl font-black text-zinc-900 dark:text-white mb-6">Built by developers,<br/>for developers.</h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-10 max-w-2xl mx-auto">
          Share your projects, discover inspiration, and connect with mobile UI enthusiasts worldwide.
        </p>
        <a href="https://github.com/abhinav28birajdar/MoboUI" target="_blank" rel="noopener noreferrer">
          <Button size="lg" className="w-full sm:w-auto bg-zinc-900 dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 border-none">
            Submit Your Project
          </Button>
        </a>
      </div>
    </section>
  )
}
