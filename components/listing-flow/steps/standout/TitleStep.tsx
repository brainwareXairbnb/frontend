'use client'

import { useState } from 'react'
import type { ListingFormData } from '@/lib/listing-flow/steps'

interface TitleStepProps {
  formData: ListingFormData
  onChange: (data: Partial<ListingFormData>) => void
  disabled?: boolean
}

export function TitleStep({ formData, onChange, disabled = false }: TitleStepProps) {
  const maxLength = 100
  const currentLength = formData.title?.length || 0

  return (
    <div className='max-w-2xl mx-auto py-8 px-4'>
      <h1 className='text-2xl md:text-3xl font-bold text-on-surface mb-2'>
        {"Now, let's give your place a title"}
      </h1>
      <p className='text-on-surface-variant mb-8'>
        Short titles work best. Have fun with it—you can always change it later.
      </p>

      <div className='space-y-2'>
        <textarea
          value={formData.title}
          onChange={(e) => onChange({ title: e.target.value.slice(0, maxLength) })}
          disabled={disabled}
          maxLength={maxLength}
          rows={3}
          placeholder='e.g., Cozy room near Brainware University'
          className='w-full px-4 py-3 text-lg border-2 border-outline-variant/30 rounded-2xl resize-none focus:border-on-surface outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed'
        />
        <div className='flex justify-between text-sm text-on-surface-variant'>
          <span>{currentLength} / {maxLength}</span>
          {currentLength > 0 && (
            <span className={currentLength >= maxLength ? 'text-error' : ''}>
              {maxLength - currentLength} characters left
            </span>
          )}
        </div>
      </div>

      {/* Examples */}
      <div className='mt-8 bg-blue-50/50 border border-blue-200 rounded-xl p-4'>
        <p className='text-sm font-bold text-blue-900 mb-2'>Examples:</p>
        <ul className='text-sm text-blue-800 space-y-1'>
          <li>• Bright single room near campus</li>
          <li>• Comfortable PG with all amenities</li>
          <li>• Modern flat for students</li>
        </ul>
      </div>
    </div>
  )
}
