import React from 'react'

export interface DartpadEmbedProps {
  gistId?: string
  theme?: 'light' | 'dark'
  height?: number | string
  split?: number
}

export function DartpadEmbed({
  gistId = 'c026365b2149b514b8a211ba6f2eb5e2', // Example gist
  theme = 'dark',
  height = 600,
  split = 50,
}: DartpadEmbedProps) {
  return (
    <div
      className="w-full overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-surface)]"
      style={{ height }}
    >
      <iframe
        src={`https://dartpad.dev/embed-flutter.html?id=${gistId}&theme=${theme}&split=${split}`}
        style={{ width: '100%', height: '100%', border: 'none' }}
        title="DartPad Embed"
      />
    </div>
  )
}
