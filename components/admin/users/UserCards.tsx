'use client'

import { format } from 'date-fns'
import {
  Eye,
  CheckCircle2,
  Pause,
  Ban,
  Trash2,
  Calendar,
  ShieldCheck,
  XCircle,
} from 'lucide-react'
import { User } from '@/lib/types'
import { UserAvatar } from './UserAvatar'

interface UserCardsProps {
  users: User[]
  onViewUser: (userId: string) => void
  onSuspendUser: (userId: string, userName: string) => void
  onBanUser: (userId: string, userName: string) => void
  onActivateUser: (userId: string, userName: string) => void
  onDeleteUser: (userId: string, userName: string) => void
  getStatusColor: (status: string) => string
}

export function UserCards({
  users,
  onViewUser,
  onSuspendUser,
  onBanUser,
  onActivateUser,
  onDeleteUser,
  getStatusColor,
}: UserCardsProps) {
  return (
    <div className='md:hidden space-y-3'>
      {users.map((user: any) => (
        <div
          key={user._id}
          className='bg-white rounded-2xl border border-outline-variant/10 shadow-sm overflow-hidden'
        >
          {/* User Info Header */}
          <div className='p-4 bg-gradient-to-br from-surface-container-lowest to-white'>
            <div className='flex items-start gap-3'>
              <UserAvatar src={user.profilePicUrl} name={user.name} size="md" />
              <div className='flex-1 min-w-0'>
                <p className='text-base font-bold text-on-surface mb-1'>
                  {user.name}
                </p>
                <p className='text-[10px] text-on-surface-variant truncate mb-2'>
                  {user.email}
                </p>
                <div className='flex items-center gap-2 flex-wrap'>
                  <span className='px-2 py-0.5 rounded-full text-[9px] font-black uppercase bg-surface-container text-on-surface-variant'>
                    {user.role}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[9px] uppercase tracking-tighter ${getStatusColor(user.status || 'active')}`}
                  >
                    {user.status || 'Active'}
                  </span>
                  {user.role === 'student' && (
                    user.isStudentVerified ? (
                      <span className='inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full text-[9px] font-bold border border-emerald-200'>
                        <ShieldCheck className='w-2.5 h-2.5' />
                        Verified
                      </span>
                    ) : (
                      <span className='inline-flex items-center gap-1 px-2 py-0.5 bg-gray-50 text-gray-600 rounded-full text-[9px] font-bold border border-gray-200'>
                        <XCircle className='w-2.5 h-2.5' />
                        Not Verified
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Joined Date */}
            <div className='mt-3 pt-3 border-t border-outline-variant/10'>
              <div className='flex items-center gap-2'>
                <Calendar className='w-3.5 h-3.5 text-on-surface-variant' />
                <span className='text-[10px] text-on-surface-variant font-medium'>
                  Joined {format(new Date(user.createdAt), 'MMM dd, yyyy')}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className='p-3 bg-surface-container-lowest/30'>
            <div className='grid grid-cols-4 gap-2'>
              <button
                onClick={() => onViewUser(user._id)}
                className='flex flex-col items-center gap-1.5 p-2.5 rounded-xl bg-white active:scale-95 transition-transform'
              >
                <div className='w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center'>
                  <Eye className='w-4 h-4 text-blue-600' />
                </div>
                <span className='text-[9px] font-bold text-blue-600'>
                  View
                </span>
              </button>
              {user.status === 'suspended' || user.status === 'banned' ? (
                <button
                  onClick={() => onActivateUser(user._id, user.name)}
                  className='flex flex-col items-center gap-1.5 p-2.5 rounded-xl bg-white active:scale-95 transition-transform'
                >
                  <div className='w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center'>
                    <CheckCircle2 className='w-4 h-4 text-emerald-600' />
                  </div>
                  <span className='text-[9px] font-bold text-emerald-600'>
                    Activate
                  </span>
                </button>
              ) : (
                <>
                  <button
                    onClick={() => onSuspendUser(user._id, user.name)}
                    className='flex flex-col items-center gap-1.5 p-2.5 rounded-xl bg-white active:scale-95 transition-transform'
                  >
                    <div className='w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center'>
                      <Pause className='w-4 h-4 text-orange-600' />
                    </div>
                    <span className='text-[9px] font-bold text-orange-600'>
                      Suspend
                    </span>
                  </button>
                  <button
                    onClick={() => onBanUser(user._id, user.name)}
                    className='flex flex-col items-center gap-1.5 p-2.5 rounded-xl bg-white active:scale-95 transition-transform'
                  >
                    <div className='w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center'>
                      <Ban className='w-4 h-4 text-red-600' />
                    </div>
                    <span className='text-[9px] font-bold text-red-600'>Ban</span>
                  </button>
                </>
              )}
              <button
                onClick={() => onDeleteUser(user._id, user.name)}
                className='flex flex-col items-center gap-1.5 p-2.5 rounded-xl bg-white active:scale-95 transition-transform'
              >
                <div className='w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center'>
                  <Trash2 className='w-4 h-4 text-red-600' />
                </div>
                <span className='text-[9px] font-bold text-red-600'>Delete</span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
