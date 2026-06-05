'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { App } from '@capacitor/app'
import { Capacitor } from '@capacitor/core'

export function DeepLinkHandler() {
  const router = useRouter()

  useEffect(() => {
    if (!Capacitor.isNativePlatform()) {
      return
    }

    let listenerHandle: any

    const setupListener = async () => {
      listenerHandle = await App.addListener('appUrlOpen', (event) => {
        try {
          // Example event.url: "https://brainxx.vercel.app/rooms/details?id=123"
          const parsedUrl = new URL(event.url)
          
          // Extract the path and query parameters (e.g. /rooms/details?id=123)
          const path = parsedUrl.pathname + parsedUrl.search
          
          // Route inside the Next.js application
          router.push(path)
        } catch (error) {
          console.error('Error handling deep link:', error)
        }
      })
    }

    setupListener()

    return () => {
      if (listenerHandle) {
        listenerHandle.remove()
      }
    }
  }, [router])

  return null
}
