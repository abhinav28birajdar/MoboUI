import React from 'react'
import Link from 'next/link'
import { components } from '../../data/components'
import { Card, CardContent } from '../ui/Card'
import { FrameworkBadge } from '../ui/FrameworkBadge'

export function RelatedComponents({ slugs }: { slugs: string[] }) {
  if (!slugs || slugs.length === 0) {
    // Just pick some random related ones if none specified
    slugs = components.slice(0, 4).map(c => c.slug)
  }

  const related = components.filter(c => slugs.includes(c.slug)).slice(0, 4)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {related.map(comp => (
        <Link key={comp.slug} href={`/components/${comp.slug}`}>
          <Card className="h-full flex flex-col group cursor-pointer overflow-hidden border-zinc-200 dark:border-zinc-800 hover:border-zinc-700 hover:bg-zinc-50 dark:bg-zinc-900/50 bg-white dark:bg-zinc-950">
            <CardContent className="p-5 flex flex-col flex-1">
               <h4 className="font-medium text-zinc-900 dark:text-white mb-2 group-hover:text-accent transition-colors">{comp.name}</h4>
               <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 mb-4">{comp.description}</p>
               <div className="mt-auto flex items-center gap-2">
                 {comp.frameworks.map(fw => <FrameworkBadge key={fw} framework={fw} showLabel={false} />)}
               </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
