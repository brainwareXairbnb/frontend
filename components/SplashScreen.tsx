'use client'

import { useEffect, useState } from 'react'
import { AirbnbLoader } from '@/components/ui/spinner'

interface SplashScreenProps {
  onComplete?: () => void
  minDuration?: number
}

export function SplashScreen({
  onComplete,
  minDuration = 1500,
}: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      onComplete?.()
    }, minDuration)

    return () => clearTimeout(timer)
  }, [minDuration, onComplete])

  if (!isVisible) return null

  return (
    <div className='fixed inset-0 z-[9999] bg-white flex items-center justify-center'>
      {/* Animated Background */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-[#FF385C]/5 to-[#E31C5F]/5 rounded-full blur-3xl animate-pulse' />
        <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-[#E31C5F]/5 to-[#FF385C]/5 rounded-full blur-3xl animate-pulse [animation-delay:1s]' />
      </div>

      {/* Loader */}
      <div className='relative z-10'>
        <AirbnbLoader />
      </div>
    </div>
  )
}
