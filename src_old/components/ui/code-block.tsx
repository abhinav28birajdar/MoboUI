'use client';

import * as React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { CopyButton } from './copy-button';
import { Sparkles, Terminal } from 'lucide-react';

// Custom dark theme styling matching fuchsia #0f0f14 / #1a1a24
const brandCodeTheme: Record<string, any> = {
  'code[class*="language-"]': {
    color: '#FAFAFA',
    fontFamily: 'var(--font-code), monospace',
    fontSize: '13px',
    textShadow: 'none',
    textAlign: 'left',
    whiteSpace: 'pre',
    wordSpacing: 'normal',
    wordBreak: 'normal',
    wordWrap: 'normal',
    lineHeight: '1.6',
    tabSize: '2',
    hyphens: 'none',
  },
  'pre[class*="language-"]': {
    color: '#FAFAFA',
    fontFamily: 'var(--font-code), monospace',
    fontSize: '13px',
    textShadow: 'none',
    textAlign: 'left',
    whiteSpace: 'pre',
    wordSpacing: 'normal',
    wordBreak: 'normal',
    wordWrap: 'normal',
    lineHeight: '1.6',
    tabSize: '2',
    hyphens: 'none',
    padding: '1.25rem',
    margin: '0',
    overflow: 'auto',
    background: '#0f0f14',
  },
  keyword: { color: '#c026d3', fontWeight: 'bold' },
  builtin: { color: '#e2777a' },
  className: { color: '#c026d3' },
  function: { color: '#c026d3' },
  string: { color: '#a1a1aa' },
  comment: { color: '#71717a', fontStyle: 'italic' },
  operator: { color: '#f8f8f2' },
  number: { color: '#ae81ff' },
  boolean: { color: '#ae81ff' },
};

interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  filename?: string;
}

export function CodeBlock({
  code,
  language = 'typescript',
  showLineNumbers = true,
  filename,
}: CodeBlockProps) {
  const getIcon = () => {
    switch (language.toLowerCase()) {
      case 'dart':
      case 'flutter':
        return <Sparkles className="h-4 w-4 text-sky-400" />;
      case 'typescript':
      case 'javascript':
      case 'tsx':
      case 'jsx':
        return <Terminal className="h-4 w-4 text-blue-400" />;
      case 'html':
      case 'xml':
        return <Terminal className="h-4 w-4 text-orange-400" />;
      default:
        return <Terminal className="h-4 w-4 text-fuchsia-600" />;
    }
  };

  return (
    <div className="relative rounded-xl border border-[#2a2a38] bg-[#0f0f14] overflow-hidden group">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#2a2a38] bg-[#1a1a24]/50">
        <div className="flex items-center gap-2">
          {getIcon()}
          {filename && <span className="text-xs font-mono text-slate-400">{filename}</span>}
        </div>
        <CopyButton value={code} />
      </div>

      {/* Code contents */}
      <div className="overflow-x-auto text-left">
        <SyntaxHighlighter
          language={language}
          style={brandCodeTheme}
          showLineNumbers={showLineNumbers}
          lineNumberStyle={{ color: '#52525b', minWidth: '2em', paddingRight: '1em', textAlign: 'right', userSelect: 'none' }}
          customStyle={{ margin: 0, padding: '1rem', background: '#0f0f14' }}
        >
          {code.trim()}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
