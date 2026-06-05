'use client'

import { usePathname } from 'next/navigation'
import { ViewingAsIndicator } from '@/components/ViewingAsIndicator'
import { Navbar } from '@/components/Navbar'

export function TopNavStack() {
  const pathname = usePathname()
  const isAdminOrOwner = pathname.startsWith('/admin') || pathname.startsWith('/owner')
  const authPaths = [
    '/login',
    '/register',
    '/verify-email',
    '/verify-student-email',
    '/forgot-password',
    '/reset-password',
    '/student/verify-student-email',
  ]
  const isAuthPage = authPaths.some((path) => pathname.startsWith(path))

  // If on admin or owner pages, we don't render the top navigation stack at the root layout
  // since these pages handle their own headers and safe area inset top padding.
  if (isAdminOrOwner) {
    return null
  }

  // If on auth pages, we render only the safe area top padding to prevent overlap with the native status bar.
  if (isAuthPage) {
    return <div className='pt-[env(safe-area-inset-top)] bg-white' />
  }

  return (
    <div className='sticky top-0 z-50 flex flex-col bg-white pt-[env(safe-area-inset-top)]'>
      <ViewingAsIndicator />
      <div className='hidden md:block'>
        <Navbar />
      </div>
    </div>
  )
}
