'use client'

import { useState, useEffect } from 'react'
import {
  Receipt,
  Download,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Clock,
} from 'lucide-react'
import { paymentApi } from '@/lib/api'
import { toast } from 'sonner'

export function PaymentHistory({ bookingId }: { bookingId?: string }) {
  const [transactions, setTransactions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchHistory()
  }, [bookingId])

  const fetchHistory = async () => {
    try {
      const response = await paymentApi.getPaymentHistory({ bookingId })
      setTransactions(response.transactions || [])
    } catch (error) {
      toast.error('Failed to load payment history')
    } finally {
      setLoading(false)
    }
  }

  const handleDownloadReceipt = async (transactionId: string) => {
    try {
      const token = localStorage.getItem('br_token')

      const url = `${process.env.NEXT_PUBLIC_API_URL}/payment/receipt/${transactionId}?token=${token}`

      window.open(url, '_blank')
    } catch (error) {
      toast.error('Failed to download receipt')
    }
  }

  const statusConfig: any = {
    captured: {
      label: 'Paid',
      icon: CheckCircle2,
      className:
        'bg-emerald-50 text-emerald-700 border border-emerald-100',
    },
    refunded: {
      label: 'Refunded',
      icon: AlertCircle,
      className:
        'bg-orange-50 text-orange-700 border border-orange-100',
    },
    failed: {
      label: 'Failed',
      icon: XCircle,
      className: 'bg-red-50 text-red-700 border border-red-100',
    },
    created: {
      label: 'Pending',
      icon: Clock,
      className:
        'bg-neutral-100 text-neutral-700 border border-neutral-200',
    },
  }

  if (loading) {
    return (
      <div className='space-y-3'>
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className='bg-white border border-neutral-200 rounded-2xl p-4 animate-pulse'
          >
            <div className='flex gap-3'>
              {!bookingId && (
                <div className='w-20 h-20 rounded-xl bg-neutral-200 shrink-0' />
              )}

              <div className='flex-1 space-y-2'>
                <div className='h-4 w-2/3 bg-neutral-200 rounded-md' />
                <div className='h-3 w-1/3 bg-neutral-200 rounded-md' />

                <div className='flex justify-between items-center pt-3'>
                  <div className='h-7 w-20 bg-neutral-200 rounded-full' />
                  <div className='h-7 w-16 bg-neutral-200 rounded-lg' />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (transactions.length === 0) {
    return (
      <div className='bg-white border border-neutral-200 rounded-3xl p-10 text-center'>
        <div className='w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-4'>
          <Receipt className='w-7 h-7 text-neutral-400' />
        </div>

        <h3 className='text-lg font-semibold text-neutral-900'>
          No payments yet
        </h3>

        <p className='text-sm text-neutral-500 mt-2'>
          Your payment history will appear here.
        </p>
      </div>
    )
  }

  return (
    <div className='space-y-3'>
      {transactions.map((tx) => {
        const status = statusConfig[tx.paymentStatus] || statusConfig.created

        const StatusIcon = status.icon

        return (
          <div
            key={tx._id}
            className='bg-white border border-neutral-200 rounded-2xl p-4 hover:shadow-md transition-all duration-300'
          >
            <div className='flex gap-4'>
              {/* IMAGE - Only show if not filtering by booking */}
              {!bookingId && (
                <div className='w-20 h-20 rounded-2xl overflow-hidden shrink-0 border border-neutral-100'>
                  <img
                    src={tx.listing?.photos?.[0] || '/placeholder-room.jpg'}
                    alt={tx.listing?.title}
                    className='w-full h-full object-cover'
                  />
                </div>
              )}

              {/* CONTENT */}
              <div className='flex-1 min-w-0'>
                <div className='flex items-start justify-between gap-3'>
                  <div className='min-w-0'>
                    <h2 className='text-sm sm:text-base font-bold text-neutral-900 line-clamp-1'>
                      {bookingId
                        ? tx.notes || 'Initial Rent Payment'
                        : tx.listing?.title}
                    </h2>

                    <div className='flex items-center gap-1.5 mt-1 text-xs text-neutral-500 font-medium'>
                      <Clock className='w-3.5 h-3.5' />
                      <span>
                        {new Date(tx.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>

                  <div className='text-right shrink-0'>
                    <p className='text-lg font-black text-neutral-900 leading-none'>
                      ₹{(tx.grossRent + (tx.depositAmount || 0)).toLocaleString('en-IN')}
                    </p>
                    {tx.depositAmount > 0 && (
                      <p className='text-[9px] text-neutral-500 mt-1 font-medium'>
                        ₹{tx.grossRent.toLocaleString('en-IN')} (Rent) + ₹{tx.depositAmount.toLocaleString('en-IN')} (Dep.)
                      </p>
                    )}
                    <p className='text-[10px] uppercase tracking-wider font-bold text-neutral-400 mt-1'>
                      Captured
                    </p>
                  </div>
                </div>

                {/* FOOTER */}
                <div className='flex items-center justify-between mt-4'>
                  <div
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${status.className}`}
                  >
                    <StatusIcon className='w-3 h-3' />
                    {status.label}
                  </div>

                  {tx.paymentStatus === 'captured' && (
                    <button
                      onClick={() => handleDownloadReceipt(tx._id)}
                      className='h-8 px-3 rounded-lg bg-[#FF385C]/5 hover:bg-[#FF385C] text-[#FF385C] hover:text-white text-xs font-bold flex items-center gap-1.5 transition-all group'
                    >
                      <Download className='w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5' />
                      Receipt
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}