'use client'

import { Sparkles } from 'lucide-react'

export function IntroStandoutStep() {
  return (
    <div className='flex flex-col items-center justify-center py-16 text-center px-4'>
      {/* Icon */}
      <div className='w-24 h-24 bg-secondary/10 rounded-full flex items-center justify-center mb-6'>
        <Sparkles className='w-12 h-12 text-secondary' />
      </div>

      {/* Title */}
      <h1 className='text-3xl md:text-4xl font-bold text-on-surface mb-4'>
        Make your place stand out
      </h1>

      {/* Description */}
      <p className='text-lg text-on-surface-variant max-w-2xl'>
        {"In this step, we'll ask you about amenities you offer. Then you'll add photos and create"}
        {" a title and description that highlights what makes your place special."}
      </p>
    </div>
  )
}
