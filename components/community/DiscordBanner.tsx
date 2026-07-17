import React from 'react'
import { Button } from '../ui/Button'

export function DiscordBanner() {
  return (
    <section className="py-12 bg-white dark:bg-zinc-950">
      <div className="mx-auto max-w-5xl px-6">
        <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1/2 h-full bg-[#5865F2]/10 blur-3xl -z-10" />
          
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white mb-2">Chat with us on Discord</h3>
            <p className="text-zinc-600 dark:text-zinc-400">3,200+ members · Component help · Feature requests · Showcase channel</p>
          </div>
          
          <Button size="lg" className="w-full md:w-auto bg-[#5865F2] hover:bg-[#4752C4] text-zinc-900 dark:text-white border-none whitespace-nowrap flex-shrink-0">
            Join Server →
          </Button>
        </div>
      </div>
    </section>
  )
}
