'use client'

import { MapPin, Building2, MapPinned } from 'lucide-react'
import type { ListingFormData } from '@/lib/listing-flow/steps'

interface AddressStepProps {
  formData: ListingFormData
  onChange: (data: Partial<ListingFormData>) => void
  disabled?: boolean
}

export function AddressStep({
  formData,
  onChange,
  disabled = false,
}: AddressStepProps) {
  return (
    <div className='max-w-2xl mx-auto py-8 px-4'>
      {/* Title */}
      <h1 className='text-2xl md:text-3xl font-bold text-on-surface mb-2'>
        {"Where's your place located?"}
      </h1>
      <p className='text-on-surface-variant mb-8'>
        {"Your address is only shared with guests after they've made a"}
        {" reservation"}
      </p>

      {/* Address Fields */}
      <div className='space-y-6'>
        {/* Street Address */}
        <div className='space-y-2'>
          <label className='flex items-center gap-2 text-sm font-semibold text-on-surface-variant'>
            <Building2 className='w-4 h-4' />
            Street Address *
          </label>
          <input
            required
            value={formData.street}
            disabled={disabled}
            onChange={(e) => onChange({ street: e.target.value })}
            className='w-full h-14 bg-white border-2 border-outline-variant/30 rounded px-4 text-base text-on-surface focus:border-on-surface outline-none transition-all placeholder:text-on-surface-variant/40 disabled:opacity-50 disabled:cursor-not-allowed'
            placeholder='House/Building name and street'
            type='text'
          />
        </div>

        {/* City and Pincode */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='space-y-2'>
            <label className='flex items-center gap-2 text-sm font-semibold text-on-surface-variant'>
              <MapPin className='w-4 h-4' />
              City
            </label>
            <input
              value={formData.city}
              disabled={disabled}
              onChange={(e) => onChange({ city: e.target.value })}
              className='w-full h-14 bg-white border-2 border-outline-variant/30 rounded px-4 text-base text-on-surface focus:border-on-surface outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed'
              placeholder='City'
              type='text'
            />
          </div>

          <div className='space-y-2'>
            <label className='flex items-center gap-2 text-sm font-semibold text-on-surface-variant'>
              <MapPinned className='w-4 h-4' />
              Pincode *
            </label>
            <input
              required
              value={formData.pincode}
              disabled={disabled}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '').slice(0, 6)
                onChange({ pincode: value })
              }}
              className='w-full h-14 bg-white border-2 border-outline-variant/30 rounded px-4 text-base text-on-surface focus:border-on-surface outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed'
              placeholder='6-digit pincode'
              type='text'
              maxLength={6}
              pattern='\d{6}'
            />
          </div>
        </div>

        {/* Landmark */}
        <div className='space-y-2'>
          <label className='flex items-center gap-2 text-sm font-semibold text-on-surface-variant'>
            <MapPin className='w-4 h-4' />
            Landmark (Optional)
          </label>
          <input
            value={formData.landmark}
            disabled={disabled}
            onChange={(e) => onChange({ landmark: e.target.value })}
            className='w-full h-14 bg-white border-2 border-outline-variant/30 rounded px-4 text-base text-on-surface focus:border-on-surface outline-none transition-all placeholder:text-on-surface-variant/40 disabled:opacity-50 disabled:cursor-not-allowed'
            placeholder='Nearby landmark for easy navigation'
            type='text'
          />
        </div>
      </div>

      {/* Info Box */}
      <div className='mt-8 bg-blue-50/50 border border-blue-200 rounded p-4'>
        <p className='text-sm text-blue-900'>
          <strong>Privacy note:</strong> Your exact address won't be shared
          publicly. We'll only show the general area to guests browsing
          listings.
        </p>
      </div>
    </div>
  )
}
