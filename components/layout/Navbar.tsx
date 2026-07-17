'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'
import { ThemeToggle } from '../ui/ThemeToggle'
import { useAppStore } from '@/store/useAppStore'
import { Button } from '../ui/Button'

export function Navbar() {
  const pathname = usePathname()
  const { setSearchOpen, favorites } = useAppStore()
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  const links = [
    { href: '/components', label: 'Components' },
    { href: '/playground', label: 'Playground' },
    { href: '/community', label: 'Community' },
    { href: '/blog', label: 'Blog' },
    { href: '/about', label: 'About' },
  ]

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  return (
    <>
      <nav className="fixed top-0 inset-x-0 z-50 flex h-16 items-center justify-between border-b border-zinc-800 bg-zinc-950/80 px-6 backdrop-blur-md">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            {/* Logo SVG */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 22H22L12 2Z" fill="#c026d3" />
            </svg>
            <span className="text-lg font-bold tracking-tight text-white">MOBOUI</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
            {links.map((link) => {
              const isActive = pathname.startsWith(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative text-sm font-medium transition-colors hover:text-zinc-100",
                    isActive ? "text-accent" : "text-zinc-400"
                  )}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-[21px] left-1/2 h-[2px] w-full -translate-x-1/2 bg-accent rounded-t-full" />
                  )}
                </Link>
              )
            })}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setSearchOpen(true)}
            className="hidden sm:flex h-9 items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 text-sm text-zinc-400 transition-colors hover:border-zinc-700 hover:text-zinc-300 w-48 xl:w-64"
          >
            <i className="fi fi-rr-search h-4 w-4"  ></i>
            <span className="flex-1 text-left">Search...</span>
            <kbd className="hidden rounded bg-zinc-800 px-1.5 py-0.5 text-[10px] font-medium text-zinc-400 sm:inline-block">⌘K</kbd>
          </button>

          <div className="hidden md:flex items-center gap-2">
            <Link href="/components?filter=favorites" aria-label="Favorites">
              <Button variant="ghost" size="icon" className="relative">
                <i className="fi fi-rr-bookmark h-5 w-5 text-zinc-400"  ></i>
                {favorites.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-accent text-[8px] font-bold text-white">
                    {favorites.length}
                  </span>
                )}
              </Button>
            </Link>
            <ThemeToggle />
            <a href="https://github.com/your-repo" target="_blank" rel="noreferrer" aria-label="GitHub">
              <Button variant="ghost" size="icon">
                <i className="fi fi-brands-github h-5 w-5 text-zinc-400"  ></i>
              </Button>
            </a>
          </div>

          <button
            className="md:hidden p-2 text-zinc-400 hover:text-white"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <i className="fi fi-rr-menu-burger h-6 w-6"  ></i>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] flex">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="relative ml-auto flex h-full w-3/4 max-w-sm flex-col bg-zinc-950 px-6 py-6 border-l border-zinc-800 shadow-xl slide-in-from-right">
            <div className="flex items-center justify-between mb-8">
              <span className="text-lg font-bold text-white">Menu</span>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-zinc-400 hover:text-white">
                <i className="fi fi-rr-cross h-6 w-6"  ></i>
              </button>
            </div>
            
            <div className="flex flex-col space-y-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-lg font-medium",
                    pathname.startsWith(link.href) ? "text-accent" : "text-zinc-400"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="mt-auto flex items-center justify-between pt-6 border-t border-zinc-800">
              <ThemeToggle />
              <Button variant="outline" className="flex-1 ml-4" onClick={() => setSearchOpen(true)}>
                <i className="fi fi-rr-search mr-2 h-4 w-4"  ></i> Search
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
