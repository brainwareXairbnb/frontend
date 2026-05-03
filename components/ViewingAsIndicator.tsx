'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { Eye, ArrowLeft, Sparkles } from 'lucide-react'

export function ViewingAsIndicator() {
  const { user } = useAuth()
  const pathname = usePathname()
  const router = useRouter()

  if (!user || user.role === 'student') return null
  
  const isAuthPage = pathname.startsWith('/auth') || pathname === '/login' || pathname === '/register'
  const isManagementPage = pathname.startsWith('/admin') || pathname.startsWith('/owner')
  
  if (isAuthPage || isManagementPage) return null

  const isAdmin = user.role === 'admin'

  const handleBack = () => {
    router.push(isAdmin ? '/admin/users' : '/owner/listings')
  }

  return (
    <div className='border-b border-rose-100 bg-white/95 backdrop-blur-xl'>
      <div className='mx-auto flex w-full items-center justify-between gap-3 px-6 md:px-10 py-1.5 sm:px-4'>
        {/* Left */}
        <div className='flex min-w-0 items-center gap-3'>
          <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-pink-500 text-white shadow-sm'>
            <Eye className='h-4.5 w-4.5' />
          </div>

          <div className='min-w-0 leading-tight'>
            <div className='mb-0.5 flex items-center gap-1.5'>
              <span className='rounded-full bg-rose-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-rose-600'>
                Student Preview
              </span>
              <Sparkles className='h-3.5 w-3.5 text-rose-500' />
            </div>

            <p className='truncate text-sm text-zinc-600'>
              Logged in as{' '}
              <span className='font-semibold capitalize text-zinc-900'>
                {user.role}
              </span>
            </p>
          </div>
        </div>

        {/* Right */}
        <button
          onClick={handleBack}
          className='inline-flex shrink-0 items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-4 py-2 text-xs font-semibold text-zinc-800 shadow-sm transition-all hover:border-zinc-300 hover:shadow-md active:scale-95'
        >
          <ArrowLeft className='h-3.5 w-3.5' />

          <span className='hidden sm:inline'>
            Back to {isAdmin ? 'Admin' : 'Owner'}
          </span>

          <span className='sm:hidden'>Back</span>
        </button>
      </div>
    </div>
  )
}
