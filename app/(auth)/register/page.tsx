'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/lib/auth-context'
import { toast } from 'sonner'
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Home,
  Sparkles,
  ChevronRight,
  UserPlus,
  Fingerprint,
  CheckCircle2,
  Loader2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Logo from '@/components/Logo'
import GoogleSignInButton from '@/components/GoogleSignInButton'

export default function RegisterPage() {
  const router = useRouter()
  const { register } = useAuth()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    universityRollNo: '',
    gender: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleGenderSelect = (gender: string) => {
    setFormData({
      ...formData,
      gender,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (!formData.gender) {
      toast.error('Identity Config Incomplete', {
        description: 'Please select your gender Identification',
      })
      setLoading(false)
      return
    }

    if (formData.password.length < 8) {
      toast.error('Security Protocol Violation', {
        description: 'Minimum sequence length: 8 characters',
      })
      setLoading(false)
      return
    }

    try {
      await register('student', formData)
      toast.success("User created successfully. Please verify your email.")
      router.push(`/verify-email?email=${encodeURIComponent(formData.email)}`)
    } catch (err: any) {
      toast.error('Failed to create user. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen flex flex-col md:flex-row overflow-hidden bg-white'>
      {/* Left Side */}
      <div className='hidden md:flex md:w-1/2 lg:w-3/5 relative bg-slate-950 overflow-hidden'>
        <div className='absolute inset-0 z-10 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent'></div>
        <img
          className='absolute inset-0 w-full h-full object-cover opacity-50 scale-110'
          src='https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1600&h=1200&fit=crop'
          alt='Campus life'
        />
        <div className='relative z-20 mt-auto p-20 max-w-2xl animate-in slide-in-from-left duration-1000'>
          <div className='mb-8 flex items-center gap-4'>
            <div className='h-0.5 w-16 bg-primary'></div>
            <span className='font-headline font-black tracking-[0.3em] text-surface text-xs opacity-60'>
              New Community Member
            </span>
          </div>
          <h1 className='font-headline text-6xl lg:text-8xl font-black text-surface leading-[0.95] tracking-tighter mb-10'>
            Start Your <br />
            <span className='text-primary'>Academic Life.</span>
          </h1>
          <p className='text-xl font-medium text-surface/60 leading-relaxed max-w-md tracking-widest text-[12px]'>
            Join thousands of scholars in our premium residency grid. Your
            sanctuary module is ready for deployment.
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className='flex-1 flex flex-col items-center md:justify-center p-6 md:p-10 lg:p-14 bg-white overflow-y-auto'>
        <header className='w-full max-w-md mb-4 md:mb-8 animate-in fade-in slide-in-from-top-4 duration-700'>
          <Logo />
          <div className='flex items-center gap-3 mb-3'>
            <div className='w-6 h-6 bg-primary/5 rounded-lg flex items-center justify-center text-primary'>
              <UserPlus className='w-3 h-3' />
            </div>
            <h2 className='text-xs font-black tracking-[0.2em] text-primary'>
              Create your account
            </h2>
          </div>
          <h2 className='text-4xl font-headline font-black text-on-surface tracking-tighter mb-3'>
            Registration
          </h2>
          <p className='text-xs font-black tracking-[0.2em] text-on-surface-variant opacity-40'>
            Set up your profile to get started.
          </p>
        </header>

        <main className='w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100 pb-16 md:pb-20'>
          <form onSubmit={handleSubmit} className='space-y-6 md:space-y-8'>
            <div className='space-y-3 md:space-y-4'>
              <div className='space-y-2'>
                <label className='text-xs font-black tracking-[0.2em] text-on-surface-variant opacity-40 ml-1'>
                  Full Name <span className='text-primary italic'>*</span>
                </label>
                <div className='relative group/input'>
                  <User className='absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant/20 group-focus-within/input:text-primary transition-all' />
                  <input
                    className='w-full h-14 bg-[#FAFAFA] border-2 border-outline-variant/5 rounded-2xl pl-16 pr-6 text-sm font-black text-on-surface focus:border-primary focus:bg-white outline-none transition-all placeholder:opacity-30'
                    type='text'
                    name='name'
                    placeholder='Enter your full name'
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div className='space-y-2'>
                <div className='flex justify-between items-center px-1'>
                  <label className='text-xs font-black tracking-[0.2em] text-on-surface-variant opacity-40'>
                    Email <span className='text-primary italic'>*</span>
                  </label>
                  <Mail className='w-3.5 h-3.5 text-primary opacity-20' />
                </div>
                <div className='relative group/input'>
                  <Mail className='absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant/20 group-focus-within/input:text-primary transition-all' />
                  <input
                    className='w-full h-14 bg-[#FAFAFA] border-2 border-outline-variant/5 rounded-2xl pl-16 pr-6 text-sm font-black text-on-surface focus:border-primary focus:bg-white outline-none transition-all placeholder:opacity-30'
                    type='email'
                    name='email'
                    placeholder='name@personal.node'
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div className='space-y-2'>
                <label className='text-xs font-black tracking-[0.2em] text-on-surface-variant opacity-40 ml-1'>
                  Phone Number <span className='text-primary italic'>*</span>
                </label>
                <div className='relative group/input'>
                  <Phone className='absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant/20 group-focus-within/input:text-primary transition-all' />
                  <input
                    className='w-full h-14 bg-[#FAFAFA] border-2 border-outline-variant/5 rounded-2xl pl-16 pr-6 text-sm font-black text-on-surface focus:border-primary focus:bg-white outline-none transition-all placeholder:opacity-30'
                    type='tel'
                    name='phoneNumber'
                    placeholder='+91 00000 00000'
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div className='space-y-2'>
                <label className='text-xs font-black tracking-[0.2em] text-on-surface-variant opacity-40 ml-1'>
                  Academic ID (Roll No){' '}
                  <span className='text-on-surface-variant opacity-60 lowercase italic'>
                    (optional)
                  </span>
                </label>
                <div className='relative group/input'>
                  <Fingerprint className='absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant/20 group-focus-within/input:text-primary transition-all' />
                  <input
                    className='w-full h-14 bg-[#FAFAFA] border-2 border-outline-variant/5 rounded-2xl pl-16 pr-6 text-sm font-black text-on-surface focus:border-primary focus:bg-white outline-none transition-all placeholder:opacity-30'
                    type='text'
                    name='universityRollNo'
                    placeholder='BWU/BTA/21/000'
                    value={formData.universityRollNo}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>
              </div>

              <div className='space-y-2'>
                <label className='text-xs font-black tracking-[0.2em] text-on-surface-variant opacity-40 ml-1'>
                  Gender <span className='text-primary italic'>*</span>
                </label>
                <div className='flex gap-2'>
                  {['male', 'female', 'other'].map((g) => (
                    <Button
                      key={g}
                      variant={formData.gender === g ? 'default' : 'outline'}
                      rounded='xl'
                      className={`flex-1 h-12 text-xs ${formData.gender !== g ? 'opacity-40 hover:opacity-100' : ''}`}
                      type='button'
                      onClick={() => handleGenderSelect(g)}
                      disabled={loading}
                    >
                      {g}
                    </Button>
                  ))}
                </div>
              </div>

              <div className='space-y-4'>
                <label className='text-xs font-black tracking-[0.2em] text-on-surface-variant opacity-40 ml-1'>
                  Password <span className='text-primary italic'>*</span>
                </label>
                <div className='relative group/input'>
                  <Lock className='absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant/20 group-focus-within/input:text-primary transition-all' />
                  <input
                    className='w-full h-14 bg-[#FAFAFA] border-2 border-outline-variant/5 rounded-2xl pl-16 pr-16 text-sm font-black text-on-surface focus:border-primary focus:bg-white outline-none transition-all placeholder:opacity-30'
                    type={showPassword ? 'text' : 'password'}
                    name='password'
                    placeholder='••••••••'
                    value={formData.password}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                  <button
                    className='absolute right-6 top-1/2 -translate-y-1/2 text-on-surface-variant opacity-20 hover:opacity-100 hover:text-primary transition-all'
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
                <p className='text-[9px] font-black text-on-surface-variant opacity-30 tracking-[0.2em] ml-1'>
                  Requirement: 8+ Alphanumeric & Special Characters
                </p>
              </div>
            </div>

            <Button
              className='w-full capitalize'
              type='submit'
              disabled={loading}
            >
              {loading ? (
                <Loader2 className='w-4 h-4 animate-spin' />
              ) : (
                'Create Account'
              )}
            </Button>
          </form>

          <div className='flex items-center gap-4 my-6 md:my-8'>
            <div className='flex-1 h-[1px] bg-on-surface/10'></div>
            <span className='text-xs font-black tracking-[0.4em] text-on-surface opacity-30 whitespace-nowrap'>
              or continue with
            </span>
            <div className='flex-1 h-[1px] bg-on-surface/10'></div>
          </div>

          <GoogleSignInButton
            onError={(error) => toast.error(error)}
            className='h-14 text-sm font-black tracking-wider'
          />

          <footer className='text-center mt-6 md:mt-10 pt-6 md:pt-8 border-t border-outline-variant/10'>
            <p className='text-xs font-black  tracking-widest text-on-surface-variant opacity-40'>
              Already Have an account?{' '}
              <Link
                href='/login'
                className='text-primary font-black ml-2 hover:underline inline-flex items-center gap-1 group'
              >
                Login
              </Link>
            </p>
          </footer>
        </main>
      </div>
    </div>
  )
}
