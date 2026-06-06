'use client'

import { useState } from 'react'
import { Wifi, Wind, Bath, ShowerHead, Car, Shield, Camera, Check } from 'lucide-react'

interface ListingAmenitiesProps {
  amenities?: string[]
}

function getAmenityConfig(amenityName: string) {
  const norm = amenityName.toLowerCase().trim()

  if (norm.includes('wifi') || norm.includes('wi-fi') || norm.includes('internet')) {
    return { label: 'WiFi', icon: Wifi }
  }
  if (norm.includes('ac') || norm.includes('air cond') || norm.includes('cooler')) {
    return { label: 'Air Conditioning', icon: Wind }
  }
  if (norm.includes('bath')) {
    return { label: 'Attached Bathroom', icon: Bath }
  }
  if (norm.includes('laundry') || norm.includes('wash')) {
    return { label: 'Laundry', icon: ShowerHead }
  }
  if (norm.includes('park')) {
    return { label: 'Parking', icon: Car }
  }
  if (norm.includes('secur')) {
    return { label: 'Security', icon: Shield }
  }
  if (norm.includes('cctv') || norm.includes('camera')) {
    return { label: 'CCTV Camera', icon: Camera }
  }

  const formattedLabel = amenityName.charAt(0).toUpperCase() + amenityName.slice(1)
  return { label: formattedLabel, icon: Check }
}

export function ListingAmenities({ amenities = [] }: ListingAmenitiesProps) {
  const [showAllAmenities, setShowAllAmenities] = useState(false)

  if (!amenities || amenities.length === 0) return null

  const displayedAmenities = showAllAmenities ? amenities : amenities.slice(0, 6)

  return (
    <div className='pb-8 border-b border-outline-variant/20 mb-8'>
      <h3 className='text-[22px] font-bold text-gray-950 mb-6'>What this place offers</h3>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-6'>
        {displayedAmenities.map((a: string, i: number) => {
          const config = getAmenityConfig(a)
          const IconComponent = config.icon
          return (
            <div key={i} className='flex gap-4 items-center py-0.5'>
              <IconComponent className='w-6 h-6 text-gray-700 stroke-[1.75]' />
              <span className='text-[15px] md:text-base text-gray-800 font-medium'>
                {config.label}
              </span>
            </div>
          )
        })}
      </div>
      {amenities.length > 6 && (
        <button
          onClick={() => setShowAllAmenities(!showAllAmenities)}
          className='mt-8 px-6 py-3 border border-gray-900 rounded-xl font-bold text-sm hover:bg-gray-50 active:scale-98 transition-all'
        >
          {showAllAmenities ? 'Show fewer' : `Show all ${amenities.length} amenities`}
        </button>
      )}
    </div>
  )
}

