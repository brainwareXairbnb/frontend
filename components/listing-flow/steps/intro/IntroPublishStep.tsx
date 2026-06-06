'use client'

import { Rocket } from 'lucide-react'

export function IntroPublishStep() {
  return (
    <div className='flex flex-col items-center justify-center py-16 text-center px-4'>
      {/* Icon */}
      <div className='w-24 h-24 bg-tertiary/10 rounded-full flex items-center justify-center mb-6'>
        <Rocket className='w-12 h-12 text-tertiary' />
      </div>

      {/* Title */}
      <h1 className='text-3xl md:text-4xl font-bold text-on-surface mb-4'>
        Finish up and publish
      </h1>

      {/* Description */}
      <p className='text-lg text-on-surface-variant max-w-2xl'>
        {"Finally, you'll set your pricing and availability. Once you're ready, you can publish"}
        {" your listing and start welcoming guests!"}
      </p>
    </div>
  )
}
