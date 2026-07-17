'use client'
import React from 'react'
import Link from 'next/link'
import { categories } from '../../data/categories'
import { components } from '../../data/components'
import { cn } from '@/lib/utils'
import { useSearchParams } from 'next/navigation'

export function CategorySidebar() {
  const searchParams = useSearchParams()
  const activeCategory = searchParams.get('category') || 'all'

  return (
    <div className="w-full md:w-64 flex-shrink-0 sticky top-24">
      <div className="space-y-1">
        <Link
          href="/components"
          className={cn(
            "flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors",
            activeCategory === 'all' ? "bg-accent/10 text-accent font-medium border-l-2 border-accent" : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-100 hover:bg-zinc-50 dark:bg-zinc-900"
          )}
        >
          <span>All Components</span>
          <span className="bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 px-2 py-0.5 rounded-full text-xs">{components.length}</span>
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/components?category=${cat.id}`}
            className={cn(
              "flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors",
              activeCategory === cat.id ? "bg-accent/10 text-accent font-medium border-l-2 border-accent" : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-100 hover:bg-zinc-50 dark:bg-zinc-900"
            )}
          >
            <div className="flex items-center gap-2">
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </div>
            <span className="bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 px-2 py-0.5 rounded-full text-xs">{cat.count}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
