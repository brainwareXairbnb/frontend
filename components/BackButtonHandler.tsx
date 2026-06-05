'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { App } from '@capacitor/app'
import { Capacitor } from '@capacitor/core'

export function BackButtonHandler() {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Only set up back button handler on native platforms
    if (!Capacitor.isNativePlatform()) {
      return
    }

    // Define routes where back button should exit the app
    const exitRoutes = ['/', '/login', '/register']

    let listenerHandle: any

    // Set up the listener
    const setupListener = async () => {
      listenerHandle = await App.addListener('backButton', (event) => {
        // Check if we're on a root/exit route
        const isExitRoute = exitRoutes.includes(pathname)

        if (isExitRoute) {
          // On exit routes, show exit confirmation or exit app
          if (event.canGoBack) {
            // If there's browser history, go back
            router.back()
          } else {
            // No history, exit the app
            App.exitApp()
          }
        } else {
          // On other routes, navigate back
          router.back()
        }
      })
    }

    setupListener()

    // Cleanup listener on unmount
    return () => {
      if (listenerHandle) {
        listenerHandle.remove()
      }
    }
  }, [pathname, router])

  return null
}
