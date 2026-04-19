'use client'

import { formatDistanceToNow } from 'date-fns'
import { Loader2, Trash2 } from 'lucide-react'
import {
  Calendar,
  MessageCircle,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  FileText,
  ClipboardList,
  PartyPopper,
  Frown,
  UserPlus,
  Star,
  Ban,
  Users,
  Bell,
} from 'lucide-react'

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

interface NotificationCardProps {
  notification: Notification
  actionLoading: string | null
  onMarkAsRead: (id: string) => void
  onDelete: (id: string) => void
}

export function NotificationCard({
  notification,
  actionLoading,
  onMarkAsRead,
  onDelete,
}: NotificationCardProps) {
  const getNotificationStyle = (type: string) => {
    // Booking related
    if (type.includes('booking_request') || type.includes('booking_accepted')) {
      return {
        icon: Calendar,
        color: 'text-emerald-500',
        bg: 'bg-emerald-50',
      }
    }
    if (type.includes('booking_rejected') || type.includes('booking_cancelled')) {
      return {
        icon: Calendar,
        color: 'text-red-500',
        bg: 'bg-red-50',
      }
    }

    // Payment & Payout
    if (type.includes('payment_confirmed') || type.includes('payout_settled')) {
      return {
        icon: DollarSign,
        color: 'text-green-500',
        bg: 'bg-green-50',
      }
    }
    if (type.includes('payout_failed') || type.includes('payment_failed')) {
      return {
        icon: AlertTriangle,
        color: 'text-orange-500',
        bg: 'bg-orange-50',
      }
    }

    // Listing related
    if (type.includes('listing_approved')) {
      return {
        icon: CheckCircle,
        color: 'text-green-500',
        bg: 'bg-green-50',
      }
    }
    if (type.includes('listing_rejected') || type.includes('listing_changes_required')) {
      return {
        icon: FileText,
        color: 'text-orange-500',
        bg: 'bg-orange-50',
      }
    }
    if (type.includes('listing_submitted') || type.includes('listing_resubmitted')) {
      return {
        icon: ClipboardList,
        color: 'text-blue-500',
        bg: 'bg-blue-50',
      }
    }

    // Owner upgrade
    if (type.includes('owner_upgrade_approved') || type.includes('owner_approved')) {
      return {
        icon: PartyPopper,
        color: 'text-purple-500',
        bg: 'bg-purple-50',
      }
    }
    if (type.includes('owner_upgrade_rejected') || type.includes('owner_rejected')) {
      return {
        icon: Frown,
        color: 'text-gray-500',
        bg: 'bg-gray-50',
      }
    }
    if (type.includes('owner_upgrade_requested')) {
      return {
        icon: UserPlus,
        color: 'text-indigo-500',
        bg: 'bg-indigo-50',
      }
    }

    // Reviews
    if (type.includes('review')) {
      return {
        icon: Star,
        color: 'text-yellow-500',
        bg: 'bg-yellow-50',
      }
    }

    // Account issues
    if (type.includes('banned') || type.includes('suspended')) {
      return {
        icon: Ban,
        color: 'text-red-600',
        bg: 'bg-red-50',
      }
    }

    // User registration
    if (type.includes('user_registered')) {
      return {
        icon: Users,
        color: 'text-teal-500',
        bg: 'bg-teal-50',
      }
    }

    // Default
    return {
      icon: Bell,
      color: 'text-blue-500',
      bg: 'bg-blue-50',
    }
  }

  const { icon: Icon, color, bg } = getNotificationStyle(notification.type)

  return (
    <div
      className={`flex gap-4 py-6 hover:bg-slate-50 transition-colors cursor-pointer group relative ${
        !notification.isRead ? 'bg-primary/5' : ''
      }`}
      onClick={() => !notification.isRead && onMarkAsRead(notification._id)}
    >
      {/* Icon */}
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${bg} ${color}`}
      >
        <Icon className='w-5 h-5' strokeWidth={2.5} />
      </div>

      {/* Content */}
      <div className='flex-1 min-w-0'>
        <div className='flex justify-between items-baseline mb-1'>
          <div className='flex items-center gap-2'>
            <h3 className='text-[15px] font-bold text-on-surface leading-tight'>
              {notification.title}
            </h3>
            {!notification.isRead && (
              <div className='w-2 h-2 rounded-full bg-primary shrink-0'></div>
            )}
          </div>
          <span className='text-[10px] font-medium text-on-surface-variant opacity-40 uppercase tracking-wider shrink-0 ml-2'>
            {formatDistanceToNow(new Date(notification.createdAt), {
              addSuffix: true,
            }).replace('about ', '')}
          </span>
        </div>
        <p className='text-[14px] text-on-surface-variant leading-relaxed opacity-80'>
          {notification.message}
        </p>
      </div>

      {/* Delete button */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          onDelete(notification._id)
        }}
        disabled={actionLoading === notification._id}
        className='opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-lg hover:bg-red-50 disabled:opacity-50 shrink-0'
      >
        {actionLoading === notification._id ? (
          <Loader2 className='w-4 h-4 animate-spin text-red-600' />
        ) : (
          <Trash2 className='w-4 h-4 text-red-600' />
        )}
      </button>
    </div>
  )
}
