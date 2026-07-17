'use client'
import React, { useState } from 'react'
import { ComponentDefinition } from '@/types'
import { CodeBlock } from '../ui/CodeBlock'
import { FrameworkBadge } from '../ui/FrameworkBadge'
import { Button } from '../ui/Button'


export function CodeTabs({ component }: { component: ComponentDefinition }) {
  const [activeTab, setActiveTab] = useState<string>(component.frameworks[0] || 'flutter')

  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden">
      <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 px-4">
        <div className="flex gap-2">
          {component.frameworks.map(fw => (
            <button
              key={fw}
              onClick={() => setActiveTab(fw)}
              className={`flex items-center gap-2 px-4 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === fw ? 'border-accent text-zinc-900 dark:text-white' : 'border-transparent text-zinc-600 dark:text-zinc-400 hover:text-zinc-200 hover:bg-zinc-50 dark:bg-zinc-900/50'
              }`}
            >
              <FrameworkBadge framework={fw} showLabel={false} />
              <span className="capitalize">{fw.replace('-', ' ')}</span>
            </button>
          ))}
        </div>
        
        {activeTab === 'expo' && (
          <Button variant="ghost" size="sm" className="hidden sm:flex text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:text-white" asChild>
             <a href={`https://snack.expo.dev/?code=${encodeURIComponent(component.code.expo || '')}`} target="_blank" rel="noreferrer">
               Open in Expo Snack <i className="fi fi-rr-arrow-up-right ml-2 w-3 h-3"  ></i>
             </a>
          </Button>
        )}
        {activeTab === 'flutter' && (
          <Button variant="ghost" size="sm" className="hidden sm:flex text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:text-white" asChild>
             <a href={`https://dartpad.dev/?code=${encodeURIComponent(component.code.flutter || '')}`} target="_blank" rel="noreferrer">
               Open in DartPad <i className="fi fi-rr-arrow-up-right ml-2 w-3 h-3"  ></i>
             </a>
          </Button>
        )}
      </div>

      <div className="bg-white dark:bg-zinc-950">
         {activeTab === 'flutter' && component.code.flutter && (
           <CodeBlock code={component.code.flutter} language="dart" className="border-0 rounded-none" />
         )}
         {activeTab === 'react-native' && component.code.reactNative && (
           <CodeBlock code={component.code.reactNative} language="tsx" className="border-0 rounded-none" />
         )}
         {activeTab === 'expo' && component.code.expo && (
           <CodeBlock code={component.code.expo} language="tsx" className="border-0 rounded-none" />
         )}
      </div>
    </div>
  )
}
