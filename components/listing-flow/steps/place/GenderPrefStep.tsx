'use client'

import { Users, User } from 'lucide-react'
import type { ListingFormData } from '@/lib/listing-flow/steps'

interface GenderPrefStepProps {
  formData: ListingFormData
  onChange: (data: Partial<ListingFormData>) => void
  disabled?: boolean
}

const GENDER_OPTIONS = [
  { value: 'any', label: 'Anyone', description: 'Open to all genders' },
  { value: 'boys', label: 'Boys Only', description: 'Male guests only' },
  { value: 'girls', label: 'Girls Only', description: 'Female guests only' },
  { value: 'coed', label: 'Co-ed', description: 'Mixed gender accommodation' },
]

export function GenderPrefStep({ formData, onChange, disabled = false }: GenderPrefStepProps) {
  return (
    <div className='max-w-2xl mx-auto py-8 px-4'>
      {/* Title */}
      <h1 className='text-2xl md:text-3xl font-bold text-on-surface mb-2'>
        Who can stay here?
      </h1>
      <p className='text-on-surface-variant mb-8'>
        Choose the gender preference for your guests
      </p>

      {/* Gender Options */}
      <div className='space-y-3'>
        {GENDER_OPTIONS.map((option) => {
          const isSelected = formData.genderPref === option.value
          const Icon = option.value === 'any' || option.value === 'coed' ? Users : User

          return (
            <button
              key={option.value}
              type='button'
              onClick={() => onChange({ genderPref: option.value })}
              disabled={disabled}
              className={`
                relative w-full p-5 rounded-2xl border-2 text-left transition-all flex items-center gap-4
                ${isSelected
                  ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                  : 'border-outline-variant/30 hover:border-primary/50 bg-white'
                }
                disabled:opacity-50 disabled:cursor-not-allowed
              `}
            >
              <Icon className={`w-6 h-6 shrink-0 ${isSelected ? 'text-primary' : 'text-on-surface-variant'}`} />
              <div className='flex-1'>
                <h3 className={`font-bold mb-0.5 ${isSelected ? 'text-primary' : 'text-on-surface'}`}>{option.label}</h3>
                <p className='text-sm text-on-surface-variant'>{option.description}</p>
              </div>
              {isSelected && (
                <div className='w-6 h-6 bg-primary rounded-full flex items-center justify-center shrink-0'>
                  <svg className='w-4 h-4 text-white' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={3} d='M5 13l4 4L19 7' />
                  </svg>
                </div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
