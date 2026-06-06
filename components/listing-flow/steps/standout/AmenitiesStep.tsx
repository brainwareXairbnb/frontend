'use client'

import { Wifi, Wind, Bath, ShowerHead, Car, Shield, Camera } from 'lucide-react'
import type { ListingFormData } from '@/lib/listing-flow/steps'

interface AmenitiesStepProps {
  formData: ListingFormData
  onChange: (data: Partial<ListingFormData>) => void
  disabled?: boolean
}

const AMENITIES = [
  { value: 'wifi', label: 'WiFi', icon: Wifi },
  { value: 'ac', label: 'Air Conditioning', icon: Wind },
  { value: 'Attached Bath', label: 'Attached Bathroom', icon: Bath },
  { value: 'Laundry', label: 'Laundry', icon: ShowerHead },
  { value: 'Parking', label: 'Parking', icon: Car },
  { value: 'Security', label: 'Security', icon: Shield },
  { value: 'CCTV', label: 'CCTV', icon: Camera },
]

export function AmenitiesStep({
  formData,
  onChange,
  disabled = false,
}: AmenitiesStepProps) {
  const toggleAmenity = (amenity: string) => {
    const current = formData.amenities || []
    const updated = current.includes(amenity)
      ? current.filter((a) => a !== amenity)
      : [...current, amenity]
    onChange({ amenities: updated })
  }

  return (
    <div className='max-w-2xl mx-auto py-8 px-4'>
      <h1 className='text-2xl md:text-3xl font-bold text-on-surface mb-2'>
        Tell guests what your place has to offer
      </h1>
      <p className='text-on-surface-variant mb-8'>
        You can add more amenities after you publish your listing
      </p>

      <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
        {AMENITIES.map((amenity) => {
          const Icon = amenity.icon
          const isSelected = (formData.amenities || []).includes(amenity.value)

          return (
            <button
              key={amenity.value}
              type='button'
              onClick={() => toggleAmenity(amenity.value)}
              disabled={disabled}
              className={`
                relative p-3 rounded-2xl border-2 transition-all text-center
                ${
                  isSelected
                    ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                    : 'border-outline-variant/30 hover:border-primary/50 bg-white'
                }
                disabled:opacity-50 disabled:cursor-not-allowed
              `}
            >
              {isSelected && (
                <div className='absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center'>
                  <svg
                    className='w-3 h-3 text-white'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={3}
                      d='M5 13l4 4L19 7'
                    />
                  </svg>
                </div>
              )}
              <Icon
                className={`w-8 h-8 mx-auto mb-2 ${isSelected ? 'text-primary' : 'text-on-surface-variant'}`}
              />
              <p
                className={`text-sm font-semibold ${isSelected ? 'text-primary' : 'text-on-surface'}`}
              >
                {amenity.label}
              </p>
            </button>
          )
        })}
      </div>
    </div>
  )
}
