'use client'

import { Minus, Plus, Users, Home, Bed, Bath } from 'lucide-react'
import type { ListingFormData } from '@/lib/listing-flow/steps'

interface CapacityStepProps {
  formData: ListingFormData
  onChange: (data: Partial<ListingFormData>) => void
  disabled?: boolean
}

interface CapacityField {
  key: 'totalStudents' | 'totalBedrooms' | 'totalBeds' | 'totalBathrooms'
  label: string
  icon: any
  min: number
  max: number
  description: (count: number) => string
}

export function CapacityStep({ formData, onChange, disabled = false }: CapacityStepProps) {
  const capacityFields: CapacityField[] = [
    {
      key: 'totalStudents',
      label: 'Students',
      icon: Users,
      min: 1,
      max: 50,
      description: (count) => `${count} ${count === 1 ? 'student' : 'students'} can stay`,
    },
    {
      key: 'totalBedrooms',
      label: 'Bedrooms',
      icon: Home,
      min: 1,
      max: 20,
      description: (count) => `${count} ${count === 1 ? 'bedroom' : 'bedrooms'} available`,
    },
    {
      key: 'totalBeds',
      label: 'Beds',
      icon: Bed,
      min: 1,
      max: 50,
      description: (count) => `${count} ${count === 1 ? 'bed' : 'beds'} available`,
    },
    {
      key: 'totalBathrooms',
      label: 'Bathrooms',
      icon: Bath,
      min: 1,
      max: 10,
      description: (count) => `${count} ${count === 1 ? 'bathroom' : 'bathrooms'} available`,
    },
  ]

  const handleIncrement = (field: CapacityField) => {
    const currentValue = parseInt(formData[field.key]) || field.min
    if (currentValue < field.max) {
      onChange({ [field.key]: String(currentValue + 1) })
    }
  }

  const handleDecrement = (field: CapacityField) => {
    const currentValue = parseInt(formData[field.key]) || field.min
    if (currentValue > field.min) {
      onChange({ [field.key]: String(currentValue - 1) })
    }
  }

  return (
    <div className='max-w-2xl mx-auto py-8 px-4'>
      {/* Title */}
      <h1 className='text-2xl md:text-3xl font-bold text-on-surface mb-2'>
        Share some basics about your place
      </h1>
      <p className='text-on-surface-variant mb-8'>
        You'll add more details later, like amenities and photos
      </p>

      {/* Capacity Fields */}
      <div className='space-y-4'>
        {capacityFields.map((field) => {
          const Icon = field.icon
          const currentValue = parseInt(formData[field.key]) || field.min

          return (
            <div
              key={field.key}
              className='bg-white rounded-2xl border-2 border-outline-variant/30 p-6 hover:border-primary/30 transition-colors'
            >
              <div className='flex items-center justify-between'>
                {/* Label */}
                <div className='flex items-center gap-3'>
                  <div className='w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0'>
                    <Icon className='w-6 h-6 text-primary' />
                  </div>
                  <div>
                    <h3 className='font-bold text-on-surface'>{field.label}</h3>
                  </div>
                </div>

                {/* Counter */}
                <div className='flex items-center gap-4'>
                  <button
                    type='button'
                    onClick={() => handleDecrement(field)}
                    disabled={disabled || currentValue <= field.min}
                    className='w-10 h-10 rounded-full border-2 border-outline-variant/30 flex items-center justify-center hover:border-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed'
                  >
                    <Minus className='w-5 h-5' />
                  </button>

                  <span className='text-xl font-bold text-on-surface w-10 text-center'>
                    {currentValue}
                  </span>

                  <button
                    type='button'
                    onClick={() => handleIncrement(field)}
                    disabled={disabled || currentValue >= field.max}
                    className='w-10 h-10 rounded-full border-2 border-outline-variant/30 flex items-center justify-center hover:border-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed'
                  >
                    <Plus className='w-5 h-5' />
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Summary Card */}
      <div className='mt-8 bg-primary/5 border border-primary/20 rounded-2xl p-6'>
        <h3 className='font-bold text-on-surface mb-3'>Summary</h3>
        <div className='grid grid-cols-2 gap-3 text-sm'>
          <div className='flex items-center gap-2'>
            <Users className='w-4 h-4 text-primary' />
            <span className='text-on-surface-variant'>
              <strong className='text-on-surface'>{parseInt(formData.totalStudents) || 1}</strong>{' '}
              {parseInt(formData.totalStudents) === 1 ? 'Student' : 'Students'}
            </span>
          </div>
          <div className='flex items-center gap-2'>
            <Home className='w-4 h-4 text-primary' />
            <span className='text-on-surface-variant'>
              <strong className='text-on-surface'>{parseInt(formData.totalBedrooms) || 1}</strong>{' '}
              {parseInt(formData.totalBedrooms) === 1 ? 'Bedroom' : 'Bedrooms'}
            </span>
          </div>
          <div className='flex items-center gap-2'>
            <Bed className='w-4 h-4 text-primary' />
            <span className='text-on-surface-variant'>
              <strong className='text-on-surface'>{parseInt(formData.totalBeds) || 1}</strong>{' '}
              {parseInt(formData.totalBeds) === 1 ? 'Bed' : 'Beds'}
            </span>
          </div>
          <div className='flex items-center gap-2'>
            <Bath className='w-4 h-4 text-primary' />
            <span className='text-on-surface-variant'>
              <strong className='text-on-surface'>{parseInt(formData.totalBathrooms) || 1}</strong>{' '}
              {parseInt(formData.totalBathrooms) === 1 ? 'Bathroom' : 'Bathrooms'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
