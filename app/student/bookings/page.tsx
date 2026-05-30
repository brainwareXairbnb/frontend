'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { bookingsApi } from '@/lib/api'
import { useRazorpay } from '@/lib/use-razorpay'
import {
  Calendar,
  MapPin,
  Info,
  CreditCard,
  XCircle,
  Clock,
  Home,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Search,
  Filter,
  Heart,
} from 'lucide-react'
import { toast } from 'sonner'
import { BookingSkeleton } from '@/components/skeletons/BookingSkeleton'

export default function StudentBookingsPage() {
  const router = useRouter()
  const { user } = useAuth()
  const { openPayment, isLoading: paymentLoading } = useRazorpay()
  const [activeTab, setActiveTab] = useState<
    'all' | 'pending' | 'confirmed' | 'past'
  >('all')
  const [bookings, setBookings] = useState<any[]>([])
  const [fetching, setFetching] = useState(true)
  const [error, setError] = useState<any>(null)
  const [refreshKey, setRefreshKey] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const fetchBookings = async () => {
      setFetching(true)
      setError(null)
      try {
        const response: any = await bookingsApi.getStudentBookings()
        if (response && response.bookings) {
          setBookings(response.bookings)
        }
      } catch (err: any) {
        console.error('Failed to fetch bookings:', err)
        setError({
          type: 'generic',
          message: 'Failed to load bookings. Please try again later.',
        })
      } finally {
        setFetching(false)
      }
    }
    fetchBookings()
  }, [refreshKey])

  const handlePayNow = async (booking: any) => {
    if (!user) return

    await openPayment(
      booking._id,
      {
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
      },
      () => {
        setRefreshKey((prev) => prev + 1)
        router.push(`/student/bookings/details?id=${booking._id}`)
      },
    )
  }

  const handleCancelBooking = async (bookingId: string) => {
    if (!confirm('Are you sure you want to cancel this booking request?'))
      return

    try {
      await bookingsApi.cancelBooking(bookingId)
      toast.success('Booking cancelled', {
        description: 'Your booking request has been cancelled.',
      })
      setRefreshKey((prev) => prev + 1)
    } catch (error: any) {
      console.error('Failed to cancel booking:', error)
      toast.error('Cancellation failed', {
        description: error?.response?.data?.error || 'Please try again.',
      })
    }
  }

  // Prepare stats (use empty arrays when fetching)
  const stats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === 'pending').length,
    confirmed: bookings.filter((b) =>
      ['accepted', 'payment_confirmed'].includes(b.status),
    ).length,
    past: bookings.filter((b) =>
      ['cancelled', 'rejected', 'completed'].includes(b.status),
    ).length,
  }

  // Filter bookings based on tab
  let filteredBookings = bookings
  if (!fetching) {
    if (activeTab === 'pending') {
      filteredBookings = bookings.filter((b) => b.status === 'pending')
    } else if (activeTab === 'confirmed') {
      filteredBookings = bookings.filter((b) =>
        ['accepted', 'payment_confirmed'].includes(b.status),
      )
    } else if (activeTab === 'past') {
      filteredBookings = bookings.filter((b) =>
        ['cancelled', 'rejected', 'completed'].includes(b.status),
      )
    }

    // Apply search filter
    if (searchQuery) {
      filteredBookings = filteredBookings.filter(
        (b) =>
          b.listing?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          b.listing?.address?.city
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()),
      )
    }
  }

  const statusConfig: Record<
    string,
    { color: string; icon: any; label: string; bg: string }
  > = {
    pending: {
      color: 'text-orange-600',
      icon: Clock,
      label: 'Pending',
      bg: 'bg-orange-50 border-orange-200',
    },
    accepted: {
      color: 'text-blue-600',
      icon: CheckCircle2,
      label: 'Accepted',
      bg: 'bg-blue-50 border-blue-200',
    },
    payment_confirmed: {
      color: 'text-emerald-600',
      icon: CheckCircle2,
      label: 'Confirmed',
      bg: 'bg-emerald-50 border-emerald-200',
    },
    completed: {
      color: 'text-slate-600',
      icon: CheckCircle2,
      label: 'Completed',
      bg: 'bg-slate-50 border-slate-200',
    },
    cancelled: {
      color: 'text-red-600',
      icon: XCircle,
      label: 'Cancelled',
      bg: 'bg-red-50 border-red-200',
    },
    rejected: {
      color: 'text-red-600',
      icon: AlertCircle,
      label: 'Rejected',
      bg: 'bg-red-50 border-red-200',
    },
  }

  return (
    <div className='bg-slate-50 min-h-screen'>
      {/* Airbnb Style Header - Always visible */}
      <div className='sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-black/5'>
        <div className='max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6'>
          <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6'>
            {/* Left */}
            <div>
              <h1 className='text-3xl md:text-5xl font-semibold tracking-tight text-neutral-900'>
                My Bookings
              </h1>
              <p className='mt-2 text-sm md:text-base text-neutral-500'>
                Manage your stays, payments and reservations
              </p>
            </div>

            {/* Right */}
            <button
              onClick={() => router.push('/')}
              className='h-11 md:h-12 px-6 rounded-2xl bg-[#FF385C] text-white font-semibold hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-[#FF385C]/20'
            >
              + New Booking
            </button>
          </div>

          {/* Search + Filters */}
          <div className='mt-8 flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between'>
            {/* Search */}
            <div className='flex-1 max-w-2xl'>
              <div className='bg-white rounded-full border border-black/5 shadow-lg px-5 h-12 md:h-16 flex items-center gap-4 hover:shadow-xl transition-all'>
                <Search className='w-5 h-5 text-neutral-400' />

                <input
                  type='text'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder='Search properties, city or location'
                  className='flex-1 bg-transparent outline-none text-sm md:text-base placeholder:text-neutral-400'
                />
              </div>
            </div>

            {/* Tabs */}
            <div className='flex gap-3 overflow-x-auto scrollbar-hide pb-1'>
              {[
                {
                  label: 'All',
                  value: stats.total,
                  key: 'all',
                },
                {
                  label: 'Pending',
                  value: stats.pending,
                  key: 'pending',
                },
                {
                  label: 'Confirmed',
                  value: stats.confirmed,
                  key: 'confirmed',
                },
                {
                  label: 'Past',
                  value: stats.past,
                  key: 'past',
                },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`
                px-5 h-11 md:h-12 rounded-full whitespace-nowrap transition-all font-medium text-sm
                ${activeTab === tab.key
                      ? 'bg-black text-white shadow-lg'
                      : 'bg-white text-neutral-700 border border-black/5 hover:bg-neutral-100'
                    }
              `}
                >
                  <span>{tab.label}</span>
                  <span className='ml-2 opacity-70'>{tab.value}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='min-h-screen bg-[#f7f7f7]'>
        <div className='max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8'>
          {/* Show skeleton while fetching */}
          {fetching ? (
            <BookingSkeleton />
          ) : error?.type === 'generic' ? (
            <div className='max-w-lg mx-auto bg-white rounded-[32px] shadow-sm p-10 text-center'>
              <div className='w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-5'>
                <AlertCircle className='w-10 h-10 text-red-500' />
              </div>

              <h3 className='text-2xl font-semibold tracking-tight text-neutral-900'>
                Something went wrong
              </h3>

              <p className='mt-3 text-neutral-500'>{error.message}</p>

              <button
                onClick={() => setRefreshKey((prev) => prev + 1)}
                className='mt-6 h-11 md:h-12 px-6 rounded-2xl bg-[#FF385C] text-white font-semibold hover:scale-[1.02] transition-all'
              >
                Retry
              </button>
            </div>
          ) : filteredBookings.length > 0 ? (
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-8'>
              {filteredBookings.map((booking) => {
                const listing = booking.listing

                const images = listing?.photos?.length
                  ? listing.photos
                  : [
                    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=2340',
                  ]

                const location = listing?.address
                  ? `${listing.address.city || ''}, ${listing.address.state || ''}`
                    .replace(/^,\s*/, '')
                    .replace(/,\s*$/, '')
                  : 'Location unavailable'

                const moveIn = booking.moveInDate
                  ? new Date(booking.moveInDate).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })
                  : ''

                const status =
                  statusConfig[booking.status] || statusConfig.pending

                const StatusIcon = status.icon

                return (
                  <div
                    key={booking._id}
                    className='group bg-white rounded-2xl md:rounded-[32px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1'
                  >
                    {/* Image */}
                    <div
                      className='relative aspect-[16/11] md:aspect-[4/3] overflow-hidden cursor-pointer'
                      onClick={() =>
                        router.push(`/rooms/details?id=${listing?._id}`)
                      }
                    >
                      <img
                        src={images[0]}
                        alt={listing?.title || 'Listing'}
                        className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-700'
                      />

                      {/* Gradient Overlay */}
                      <div className='absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent' />

                      {/* Status */}
                      <div className='absolute top-2 md:top-4 right-2 md:right-4'>
                        <div
                          className={`flex items-center gap-1.5 md:gap-2 px-2.5 md:px-4 py-1.5 md:py-2 rounded-full backdrop-blur-md bg-white/80 border border-white/30 shadow-lg`}
                        >
                          <StatusIcon className={`w-3 md:w-4 h-3 md:h-4 ${status.color}`} />

                          <span
                            className={`text-[10px] md:text-xs font-semibold ${status.color}`}
                          >
                            {status.label}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className='p-3 md:p-6'>
                      {/* Title + Price */}
                      <div className='flex items-start justify-between gap-2 md:gap-4'>
                        <div className='flex-1'>
                          <h3
                            className='text-sm md:text-lg font-semibold tracking-tight text-neutral-900 line-clamp-1 cursor-pointer hover:text-[#FF385C] transition-colors'
                            onClick={() =>
                              router.push(`/rooms/details?id=${listing?._id}`)
                            }
                          >
                            {listing?.title || 'Listing'}
                          </h3>

                          <div className='flex items-center gap-1.5 md:gap-2 mt-1 md:mt-2 text-xs md:text-sm text-neutral-500'>
                            <MapPin className='w-3 md:w-4 h-3 md:h-4' />
                            <span className='line-clamp-1'>{location}</span>
                          </div>
                        </div>

                        <div className='text-right'>
                          <div className='text-lg md:text-2xl font-semibold tracking-tight text-neutral-900 leading-none'>
                            ₹{listing?.rent?.toLocaleString('en-IN')}
                          </div>

                          <div className='text-[8px] md:text-[10px] tracking-wider font-bold text-neutral-400 mt-0.5 md:mt-1'>
                            / month
                          </div>

                          {listing?.deposit > 0 && (
                            <div className='mt-1 md:mt-2 text-[8px] md:text-[10px] font-bold text-neutral-500 bg-neutral-100 px-1.5 md:px-2 py-0.5 rounded-full inline-block'>
                              + ₹{listing.deposit.toLocaleString('en-IN')} Deposit
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Details */}
                      <div className='mt-2 md:mt-5 flex flex-col gap-2 md:gap-3'>
                        {moveIn && (
                          <div className='flex items-center gap-2 md:gap-3 text-xs md:text-sm text-neutral-600'>
                            <Calendar className='w-3 md:w-4 h-3 md:h-4 text-neutral-400' />
                            <span>Move in: {moveIn}</span>
                          </div>
                        )}

                        <div className='flex items-center gap-2 md:gap-3 text-xs md:text-sm text-neutral-600'>
                          <Clock className='w-3 md:w-4 h-3 md:h-4 text-neutral-400' />
                          <span>
                            {booking.durationMonths}{' '}
                            {booking.durationMonths === 1 ? 'month' : 'months'}
                          </span>
                        </div>
                      </div>

                      {/* Divider */}
                      <div className='my-3 md:my-6 h-px bg-neutral-100' />

                      {/* Actions */}
                      <div>
                        {booking.status === 'accepted' && (
                          <button
                            onClick={() => handlePayNow(booking)}
                            disabled={paymentLoading}
                            className='w-full h-10 md:h-12 rounded-xl md:rounded-2xl bg-[#FF385C] text-white text-sm md:text-base font-semibold hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-1.5 md:gap-2 shadow-lg shadow-[#FF385C]/20'
                          >
                            <CreditCard className='w-3.5 md:w-4 h-3.5 md:h-4' />

                            {paymentLoading
                              ? 'Processing...'
                              : `Pay ₹${((listing?.rent || 0) + (listing?.deposit || 0)).toLocaleString('en-IN')} Now`}
                          </button>
                        )}

                        {booking.status === 'pending' && (
                          <button
                            onClick={() => handleCancelBooking(booking._id)}
                            className='w-full h-10 md:h-12 rounded-xl md:rounded-2xl bg-red-50 text-red-500 text-sm md:text-base font-semibold hover:bg-red-100 transition-all flex items-center justify-center gap-1.5 md:gap-2'
                          >
                            <XCircle className='w-3.5 md:w-4 h-3.5 md:h-4' />
                            Cancel Request
                          </button>
                        )}

                        {['payment_confirmed', 'completed'].includes(
                          booking.status,
                        ) && (
                            <button
                              onClick={() =>
                                router.push(
                                  `/student/bookings/details?id=${booking._id}`,
                                )
                              }
                              className='w-full h-10 md:h-12 rounded-xl md:rounded-2xl bg-neutral-100 text-neutral-800 text-sm md:text-base font-semibold hover:bg-neutral-200 transition-all'
                            >
                              View Details
                            </button>
                          )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className='bg-white rounded-[32px] shadow-sm py-24 text-center'>
              <div className='max-w-md mx-auto px-6'>
                <div className='w-24 h-24 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-6'>
                  <Home className='w-12 h-11 md:h-12 text-neutral-400' />
                </div>

                <h2 className='text-3xl font-semibold tracking-tight text-neutral-900'>
                  {activeTab === 'all' && 'No bookings yet'}
                  {activeTab === 'pending' && 'No pending bookings'}
                  {activeTab === 'confirmed' && 'No confirmed bookings'}
                  {activeTab === 'past' && 'No past bookings'}
                </h2>

                <p className='mt-4 text-neutral-500 leading-relaxed'>
                  {searchQuery
                    ? 'No bookings match your search. Try different keywords.'
                    : activeTab === 'all'
                      ? 'Explore premium stays and make your first reservation.'
                      : `You don't have any ${activeTab} bookings right now.`}
                </p>

                {!searchQuery && (
                  <button
                    onClick={() => router.push('/rooms')}
                    className='mt-8 h-11 md:h-12 px-7 rounded-2xl bg-[#FF385C] text-white font-semibold hover:scale-[1.02] transition-all shadow-lg shadow-[#FF385C]/20'
                  >
                    Browse Properties
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
