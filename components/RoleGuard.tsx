'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { AirbnbLoader } from '@/components/ui/spinner'
import { RoleGuardProps } from '@/lib/types'
import { ShieldCheck, LogIn } from 'lucide-react'

export function RoleGuard({
  children,
  allowedRoles,
  fallbackPath = '/login',
}: RoleGuardProps) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      // Not authenticated
      if (!user) {
        router.push('/login')
        return
      }

      // Authenticated but wrong role
      if (!allowedRoles.includes(user.role as any)) {
        // Redirect to appropriate dashboard based on user role
        switch (user.role) {
          case 'admin':
            router.push('/admin')
            break
          case 'owner':
            router.push('/owner')
            break
          case 'student':
            router.push('/')
            break
          default:
            router.push(fallbackPath)
        }
      }
    }
  }, [user, loading, allowedRoles, fallbackPath, router])

  // Show loading state
  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-black'>
        <AirbnbLoader />
      </div>
    )
  }

  // Not authenticated
  if (!user) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-black p-4'>
        <div className='w-full max-w-sm'>
          {/* Card */}
          <div className='bg-[#1a1a1a] rounded-2xl shadow-2xl border border-gray-800 overflow-hidden'>
            {/* Icon */}
            <div className='pt-12 pb-8 flex justify-center'>
              <div className='w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center border border-blue-500/20'>
                <ShieldCheck className='w-10 h-10 text-blue-500' />
              </div>
            </div>

            {/* Content */}
            <div className='px-8 pb-8 text-center'>
              <h1 className='text-2xl font-bold text-white mb-4'>
                Authentication Required
              </h1>
              <p className='text-sm text-gray-400 leading-relaxed mb-8'>
                You need to be logged in to access this page. Please sign in with your mobile number to continue.
              </p>

              {/* Action Button */}
              <button
                onClick={() => router.push('/login')}
                className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl'
              >
                <LogIn className='w-5 h-5' />
                Login to Continue
              </button>

              {/* Footer Text */}
              <p className='text-xs text-gray-500 mt-6'>
                New user? You'll be automatically registered during login
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Wrong role
  if (!allowedRoles.includes(user.role as any)) {
    const getRoleDisplayName = (role: string) => {
      switch (role) {
        case 'admin':
          return 'Administrator'
        case 'owner':
          return 'Property Owner'
        case 'student':
          return 'Student'
        default:
          return 'User'
      }
    }

    const getCorrectDashboard = () => {
      switch (user.role) {
        case 'admin':
          return '/admin'
        case 'owner':
          return '/owner'
        case 'student':
          return '/'
        default:
          return '/'
      }
    }

    return (
      <div className='min-h-screen flex items-center justify-center bg-black p-4'>
        <div className='w-full max-w-sm'>
          {/* Card */}
          <div className='bg-[#1a1a1a] rounded-2xl shadow-2xl border border-gray-800 overflow-hidden'>
            {/* Icon */}
            <div className='pt-12 pb-8 flex justify-center'>
              <div className='w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center border border-red-500/20'>
                <ShieldCheck className='w-10 h-10 text-red-500' />
              </div>
            </div>

            {/* Content */}
            <div className='px-8 pb-8 text-center'>
              <h1 className='text-2xl font-bold text-white mb-4'>
                Access Denied
              </h1>
              <p className='text-sm text-gray-400 leading-relaxed mb-8'>
                This page requires{' '}
                <span className='font-semibold text-white'>
                  {allowedRoles.map(getRoleDisplayName).join(' or ')}
                </span>{' '}
                access. You are currently logged in as{' '}
                <span className='font-semibold text-white'>
                  {getRoleDisplayName(user.role)}
                </span>
                .
              </p>

              {/* Action Button */}
              <button
                onClick={() => router.push(getCorrectDashboard())}
                className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl transition-all shadow-lg hover:shadow-xl'
              >
                Go to My Dashboard
              </button>

              {/* Footer Text */}
              <p className='text-xs text-gray-500 mt-6'>
                Need help?{' '}
                <button
                  onClick={() => router.push('/')}
                  className='text-blue-500 font-semibold hover:underline'
                >
                  Return to Home
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Authorized
  return <>{children}</>
}
