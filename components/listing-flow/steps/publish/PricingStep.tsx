'use client'

import { IndianRupee } from 'lucide-react'
import type { ListingFormData } from '@/lib/listing-flow/steps'

interface PricingStepProps {
  formData: ListingFormData
  onChange: (data: Partial<ListingFormData>) => void
  disabled?: boolean
}

export function PricingStep({ formData, onChange, disabled = false }: PricingStepProps) {
  return (
    <div className='max-w-2xl mx-auto py-8 px-4'>
      <h1 className='text-2xl md:text-3xl font-bold text-on-surface mb-2'>
        Now, set your price
      </h1>
      <p className='text-on-surface-variant mb-8'>
        You can change it anytime
      </p>

      <div className='space-y-6'>
        {/* Monthly Rent */}
        <div className='space-y-2'>
          <label className='flex items-center gap-2 text-sm font-semibold text-on-surface-variant'>
            <IndianRupee className='w-4 h-4' />
            Monthly Rent *
          </label>
          <div className='relative'>
            <span className='absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant'>₹</span>
            <input
              type='number'
              value={formData.rent}
              onChange={(e) => onChange({ rent: e.target.value })}
              disabled={disabled}
              placeholder='5000'
              className='w-full h-16 pl-10 pr-4 text-2xl font-bold border-2 border-outline-variant/30 rounded-2xl focus:border-on-surface outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed'
            />
          </div>
          <p className='text-sm text-on-surface-variant'>Per month</p>
        </div>

        {/* Security Deposit */}
        <div className='space-y-2'>
          <label className='flex items-center gap-2 text-sm font-semibold text-on-surface-variant'>
            <IndianRupee className='w-4 h-4' />
            Security Deposit (Optional)
          </label>
          <div className='relative'>
            <span className='absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant'>₹</span>
            <input
              type='number'
              value={formData.deposit}
              onChange={(e) => onChange({ deposit: e.target.value })}
              disabled={disabled}
              placeholder='5000'
              className='w-full h-14 pl-10 pr-4 text-lg border-2 border-outline-variant/30 rounded-2xl focus:border-on-surface outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed'
            />
          </div>
          <p className='text-sm text-on-surface-variant'>Refundable deposit</p>
        </div>
      </div>
    </div>
  )
}
