'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { toast } from 'sonner'
import { useState } from 'react'
import { RoleGuard } from '@/components/RoleGuard'
import { NotificationBell } from '@/components/NotificationBell'
import {
  LayoutDashboard,
  Building2,
  Calendar,
  IndianRupee,
  BarChart3,
  LogOut,
  Bell,
  User,
  Menu,
  X,
  ChevronRight,
  ShieldCheck,
  Eye,
} from 'lucide-react'
import { OwnerLayoutProps } from '@/lib/types'

const NAV_ITEMS = [
  // Phase 1: Only Listings, Notifications, and Profile
  // {
  //   id: 'dashboard',
  //   label: 'Dashboard',
  //   icon: LayoutDashboard,
  //   href: '/owner',
  // },
  {
    id: 'listings',
    label: 'My Listings',
    icon: Building2,
    href: '/owner/listings',
  },
  // {
  //   id: 'bookings',
  //   label: 'Bookings',
  //   icon: Calendar,
  //   href: '/owner/bookings',
  // },
  // {
  //   id: 'payouts',
  //   label: 'Payouts',
  //   icon: IndianRupee,
  //   href: '/owner/payouts',
  // },
  // {
  //   id: 'analytics',
  //   label: 'Analytics',
  //   icon: BarChart3,
  //   href: '/owner/analytics',
  // },
]

