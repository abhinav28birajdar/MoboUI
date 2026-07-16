'use client'
import React, { useState } from 'react'
import { communityProjects } from '@/data/community-projects'
import { Card, CardContent } from '../ui/Card'
import { FrameworkBadge } from '../ui/FrameworkBadge'
import { Badge } from '../ui/Badge'
import { Heart, ArrowRight } from 'lucide-react'

export function ShowcaseGrid() {
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all' 
    ? communityProjects 
    : communityProjects.filter(p => p.framework === filter)

  return (
    <section className="py-24 bg-zinc-950">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <h2 className="text-3xl font-bold text-white">From the Community</h2>
          <div className="flex gap-2 bg-zinc-900 p-1 rounded-lg border border-zinc-800">
            {['all', 'flutter', 'react-native', 'expo'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${filter === f ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white'}`}
              >
                {f === 'all' ? 'All' : f === 'react-native' ? 'React Native' : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, idx) => (
            <Card key={project.id} className="overflow-hidden group cursor-pointer bg-zinc-900/50">
              <CardContent className="p-0">
                <div className={`h-48 w-full ${idx % 3 === 0 ? 'bg-accent/20' : idx % 2 === 0 ? 'bg-[#54C5F8]/20' : 'bg-[#61DAFB]/20'} flex items-center justify-center relative`}>
                  <div className="text-white/50 font-bold tracking-widest uppercase">Screenshot Placeholder</div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1 group-hover:text-accent transition-colors">{project.title}</h3>
                      <p className="text-sm text-zinc-500">by {project.author}</p>
                    </div>
                    <FrameworkBadge framework={project.framework} showLabel={false} />
                  </div>
                  <p className="text-zinc-400 text-sm mb-6 line-clamp-2">{project.description}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex gap-2">
                      {project.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="text-[10px]">{tag}</Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-1 text-zinc-500 text-sm font-medium">
                      <Heart className="w-4 h-4 hover:fill-accent hover:text-accent transition-colors" /> {project.likes}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
           <button className="text-accent hover:text-accent-glow font-medium flex items-center gap-2 mx-auto">
             Load More Projects <ArrowRight className="w-4 h-4" />
           </button>
        </div>
      </div>
    </section>
  )
}
