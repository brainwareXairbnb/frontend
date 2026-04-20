'use client'

import Link from 'next/link'
import {
  PlusCircle,
  User,
  Settings,
  Building2,
  CircleUser,
  Menu,
} from 'lucide-react'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false)
  const pathname = usePathname()

  // On mobile, we hide the top navbar on the room details page since it has its own transparent/sticky header
  const isRoomDetails = pathname.startsWith('/rooms/')
  const isAdminOrOwner =
    pathname.startsWith('/admin') || pathname.startsWith('/owner')
  const authPaths = [
    '/login',
    '/register',
    '/verify-email',
    '/verify-student-email',
    '/forgot-password',
    '/reset-password',
  ]
  const isAuthPath = authPaths.some((path) => pathname.startsWith(path))

  if (isAdminOrOwner || isAuthPath) return null

  const hideOnMobile = isRoomDetails ? 'hidden md:block' : ''

  return (
    <header
      className={`w-full bg-white relative z-50 shadow-[0_1px_12px_rgba(0,0,0,0.08)] ${hideOnMobile}`}
    >
      <div className='flex justify-between items-center px-6 md:px-10 h-20 border-b border-outline-variant/10'>
        {/* Logo */}
        <Link href='/' className='flex items-center gap-2 md:gap-3'>
          <Building2
            className='w-8 h-8 text-[#FF385C] fill-[#FF385C]/10 shrink-0'
            strokeWidth={2}
          />
          <span className='text-lg md:text-xl font-bold tracking-tighter text-on-surface uppercase font-headline truncate'>
            BrainX
          </span>
        </Link>

        {/* Middle Nav (Desktop Only) */}
        <nav className='hidden md:flex items-center gap-8'>
          <Link
            href='/'
            className={`text-sm font-semibold transition-colors ${pathname === '/' ? 'text-on-surface' : 'text-on-surface-variant hover:text-on-surface'}`}
          >
            Explore
          </Link>
          <Link
            href='/saved'
            className={`text-sm font-semibold transition-colors ${pathname === '/saved' ? 'text-on-surface' : 'text-on-surface-variant hover:text-on-surface'}`}
          >
            Saved
          </Link>
          <Link
            href='/bookings'
            className={`text-sm font-semibold transition-colors ${pathname === '/bookings' ? 'text-on-surface' : 'text-on-surface-variant hover:text-on-surface'}`}
          >
            Bookings
          </Link>
        </nav>

        {/* Right Nav */}
        <div className='flex items-center gap-2 relative'>
          <Link
            href='/host/homes'
            className='text-sm font-semibold hover:bg-surface-container py-2.5 px-4 rounded-full transition-colors hidden lg:block text-on-surface'
          >
            Become a owner
          </Link>

          <Button
            variant='outline'
            size='sm'
            onClick={() => setShowDropdown(!showDropdown)}
            className='flex items-center gap-2 px-2 py-1.5 rounded-full hover:shadow-md transition-all bg-white ml-2 active:scale-95'
          >
            <Menu
              className='w-4 h-4 text-on-surface-variant ml-1'
              strokeWidth={2.5}
            />
            <div className='w-8 h-8 rounded-full bg-[#717171] flex items-center justify-center overflow-hidden'>
              <User className='w-5 h-5 text-white' strokeWidth={2.5} />
            </div>
          </Button>

          {/* Desktop/Mobile Dropdown */}
          {showDropdown && (
            <div className='absolute top-14 right-0 bg-white border border-outline-variant/30 shadow-[0_8px_30px_rgba(0,0,0,0.15)] rounded-2xl p-2 w-56 animate-in fade-in zoom-in-95 duration-200 z-[60]'>
              <div className='flex flex-col'>
                <Link
                  href='/host/homes'
                  className='flex items-center gap-3 p-3 text-sm font-bold text-on-surface hover:bg-surface-container rounded-xl transition-colors md:hidden'
                  onClick={() => setShowDropdown(false)}
                >
                  <PlusCircle
                    className='w-5 h-5 text-[#FF385C]'
                    strokeWidth={2.5}
                  />
                  Become a owner
                </Link>
                <div className='h-[1px] bg-outline-variant/10 my-1 mx-2 md:hidden' />
                <Link
                  href='/student/profile'
                  className='flex items-center gap-3 p-3 text-sm font-medium text-on-surface hover:bg-surface-container rounded-xl transition-colors'
                  onClick={() => setShowDropdown(false)}
                >
                  <User className='w-5 h-5 opacity-60' strokeWidth={2} />
                  View Profile
                </Link>
                <Link
                  href='/settings'
                  className='flex items-center gap-3 p-3 text-sm font-medium text-on-surface hover:bg-surface-container rounded-xl transition-colors'
                  onClick={() => setShowDropdown(false)}
                >
                  <Settings className='w-5 h-5 opacity-60' strokeWidth={2} />
                  Settings
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Backdrop for Dropdown */}
      {showDropdown && (
        <div
          className='fixed inset-0 bg-transparent z-10'
          onClick={() => setShowDropdown(false)}
        />
      )}
    </header>
  )
}