export default function OwnerLayout({ children }: OwnerLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { logout, user } = useAuth()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const handleLogout = async () => {
    try {
      await logout()
      toast.success('Logged out successfully')
      router.push('/login')
    } catch (error: any) {
      toast.error('Logout failed', { description: error.message })
      router.push('/login')
    }
  }

  const getPageTitle = () => {
    if (pathname === '/owner') return 'Dashboard Overview'
    if (pathname.startsWith('/owner/listings')) return 'My Listings'
    if (pathname.startsWith('/owner/bookings')) return 'Bookings'
    if (pathname.startsWith('/owner/payouts')) return 'Payouts'
    if (pathname.startsWith('/owner/analytics')) return 'Analytics'
    if (pathname.startsWith('/owner/notifications')) return 'Notifications'
    if (pathname.startsWith('/owner/profile')) return 'My Profile'
    return 'Owner Portal'
  }

  const isActive = (href: string) => {
    if (href === '/owner') {
      return pathname === '/owner'
    }
    return pathname.startsWith(href)
  }

  return (
    <RoleGuard allowedRoles={['owner']}>
      <div className='flex min-h-screen bg-[#fafafa] flex-col'>
        {/* Common Header */}
        <div className='sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-outline-variant/10 h-16'>
          <div className='flex items-center justify-between h-full px-6 md:px-8'>
            <h1 className='font-headline text-xl md:text-2xl font-bold text-on-surface'>
              {getPageTitle()}
            </h1>
            <div className='flex items-center gap-3'>
              <NotificationBell />
              <Link
                href='/owner/profile'
                className='w-10 h-10 rounded-full overflow-hidden bg-primary'
              >
                <img
                  alt='Owner'
                  className='w-full h-full object-cover'
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'Owner')}&background=b6212f&color=fff&size=128`}
                />
              </Link>
            </div>
          </div>
        </div>

        {/* Main Layout */}
        <div className='flex flex-1'>
          {/* Sidebar */}
          <div className='hidden md:flex w-64 bg-white border-r border-outline-variant/10 flex-col shrink-0 fixed left-0 top-16 bottom-0'>
            {/* Logo */}
            <div className='px-6 py-6 border-b border-outline-variant/10 shrink-0'>
              <div className='flex items-center gap-3'>
                <div className='w-10 h-10 bg-primary rounded-full flex items-center justify-center text-on-primary'>
                  <ShieldCheck className='w-6 h-6' />
                </div>
                <div>
                  <h2 className='font-headline text-sm font-bold text-on-surface'>
                    Owner Portal
                  </h2>
                  <p className='text-xs text-on-surface-variant'>
                    Property Management
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className='flex-1 py-4 px-3 overflow-y-auto'>
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-all text-sm ${
                      isActive(item.href)
                        ? 'bg-primary/10 text-primary font-semibold'
                        : 'text-on-surface-variant hover:bg-gray-50 hover:text-on-surface font-medium'
                    }`}
                  >
                    <Icon className='w-5 h-5' />
                    <span>{item.label}</span>
                  </Link>
                )
              })}

              {/* Divider */}
              <div className='h-px bg-outline-variant/20 my-3 mx-3' />

              {/* View as Student */}
              <Link
                href='/'
                className='flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-all text-sm text-on-surface-variant hover:bg-blue-50 hover:text-blue-600 font-medium'
              >
                <Eye className='w-5 h-5' />
                <span>View as Student</span>
              </Link>
            </nav>

            {/* Owner Profile - Fixed at bottom */}
            <div className='p-4 border-t border-outline-variant/10 shrink-0'>
              <Link
                href='/owner/profile'
                className='flex items-center gap-3 p-3 bg-surface-container rounded-xl mb-3 hover:bg-surface-container-high transition-colors'
              >
                <div className='w-10 h-10 rounded-full overflow-hidden bg-primary shrink-0'>
                  <img
                    alt='Owner'
                    className='w-full h-full object-cover'
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'Owner')}&background=b6212f&color=fff&size=128`}
                  />
                </div>
                <div className='flex-1 min-w-0'>
                  <p className='text-xs font-bold text-on-surface truncate'>
                    {user?.name || 'Owner'}
                  </p>
                  <p className='text-[10px] text-on-surface-variant'>
                    Property Owner
                  </p>
                </div>
                <ChevronRight className='w-5 h-5 text-on-surface-variant' />
              </Link>

              <button
                onClick={handleLogout}
                className='w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-error hover:bg-error/10 transition-colors'
              >
                <LogOut className='w-5 h-5' />
                <span className='text-sm font-bold'>Logout</span>
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className='flex-1 overflow-y-auto bg-[#fafafa] md:ml-64'>
            {children}
          </div>
        </div>

        {/* Mobile Bottom Navigation - Phase 1: Only Listings, Notifications, Profile */}
        <div className='md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-outline-variant/10 safe-area-inset-bottom'>
          <div className='flex items-center justify-around px-2 py-2'>
            {/* <Link
              href='/owner'
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                isActive('/owner') ? 'text-primary' : 'text-on-surface-variant'
              }`}
            >
              <LayoutDashboard className='w-6 h-6' />
              <span className='text-[10px] font-bold'>Dashboard</span>
            </Link> */}
            <Link
              href='/owner/listings'
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                isActive('/owner/listings')
                  ? 'text-primary'
                  : 'text-on-surface-variant'
              }`}
            >
              <Building2 className='w-6 h-6' />
              <span className='text-[10px] font-bold'>Listings</span>
            </Link>
            {/* <Link
              href='/owner/bookings'
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                isActive('/owner/bookings')
                  ? 'text-primary'
                  : 'text-on-surface-variant'
              }`}
            >
              <Calendar className='w-6 h-6' />
              <span className='text-[10px] font-bold'>Bookings</span>
            </Link>
            <Link
              href='/owner/payouts'
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                isActive('/owner/payouts')
                  ? 'text-primary'
                  : 'text-on-surface-variant'
              }`}
            >
              <IndianRupee className='w-6 h-6' />
              <span className='text-[10px] font-bold'>Payouts</span>
            </Link> */}
            <Link
              href='/owner/notifications'
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                isActive('/owner/notifications')
                  ? 'text-primary'
                  : 'text-on-surface-variant'
              }`}
            >
              <Bell className='w-6 h-6' />
              <span className='text-[10px] font-bold'>Notifications</span>
            </Link>
            <Link
              href='/owner/profile'
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                isActive('/owner/profile')
                  ? 'text-primary'
                  : 'text-on-surface-variant'
              }`}
            >
              <User className='w-6 h-6' />
              <span className='text-[10px] font-bold'>Profile</span>
            </Link>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isDrawerOpen && (
          <>
            <div
              className='fixed inset-0 bg-black/50 z-50 md:hidden'
              onClick={() => setIsDrawerOpen(false)}
            />
            <div className='fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 md:hidden max-h-[80vh] overflow-y-auto'>
              <div className='sticky top-0 bg-white border-b border-outline-variant/10 px-6 py-4 rounded-t-3xl'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-3'>
                    <div className='w-10 h-10 bg-primary rounded-full flex items-center justify-center text-on-primary'>
                      <ShieldCheck className='w-6 h-6' />
                    </div>
                    <div>
                      <h2 className='font-headline text-sm font-bold text-on-surface'>
                        Owner Portal
                      </h2>
                      <p className='text-xs text-on-surface-variant'>
                        Property Management
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsDrawerOpen(false)}
                    className='w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-container transition-colors text-on-surface'
                  >
                    <X className='w-5 h-5' />
                  </button>
                </div>
              </div>

              <nav className='px-3 py-4'>
                {NAV_ITEMS.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={() => setIsDrawerOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-all ${
                        isActive(item.href)
                          ? 'bg-primary/10 text-primary font-semibold'
                          : 'text-on-surface-variant hover:bg-gray-50 hover:text-on-surface font-medium'
                      }`}
                    >
                      <Icon className='w-6 h-6' />
                      <span className='text-sm'>{item.label}</span>
                    </Link>
                  )
                })}

                {/* Divider */}
                <div className='h-px bg-outline-variant/20 my-3 mx-4' />

                {/* View as Student */}
                <Link
                  href='/'
                  onClick={() => setIsDrawerOpen(false)}
                  className='flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-all text-on-surface-variant hover:bg-blue-50 hover:text-blue-600 font-medium'
                >
                  <Eye className='w-6 h-6' />
                  <span className='text-sm'>View as Student</span>
                </Link>
              </nav>

              <div className='px-3 pb-6 pt-2 border-t border-outline-variant/10'>
                <div className='flex items-center gap-3 p-4 bg-surface-container rounded-xl mb-3 mt-3'>
                  <div className='w-12 h-12 rounded-full overflow-hidden bg-primary shrink-0'>
                    <img
                      alt='Owner'
                      className='w-full h-full object-cover'
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'Owner')}&background=b6212f&color=fff&size=128`}
                    />
                  </div>
                  <div className='flex-1 min-w-0'>
                    <p className='text-sm font-bold text-on-surface truncate'>
                      {user?.name || 'Owner'}
                    </p>
                    <p className='text-xs text-on-surface-variant'>
                      {user?.email || 'owner@brainwarerooms.com'}
                    </p>
                    <p className='text-[10px] text-on-surface-variant mt-0.5'>
                      Property Owner
                    </p>
                  </div>
                </div>

                <div className='space-y-2'>
                  <Link
                    href='/owner/profile'
                    onClick={() => setIsDrawerOpen(false)}
                    className='flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-gray-50 hover:text-on-surface transition-colors'
                  >
                    <User className='w-6 h-6' />
                    <span className='text-sm font-medium'>My Profile</span>
                  </Link>

                  <button
                    onClick={() => {
                      setIsDrawerOpen(false)
                      handleLogout()
                    }}
                    className='w-full flex items-center gap-3 px-4 py-3 rounded-lg text-error hover:bg-error/10 transition-colors'
                  >
                    <LogOut className='w-6 h-6' />
                    <span className='text-sm font-bold'>Logout</span>
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </RoleGuard>
  )
}
