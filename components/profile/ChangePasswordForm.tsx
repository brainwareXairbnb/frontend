'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Eye, EyeOff, Lock, Loader2, ChevronLeft } from 'lucide-react'
import { userApi } from '@/lib/api'

interface ChangePasswordFormProps {
  backPath: string
  userRole: 'owner' | 'admin' | 'student'
}

export function ChangePasswordForm({
  backPath,
  userRole,
}: ChangePasswordFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (
      !formData.currentPassword ||
      !formData.newPassword ||
      !formData.confirmPassword
    ) {
      toast.error('Please fill in all fields')
      return
    }

    if (formData.newPassword.length < 6) {
      toast.error('New password must be at least 6 characters')
      return
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('New passwords do not match')
      return
    }

    if (formData.currentPassword === formData.newPassword) {
      toast.error('New password must be different from current password')
      return
    }

    try {
      setLoading(true)
      await userApi.changePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      })
      toast.success('Password changed successfully')
      router.push(backPath)
    } catch (error: any) {
      toast.error(error.message || 'Failed to change password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-[#fafafa]'>
      {/* Header */}
      <div className='bg-white border-b border-outline-variant/10'>
        <div className='max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6'>
          <button
            onClick={() => router.push(backPath)}
            className='flex items-center gap-2 text-on-surface-variant hover:text-on-surface transition-colors mb-3 sm:mb-4'
          >
            <ChevronLeft className='w-4 h-4 sm:w-5 sm:h-5' />
            <span className='text-sm sm:text-base font-medium'>Back</span>
          </button>
          <h1 className='text-xl sm:text-2xl font-bold text-on-surface'>
            Change Password
          </h1>
          <p className='text-xs sm:text-sm text-on-surface-variant mt-1'>
            Update your login password
          </p>
        </div>
      </div>

      {/* Form */}
      <div className='max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8'>
        <div className='bg-white'>
          <form onSubmit={handleSubmit} className='space-y-4 sm:space-y-5'>
            {/* Current Password */}
            <div>
              <label className='block text-sm font-semibold text-on-surface mb-2'>
                Current Password
              </label>
              <div className='relative'>
                <div className='absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-on-surface-variant'>
                  <Lock className='w-4 h-4 sm:w-5 sm:h-5' />
                </div>
                <input
                  type={showCurrentPassword ? 'text' : 'password'}
                  value={formData.currentPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      currentPassword: e.target.value,
                    })
                  }
                  className='w-full pl-10 sm:pl-12 pr-12 sm:pr-14 py-2.5 sm:py-3 border border-outline-variant rounded focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm sm:text-base'
                  placeholder='Enter current password'
                  disabled={loading}
                />
                <button
                  type='button'
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className='absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface transition-colors'
                >
                  {showCurrentPassword ? (
                    <EyeOff className='w-4 h-4 sm:w-5 sm:h-5' />
                  ) : (
                    <Eye className='w-4 h-4 sm:w-5 sm:h-5' />
                  )}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div>
              <label className='block text-sm font-semibold text-on-surface mb-2'>
                New Password
              </label>
              <div className='relative'>
                <div className='absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-on-surface-variant'>
                  <Lock className='w-4 h-4 sm:w-5 sm:h-5' />
                </div>
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  value={formData.newPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, newPassword: e.target.value })
                  }
                  className='w-full pl-10 sm:pl-12 pr-12 sm:pr-14 py-2.5 sm:py-3 border border-outline-variant rounded focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm sm:text-base'
                  placeholder='Enter new password (min. 6 characters)'
                  disabled={loading}
                />
                <button
                  type='button'
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className='absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface transition-colors'
                >
                  {showNewPassword ? (
                    <EyeOff className='w-4 h-4 sm:w-5 sm:h-5' />
                  ) : (
                    <Eye className='w-4 h-4 sm:w-5 sm:h-5' />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className='block text-sm font-semibold text-on-surface mb-2'>
                Confirm New Password
              </label>
              <div className='relative'>
                <div className='absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-on-surface-variant'>
                  <Lock className='w-4 h-4 sm:w-5 sm:h-5' />
                </div>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  className='w-full pl-10 sm:pl-12 pr-12 sm:pr-14 py-2.5 sm:py-3 border border-outline-variant rounded focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm sm:text-base'
                  placeholder='Confirm new password'
                  disabled={loading}
                />
                <button
                  type='button'
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className='absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface transition-colors'
                >
                  {showConfirmPassword ? (
                    <EyeOff className='w-4 h-4 sm:w-5 sm:h-5' />
                  ) : (
                    <Eye className='w-4 h-4 sm:w-5 sm:h-5' />
                  )}
                </button>
              </div>
            </div>

            {/* Password Requirements */}
            <div className='bg-surface-container-low/50 rounded-lg p-3 sm:p-4'>
              <p className='text-xs sm:text-sm font-semibold text-on-surface mb-2'>
                Password Requirements:
              </p>
              <ul className='space-y-1 text-xs sm:text-sm text-on-surface-variant'>
                <li className='flex items-center gap-2'>
                  <span className='w-1 h-1 rounded-full bg-on-surface-variant' />
                  At least 6 characters long
                </li>
                <li className='flex items-center gap-2'>
                  <span className='w-1 h-1 rounded-full bg-on-surface-variant' />
                  Different from current password
                </li>
              </ul>
            </div>

            {/* Buttons */}
            <div className='flex flex-col-reverse sm:flex-row gap-3 pt-2'>
              <button
                type='button'
                onClick={() => router.push(backPath)}
                className='w-full sm:w-auto px-6 py-2.5 sm:py-3 border border-outline-variant rounded font-semibold text-on-surface hover:bg-surface-container-low/50 transition-colors text-sm sm:text-base'
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type='submit'
                className='w-full sm:flex-1 px-6 py-2.5 sm:py-3 bg-primary text-white rounded font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base'
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className='w-4 h-4 animate-spin' />
                    Updating...
                  </>
                ) : (
                  'Change Password'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
