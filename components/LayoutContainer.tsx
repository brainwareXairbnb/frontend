'use client'

import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

export function LayoutContainer({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isAdminOrOwner = pathname.startsWith('/admin') || pathname.startsWith('/owner')
  const isAuthPage = pathname.startsWith('/login') ||
    pathname.startsWith('/register') ||
    pathname.startsWith('/verify-email') ||
    pathname.startsWith('/verify-student-email') ||
    pathname.startsWith('/forgot-password') ||
    pathname.startsWith('/reset-password')

  return (
    <main className={`flex-1 ${isAdminOrOwner || isAuthPage ? '' : 'md:pt-20'}`}>
      {children}
    </main>
  )
}
