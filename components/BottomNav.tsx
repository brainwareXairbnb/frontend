'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, Heart, Map, CircleUser, Bell } from 'lucide-react'

export function BottomNav() {
  const pathname = usePathname()
  const authPaths = ['/login', '/register', '/verify-email', '/verify-student-email', '/forgot-password', '/reset-password'];
  const isAuthPath = authPaths.some(path => pathname.startsWith(path));

  if (pathname.startsWith('/rooms/') || pathname.startsWith('/host/') || pathname.startsWith('/admin') || pathname.startsWith('/owner') || isAuthPath) return null;

  const navItems = [
    { label: 'Explore', icon: Search, path: '/' },
    { label: 'Wishlists', icon: Heart, path: '/student/saved' },
    { label: 'Bookings', icon: Map, path: '/student/bookings' },
    { label: 'Notifications', icon: Bell, path: '/student/notifications' },
    { label: 'Profile', icon: CircleUser, path: '/student/profile' },
  ]

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-outline-variant/10 z-30 px-2 pt-3 pb-6">
      <div className="flex justify-around items-center max-w-lg mx-auto relative">

        {navItems.map((item) => {
          const ActiveIcon = item.icon
          const current = pathname === item.path || (item.path !== '/' && pathname.startsWith(item.path))
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex flex-col items-center justify-center min-w-[64px] transition-all duration-200 ${current ? 'text-[#FF385C] scale-110' : 'text-on-surface-variant'}`}
            >
              <ActiveIcon className={`w-6 h-6 mb-1 ${current ? 'stroke-[2.5px]' : 'stroke-2 opacity-70'}`} />
              <span className={`text-[10px] tracking-tight ${current ? 'font-bold' : 'font-medium'}`}>
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
