'use client'
import React, { useState } from 'react'
import { EmulatorFrame } from '../ui/EmulatorFrame'
import { Button } from '../ui/Button'
import { ComponentDefinition } from '@/types'
import { Monitor, Smartphone, Moon, Sun } from 'lucide-react'

export function ComponentPreview({ component }: { component: ComponentDefinition }) {
  const [device, setDevice] = useState<'iphone' | 'android'>('iphone')
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 md:p-12 flex flex-col">
      <div className="flex justify-end gap-2 mb-8">
        <div className="flex bg-zinc-900 rounded-lg p-1 border border-zinc-800">
          <Button variant="ghost" size="sm" className={`h-8 w-8 p-0 rounded-md ${device === 'iphone' ? 'bg-zinc-800' : ''}`} onClick={() => setDevice('iphone')}>
            <Smartphone className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className={`h-8 w-8 p-0 rounded-md ${device === 'android' ? 'bg-zinc-800' : ''}`} onClick={() => setDevice('android')}>
            <Monitor className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex bg-zinc-900 rounded-lg p-1 border border-zinc-800">
          <Button variant="ghost" size="sm" className={`h-8 w-8 p-0 rounded-md ${theme === 'dark' ? 'bg-zinc-800' : ''}`} onClick={() => setTheme('dark')}>
            <Moon className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className={`h-8 w-8 p-0 rounded-md ${theme === 'light' ? 'bg-zinc-800' : ''}`} onClick={() => setTheme('light')}>
            <Sun className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      <div className="flex justify-center py-4 relative">
         {/* Simple subtle background grid behind the emulator */}
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] -z-10" />
         
         <EmulatorFrame device={device} theme={theme} className="shadow-2xl">
           <div className="h-full w-full flex items-center justify-center flex-col">
              <span className="text-sm font-medium text-zinc-500 mb-2">Live {component.name}</span>
              <div className="p-4 bg-accent/20 rounded-xl border border-accent/30 text-accent font-bold text-center">
                 Rendered Component
              </div>
           </div>
         </EmulatorFrame>
      </div>
    </div>
  )
}
