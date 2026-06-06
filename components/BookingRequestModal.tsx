'use client'

import { useState, useEffect } from 'react'
import { X, Calendar, Clock, Home, CreditCard, Info } from 'lucide-react'
import { roomsApi } from '@/lib/api'

interface BookingRequestModalProps {
  isOpen: boolean
  onClose: () => void
  listing: any
  onConfirm: (
    moveInDate: string,
    durationMonths: number,
    message: string,
  ) => void
  loading?: boolean
}

export function BookingRequestModal({
  isOpen,
  onClose,
  listing,
  onConfirm,
  loading = false,
}: BookingRequestModalProps) {
  const [moveInDate, setMoveInDate] = useState('')
  const [durationMonths, setDurationMonths] = useState(3)
  const [message, setMessage] = useState('')
  const [bookedDates, setBookedDates] = useState<Array<{ start: string; end: string }>>([])
  const [earliestAvailable, setEarliestAvailable] = useState<string | null>(null)
  const [loadingDates, setLoadingDates] = useState(false)

  // Fetch booked dates when modal opens
  useEffect(() => {
    if (isOpen && listing?._id) {
      setLoadingDates(true)
      roomsApi
        .getListingBookedDates(listing._id)
        .then((data) => {
          setBookedDates(data.bookedRanges || [])
          setEarliestAvailable(data.earliestAvailable || null)
        })
        .catch((error) => {
          console.error('Failed to fetch booked dates:', error)
          setBookedDates([])
          setEarliestAvailable(null)
        })
        .finally(() => {
          setLoadingDates(false)
        })
    }
  }, [isOpen, listing?._id])

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setMoveInDate('')
      setDurationMonths(3)
      setMessage('')
    }
  }, [isOpen])

  // Calculate minimum date based on earliest available or tomorrow
  const calculateMinDate = () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)

    if (earliestAvailable) {
      const earliestDate = new Date(earliestAvailable)
      return earliestDate > tomorrow ? earliestDate : tomorrow
    }

    return tomorrow
  }

  const minDate = calculateMinDate()
  const minDateStr = minDate.toISOString().split('T')[0]

  // Check if a date range conflicts with booked dates
  const isDateRangeBooked = (startDate: Date, endDate: Date): boolean => {
    return bookedDates.some((range) => {
      const bookedStart = new Date(range.start)
      const bookedEnd = new Date(range.end)
      // Check if ranges overlap
      return startDate < bookedEnd && bookedStart < endDate
    })
  }

  // Validate selected date
  const validateMoveInDate = (dateStr: string): boolean => {
    if (!dateStr) return true // Don't show error if empty

    const selectedDate = new Date(dateStr)
    const endDate = new Date(selectedDate)
    endDate.setMonth(endDate.getMonth() + durationMonths)

    return !isDateRangeBooked(selectedDate, endDate)
  }

  const monthlyRent = listing?.price || listing?.rent || 0
  const deposit = listing?.deposit || 0
  const firstPayment = monthlyRent + deposit
  const totalCommitment = monthlyRent * durationMonths + deposit

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!moveInDate) return
    onConfirm(moveInDate, durationMonths, message)
  }

  if (!isOpen) return null

  return (
    <div
      className='fixed inset-0 z-[200] flex items-end md:items-center justify-center bg-black/50 backdrop-blur-sm md:p-4'
      onClick={(e) => {
        if (e.target === e.currentTarget && !loading) onClose()
      }}
    >
      <div
        className='bg-white rounded-t-3xl md:rounded-2xl w-full max-w-2xl max-h-[92vh] md:max-h-[90vh] flex flex-col shadow-2xl animate-slide-up md:animate-none'
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Drag Indicator */}
        <div className='md:hidden pt-2 pb-1 flex justify-center bg-white z-10 rounded-t-3xl'>
          <div className='w-10 h-1 bg-outline-variant/30 rounded-full' />
        </div>

        {/* Header */}
        <div className='bg-white border-b border-outline-variant/10 px-4 md:px-6 py-3 md:py-4 flex justify-between items-center z-10 md:rounded-t-2xl'>
          <h2 className='text-lg md:text-xl font-bold'>Request to book</h2>
          <button
            onClick={onClose}
            disabled={loading}
            className='p-2 hover:bg-slate-50 rounded-full transition-colors'
          >
            <X className='w-5 h-5' />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className='flex flex-col flex-1 overflow-hidden'
        >
          <div className='flex-1 overflow-y-auto p-4 md:p-6'>
            {/* Listing Preview */}
            <div className='flex gap-3 md:gap-4 p-3 md:p-4 bg-slate-50 rounded-xl mb-4 md:mb-6'>
              <div className='w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden shrink-0'>
                <img
                  src={
                    listing?.images?.[0] ||
                    listing?.photos?.[0] ||
                    'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=100&w=200'
                  }
                  className='w-full h-full object-cover'
                  alt={listing?.title}
                />
              </div>
              <div className='flex-1 min-w-0'>
                <p className='text-xs md:text-sm font-bold line-clamp-2'>
                  {listing?.title}
                </p>
                <p className='text-[10px] md:text-xs text-on-surface-variant mt-1'>
                  {listing?.roomType || listing?.type} ·{' '}
                  {listing?.address?.city || listing?.location}
                </p>
                <p className='text-xs md:text-sm font-bold mt-1.5 md:mt-2'>
                  ₹{(listing?.price || listing?.rent)?.toLocaleString('en-IN')}
                  /month
                </p>
              </div>
            </div>

            {/* Move-in Date */}
            <div className='mb-4 md:mb-6'>
              <label className='block text-xs md:text-sm font-bold mb-2'>
                Move-in date <span className='text-red-500'>*</span>
              </label>
              <div className='relative'>
                <Calendar className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-on-surface-variant opacity-50' />
                <input
                  type='date'
                  value={moveInDate}
                  onChange={(e) => setMoveInDate(e.target.value)}
                  min={minDateStr}
                  required
                  className={`w-full pl-10 md:pl-11 pr-3 md:pr-4 py-2.5 md:py-3 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent ${
                    moveInDate && !validateMoveInDate(moveInDate)
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-outline-variant/30 focus:ring-[#FF385C]'
                  }`}
                />
              </div>
              {loadingDates && (
                <p className='text-xs text-blue-600 mt-1'>
                  Checking availability...
                </p>
              )}
              {earliestAvailable && new Date(earliestAvailable) > new Date() && (
                <p className='text-xs text-amber-600 mt-1'>
                  This property is currently booked. Earliest available:{' '}
                  {new Date(earliestAvailable).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                  })}
                </p>
              )}
              {moveInDate && !validateMoveInDate(moveInDate) && (
                <p className='text-xs text-red-500 mt-1'>
                  This date range conflicts with existing bookings. Please choose a different date or duration.
                </p>
              )}
            </div>

            {/* Duration */}
            <div className='mb-4 md:mb-6'>
              <label className='block text-xs md:text-sm font-bold mb-2'>
                Stay duration <span className='text-red-500'>*</span>
              </label>
              <div className='grid grid-cols-4 gap-2'>
                {[1, 3, 6, 12].map((months) => (
                  <button
                    key={months}
                    type='button'
                    onClick={() => setDurationMonths(months)}
                    className={`px-3 md:px-5 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-bold border transition-all ${
                      durationMonths === months
                        ? 'bg-[#222222] text-white border-transparent'
                        : 'bg-white border-outline-variant/30 text-on-surface-variant hover:border-black'
                    }`}
                  >
                    {months} {months === 1 ? 'month' : 'months'}
                  </button>
                ))}
              </div>
              {moveInDate && !validateMoveInDate(moveInDate) && (
                <p className='text-xs text-amber-600 mt-2'>
                  Try selecting a different duration to find available dates
                </p>
              )}
            </div>

            {/* Message (Optional) */}
            <div className='mb-4 md:mb-6'>
              <label className='block text-xs md:text-sm font-bold mb-2'>
                Message to owner (optional)
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={500}
                rows={3}
                placeholder="Introduce yourself and explain why you're interested..."
                className='w-full px-3 md:px-4 py-2.5 md:py-3 text-sm border border-outline-variant/30 rounded focus:outline-none focus:ring-2 focus:ring-[#FF385C] focus:border-transparent resize-none'
              />
              <p className='text-[10px] md:text-xs text-on-surface-variant mt-1'>
                {message.length}/500 characters
              </p>
            </div>

            {/* Price Breakdown */}
            <div className='border border-outline-variant/10 rounded p-4 md:p-5 mb-4 md:mb-6 bg-slate-50'>
              <h3 className='text-xs md:text-sm font-bold mb-3 md:mb-4 tracking-wider opacity-60 uppercase'>
                Payment Details
              </h3>
              <div className='space-y-2.5 md:space-y-3'>
                <div className='flex justify-between text-xs md:text-sm'>
                  <span className='text-on-surface-variant'>Monthly Rent</span>
                  <span className='font-semibold'>
                    ₹{monthlyRent.toLocaleString('en-IN')}/mo
                  </span>
                </div>
                <div className='flex justify-between text-xs md:text-sm'>
                  <span className='text-on-surface-variant'>
                    Security Deposit (one-time)
                  </span>
                  <span className='font-semibold'>
                    ₹{deposit.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className='flex justify-between text-xs md:text-sm text-on-surface-variant pt-2 border-t border-outline-variant/20'>
                  <span>Duration</span>
                  <span className='font-semibold'>
                    {durationMonths} {durationMonths === 1 ? 'month' : 'months'}
                  </span>
                </div>
                <div className='flex justify-between font-bold pt-2.5 md:pt-3 border-t border-outline-variant/20 text-sm md:text-base'>
                  <span>First Payment</span>
                  <span>₹{firstPayment.toLocaleString('en-IN')}</span>
                </div>
                <div className='flex justify-between text-xs text-on-surface-variant'>
                  <span>Total Commitment ({durationMonths} months)</span>
                  <span className='font-semibold'>
                    ₹{totalCommitment.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>

            {/* Info Box */}
            <div className='flex gap-2.5 md:gap-3 p-3 md:p-4 bg-blue-50 border border-blue-200 rounded'>
              <Info className='w-4 h-4 md:w-5 md:h-5 text-blue-600 shrink-0 mt-0.5' />
              <div className='text-xs md:text-sm text-blue-900'>
                <p className='font-semibold mb-1'>Monthly Payment Plan</p>
                <p className='text-blue-700'>
                  You'll pay the first month's rent and deposit
                  after the owner accepts. Subsequent months will be charged
                  monthly. You can cancel anytime before payment.
                </p>
              </div>
            </div>
          </div>

          {/* Sticky Actions at Bottom */}
          <div className='sticky bottom-0 bg-white border-t border-outline-variant/10 p-4 md:p-6 pb-safe'>
            <div className='flex gap-2.5 md:gap-3'>
              <button
                type='button'
                onClick={onClose}
                disabled={loading}
                className='flex-1 px-4 md:px-6 py-2.5 md:py-3 text-sm md:text-base border border-outline-variant/30 rounded-lg font-bold text-on-surface hover:bg-slate-50 transition-colors disabled:opacity-50'
              >
                Cancel
              </button>
              <button
                type='submit'
                disabled={loading || !moveInDate || !validateMoveInDate(moveInDate)}
                className='flex-1 px-4 md:px-6 py-2.5 md:py-3 text-sm md:text-base bg-[#FF385C] text-white rounded-lg font-bold hover:brightness-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95'
              >
                {loading ? 'Sending...' : 'Request to book'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
