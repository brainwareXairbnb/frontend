'use client'

import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { toast } from 'sonner'
import {
  User,
  Lock,
  ChevronRight,
  Loader2,
  Calendar,
  BadgeCheck,
  LogOut,
  Settings,
} from 'lucide-react'

export default function AdminProfilePage() {
  const router = useRouter()
  const { user: profile, loading, logout } = useAuth()

  const handleLogout = async () => {
    try {
      await logout()
      toast.success('Logged out successfully')
      router.push('/login')
    } catch (error) {
      toast.error('Failed to logout')
    }
  }

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen bg-[#fafafa]'>
        <Loader2 className='w-8 h-8 animate-spin text-primary' />
      </div>
    )
  }

  const menuItems = [
    {
      id: 'personal-info',
      title: 'Personal Info',
      description: 'Update your name and email',
      icon: User,
      href: '/admin/profile/personal-info',
    },
    // {
    //   id: 'settings',
    //   title: 'Admin Settings',
    //   description: 'Manage platform settings',
    //   icon: Settings,
    //   href: '/admin/settings',
    // },
    {
      id: 'login-security',
      title: 'Change Password',
      description: 'Update your login password',
      icon: Lock,
      href: '/admin/profile/security',
    },
  ]

  return (
    <div className='min-h-screen bg-[#fafafa]'>
      {/* Profile Overview Card */}
      <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
        <div className='bg-white rounded sm:rounded-2xl border border-outline-variant/10 p-4 sm:p-6 mb-6 sm:mb-8 shadow-sm hover:shadow-md transition-shadow'>
          <div className='flex items-center gap-4'>
            {/* Avatar */}
            <div className='relative shrink-0'>
              <div className='w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border-3 border-white shadow-md'>
                <span className='text-2xl sm:text-3xl font-bold text-primary'>
                  {profile?.name?.charAt(0).toUpperCase() || 'A'}
                </span>
              </div>
              <div className='absolute -bottom-0.5 -right-0.5 w-6 h-6 sm:w-7 sm:h-7 bg-purple-500 rounded-full flex items-center justify-center border-3 border-white shadow-md'>
                <BadgeCheck className='w-3 h-3 sm:w-3.5 sm:h-3.5 text-white' />
              </div>
            </div>

            {/* Profile Info */}
            <div className='flex-1 min-w-0'>
              <h2 className='text-lg sm:text-xl font-bold text-on-surface mb-1 truncate'>
                {profile?.name || 'Admin'}
              </h2>
              <p className='text-xs sm:text-sm text-on-surface-variant mb-2 flex items-center gap-1.5'>
                <Calendar className='w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0' />
                <span className='truncate'>
                  Joined{' '}
                  {new Date(
                    profile?.createdAt || Date.now(),
                  ).toLocaleDateString('en-US', {
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
              </p>

              {/* Badges */}
              <div className='flex flex-wrap gap-1.5'>
                <span className='inline-flex items-center gap-1 px-2 py-1 bg-purple-50 text-purple-700 rounded-full text-[10px] sm:text-xs font-semibold border border-purple-100'>
                  <BadgeCheck className='w-2.5 h-2.5 sm:w-3 sm:h-3' />
                  <span className='hidden sm:inline'>Administrator</span>
                  <span className='sm:hidden'>Admin</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className='space-y-4'>
          <div className='bg-white rounded sm:rounded-2xl border border-outline-variant/10 divide-y divide-outline-variant/10 shadow-sm overflow-hidden'>
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => router.push(item.href)}
                  className='w-full flex items-center gap-3 sm:gap-4 p-3 sm:p-4 hover:bg-surface-container-low/50 transition-all group text-left'
                >
                  <div className='w-9 h-9 sm:w-10 sm:h-10 bg-surface-container-low rounded-lg sm:rounded flex items-center justify-center text-on-surface-variant group-hover:bg-primary/10 group-hover:text-primary transition-all shrink-0'>
                    <Icon className='w-4 h-4 sm:w-5 sm:h-5' />
                  </div>
                  <div className='flex-1 min-w-0'>
                    <h3 className='text-sm sm:text-base font-semibold text-on-surface mb-0.5'>
                      {item.title}
                    </h3>
                    <p className='text-xs text-on-surface-variant line-clamp-1'>
                      {item.description}
                    </p>
                  </div>
                  <ChevronRight className='w-4 h-4 sm:w-5 sm:h-5 text-on-surface-variant/40 group-hover:text-on-surface-variant group-hover:translate-x-1 transition-all shrink-0' />
                </button>
              )
            })}
          </div>

          {/* Logout */}
          <div className='bg-white rounded sm:rounded-2xl border border-outline-variant/10 shadow-sm overflow-hidden'>
            <button
              onClick={handleLogout}
              className='w-full flex items-center gap-3 sm:gap-4 p-3 sm:p-4 hover:bg-red-50 transition-all group text-left'
            >
              <div className='w-9 h-9 sm:w-10 sm:h-10 bg-red-50 rounded-lg sm:rounded flex items-center justify-center text-red-600 group-hover:bg-red-100 transition-all shrink-0'>
                <LogOut className='w-4 h-4 sm:w-5 sm:h-5' />
              </div>
              <div className='flex-1'>
                <h3 className='text-sm sm:text-base font-semibold text-red-600'>
                  Log out
                </h3>
              </div>
              <ChevronRight className='w-4 h-4 sm:w-5 sm:h-5 text-red-600/40 group-hover:text-red-600 group-hover:translate-x-1 transition-all shrink-0' />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
