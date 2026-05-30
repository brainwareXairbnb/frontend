'use client'

import { BookingStatusCard } from '@/components/BookingStatusCard'

interface BookingPanelProps {
  mode: 'student' | 'admin'
  price: number
  hasActiveBooking: boolean
  bookingStatus: string | null
  onBookingRequest: () => void
  onApprove?: () => void
  onReject?: () => void
  actionLoading?: boolean
}

export function BookingPanel({
  mode,
  price,
  hasActiveBooking,
  bookingStatus,
  onBookingRequest,
  onApprove,
  onReject,
  actionLoading = false,
}: BookingPanelProps) {
  return (
    <>
      {/* Desktop Sidebar */}
      <div className='hidden md:block w-[35%] relative'>
        <div className='sticky top-28 bg-white border border-outline-variant/30 rounded-2xl p-6 shadow-lg'>
          <div className='flex items-baseline gap-1 mb-6'>
            <span className='text-2xl font-bold'>
              ₹{price?.toLocaleString('en-IN')}
            </span>
            <span className='text-on-surface-variant'>/ month</span>
          </div>
          {mode === 'student' ? (
            <>
              {hasActiveBooking ? (
                <BookingStatusCard status={bookingStatus} variant='desktop' />
              ) : (
                <>
                  <button
                    onClick={onBookingRequest}
                    className='w-full bg-[#E51D53] text-white py-3.5 rounded-lg font-bold mb-4 hover:brightness-95 transition-all'
                  >
                    Request to book
                  </button>
                  <p className='text-center text-xs text-on-surface-variant'>
                    You won't be charged yet
                  </p>
                </>
              )}
            </>
          ) : (
            <div className='flex flex-col gap-3'>
              <button
                onClick={onApprove}
                disabled={actionLoading}
                className='w-full bg-emerald-600 text-white py-3 rounded-lg font-bold disabled:opacity-50'
              >
                Approve
              </button>
              <button
                onClick={onReject}
                disabled={actionLoading}
                className='w-full border border-red-600 text-red-600 py-3 rounded-lg font-bold disabled:opacity-50'
              >
                Reject
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Footer */}
      <div
        className={`md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-outline-variant/20 px-4 py-4 z-50 ${hasActiveBooking ? 'flex' : 'flex justify-between items-center'}`}
      >
        {mode === 'student' ? (
          <>
            {hasActiveBooking ? (
              <BookingStatusCard status={bookingStatus} variant='mobile' />
            ) : (
              <>
                <div className='flex-1'>
                  <div className='font-bold text-lg'>
                    ₹{price?.toLocaleString('en-IN')}{' '}
                    <span className='text-sm font-normal opacity-70'>/ mo</span>
                  </div>
                  <p className='text-xs text-on-surface-variant'>
                    Available now
                  </p>
                </div>
                <button
                  onClick={onBookingRequest}
                  className='bg-[#E51D53] text-white px-8 py-3 rounded-lg font-bold active:scale-95 transition-all touch-manipulation select-none'
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                >
                  Reserve
                </button>
              </>
            )}
          </>
        ) : (
          <div className='flex gap-3 w-full'>
            <button
              onClick={onReject}
              disabled={actionLoading}
              className='flex-1 border border-red-600 text-red-600 py-3 rounded-lg font-bold touch-manipulation select-none disabled:opacity-50'
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              Reject
            </button>
            <button
              onClick={onApprove}
              disabled={actionLoading}
              className='flex-1 bg-emerald-600 text-white py-3 rounded-lg font-bold touch-manipulation select-none disabled:opacity-50'
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              Approve
            </button>
          </div>
        )}
      </div>
    </>
  )
}
