'use client'

import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import { toast } from 'sonner'
import { RoleGuard } from '@/components/RoleGuard'
import { NotificationBell } from '@/components/NotificationBell'
import {
  LayoutDashboard,
  Users,
  ClipboardCheck,
  CalendarCheck,
  Landmark,
  IndianRupee,
  BarChart3,
  Flag,
  Settings,
  Bell,
  ShieldCheck,
  ChevronRight,
  LogOut,
  Menu,
  X,
  UserCircle,
  Building2,
} from 'lucide-react'
import { AdminLayoutProps } from '@/lib/types'

const NAV_ITEMS = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '/admin/dashboard',
  },
  {
    id: 'users',
    label: 'User Management',
    icon: Users,
    href: '/admin/users',
  },
  {
    id: 'listings',
    label: 'Listing Approval',
    icon: ClipboardCheck,
    href: '/admin/listings',
  },
  {
    id: 'bookings',
    label: 'All Bookings',
    icon: CalendarCheck,
    href: '/admin/bookings',
  },
  {
    id: 'financial',
    label: 'Financial Dashboard',
    icon: Landmark,
    href: '/admin/financial',
  },
  {
    id: 'payouts',
    label: 'Payout Management',
    icon: IndianRupee,
    href: '/admin/payouts',
  },
  {
    id: 'analytics',
    label: 'Revenue Analytics',
    icon: BarChart3,
    href: '/admin/analytics',
  },
  {
    id: 'reviews',
    label: 'Flagged Reviews',
    icon: Flag,
    href: '/admin/reviews',
  },
  {
    id: 'settings',
    label: 'Service Charge',
    icon: Settings,
    href: '/admin/settings',
  },
]

export default function AdminLayout({ children }: AdminLayoutProps) {
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
      // Force redirect anyway
      router.push('/login')
    }
  }

  const getPageTitle = () => {
    if (pathname === '/admin' || pathname === '/admin/dashboard')
      return 'System Overview'
    if (pathname.startsWith('/admin/users')) return 'User Management'
    if (pathname.startsWith('/admin/listings')) return 'Listing Approval'
    if (pathname.startsWith('/admin/bookings')) return 'All Bookings'
    if (pathname.startsWith('/admin/financial')) return 'Financial Dashboard'
    if (pathname.startsWith('/admin/payouts')) return 'Payout Management'
    if (pathname.startsWith('/admin/analytics')) return 'Revenue Analytics'
    if (pathname.startsWith('/admin/reviews')) return 'Flagged Reviews'
    if (pathname.startsWith('/admin/notifications')) return 'Notifications'
    if (pathname.startsWith('/admin/settings')) return 'Service Charge Settings'
    return 'Admin Portal'
  }

  const isActive = (href: string) => {
    if (href === '/admin/dashboard') {
      return pathname === '/admin' || pathname === '/admin/dashboard'
    }
    return pathname.startsWith(href)
  }

  return (
    <RoleGuard allowedRoles={['admin']}>
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
                href='/admin/profile'
                className='w-10 h-10 rounded-full overflow-hidden bg-primary'
              >
                <img
                  alt='Admin User'
                  className='w-full h-full object-cover'
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'Admin')}&background=b6212f&color=fff&size=128`}
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
                    Admin Portal
                  </h2>
                  <p className='text-xs text-on-surface-variant'>
                    System Management
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
            </nav>

            {/* Admin Profile - Fixed at bottom */}
            <div className='p-4 border-t border-outline-variant/10 shrink-0'>
              <Link
                href='/admin/profile'
                className='flex items-center gap-3 p-3 bg-surface-container rounded-xl mb-3 hover:bg-surface-container-high transition-colors'
              >
                <div className='w-10 h-10 rounded-full overflow-hidden bg-primary shrink-0'>
                  <img
                    alt='Admin User'
                    className='w-full h-full object-cover'
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'Admin')}&background=b6212f&color=fff&size=128`}
                  />
                </div>
                <div className='flex-1 min-w-0'>
                  <p className='text-xs font-bold text-on-surface truncate'>
                    {user?.name || 'Admin User'}
                  </p>
                  <p className='text-[10px] text-on-surface-variant'>
                    System Admin
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

        {/* Mobile Bottom Navigation */}
        <div className='md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-outline-variant/10 safe-area-inset-bottom'>
          <div className='flex items-center justify-around px-2 py-2'>
            <Link
              href='/admin/dashboard'
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                isActive('/admin/dashboard')
                  ? 'text-primary'
                  : 'text-on-surface-variant'
              }`}
            >
              <LayoutDashboard className='w-6 h-6' />
              <span className='text-[10px] font-bold'>Dashboard</span>
            </Link>
            <Link
              href='/admin/listings'
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                isActive('/admin/listings')
                  ? 'text-primary'
                  : 'text-on-surface-variant'
              }`}
            >
              <Building2 className='w-6 h-6' />
              <span className='text-[10px] font-bold'>Listings</span>
            </Link>
            <Link
              href='/admin/users'
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                isActive('/admin/users')
                  ? 'text-primary'
                  : 'text-on-surface-variant'
              }`}
            >
              <Users className='w-6 h-6' />
              <span className='text-[10px] font-bold'>Users</span>
            </Link>
            <Link
              href='/admin/bookings'
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                isActive('/admin/bookings')
                  ? 'text-primary'
                  : 'text-on-surface-variant'
              }`}
            >
              <CalendarCheck className='w-6 h-6' />
              <span className='text-[10px] font-bold'>Bookings</span>
            </Link>
            <button
              onClick={() => setIsDrawerOpen(true)}
              className='flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors text-on-surface-variant'
            >
              <Menu className='w-6 h-6' />
              <span className='text-[10px] font-bold'>More</span>
            </button>
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
                        Admin Portal
                      </h2>
                      <p className='text-xs text-on-surface-variant'>
                        System Management
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
              </nav>

              <div className='px-3 pb-6 pt-2 border-t border-outline-variant/10'>
                <div className='flex items-center gap-3 p-4 bg-surface-container rounded-xl mb-3 mt-3'>
                  <div className='w-12 h-12 rounded-full overflow-hidden bg-primary shrink-0'>
                    <img
                      alt='Admin User'
                      className='w-full h-full object-cover'
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'Admin')}&background=b6212f&color=fff&size=128`}
                    />
                  </div>
                  <div className='flex-1 min-w-0'>
                    <p className='text-sm font-bold text-on-surface truncate'>
                      {user?.name || 'Admin User'}
                    </p>
                    <p className='text-xs text-on-surface-variant'>
                      {user?.email || 'admin@brainwarerooms.com'}
                    </p>
                    <p className='text-[10px] text-on-surface-variant mt-0.5'>
                      System Administrator
                    </p>
                  </div>
                </div>

                <div className='space-y-2'>
                  <Link
                    href='/admin/profile'
                    onClick={() => setIsDrawerOpen(false)}
                    className='flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-gray-50 hover:text-on-surface transition-colors'
                  >
                    <UserCircle className='w-6 h-6' />
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
