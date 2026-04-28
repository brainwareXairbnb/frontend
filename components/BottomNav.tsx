'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, Heart, Briefcase, User, Bell, Map } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'

export default function BottomNav() {
  const pathname = usePathname()
  const { user } = useAuth()
  const authPaths = [
    '/login',
    '/register',
    '/verify-email',
    '/verify-student-email',
    '/forgot-password',
    '/reset-password',
  ]
  const isAuthPath = authPaths.some((path) => pathname.startsWith(path))

  if (
    pathname.startsWith('/rooms/') ||
    pathname.startsWith('/host/') ||
    pathname.startsWith('/admin') ||
    pathname.startsWith('/owner') ||
    isAuthPath
  )
    return null

  // Phase 1: Only Explore and Profile
  const navItems = [
    { label: 'Explore', icon: Search, path: '/' },
    // { label: 'Wishlists', icon: Heart, path: '/student/saved' },
    // {
    //   label: 'Bookings',
    //   icon: Map,
    //   path: '/student/bookings',
    //   authRequired: true,
    // },
    // {
    //   label: 'Notifications',
    //   icon: Bell,
    //   path: '/student/notifications',
    //   authRequired: true,
    // },
    {
      label: user ? 'Profile' : 'Log in',
      icon: User,
      path: '/student/profile',
    },
  ]

  const visibleItems = navItems.filter(
    (item: any) => !item.authRequired || user,
  )

  return (
    <div className='fixed bottom-0 left-0 right-0 bg-white border-t border-outline-variant/10 px-4 py-3 pb-6 md:hidden z-50'>
      <div className='flex justify-around items-center max-w-md mx-auto'>
        {visibleItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.path
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-[#FF385C]' : 'text-on-surface-variant opacity-60'}`}
            >
              <Icon
                className={`w-[24px] h-[24px] ${isActive ? 'fill-current' : ''}`}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span
                className={`text-[10px] font-bold ${isActive ? 'opacity-100' : 'opacity-80'}`}
              >
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
