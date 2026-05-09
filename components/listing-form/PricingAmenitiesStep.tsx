'use client'

import { IndianRupee, CheckCircle, Power } from 'lucide-react'
import { Listing } from '@/lib/types'

interface PricingData {
  rent: string
  deposit: string
}

interface AmenitiesData {
  amenities: string[]
}

interface AvailabilityData {
  isAvailable: boolean
}

interface PricingAmenitiesStepProps {
  pricing: PricingData
  amenitiesData: AmenitiesData
  availability?: AvailabilityData
  onPricingChange: (pricing: Partial<PricingData>) => void
  onAmenitiesChange: (amenities: string[]) => void
  onAvailabilityChange?: (isAvailable: boolean) => void
  disabled?: boolean
  editingListing?: Listing | null
}

const AMENITIES_LIST = [
  'wifi',
  'ac',
  'Attached Bath',
  'Laundry',
  'Parking',
  'Security',
  'CCTV',
]

export function PricingAmenitiesStep({
  pricing,
  amenitiesData,
  availability,
  onPricingChange,
  onAmenitiesChange,
  onAvailabilityChange,
  disabled = false,
  editingListing,
}: PricingAmenitiesStepProps) {
  const toggleAmenity = (amenity: string) => {
    const newAmenities = amenitiesData.amenities.includes(amenity)
      ? amenitiesData.amenities.filter((a) => a !== amenity)
      : [...amenitiesData.amenities, amenity]
    onAmenitiesChange(newAmenities)
  }

  return (
    <>
      {/* Pricing Section */}
      <section className='space-y-4'>
        <div className='flex items-center gap-3 mb-4'>
          <div className='w-8 h-8 bg-emerald-500/10 rounded-lg flex items-center justify-center'>
            <IndianRupee className='w-4 h-4 text-emerald-600' />
          </div>
          <h3 className='text-base font-bold text-on-surface'>Pricing</h3>
        </div>

        <div className='grid grid-cols-2 gap-4'>
          <div className='space-y-2'>
            <label className='text-xs font-semibold text-on-surface-variant tracking-wider'>
              Monthly Rent *
            </label>
            <div className='relative'>
              <span className='absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-on-surface-variant'>
                ₹
              </span>
              <input
                required
                value={pricing.rent}
                disabled={disabled}
                onChange={(e) => onPricingChange({ rent: e.target.value })}
                className='w-full h-12 bg-surface-container border border-outline-variant/20 rounded pl-8 pr-4 text-sm text-on-surface focus:border-primary focus:bg-white outline-none transition-all disabled:opacity-60 disabled:cursor-not-allowed'
                placeholder='0'
                type='number'
                min='0'
              />
            </div>
          </div>

          <div className='space-y-2'>
            <label className='text-xs font-semibold text-on-surface-variant tracking-wider'>
              Security Deposit
            </label>
            <div className='relative'>
              <span className='absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-on-surface-variant'>
                ₹
              </span>
              <input
                value={pricing.deposit}
                disabled={disabled}
                onChange={(e) => onPricingChange({ deposit: e.target.value })}
                className='w-full h-12 bg-surface-container border border-outline-variant/20 rounded pl-8 pr-4 text-sm text-on-surface focus:border-primary focus:bg-white outline-none transition-all disabled:opacity-60 disabled:cursor-not-allowed'
                placeholder='0'
                type='number'
                min='0'
              />
            </div>
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className='space-y-4'>
        <div className='flex items-center gap-3 mb-4'>
          <div className='w-8 h-8 bg-orange-500/10 rounded-lg flex items-center justify-center'>
            <CheckCircle className='w-4 h-4 text-orange-600' />
          </div>
          <h3 className='text-base font-bold text-on-surface'>Amenities</h3>
        </div>

        <div className='grid grid-cols-2 gap-3'>
          {AMENITIES_LIST.map((amenity) => (
            <label
              key={amenity}
              className={`flex items-center gap-3 group p-3 bg-surface-container rounded-lg border border-outline-variant/10 transition-all ${
                disabled
                  ? 'opacity-60 cursor-not-allowed'
                  : 'cursor-pointer hover:bg-white hover:border-primary/20'
              }`}
            >
              <div
                className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                  amenitiesData.amenities.includes(amenity)
                    ? 'border-primary bg-primary'
                    : 'border-outline-variant/30 group-hover:border-primary/40'
                }`}
              >
                {amenitiesData.amenities.includes(amenity) && (
                  <CheckCircle className='w-3 h-3 text-white' />
                )}
              </div>
              <input
                className='hidden'
                type='checkbox'
                checked={amenitiesData.amenities.includes(amenity)}
                onChange={() => toggleAmenity(amenity)}
                disabled={disabled}
              />
              <span className='text-xs font-semibold text-on-surface'>
                {amenity}
              </span>
            </label>
          ))}
        </div>
      </section>

      {/* Availability Status - Only in Edit Mode */}
      {editingListing && availability && onAvailabilityChange && (
        <section className='space-y-4'>
          <div className='flex items-center gap-3 mb-4'>
            <div className='w-8 h-8 bg-emerald-500/10 rounded-lg flex items-center justify-center'>
              <Power className='w-4 h-4 text-emerald-600' />
            </div>
            <h3 className='text-base font-bold text-on-surface'>
              Availability Status
            </h3>
          </div>

          <div className='bg-gradient-to-br from-white to-gray-50 rounded-2xl p-5 border-2 border-outline-variant/20 shadow-sm'>
            <div className='flex items-center justify-between gap-4'>
              <div className='flex-1'>
                <div className='flex items-center gap-2 mb-1.5'>
                  <div
                    className={`w-2 h-2 rounded-full ${
                      availability.isAvailable
                        ? 'bg-emerald-500'
                        : 'bg-gray-400'
                    } animate-pulse`}
                  />
                  <h4 className='text-sm font-bold text-on-surface'>
                    {availability.isAvailable ? 'Available' : 'Unavailable'}
                  </h4>
                </div>
                <p className='text-xs text-on-surface-variant leading-relaxed'>
                  {availability.isAvailable
                    ? 'Visible to students searching for rooms'
                    : 'Hidden from search results'}
                </p>
              </div>
              <button
                type='button'
                onClick={() => onAvailabilityChange(!availability.isAvailable)}
                disabled={disabled}
                className={`relative inline-flex h-8 w-14 shrink-0 cursor-pointer rounded-full border-2 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                  availability.isAvailable
                    ? 'bg-emerald-500 border-emerald-500 focus:ring-emerald-500'
                    : 'bg-gray-200 border-gray-300 focus:ring-gray-400'
                }`}
                role='switch'
                aria-checked={availability.isAvailable}
              >
                <span
                  className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-lg ring-0 transition-all duration-300 ease-in-out ${
                    availability.isAvailable ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
