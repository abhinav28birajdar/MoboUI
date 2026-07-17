import React from 'react'
import Link from 'next/link'
import { FrameworkBadge } from '../ui/FrameworkBadge'

export function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 22H22L12 2Z" fill="#c026d3" />
              </svg>
              <span className="text-xl font-bold tracking-tight text-white">MOBOUI</span>
            </Link>
            <p className="text-sm text-zinc-400 mb-6">
              Build beautiful mobile apps, faster.
            </p>
            <div className="flex gap-4">
              <FrameworkBadge framework="flutter" showLabel={false} />
              <FrameworkBadge framework="react-native" showLabel={false} />
              <FrameworkBadge framework="expo" showLabel={false} />
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-3">
              <li><Link href="/components" className="text-sm text-zinc-400 hover:text-accent transition-colors">Components</Link></li>
              <li><Link href="/playground" className="text-sm text-zinc-400 hover:text-accent transition-colors">Playground</Link></li>
              <li><Link href="/community" className="text-sm text-zinc-400 hover:text-accent transition-colors">Community</Link></li>
              <li><Link href="/blog" className="text-sm text-zinc-400 hover:text-accent transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-3">
              <li><a href="https://github.com/abhinav28birajdar" target="_blank" rel="noreferrer" className="text-sm text-zinc-400 hover:text-accent transition-colors flex items-center gap-2"><i className="fi fi-brands-github mt-1"></i> GitHub</a></li>
              <li><a href="https://twitter.com/abhi28birajdar" target="_blank" rel="noreferrer" className="text-sm text-zinc-400 hover:text-accent transition-colors flex items-center gap-2"><i className="fi fi-brands-twitter-alt mt-1"></i> X (Twitter)</a></li>
              <li><a href="https://instagram.com/abhinav28birajdar" target="_blank" rel="noreferrer" className="text-sm text-zinc-400 hover:text-accent transition-colors flex items-center gap-2"><i className="fi fi-brands-instagram mt-1"></i> Instagram</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-sm text-zinc-400 hover:text-accent transition-colors">Privacy Policy</Link></li>
              <li><Link href="/about" className="text-sm text-zinc-400 hover:text-accent transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-zinc-900">
          <p className="text-xs text-zinc-500 flex items-center gap-1">
            moboui build by abhinav birajdar <i className="fi fi-rr-globe mt-1"></i>
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <span className="text-xs text-zinc-500">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
