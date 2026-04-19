'use client'

import { Loader2 } from 'lucide-react'

export function NotificationLoadingState() {
  return (
    <div className='flex flex-col items-center justify-center py-20'>
      <Loader2 className='w-8 h-8 animate-spin text-primary mb-2' />
      <p className='text-sm text-on-surface-variant'>
        Loading notifications...
      </p>
    </div>
  )
}
