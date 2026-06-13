'use client'

import { IndianRupee, CreditCard, Shield, Check } from 'lucide-react'

interface PaymentDetailsProps {
  rent: number
  deposit: number
}

export function PaymentDetails({ rent, deposit }: PaymentDetailsProps) {
  const totalUpfront = rent + deposit

  return (
    <div className='pb-8 border-b border-outline-variant/20 mb-8'>
      <h3 className='text-[22px] font-bold text-on-surface mb-6'>
        Pricing & Payment
      </h3>

      {/* Main Pricing Card */}
      <div className='bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg p-4 md:p-6 border border-primary/20 mb-4'>
        <div className='flex items-start justify-between gap-4 mb-4'>
          <div className='flex-1'>
            <p className='text-xs md:text-sm font-medium text-on-surface-variant mb-1'>
              Monthly Rent
            </p>
            <div className='flex items-baseline gap-1.5'>
              <span className='text-2xl md:text-3xl font-bold text-primary'>
                ₹{rent.toLocaleString('en-IN')}
              </span>
              <span className='text-xs text-on-surface-variant'>/month</span>
            </div>
          </div>
          <div className='w-12 h-12 md:w-14 md:h-14 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0'>
            <IndianRupee className='w-6 h-6 md:w-7 md:h-7 text-primary' />
          </div>
        </div>

        {/* Breakdown */}
        <div className='space-y-2.5 pt-3 border-t border-primary/20'>
          <div className='flex justify-between items-center text-sm'>
            <span className='text-on-surface-variant flex items-center gap-1.5'>
              <Shield className='w-3.5 h-3.5' />
              Security Deposit
            </span>
            <span className='font-bold text-on-surface'>
              {deposit > 0 ? `₹${deposit.toLocaleString('en-IN')}` : '₹0'}
            </span>
          </div>
          {deposit > 0 && (
            <p className='text-xs text-on-surface-variant flex items-center gap-1.5'>
              <Check className='w-3 h-3 text-green-600 ml-5' />
              Fully refundable
            </p>
          )}
          <div className='flex justify-between items-center pt-2.5 border-t border-primary/20'>
            <span className='text-sm md:text-base font-bold text-on-surface'>
              Move-in Cost
            </span>
            <span className='text-xl md:text-2xl font-bold text-primary'>
              ₹{totalUpfront.toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      </div>

      {/* Payment Methods - Compact */}
      <div className='p-4 rounded-lg bg-white border border-outline-variant/20 mb-4'>
        <div className='flex items-center gap-2.5 mb-3'>
          <div className='w-8 h-8 rounded-lg bg-green-600/10 flex items-center justify-center'>
            <CreditCard className='w-4 h-4 text-green-600' />
          </div>
          <h4 className='font-bold text-on-surface text-sm'>
            Accepted Payments
          </h4>
        </div>
        <div className='flex flex-wrap gap-2'>
          <span className='px-2.5 py-1 bg-purple-50 text-purple-700 text-xs font-semibold rounded-full border border-purple-200'>
            UPI
          </span>
          <span className='px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-200'>
            Bank Transfer
          </span>
          <span className='px-2.5 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-full border border-green-200'>
            Cash
          </span>
          <span className='px-2.5 py-1 bg-orange-50 text-orange-700 text-xs font-semibold rounded-full border border-orange-200'>
            Cards
          </span>
        </div>
      </div>

      {/* What's Included - Compact */}
      <div className='p-4 rounded-lg bg-green-50/50 border border-green-200/50'>
        <h4 className='font-bold text-on-surface text-sm mb-2.5 flex items-center gap-2'>
          <Check className='w-4 h-4 text-green-600' />
          Rent Includes
        </h4>
        <div className='space-y-1.5'>
          {['Basic utilities', 'Property maintenance', 'WiFi (if listed)'].map(
            (item, idx) => (
              <div
                key={idx}
                className='flex items-center gap-2 text-xs md:text-sm text-on-surface-variant'
              >
                <div className='w-1 h-1 rounded-full bg-green-600 shrink-0' />
                {item}
              </div>
            ),
          )}
        </div>
        <p className='text-[11px] md:text-xs text-on-surface-variant mt-3 pt-2.5 border-t border-green-200/50'>
          <span className='font-semibold text-on-surface'>Note:</span>{' '}
          Electricity & water may be extra
        </p>
      </div>
    </div>
  )
}
