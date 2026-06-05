'use client'

import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { toast } from 'sonner'
import Image from 'next/image'
import {
  User,
  Lock,
  ChevronRight,
  Calendar,
  BadgeCheck,
  LogOut,
  Mail,
  Shield,
} from 'lucide-react'
import { ProfileSkeleton } from '@/components/ui/skeleton/profile-skeleton'

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
    return <ProfileSkeleton />
  }

  const accountSections = [
    {
      id: 'personal-info',
      title: 'Personal info',
      description: 'Provide personal details and how we can reach you',
      icon: User,
      href: '/admin/profile/personal-info',
    },
    {
      id: 'login-security',
      title: 'Login & security',
      description: 'Update your password and secure your account',
      icon: Lock,
      href: '/admin/profile/security',
    },
  ]

  return (
    <div className='min-h-screen bg-white'>
      <div className='max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 pt-4 pb-24 sm:py-12'>
        {/* Profile Card */}
        <div className='bg-white border border-gray-200 rounded p-4 sm:p-6 mb-4 sm:mb-8 hover:shadow-lg transition-shadow'>
          <div className='flex items-start justify-between gap-3'>
            <div className='flex items-start gap-3 sm:gap-5 flex-1 min-w-0'>
              {/* Avatar */}
              <div className='relative shrink-0'>
                <div className='w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-md overflow-hidden'>
                  {profile?.profilePicUrl ? (
                    <Image
                      src={profile.profilePicUrl}
                      alt={profile?.name || 'Profile'}
                      width={64}
                      height={64}
                      className='w-full h-full object-cover'
                      priority
                    />
                  ) : (
                    <span className='text-xl sm:text-2xl font-semibold text-white'>
                      {profile?.name?.charAt(0).toUpperCase() || 'A'}
                    </span>
                  )}
                </div>
                <div className='absolute -bottom-1 -right-1 w-6 h-6 sm:w-7 sm:h-7 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white shadow'>
                  <Shield className='w-3 h-3 sm:w-3.5 sm:h-3.5 text-white' />
                </div>
              </div>

              {/* Info */}
              <div className='flex-1 min-w-0'>
                <h2 className='text-lg sm:text-xl font-semibold text-gray-900 mb-1 truncate'>
                  {profile?.name || 'Admin'}
                </h2>
                <div className='flex flex-col gap-1 sm:gap-1.5 text-xs sm:text-sm text-gray-600'>
                  <div className='flex items-center gap-2'>
                    <Mail className='w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0' />
                    <span className='truncate'>{profile?.email}</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Calendar className='w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0' />
                    <span>
                      Joined{' '}
                      {new Date(
                        profile?.createdAt || Date.now(),
                      ).toLocaleDateString('en-US', {
                        month: 'long',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Badge */}
            <div className='hidden sm:flex items-center gap-2 px-3 py-1.5 bg-purple-50 text-purple-700 rounded-full border border-purple-200 shrink-0'>
              <BadgeCheck className='w-4 h-4' />
              <span className='text-sm font-medium'>Administrator</span>
            </div>
          </div>
        </div>

        {/* Account Settings Section */}
        <div className='space-y-3 sm:space-y-6'>
          {accountSections.map((section) => {
            const Icon = section.icon
            return (
              <button
                key={section.id}
                onClick={() => router.push(section.href)}
                className='w-full bg-white border border-gray-200 rounded p-4 sm:p-6 hover:shadow-lg transition-all duration-200 group text-left'
              >
                <div className='flex items-center justify-between gap-3'>
                  <div className='flex items-center gap-3 sm:gap-4 flex-1 min-w-0'>
                    <div className='w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-lg sm:rounded-xl flex items-center justify-center group-hover:bg-primary/10 transition-colors shrink-0'>
                      <Icon className='w-5 h-5 sm:w-6 sm:h-6 text-gray-700 group-hover:text-primary transition-colors' />
                    </div>
                    <div className='flex-1 min-w-0'>
                      <h3 className='text-base sm:text-lg font-medium text-gray-900 mb-0.5 sm:mb-1'>
                        {section.title}
                      </h3>
                      <p className='text-xs sm:text-sm text-gray-600 line-clamp-1'>
                        {section.description}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className='w-5 h-5 text-gray-400 group-hover:text-gray-900 group-hover:translate-x-1 transition-all shrink-0' />
                </div>
              </button>
            )
          })}
        </div>

        {/* Logout Section */}
        <div className='mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-gray-200'>
          <button
            onClick={handleLogout}
            className='flex items-center gap-2.5 sm:gap-3 text-gray-900 hover:text-red-600 transition-colors group'
          >
            <LogOut className='w-4.5 h-4.5 sm:w-5 sm:h-5' />
            <span className='text-sm sm:text-base font-medium'>Log out</span>
          </button>
        </div>

        {/* Version Footer */}
        <div className='mt-8 sm:mt-12 pt-6 sm:pt-8 text-center'>
          <p className='text-xs text-gray-400'>Version 0.0.1</p>
        </div>
      </div>
    </div>
  )
}
