'use client'

import React, { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import { toast } from 'sonner'
import { cn } from '@/lib/utils'

interface CodeBlockProps {
  code: string
  language?: string
  className?: string
  showLineNumbers?: boolean
}

export function CodeBlock({ code, language = 'tsx', className, showLineNumbers = true }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    setCopied(true)
    toast.success('Copied to clipboard!')
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={cn("relative group rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950", className)}>
      <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
        <CopyToClipboard text={code} onCopy={handleCopy}>
          <button
            className="p-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg transition-colors border border-zinc-700"
            aria-label="Copy code"
          >
            {copied ? <i className="fi fi-rr-check w-4 h-4 text-success"  ></i> : <i className="fi fi-rr-copy w-4 h-4"  ></i>}
          </button>
        </CopyToClipboard>
      </div>
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          padding: '1.5rem',
          background: 'transparent',
          fontSize: '14px',
          fontFamily: 'var(--font-jetbrains-mono)',
        }}
        showLineNumbers={showLineNumbers}
        lineNumberStyle={{ minWidth: '3em', paddingRight: '1em', color: '#71717a', textAlign: 'right' }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  )
}
