'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Bell, X, Check, CheckCheck, Trash2, Loader2 } from 'lucide-react'
import { notificationsApi } from '@/lib/api'
import { toast } from 'sonner'
import { formatDistanceToNow } from 'date-fns'
import { Button } from './ui/button'
import { useRouter, usePathname } from 'next/navigation'
import useIsMobile from '@/lib/useIsMobile'
import { Notification } from '@/lib/types'

export function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const isMobile = useIsMobile()

  // Ensure portal is only rendered on client side
  useEffect(() => {
    setMounted(true)
  }, [])

  // Close drawer with ESC key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen && !isMobile) {
        setIsOpen(false)
      }
    }

    if (isOpen && !isMobile) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, isMobile])

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
    <>
      {/* Bell Button */}
      <button
        onClick={handleBellClick}
        className='relative p-2 rounded-full hover:bg-surface-container transition-colors cursor-pointer'
        aria-label='Notifications'
      >
        <Bell className='w-5 h-5 text-on-surface' />
        {unreadCount > 0 && (
          <span className='absolute -top-1 -right-1 w-5 h-5 bg-error text-white text-[10px] font-bold rounded-full flex items-center justify-center'>
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Portal for Backdrop and Drawer - renders at document.body level */}
      {mounted && isOpen && !isMobile && createPortal(
        <>
          {/* Backdrop for desktop drawer */}
          <div
            className='fixed inset-0 bg-black/50'
            style={{ zIndex: 9998 }}
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer */}
          <div className='fixed right-0 top-0 bottom-0 w-[28rem] max-w-[90vw] bg-white shadow-2xl flex flex-col' style={{ zIndex: 9999 }}>
          {/* Header */}
          <div className='flex items-center justify-between p-6 border-b border-outline-variant/10 shrink-0'>
            <div>
              <h3 className='font-bold text-xl text-on-surface'>
                Notifications
              </h3>
              {unreadCount > 0 && (
                <p className='text-xs text-on-surface-variant mt-1'>
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
                  className='text-xs h-8 px-3 cursor-pointer'
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
                className='p-2 rounded-lg hover:bg-surface-container transition-colors cursor-pointer'
              >
                <X className='w-5 h-5 text-on-surface-variant' />
              </button>
            </div>
          </div>

          {/* Notifications List */}
          <div className='flex-1 overflow-y-auto'>
            {loading ? (
              <div className='flex flex-col items-center justify-center py-20'>
                <Loader2 className='w-10 h-10 animate-spin text-primary mb-3' />
                <p className='text-sm text-on-surface-variant'>
                  Loading notifications...
                </p>
              </div>
            ) : notifications.length === 0 ? (
              <div className='flex flex-col items-center justify-center py-20 px-6'>
                <Bell className='w-16 h-16 text-on-surface-variant/30 mb-4' />
                <p className='font-bold text-on-surface-variant text-base'>
                  No notifications yet
                </p>
                <p className='text-sm text-on-surface-variant/70 mt-2 text-center'>
                  We'll notify you when something happens
                </p>
              </div>
            ) : (
              <div className='divide-y divide-outline-variant/10'>
                {notifications.map((notification) => (
                  <div
                    key={notification._id}
                    className={`p-5 hover:bg-surface-container-lowest/50 transition-colors ${getNotificationColor(notification.type)} ${
                      !notification.isRead ? 'bg-primary/5' : ''
                    }`}
                  >
                    <div className='flex items-start gap-4'>
                      {/* Icon */}
                      <div className='text-3xl shrink-0 mt-0.5'>
                        {getNotificationIcon(notification.type)}
                      </div>

                      {/* Content */}
                      <div className='flex-1 min-w-0'>
                        <div className='flex items-start justify-between gap-2 mb-2'>
                          <h4
                            className={`text-base font-bold ${
                              !notification.isRead
                                ? 'text-on-surface'
                                : 'text-on-surface-variant'
                            }`}
                          >
                            {notification.title}
                          </h4>
                          {!notification.isRead && (
                            <div className='w-2.5 h-2.5 rounded-full bg-primary shrink-0 mt-1.5'></div>
                          )}
                        </div>
                        <p className='text-sm text-on-surface-variant mb-3 line-clamp-2'>
                          {notification.message}
                        </p>
                        <div className='flex items-center justify-between'>
                          <span className='text-xs text-on-surface-variant/70'>
                            {formatDistanceToNow(
                              new Date(notification.createdAt),
                              {
                                addSuffix: true,
                              },
                            )}
                          </span>
                          <div className='flex items-center gap-2'>
                            {!notification.isRead && (
                              <button
                                onClick={() =>
                                  handleMarkAsRead(notification._id)
                                }
                                disabled={actionLoading === notification._id}
                                className='p-1.5 rounded hover:bg-surface-container transition-colors disabled:opacity-50 cursor-pointer'
                                title='Mark as read'
                              >
                                {actionLoading === notification._id ? (
                                  <Loader2 className='w-4 h-4 animate-spin text-on-surface-variant' />
                                ) : (
                                  <Check className='w-4 h-4 text-on-surface-variant' />
                                )}
                              </button>
                            )}
                            <button
                              onClick={() =>
                                handleDeleteNotification(notification._id)
                              }
                              disabled={actionLoading === notification._id}
                              className='p-1.5 rounded hover:bg-red-50 transition-colors disabled:opacity-50 cursor-pointer'
                              title='Delete'
                            >
                              {actionLoading === notification._id ? (
                                <Loader2 className='w-4 h-4 animate-spin text-red-600' />
                              ) : (
                                <Trash2 className='w-4 h-4 text-red-600' />
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
        </>,
        document.body
      )}
    </>
  )
}
