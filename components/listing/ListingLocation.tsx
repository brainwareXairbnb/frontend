'use client'

import { MapPin } from 'lucide-react'

interface ListingLocationProps {
  lat?: number
  lng?: number
}

export function ListingLocation({ lat, lng }: ListingLocationProps) {
  return (
    <div className='pb-8 border-b border-outline-variant/20 mb-8'>
      <h3 className='text-[22px] font-semibold mb-4'>Location</h3>

      {lat && lng ? (
        <>
          <div className='w-full h-[300px] md:h-[400px] bg-surface-container rounded-2xl overflow-hidden relative border border-outline-variant/20 shadow-sm mb-3'>
            <a
              href={`https://www.google.com/maps?q=${lat},${lng}`}
              target='_blank'
              rel='noopener noreferrer'
              className='block w-full h-full relative'
            >
              <img
                src={`https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=16&size=600x400&scale=2&markers=color:red%7C${lat},${lng}&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8`}
                alt='Location map'
                className='w-full h-full object-cover'
                loading='lazy'
                onError={(e) => {
                  console.error('❌ Map load failed, using iframe fallback')
                  e.currentTarget.style.display = 'none'
                  const iframe = document.createElement('iframe')
                  iframe.src = `https://maps.google.com/maps?q=${lat},${lng}&z=16&output=embed`
                  iframe.className = 'w-full h-full border-0'
                  e.currentTarget.parentElement?.appendChild(iframe)
                }}
              />
              <div className='absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold text-on-surface shadow-sm'>
                📍 Click to open in Google Maps
              </div>
            </a>
          </div>
        </>
      ) : (
        <div className='w-full h-[300px] md:h-[400px] bg-surface-container rounded-2xl overflow-hidden relative border border-outline-variant/20 flex items-center justify-center'>
          <div className='text-center'>
            <MapPin className='w-12 h-12 mx-auto text-gray-300 mb-2' />
            <p className='text-on-surface-variant'>Map location not available</p>
          </div>
        </div>
      )}
    </div>
  )
}
