'use client'
import React from 'react'
import { CodeBlock } from '../ui/CodeBlock'
import { Button } from '../ui/Button'


export function FlutterEditor({ code }: { code: string }) {
  const handleOpenDartPad = () => {
    const url = `https://dartpad.dev/?code=${encodeURIComponent(code)}`
    window.open(url, '_blank')
  }

  return (
    <div className="w-full h-full flex flex-col bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
      <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 flex justify-between items-center">
        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Flutter requires DartPad or local environment to run.</span>
        <Button onClick={handleOpenDartPad} size="sm" rightIcon={<i className="fi fi-rr-arrow-up-right w-3 h-3"  ></i>}>
          Open in DartPad
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto">
        <CodeBlock code={code} language="dart" className="border-none rounded-none h-full" />
      </div>
    </div>
  )
}
