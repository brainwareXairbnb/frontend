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
  User,
  MessageCircle,
  Phone,
  Mail,
} from 'lucide-react'
import { ProfileSkeleton } from '@/components/ui/skeleton/profile-skeleton'

interface MenuItem {
  id: string
  label: string
  description?: string
  icon: React.ElementType
  path: string
}

// Original Mobile Row
function MobileProfileMenuRow({
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

// Fancy Desktop Row
function DesktopProfileMenuRow({
  label,
  description,
  icon: Icon,
  onClick,
}: {
  label: string
  description: string
  icon: MenuItem['icon']
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className='w-full flex items-center gap-4 py-4 px-3 hover:bg-slate-50/70 rounded-xl text-left cursor-pointer transition-all group border-b border-slate-50 last:border-b-0'
    >
      <div className='w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 text-slate-700 group-hover:bg-primary/10 group-hover:text-primary transition-colors'>
        <Icon className='w-5 h-5 shrink-0' />
      </div>
      <div className='flex-1 min-w-0'>
        <span className='block text-[15px] font-semibold text-slate-900 group-hover:text-primary transition-colors'>
          {label}
        </span>
        <span className='block text-xs text-slate-500 mt-0.5'>
          {description}
        </span>
      </div>
      <ChevronRight className='w-4 h-4 shrink-0 text-slate-400 group-hover:translate-x-1 transition-transform' />
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

  // Mobile Menu Items
  const mobilePrimaryItems: MenuItem[] = [
    { id: 'security', label: 'Login & security', icon: Lock, path: '/admin/profile/security' },
  ]

  const mobileSecondaryItems: MenuItem[] = [
    { id: 'terms', label: 'Terms of service', icon: FileText, path: '/terms' },
    { id: 'privacy', label: 'Privacy policy', icon: ShieldAlert, path: '/privacy' },
  ]

  // Desktop Menu Items
  const desktopPrimaryItems: MenuItem[] = [
    {
      id: 'personal-info',
      label: 'Personal Information',
      description: 'Manage your name, email, and personal details',
      icon: User,
      path: '/admin/profile/personal-info',
    },
    {
      id: 'security',
      label: 'Login & security',
      description: 'Update your password and secure your account',
      icon: Lock,
      path: '/admin/profile/security',
    },
  ]

  const desktopSecondaryItems: MenuItem[] = [
    {
      id: 'terms',
      label: 'Terms of service',
      description: 'Read our terms of service and conditions',
      icon: FileText,
      path: '/terms',
    },
    {
      id: 'privacy',
      label: 'Privacy policy',
      description: 'Review our privacy policies and options',
      icon: ShieldAlert,
      path: '/privacy',
    },
  ]

  return (
    <>
      {/* Mobile View - EXACTLY like previous */}
      <div className='md:hidden min-h-screen' style={{ background: '#fff' }}>
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
                <BadgeCheck className='w-3.5 h-3.5 text-white' />
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
            {mobilePrimaryItems.map((item) => (
              <MobileProfileMenuRow
                key={item.id}
                label={item.label}
                icon={item.icon}
                onClick={() => router.push(item.path)}
              />
            ))}
          </div>

          {/* Secondary Items */}
          <div className='mt-4'>
            {mobileSecondaryItems.map((item) => (
              <MobileProfileMenuRow
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

      {/* Desktop View - Gadget Restore Layout */}
      <div className='hidden md:block min-h-screen bg-slate-50/50'>
        <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-24'>
          {/* Top Profile Header Card */}
          <div className='bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
            <div className='flex items-center gap-5'>
              <div className='relative shrink-0'>
                <div className='w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center overflow-hidden'>
                  {profile?.profilePicUrl ? (
                    <Image
                      src={profile.profilePicUrl}
                      alt={profile?.name || 'Admin'}
                      width={80}
                      height={80}
                      className='w-full h-full object-cover'
                      priority
                    />
                  ) : (
                    <span className='text-2xl sm:text-3xl font-semibold text-white'>
                      {profile?.name?.charAt(0).toUpperCase() || 'A'}
                    </span>
                  )}
                </div>
                <div className='absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white'>
                  <BadgeCheck className='w-3.5 h-3.5 text-white' />
                </div>
              </div>

              <div className='min-w-0'>
                <h1 className='text-xl sm:text-2xl font-bold text-slate-900 leading-tight'>
                  {profile?.name || 'Admin'}
                </h1>
                <p className='text-sm text-slate-500 mt-1'>
                  {profile?.email}
                </p>
              </div>
            </div>

            <button
              onClick={() => router.push('/admin/profile/personal-info')}
              className='px-5 py-2.5 rounded-xl border border-slate-200 text-slate-800 font-semibold text-sm hover:bg-slate-50 transition-colors w-full sm:w-auto text-center cursor-pointer'
            >
              Edit Profile
            </button>
          </div>

          {/* Bottom Columns Grid */}
          <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-start'>
            {/* Left Column: Account Settings */}
            <div className='lg:col-span-7 bg-white rounded-2xl border border-slate-100 shadow-sm p-6'>
              <h2 className='text-lg font-bold text-slate-900 mb-4 px-1'>
                Account Settings
              </h2>
              <div className='flex flex-col gap-1'>
                {desktopPrimaryItems.map((item) => (
                  <DesktopProfileMenuRow
                    key={item.id}
                    label={item.label}
                    description={item.description || ''}
                    icon={item.icon}
                    onClick={() => router.push(item.path)}
                  />
                ))}
              </div>
            </div>

            {/* Right Column: Support & Legal */}
            <div className='lg:col-span-5 flex flex-col gap-6'>
              {/* Legal Documents Card */}
              <div className='bg-white rounded-2xl border border-slate-100 shadow-sm p-6'>
                <h2 className='text-lg font-bold text-slate-900 mb-4 px-1'>
                  Legal Documents
                </h2>
                <div className='flex flex-col gap-1'>
                  {desktopSecondaryItems.map((item) => (
                    <DesktopProfileMenuRow
                      key={item.id}
                      label={item.label}
                      description={item.description || ''}
                      icon={item.icon}
                      onClick={() => router.push(item.path)}
                    />
                  ))}
                </div>
              </div>

              {/* Customer Support Card */}
              <div className='bg-white rounded-2xl border border-slate-100 shadow-sm p-6'>
                <h2 className='text-lg font-bold text-slate-900 mb-2'>
                  Customer Support
                </h2>
                <p className='text-xs text-slate-500 mb-6'>
                  Have questions or need assistance? Reach out to us through any of the channels below.
                </p>

                <div className='flex flex-col gap-3'>
                  {/* WhatsApp */}
                  <button
                    onClick={() => window.open('https://wa.me/919999999999', '_blank')}
                    className='w-full flex items-center gap-4 p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-200 transition-all text-left cursor-pointer group'
                  >
                    <div className='w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:bg-emerald-100 transition-colors'>
                      <MessageCircle className='w-5 h-5 shrink-0' />
                    </div>
                    <div className='flex-1 min-w-0'>
                      <span className='block text-sm font-semibold text-slate-800 group-hover:text-emerald-600 transition-colors'>
                        WhatsApp Chat
                      </span>
                      <span className='block text-xs text-slate-500 mt-0.5'>
                        Chat with our support team
                      </span>
                    </div>
                    <ChevronRight className='w-4 h-4 shrink-0 text-slate-400 group-hover:translate-x-0.5 transition-transform' />
                  </button>

                  {/* Phone */}
                  <button
                    onClick={() => { window.location.href = 'tel:+919999999999' }}
                    className='w-full flex items-center gap-4 p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-200 transition-all text-left cursor-pointer group'
                  >
                    <div className='w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-colors'>
                      <Phone className='w-5 h-5 shrink-0' />
                    </div>
                    <div className='flex-1 min-w-0'>
                      <span className='block text-sm font-semibold text-slate-800 group-hover:text-blue-600 transition-colors'>
                        Phone Number
                      </span>
                      <span className='block text-xs text-slate-500 mt-0.5'>
                        Call +91 99999 99999
                      </span>
                    </div>
                    <ChevronRight className='w-4 h-4 shrink-0 text-slate-400 group-hover:translate-x-0.5 transition-transform' />
                  </button>

                  {/* Email */}
                  <button
                    onClick={() => { window.location.href = 'mailto:support@brainwareuniversity.ac.in' }}
                    className='w-full flex items-center gap-4 p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-200 transition-all text-left cursor-pointer group'
                  >
                    <div className='w-9 h-9 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 group-hover:bg-purple-100 transition-colors'>
                      <Mail className='w-5 h-5 shrink-0' />
                    </div>
                    <div className='flex-1 min-w-0'>
                      <span className='block text-sm font-semibold text-slate-800 group-hover:text-purple-600 transition-colors'>
                        Email Support
                      </span>
                      <span className='block text-xs text-slate-500 mt-0.5'>
                        support@brainwareuniversity.ac.in
                      </span>
                    </div>
                    <ChevronRight className='w-4 h-4 shrink-0 text-slate-400 group-hover:translate-x-0.5 transition-transform' />
                  </button>
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className='w-full py-3.5 px-4 rounded-xl border border-red-200 text-red-600 font-bold text-sm bg-red-50/50 hover:bg-red-50 hover:border-red-300 transition-colors text-center cursor-pointer'
              >
                Sign Out of BrainX
              </button>
            </div>
          </div>

          {/* Version */}
          <p className='text-center text-xs mt-12 text-slate-400'>
            Version 0.0.1
          </p>
        </div>
      </div>
    </>
  )
}


