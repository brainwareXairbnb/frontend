'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { authApi } from '@/lib/api'
import { toast } from 'sonner'
import { ShieldCheck, ArrowLeft, Mail, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function VerifyStudentEmailPage() {
  const router = useRouter()
  const { user, verifyStudentEmail } = useAuth()
  const [step, setStep] = useState<'email' | 'otp'>(
    user?.studentEmail ? 'otp' : 'email',
  )
  const [email, setEmail] = useState(user?.studentEmail || '')
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [resendLoading, setResendLoading] = useState(false)

  const handleLinkEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) {
      toast.error('Please enter your institutional email')
      return
    }

    // Validate domain
    if (!email.endsWith('@brainwareuniversity.ac.in')) {
      toast.error(
        'Please enter a valid Brainware University email (@brainwareuniversity.ac.in)',
      )
      return
    }

    setLoading(true)
    try {
      await authApi.linkStudentEmail(email)
      toast.success('Verification OTP sent to your institutional email')
      setStep('otp')
    } catch (error: any) {
      toast.error('Failed to send verification email', {
        description: error.message || 'Please try again',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    if (otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP')
      return
    }

    setLoading(true)
    try {
      // Use the context method which updates user state automatically
      await verifyStudentEmail(otp)
      toast.success('Student email verified successfully!', {
        description: 'You are now a verified student',
      })
      // Small delay to ensure context update propagates before navigation
      setTimeout(() => {
        router.push('/student/profile')
      }, 100)
    } catch (error: any) {
      toast.error('Verification failed', {
        description: error.message || 'Invalid OTP. Please try again.',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleResendOTP = async () => {
    setResendLoading(true)
    try {
      await authApi.resendStudentOTP()
      toast.success('New OTP sent to your institutional email')
    } catch (error: any) {
      toast.error('Failed to resend OTP', {
        description: error.message || 'Please try again',
      })
    } finally {
      setResendLoading(false)
    }
  }

  if (!user || user.role !== 'student') {
    return (
      <div className='min-h-screen bg-white flex items-center justify-center'>
        <div className='text-center'>
          <p className='text-gray-600 mb-4'>
            This page is only accessible to students
          </p>
          <Button onClick={() => router.push('/')}>Go Home</Button>
        </div>
      </div>
    )
  }

  if (user.isStudentVerified) {
    return (
      <div className='min-h-screen bg-white flex items-center justify-center'>
        <div className='text-center max-w-md'>
          <div className='w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-4'>
            <ShieldCheck className='w-8 h-8 text-emerald-600' />
          </div>
          <h2 className='text-2xl font-semibold text-gray-900 mb-2'>
            Already Verified
          </h2>
          <p className='text-gray-600 mb-6'>
            Your student email is already verified
          </p>
          <Button onClick={() => router.push('/student/profile')}>
            Go to Profile
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-white'>
      <div className='max-w-2xl mx-auto px-6 sm:px-8 py-8 sm:py-12'>
        {/* Back Button */}
        <button
          onClick={() => router.push('/student/profile')}
          className='flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors'
        >
          <ArrowLeft className='w-5 h-5' />
          <span className='font-medium'>Back to Profile</span>
        </button>

        {/* Header */}
        <div className='text-center mb-10'>
          <div className='w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4'>
            <ShieldCheck className='w-8 h-8 text-blue-600' />
          </div>
          <h1 className='text-3xl font-semibold text-gray-900 mb-2'>
            Verify Student Email
          </h1>
          <p className='text-gray-600'>
            Link your institutional email to verify your student status
          </p>
        </div>

        {/* Main Card */}
        <div className='bg-white border border-gray-200 rounded-2xl p-8 shadow-sm'>
          {step === 'email' ? (
            <form onSubmit={handleLinkEmail} className='space-y-6'>
              <div>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium text-gray-900 mb-2'
                >
                  Institutional Email
                </label>
                <div className='relative border rounded px-2'>
                  <Mail className='absolute top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400' />
                  <Input
                    id='email'
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='your.email@brainwareuniversity.ac.in'
                    className='pl-10'
                    required
                    disabled={loading}
                  />
                </div>
                <p className='mt-2 text-xs text-gray-500'>
                  Use your official Brainware University email address
                </p>
              </div>

              <Button
                type='submit'
                className='w-full'
                disabled={loading || !email.trim()}
              >
                {loading ? (
                  <>
                    <Loader2 className='w-4 h-4 animate-spin' />
                    Sending OTP...
                  </>
                ) : (
                  <>
                    <Mail className='w-4 h-4' />
                    Send Verification OTP
                  </>
                )}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP} className='space-y-6'>
              <div className='mb-4'>
                <p className='text-sm text-blue-900'>
                  We've sent a 6-digit OTP to <strong>{email}</strong>
                </p>
              </div>

              <div>
                <label
                  htmlFor='otp'
                  className='block text-sm font-medium text-gray-900 mb-2'
                >
                  Verification Code
                </label>
                <Input
                  id='otp'
                  type='text'
                  value={otp}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 6)
                    setOtp(value)
                  }}
                  placeholder='Enter 6-digit OTP'
                  maxLength={6}
                  className='text-center text-xl tracking-widest font-semibold border rounded px-2'
                  required
                  disabled={loading}
                />
              </div>

              <Button
                type='submit'
                className='w-full'
                disabled={loading || otp.length !== 6}
              >
                {loading ? (
                  <>
                    <Loader2 className='w-4 h-4 animate-spin' />
                    Verifying...
                  </>
                ) : (
                  <>
                    <ShieldCheck className='w-4 h-4' />
                    Verify Email
                  </>
                )}
              </Button>

              <div className='text-center'>
                <button
                  type='button'
                  onClick={handleResendOTP}
                  disabled={resendLoading}
                  className='text-sm text-[#FF385C] hover:text-[#E31C5F] font-medium disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  {resendLoading ? 'Sending...' : "Didn't receive? Resend OTP"}
                </button>
              </div>

              <div className='pt-4 border-t border-gray-200'>
                <button
                  type='button'
                  onClick={() => {
                    setStep('email')
                    setOtp('')
                  }}
                  className='text-sm text-gray-600 hover:text-gray-900'
                >
                  Change email address
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Info Box */}
        <div className='mt-8 bg-gray-50 border border-gray-200 rounded p-6'>
          <h3 className='font-semibold text-gray-900 mb-3'>
            Why verify your student email?
          </h3>
          <ul className='space-y-2 text-sm text-gray-600'>
            <li className='flex items-start gap-2'>
              <ShieldCheck className='w-4 h-4 text-emerald-600 mt-0.5 shrink-0' />
              <span>Get verified student status and badge</span>
            </li>
            <li className='flex items-start gap-2'>
              <ShieldCheck className='w-4 h-4 text-emerald-600 mt-0.5 shrink-0' />
              <span>Build trust with property owners</span>
            </li>
            <li className='flex items-start gap-2'>
              <ShieldCheck className='w-4 h-4 text-emerald-600 mt-0.5 shrink-0' />
              <span>Rewards system in the future</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
