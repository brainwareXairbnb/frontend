'use client'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { toast } from 'sonner'
import {
  User,
  Settings,
  Shield,
  HelpCircle,
  LogOut,
  FileText,
  ChevronRight,
  PlusCircle,
  Building2,
  FileSearch,
  Lock,
  Mail,
  Calendar,
  ShieldCheck,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { StudentProfileSkeleton } from '@/components/ui/skeleton/profile-skeleton'

export default function StudentProfilePage() {
  const router = useRouter()
  const { user, loading, logout } = useAuth()

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

  const accountSections = [
    {
      id: 'personal-info',
      title: 'Personal info',
      description: 'Provide personal details and how we can reach you',
      icon: User,
      path: '/student/profile/personal-info',
    },
    {
      id: 'login-security',
      title: 'Login & security',
      description: 'Update your password and secure your account',
      icon: Lock,
      path: '/student/profile/security',
    },
  ]

  // Only show "Become a Owner" if user is not already an admin or owner
  const hostingSection =
    user && user.role !== 'admin' && user.role !== 'owner'
      ? [
          {
            id: 'become-owner',
            title: 'List your space',
            description: 'Become an owner and start earning from your property',
            icon: Building2,
            path: '/host/homes',
          },
        ]
      : []

  if (loading) {
    return <StudentProfileSkeleton />
  }

  if (!user) {
    return (
      <div className='bg-white min-h-screen'>
        <div className='max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 py-8 sm:py-12'>
          <div className='bg-white p-2'>
            <p className='text-base text-gray-600 mb-6'>
              Log in and start planning your next stay.
            </p>
            <Button
              className='w-full sm:w-auto px-8'
              onClick={() => router.push('/login')}
            >
              Log in or sign up
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-white'>
      <div className='max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 py-8 sm:py-12'>
        {/* Student Verification Banner - Only show if NOT verified */}
        {!user.isStudentVerified && (
          <div className='mb-6 sm:mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded p-4 sm:p-6 shadow-sm'>
            <div className='flex items-start gap-3 sm:gap-4'>
              <div className='w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0'>
                <ShieldCheck className='w-5 h-5 sm:w-6 sm:h-6 text-blue-600' />
              </div>
              <div className='flex-1 min-w-0'>
                <h3 className='text-base sm:text-lg font-semibold text-gray-900 mb-1'>
                  Verify Your Student Status
                </h3>
                <p className='text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4'>
                  Link your institutional email (@brainwareuniversity.ac.in) to
                  get verified student status badge, and build trust with
                  property owners.
                </p>
                <Button
                  onClick={() => router.push('/student/verify-student-email')}
                  className='bg-blue-600 hover:bg-blue-700 w-full sm:w-auto text-sm sm:text-base h-9 sm:h-10'
                >
                  <ShieldCheck className='w-4 h-4' />
                  Verify Now
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Profile Card */}
        <div className='bg-white border border-gray-200 rounded p-4 sm:p-6 mb-6 sm:mb-8 hover:shadow-lg transition-shadow'>
          <div className='flex items-start justify-between gap-3'>
            <div className='flex items-start gap-3 sm:gap-5 flex-1 min-w-0'>
              {/* Avatar */}
              <div className='relative shrink-0'>
                <div className='w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#FF385C] to-[#E31C5F] flex items-center justify-center shadow-md'>
                  <span className='text-xl sm:text-2xl font-semibold text-white'>
                    {user.name?.[0]?.toUpperCase()}
                  </span>
                </div>
                {user.isStudentVerified && (
                  <div className='absolute -bottom-1 -right-1 w-6 h-6 sm:w-7 sm:h-7 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-white shadow'>
                    <ShieldCheck className='w-3 h-3 sm:w-3.5 sm:h-3.5 text-white' />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className='flex-1 min-w-0'>
                <h2 className='text-lg sm:text-xl font-semibold text-gray-900 mb-1 truncate'>
                  {user.name}
                </h2>
                <div className='flex flex-col gap-1 sm:gap-1.5 text-xs sm:text-sm text-gray-600'>
                  <div className='flex items-center gap-2'>
                    <Mail className='w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0' />
                    <span className='truncate'>{user.email}</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Calendar className='w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0' />
                    <span>
                      Joined{' '}
                      {new Date(
                        user.createdAt || Date.now(),
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
            <div className='hidden sm:flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full border border-blue-200 shrink-0'>
              <Shield className='w-4 h-4' />
              <span className='text-sm font-medium capitalize'>
                {user.role}
              </span>
            </div>
          </div>

          {/* Verification Status Row */}
          {user.isStudentVerified && user.studentEmail && (
            <div className='mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200'>
              <div className='flex items-center gap-2 flex-wrap'>
                <span className='inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-[10px] sm:text-xs font-semibold border border-emerald-200'>
                  <ShieldCheck className='w-3 h-3 sm:w-3.5 sm:h-3.5' />
                  Verified Student
                </span>
                <span className='text-xs sm:text-sm text-gray-500'>·</span>
                <span className='text-xs sm:text-sm text-gray-600 break-all'>
                  {user.studentEmail}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Account Settings Section */}
        <div className='space-y-3 sm:space-y-6'>
          {accountSections.map((section) => {
            const Icon = section.icon
            return (
              <button
                key={section.id}
                onClick={() => router.push(section.path)}
                className='w-full bg-white border border-gray-200 rounded p-4 sm:p-6 hover:shadow-lg transition-all duration-200 group text-left'
              >
                <div className='flex items-center justify-between gap-3'>
                  <div className='flex items-center gap-3 sm:gap-4 flex-1 min-w-0'>
                    <div className='w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-lg sm:rounded-xl flex items-center justify-center group-hover:bg-[#FF385C]/10 transition-colors shrink-0'>
                      <Icon className='w-5 h-5 sm:w-6 sm:h-6 text-gray-700 group-hover:text-[#FF385C] transition-colors' />
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

        {/* Hosting Section */}
        {hostingSection.length > 0 && (
          <div className='mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-gray-200'>
            <h2 className='text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6'>
              Hosting
            </h2>
            <div className='space-y-3 sm:space-y-6'>
              {hostingSection.map((section) => {
                const Icon = section.icon
                return (
                  <button
                    key={section.id}
                    onClick={() => router.push(section.path)}
                    className='w-full bg-gradient-to-br from-[#FF385C]/5 to-[#E31C5F]/5 border border-[#FF385C]/20 rounded p-4 sm:p-6 hover:shadow-lg transition-all duration-200 group text-left'
                  >
                    <div className='flex items-center justify-between gap-3'>
                      <div className='flex items-center gap-3 sm:gap-4 flex-1 min-w-0'>
                        <div className='w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-lg sm:rounded-xl flex items-center justify-center group-hover:bg-[#FF385C] transition-colors shadow-sm shrink-0'>
                          <Icon className='w-5 h-5 sm:w-6 sm:h-6 text-[#FF385C] group-hover:text-white transition-colors' />
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
                      <ChevronRight className='w-5 h-5 text-[#FF385C] group-hover:translate-x-1 transition-all shrink-0' />
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        )}

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
