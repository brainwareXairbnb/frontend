'use client'

import { useEffect } from 'react'
import { StatusBar, Style } from '@capacitor/status-bar'
import { Capacitor } from '@capacitor/core'

export function StatusBarConfig() {
  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      const configureBars = async () => {
        try {
          // Set status bar background to white
          await StatusBar.setBackgroundColor({ color: '#ffffff' })
          // Set status bar icons/text to dark (Style.Light)
          await StatusBar.setStyle({ style: Style.Light })
        } catch (error) {
          console.error('Failed to configure native status bar:', error)
        }
      }
      configureBars()
    }
  }, [])

  return null
}
