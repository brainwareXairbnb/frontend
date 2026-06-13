'use client'

import { Home, Users } from 'lucide-react'

interface FormData {
  title: string
  description: string
  roomType: string
  genderPref: string
  furnishing: string
  totalBeds: string
}

interface BasicInfoStepProps {
  formData: FormData
  onChange: (data: Partial<FormData>) => void
  disabled?: boolean
}

export function BasicInfoStep({
  formData,
  onChange,
  disabled = false,
}: BasicInfoStepProps) {
  return (
    <section className='space-y-4'>
      <div className='flex items-center gap-3 mb-4'>
        <div className='w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center'>
          <Home className='w-4 h-4 text-primary' />
        </div>
        <h3 className='text-base font-bold text-on-surface'>
          Basic Information
        </h3>
      </div>

      <div className='space-y-2'>
        <label className='text-xs font-semibold text-on-surface-variant tracking-wider'>
          Property Title *
        </label>
        <input
          required
          disabled={disabled}
          value={formData.title}
          onChange={(e) => onChange({ title: e.target.value })}
          className='w-full h-12 bg-surface-container border border-outline-variant/20 rounded px-4 text-sm text-on-surface focus:border-primary focus:bg-white outline-none transition-all placeholder:text-on-surface-variant/40 disabled:opacity-60 disabled:cursor-not-allowed'
          placeholder='e.g., Spacious Room Near Campus'
          type='text'
        />
      </div>

      <div className='space-y-2'>
        <label className='text-xs font-semibold text-on-surface-variant tracking-wider'>
          Description
        </label>
        <textarea
          value={formData.description}
          disabled={disabled}
          onChange={(e) => onChange({ description: e.target.value })}
          className='w-full bg-surface-container border border-outline-variant/20 rounded p-4 text-sm text-on-surface focus:border-primary focus:bg-white outline-none transition-all placeholder:text-on-surface-variant/40 resize-none disabled:opacity-60 disabled:cursor-not-allowed'
          placeholder='Describe your property...'
          rows={4}
        />
      </div>

      <div className='grid grid-cols-2 gap-4'>
        <div className='space-y-2'>
          <label className='text-xs font-semibold text-on-surface-variant tracking-wider'>
            Room Type
          </label>
          <select
            value={formData.roomType}
            disabled={disabled}
            onChange={(e) => onChange({ roomType: e.target.value })}
            className='w-full h-12 bg-surface-container border border-outline-variant/20 rounded px-4 text-sm text-on-surface focus:border-primary focus:bg-white outline-none cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed'
          >
            <option value='single'>Single Room</option>
            <option value='double'>Double Room</option>
            <option value='shared'>Shared Room</option>
            <option value='triple'>Triple Room</option>
            <option value='dormitory'>Dormitory</option>
            <option value='flat'>Flat/Apartment</option>
            <option value='pg'>PG/Hostel</option>
          </select>
        </div>

        <div className='space-y-2'>
          <label className='text-xs font-semibold text-on-surface-variant tracking-wider'>
            Preferred Gender
          </label>
          <select
            value={formData.genderPref}
            disabled={disabled}
            onChange={(e) => onChange({ genderPref: e.target.value })}
            className='w-full h-12 bg-surface-container border border-outline-variant/20 rounded px-4 text-sm text-on-surface focus:border-primary focus:bg-white outline-none cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed'
          >
            <option value='any'>Any</option>
            <option value='boys'>Boys Only</option>
            <option value='girls'>Girls Only</option>
            <option value='coed'>Co-ed</option>
          </select>
        </div>
      </div>

      <div className='space-y-2'>
        <label className='text-xs font-semibold text-on-surface-variant tracking-wider'>
          Furnishing
        </label>
        <select
          value={formData.furnishing}
          disabled={disabled}
          onChange={(e) => onChange({ furnishing: e.target.value })}
          className='w-full h-12 bg-surface-container border border-outline-variant/20 rounded px-4 text-sm text-on-surface focus:border-primary focus:bg-white outline-none cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed'
        >
          <option value='Furnished'>Furnished</option>
          <option value='Semi-Furnished'>Semi-Furnished</option>
          <option value='Unfurnished'>Unfurnished</option>
        </select>
      </div>

      <div className='space-y-2'>
        <label className='text-xs font-semibold text-on-surface-variant tracking-wider'>
          Total Beds / Capacity *
        </label>
        <div className='relative'>
          <Users className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant' />
          <input
            required
            value={formData.totalBeds}
            disabled={disabled}
            onChange={(e) => onChange({ totalBeds: e.target.value })}
            className='w-full h-12 bg-surface-container border border-outline-variant/20 rounded pl-12 pr-4 text-sm text-on-surface focus:border-primary focus:bg-white outline-none transition-all disabled:opacity-60 disabled:cursor-not-allowed'
            placeholder='Number of beds available'
            type='number'
            min='1'
            max='20'
          />
        </div>
        <p className='text-xs text-on-surface-variant'>
          Total number of beds in this property (decreases with bookings)
        </p>
      </div>
    </section>
  )
}
