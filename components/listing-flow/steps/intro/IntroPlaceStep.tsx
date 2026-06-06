'use client'

import { Home } from 'lucide-react'

export function IntroPlaceStep() {
  return (
    <div className='flex flex-col items-center justify-center py-16 text-center px-4'>
      {/* Icon */}
      <div className='w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6'>
        <Home className='w-12 h-12 text-primary' />
      </div>

      {/* Title */}
      <h1 className='text-3xl md:text-4xl font-bold text-on-surface mb-4'>
        Tell us about your place
      </h1>

      {/* Description */}
      <p className='text-lg text-on-surface-variant max-w-2xl'>
        {"In this step, we'll ask you which type of property you have and who can stay there."}
        {" Then let us know the location and how many guests can stay."}
      </p>
    </div>
  )
}
