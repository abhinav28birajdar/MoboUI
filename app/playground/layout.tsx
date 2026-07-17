import React from 'react'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import Link from 'next/link'


export default function PlaygroundLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-white dark:bg-zinc-950">
      <header className="flex-shrink-0 h-14 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-4 bg-white dark:bg-zinc-950/80 backdrop-blur-md">
        <Link href="/" className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:text-white transition-colors">
          <i className="fi fi-rr-arrow-left w-4 h-4"  ></i>
          <span>Back to MOBOUI</span>
        </Link>
        <div className="flex items-center gap-4">
           <span className="font-bold text-zinc-900 dark:text-white hidden sm:block">Live Playground</span>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </header>
      <main className="flex-1 overflow-hidden">{children}</main>
    </div>
  )
}
