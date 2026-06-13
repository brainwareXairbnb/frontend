'use client'

import { Info, Clock, Users, BedDouble, Home } from 'lucide-react'

interface ImportantInfoProps {
  roomType?: string
  genderPref?: string
  totalBeds?: number
  totalBedrooms?: number
  totalBathrooms?: number
  availableBeds?: number
  furnishing?: string
}

export function ImportantInfo({
  roomType,
  genderPref,
  totalBeds,
  totalBedrooms,
  totalBathrooms,
  availableBeds,
  furnishing,
}: ImportantInfoProps) {
  const infoItems = []

  // Check-in/Check-out
  infoItems.push({
    icon: Clock,
    title: 'Check-in / Check-out',
    items: ['Check-in: After 12:00 PM', 'Check-out: Before 11:00 AM', 'Flexible timings available on request'],
  })

  // Room Configuration
  const roomConfig = []
  if (totalBedrooms) roomConfig.push(`${totalBedrooms} ${totalBedrooms === 1 ? 'Bedroom' : 'Bedrooms'}`)
  if (totalBeds) roomConfig.push(`${totalBeds} ${totalBeds === 1 ? 'Bed' : 'Beds'}`)
  if (totalBathrooms) roomConfig.push(`${totalBathrooms} ${totalBathrooms === 1 ? 'Bathroom' : 'Bathrooms'}`)

  if (roomConfig.length > 0) {
    infoItems.push({
      icon: BedDouble,
      title: 'Room Configuration',
      items: [
        roomConfig.join(' • '),
        furnishing ? `${furnishing} accommodation` : 'Basic furnishing provided',
        availableBeds !== undefined ? `${availableBeds} ${availableBeds === 1 ? 'bed' : 'beds'} currently available` : '',
      ].filter(Boolean),
    })
  }

  // Occupancy Rules
  const occupancyRules = []
  if (genderPref && genderPref !== 'any') {
    const genderMap: Record<string, string> = {
      boys: 'Boys only',
      girls: 'Girls only',
      coed: 'Co-ed (mixed gender allowed)',
    }
    occupancyRules.push(genderMap[genderPref] || genderPref)
  } else {
    occupancyRules.push('Open to all genders')
  }

  if (roomType) {
    const typeMap: Record<string, string> = {
      single: 'Single occupancy room',
      double: 'Double sharing room',
      shared: 'Shared accommodation',
      triple: 'Triple sharing room',
      dormitory: 'Dormitory style',
      flat: 'Entire flat',
      pg: 'Paying guest accommodation',
    }
    occupancyRules.push(typeMap[roomType.toLowerCase()] || roomType)
  }
  occupancyRules.push('Students and working professionals welcome')

  if (occupancyRules.length > 0) {
    infoItems.push({
      icon: Users,
      title: 'Occupancy Guidelines',
      items: occupancyRules,
    })
  }

  // House Policies
  infoItems.push({
    icon: Home,
    title: 'House Policies',
    items: [
      'Advance notice required for guests',
      'Maintain cleanliness and hygiene',
      'Report maintenance issues promptly',
      'Respect quiet hours (10 PM - 7 AM)',
    ],
  })

  return (
    <div className='pb-8 border-b border-outline-variant/20 mb-8'>
      <h3 className='text-[22px] font-bold text-on-surface mb-6'>Important Information</h3>
      <div className='space-y-6'>
        {infoItems.map((item, index) => {
          const Icon = item.icon
          return (
            <div key={index} className='flex gap-4'>
              <div className='w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0'>
                <Icon className='w-5 h-5 text-primary' />
              </div>
              <div className='flex-1'>
                <h4 className='font-bold text-on-surface text-base mb-3'>{item.title}</h4>
                <ul className='space-y-2'>
                  {item.items.map((text, idx) => (
                    <li key={idx} className='flex items-start gap-2 text-sm text-on-surface-variant'>
                      <span className='w-1.5 h-1.5 rounded-full bg-primary/60 mt-1.5 shrink-0' />
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )
        })}
      </div>

      {/* Disclaimer */}
      <div className='mt-6 p-4 bg-surface-container/50 rounded-lg border border-outline-variant/10 flex gap-3'>
        <Info className='w-5 h-5 text-primary shrink-0 mt-0.5' />
        <div>
          <p className='text-xs font-semibold text-on-surface mb-1'>Please Note</p>
          <p className='text-xs text-on-surface-variant leading-relaxed'>
            All information is provided by the property owner. Please verify details during your visit.
            Contact the owner directly for any specific requirements or clarifications.
          </p>
        </div>
      </div>
    </div>
  )
}
