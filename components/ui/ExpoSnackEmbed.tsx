import React from 'react'

export interface ExpoSnackEmbedProps {
  snackId: string
  height?: number | string
  platform?: 'web' | 'android' | 'ios'
  theme?: 'light' | 'dark'
}

export function ExpoSnackEmbed({
  snackId,
  height = 600,
  platform = 'web',
  theme = 'dark',
}: ExpoSnackEmbedProps) {
  return (
    <div
      className="w-full overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-surface)]"
      style={{ height }}
    >
      <iframe
        src={`https://snack.expo.dev/embed/${snackId}?platform=${platform}&theme=${theme}`}
        style={{ width: '100%', height: '100%', border: 'none' }}
        allow="geolocation; camera; microphone"
        title="Expo Snack Embed"
      />
    </div>
  )
}
