import React from 'react'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import Link from 'next/link'


export default function PlaygroundLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-zinc-950">
      <header className="flex-shrink-0 h-14 border-b border-zinc-800 flex items-center justify-between px-4 bg-zinc-950/80 backdrop-blur-md">
        <Link href="/" className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors">
          <i className="fi fi-rr-arrow-left w-4 h-4"  ></i>
          <span>Back to MOBOUI</span>
        </Link>
        <div className="flex items-center gap-4">
           <span className="font-bold text-white hidden sm:block">Live Playground</span>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </header>
      <main className="flex-1 overflow-hidden">{children}</main>
    </div>
  )
}
