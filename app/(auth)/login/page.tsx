'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/lib/auth-context'
import { toast } from 'sonner'
import {
  Home,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  ChevronRight,
  Loader2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

function LoginForm() {
  const router = useRouter()
  const { login, user } = useAuth()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const redirectTo = searchParams.get('redirect') || '/'

  useEffect(() => {
    if (user) {
      if (redirectTo && redirectTo !== '/') {
        router.push(redirectTo)
      } else {
        if (user.role === 'student') router.push('/')
        else if (user.role === 'owner') router.push('/owner')
        else if (user.role === 'admin') router.push('/admin')
      }
    }
  }, [user, redirectTo, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await login(email, password)
      toast.success('Access Granted')
    } catch (err: any) {
      toast.error('Access Denied')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen flex flex-col md:flex-row overflow-hidden bg-white'>
      {/* Left Side */}
      <div className='hidden md:flex md:w-1/2 lg:w-3/5 relative bg-on-surface overflow-hidden'>
        <div className='absolute inset-0 z-10 bg-gradient-to-tr from-on-surface via-on-surface/40 to-transparent'></div>
        <img
          className='absolute inset-0 w-full h-full object-cover grayscale opacity-60 mix-blend-overlay scale-110'
          src='https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&h=1600&fit=crop'
          alt='University landscape'
        />

        <div className='relative z-20 mt-auto p-20 max-w-2xl animate-in slide-in-from-left duration-1000'>
          <div className='mb-8 flex items-center gap-4'>
            <div className='h-0.5 w-16 bg-primary'></div>
            <span className='font-headline font-black uppercase tracking-[0.3em] text-surface text-[10px] opacity-60'>
              The Curated Module
            </span>
          </div>
          <h1 className='font-headline text-6xl lg:text-8xl font-black text-surface leading-[0.95] tracking-tighter mb-10'>
            Elevated Living for <br />
            <span className='text-primary'>Scholarly Minds.</span>
          </h1>
          <p className='text-xl font-medium text-surface/60 leading-relaxed max-w-md uppercase tracking-widest text-[12px]'>
            Welcome to the Hub. Synchronize your academic lifestyle with our
            premium residency network.
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className='flex-1 flex flex-col items-center md:justify-center p-6 md:p-12 lg:p-16 bg-white overflow-y-auto'>
        <header className='w-full max-w-md mb-6 md:mb-10 animate-in fade-in slide-in-from-top-4 duration-700'>
          <Link
            href='/'
            className='flex items-center gap-3 mb-6 md:mb-10 group'
          >
            <div className='w-10 h-10 md:w-12 md:h-12 bg-primary flex items-center justify-center rounded-xl md:rounded-2xl shadow-xl shadow-primary/20 group-hover:rotate-12 transition-transform'>
              <Home className='w-5 h-5 md:w-6 md:h-6 text-white' />
            </div>
            <span className='font-headline font-black text-xl md:text-2xl tracking-tighter text-on-surface uppercase group-hover:text-primary transition-colors'>
              Brainware <span className='text-primary/40'>Rooms</span>
            </span>
          </Link>
          <div className='flex items-center gap-3 mb-3'>
            <div className='w-6 h-6 bg-primary/5 rounded-lg flex items-center justify-center text-primary'>
              <Sparkles className='w-3 h-3' />
            </div>
            <h2 className='text-[10px] font-black uppercase tracking-[0.2em] text-primary'>
              Portal Access
            </h2>
          </div>
          <h1 className='text-4xl font-headline font-black text-on-surface tracking-tighter mb-3 uppercase'>
            Welcome Back
          </h1>
          <p className='text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-40'>
            Activate your node connection to manage your residency.
          </p>
        </header>

        <main className='w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100'>
          <form onSubmit={handleSubmit} className='space-y-6 md:space-y-8'>
            <div className='space-y-4 md:space-y-6'>
              <div className='space-y-2'>
                <label className='text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-40 ml-1'>
                  Email
                </label>
                <div className='relative group/input'>
                  <Mail className='absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant/20 group-focus-within/input:text-primary transition-all' />
                  <input
                    className='w-full h-16 bg-[#FAFAFA] border-2 border-outline-variant/5 rounded-2xl pl-16 pr-6 text-sm font-black text-on-surface focus:border-primary focus:bg-white outline-none transition-all placeholder:opacity-30'
                    id='email'
                    type='email'
                    placeholder='student@brainware.edu'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div className='space-y-2'>
                <div className='flex justify-between items-center px-1'>
                  <label className='text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-40'>
                    Password
                  </label>
                  <Link
                    href='/forgot-password'
                    className='text-[9px] font-black text-primary uppercase tracking-widest hover:underline'
                  >
                    Forgot Password?
                  </Link>
                </div>
                <div className='relative group/input'>
                  <Lock className='absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant/20 group-focus-within/input:text-primary transition-all' />
                  <input
                    className='w-full h-16 bg-[#FAFAFA] border-2 border-outline-variant/5 rounded-2xl pl-16 pr-14 text-sm font-black text-on-surface focus:border-primary focus:bg-white outline-none transition-all placeholder:opacity-30'
                    id='password'
                    type={showPassword ? 'text' : 'password'}
                    placeholder='••••••••'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                  />
                  <button
                    className='absolute right-6 top-1/2 -translate-y-1/2 text-on-surface-variant/40 hover:text-primary transition-colors cursor-pointer'
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className='w-5 h-5' />
                    ) : (
                      <Eye className='w-5 h-5' />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <Button className='w-full' type='submit' disabled={loading}>
              {loading ? (
                <Loader2 className='w-4 h-4 animate-spin' />
              ) : (
                'Submit'
              )}
              {!loading && (
                <ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
              )}
            </Button>
          </form>

          <div className='flex items-center gap-4 my-8 md:my-10'>
            <div className='flex-1 h-[1px] bg-on-surface/10'></div>
            <span className='text-[11px] font-black uppercase tracking-[0.4em] text-on-surface opacity-30 whitespace-nowrap'>
              Secondary Access
            </span>
            <div className='flex-1 h-[1px] bg-on-surface/10'></div>
          </div>

          <Button
            variant='outline'
            rounded='2xl'
            className='w-full h-14 md:h-16 flex items-center justify-center gap-4'
            type='button'
          >
            <svg className='w-5 h-5' viewBox='0 0 24 24'>
              <path
                d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
                fill='#4285F4'
              ></path>
              <path
                d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                fill='#34A853'
              ></path>
              <path
                d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z'
                fill='#FBBC05'
              ></path>
              <path
                d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
                fill='#EA4335'
              ></path>
            </svg>
            Sign in with Google
          </Button>
        </main>

        <footer className='w-full max-w-md mt-6 md:mt-10 text-center border-t border-outline-variant/5 pt-6 md:pt-8'>
          <p className='text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-40'>
            New to the system?{' '}
            <Link
              href='/register'
              className='text-primary font-black ml-2 hover:underline transition-all inline-flex items-center gap-1 group'
            >
              Register
              <ChevronRight className='w-3 h-3 group-hover:translate-x-1 transition-transform' />
            </Link>
          </p>
        </footer>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className='min-h-screen flex items-center justify-center bg-white'>
          <div className='w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin'></div>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  )
}
