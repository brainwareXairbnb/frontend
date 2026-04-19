'use client'

import { useState, useEffect, useRef } from 'react'
import { Bell, X, Check, CheckCheck, Trash2, Loader2 } from 'lucide-react'
import { notificationsApi } from '@/lib/api'
import { toast } from 'sonner'
import { formatDistanceToNow } from 'date-fns'
import { Button } from './ui/button'
import { useRouter, usePathname } from 'next/navigation'
import useIsMobile from '@/lib/useIsMobile'

interface Notification {
  _id: string
  type: string
  title: string
  message: string
  isRead: boolean
  createdAt: string
  reference?: {
    model: string
    id: string
  }
}

export function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const pathname = usePathname()
  const isMobile = useIsMobile()

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  // Fetch notifications when dropdown opens
  useEffect(() => {
    if (isOpen) {
      fetchNotifications()
    }
  }, [isOpen])

  // Fetch unread count on mount and periodically
  useEffect(() => {
    fetchUnreadCount()

    // Poll for new notifications every 30 seconds
    const interval = setInterval(fetchUnreadCount, 30000)
    return () => clearInterval(interval)
  }, [])

  const fetchNotifications = async () => {
    setLoading(true)
    try {
      const response = await notificationsApi.getNotifications(20, 0)
      setNotifications(response.notifications)
      setUnreadCount(response.unreadCount)
    } catch (error: any) {
      toast.error('Failed to fetch notifications', {
        description: error.message,
      })
    } finally {
      setLoading(false)
    }
  }

  const fetchUnreadCount = async () => {
    try {
      const response = await notificationsApi.getUnreadCount()
      setUnreadCount(response.count)
    } catch (error: any) {
      // Silently fail - don't show error toast for background polling
      console.error('Failed to fetch unread count:', error)
    }
  }

  const handleMarkAsRead = async (notificationId: string) => {
    setActionLoading(notificationId)
    try {
      await notificationsApi.markAsRead(notificationId)
      setNotifications((prev) =>
        prev.map((n) =>
          n._id === notificationId ? { ...n, isRead: true } : n,
        ),
      )
      setUnreadCount((prev) => Math.max(0, prev - 1))
      toast.success('Marked as read')
    } catch (error: any) {
      toast.error('Failed to mark as read', { description: error.message })
    } finally {
      setActionLoading(null)
    }
  }

  const handleMarkAllAsRead = async () => {
    setActionLoading('all')
    try {
      await notificationsApi.markAllAsRead()
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })))
      setUnreadCount(0)
      toast.success('All notifications marked as read')
    } catch (error: any) {
      toast.error('Failed to mark all as read', { description: error.message })
    } finally {
      setActionLoading(null)
    }
  }

  const handleDeleteNotification = async (notificationId: string) => {
    setActionLoading(notificationId)
    try {
      await notificationsApi.deleteNotification(notificationId)
      const wasUnread =
        notifications.find((n) => n._id === notificationId)?.isRead === false
      setNotifications((prev) => prev.filter((n) => n._id !== notificationId))
      if (wasUnread) {
        setUnreadCount((prev) => Math.max(0, prev - 1))
      }
      toast.success('Notification deleted')
    } catch (error: any) {
      toast.error('Failed to delete notification', {
        description: error.message,
      })
    } finally {
      setActionLoading(null)
    }
  }

  const getNotificationIcon = (type: string) => {
    const iconClass = 'w-4 h-4'
    switch (type) {
      case 'booking_request':
      case 'booking_accepted':
        return '📅'
      case 'booking_rejected':
      case 'booking_cancelled':
        return '❌'
      case 'payment_confirmed':
      case 'payout_settled':
        return '💰'
      case 'payout_failed':
        return '⚠️'
      case 'listing_approved':
        return '✅'
      case 'listing_rejected':
      case 'listing_changes_required':
        return '📝'
      case 'owner_upgrade_approved':
        return '🎉'
      case 'owner_upgrade_rejected':
        return '😞'
      case 'new_review':
        return '⭐'
      case 'account_suspended':
      case 'account_banned':
        return '🚫'
      default:
        return '🔔'
    }
  }

  const getNotificationColor = (type: string) => {
    if (
      type.includes('approved') ||
      type.includes('confirmed') ||
      type.includes('settled')
    ) {
      return 'border-l-4 border-l-green-500'
    }
    if (
      type.includes('rejected') ||
      type.includes('failed') ||
      type.includes('banned')
    ) {
      return 'border-l-4 border-l-red-500'
    }
    if (
      type.includes('warning') ||
      type.includes('suspended') ||
      type.includes('required')
    ) {
      return 'border-l-4 border-l-orange-500'
    }
    return 'border-l-4 border-l-blue-500'
  }

  const handleBellClick = () => {
    // On mobile, redirect to notifications page
    if (isMobile) {
      const basePath = pathname.startsWith('/admin') ? '/admin' : '/owner'
      router.push(`${basePath}/notifications`)
    } else {
      // On desktop, toggle dropdown
      setIsOpen(!isOpen)
    }
  }

  return (
    <div className='relative' ref={dropdownRef}>
      {/* Bell Button */}
      <button
        onClick={handleBellClick}
        className='relative p-2 rounded-full hover:bg-surface-container transition-colors'
        aria-label='Notifications'
      >
        <Bell className='w-5 h-5 text-on-surface' />
        {unreadCount > 0 && (
          <span className='absolute -top-1 -right-1 w-5 h-5 bg-error text-white text-[10px] font-bold rounded-full flex items-center justify-center'>
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className='absolute right-0 mt-2 w-96 max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border border-outline-variant/10 z-50'>
          {/* Header */}
          <div className='flex items-center justify-between p-4 border-b border-outline-variant/10'>
            <div>
              <h3 className='font-bold text-base text-on-surface'>
                Notifications
              </h3>
              {unreadCount > 0 && (
                <p className='text-[10px] text-on-surface-variant'>
                  {unreadCount} unread
                </p>
              )}
            </div>
            <div className='flex items-center gap-2'>
              {unreadCount > 0 && (
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={handleMarkAllAsRead}
                  disabled={actionLoading === 'all'}
                  className='text-xs h-7 px-2'
                >
                  {actionLoading === 'all' ? (
                    <Loader2 className='w-3 h-3 animate-spin' />
                  ) : (
                    <>
                      <CheckCheck className='w-3 h-3 mr-1' />
                      Mark all read
                    </>
                  )}
                </Button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className='p-1 rounded-lg hover:bg-surface-container transition-colors'
              >
                <X className='w-4 h-4 text-on-surface-variant' />
              </button>
            </div>
          </div>

          {/* Notifications List */}
          <div className='max-h-[500px] overflow-y-auto'>
            {loading ? (
              <div className='flex flex-col items-center justify-center py-12'>
                <Loader2 className='w-8 h-8 animate-spin text-primary mb-2' />
                <p className='text-sm text-on-surface-variant'>
                  Loading notifications...
                </p>
              </div>
            ) : notifications.length === 0 ? (
              <div className='flex flex-col items-center justify-center py-12 px-4'>
                <Bell className='w-12 h-12 text-on-surface-variant/30 mb-3' />
                <p className='font-bold text-on-surface-variant text-sm'>
                  No notifications yet
                </p>
                <p className='text-xs text-on-surface-variant/70 mt-1'>
                  We'll notify you when something happens
                </p>
              </div>
            ) : (
              <div className='divide-y divide-outline-variant/10'>
                {notifications.map((notification) => (
                  <div
                    key={notification._id}
                    className={`p-4 hover:bg-surface-container-lowest/50 transition-colors ${getNotificationColor(notification.type)} ${
                      !notification.isRead ? 'bg-primary/5' : ''
                    }`}
                  >
                    <div className='flex items-start gap-3'>
                      {/* Icon */}
                      <div className='text-2xl shrink-0 mt-0.5'>
                        {getNotificationIcon(notification.type)}
                      </div>

                      {/* Content */}
                      <div className='flex-1 min-w-0'>
                        <div className='flex items-start justify-between gap-2 mb-1'>
                          <h4
                            className={`text-sm font-bold ${
                              !notification.isRead
                                ? 'text-on-surface'
                                : 'text-on-surface-variant'
                            }`}
                          >
                            {notification.title}
                          </h4>
                          {!notification.isRead && (
                            <div className='w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5'></div>
                          )}
                        </div>
                        <p className='text-xs text-on-surface-variant mb-2 line-clamp-2'>
                          {notification.message}
                        </p>
                        <div className='flex items-center justify-between'>
                          <span className='text-[10px] text-on-surface-variant/70'>
                            {formatDistanceToNow(
                              new Date(notification.createdAt),
                              {
                                addSuffix: true,
                              },
                            )}
                          </span>
                          <div className='flex items-center gap-1'>
                            {!notification.isRead && (
                              <button
                                onClick={() =>
                                  handleMarkAsRead(notification._id)
                                }
                                disabled={actionLoading === notification._id}
                                className='p-1 rounded hover:bg-surface-container transition-colors disabled:opacity-50'
                                title='Mark as read'
                              >
                                {actionLoading === notification._id ? (
                                  <Loader2 className='w-3 h-3 animate-spin text-on-surface-variant' />
                                ) : (
                                  <Check className='w-3 h-3 text-on-surface-variant' />
                                )}
                              </button>
                            )}
                            <button
                              onClick={() =>
                                handleDeleteNotification(notification._id)
                              }
                              disabled={actionLoading === notification._id}
                              className='p-1 rounded hover:bg-red-50 transition-colors disabled:opacity-50'
                              title='Delete'
                            >
                              {actionLoading === notification._id ? (
                                <Loader2 className='w-3 h-3 animate-spin text-red-600' />
                              ) : (
                                <Trash2 className='w-3 h-3 text-red-600' />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
