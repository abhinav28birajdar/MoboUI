import React from 'react'
import Link from 'next/link'
import { Button } from '../ui/Button'


export function CTASection() {
  return (
    <section className="py-32 bg-zinc-950 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-accent/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="mx-auto max-w-4xl px-6 text-center relative z-10">
        <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">Start building today.</h2>
        <p className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto">Free, open source, and ready for production. Stop writing boilerplate and start shipping.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/components">
            <Button size="lg" className="w-full sm:w-auto" rightIcon={<i className="fi fi-rr-arrow-right w-4 h-4" ></i>}>
              Browse Components
            </Button>
          </Link>
          <a href="https://github.com" target="_blank" rel="noreferrer">
            <Button variant="outline" size="lg" className="w-full sm:w-auto" leftIcon={<i className="fi fi-brands-github w-4 h-4" ></i>}>
              View on GitHub
            </Button>
          </a>
        </div>
      </div>
    </section>
  )
}
