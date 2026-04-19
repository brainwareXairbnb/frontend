'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { toast } from 'sonner'
import { User, Mail, Phone, ChevronLeft, Loader2, KeyRound } from 'lucide-react'
import { userApi } from '@/lib/api'

interface PersonalInfoFormProps {
  backPath: string
  userRole: 'owner' | 'admin'
}

export function PersonalInfoForm({
  backPath,
  userRole,
}: PersonalInfoFormProps) {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const [loading, setLoading] = useState(false)
  const [showOtpInput, setShowOtpInput] = useState(false)
  const [pendingEmail, setPendingEmail] = useState('')
  const [otp, setOtp] = useState('')

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || user?.phoneNumber || '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!formData.name.trim()) {
      toast.error('Name is required')
      return
    }

    if (!formData.email.trim()) {
      toast.error('Email is required')
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address')
      return
    }

    try {
      setLoading(true)
      const response = await userApi.updateProfile({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
      })

      if (response.requiresVerification) {
        // Email changed - show OTP input
        setPendingEmail(response.pendingEmail || formData.email)
        setShowOtpInput(true)
        toast.success('Verification OTP sent to your new email')
      } else {
        // Profile updated without email change
        toast.success('Profile updated successfully')
        router.push(backPath)
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!otp || otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP')
      return
    }

    try {
      setLoading(true)
      await userApi.verifyEmailChange(otp)
      toast.success('Email changed successfully')
      router.push(backPath)
      // Reload to update auth context
      window.location.reload()
    } catch (error: any) {
      toast.error(error.message || 'Invalid OTP')
    } finally {
      setLoading(false)
    }
  }

  const handleCancelVerification = () => {
    setShowOtpInput(false)
    setPendingEmail('')
    setOtp('')
    setFormData({ ...formData, email: user?.email || '' })
  }

  if (authLoading) {
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
            onClick={() => router.push(backPath)}
            className='flex items-center gap-2 text-on-surface-variant hover:text-on-surface transition-colors mb-3 sm:mb-4'
          >
            <ChevronLeft className='w-4 h-4 sm:w-5 sm:h-5' />
            <span className='text-sm sm:text-base font-medium'>Back</span>
          </button>
          <h1 className='text-xl sm:text-2xl font-bold text-on-surface'>
            Personal Info
          </h1>
          <p className='text-xs sm:text-sm text-on-surface-variant mt-1'>
            Update your personal information
          </p>
        </div>
      </div>

      {/* Form */}
      <div className='max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8'>
        <div className='bg-white'>
          {showOtpInput ? (
            /* OTP Verification Form */
            <form onSubmit={handleVerifyOtp} className='space-y-4 sm:space-y-5'>
              <div className='bg-blue-50 border border-blue-100 rounded-lg p-4'>
                <p className='text-sm text-blue-900 mb-2'>
                  <strong>Email Verification Required</strong>
                </p>
                <p className='text-xs text-blue-800'>
                  We've sent a 6-digit verification code to{' '}
                  <strong>{pendingEmail}</strong>. Please enter the code below
                  to complete your email change.
                </p>
              </div>

              <div>
                <label className='block text-sm font-semibold text-on-surface mb-2'>
                  Verification Code
                </label>
                <div className='relative'>
                  <div className='absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-on-surface-variant'>
                    <KeyRound className='w-4 h-4 sm:w-5 sm:h-5' />
                  </div>
                  <input
                    type='text'
                    value={otp}
                    onChange={(e) =>
                      setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))
                    }
                    className='w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 border border-outline-variant rounded focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm sm:text-base tracking-widest text-center font-mono'
                    placeholder='000000'
                    maxLength={6}
                    disabled={loading}
                    autoFocus
                  />
                </div>
              </div>

              <div className='flex flex-col-reverse sm:flex-row gap-3 pt-2'>
                <button
                  type='button'
                  onClick={handleCancelVerification}
                  className='w-full sm:w-auto px-6 py-2.5 sm:py-3 border border-outline-variant rounded font-semibold text-on-surface hover:bg-surface-container-low/50 transition-colors text-sm sm:text-base'
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  className='w-full sm:flex-1 px-6 py-2.5 sm:py-3 bg-primary text-white rounded font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base'
                  disabled={loading || otp.length !== 6}
                >
                  {loading ? (
                    <>
                      <Loader2 className='w-4 h-4 animate-spin' />
                      Verifying...
                    </>
                  ) : (
                    'Verify Email'
                  )}
                </button>
              </div>
            </form>
          ) : (
            /* Profile Update Form */
            <form onSubmit={handleSubmit} className='space-y-4 sm:space-y-5'>
              {/* Name */}
              <div>
                <label className='block text-sm font-semibold text-on-surface mb-2'>
                  Full Name <span className='text-red-500'>*</span>
                </label>
                <div className='relative'>
                  <div className='absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-on-surface-variant'>
                    <User className='w-4 h-4 sm:w-5 sm:h-5' />
                  </div>
                  <input
                    type='text'
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className='w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 border border-outline-variant rounded focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm sm:text-base'
                    placeholder='Enter your full name'
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className='block text-sm font-semibold text-on-surface mb-2'>
                  Email Address <span className='text-red-500'>*</span>
                </label>
                <div className='relative'>
                  <div className='absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-on-surface-variant'>
                    <Mail className='w-4 h-4 sm:w-5 sm:h-5' />
                  </div>
                  <input
                    type='email'
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className='w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 border border-outline-variant rounded focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm sm:text-base'
                    placeholder='Enter your email address'
                    disabled={loading}
                  />
                </div>
                <p className='mt-1.5 text-xs text-on-surface-variant'>
                  This email is used for login and notifications
                </p>
              </div>

              {/* Phone (Optional for admin, required for owner) */}
              <div>
                <label className='block text-sm font-semibold text-on-surface mb-2'>
                  Phone Number{' '}
                  {userRole === 'owner' && (
                    <span className='text-red-500'>*</span>
                  )}
                </label>
                <div className='relative'>
                  <div className='absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-on-surface-variant'>
                    <Phone className='w-4 h-4 sm:w-5 sm:h-5' />
                  </div>
                  <input
                    type='tel'
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className='w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 border border-outline-variant rounded focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm sm:text-base'
                    placeholder='Enter your phone number'
                    disabled={loading}
                  />
                </div>
                {userRole === 'owner' && (
                  <p className='mt-1.5 text-xs text-on-surface-variant'>
                    Required for property management and tenant communication
                  </p>
                )}
              </div>

              {/* Info box */}
              <div className='bg-blue-50 border border-blue-100 rounded-lg p-3 sm:p-4'>
                <p className='text-xs sm:text-sm text-blue-900'>
                  <strong>Note:</strong> Changing your email will require
                  verification. You'll receive a confirmation email at your new
                  address.
                </p>
              </div>

              {/* Buttons */}
              <div className='flex flex-col-reverse sm:flex-row gap-3 pt-2'>
                <button
                  type='button'
                  onClick={() => router.push(backPath)}
                  className='w-full sm:w-auto px-6 py-2.5 sm:py-3 border border-outline-variant rounded font-semibold text-on-surface hover:bg-surface-container-low/50 transition-colors text-sm sm:text-base'
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  className='w-full sm:flex-1 px-6 py-2.5 sm:py-3 bg-primary text-white rounded font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base'
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className='w-4 h-4 animate-spin' />
                      Saving...
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
