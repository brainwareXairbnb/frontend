'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { ownerApi } from '@/lib/api'
import { toast } from 'sonner'
import {
  ChevronLeft,
  CreditCard,
  Building2,
  Lock,
  Loader2,
  ShieldCheck,
  User,
  IndianRupee,
} from 'lucide-react'

export default function BankDetailsPage() {
  const router = useRouter()
  const { user, isAuthenticated, loading: authLoading } = useAuth()

  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [bankDetails, setBankDetails] = useState<any>(null)

  const [formData, setFormData] = useState({
    accountHolderName: '',
    bankName: '',
    accountNumber: '',
    ifsc: '',
    upiId: '',
  })

  // Track if we are editing existing details
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated) {
        router.push('/login?redirect=/owner/profile/payments')
      } else if (user?.role !== 'owner' && user?.role !== 'admin') {
        router.push('/')
      } else {
        fetchBankDetails()
      }
    }
  }, [authLoading, isAuthenticated, user, router])

  const fetchBankDetails = async () => {
    setLoading(true)
    try {
      const res = await ownerApi.getBankDetails()
      if (res.hasBankDetails) {
        setBankDetails(res.bankDetails)
        setFormData({
          accountHolderName: res.bankDetails.accountHolderName || '',
          bankName: res.bankDetails.bankName || '',
          accountNumber: res.bankDetails.accountNumber || '', // Pre-fill it so they don't have to re-type
          ifsc: res.bankDetails.ifsc || '',
          upiId: res.bankDetails.upiId || '',
        })
      } else {
        setIsEditing(true) // Open form immediately if no details
      }
    } catch (err: any) {
      toast.error('Failed to load bank details')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // For editing, account number must be re-entered
    if (!formData.accountNumber) {
      toast.error('Please enter the full account number securely')
      return
    }

    setSubmitting(true)
    try {
      const res: any = await ownerApi.updateBankDetails(formData)
      toast.success(res.message || 'Bank details securely updated')
      setBankDetails(res.bankDetails)
      setIsEditing(false)
    } catch (err: any) {
      toast.error('Verification failed', {
        description: err.message || 'Please check your bank details',
      })
    } finally {
      setSubmitting(false)
    }
  }

  if (authLoading || loading) {
    return (
      <div className='flex items-center justify-center min-h-screen bg-[#fafafa]'>
        <Loader2 className='w-8 h-8 animate-spin text-primary' />
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-[#fafafa]'>
      {/* Header */}
      <div className='bg-white border-b border-outline-variant/10'>
        <div className='max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6'>
          <button
            onClick={() => router.push('/owner/profile')}
            className='flex items-center gap-2 text-on-surface-variant hover:text-on-surface transition-colors mb-3 sm:mb-4'
          >
            <ChevronLeft className='w-4 h-4 sm:w-5 sm:h-5' />
            <span className='text-sm sm:text-base font-medium'>Back</span>
          </button>
          <h1 className='text-xl sm:text-2xl font-bold text-on-surface'>
            Payout Methods
          </h1>
          <p className='text-xs sm:text-sm text-on-surface-variant mt-1'>
            Manage your bank account for secure payouts
          </p>
        </div>
      </div>

      <div className='max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8'>
        <div className='bg-white'>
          {bankDetails && !isEditing ? (
            <div className='space-y-4 sm:space-y-5'>
              <div className='bg-blue-50 border border-blue-100 rounded p-3 sm:p-4 flex gap-3 sm:gap-4'>
                <div className='w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-lg shadow-sm flex items-center justify-center shrink-0'>
                  <ShieldCheck className='w-5 h-5 sm:w-6 sm:h-6 text-blue-600' />
                </div>
                <div>
                  <h3 className='font-bold text-sm sm:text-base text-blue-900 mb-1'>Secure Payouts</h3>
                  <p className='text-xs sm:text-sm text-blue-800/80 leading-relaxed'>
                    Your bank details are instantly verified and securely encrypted to ensure smooth payments.
                  </p>
                </div>
              </div>

              <div className='border border-outline-variant rounded bg-white overflow-hidden mt-6'>
                <div className='p-4 sm:p-5 border-b border-outline-variant/10 flex items-center justify-between bg-surface-container-low/30'>
                  <div className='flex items-center gap-3'>
                    <div className='w-8 h-8 sm:w-10 sm:h-10 rounded bg-emerald-50 flex items-center justify-center shrink-0'>
                      <IndianRupee className='w-4 h-4 sm:w-5 sm:h-5 text-emerald-600' />
                    </div>
                    <div>
                      <h3 className='font-bold text-sm sm:text-base text-on-surface'>Payment Details</h3>
                      <p className='text-xs text-on-surface-variant flex items-center gap-1 mt-0.5'>
                        <Lock className='w-3 h-3' /> Encrypted
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsEditing(true)}
                    className='text-sm font-semibold text-primary hover:text-primary/80 transition-colors'
                  >
                    Update
                  </button>
                </div>

                <div className='p-4 sm:p-5 space-y-4'>
                  <div className='grid grid-cols-2 gap-4 sm:gap-6'>
                    <div>
                      <p className='text-[10px] sm:text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1'>
                        Bank Name
                      </p>
                      <p className='font-semibold text-sm sm:text-base text-on-surface'>{bankDetails.bankName}</p>
                    </div>
                    <div>
                      <p className='text-[10px] sm:text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1'>
                        Account Number
                      </p>
                      <p className='font-semibold text-sm sm:text-base text-on-surface tracking-widest'>
                        {bankDetails.accountNumber}
                      </p>
                    </div>
                    <div>
                      <p className='text-[10px] sm:text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1'>
                        Account Holder
                      </p>
                      <p className='font-semibold text-sm sm:text-base text-on-surface'>{bankDetails.accountHolderName}</p>
                    </div>
                    <div>
                      <p className='text-[10px] sm:text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1'>
                        IFSC Code
                      </p>
                      <p className='font-semibold text-sm sm:text-base text-on-surface uppercase'>{bankDetails.ifsc}</p>
                    </div>
                    {bankDetails.upiId && (
                      <div className='col-span-2'>
                        <p className='text-[10px] sm:text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1'>
                          UPI ID
                        </p>
                        <p className='font-semibold text-sm sm:text-base text-on-surface'>{bankDetails.upiId}</p>
                      </div>
                    )}
                  </div>

                  <div className='mt-4 pt-4 border-t border-outline-variant/10'>
                    <div className='flex items-center gap-2'>
                      <div className={`w-2 h-2 rounded-full ${bankDetails.isVerified ? 'bg-emerald-500' : 'bg-orange-500'}`} />
                      <span className={`text-xs sm:text-sm font-semibold ${bankDetails.isVerified ? 'text-emerald-700' : 'text-orange-700'}`}>
                        {bankDetails.isVerified ? 'Verified Active Connection' : 'Verification Pending / Sync Requested'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className='space-y-4 sm:space-y-5'>
              <div className='bg-blue-50 border border-blue-100 rounded p-3 sm:p-4 mb-2'>
                <p className='text-xs sm:text-sm text-blue-900'>
                  <strong>Note:</strong> We will verify these details instantly to ensure you receive your payments. For security, please carefully enter your correct information.
                </p>
              </div>

              {/* Account Holder Name */}
              <div>
                <label className='block text-sm font-semibold text-on-surface mb-2'>
                  Account Holder Name <span className='text-red-500'>*</span>
                </label>
                <div className='relative'>
                  <div className='absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-on-surface-variant'>
                    <User className='w-4 h-4 sm:w-5 sm:h-5' />
                  </div>
                  <input
                    required
                    name='accountHolderName'
                    type='text'
                    value={formData.accountHolderName}
                    onChange={handleInputChange}
                    className='w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 border border-outline-variant rounded focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm sm:text-base'
                    placeholder='Full Name as per bank'
                    disabled={submitting}
                  />
                </div>
              </div>

              {/* Bank Name */}
              <div>
                <label className='block text-sm font-semibold text-on-surface mb-2'>
                  Bank Name <span className='text-red-500'>*</span>
                </label>
                <div className='relative'>
                  <div className='absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-on-surface-variant'>
                    <Building2 className='w-4 h-4 sm:w-5 sm:h-5' />
                  </div>
                  <input
                    name='bankName'
                    type='text'
                    value={formData.bankName}
                    onChange={handleInputChange}
                    className='w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 border border-outline-variant rounded focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm sm:text-base'
                    placeholder='Eg. State Bank of India'
                    disabled={submitting}
                  />
                </div>
              </div>

              {/* Account Number */}
              <div>
                <label className='block text-sm font-semibold text-on-surface mb-2 flex items-center gap-1.5'>
                  Account Number <span className='text-red-500'>*</span>
                  <Lock className='w-3 h-3 text-emerald-600 mb-0.5' />
                </label>
                <div className='relative'>
                  <div className='absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-on-surface-variant'>
                    <CreditCard className='w-4 h-4 sm:w-5 sm:h-5' />
                  </div>
                  <input
                    required
                    name='accountNumber'
                    type='text'
                    value={formData.accountNumber}
                    onChange={handleInputChange}
                    className='w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 border border-outline-variant rounded focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm sm:text-base font-medium placeholder:font-normal'
                    placeholder='Enter full account number'
                    disabled={submitting}
                  />
                </div>
              </div>

              {/* IFSC Code */}
              <div>
                <label className='block text-sm font-semibold text-on-surface mb-2'>
                  IFSC Code <span className='text-red-500'>*</span>
                </label>
                <div className='relative'>
                  <div className='absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-on-surface-variant'>
                    <span className='font-bold text-[10px] sm:text-xs'>IFSC</span>
                  </div>
                  <input
                    required
                    name='ifsc'
                    type='text'
                    value={formData.ifsc}
                    onChange={handleInputChange}
                    className='w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 border border-outline-variant rounded focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm sm:text-base uppercase placeholder:normal-case'
                    placeholder='Eg. SBIN0001234'
                    disabled={submitting}
                  />
                </div>
              </div>

              {/* UPI ID */}
              <div>
                <label className='block text-sm font-semibold text-on-surface mb-2'>
                  UPI ID (Optional)
                </label>
                <div className='relative'>
                  <div className='absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-xs sm:text-sm font-bold'>
                    @
                  </div>
                  <input
                    name='upiId'
                    type='text'
                    value={formData.upiId}
                    onChange={handleInputChange}
                    className='w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 border border-outline-variant rounded focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm sm:text-base'
                    placeholder='username@okbank'
                    disabled={submitting}
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className='flex flex-col-reverse sm:flex-row gap-3 pt-2'>
                {bankDetails && (
                  <button
                    type='button'
                    onClick={() => setIsEditing(false)}
                    className='w-full sm:w-auto px-6 py-2.5 sm:py-3 border border-outline-variant rounded font-semibold text-on-surface hover:bg-surface-container-low/50 transition-colors text-sm sm:text-base'
                    disabled={submitting}
                  >
                    Cancel
                  </button>
                )}
                <button
                  type='submit'
                  className='w-full sm:flex-1 px-6 py-2.5 sm:py-3 bg-primary text-white rounded font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base'
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <Loader2 className='w-4 h-4 animate-spin' />
                      Verifying...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
