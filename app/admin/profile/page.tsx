'use client'

import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { toast } from 'sonner'
import Image from 'next/image'
import {
  Lock,
  ChevronRight,
  BadgeCheck,
  LogIn,
  Pencil,
  FileText,
  ShieldAlert,
} from 'lucide-react'
import { ProfileSkeleton } from '@/components/ui/skeleton/profile-skeleton'

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

  if (loading) return <ProfileSkeleton />
  if (!profile) return null

  const primaryItems: MenuItem[] = [
    { id: 'security', label: 'Login & security', icon: Lock, path: '/admin/profile/security' },
  ]

  const secondaryItems: MenuItem[] = [
    { id: 'terms', label: 'Terms of service', icon: FileText, path: '/terms' },
    { id: 'privacy', label: 'Privacy policy', icon: ShieldAlert, path: '/privacy' },
  ]

  return (
    <div className='min-h-screen' style={{ background: '#fff' }}>
      <div className='max-w-lg mx-auto px-5 pt-6 pb-24'>

        {/* Avatar Card */}
        <div className='relative flex items-center gap-4 mb-8'>
          <div className='relative shrink-0'>
            <div className='w-[68px] h-[68px] rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center overflow-hidden'>
              {profile?.profilePicUrl ? (
                <Image
                  src={profile.profilePicUrl}
                  alt={profile?.name || 'Admin'}
                  width={68}
                  height={68}
                  className='w-full h-full object-cover'
                  priority
                />
              ) : (
                <span className='text-2xl font-semibold text-white'>
                  {profile?.name?.charAt(0).toUpperCase() || 'A'}
                </span>
              )}
            </div>
            <div className='absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white'>
              <BadgeCheck className='w-3 h-3 text-white' />
            </div>
          </div>

          <div className='flex-1 min-w-0'>
            <h1 className='text-[20px] font-bold leading-tight truncate' style={{ color: '#222' }}>
              {profile?.name || 'Admin'}
            </h1>
            <p className='text-sm mt-0.5 truncate' style={{ color: '#717171' }}>
              {profile?.email}
            </p>
          </div>

          {/* Edit icon */}
          <button
            onClick={() => router.push('/admin/profile/personal-info')}
            className='w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0'
            style={{ background: '#f5f5f5' }}
            title='Edit profile'
          >
            <Pencil className='w-4 h-4' style={{ color: '#444' }} />
          </button>
        </div>

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
