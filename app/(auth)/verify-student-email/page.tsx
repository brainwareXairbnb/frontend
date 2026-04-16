'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { authApi } from '@/lib/api'
import { toast } from 'sonner'
import {
  GraduationCap,
  Home,
  Fingerprint,
  ArrowLeft,
  RotateCcw,
  Loader2,
  ShieldCheck
} from 'lucide-react'
import { Button } from '@/components/ui/button'

function VerifyStudentEmailForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [resending, setResending] = useState(false)
  const [timer, setTimer] = useState(30)

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer]);

  useEffect(() => {
    const emailParam = searchParams.get('email')
    if (emailParam) {
      setEmail(emailParam)
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (!otp || otp.length !== 6) {
      toast.error('Identity Sequence Invalid', { description: 'Please enter the 6-digit OTP' })
      setLoading(false)
      return
    }

    try {
      await authApi.verifyStudentEmail(otp);
      toast.success('Scholar Identity Validated')
      setSuccess(true)

      setTimeout(() => {
        router.push('/')
      }, 2000)
    } catch (err: any) {
      toast.error('Validation Failed', { description: err.message || 'Please try again.' })
    } finally {
      setLoading(false)
    }
  }


  const handleResendOTP = async () => {
    setResending(true)

    try {
      await authApi.resendStudentOTP();
      toast.success('New Sequence Dispatched')
      setTimer(30)
    } catch (err: any) {
      toast.error('Dispatch Failed', { description: err.message || 'Please try again later' })
    } finally {
      setResending(false)
    }
  }

  if (success) {
    return (
      <div className='min-h-screen flex items-center justify-center p-4 bg-white'>
        <div className='w-full max-w-md bg-white border border-outline-variant/10 rounded-[3rem] p-12 shadow-2xl text-center animate-in fade-in zoom-in duration-700'>
          <div className='w-20 h-20 bg-indigo-600 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-xl shadow-indigo-500/20'>
            <GraduationCap className='text-white w-10 h-10' />
          </div>
          <h2 className='text-3xl font-headline font-black text-on-surface tracking-tighter mb-4 uppercase'>Scholar Verified</h2>
          <p className='text-sm font-medium text-on-surface-variant leading-relaxed opacity-60 mb-8'>
            Your academic credentials have been successfully validated. Welcome to the Brainware Rooms scholar network.
          </p>
          <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-600 animate-progress origin-left"></div>
          </div>
        </div>
        <style jsx>{`
          @keyframes progress {
            0% { transform: scaleX(0); }
            100% { transform: scaleX(1); }
          }
          .animate-progress {
            animation: progress 2s linear forwards;
          }
        `}</style>
      </div>
    )
  }

  return (
    <div className='min-h-screen flex flex-col md:flex-row overflow-hidden bg-white'>
      {/* Left Side */}
      <div className='hidden md:flex md:w-1/2 lg:w-3/5 relative bg-slate-900 overflow-hidden'>
        <div className='absolute inset-0 z-10 bg-gradient-to-tr from-slate-900 via-slate-900/40 to-transparent'></div>
        <img
          className='absolute inset-0 w-full h-full object-cover grayscale opacity-40 mix-blend-overlay scale-110'
          src='https://images.unsplash.com/photo-1523050853064-8521a3998319?w=1200&h=1600&fit=crop'
          alt='Academic excellence'
        />
        <div className='relative z-20 mt-auto p-20 max-w-2xl animate-in slide-in-from-left duration-1000'>
          <div className='mb-8 flex items-center gap-4'>
            <div className='h-0.5 w-16 bg-primary'></div>
            <span className='font-headline font-black uppercase tracking-[0.3em] text-surface text-[10px] opacity-60'>
              Academic Protocol
            </span>
          </div>
          <h1 className='font-headline text-6xl lg:text-8xl font-black text-surface leading-[0.95] tracking-tighter mb-10'>
            Scholar <br />
            <span className='text-primary'>Validation.</span>
          </h1>
          <p className='text-xl font-medium text-surface/60 leading-relaxed max-w-md uppercase tracking-widest text-[12px]'>
            Finalize your node activation within the university network to unlock exclusive scholar rates and priority modules.
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className='flex-1 flex flex-col items-center md:justify-center p-6 md:p-10 lg:p-12 pt-6 md:pt-8 lg:pt-10 bg-white overflow-y-auto'>
        <header className='w-full max-w-md mb-6 md:mb-8 animate-in fade-in slide-in-from-top-4 duration-700'>
          <Link href='/' className='flex items-center gap-3 mb-8 md:mb-10 group'>
            <div className='w-12 h-12 bg-primary flex items-center justify-center rounded-2xl shadow-xl shadow-primary/20 group-hover:rotate-12 transition-transform'>
              <Home className='w-6 h-6 text-white' />
            </div>
            <span className='font-headline font-black text-2xl tracking-tighter text-on-surface uppercase group-hover:text-primary transition-colors'>
              Brainware <span className='text-primary/40'>Rooms</span>
            </span>
          </Link>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 bg-indigo-500/10 rounded-lg flex items-center justify-center text-indigo-600">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600">Scholar Verification</h2>
          </div>
          <h2 className='text-4xl font-headline font-black text-on-surface tracking-tighter mb-3 uppercase'>Institutional Check</h2>
          <p className='text-[10px] font-black tracking-[0.2em] text-on-surface-variant opacity-60'>
            Code sent to <span className='text-on-surface opacity-100'>{email || 'university address'}</span>
          </p>
        </header>

        <main className='w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100'>
          <form onSubmit={handleSubmit} className='space-y-4'>

            <div className='space-y-2'>
              <div className="flex justify-between items-center px-1">
                <label className='text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-40'>
                  Scholar Code (OTP)
                </label>
                <Fingerprint className="w-4 h-4 text-primary opacity-40" />
              </div>
              <div className='relative group/input'>
                <input
                  className='w-full h-16 md:h-20 bg-[#FAFAFA] border-2 border-outline-variant/5 rounded-2xl px-6 text-2xl md:text-3xl font-black text-on-surface focus:border-primary focus:bg-white outline-none transition-all tracking-[0.4em] md:tracking-[0.8em] text-center placeholder:opacity-20'
                  id='otp'
                  type='text'
                  placeholder='000000'
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  required
                  disabled={loading}
                  autoFocus
                />
              </div>
              <p className='text-[9px] text-center font-black uppercase tracking-widest text-on-surface-variant opacity-30'>
                Code expires in 15 minutes
              </p>
            </div>

            <Button
              className='w-full h-14 md:h-16 bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-500/20'
              type='submit'
              disabled={loading}
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Confirm Status'}
            </Button>
          </form>

          <div className='text-center mt-6 space-y-2'>
            <p className='text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-40'>
              Scholar code not received?
            </p>
            <Button
              variant="outline"
              onClick={handleResendOTP}
              disabled={resending || timer > 0}
              className='w-full h-12 rounded-2xl'
            >
              <RotateCcw className={`w-3.5 h-3.5 ${resending ? 'animate-spin' : ''}`} />
              {resending ? 'DISPATCHING...' : timer > 0 ? `Resend in ${timer}s` : 'Resend Code'}
            </Button>
          </div>

          <div className='text-center mt-6'>
            <Link
              href='/student/profile'
              className='text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] hover:text-primary transition-all inline-flex items-center gap-2 group'
            >
              <ArrowLeft className='w-4 h-4 group-hover:-translate-x-1 transition-transform' />
              Return to Profile
            </Link>
          </div>
        </main>

        <footer className='w-full max-w-md mt-10 md:mt-12 text-center opacity-40 border-t border-outline-variant/5 pt-6'>
          <p className='text-[9px] font-black uppercase tracking-[0.2em] text-on-surface-variant leading-relaxed'>
            Secured via Brainware Rooms Identity Service <br />
            &copy; 2026 BWU Ecosytem Node
          </p>
        </footer>
      </div>
    </div>
  )
}

export default function VerifyStudentEmailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      </div>
    }>
      <VerifyStudentEmailForm />
    </Suspense>
  )
}
