'use client'

import { Loader2 } from 'lucide-react'

interface NotificationFilterHeaderProps {
  unreadCount: number
  filter: 'all' | 'unread'
  totalCount: number
  actionLoading: string | null
  onFilterChange: (filter: 'all' | 'unread') => void
  onMarkAllAsRead: () => void
}

export function NotificationFilterHeader({
  unreadCount,
  filter,
  totalCount,
  actionLoading,
  onFilterChange,
  onMarkAllAsRead,
}: NotificationFilterHeaderProps) {
  return (
    <div className='sticky top-0 z-30 bg-white border-b border-outline-variant/10'>
      <div className='px-4 py-3'>
        <div className='flex items-center justify-between mb-3'>
          {unreadCount > 0 && (
            <p className='text-xs text-on-surface-variant'>
              {unreadCount} unread notification{unreadCount > 1 ? 's' : ''}
            </p>
          )}
          <div className='flex-1'></div>
          {unreadCount > 0 && (
            <button
              onClick={onMarkAllAsRead}
              disabled={actionLoading === 'all'}
              className='text-xs font-bold text-primary hover:text-primary/80 disabled:opacity-50 transition-colors'
            >
              {actionLoading === 'all' ? (
                <Loader2 className='w-4 h-4 animate-spin' />
              ) : (
                'Mark all read'
              )}
            </button>
          )}
        </div>

        {/* Filter Tabs */}
        <div className='flex gap-2'>
          <button
            onClick={() => onFilterChange('all')}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all ${
              filter === 'all'
                ? 'bg-primary text-white shadow-sm'
                : 'bg-surface-container/50 text-on-surface-variant'
            }`}
          >
            All ({totalCount})
          </button>
          <button
            onClick={() => onFilterChange('unread')}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all ${
              filter === 'unread'
                ? 'bg-primary text-white shadow-sm'
                : 'bg-surface-container/50 text-on-surface-variant'
            }`}
          >
            Unread ({unreadCount})
          </button>
        </div>
      </div>
    </div>
  )
}
