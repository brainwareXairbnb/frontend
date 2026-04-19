'use client'

import { useEffect, useState } from 'react'
import { adminApi } from '@/lib/api'
import {
  X,
  User as UserIcon,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Briefcase,
  Building2,
  CreditCard,
  Fingerprint,
  Shield,
  AlertCircle,
  Loader2,
} from 'lucide-react'
import { format } from 'date-fns'
import { toast } from 'sonner'

interface UserDetailModalProps {
  userId: string | null
  isOpen: boolean
  onClose: () => void
}

export function UserDetailModal({
  userId,
  isOpen,
  onClose,
}: UserDetailModalProps) {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (userId && isOpen) {
      fetchUserDetails()
    }
  }, [userId, isOpen])

  const fetchUserDetails = async () => {
    if (!userId) return

    setLoading(true)
    try {
      const response = await adminApi.getUserById(userId)
      setUser(response.user)
    } catch (error: any) {
      toast.error('Failed to fetch user details', {
        description: error.message,
      })
      onClose()
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-700'
      case 'suspended':
        return 'bg-orange-100 text-orange-700'
      case 'banned':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getRoleColor = (role: string) => {
    switch (role?.toLowerCase()) {
      case 'admin':
        return 'bg-purple-100 text-purple-700'
      case 'owner':
        return 'bg-blue-100 text-blue-700'
      case 'student':
        return 'bg-emerald-100 text-emerald-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className='fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4'>
      <div className='bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto'>
        {/* Header */}
        <div className='sticky top-0 bg-white border-b border-outline-variant/10 px-6 py-4 flex items-center justify-between rounded-t-3xl'>
          <h2 className='text-xl font-bold text-on-surface'>User Details</h2>
          <button
            onClick={onClose}
            className='w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container transition-colors'
          >
            <X className='w-5 h-5' />
          </button>
        </div>

        {loading ? (
          <div className='flex flex-col items-center justify-center py-20 gap-4'>
            <Loader2 className='w-8 h-8 animate-spin text-primary' />
            <p className='text-sm text-on-surface-variant'>
              Loading user details...
            </p>
          </div>
        ) : user ? (
          <div className='p-6 space-y-6'>
            {/* Profile Section */}
            <div className='bg-surface-container-lowest rounded-2xl p-6'>
              <div className='flex items-start gap-6'>
                <div className='w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold text-3xl shrink-0'>
                  {user.name.charAt(0)}
                </div>
                <div className='flex-1 min-w-0'>
                  <h3 className='text-2xl font-bold text-on-surface mb-2'>
                    {user.name}
                  </h3>
                  <div className='flex flex-wrap items-center gap-2 mb-4'>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${getRoleColor(user.role)}`}
                    >
                      {user.role.toUpperCase()}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(user.status || 'active')}`}
                    >
                      {(user.status || 'active').toUpperCase()}
                    </span>
                  </div>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-3 text-sm'>
                    <div className='flex items-center gap-2'>
                      <Mail className='w-4 h-4 text-on-surface-variant' />
                      <span className='text-on-surface-variant'>
                        {user.email}
                      </span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <Phone className='w-4 h-4 text-on-surface-variant' />
                      <span className='text-on-surface-variant'>
                        {user.phone || 'N/A'}
                      </span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <Calendar className='w-4 h-4 text-on-surface-variant' />
                      <span className='text-on-surface-variant'>
                        Joined{' '}
                        {format(new Date(user.createdAt), 'MMM dd, yyyy')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Student Details */}
            {user.role === 'student' && (
              <div className='bg-surface-container-lowest rounded-2xl p-6'>
                <div className='flex items-center gap-2 mb-4'>
                  <UserIcon className='w-5 h-5 text-primary' />
                  <h4 className='text-lg font-bold text-on-surface'>
                    Student Information
                  </h4>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  {user.studentEmail && (
                    <div>
                      <p className='text-xs text-on-surface-variant mb-1'>
                        Student Email
                      </p>
                      <p className='text-sm font-semibold'>
                        {user.studentEmail}
                      </p>
                    </div>
                  )}
                  {user.universityRollNo && (
                    <div>
                      <p className='text-xs text-on-surface-variant mb-1'>
                        Roll Number
                      </p>
                      <p className='text-sm font-semibold'>
                        {user.universityRollNo}
                      </p>
                    </div>
                  )}
                  {user.gender && (
                    <div>
                      <p className='text-xs text-on-surface-variant mb-1'>
                        Gender
                      </p>
                      <p className='text-sm font-semibold capitalize'>
                        {user.gender}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Owner Details */}
            {user.role === 'owner' && (
              <div className='bg-surface-container-lowest rounded-2xl p-6'>
                <div className='flex items-center gap-2 mb-4'>
                  <Building2 className='w-5 h-5 text-primary' />
                  <h4 className='text-lg font-bold text-on-surface'>
                    Owner Information
                  </h4>
                </div>
                <div className='space-y-4'>
                  {user.businessAddress && (
                    <div>
                      <div className='flex items-center gap-2 mb-1'>
                        <MapPin className='w-4 h-4 text-on-surface-variant' />
                        <p className='text-xs text-on-surface-variant'>
                          Business Address
                        </p>
                      </div>
                      <p className='text-sm font-semibold'>
                        {user.businessAddress}
                      </p>
                    </div>
                  )}
                  {user.nidNo && (
                    <div>
                      <div className='flex items-center gap-2 mb-1'>
                        <Fingerprint className='w-4 h-4 text-on-surface-variant' />
                        <p className='text-xs text-on-surface-variant'>
                          NID Number
                        </p>
                      </div>
                      <p className='text-sm font-semibold'>{user.nidNo}</p>
                    </div>
                  )}

                  {user.bankDetails && (
                    <div className='mt-4 pt-4 border-t border-outline-variant/20'>
                      <div className='flex items-center gap-2 mb-3'>
                        <CreditCard className='w-4 h-4 text-primary' />
                        <p className='text-sm font-bold text-on-surface'>
                          Bank Details
                        </p>
                      </div>
                      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 rounded-xl border border-outline-variant/10'>
                        <div>
                          <p className='text-xs text-on-surface-variant mb-1'>
                            Bank Name
                          </p>
                          <p className='text-sm font-semibold'>
                            {user.bankDetails.bankName || 'N/A'}
                          </p>
                        </div>
                        <div>
                          <p className='text-xs text-on-surface-variant mb-1'>
                            Account Number
                          </p>
                          <p className='text-sm font-semibold'>
                            {user.bankDetails.accountNumber || 'N/A'}
                          </p>
                        </div>
                        <div>
                          <p className='text-xs text-on-surface-variant mb-1'>
                            IFSC Code
                          </p>
                          <p className='text-sm font-semibold'>
                            {user.bankDetails.ifsc || 'N/A'}
                          </p>
                        </div>
                        <div className='md:col-span-3'>
                          <p className='text-xs text-on-surface-variant mb-1'>
                            Account Holder Name
                          </p>
                          <p className='text-sm font-semibold'>
                            {user.bankDetails.accountHolderName || 'N/A'}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {user.upgradeRequest && (
                    <div className='mt-4 pt-4 border-t border-outline-variant/20'>
                      <div className='flex items-center gap-2 mb-3'>
                        <Shield className='w-4 h-4 text-primary' />
                        <p className='text-sm font-bold text-on-surface'>
                          Upgrade Request
                        </p>
                      </div>
                      <div className='space-y-2'>
                        <div className='flex items-center justify-between'>
                          <span className='text-xs text-on-surface-variant'>
                            Status
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-bold ${getStatusColor(user.upgradeRequest.status)}`}
                          >
                            {user.upgradeRequest.status.toUpperCase()}
                          </span>
                        </div>
                        <div className='flex items-center justify-between'>
                          <span className='text-xs text-on-surface-variant'>
                            Requested At
                          </span>
                          <span className='text-xs font-semibold'>
                            {format(
                              new Date(user.upgradeRequest.requestedAt),
                              'MMM dd, yyyy hh:mm a',
                            )}
                          </span>
                        </div>
                        {user.upgradeRequest.rejectionReason && (
                          <div className='bg-red-50 rounded-lg p-3 border border-red-200'>
                            <div className='flex items-start gap-2'>
                              <AlertCircle className='w-4 h-4 text-red-600 mt-0.5' />
                              <div>
                                <p className='text-xs font-bold text-red-900 mb-1'>
                                  Rejection Reason
                                </p>
                                <p className='text-xs text-red-700'>
                                  {user.upgradeRequest.rejectionReason}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Additional Info */}
            <div className='bg-surface-container-lowest rounded-2xl p-6'>
              <h4 className='text-lg font-bold text-on-surface mb-4'>
                Additional Information
              </h4>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-sm'>
                <div>
                  <p className='text-xs text-on-surface-variant mb-1'>
                    Email Verified
                  </p>
                  <p className='text-sm font-semibold'>
                    {user.isEmailVerified ? 'Yes' : 'No'}
                  </p>
                </div>
                {user.role === 'owner' && (
                  <div>
                    <p className='text-xs text-on-surface-variant mb-1'>
                      Account Approved
                    </p>
                    <p className='text-sm font-semibold'>
                      {user.isApproved ? 'Yes' : 'No'}
                    </p>
                  </div>
                )}
                <div>
                  <p className='text-xs text-on-surface-variant mb-1'>
                    Last Updated
                  </p>
                  <p className='text-sm font-semibold'>
                    {format(new Date(user.updatedAt), 'MMM dd, yyyy hh:mm a')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
