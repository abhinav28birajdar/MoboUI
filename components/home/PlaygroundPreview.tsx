import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '../ui/Button'
import { SectionLabel } from '../ui/SectionLabel'
import { EmulatorFrame } from '../ui/EmulatorFrame'

export function PlaygroundPreview() {
  return (
    <section className="py-24 bg-zinc-900/30 border-y border-zinc-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10" />
      
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionLabel className="mb-4 inline-block">LIVE EDITOR</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Tweak it in the browser</h2>
            <p className="text-lg text-zinc-400 mb-8">
              Don't want to spin up a simulator? Use our integrated live playground powered by Expo Snack and DartPad to test components instantly.
            </p>
            <Link href="/playground">
              <Button size="lg" rightIcon={<ArrowRight className="w-4 h-4"/>}>
                Open Full Playground
              </Button>
            </Link>
          </div>
          
          <div className="flex justify-center lg:justify-end relative">
            <EmulatorFrame className="scale-90 md:scale-100 origin-center lg:origin-right transform transition-transform hover:scale-105 duration-500">
              <div className="h-full w-full flex items-center justify-center bg-zinc-900 flex-col gap-4">
                 <div className="w-16 h-16 bg-accent rounded-full animate-bounce" />
                 <span className="text-zinc-500 font-medium">Live Preview</span>
              </div>
            </EmulatorFrame>
          </div>
        </div>
      </div>
    </section>
  )
}
