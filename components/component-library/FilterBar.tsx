'use client'
import React from 'react'

import { useAppStore } from '@/store/useAppStore'
import { Framework } from '@/types'

export function FilterBar() {
  const { activeFramework, setActiveFramework } = useAppStore()

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-4 border-b border-zinc-200 dark:border-zinc-800">
      <div className="relative w-full sm:w-64">
        <i className="fi fi-rr-search absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 dark:text-zinc-400"  ></i>
        <input 
          type="text" 
          placeholder="Filter..." 
          className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg pl-10 pr-4 py-2 text-sm text-zinc-900 dark:text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-accent"
        />
      </div>
      
      <div className="flex items-center gap-2">
        <span className="text-sm text-zinc-500 dark:text-zinc-400 mr-2">Framework:</span>
        <select 
          value={activeFramework}
          onChange={(e) => setActiveFramework(e.target.value as Framework | 'all')}
          className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-accent"
        >
          <option value="all">All Frameworks</option>
          <option value="flutter">Flutter</option>
          <option value="react-native">React Native</option>
          <option value="expo">Expo</option>
        </select>
        
        <select className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-accent ml-2">
          <option value="popular">Most Popular</option>
          <option value="newest">Newest</option>
          <option value="az">A-Z</option>
        </select>
      </div>
    </div>
  )
}
