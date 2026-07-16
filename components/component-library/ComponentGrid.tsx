'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { components } from '@/data/components'
import { Card, CardContent } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { FrameworkBadge } from '../ui/FrameworkBadge'
import { Skeleton } from '../ui/Skeleton'
import { useAppStore } from '@/store/useAppStore'
import { Heart } from 'lucide-react'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'

export function ComponentGrid() {
  const searchParams = useSearchParams()
  const category = searchParams.get('category') || 'all'
  const filter = searchParams.get('filter') || 'all'
  const { activeFramework, isFavorite, addFavorite, removeFavorite } = useAppStore()
  
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => setLoading(false), 300)
    return () => clearTimeout(timer)
  }, [category, filter, activeFramework])

  let filtered = components

  if (category !== 'all') {
    filtered = filtered.filter(c => c.category === category)
  }
  
  if (filter === 'favorites') {
    filtered = filtered.filter(c => isFavorite(c.slug))
  }

  if (activeFramework !== 'all') {
    filtered = filtered.filter(c => c.frameworks.includes(activeFramework as any))
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-[300px] border border-zinc-800 bg-zinc-900/50 rounded-2xl flex flex-col p-2">
             <Skeleton className="h-48 w-full rounded-xl mb-4" />
             <div className="px-4 flex flex-col gap-2">
               <Skeleton className="h-4 w-1/4" />
               <Skeleton className="h-6 w-3/4" />
             </div>
          </div>
        ))}
      </div>
    )
  }

  if (filtered.length === 0) {
    return (
      <div className="text-center py-24 bg-zinc-900/30 rounded-2xl border border-zinc-800 border-dashed">
        <p className="text-zinc-500 mb-2">No components found</p>
        <p className="text-sm text-zinc-600">Try adjusting your filters</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <AnimatePresence>
        {filtered.map((comp, idx) => {
          const fav = isFavorite(comp.slug)
          return (
            <motion.div
              key={comp.slug}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Link href={`/components/${comp.slug}`}>
                <Card className="h-full flex flex-col group cursor-pointer relative overflow-hidden">
                  <button 
                    className="absolute top-4 right-4 z-20 p-2 rounded-full bg-zinc-900/80 hover:bg-zinc-800 transition-colors"
                    onClick={(e) => {
                      e.preventDefault()
                      if (fav) {
                        removeFavorite(comp.slug)
                        toast('Removed from favorites')
                      } else {
                        addFavorite(comp.slug)
                        toast('Added to favorites ❤')
                      }
                    }}
                  >
                    <Heart className={`w-4 h-4 ${fav ? 'fill-accent text-accent' : 'text-zinc-400'}`} />
                  </button>
                  <CardContent className="p-0 flex-1 flex flex-col">
                    <div className="h-48 bg-zinc-800/60 p-4 m-2 rounded-xl flex items-center justify-center relative overflow-hidden">
                       <span className="text-zinc-600 font-mono text-sm">{comp.name} Preview</span>
                    </div>
                    <div className="p-6 pt-4 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-[10px] uppercase tracking-wider">{comp.category}</Badge>
                        {comp.isNew && <Badge variant="new" className="text-[10px]">NEW</Badge>}
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-accent transition-colors">{comp.name}</h3>
                      <div className="mt-auto flex items-center gap-3">
                        {comp.frameworks.map(fw => <FrameworkBadge key={fw} framework={fw} showLabel={false} />)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
