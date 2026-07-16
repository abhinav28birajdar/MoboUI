import React from 'react'
import { contributors } from '@/data/contributors'
import { Card, CardContent } from '../ui/Card'
import { Github } from 'lucide-react'

export function ContributorWall() {
  return (
    <section className="py-24 bg-zinc-950 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 mb-12">
        <h2 className="text-3xl font-bold text-white text-center">Core Contributors</h2>
        <p className="text-zinc-400 text-center mt-4">Meet the people building MOBOUI.</p>
      </div>

      <div className="relative flex overflow-x-hidden group">
        <div className="animate-marquee flex whitespace-nowrap group-hover:[animation-play-state:paused]">
          {[...contributors, ...contributors].map((c, i) => (
            <Card key={i} className="mx-3 w-72 flex-shrink-0 bg-zinc-900 border-zinc-800">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-accent-subtle flex items-center justify-center font-bold text-white text-lg">
                  {c.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-white text-sm">{c.name}</h4>
                  <p className="text-xs text-zinc-500">{c.role}</p>
                </div>
                <div className="text-right flex flex-col items-end">
                  <a href={c.githubUrl} className="text-zinc-500 hover:text-white mb-1"><Github className="w-4 h-4"/></a>
                  <span className="text-[10px] font-bold bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded-full">{c.contributions}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
