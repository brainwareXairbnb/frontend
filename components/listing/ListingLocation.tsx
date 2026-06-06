'use client'

import { MapPin } from 'lucide-react'

interface ListingLocationProps {
  lat?: number
  lng?: number
}

export function ListingLocation({ lat, lng }: ListingLocationProps) {
  return (
    <div className='pb-8 border-b border-outline-variant/20 mb-8'>
      <h3 className='text-[22px] font-bold text-gray-950 mb-4'>Location</h3>

      {lat && lng ? (
        <>
          <div className='w-full h-[450px] md:h-[550px] bg-surface-container rounded-3xl overflow-hidden relative border border-outline-variant/20 shadow-sm mb-3'>
            <a
              href={`https://www.google.com/maps?q=${lat},${lng}`}
              target='_blank'
              rel='noopener noreferrer'
              className='block w-full h-full relative'
            >
              <img
                src={`https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=16&size=650x550&scale=2&markers=color:red%7C${lat},${lng}&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8`}
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
              <div className='absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-xl text-xs font-bold text-on-surface shadow-md border border-gray-100'>
                📍 Click to open in Google Maps
              </div>
            </a>
          </div>
        </>
      ) : (
        <div className='w-full h-[450px] md:h-[550px] bg-surface-container rounded-3xl overflow-hidden relative border border-outline-variant/20 flex items-center justify-center'>
          <div className='text-center'>
            <MapPin className='w-12 h-12 mx-auto text-gray-300 mb-2' />
            <p className='text-on-surface-variant'>Map location not available</p>
          </div>
        </div>
      )}
    </div>
  )
}
