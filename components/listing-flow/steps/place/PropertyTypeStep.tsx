'use client'

import { Home, Users, Building2, Hotel, DoorOpen, Building } from 'lucide-react'
import type { ListingFormData } from '@/lib/listing-flow/steps'

interface PropertyTypeStepProps {
  formData: ListingFormData
  onChange: (data: Partial<ListingFormData>) => void
  disabled?: boolean
}

const ROOM_TYPES = [
  {
    value: 'single',
    label: 'Single Room',
    icon: DoorOpen,
    description: 'Private room for one person',
  },
  {
    value: 'double',
    label: 'Double Room',
    icon: Home,
    description: 'Private room for two people',
  },
  {
    value: 'shared',
    label: 'Shared Room',
    icon: Users,
    description: 'Shared room with multiple beds',
  },
  {
    value: 'triple',
    label: 'Triple Room',
    icon: Building2,
    description: 'Private room for three people',
  },
  {
    value: 'dormitory',
    label: 'Dormitory',
    icon: Hotel,
    description: 'Large shared space with many beds',
  },
  {
    value: 'flat',
    label: 'Flat/Apartment',
    icon: Building,
    description: 'Entire flat or apartment',
  },
]

export function PropertyTypeStep({
  formData,
  onChange,
  disabled = false,
}: PropertyTypeStepProps) {
  const handleSelect = (value: string) => {
    console.log('PropertyType selected:', value, 'Current:', formData.roomType)
    onChange({ roomType: value })
  }

  return (
    <div className='max-w-2xl mx-auto py-8 px-4'>
      {/* Title */}
      <h1 className='text-2xl md:text-3xl font-bold text-on-surface mb-2'>
        What type of room is it?
      </h1>
      <p className='text-on-surface-variant mb-8'>
        Select the option that best describes your space
      </p>

      {/* Room Type Grid */}
      <div className='grid grid-cols-2 gap-4'>
        {ROOM_TYPES.map((type) => {
          const Icon = type.icon
          const isSelected = formData.roomType === type.value

          return (
            <button
              key={type.value}
              type='button'
              onClick={() => handleSelect(type.value)}
              disabled={disabled}
              className={`
                relative p-3 rounded-2xl border-2 text-left transition-all
                ${
                  isSelected
                    ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                    : 'border-outline-variant/30 hover:border-primary/50 bg-white'
                }
                disabled:opacity-50 disabled:cursor-not-allowed
              `}
            >
              {isSelected && (
                <div className='absolute top-3 right-3 w-6 h-6 bg-primary rounded-full flex items-center justify-center'>
                  <svg
                    className='w-4 h-4 text-white'
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
                className={`w-8 h-8 mb-3 ${isSelected ? 'text-primary' : 'text-on-surface-variant'}`}
              />
              <h3
                className={`font-bold mb-1 ${isSelected ? 'text-primary' : 'text-on-surface'}`}
              >
                {type.label}
              </h3>
              <p className='text-sm text-on-surface-variant'>
                {type.description}
              </p>
            </button>
          )
        })}
      </div>
    </div>
  )
}
