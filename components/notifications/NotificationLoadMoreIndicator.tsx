'use client'

import { Loader2 } from 'lucide-react'

export function NotificationLoadMoreIndicator() {
  return (
    <div className='flex items-center justify-center py-8'>
      <Loader2 className='w-6 h-6 animate-spin text-primary' />
      <span className='ml-2 text-sm text-on-surface-variant'>
        Loading more...
      </span>
    </div>
  )
}
