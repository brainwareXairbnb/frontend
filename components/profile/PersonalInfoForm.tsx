'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { toast } from 'sonner'
import { User, Mail, Phone, Loader2, KeyRound, Save, Info } from 'lucide-react'
import { userApi } from '@/lib/api'
import ProfilePictureUpload from './ProfilePictureUpload'

interface PersonalInfoFormProps {
  backPath: string
  userRole: 'owner' | 'admin' | 'student'
}

export function PersonalInfoForm({
  backPath,
  userRole,
}: PersonalInfoFormProps) {
  const router = useRouter()
  const { user, loading: authLoading, refreshUser } = useAuth()
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
        await refreshUser()
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
      await refreshUser()
      toast.success('Email changed successfully')
      router.push(backPath)
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
    <>
      {/* Mobile View - EXACTLY like previous */}
      <div className='md:hidden min-h-screen bg-[#fafafa]'>
        {/* Header */}
        <div className='bg-white border-b border-outline-variant/10'>
          <div className='max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6'>
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
                {/* Profile Picture */}
                <div className='py-6 border-b border-outline-variant/10'>
                  <ProfilePictureUpload
                    currentPictureUrl={user?.profilePicUrl}
                    onUploadSuccess={(url) => {
                      toast.success('Profile picture updated successfully')
                      refreshUser()
                    }}
                    onDeleteSuccess={() => {
                      toast.success('Profile picture removed successfully')
                      refreshUser()
                    }}
                  />
                </div>

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

                {/* Phone */}
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
                <div className='bg-blue-50 border border-blue-100 rounded p-3 sm:p-4'>
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

      {/* Desktop View - Gadget Restore Layout */}
      <div className='hidden md:block min-h-screen bg-slate-50/50'>
        <div className='container mx-auto px-6 py-8'>
          {/* Breadcrumbs */}
          <div className='flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6 uppercase tracking-wider'>
            <button
              type='button'
              onClick={() => router.push(backPath)}
              className='hover:text-slate-800 transition-colors cursor-pointer bg-transparent border-0'
            >
              Profile
            </button>
            <span className='text-slate-300'>/</span>
            <span className='text-slate-800'>Personal Information</span>
          </div>

          {/* Form Card Wrapper */}
          <div className='bg-white rounded-2xl border border-slate-100 shadow-sm p-8'>
            {/* Header */}
            <div>
              <h1 className='text-2xl font-bold text-slate-900'>
                Personal Information
              </h1>
              <p className='text-sm text-slate-500 mt-1'>
                Manage your name and email address
              </p>
            </div>

            <div className='border-b border-slate-100 my-6' />

            {showOtpInput ? (
              /* OTP Verification Form */
              <form onSubmit={handleVerifyOtp} className='space-y-6'>
                <div className='bg-blue-50/40 border border-blue-100/60 rounded-xl p-4 flex items-start gap-3'>
                  <KeyRound className='w-5 h-5 text-blue-600 shrink-0 mt-0.5' />
                  <div className='text-xs text-blue-800 leading-relaxed'>
                    <strong>Email Verification Required</strong>
                    <p className='mt-1 text-blue-700'>
                      We've sent a 6-digit verification code to <strong>{pendingEmail}</strong>. Please enter the code below to complete your email change.
                    </p>
                  </div>
                </div>

                <div>
                  <label className='text-[11px] font-bold text-slate-500 tracking-wider uppercase mb-2 block'>
                    Verification Code
                  </label>
                  <input
                    type='text'
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className='w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 tracking-widest text-center font-mono focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-lg transition-all'
                    placeholder='000000'
                    maxLength={6}
                    disabled={loading}
                    autoFocus
                  />
                </div>

                <div className='border-b border-slate-100 my-6' />

                <div className='flex justify-between items-center gap-3 pt-2'>
                  <button
                    type='button'
                    onClick={handleCancelVerification}
                    className='px-6 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-50 transition-colors uppercase tracking-wider cursor-pointer'
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button
                    type='submit'
                    className='px-6 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider shadow-sm disabled:opacity-50 disabled:cursor-not-allowed'
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
              <form onSubmit={handleSubmit} className='space-y-6'>
                <div className='grid grid-cols-1 md:grid-cols-12 gap-8 items-start'>
                  {/* Form Fields Column */}
                  <div className='md:col-span-7 space-y-6'>
                    {/* Full Name */}
                    <div>
                      <label className='text-[11px] font-bold text-slate-500 tracking-wider uppercase mb-2 block'>
                        Full Name <span className='text-red-500'>*</span>
                      </label>
                      <input
                        type='text'
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className='w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all'
                        placeholder='Enter your full name'
                        disabled={loading}
                      />
                    </div>

                    {/* Email Address */}
                    <div>
                      <label className='text-[11px] font-bold text-slate-500 tracking-wider uppercase mb-2 block'>
                        Email Address <span className='text-red-500'>*</span>
                      </label>
                      <input
                        type='email'
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className='w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all'
                        placeholder='Enter your email address'
                        disabled={loading}
                      />
                      <p className='mt-1.5 text-xs text-slate-400'>
                        This email is used for login and notifications
                      </p>
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className='text-[11px] font-bold text-slate-500 tracking-wider uppercase mb-2 block'>
                        Phone Number {userRole === 'owner' && <span className='text-red-500'>*</span>}
                      </label>
                      <input
                        type='tel'
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className='w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all'
                        placeholder='Enter your phone number'
                        disabled={loading}
                      />
                      {userRole === 'owner' && (
                        <p className='mt-1.5 text-xs text-slate-400'>
                          Required for property management and tenant communication
                        </p>
                      )}
                    </div>

                    {/* Email Note Info Box */}
                    <div className='bg-blue-50/40 border border-blue-100/60 rounded-xl p-4 flex items-start gap-3'>
                      <Info className='w-5 h-5 text-blue-600 shrink-0 mt-0.5' />
                      <div className='text-xs text-blue-800 leading-relaxed'>
                        <strong>Note:</strong> Changing your email will require verification. You'll receive a confirmation email at your new address.
                      </div>
                    </div>
                  </div>

                  {/* Profile Picture Upload Column */}
                  <div className='md:col-span-5 flex flex-col items-center justify-center p-6 bg-slate-50/30 rounded-2xl border border-slate-100 border-dashed'>
                    <span className='text-[11px] font-bold text-slate-500 tracking-wider uppercase mb-4 block'>
                      Profile Picture
                    </span>
                    <ProfilePictureUpload
                      currentPictureUrl={user?.profilePicUrl}
                      onUploadSuccess={(url) => {
                        toast.success('Profile picture updated successfully')
                        refreshUser()
                      }}
                      onDeleteSuccess={() => {
                        toast.success('Profile picture removed successfully')
                        refreshUser()
                      }}
                    />
                  </div>
                </div>

                <div className='border-b border-slate-100 my-6' />

                <div className='flex justify-between items-center gap-3 pt-2'>
                  <button
                    type='button'
                    onClick={() => router.push(backPath)}
                    className='px-6 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-50 transition-colors uppercase tracking-wider cursor-pointer'
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button
                    type='submit'
                    className='px-6 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-all flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider shadow-sm disabled:opacity-50 disabled:cursor-not-allowed'
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className='w-4 h-4 animate-spin' />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className='w-4 h-4' />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
