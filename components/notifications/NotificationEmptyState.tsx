'use client'

import { Bell } from 'lucide-react'

interface NotificationEmptyStateProps {
  filter: 'all' | 'unread'
}

export function NotificationEmptyState({
  filter,
}: NotificationEmptyStateProps) {
  return (
    <div className='py-20 text-center'>
      <div className='w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6'>
        <Bell className='w-8 h-8 opacity-20' />
      </div>
      <h2 className='text-lg font-bold mb-2'>
        {filter === 'unread' ? 'No unread notifications' : 'No notifications yet'}
      </h2>
      <p className='text-sm text-on-surface-variant opacity-60'>
        {filter === 'unread'
          ? 'All caught up!'
          : "We'll notify you when something important happens."}
      </p>
    </div>
  )
}
