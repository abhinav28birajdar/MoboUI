'use client'
import React, { useState, useEffect } from 'react'
import { Skeleton } from '../ui/Skeleton'

const BASE_SNACK_URL = 'https://snack.expo.dev/embedded'

export function ExpoSnackEmbed({ code, platform = 'web' }: { code: string, platform?: 'ios' | 'android' | 'web' }) {
  const [loading, setLoading] = useState(true)
  const [url, setUrl] = useState('')

  useEffect(() => {
    setLoading(true)
    const params = new URLSearchParams({
      code,
      platform,
      name: 'MOBOUI Preview',
      description: 'Component preview from MOBOUI',
      theme: 'dark',
      preview: 'true',
      supportedPlatforms: 'ios,android,web',
    })
    setUrl(`${BASE_SNACK_URL}?${params.toString()}`)
  }, [code, platform])

  return (
    <div className="w-full h-full relative rounded-2xl overflow-hidden bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
      {loading && (
        <div className="absolute inset-0 flex flex-col p-4 z-10 bg-white dark:bg-zinc-950">
          <Skeleton className="w-full h-12 mb-4" />
          <Skeleton className="w-full h-full flex-1" />
        </div>
      )}
      {url && (
        <iframe 
          src={url}
          className="w-full h-full border-none outline-none z-20 relative"
          loading="lazy"
          onLoad={() => setLoading(false)}
          allow="geolocation; camera; microphone"
        />
      )}
    </div>
  )
}
