'use client'

import { NotificationCard } from './NotificationCard'
import { Notification } from '@/lib/types'

interface NotificationListProps {
  notifications: Notification[]
  actionLoading: string | null
  onMarkAsRead: (id: string) => void
  onDelete: (id: string) => void
  lastNotificationRef?: (node: HTMLDivElement | null) => void
}

export function NotificationList({
  notifications,
  actionLoading,
  onMarkAsRead,
  onDelete,
  lastNotificationRef,
}: NotificationListProps) {
  return (
    <div className='divide-y divide-outline-variant/5'>
      {notifications.map((notification, index) => {
        const isLast = index === notifications.length - 1
        return (
          <div key={notification._id} ref={isLast ? lastNotificationRef : null}>
            <NotificationCard
              notification={notification}
              actionLoading={actionLoading}
              onMarkAsRead={onMarkAsRead}
              onDelete={onDelete}
            />
          </div>
        )
      })}
    </div>
  )
}
