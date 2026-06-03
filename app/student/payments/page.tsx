'use client'

import { useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import { UpcomingPayments } from '@/components/UpcomingPayments'
import { PaymentHistory } from '@/components/PaymentHistory'
import { AuthPrompt } from '@/components/AuthPrompt'
import { CreditCard, Calendar, History } from 'lucide-react'

export default function StudentPaymentsPage() {
  const { isAuthenticated, user } = useAuth()
  const [activeTab, setActiveTab] = useState<'upcoming' | 'history'>('upcoming')

  if (!isAuthenticated || user?.role !== 'student') {
    return (
      <div className="min-h-[calc(100dvh-5rem)] flex items-center justify-center p-4">
        <AuthPrompt
          title="Student Access Required"
          description="Please login with a student account to view your payment schedules."
        />
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gray-50 pb-20'>
      {/* Header */}
      <div className='bg-white border-b border-outline-variant/10 sticky top-0 z-10'>
        <div className='container mx-auto px-4 py-4 md:py-6'>
          <div className='flex items-center justify-between gap-4'>
            <div className='flex items-center gap-3'>
              <div className='w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-[#FF385C]/10 flex items-center justify-center shrink-0'>
                <CreditCard className='w-5 h-5 md:w-6 md:h-6 text-[#FF385C]' />
              </div>
              <div>
                <h1 className='text-xl md:text-2xl font-black tracking-tight'>
                  Payments
                </h1>
                <p className='text-xs md:text-sm text-on-surface-variant font-medium'>
                  Manage your rentals and view history
                </p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className='flex gap-6 mt-6'>
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`flex items-center gap-2 pb-3 text-sm font-bold transition-all relative ${
                activeTab === 'upcoming'
                  ? 'text-[#FF385C]'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <Calendar className='w-4 h-4' />
              Upcoming
              {activeTab === 'upcoming' && (
                <div className='absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF385C] rounded-full' />
              )}
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex items-center gap-2 pb-3 text-sm font-bold transition-all relative ${
                activeTab === 'history'
                  ? 'text-[#FF385C]'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <History className='w-4 h-4' />
              History
              {activeTab === 'history' && (
                <div className='absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF385C] rounded-full' />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className='container mx-auto px-4 py-6 max-w-3xl'>
        {activeTab === 'upcoming' ? <UpcomingPayments /> : <PaymentHistory />}
      </div>
    </div>
  )
}
