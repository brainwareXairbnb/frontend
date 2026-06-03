'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  Calendar,
  MapPin,
  Clock,
  Check,
  X,
  Search,
  Filter,
  ChevronRight,
  GraduationCap,
  User as UserIcon,
  IndianRupee,
  Mail,
  Phone,
} from 'lucide-react'
import { bookingsApi } from '@/lib/api'
import { toast } from 'sonner'
import { useAuth } from '@/lib/auth-context'
import { AuthPrompt } from '@/components/AuthPrompt'
import { Booking } from '@/lib/types'

export default function OwnerBookingsPage() {
  const { isAuthenticated, user } = useAuth()
  const router = useRouter()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [processingId, setProcessingId] = useState<string | null>(null)
  const [showReplyModal, setShowReplyModal] = useState<Booking | null>(null)
  const [replyMessage, setReplyMessage] = useState('')
  const [showFilterDropdown, setShowFilterDropdown] = useState(false)

  useEffect(() => {
    if (isAuthenticated && user?.role === 'owner') {
      fetchBookings()
    }
  }, [isAuthenticated, user])

  // Close filter dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (showFilterDropdown && !target.closest('.filter-dropdown-container')) {
        setShowFilterDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showFilterDropdown])

  const fetchBookings = async () => {
    try {
      setLoading(true)
      const response = await bookingsApi.getOwnerBookings()
      setBookings(response.bookings || [])
    } catch (error: any) {
      console.error('Failed to fetch bookings:', error)
      toast.error('Failed to load bookings')
    } finally {
      setLoading(false)
    }
  }

  const handleAccept = async (bookingId: string) => {
    try {
      setProcessingId(bookingId)
      await bookingsApi.acceptBooking(bookingId, replyMessage || undefined)
      toast.success('Booking accepted!')
      setShowReplyModal(null)
      setReplyMessage('')
      fetchBookings()
    } catch (error: any) {
      console.error('Failed to accept booking:', error)
      toast.error(error?.response?.data?.error || 'Failed to accept booking')
    } finally {
      setProcessingId(null)
    }
  }

  const handleReject = async (bookingId: string, reason: string) => {
    if (!reason.trim()) {
      toast.error('Please provide a reason for rejection')
      return
    }

    try {
      setProcessingId(bookingId)
      await bookingsApi.rejectBooking(bookingId, reason)
      toast.success('Booking rejected')
      setShowReplyModal(null)
      setReplyMessage('')
      fetchBookings()
    } catch (error: any) {
      console.error('Failed to reject booking:', error)
      toast.error(error?.response?.data?.error || 'Failed to reject booking')
    } finally {
      setProcessingId(null)
    }
  }

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.student?.name
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      booking.listing?.title
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      false

    const matchesStatus =
      statusFilter === 'all' || booking.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const stats = {
    pending: bookings.filter((b) => b.status === 'pending').length,
    accepted: bookings.filter((b) => b.status === 'accepted').length,
    confirmed: bookings.filter((b) => b.status === 'payment_confirmed').length,
  }

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      accepted: 'bg-blue-100 text-blue-700 border-blue-200',
      rejected: 'bg-red-100 text-red-700 border-red-200',
      cancelled: 'bg-gray-100 text-gray-700 border-gray-200',
      payment_confirmed: 'bg-green-100 text-green-700 border-green-200',
    }

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${styles[status as keyof typeof styles]}`}
      >
        {status === 'payment_confirmed'
          ? 'Confirmed'
          : status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    )
  }

  if (!isAuthenticated || user?.role !== 'owner') {
    return (
      <div className="min-h-[calc(100dvh-5rem)] flex items-center justify-center p-4">
        <AuthPrompt
          title="Owner Access Required"
          description="Please login with an owner account to view bookings."
        />
      </div>
    )
  }

  if (loading) {
    return (
      <div className='flex items-center justify-center py-20'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF385C]' />
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gray-50 pb-24 md:pb-6'>
      {/* Stats Cards */}
      <div className='bg-white border-b border-outline-variant/10 px-4 md:px-8 py-6'>
        <div className='grid grid-cols-3 gap-3 md:gap-6'>
          <button
            onClick={() => setStatusFilter('pending')}
            className={`p-3 md:p-4 rounded border transition-all ${
              statusFilter === 'pending'
                ? 'bg-yellow-50 border-yellow-200'
                : 'bg-white border-outline-variant/10 hover:bg-gray-50'
            }`}
          >
            <div className='text-2xl md:text-3xl font-bold text-yellow-600'>
              {stats.pending}
            </div>
            <div className='text-xs md:text-sm text-on-surface-variant mt-1'>
              Pending
            </div>
          </button>

          <button
            onClick={() => setStatusFilter('accepted')}
            className={`p-3 md:p-4 rounded border transition-all ${
              statusFilter === 'accepted'
                ? 'bg-blue-50 border-blue-200'
                : 'bg-white border-outline-variant/10 hover:bg-gray-50'
            }`}
          >
            <div className='text-2xl md:text-3xl font-bold text-blue-600'>
              {stats.accepted}
            </div>
            <div className='text-xs md:text-sm text-on-surface-variant mt-1'>
              Accepted
            </div>
          </button>

          <button
            onClick={() => setStatusFilter('payment_confirmed')}
            className={`p-3 md:p-4 rounded border transition-all ${
              statusFilter === 'payment_confirmed'
                ? 'bg-green-50 border-green-200'
                : 'bg-white border-outline-variant/10 hover:bg-gray-50'
            }`}
          >
            <div className='text-2xl md:text-3xl font-bold text-green-600'>
              {stats.confirmed}
            </div>
            <div className='text-xs md:text-sm text-on-surface-variant mt-1'>
              Confirmed
            </div>
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className='bg-white border-b border-outline-variant/10 px-4 md:px-8 py-4'>
        <div className='flex gap-3'>
          <div className='flex-1 relative'>
            <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant' />
            <input
              type='text'
              placeholder='Search bookings...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='w-full pl-10 pr-4 py-2.5 border border-outline-variant/30 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF385C] focus:border-transparent'
            />
          </div>
          <div className='relative filter-dropdown-container'>
            <button
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
              className='px-4 py-2.5 border border-outline-variant/30 rounded-lg text-sm font-bold hover:bg-gray-50 transition-colors flex items-center gap-2'
            >
              <Filter className='w-4 h-4' />
              <span className='hidden md:inline'>
                {statusFilter === 'all'
                  ? 'All'
                  : statusFilter === 'payment_confirmed'
                    ? 'Confirmed'
                    : statusFilter.charAt(0).toUpperCase() +
                      statusFilter.slice(1)}
              </span>
            </button>

            {showFilterDropdown && (
              <div className='absolute right-0 top-full mt-2 w-48 bg-white rounded shadow-xl border border-outline-variant/20 py-2 z-50'>
                <button
                  onClick={() => {
                    setStatusFilter('all')
                    setShowFilterDropdown(false)
                  }}
                  className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors ${
                    statusFilter === 'all' ? 'font-bold text-[#FF385C]' : ''
                  }`}
                >
                  All Bookings
                </button>
                <button
                  onClick={() => {
                    setStatusFilter('pending')
                    setShowFilterDropdown(false)
                  }}
                  className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors ${
                    statusFilter === 'pending' ? 'font-bold text-[#FF385C]' : ''
                  }`}
                >
                  Pending
                </button>
                <button
                  onClick={() => {
                    setStatusFilter('accepted')
                    setShowFilterDropdown(false)
                  }}
                  className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors ${
                    statusFilter === 'accepted'
                      ? 'font-bold text-[#FF385C]'
                      : ''
                  }`}
                >
                  Accepted
                </button>
                <button
                  onClick={() => {
                    setStatusFilter('payment_confirmed')
                    setShowFilterDropdown(false)
                  }}
                  className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors ${
                    statusFilter === 'payment_confirmed'
                      ? 'font-bold text-[#FF385C]'
                      : ''
                  }`}
                >
                  Confirmed
                </button>
                <button
                  onClick={() => {
                    setStatusFilter('rejected')
                    setShowFilterDropdown(false)
                  }}
                  className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors ${
                    statusFilter === 'rejected'
                      ? 'font-bold text-[#FF385C]'
                      : ''
                  }`}
                >
                  Rejected
                </button>
                <button
                  onClick={() => {
                    setStatusFilter('cancelled')
                    setShowFilterDropdown(false)
                  }}
                  className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors ${
                    statusFilter === 'cancelled'
                      ? 'font-bold text-[#FF385C]'
                      : ''
                  }`}
                >
                  Cancelled
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bookings List */}
      <div className='px-4 md:px-8 py-6 space-y-4'>
        {filteredBookings.length === 0 ? (
          <div className='text-center py-12 bg-white rounded-xl border border-outline-variant/10'>
            <Calendar className='w-12 h-12 mx-auto text-gray-300 mb-3' />
            <p className='text-gray-500'>No bookings found</p>
          </div>
        ) : (
          filteredBookings.map((booking) => (
            <div
              key={booking._id}
              className='bg-white rounded border border-outline-variant/10 overflow-hidden hover:shadow-lg transition-shadow'
            >
              {/* Header */}
              <div className='flex items-start gap-3 p-4 border-b border-outline-variant/10'>
                <div className='w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white shrink-0'>
                  <UserIcon className='w-6 h-6' />
                </div>
                <div className='flex-1 min-w-0'>
                  <div className='flex items-center gap-2 mb-1 flex-wrap'>
                    <h3 className='font-bold text-sm md:text-base truncate'>
                      {booking.student?.name || 'Unknown Student'}
                    </h3>
                    {getStatusBadge(booking.status)}
                  </div>
                  <p className='text-xs text-on-surface-variant'>
                    Applied{' '}
                    {new Date(booking.createdAt).toLocaleDateString('en-IN')}
                  </p>
                </div>
              </div>

              {/* Property Info */}
              <div className='p-4 bg-gray-50 border-b border-outline-variant/10'>
                <div className='flex gap-3'>
                  <div className='w-16 h-16 rounded-lg overflow-hidden shrink-0'>
                    <img
                      src={
                        booking.listing?.photos?.[0] ||
                        'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=100&w=200'
                      }
                      alt={booking.listing?.title || 'Property'}
                      className='w-full h-full object-cover'
                    />
                  </div>
                  <div className='flex-1 min-w-0'>
                    <p className='font-bold text-sm line-clamp-1'>
                      {booking.listing?.title || 'Unknown Property'}
                    </p>
                    <div className='flex items-center gap-1 text-xs text-on-surface-variant mt-1'>
                      <MapPin className='w-3 h-3' />
                      <span className='truncate'>
                        {booking.listing?.address?.street || 'N/A'}
                      </span>
                    </div>
                    <p className='text-sm font-bold text-[#FF385C] mt-1'>
                      ₹{booking.listing?.rent?.toLocaleString('en-IN') || 0}
                      /month
                    </p>
                  </div>
                </div>
              </div>

              {/* Booking Details */}
              <div className='p-4 space-y-3'>
                <div className='grid grid-cols-2 gap-3 text-sm'>
                  <div className='flex items-center gap-2'>
                    <Calendar className='w-4 h-4 text-on-surface-variant' />
                    <div>
                      <p className='text-xs text-on-surface-variant'>
                        Move-in Date
                      </p>
                      <p className='font-semibold'>
                        {new Date(booking.moveInDate).toLocaleDateString(
                          'en-IN',
                        )}
                      </p>
                    </div>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Clock className='w-4 h-4 text-on-surface-variant' />
                    <div>
                      <p className='text-xs text-on-surface-variant'>
                        Duration
                      </p>
                      <p className='font-semibold'>
                        {booking.durationMonths} months
                      </p>
                    </div>
                  </div>
                </div>

                {booking.message && (
                  <div className='p-3 bg-blue-50 rounded-lg border border-blue-100'>
                    <p className='text-xs font-semibold text-blue-900 mb-1'>
                      Message from student:
                    </p>
                    <p className='text-xs text-blue-800'>{booking.message}</p>
                  </div>
                )}

                {/* Contact Info */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-2 text-xs'>
                  <div className='flex items-center gap-2 p-2 bg-gray-50 rounded'>
                    <Mail className='w-3 h-3 text-on-surface-variant' />
                    <span className='truncate'>
                      {booking.student?.email || 'N/A'}
                    </span>
                  </div>
                  <div className='flex items-center gap-2 p-2 bg-gray-50 rounded'>
                    <Phone className='w-3 h-3 text-on-surface-variant' />
                    <span>{booking.student?.phone || 'N/A'}</span>
                  </div>
                </div>

                {/* Actions */}
                {booking.status === 'pending' && (
                  <div className='flex gap-2 pt-2'>
                    <button
                      onClick={() => setShowReplyModal(booking)}
                      disabled={processingId === booking._id}
                      className='flex-1 px-4 py-2.5 bg-[#FF385C] text-white rounded-lg text-sm font-bold hover:brightness-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2'
                    >
                      <Check className='w-4 h-4' />
                      Accept
                    </button>
                    <button
                      onClick={() => {
                        setShowReplyModal(booking)
                        setReplyMessage('')
                      }}
                      disabled={processingId === booking._id}
                      className='flex-1 px-4 py-2.5 border border-outline-variant/30 rounded-lg text-sm font-bold text-error hover:bg-error/5 transition-all disabled:opacity-50 flex items-center justify-center gap-2'
                    >
                      <X className='w-4 h-4' />
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Reply Modal */}
      {showReplyModal && (
        <div
          className='fixed inset-0 z-[200] flex items-end md:items-center justify-center bg-black/50 backdrop-blur-sm p-4'
          onClick={() => setShowReplyModal(null)}
        >
          <div
            className='bg-white rounded-t-3xl md:rounded-2xl w-full max-w-lg'
            onClick={(e) => e.stopPropagation()}
          >
            <div className='md:hidden pt-2 pb-1 flex justify-center'>
              <div className='w-10 h-1 bg-outline-variant/30 rounded-full' />
            </div>
            <div className='p-6'>
              <h3 className='text-lg font-bold mb-4'>
                {replyMessage ? 'Reject Booking' : 'Accept Booking'}
              </h3>
              <div className='mb-4'>
                <label className='block text-sm font-semibold mb-2'>
                  Message to Student (optional)
                </label>
                <textarea
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  placeholder='Add a message...'
                  rows={4}
                  className='w-full px-4 py-3 border border-outline-variant/30 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#FF385C] focus:border-transparent resize-none'
                />
              </div>
              <div className='flex gap-3'>
                <button
                  onClick={() => setShowReplyModal(null)}
                  className='flex-1 px-4 py-2.5 border border-outline-variant/30 rounded-lg font-bold hover:bg-gray-50 transition-colors'
                >
                  Cancel
                </button>
                <button
                  onClick={() =>
                    replyMessage && replyMessage.trim()
                      ? handleReject(showReplyModal._id, replyMessage)
                      : handleAccept(showReplyModal._id)
                  }
                  disabled={processingId === showReplyModal._id}
                  className='flex-1 px-4 py-2.5 bg-[#FF385C] text-white rounded-lg font-bold hover:brightness-95 transition-all disabled:opacity-50'
                >
                  {processingId === showReplyModal._id
                    ? 'Processing...'
                    : replyMessage && replyMessage.trim()
                      ? 'Reject'
                      : 'Accept'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
