'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { notificationsApi } from '@/lib/api'
import { toast } from 'sonner'

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

const NOTIFICATIONS_PER_PAGE = 20

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [filter, setFilter] = useState<'all' | 'unread'>('all')
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(0)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    fetchNotifications(true)
  }, [])

  const fetchNotifications = async (reset = false) => {
    if (reset) {
      setLoading(true)
      setPage(0)
    } else {
      setLoadingMore(true)
    }

    try {
      const currentPage = reset ? 0 : page
      const skip = currentPage * NOTIFICATIONS_PER_PAGE
      const response = await notificationsApi.getNotifications(
        NOTIFICATIONS_PER_PAGE,
        skip
      )

      if (reset) {
        setNotifications(response.notifications)
      } else {
        setNotifications((prev) => [...prev, ...response.notifications])
      }

      // Check if there are more notifications to load
      if (response.notifications.length < NOTIFICATIONS_PER_PAGE) {
        setHasMore(false)
      } else {
        setHasMore(true)
        setPage((prev) => prev + 1)
      }
    } catch (error: any) {
      toast.error('Failed to fetch notifications', {
        description: error.message,
      })
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }

  const loadMore = useCallback(() => {
    if (!loadingMore && hasMore) {
      fetchNotifications(false)
    }
  }, [loadingMore, hasMore, page])

  const lastNotificationRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading || loadingMore) return
      if (observerRef.current) observerRef.current.disconnect()

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore()
        }
      })

      if (node) observerRef.current.observe(node)
    },
    [loading, loadingMore, hasMore, loadMore]
  )

  const handleMarkAsRead = async (notificationId: string) => {
    setActionLoading(notificationId)
    try {
      await notificationsApi.markAsRead(notificationId)
      setNotifications((prev) =>
        prev.map((n) =>
          n._id === notificationId ? { ...n, isRead: true } : n,
        ),
      )
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
      setNotifications((prev) => prev.filter((n) => n._id !== notificationId))
      toast.success('Notification deleted')
    } catch (error: any) {
      toast.error('Failed to delete notification', {
        description: error.message,
      })
    } finally {
      setActionLoading(null)
    }
  }

  const filteredNotifications =
    filter === 'unread'
      ? notifications.filter((n) => !n.isRead)
      : notifications

  const unreadCount = notifications.filter((n) => !n.isRead).length

  return {
    notifications,
    filteredNotifications,
    unreadCount,
    loading,
    loadingMore,
    actionLoading,
    filter,
    hasMore,
    setFilter,
    handleMarkAsRead,
    handleMarkAllAsRead,
    handleDeleteNotification,
    lastNotificationRef,
  }
}
