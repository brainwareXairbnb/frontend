'use client'

import {
  Shield,
  Wifi,
  Zap,
  Home,
  Users,
  Calendar,
  MapPin,
  Star,
} from 'lucide-react'

interface PropertyHighlightsProps {
  amenities?: string[]
  genderPref?: string
  availableFrom?: string
  distanceFromCampus?: string
  furnishing?: string
  isAvailable?: boolean
}

export function PropertyHighlights({
  amenities = [],
  genderPref,
  availableFrom,
  distanceFromCampus,
  furnishing,
  isAvailable = true,
}: PropertyHighlightsProps) {
  const highlights = []

  // Furnishing highlight
  if (furnishing && furnishing !== 'Unfurnished') {
    highlights.push({
      icon: Home,
      title: furnishing,
      description: 'Ready to move in with all essential furniture',
    })
  }

  // WiFi highlight
  if (amenities.includes('wifi')) {
    highlights.push({
      icon: Wifi,
      title: 'High-Speed WiFi',
      description: 'Fast internet connection included',
    })
  }

  // Security highlight
  if (amenities.includes('Security') || amenities.includes('CCTV')) {
    highlights.push({
      icon: Shield,
      title: '24/7 Security',
      description: 'CCTV surveillance and security personnel',
    })
  }

  // Gender preference highlight
  if (genderPref && genderPref !== 'any') {
    const genderMap: Record<string, string> = {
      boys: 'Boys Only',
      girls: 'Girls Only',
      coed: 'Co-ed Living',
    }
    highlights.push({
      icon: Users,
      title: genderMap[genderPref] || genderPref,
      description: `Exclusively for ${genderPref === 'coed' ? 'mixed groups' : genderPref}`,
    })
  }

  // Availability highlight
  if (isAvailable && availableFrom) {
    const date = new Date(availableFrom)
    const isPast = date <= new Date()
    highlights.push({
      icon: Calendar,
      title: isPast
        ? 'Available Now'
        : `Available from ${date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}`,
      description: isPast
        ? 'Move in immediately'
        : 'Book now for future move-in',
    })
  } else if (isAvailable) {
    highlights.push({
      icon: Calendar,
      title: 'Available Immediately',
      description: 'Ready for immediate occupancy',
    })
  }

  // Distance highlight
  if (distanceFromCampus) {
    highlights.push({
      icon: MapPin,
      title: 'Close to Campus',
      description: distanceFromCampus,
    })
  }

  // Power backup
  if (amenities.includes('geyser') || amenities.includes('ac')) {
    highlights.push({
      icon: Zap,
      title: 'Modern Amenities',
      description: 'AC, geyser, and power backup available',
    })
  }

  if (highlights.length === 0) return null

  return (
    <div className='pb-8 border-b border-outline-variant/20 mb-8'>
      <h3 className='text-[22px] font-bold text-on-surface mb-6'>
        Property Highlights
      </h3>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {highlights.map((highlight, index) => {
          const Icon = highlight.icon
          return (
            <div
              key={index}
              className='flex items-start gap-4 p-4 rounded-xl border border-outline-variant/20 bg-surface-container/30 hover:bg-surface-container/50 transition-colors'
            >
              <div className='w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0'>
                <Icon className='w-5 h-5 text-primary' />
              </div>
              <div className='flex-1 min-w-0'>
                <h4 className='font-bold text-on-surface text-sm mb-0.5'>
                  {highlight.title}
                </h4>
                <p className='text-xs text-on-surface-variant leading-relaxed'>
                  {highlight.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
