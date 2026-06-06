'use client'

import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { toast } from 'sonner'
import Image from 'next/image'
import {
  ShieldCheck,
  Lock,
  Wallet,
  ChevronRight,
  LogIn,
  Pencil,
  FileText,
  ShieldAlert,
  Building2,
} from 'lucide-react'
import { StudentProfileSkeleton } from '@/components/ui/skeleton/profile-skeleton'

interface MenuItem {
  id: string
  label: string
  icon: React.ElementType
  path: string
}

function ProfileMenuRow({
  label,
  icon: Icon,
  onClick,
}: {
  label: string
  icon: MenuItem['icon']
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className='w-full flex items-center gap-4 py-3.5 px-0 bg-transparent text-left cursor-pointer active:opacity-70 transition-opacity'
    >
      <span style={{ color: '#222', display: 'flex', alignItems: 'center' }}>
        <Icon className='w-5 h-5 shrink-0' />
      </span>
      <span className='flex-1 text-[15px]' style={{ color: '#222' }}>{label}</span>
      <ChevronRight className='w-4 h-4 shrink-0' style={{ color: '#bbb' }} />
    </button>
  )
}

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

  if (loading) return <StudentProfileSkeleton />
  if (!user) return null

  const primaryItems: MenuItem[] = [
    { id: 'security', label: 'Login & security', icon: Lock, path: '/student/profile/security' },
    { id: 'payments', label: 'Payments management', icon: Wallet, path: '/student/payments' },
  ]

  const secondaryItems: MenuItem[] = [
    ...(user.role !== 'admin' && user.role !== 'owner' && !user.isStudentVerified
      ? [{ id: 'become-host', label: 'List your space', icon: Building2, path: '/host/homes' }]
      : []),
    { id: 'terms', label: 'Terms of service', icon: FileText, path: '/terms' },
    { id: 'privacy', label: 'Privacy policy', icon: ShieldAlert, path: '/privacy' },
  ]

  return (
    <div className='min-h-screen' style={{ background: '#fff' }}>
      <div className='max-w-lg mx-auto px-5 pt-6 pb-24'>

        {/* Avatar Card */}
        <div className='relative flex items-center gap-4 mb-8'>
          <div className='relative shrink-0'>
            <div className='w-[68px] h-[68px] rounded-full bg-gradient-to-br from-[#FF385C] to-[#E31C5F] flex items-center justify-center overflow-hidden'>
              {user?.profilePicUrl ? (
                <Image
                  src={user.profilePicUrl}
                  alt={user?.name || 'Profile'}
                  width={68}
                  height={68}
                  className='w-full h-full object-cover'
                  priority
                />
              ) : (
                <span className='text-2xl font-semibold text-white'>
                  {user.name?.[0]?.toUpperCase()}
                </span>
              )}
            </div>
            {user.isStudentVerified && (
              <div className='absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-white'>
                <ShieldCheck className='w-3 h-3 text-white' />
              </div>
            )}
          </div>

          <div className='flex-1 min-w-0'>
            <h1 className='text-[20px] font-bold leading-tight truncate' style={{ color: '#222' }}>
              {user.name}
            </h1>
            <p className='text-sm mt-0.5 truncate' style={{ color: '#717171' }}>
              {user.email}
            </p>
          </div>

          {/* Edit icon */}
          <button
            onClick={() => router.push('/student/profile/personal-info')}
            className='w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0'
            style={{ background: '#f5f5f5' }}
            title='Edit profile'
          >
            <Pencil className='w-4 h-4' style={{ color: '#444' }} />
          </button>
        </div>

        {/* Student Verification Banner */}
        {!user.isStudentVerified && user.role === 'student' && (
          <button
            onClick={() => router.push('/student/verify-student-email')}
            className='w-full flex items-center gap-3 p-4 mb-6 rounded-xl text-left'
            style={{ background: '#fff5f6', border: '1px solid #fecdd3' }}
          >
            <div className='w-9 h-9 rounded-full flex items-center justify-center shrink-0' style={{ background: '#ffe4e6' }}>
              <ShieldCheck className='w-5 h-5' style={{ color: '#FF385C' }} />
            </div>
            <div className='flex-1 min-w-0'>
              <p className='text-sm font-semibold' style={{ color: '#9f1239' }}>Verify student status</p>
              <p className='text-xs' style={{ color: '#FF385C' }}>Link your university email</p>
            </div>
            <ChevronRight className='w-5 h-5 shrink-0' style={{ color: '#fda4af' }} />
          </button>
        )}

        {/* Primary Items */}
        <div>
          {primaryItems.map((item) => (
            <ProfileMenuRow
              key={item.id}
              label={item.label}
              icon={item.icon}
              onClick={() => router.push(item.path)}
            />
          ))}
        </div>

        {/* Secondary Items */}
        <div className='mt-4'>
          {secondaryItems.map((item) => (
            <ProfileMenuRow
              key={item.id}
              label={item.label}
              icon={item.icon}
              onClick={() => router.push(item.path)}
            />
          ))}
        </div>

        {/* Logout */}
        <div className='mt-4'>
          <button
            onClick={handleLogout}
            className='flex items-center gap-4 py-3.5 bg-transparent text-left cursor-pointer active:opacity-70 transition-opacity'
          >
            <LogIn className='w-5 h-5 shrink-0' style={{ color: '#222' }} />
            <span className='text-[15px]' style={{ color: '#222' }}>Log out</span>
          </button>
        </div>

        {/* Version */}
        <p className='text-center text-xs mt-12' style={{ color: '#ccc' }}>
          Version 0.0.1
        </p>
      </div>
    </div>
  )
}
