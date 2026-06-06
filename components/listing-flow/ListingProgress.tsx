'use client'

import { motion } from 'framer-motion'
import { getSectionProgress } from '@/lib/listing-flow/steps'

interface ListingProgressProps {
  currentStepIndex: number
}

export function ListingProgress({ currentStepIndex }: ListingProgressProps) {
  const { section1, section2, section3 } = getSectionProgress(currentStepIndex)

  return (
    <div className='w-full bg-surface-container py-3 px-4'>
      <div className='max-w-4xl mx-auto'>
        {/* Segmented Progress Bar */}
        <div className='flex gap-2'>
          {/* Section 1 */}
          <div className='flex-1 h-1 bg-surface-container-high rounded-full overflow-hidden'>
            <motion.div
              className='h-full bg-on-surface'
              initial={{ width: '0%' }}
              animate={{ width: `${section1}%` }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />
          </div>

          {/* Section 2 */}
          <div className='flex-1 h-1 bg-surface-container-high rounded-full overflow-hidden'>
            <motion.div
              className='h-full bg-on-surface'
              initial={{ width: '0%' }}
              animate={{ width: `${section2}%` }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />
          </div>

          {/* Section 3 */}
          <div className='flex-1 h-1 bg-surface-container-high rounded-full overflow-hidden'>
            <motion.div
              className='h-full bg-on-surface'
              initial={{ width: '0%' }}
              animate={{ width: `${section3}%` }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
