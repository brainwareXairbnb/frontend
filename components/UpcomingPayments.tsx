'use client'

import { useState, useEffect } from 'react'
import { Calendar, CreditCard, AlertCircle, Check, Clock } from 'lucide-react'
import { paymentApi } from '@/lib/api'
import { toast } from 'sonner'
import { PaymentSchedule } from '@/lib/types'
import { PaymentScheduleSkeleton } from './skeletons/BookingSkeleton'

// Extend Window type for Razorpay
declare global {
  interface Window {
    Razorpay: any
  }
}

export function UpcomingPayments() {
  const [schedules, setSchedules] = useState<PaymentSchedule[]>([])
  const [loading, setLoading] = useState(true)
  const [payingMonth, setPayingMonth] = useState<{
    scheduleId: string
    month: number
  } | null>(null)

  useEffect(() => {
    fetchSchedules()
  }, [])

  const fetchSchedules = async () => {
    try {
      const response: any = await paymentApi.getPaymentSchedules()
      setSchedules(response.schedules || [])
    } catch (error: any) {
      console.error('Failed to fetch payment schedules:', error)
      toast.error('Failed to load payment schedules')
    } finally {
      setLoading(false)
    }
  }

  const handlePayNow = async (scheduleId: string, month: number) => {
    try {
      setPayingMonth({ scheduleId, month })

      // Create order for this month
      const orderResponse: any = await paymentApi.createMonthlyPaymentOrder(
        scheduleId,
        month,
      )

      // Open Razorpay payment (using direct order mode)
      const user = JSON.parse(localStorage.getItem('br_user') || '{}')

      // Create a custom payment handler
      if (!window.Razorpay) {
        throw new Error('Razorpay SDK not loaded')
      }

      const razorpay = new window.Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderResponse.amount,
        currency: 'INR',
        name: 'BrainX',
        description: `Monthly rent payment for month ${month}`,
        order_id: orderResponse.orderId,
        handler: async (response: any) => {
          try {
            // Verify payment
            await paymentApi.verifyScheduledPayment(
              response.razorpay_order_id,
              response.razorpay_payment_id,
              response.razorpay_signature,
              scheduleId,
              month,
            )

            toast.success('Payment successful!')
            fetchSchedules() // Refresh schedules
          } catch (error: any) {
            console.error('Payment verification failed:', error)
            toast.error('Payment verification failed', {
              description:
                error?.response?.data?.error ||
                'Please contact support if amount was deducted.',
            })
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: user.phone,
        },
        theme: {
          color: '#FF385C',
        },
        modal: {
          ondismiss: () => {
            setPayingMonth(null)
            toast.info('Payment cancelled')
          },
        },
      })

      razorpay.open()
    } catch (error: any) {
      console.error('Failed to initiate payment:', error)
      toast.error(error?.response?.data?.error || 'Failed to initiate payment')
    } finally {
      setPayingMonth(null)
    }
  }

  const toggleAutoPay = async (scheduleId: string, currentValue: boolean) => {
    try {
      await paymentApi.toggleAutoPay(scheduleId, !currentValue)
      toast.success(`Auto-pay ${!currentValue ? 'enabled' : 'disabled'}`)
      fetchSchedules()
    } catch (error: any) {
      console.error('Failed to toggle auto-pay:', error)
      toast.error('Failed to update auto-pay settings')
    }
  }

  const getStatusBadge = (status: string) => {
    const styles = {
      paid: 'bg-green-100 text-green-700 border-green-200',
      pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      processing: 'bg-blue-100 text-blue-700 border-blue-200',
      failed: 'bg-red-100 text-red-700 border-red-200',
    }

    const icons = {
      paid: <Check className='w-3 h-3' />,
      pending: <Clock className='w-3 h-3' />,
      processing: <Clock className='w-3 h-3 animate-spin' />,
      failed: <AlertCircle className='w-3 h-3' />,
    }

    return (
      <span
        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${styles[status as keyof typeof styles]}`}
      >
        {icons[status as keyof typeof icons]}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    )
  }

  const getDaysUntilDue = (dueDate: string) => {
    const days = Math.floor(
      (new Date(dueDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24),
    )
    return days
  }

  if (loading) {
    return <PaymentScheduleSkeleton />
  }

  if (schedules.length === 0) {
    return (
      <div className='text-center py-12'>
        <Calendar className='w-12 h-12 mx-auto text-gray-300 mb-3' />
        <p className='text-gray-500'>No payment schedules found</p>
      </div>
    )
  }

  return (
    <div className='space-y-6'>
      {schedules.map((schedule) => {
        const upcomingPayments = schedule.schedules
          .filter((s) => s.status === 'pending' || s.status === 'failed')
          .sort(
            (a, b) =>
              new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
          )

        const nextPayment = upcomingPayments[0]

        return (
          <div
            key={schedule._id}
            className='border border-outline-variant/20 rounded overflow-hidden'
          >
            {/* Property Header */}
            <div className='flex gap-3 p-4 bg-slate-50 border-b border-outline-variant/10'>
              <div className='w-16 h-16 rounded-lg overflow-hidden shrink-0'>
                <img
                  src={schedule.listing.photos?.[0] || '/placeholder.jpg'}
                  alt={schedule.listing.title}
                  className='w-full h-full object-cover'
                />
              </div>
              <div className='flex-1 min-w-0'>
                <h3 className='font-bold text-sm line-clamp-1'>
                  {schedule.listing.title}
                </h3>
                <p className='text-xs text-on-surface-variant mt-0.5'>
                  {schedule.monthsPaid} of {schedule.totalMonths} months paid
                </p>
                <div className='flex items-center gap-2 mt-1.5'>
                  <div className='flex-1 bg-gray-200 rounded-full h-1.5'>
                    <div
                      className='bg-[#FF385C] h-1.5 rounded-full transition-all'
                      style={{
                        width: `${(schedule.monthsPaid / schedule.totalMonths) * 100}%`,
                      }}
                    />
                  </div>
                  <span className='text-xs font-medium text-gray-600'>
                    {Math.round(
                      (schedule.monthsPaid / schedule.totalMonths) * 100,
                    )}
                    %
                  </span>
                </div>
              </div>
            </div>

            {/* Next Payment Alert */}
            {nextPayment && (
              <div
                className={`p-4 border-b border-outline-variant/10 ${
                  getDaysUntilDue(nextPayment.dueDate) < 0
                    ? 'bg-red-50'
                    : getDaysUntilDue(nextPayment.dueDate) <= 7
                      ? 'bg-yellow-50'
                      : 'bg-blue-50'
                }`}
              >
                <div className='flex items-start gap-3'>
                  <AlertCircle
                    className={`w-5 h-5 shrink-0 mt-0.5 ${
                      getDaysUntilDue(nextPayment.dueDate) < 0
                        ? 'text-red-600'
                        : getDaysUntilDue(nextPayment.dueDate) <= 7
                          ? 'text-yellow-600'
                          : 'text-blue-600'
                    }`}
                  />
                  <div className='flex-1'>
                    <p className='text-sm font-semibold'>
                      {getDaysUntilDue(nextPayment.dueDate) < 0
                        ? `Overdue by ${Math.abs(getDaysUntilDue(nextPayment.dueDate))} days`
                        : getDaysUntilDue(nextPayment.dueDate) === 0
                          ? 'Due today'
                          : `Due in ${getDaysUntilDue(nextPayment.dueDate)} days`}
                    </p>
                    <p className='text-xs text-on-surface-variant mt-0.5'>
                      Month {nextPayment.month} payment: ₹
                      {nextPayment.amount.toLocaleString('en-IN')} due on{' '}
                      {new Date(nextPayment.dueDate).toLocaleDateString(
                        'en-IN',
                      )}
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      handlePayNow(schedule._id, nextPayment.month)
                    }
                    disabled={
                      payingMonth?.scheduleId === schedule._id &&
                      payingMonth?.month === nextPayment.month
                    }
                    className='px-4 py-2 bg-[#FF385C] text-white rounded-lg text-sm font-bold hover:brightness-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed'
                  >
                    {payingMonth?.scheduleId === schedule._id &&
                    payingMonth?.month === nextPayment.month
                      ? 'Processing...'
                      : 'Pay Now'}
                  </button>
                </div>
              </div>
            )}

            {/* Auto-Pay Toggle */}
            <div className='p-4 border-b border-outline-variant/10 flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <CreditCard className='w-4 h-4 text-on-surface-variant' />
                <div>
                  <p className='text-sm font-semibold'>Auto-Pay</p>
                  <p className='text-xs text-on-surface-variant'>
                    {schedule.autoPayEnabled
                      ? 'Automatic payments enabled'
                      : 'Pay manually each month'}
                  </p>
                </div>
              </div>
              <button
                onClick={() =>
                  toggleAutoPay(schedule._id, schedule.autoPayEnabled)
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  schedule.autoPayEnabled ? 'bg-[#FF385C]' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    schedule.autoPayEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* All Payments List */}
            <div className='p-4'>
              <h4 className='text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-3'>
                Payment Schedule
              </h4>
              <div className='space-y-2'>
                {schedule.schedules.map((payment) => (
                  <div
                    key={payment.month}
                    className='flex items-center justify-between p-3 rounded-lg bg-slate-50'
                  >
                    <div className='flex items-center gap-3'>
                      <div className='w-8 h-8 rounded-full bg-white border border-outline-variant/20 flex items-center justify-center text-xs font-bold'>
                        {payment.month}
                      </div>
                      <div>
                        <p className='text-sm font-semibold'>
                          ₹{payment.amount.toLocaleString('en-IN')}
                        </p>
                        <p className='text-xs text-on-surface-variant'>
                          Due:{' '}
                          {new Date(payment.dueDate).toLocaleDateString(
                            'en-IN',
                          )}
                        </p>
                      </div>
                    </div>
                    {getStatusBadge(payment.status)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
