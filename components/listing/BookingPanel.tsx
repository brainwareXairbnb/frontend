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
        <div className='sticky top-28 bg-white border border-gray-200 rounded-xl p-6 shadow-xl'>
          <div className='mb-5'>
            <div className='flex items-baseline gap-1.5 mb-1'>
              <span className='text-[22px] font-semibold text-gray-900'>
                ₹{price?.toLocaleString('en-IN')}
              </span>
              <span className='text-gray-600 text-base font-normal'> / month</span>
            </div>
          </div>
          {mode === 'student' ? (
            <>
              {hasActiveBooking ? (
                <BookingStatusCard status={bookingStatus} variant='desktop' />
              ) : (
                <>
                  <button
                    onClick={onBookingRequest}
                    className='w-full bg-[#FF385C] hover:bg-[#E11A38] text-white py-3.5 rounded-xl font-bold mb-3 transition-all shadow-md'
                  >
                    Reserve
                  </button>
                  <p className='text-center text-xs text-gray-500'>
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
        className={`md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-outline-variant/20 px-4 pt-4 pb-[calc(1rem+env(safe-area-inset-bottom))] z-50 ${hasActiveBooking ? 'flex' : 'flex justify-between items-center'}`}
      >
        {mode === 'student' ? (
          <>
            {hasActiveBooking ? (
              <BookingStatusCard status={bookingStatus} variant='mobile' />
            ) : (
              <>
                <div className='flex-1'>
                  <div className='font-bold text-lg text-gray-900'>
                    ₹{price?.toLocaleString('en-IN')}{' '}
                    <span className='text-sm font-normal opacity-70'>/ mo</span>
                  </div>
                  <p className='text-xs text-on-surface-variant'>
                    Available now
                  </p>
                </div>
                <button
                  onClick={onBookingRequest}
                  className='bg-[#FF385C] hover:bg-[#E11A38] text-white px-8 py-3 rounded-xl font-bold active:scale-95 transition-all touch-manipulation select-none'
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
