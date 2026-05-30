'use client'

import { useRouter } from 'next/navigation'
import { ChevronLeft, Clock, CheckCircle2, XCircle } from 'lucide-react'

interface BookingStatusCardProps {
  status: string | null
  variant?: 'desktop' | 'mobile'
}

export function BookingStatusCard({
  status,
  variant = 'desktop',
}: BookingStatusCardProps) {
  const router = useRouter()

  const getBookingStatusMessage = () => {
    switch (status) {
      case 'pending':
        return {
          title: 'Booking Request Pending',
          description: 'Your booking request is awaiting owner approval',
          color: 'bg-amber-50 border-amber-200',
          textColor: 'text-amber-900',
          iconColor: 'text-amber-600',
          icon: Clock,
        }
      case 'accepted':
        return {
          title: 'Booking Accepted',
          description:
            'Your booking has been accepted. Complete payment to confirm.',
          color: 'bg-blue-50 border-blue-200',
          textColor: 'text-blue-900',
          iconColor: 'text-blue-600',
          icon: CheckCircle2,
        }
      case 'payment_confirmed':
      case 'completed':
        return {
          title: 'Already Booked',
          description: 'You have an active booking for this property',
          color: 'bg-emerald-50 border-emerald-200',
          textColor: 'text-emerald-900',
          iconColor: 'text-emerald-600',
          icon: CheckCircle2,
        }
      case 'rejected':
        return {
          title: 'Booking Rejected',
          description: 'Your previous booking request was rejected',
          color: 'bg-rose-50 border-rose-200',
          textColor: 'text-rose-900',
          iconColor: 'text-rose-600',
          icon: XCircle,
        }
      default:
        return null
    }
  }

  const statusInfo = getBookingStatusMessage()

  if (!statusInfo) return null

  const Icon = statusInfo.icon
  const isDesktop = variant === 'desktop'

  return (
    <div
      className={`w-full rounded-lg ${isDesktop ? 'p-5' : 'p-2.5'} border ${statusInfo.color}`}
    >
      <div className={`flex items-start ${isDesktop ? 'gap-3' : 'gap-2'}`}>
        <div
          className={`${isDesktop ? 'w-10 h-10' : 'w-7 h-7'} rounded-full ${statusInfo.color} flex items-center justify-center shrink-0`}
        >
          <Icon
            className={`${isDesktop ? 'w-5 h-5' : 'w-3.5 h-3.5'} ${statusInfo.iconColor}`}
          />
        </div>
        <div className='flex-1 min-w-0'>
          <p
            className={`font-bold ${isDesktop ? 'text-base mb-1' : 'text-xs mb-0.5'} ${statusInfo.textColor} leading-tight`}
          >
            {statusInfo.title}
          </p>
          <p
            className={`${isDesktop ? 'text-sm mb-3' : 'text-[10px] mb-1.5'} ${statusInfo.textColor} opacity-70 leading-snug`}
          >
            {statusInfo.description}
          </p>
          <button
            onClick={() => router.push('/student/bookings')}
            className={`${isDesktop ? 'text-sm' : 'text-[10px]'} font-semibold hover:underline ${statusInfo.iconColor} flex items-center gap-0.5 touch-manipulation`}
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            {isDesktop ? 'View Booking Details' : 'View Details'}
            <ChevronLeft
              className={`${isDesktop ? 'w-4 h-4' : 'w-3 h-3'} rotate-180`}
            />
          </button>
        </div>
      </div>
    </div>
  )
}
