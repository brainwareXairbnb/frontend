'use client'

import Image from 'next/image'

export function IntroStandoutStep() {
  return (
    <div className='flex flex-col items-start justify-start px-6 py-6 md:py-12 bg-surface text-left'>
      {/* Centered Image Container */}
      <div className='w-full flex justify-center mb-8 mt-2'>
        <div className='w-full max-w-[320px] aspect-square relative'>
          <Image
            src="/images/listing-flow/intro_standout.png"
            alt="Make your place stand out"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Text Content */}
      <div className='w-full max-w-xl'>
        <p className='text-sm md:text-base font-bold text-on-surface-variant mb-2'>
          Step 2
        </p>
        <h1 className='text-3xl md:text-4xl font-black text-on-surface mb-4 tracking-tight leading-tight'>
          Make your place stand out
        </h1>
        <p className='text-base md:text-lg text-on-surface-variant/85 leading-relaxed'>
          {"In this step, we'll ask you about amenities you offer. Then you'll add photos and create a title and description that highlights what makes your place special."}
        </p>
      </div>
    </div>
  )
}


