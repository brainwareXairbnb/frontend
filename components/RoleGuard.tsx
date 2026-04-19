'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { Loader2 } from 'lucide-react'
import { RoleGuardProps } from '@/lib/types'

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
      <div className='min-h-screen flex items-center justify-center bg-[#fafafa]'>
        <div className='flex flex-col items-center gap-4'>
          <Loader2 className='w-8 h-8 animate-spin text-primary' />
          <p className='text-sm text-on-surface-variant'>Verifying access...</p>
        </div>
      </div>
    )
  }

  // Not authenticated
  if (!user) {
    return null
  }

  // Wrong role
  if (!allowedRoles.includes(user.role as any)) {
    return null
  }

  // Authorized
  return <>{children}</>
}
