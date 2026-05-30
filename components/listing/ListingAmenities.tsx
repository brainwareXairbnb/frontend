'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'

interface ListingAmenitiesProps {
  amenities?: string[]
}

export function ListingAmenities({ amenities = [] }: ListingAmenitiesProps) {
  const [showAllAmenities, setShowAllAmenities] = useState(false)

  if (!amenities || amenities.length === 0) return null

  return (
    <div className='pb-8 border-b border-outline-variant/20 mb-8'>
      <h3 className='text-[22px] font-semibold mb-6'>What this place offers</h3>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-y-4'>
        {(showAllAmenities ? amenities : amenities?.slice(0, 6))?.map(
          (a: string, i: number) => (
            <div key={i} className='flex gap-4 items-center'>
              <Check className='w-6 h-6 opacity-60' />
              <span className='text-[15px] md:text-base'>{a}</span>
            </div>
          ),
        )}
      </div>
      {amenities?.length > 6 && (
        <button
          onClick={() => setShowAllAmenities(!showAllAmenities)}
          className='mt-8 px-6 py-3 border border-black rounded-lg font-semibold hover:bg-gray-50'
        >
          {showAllAmenities
            ? 'Show fewer'
            : `Show all ${amenities.length} amenities`}
        </button>
      )}
    </div>
  )
}
