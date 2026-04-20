'use client'

import { useState } from 'react'
import Link from 'next/link'
import { authApi } from '@/lib/api'
import { toast } from 'sonner'
import {
  ShieldAlert,
  Mail,
  ArrowLeft,
  ChevronRight,
  Home,
  ArrowRight,
  Send,
  Loader2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Logo from '@/components/Logo'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await authApi.forgotPassword(email)
      toast.success('Restoration Initialized', {
        description: 'Success sequence dispatched',
      })
      setSuccess(true)
    } catch (err: any) {
      toast.error('Initialization Failed', {
        description: err.message || 'Please try again.',
      })
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className='min-h-screen flex items-center justify-center p-4 bg-[#F8F9FA] relative overflow-hidden font-sans'>
        {/* Decorative Background Elements */}
        <div className='absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]'></div>
        <div className='absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]'></div>

        <div className='w-full max-w-md bg-white border border-outline-variant/10 rounded-[2.5rem] p-10 md:p-14 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] text-center animate-in fade-in zoom-in duration-1000 relative z-10'>
          <div className='relative w-24 h-24 mx-auto mb-10 group'>
            <div className='absolute inset-0 bg-emerald-500/20 rounded-[2.5rem] animate-ping duration-[3000ms]'></div>
            <div className='relative w-full h-full bg-emerald-500 rounded-[2.2rem] flex items-center justify-center shadow-2xl shadow-emerald-500/30'>
              <Mail className='text-white w-10 h-10 animate-bounce-subtle' />
            </div>
          </div>

          <div className='space-y-2 mb-8'>
            <h2 className='text-[10px] font-black uppercase tracking-[0.4em] text-emerald-600 mb-2'>
              Check your email
            </h2>
            <h1 className='text-3xl font-headline font-black text-on-surface tracking-tighter uppercase leading-none'>
              Reset link <br />
              <span className='text-primary/40'>sent</span>
            </h1>
          </div>

          <p className='text-[11px] font-medium text-on-surface-variant leading-relaxed opacity-60 mb-12 max-w-[280px] mx-auto uppercase tracking-widest'>
            We’ve sent a password reset link to your email.
            <span className='text-on-surface opacity-100 font-bold'>
              {email}
            </span>
            .
          </p>

          <div className='space-y-6'>
            <Link
              href={`/reset-password?email=${encodeURIComponent(email)}`}
              className='block'
            >
              <Button
                variant='default'
                rounded='2xl'
                className='w-full h-14 text-xs'
              >
                Enter reset code
                <ArrowRight className='w-4 h-4 ml-2' />
              </Button>
            </Link>

            <Link
              href='/login'
              className='inline-flex items-center gap-2 text-[10px] font-black text-on-surface-variant uppercase tracking-[0.3em] hover:text-primary transition-all group'
            >
              <ArrowLeft className='w-3 h-3 group-hover:-translate-x-1 transition-transform' />
              Return to Login
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen flex flex-col md:flex-row overflow-hidden bg-white'>
      {/* Left Side */}
      <div className='hidden md:flex md:w-1/2 lg:w-3/5 relative bg-on-surface overflow-hidden'>
        <div className='absolute inset-0 z-10 bg-gradient-to-tr from-on-surface via-on-surface/40 to-transparent'></div>
        <img
          className='absolute inset-0 w-full h-full object-cover grayscale opacity-60 mix-blend-overlay scale-110'
          src='https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&h=1600&fit=crop'
          alt='University node'
        />
        <div className='relative z-20 mt-auto p-20 max-w-2xl animate-in slide-in-from-left duration-1000'>
          <div className='mb-8 flex items-center gap-4'>
            <div className='h-0.5 w-16 bg-primary'></div>
            <span className='font-headline font-black uppercase tracking-[0.3em] text-surface text-[10px] opacity-60'>
              Identity Recovery
            </span>
          </div>
          <h1 className='font-headline text-6xl lg:text-8xl font-black text-surface leading-[0.95] tracking-tighter mb-10'>
            Secure Key <br />
            <span className='text-primary'>Restoration.</span>
          </h1>
          <p className='text-xl font-medium text-surface/60 leading-relaxed max-w-md uppercase tracking-widest text-[12px]'>
            We'll transmit a secure encrypted link to recalibrate your account
            credentials and restore access.
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className='flex-1 flex flex-col items-center md:justify-center p-6 md:p-16 lg:p-24 bg-white overflow-y-auto'>
        <header className='w-full max-w-md mb-12 md:mb-20 animate-in fade-in slide-in-from-top-4 duration-1000'>
          <Logo heading='Account Access' />
          <div className='flex items-center gap-3 mb-5 group/lock'>
            <div className='w-8 h-8 bg-red-500/10 rounded-xl flex items-center justify-center text-red-500 group-hover/lock:scale-110 transition-transform'>
              <ShieldAlert className='w-4 h-4' />
            </div>
            <div className='h-[1px] flex-1 bg-outline-variant/10'></div>
            <h2 className='text-[9px] font-black uppercase tracking-[0.4em] text-red-500'>
              Reset your password
            </h2>
          </div>

          <h2 className='text-5xl font-headline font-black text-on-surface tracking-tighter mb-4 uppercase leading-[0.9]'>
            Forgot your <br />
            <span className='text-primary'>password?</span>
          </h2>
          <p className='text-[10px] font-black uppercase tracking-[0.3em] text-on-surface-variant opacity-40 ml-1 leading-relaxed'>
            Enter your email address and we’ll send you a link to reset your
            password.
          </p>
        </header>

        <main className='w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100'>
          <form onSubmit={handleSubmit} className='space-y-6 md:space-y-10'>
            <div className='space-y-4'>
              <div className='flex justify-between items-center px-1'>
                <label className='text-[9px] font-black uppercase tracking-[0.3em] text-on-surface-variant opacity-40'>
                  Email Address
                </label>
                <div className='w-1.5 h-1.5 rounded-full bg-primary/20'></div>
              </div>
              <div className='relative group/input'>
                <Mail className='absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant/20 group-focus-within/input:text-primary transition-all duration-300' />
                <input
                  className='w-full h-14 bg-[#FAFAFA] border-2 border-outline-variant/10 rounded pl-16 pr-6 text-sm font-black text-on-surface focus:border-primary focus:bg-white focus:shadow-xl focus:shadow-primary/5 outline-none transition-all duration-300 placeholder:opacity-30 uppercase tracking-widest'
                  id='email'
                  type='email'
                  placeholder='Enter your email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <Button className='w-full' type='submit' disabled={loading}>
              {loading ? (
                <Loader2 className='w-4 h-4 animate-spin' />
              ) : (
                'Send Reset Link'
              )}
              {!loading && (
                <Send className='w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform' />
              )}
            </Button>
          </form>

          <div className='text-center mt-12'>
            <Link
              href='/login'
              className='text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] hover:text-primary transition-all inline-flex items-center gap-2 group'
            >
              <ArrowLeft className='w-4 h-4 group-hover:-translate-x-1 transition-transform' />
              Return to Login
            </Link>
          </div>
        </main>
      </div>
    </div>
  )
}
