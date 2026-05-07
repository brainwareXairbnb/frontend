'use client'

import { useEffect, useState } from 'react'
import { SplashScreen } from '@/components/SplashScreen'

interface AppInitializerProps {
  children: React.ReactNode
}

export function AppInitializer({ children }: AppInitializerProps) {
  const [showSplash, setShowSplash] = useState(true)
  const [isFirstLoad, setIsFirstLoad] = useState(true)

  useEffect(() => {
    // Check if this is the first load
    const hasLoadedBefore = sessionStorage.getItem('app-loaded')

    if (hasLoadedBefore) {
      // Already loaded in this session, don't show splash
      setShowSplash(false)
      setIsFirstLoad(false)
    } else {
      // First load in this session, show splash
      sessionStorage.setItem('app-loaded', 'true')
    }
  }, [])

  const handleSplashComplete = () => {
    setShowSplash(false)
  }

  if (isFirstLoad && showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} minDuration={2000} />
  }

  return <>{children}</>
}
