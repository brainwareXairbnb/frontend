'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { authApi } from '@/lib/api'
import {
  ChevronLeft,
  CheckCircle2,
  Phone,
  MapPin,
  CreditCard,
  Fingerprint,
  ShieldCheck,
  AlertCircle,
  Loader2,
} from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

export default function BecomeHostPage() {
  const { user, isAuthenticated, loading: authLoading } = useAuth()
  const router = useRouter()

  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [upgradeStatus, setUpgradeStatus] = useState<any>(null)

  const [formData, setFormData] = useState({
    phone: '',
    businessAddress: '',
    nidNo: '',
    bankDetails: {
      accountHolderName: '',
      accountNumber: '',
      ifsc: '',
      bankName: '',
    },
  })

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login?redirect=/host/homes')
    } else if (user?.role === 'owner') {
      router.push('/owner')
    } else if (isAuthenticated) {
      checkUpgradeStatus()
    }
  }, [isAuthenticated, authLoading, user])

  const checkUpgradeStatus = async () => {
    try {
      const status = await authApi.getUpgradeStatus()
      setUpgradeStatus(status)
      if (
        status.hasUpgradeRequest &&
        status.upgradeRequest.status === 'pending'
      ) {
        setSuccess(true)
      }
    } catch (err) {
      console.error('Error checking upgrade status:', err)
    }
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    if (name.includes('.')) {
      const [parent, child] = name.split('.')
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...(prev as any)[parent],
          [child]: value,
        },
      }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await authApi.upgradeToOwner(formData)
      toast.success('Registry Active', {
        description: 'Owner node upgrade synchronized',
      })
      setSuccess(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err: any) {
      toast.error('Registry Failed', {
        description: err.message || 'Failed to submit request',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (authLoading)
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <Loader2 className='w-8 h-8 animate-spin text-[#FF385C]' />
      </div>
    )

  if (success) {
    return (
      <div className='min-h-screen bg-white pt-32 px-6'>
        <div className='max-w-2xl mx-auto text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500'>
          <div className='w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600'>
            <CheckCircle2 className='w-10 h-10' />
          </div>
          <h1 className='text-3xl font-bold text-on-surface'>
            Application Submitted!
          </h1>
          <p className='text-on-surface-variant text-lg leading-relaxed'>
            Your request to become a property owner is currently being reviewed
            by our administrative team. Verification typically takes 24-48
            hours.
          </p>
          <div className='bg-surface-container rounded-2xl p-6 text-left border border-outline-variant/20'>
            <h3 className='font-bold flex items-center gap-2 mb-2'>
              <ShieldCheck className='w-5 h-5 text-[#FF385C]' />
              What's next?
            </h3>
            <ul className='space-y-3 text-sm text-on-surface-variant'>
              <li>• Our team will verify your NID and bank details.</li>
              <li>• You'll receive an email once your account is upgraded.</li>
              <li>
                • After approval, you can start listing your properties
                immediately.
              </li>
            </ul>
          </div>
          <button
            onClick={() => router.push('/')}
            className='w-full bg-[#222222] text-white font-bold py-4 rounded hover:bg-black transition-colors'
          >
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-white'>
      {/* Hero Header */}
      <div className='bg-[#222222] text-white pt-20 pb-20 px-6 md:px-10 overflow-hidden relative'>
        {/* Back Button */}
        <div className='absolute md:hidden top-6 left-6 z-20'>
          <Link
            href='/'
            className='flex items-center gap-2 text-white/80 hover:text-white transition-colors bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full backdrop-blur-md'
          >
            <ChevronLeft className='w-5 h-5' />
            <span className='text-sm font-semibold'>Back to home</span>
          </Link>
        </div>
        <div className='max-w-7xl mx-auto relative z-10'>
          <div className='max-w-2xl space-y-6'>
            <h1 className='text-4xl md:text-6xl font-bold leading-tight'>
              Ready to host <span className='text-[#FF385C]'>student</span>{' '}
              rooms?
            </h1>
            <p className='text-xl text-white/70'>
              Join thousands of owners nearby Brainware University and help
              students find their perfect home.
            </p>
          </div>
        </div>
        {/* Abstract shapes */}
        <div className='absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#FF385C]/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2' />
      </div>

      <div className='max-w-7xl mx-auto px-4 md:px-10 -mt-6 md:-mt-10 mb-10 md:mb-20 relative z-10'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-10'>
          {/* Form Side */}
          <div className='lg:col-span-2 space-y-6 md:space-y-8'>
            <div className='bg-white rounded-2xl md:rounded-3xl p-5 md:p-8 shadow-[0_8px_40px_rgba(0,0,0,0.08)] border border-outline-variant/10'>
              <form onSubmit={handleSubmit} className='space-y-6 md:space-y-10'>
                {/* Section: Basic Info */}
                <section className='space-y-6'>
                  <div className='flex items-center gap-3'>
                    <div className='w-10 h-10 rounded bg-[#FF385C]/10 flex items-center justify-center text-[#FF385C]'>
                      <Phone className='w-5 h-5' />
                    </div>
                    <h2 className='text-xl font-bold'>Contact & Business</h2>
                  </div>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className='space-y-2'>
                      <label className='text-sm font-bold text-on-surface-variant ml-1'>
                        Phone Number
                      </label>
                      <input
                        required
                        name='phone'
                        type='tel'
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder='+91 98765 43210'
                        className='w-full p-3.5 md:p-4 rounded border border-outline-variant/30 focus:border-[#FF385C] focus:ring-1 focus:ring-[#FF385C] transition-all outline-none'
                      />
                    </div>
                    <div className='space-y-2'>
                      <label className='text-sm font-bold text-on-surface-variant ml-1'>
                        NID / Aadhaar Number
                      </label>
                      <input
                        required
                        name='nidNo'
                        type='text'
                        value={formData.nidNo}
                        onChange={handleInputChange}
                        placeholder='XXXX XXXX XXXX'
                        className='w-full p-3.5 md:p-4 rounded border border-outline-variant/30 focus:border-[#FF385C] focus:ring-1 focus:ring-[#FF385C] transition-all outline-none'
                      />
                    </div>
                    <div className='md:col-span-2 space-y-2'>
                      <label className='text-sm font-bold text-on-surface-variant ml-1'>
                        Business Address
                      </label>
                      <textarea
                        required
                        name='businessAddress'
                        value={formData.businessAddress}
                        onChange={handleInputChange}
                        rows={3}
                        placeholder='Full address of your property management office'
                        className='w-full p-3.5 md:p-4 rounded border border-outline-variant/30 focus:border-[#FF385C] focus:ring-1 focus:ring-[#FF385C] transition-all outline-none resize-none'
                      />
                    </div>
                  </div>
                </section>

                <div className='h-[1px] bg-outline-variant/20' />

                {/* Section: Bank Details */}
                <section className='space-y-6'>
                  <div className='flex items-center gap-3'>
                    <div className='w-10 h-10 rounded bg-blue-50 flex items-center justify-center text-blue-600'>
                      <CreditCard className='w-5 h-5' />
                    </div>
                    <h2 className='text-xl font-bold'>Payout Information</h2>
                  </div>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className='space-y-2'>
                      <label className='text-sm font-bold text-on-surface-variant ml-1'>
                        Account Holder Name
                      </label>
                      <input
                        required
                        name='bankDetails.accountHolderName'
                        type='text'
                        value={formData.bankDetails.accountHolderName}
                        onChange={handleInputChange}
                        className='w-full p-3.5 md:p-4 rounded border border-outline-variant/30 focus:border-[#FF385C] focus:ring-1 focus:ring-[#FF385C] transition-all outline-none'
                      />
                    </div>
                    <div className='space-y-2'>
                      <label className='text-sm font-bold text-on-surface-variant ml-1'>
                        Bank Name
                      </label>
                      <input
                        required
                        name='bankDetails.bankName'
                        type='text'
                        value={formData.bankDetails.bankName}
                        onChange={handleInputChange}
                        className='w-full p-3.5 md:p-4 rounded border border-outline-variant/30 focus:border-[#FF385C] focus:ring-1 focus:ring-[#FF385C] transition-all outline-none'
                      />
                    </div>
                    <div className='space-y-2'>
                      <label className='text-sm font-bold text-on-surface-variant ml-1'>
                        Account Number
                      </label>
                      <input
                        required
                        name='bankDetails.accountNumber'
                        type='password'
                        value={formData.bankDetails.accountNumber}
                        onChange={handleInputChange}
                        placeholder='••••••••••••'
                        className='w-full p-3.5 md:p-4 rounded border border-outline-variant/30 focus:border-[#FF385C] focus:ring-1 focus:ring-[#FF385C] transition-all outline-none'
                      />
                    </div>
                    <div className='space-y-2'>
                      <label className='text-sm font-bold text-on-surface-variant ml-1'>
                        IFSC Code
                      </label>
                      <input
                        required
                        name='bankDetails.ifsc'
                        type='text'
                        value={formData.bankDetails.ifsc}
                        onChange={handleInputChange}
                        placeholder='SBIN0001234'
                        className='w-full p-3.5 md:p-4 rounded border border-outline-variant/30 focus:border-[#FF385C] focus:ring-1 focus:ring-[#FF385C] transition-all outline-none uppercase'
                      />
                    </div>
                  </div>
                </section>

                <button
                  disabled={isSubmitting}
                  type='submit'
                  className='w-full bg-[#FF385C] hover:bg-[#E31C5F] text-white font-bold py-5 rounded-2xl transition-all shadow-lg hover:shadow-xl active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-3'
                >
                  {isSubmitting ? (
                    <Loader2 className='w-6 h-6 animate-spin' />
                  ) : (
                    <>
                      <ShieldCheck className='w-6 h-6' />
                      Submit Application
                    </>
                  )}
                </button>

                <p className='text-center text-xs text-on-surface-variant leading-relaxed px-10'>
                  By submitting, you agree to the Brainware Rooms Owner Terms of
                  Service and Payout Policy. Your data is encrypted and handled
                  securely.
                </p>
              </form>
            </div>
          </div>

          {/* Info Side */}
          <div className='space-y-6'>
            <div className='bg-surface-container/50 rounded-3xl p-8 border border-outline-variant/10 space-y-8'>
              <h3 className='text-xl font-bold'>Why join us?</h3>

              <div className='flex gap-4'>
                <div className='w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-[#FF385C] flex-shrink-0'>
                  <Fingerprint className='w-6 h-6' />
                </div>
                <div>
                  <h4 className='font-bold mb-1'>Targeted Reach</h4>
                  <p className='text-sm text-on-surface-variant leading-relaxed'>
                    Connect directly with verified students from Brainware
                    University.
                  </p>
                </div>
              </div>

              <div className='flex gap-4'>
                <div className='w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-blue-600 flex-shrink-0'>
                  <MapPin className='w-6 h-6' />
                </div>
                <div>
                  <h4 className='font-bold mb-1'>Local Verified Community</h4>
                  <p className='text-sm text-on-surface-variant leading-relaxed'>
                    Join a network of trusted local property owners.
                  </p>
                </div>
              </div>

              <div className='flex gap-4'>
                <div className='w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-green-600 flex-shrink-0'>
                  <ShieldCheck className='w-6 h-6' />
                </div>
                <div>
                  <h4 className='font-bold mb-1'>Secure Payouts</h4>
                  <p className='text-sm text-on-surface-variant leading-relaxed'>
                    Automated monthly rent collection straight to your bank.
                  </p>
                </div>
              </div>
            </div>

            <div className='p-8 bg-[#FF385C]/5 rounded-3xl border border-[#FF385C]/10'>
              <p className='text-sm text-[#FF385C] font-semibold italic leading-relaxed'>
                "I listed my flat on Brainware Rooms and found 3 great student
                tenants within a week. The verification process gives me peace
                of mind."
              </p>
              <p className='mt-4 font-bold text-sm'>— Mrs. Sen, Barasat</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
