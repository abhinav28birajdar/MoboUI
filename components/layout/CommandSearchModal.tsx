'use client'

import React, { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Fuse from 'fuse.js'

import { useAppStore } from '@/store/useAppStore'
import { components } from '@/data/components'
import { ComponentDefinition } from '@/types'
import { FrameworkBadge } from '../ui/FrameworkBadge'

const fuse = new Fuse(components, {
  keys: ['name', 'description', 'category', 'tags'],
  threshold: 0.3,
})

export function CommandSearchModal() {
  const router = useRouter()
  const { isSearchOpen, setSearchOpen, searchQuery, setSearchQuery, recentSearches, addRecentSearch } = useAppStore()
  const [results, setResults] = useState<ComponentDefinition[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(!isSearchOpen)
      }
      if (e.key === 'Escape') {
        setSearchOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isSearchOpen, setSearchOpen])

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    } else {
      setSearchQuery('')
    }
  }, [isSearchOpen])

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setResults([])
    } else {
      setResults(fuse.search(searchQuery).map(res => res.item).slice(0, 5))
    }
    setSelectedIndex(0)
  }, [searchQuery])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isSearchOpen) return
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : prev))
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : prev))
      }
      if (e.key === 'Enter') {
        e.preventDefault()
        if (results[selectedIndex]) {
          handleSelect(results[selectedIndex])
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isSearchOpen, results, selectedIndex])

  const handleSelect = (component: ComponentDefinition) => {
    addRecentSearch(component.name)
    setSearchOpen(false)
    router.push(`/components/${component.slug}`)
  }

  if (!isSearchOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-32 px-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setSearchOpen(false)}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] animate-in fade-in slide-in-from-top-4 duration-200">
        <div className="flex items-center px-4 py-4 border-b border-zinc-200 dark:border-zinc-800 gap-3">
          <i className="fi fi-rr-search w-5 h-5 text-zinc-600 dark:text-zinc-400"  ></i>
          <input
            ref={inputRef}
            type="text"
            className="flex-1 bg-transparent text-zinc-900 dark:text-white placeholder-zinc-500 outline-none"
            placeholder="Search components..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={() => setSearchOpen(false)} className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:text-white p-1">
            <i className="fi fi-rr-cross w-5 h-5"  ></i>
          </button>
        </div>

        <div className="overflow-y-auto p-4 flex-1 space-y-4">
          {results.length > 0 ? (
            <div>
              <div className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-2 px-2">Components</div>
              <ul className="space-y-1">
                {results.map((comp, idx) => (
                  <li key={comp.slug}>
                    <button
                      className={`w-full flex items-center justify-between px-3 py-3 rounded-xl transition-colors ${
                        idx === selectedIndex ? 'bg-zinc-200 dark:bg-zinc-800/80 text-zinc-900 dark:text-white' : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:bg-zinc-900'
                      }`}
                      onClick={() => handleSelect(comp)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                    >
                      <div className="flex flex-col items-start gap-1">
                        <span className="font-medium">{comp.name}</span>
                        <div className="flex gap-2">
                          {comp.frameworks.map(fw => (
                            <FrameworkBadge key={fw} framework={fw} showLabel={false} />
                          ))}
                        </div>
                      </div>
                      <i className={`fi fi-rr-angle-right w-4 h-4 ${idx === selectedIndex ? 'text-accent' : 'text-zinc-600'}`} ></i>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : searchQuery.trim() !== '' ? (
            <div className="text-center py-12 px-4">
              <i className="fi fi-rr-search w-12 h-12 text-zinc-800 mx-auto mb-4"  ></i>
              <p className="text-zinc-700 dark:text-zinc-300 font-medium">No results found.</p>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">We couldn't find anything matching "{searchQuery}"</p>
            </div>
          ) : recentSearches.length > 0 ? (
            <div>
              <div className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-2 px-2">Recent Searches</div>
              <ul className="space-y-1">
                {recentSearches.map((search, idx) => {
                  const comp = components.find(c => c.name === search)
                  if (!comp) return null
                  return (
                    <li key={idx}>
                      <button
                        className="w-full flex items-center justify-between px-3 py-3 rounded-xl text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:bg-zinc-900 hover:text-zinc-900 dark:text-white transition-colors"
                        onClick={() => handleSelect(comp)}
                      >
                        <div className="flex items-center gap-3">
                          <i className="fi fi-rr-search w-4 h-4"  ></i>
                          <span>{comp.name}</span>
                        </div>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-zinc-500 dark:text-zinc-400 text-sm">Type to search across 50+ components.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
