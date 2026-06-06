'use client'

import type { ListingFormData } from '@/lib/listing-flow/steps'

interface DescriptionStepProps {
  formData: ListingFormData
  onChange: (data: Partial<ListingFormData>) => void
  disabled?: boolean
}

export function DescriptionStep({ formData, onChange, disabled = false }: DescriptionStepProps) {
  return (
    <div className='max-w-2xl mx-auto py-8 px-4'>
      <h1 className='text-2xl md:text-3xl font-bold text-on-surface mb-2'>
        Create your description
      </h1>
      <p className='text-on-surface-variant mb-8'>
        Share what makes your place special
      </p>

      <div className='space-y-2'>
        <textarea
          value={formData.description}
          onChange={(e) => onChange({ description: e.target.value })}
          disabled={disabled}
          rows={8}
          placeholder='Describe your place, the neighborhood, and what guests can expect...'
          className='w-full px-4 py-3 text-base border-2 border-outline-variant/30 rounded-2xl resize-none focus:border-on-surface outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed'
        />
      </div>

      {/* Tips */}
      <div className='mt-8 bg-blue-50/50 border border-blue-200 rounded-xl p-4'>
        <p className='text-sm font-bold text-blue-900 mb-2'>What to include:</p>
        <ul className='text-sm text-blue-800 space-y-1'>
          <li>• What makes your space unique</li>
          <li>• Nearby facilities and landmarks</li>
          <li>• Transportation options</li>
          <li>• House rules or special features</li>
        </ul>
      </div>
    </div>
  )
}
