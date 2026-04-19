'use client'

import { useNotifications } from '@/hooks/useNotifications'
import { NotificationFilterHeader } from '@/components/notifications/NotificationFilterHeader'
import { NotificationLoadingState } from '@/components/notifications/NotificationLoadingState'
import { NotificationEmptyState } from '@/components/notifications/NotificationEmptyState'
import { NotificationList } from '@/components/notifications/NotificationList'
import { NotificationLoadMoreIndicator } from '@/components/notifications/NotificationLoadMoreIndicator'

export default function OwnerNotificationsPage() {
  const {
    notifications,
    filteredNotifications,
    unreadCount,
    loading,
    loadingMore,
    actionLoading,
    filter,
    setFilter,
    handleMarkAsRead,
    handleMarkAllAsRead,
    handleDeleteNotification,
    lastNotificationRef,
  } = useNotifications()

  return (
    <div className='bg-white min-h-screen'>
      {/* Filter Header */}
      <NotificationFilterHeader
        unreadCount={unreadCount}
        filter={filter}
        totalCount={notifications.length}
        actionLoading={actionLoading}
        onFilterChange={setFilter}
        onMarkAllAsRead={handleMarkAllAsRead}
      />

      {/* Notifications List */}
      <main className='px-5 md:px-10 pb-32 pt-6 max-w-2xl mx-auto'>
        {loading ? (
          <NotificationLoadingState />
        ) : filteredNotifications.length === 0 ? (
          <NotificationEmptyState filter={filter} />
        ) : (
          <>
            <NotificationList
              notifications={filteredNotifications}
              actionLoading={actionLoading}
              onMarkAsRead={handleMarkAsRead}
              onDelete={handleDeleteNotification}
              lastNotificationRef={lastNotificationRef}
            />
            {loadingMore && <NotificationLoadMoreIndicator />}
          </>
        )}
      </main>
    </div>
  )
}
