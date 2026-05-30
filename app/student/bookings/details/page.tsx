'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { bookingsApi, paymentApi, reviewsApi } from '@/lib/api'
import { useRazorpay } from '@/lib/use-razorpay'
import { toast } from 'sonner'
import {
  ChevronLeft,
  Calendar,
  Clock,
  CreditCard,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Star,
  MessageSquare,
  Receipt,
  History,
} from 'lucide-react'
import { BookingDetailSkeleton } from '@/components/skeletons/BookingSkeleton'
import { PaymentHistory } from '@/components/PaymentHistory'
import { ReviewModal } from '@/components/ReviewModal'

function BookingDetailsContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { user } = useAuth()
  const { openPayment, isLoading: paymentLoading } = useRazorpay()

  const bookingId = searchParams.get('id') || ''

  const [booking, setBooking] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [cancelling, setCancelling] = useState(false)
  const [refundInfo, setRefundInfo] = useState<any>(null)
  const [showRefundModal, setShowRefundModal] = useState(false)
  const [showReviewModal, setShowReviewModal] = useState(false)

  useEffect(() => {
    if (!bookingId) return
    fetchBookingDetails()
  }, [bookingId])

  const fetchBookingDetails = async () => {
    try {
      setLoading(true)
      const response: any = await bookingsApi.getBookingById(bookingId)
      if (response && response.booking) {
        setBooking(response.booking)
      }
    } catch (error: any) {
      console.error('Failed to fetch booking:', error)
      toast.error('Failed to load booking details')
    } finally {
      setLoading(false)
    }
  }

  const handlePayNow = async () => {
    if (!user || !booking) return

    await openPayment(
      booking._id,
      {
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
      },
      () => {
        toast.success('Payment successful!')
        fetchBookingDetails()
      },
    )
  }

  const handleCancelClick = async () => {
    if (!booking) return

    if (booking.status === 'payment_confirmed') {
      // Show refund policy modal
      try {
        const response: any = await paymentApi.getRefundPolicy(booking._id)
        console.log('Refund policy response:', response)
        setRefundInfo(response)
        setShowRefundModal(true)
      } catch (error) {
        console.error('Failed to fetch refund policy:', error)
        toast.error('Failed to load refund information')
      }
    } else {
      // Direct cancel for pending/accepted bookings
      if (confirm('Are you sure you want to cancel this booking?')) {
        await cancelBooking()
      }
    }
  }

  const cancelBooking = async () => {
    try {
      setCancelling(true)

      if (booking.status === 'payment_confirmed') {
        // Cancel with refund
        await paymentApi.cancelBooking(booking._id)
        toast.success('Booking cancelled', {
          description: 'Refund will be processed as per policy.',
        })
      } else {
        // Cancel request
        await bookingsApi.cancelBooking(booking._id)
        toast.success('Booking request cancelled')
      }

      setShowRefundModal(false)
      router.push('/student/bookings')
    } catch (error: any) {
      console.error('Cancellation failed:', error)
      toast.error('Cancellation failed', {
        description: error?.response?.data?.error || 'Please try again.',
      })
    } finally {
      setCancelling(false)
    }
  }

  const handleSubmitReview = async (rating: number, comment: string) => {
    if (!booking) return

    try {
      await reviewsApi.createReview(
        booking.listing._id,
        rating,
        comment,
      )
      toast.success('Review submitted', {
        description: 'Thank you for your feedback!',
      })
      setShowReviewModal(false)
      fetchBookingDetails()
    } catch (error: any) {
      console.error('Review submission failed:', error)
      toast.error('Failed to submit review', {
        description: error?.response?.data?.error || 'Please try again.',
      })
      throw error
    }
  }

  if (!bookingId) {
    return (
      <div className='bg-white min-h-screen pt-20'>
        <div className='max-w-4xl mx-auto px-6 text-center'>
          <h1 className='text-2xl font-bold mb-4'>Invalid Booking</h1>
          <button
            onClick={() => router.push('/student/bookings')}
            className='text-[#FF385C] font-bold hover:underline'
          >
            Back to Bookings
          </button>
        </div>
      </div>
    )
  }

  const statusConfig: Record<
    string,
    { color: string; icon: any; label: string }
  > = {
    pending: {
      color: 'bg-orange-50 text-orange-600 border-orange-200',
      icon: <Clock className='w-4 h-4' />,
      label: 'Pending',
    },
    accepted: {
      color: 'bg-blue-50 text-blue-600 border-blue-200',
      icon: <CheckCircle2 className='w-4 h-4' />,
      label: 'Accepted',
    },
    payment_confirmed: {
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200',
      icon: <CheckCircle2 className='w-4 h-4' />,
      label: 'Confirmed',
    },
    completed: {
      color: 'bg-slate-50 text-slate-600 border-slate-200',
      icon: <CheckCircle2 className='w-4 h-4' />,
      label: 'Completed',
    },
    cancelled: {
      color: 'bg-red-50 text-red-600 border-red-200',
      icon: <XCircle className='w-4 h-4' />,
      label: 'Cancelled',
    },
    rejected: {
      color: 'bg-red-50 text-red-600 border-red-200',
      icon: <XCircle className='w-4 h-4' />,
      label: 'Rejected',
    },
  }

  return (
    <div className='bg-white min-h-screen pb-32'>
      <div className='max-w-4xl mx-auto px-6 pt-8'>
        {/* Header - Always visible */}
        <div className='flex items-center gap-4 mb-8'>
          <button
            onClick={() => router.push('/student/bookings')}
            className=' hover:bg-slate-50 rounded-full transition-colors'
          >
            <ChevronLeft className='w-6 h-6' />
          </button>
          <div className='flex-1'>
            <h1 className='text-xl font-bold'>Booking Details</h1>
          </div>
          {booking && (
            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold border ${statusConfig[booking.status]?.color || statusConfig.pending.color}`}
            >
              {statusConfig[booking.status]?.icon || statusConfig.pending.icon}
              {statusConfig[booking.status]?.label ||
                statusConfig.pending.label}
            </div>
          )}
        </div>

        {/* Show skeleton or content */}
        {loading ? (
          <BookingDetailSkeleton />
        ) : !booking ? (
          <div className='text-center py-20'>
            <h2 className='text-2xl font-bold mb-4'>Booking Not Found</h2>
            <button
              onClick={() => router.push('/student/bookings')}
              className='text-[#FF385C] font-bold hover:underline'
            >
              Back to Bookings
            </button>
          </div>
        ) : (
          <>
            {/* Listing Info */}
            <div className='border border-outline-variant/10 rounded-2xl p-6 mb-6 shadow-sm'>
              <div className='flex gap-4 mb-4'>
                <div className='w-24 h-24 rounded-xl overflow-hidden shrink-0'>
                  <img
                    src={
                      booking.listing?.photos?.[0] ||
                      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5'
                    }
                    className='w-full h-full object-cover'
                    alt={booking.listing?.title}
                  />
                </div>
                <div className='flex-1'>
                  <h2 className='text-lg font-bold mb-1'>
                    {booking.listing?.title}
                  </h2>
                  <p className='text-sm text-on-surface-variant mb-2'>
                    {booking.listing?.roomType} ·{' '}
                    {booking.listing?.address?.city}
                  </p>
                  <p className='text-sm font-bold text-[#FF385C]'>
                    ₹{booking.listing?.rent?.toLocaleString('en-IN')}/month
                  </p>
                </div>
              </div>

              <div className='grid grid-cols-2 gap-4 pt-4 border-t border-outline-variant/10'>
                <div className='flex items-center gap-3'>
                  <Calendar className='w-5 h-5 text-on-surface-variant' />
                  <div>
                    <p className='text-xs text-on-surface-variant'>
                      Move-in Date
                    </p>
                    <p className='text-sm font-bold'>
                      {new Date(booking.moveInDate).toLocaleDateString(
                        'en-IN',
                        {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        },
                      )}
                    </p>
                  </div>
                </div>
                <div className='flex items-center gap-3'>
                  <Clock className='w-5 h-5 text-on-surface-variant' />
                  <div>
                    <p className='text-xs text-on-surface-variant'>Duration</p>
                    <p className='text-sm font-bold'>
                      {booking.durationMonths} months
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Owner Reply */}
            {booking.ownerReply && (
              <div className='border border-outline-variant/10 rounded-2xl p-6 mb-6 bg-blue-50'>
                <div className='flex items-start gap-3'>
                  <MessageSquare className='w-5 h-5 text-blue-600 shrink-0 mt-0.5' />
                  <div>
                    <p className='font-bold text-sm mb-1'>Message from owner</p>
                    <p className='text-sm text-on-surface-variant'>
                      {booking.ownerReply}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Payment Summary */}
            {booking.paymentId && (
              <div className='border border-outline-variant/10 rounded-2xl p-5 mb-6 bg-slate-50'>
                <h3 className='text-sm font-bold mb-4 tracking-wider opacity-60 uppercase flex items-center gap-2'>
                  <Receipt className='w-4 h-4' />
                  Payment Summary
                </h3>
                <div className='space-y-2.5'>
                  <div className='flex justify-between text-sm'>
                    <span className='text-on-surface-variant'>
                      Monthly Rent
                    </span>
                    <span className='font-semibold'>
                      ₹{booking.listing?.rent?.toLocaleString('en-IN')}/mo
                    </span>
                  </div>
                  <div className='flex justify-between text-sm'>
                    <span className='text-on-surface-variant'>
                      Security Deposit (one-time)
                    </span>
                    <span className='font-semibold'>
                      ₹{booking.listing?.deposit?.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className='flex justify-between text-sm text-on-surface-variant pt-2 border-t border-outline-variant/20'>
                    <span>Duration</span>
                    <span className='font-semibold'>
                      {booking.durationMonths}{' '}
                      {booking.durationMonths === 1 ? 'month' : 'months'}
                    </span>
                  </div>
                  <div className='flex justify-between font-bold pt-3 border-t border-outline-variant/20'>
                    <span>First Payment</span>
                    <span>
                      ₹
                      {(
                        booking.listing?.rent +
                        booking.listing?.deposit
                      ).toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className='flex justify-between text-xs text-on-surface-variant'>
                    <span>
                      Total Commitment ({booking.durationMonths} months)
                    </span>
                    <span className='font-semibold'>
                      ₹
                      {(
                        booking.listing?.rent * booking.durationMonths +
                        booking.listing?.deposit
                      ).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Payment History for this booking */}
            {['accepted', 'payment_confirmed', 'completed'].includes(booking.status) && (
              <div className='mb-8'>
                <h3 className='text-sm font-bold mb-4 tracking-wider opacity-60 uppercase flex items-center gap-2 px-1'>
                  <History className='w-4 h-4' />
                  Payment History
                </h3>
                <PaymentHistory bookingId={booking._id} />
              </div>
            )}

            {/* Actions */}
            <div className='flex flex-col gap-3'>
              {booking.status === 'accepted' && (
                <button
                  onClick={handlePayNow}
                  disabled={paymentLoading}
                  className='w-full py-4 bg-[#FF385C] text-white rounded-xl font-bold hover:brightness-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2'
                >
                  <CreditCard className='w-5 h-5' />
                  {paymentLoading ? 'Processing...' : `Pay ₹${(booking.listing?.rent + booking.listing?.deposit).toLocaleString('en-IN')} Now`}
                </button>
              )}

              {['payment_confirmed', 'completed'].includes(booking.status) &&
                !booking.hasReview && (
                  <button
                    onClick={() => setShowReviewModal(true)}
                    className='w-full py-4 bg-[#222222] text-white rounded-xl font-bold hover:brightness-95 transition-all flex items-center justify-center gap-2'
                  >
                    <Star className='w-5 h-5' />
                    Write a Review
                  </button>
                )}

              {['pending', 'accepted', 'payment_confirmed'].includes(
                booking.status,
              ) && (
                  <button
                    onClick={handleCancelClick}
                    disabled={cancelling}
                    className='w-full py-4 border-2 border-red-500 text-red-500 rounded-xl font-bold hover:bg-red-50 transition-all disabled:opacity-50 flex items-center justify-center gap-2'
                  >
                    <XCircle className='w-5 h-5' />
                    {cancelling ? 'Cancelling...' : 'Cancel Booking'}
                  </button>
                )}
            </div>
          </>
        )}
      </div>

      {/* Refund Policy Modal/Drawer */}
      {showRefundModal && refundInfo && (
        <div
          className='fixed inset-0 z-[200] flex items-end md:items-center justify-center bg-black/50 backdrop-blur-sm md:p-4'
          onClick={() => setShowRefundModal(false)}
        >
          <div
            className='bg-white rounded-t-3xl md:rounded-2xl w-full max-w-md md:max-w-lg'
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile drag handle */}
            <div className='md:hidden pt-2 pb-1 flex justify-center'>
              <div className='w-10 h-1 bg-outline-variant/30 rounded-full' />
            </div>

            <div className='p-6'>
              <h2 className='text-xl font-bold mb-4'>Cancellation & Refund</h2>
              <div className='mb-6'>
                <div className='flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded mb-4'>
                  <AlertCircle className='w-5 h-5 text-blue-600 shrink-0 mt-0.5' />
                  <div className='text-sm text-blue-900'>
                    <p className='font-semibold mb-2'>Refund Policy</p>
                    <p>{refundInfo.policyDescription}</p>
                  </div>
                </div>
                <div className='space-y-2'>
                  <div className='flex justify-between'>
                    <span className='text-sm'>Refund Amount:</span>
                    <span className='font-bold'>
                      ₹
                      {refundInfo.refundAmount !== undefined
                        ? refundInfo.refundAmount.toLocaleString('en-IN')
                        : '0'}
                    </span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-sm'>Refund Percentage:</span>
                    <span className='font-bold'>
                      {refundInfo.refundPercentage !== undefined
                        ? refundInfo.refundPercentage
                        : 0}
                      %
                    </span>
                  </div>
                </div>
              </div>
              <div className='flex flex-col-reverse md:flex-row gap-3'>
                <button
                  onClick={() => setShowRefundModal(false)}
                  className='flex-1 py-3 border border-outline-variant/30 rounded-lg font-bold hover:bg-gray-50 transition-colors'
                >
                  Keep Booking
                </button>
                <button
                  onClick={cancelBooking}
                  disabled={cancelling}
                  className='flex-1 py-3 bg-red-500 text-white rounded-lg font-bold hover:brightness-95 disabled:opacity-50 transition-all'
                >
                  {cancelling ? 'Processing...' : 'Confirm Cancel'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Review Modal */}
      <ReviewModal
        isOpen={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        onSubmit={handleSubmitReview}
        initialRating={5}
        initialComment=''
        title='Write a Review'
        submitButtonText='Submit Review'
      />
    </div>
  )
}

export default function BookingDetailsPage() {
  return (
    <Suspense
      fallback={
        <div className='min-h-screen bg-white flex items-center justify-center'>
          <div className='w-8 h-8 border-4 border-[#FF385C]/20 border-t-[#FF385C] rounded-full animate-spin'></div>
        </div>
      }
    >
      <BookingDetailsContent />
    </Suspense>
  )
}
