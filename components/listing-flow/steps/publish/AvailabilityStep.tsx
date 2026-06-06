'use client'

import { Check, X } from 'lucide-react'
import type { ListingFormData } from '@/lib/listing-flow/steps'

interface AvailabilityStepProps {
  formData: ListingFormData
  onChange: (data: Partial<ListingFormData>) => void
  disabled?: boolean
}

export function AvailabilityStep({ formData, onChange, disabled = false }: AvailabilityStepProps) {
  const isAvailable = formData.isAvailable ?? true

  return (
    <div className='max-w-2xl mx-auto py-8 px-4'>
      <h1 className='text-2xl md:text-3xl font-bold text-on-surface mb-2'>
        Set your availability
      </h1>
      <p className='text-on-surface-variant mb-8'>
        Control when your place is available for bookings
      </p>

      <div className='bg-white rounded-3xl border-2 border-outline-variant/30 p-8'>
        <div className='flex items-center justify-between mb-4'>
          <div>
            <h3 className='font-bold text-on-surface text-lg mb-1'>Currently {isAvailable ? 'Available' : 'Unavailable'}</h3>
            <p className='text-sm text-on-surface-variant'>
              {isAvailable
                ? 'Visible to students searching for accommodation'
                : 'Hidden from search results'}
            </p>
          </div>

          <button
            type='button'
            onClick={() => onChange({ isAvailable: !isAvailable })}
            disabled={disabled}
            className={`
              relative w-14 h-8 rounded-full transition-colors
              ${isAvailable ? 'bg-tertiary' : 'bg-outline-variant'}
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
          >
            <span
              className={`
                absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform
                ${isAvailable ? 'translate-x-7' : 'translate-x-1'}
              `}
            />
          </button>
        </div>

        {/* Status Indicators */}
        <div className='space-y-3 mt-6'>
          <div className={`flex items-start gap-3 p-4 rounded-xl ${isAvailable ? 'bg-tertiary/10' : 'bg-outline-variant/10'}`}>
            {isAvailable ? (
              <Check className='w-5 h-5 text-tertiary flex-shrink-0 mt-0.5' />
            ) : (
              <X className='w-5 h-5 text-on-surface-variant flex-shrink-0 mt-0.5' />
            )}
            <div>
              <p className='text-sm font-semibold text-on-surface mb-1'>
                {isAvailable ? 'Accepting Bookings' : 'Not Accepting Bookings'}
              </p>
              <p className='text-xs text-on-surface-variant'>
                {isAvailable
                  ? 'Students can find and book your place'
                  : "Your listing won't appear in search results"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
