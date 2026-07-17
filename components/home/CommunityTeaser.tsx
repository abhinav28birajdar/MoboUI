import React from 'react'
import Link from 'next/link'
import { Card, CardContent } from '../ui/Card'
import { SectionLabel } from '../ui/SectionLabel'
import { Button } from '../ui/Button'


export function CommunityTeaser() {
  return (
    <section className="py-24 bg-zinc-950">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Cell 1 */}
          <Card className="bg-zinc-900 md:col-span-1 border-zinc-800 p-8 flex flex-col justify-center">
            <SectionLabel className="mb-4 inline-block">COMMUNITY</SectionLabel>
            <h3 className="text-3xl font-bold text-white mb-4">Join 2,000+ developers</h3>
            <p className="text-zinc-400 mb-8">Connect with other mobile developers, share your creations, and get help with MOBOUI components.</p>
            <Button className="w-fit bg-[#5865F2] hover:bg-[#4752C4] text-white border-none">
              Join Discord Server
            </Button>
          </Card>
          
          {/* Cell 4 */}
          <Card className="bg-zinc-900 md:col-span-1 border-zinc-800 p-8 flex flex-col justify-center items-center text-center">
            <i className="fi fi-brands-github w-12 h-12 text-white mb-4"  ></i>
            <h3 className="text-2xl font-bold text-white mb-2">Open Source</h3>
            <p className="text-zinc-400 mb-6">Proudly open source and community driven.</p>
            <div className="flex gap-6">
              <div className="text-center">
                 <div className="text-2xl font-bold text-white">1.2k</div>
                 <div className="text-xs text-zinc-500 uppercase">Stars</div>
              </div>
              <div className="text-center">
                 <div className="text-2xl font-bold text-white">142</div>
                 <div className="text-xs text-zinc-500 uppercase">Forks</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
