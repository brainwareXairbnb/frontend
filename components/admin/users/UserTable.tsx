'use client'

import { format } from 'date-fns'
import {
  Eye,
  CheckCircle2,
  Pause,
  Ban,
  Trash2,
  ShieldCheck,
  XCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { User } from '@/lib/types'
import { UserAvatar } from './UserAvatar'

interface UserTableProps {
  users: User[]
  onViewUser: (userId: string) => void
  onSuspendUser: (userId: string, userName: string) => void
  onBanUser: (userId: string, userName: string) => void
  onActivateUser: (userId: string, userName: string) => void
  onDeleteUser: (userId: string, userName: string) => void
  getStatusColor: (status: string) => string
}

export function UserTable({
  users,
  onViewUser,
  onSuspendUser,
  onBanUser,
  onActivateUser,
  onDeleteUser,
  getStatusColor,
}: UserTableProps) {
  return (
    <div className='hidden md:block bg-white rounded-2xl border border-outline-variant/10 shadow-sm overflow-hidden'>
      <table className='w-full'>
        <thead>
          <tr className='border-b border-outline-variant/10 bg-surface-container-lowest'>
            <th className='text-left px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant'>
              User
            </th>
            <th className='text-left px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant'>
              Role
            </th>
            <th className='text-left px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant'>
              Verified
            </th>
            <th className='text-left px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant'>
              Status
            </th>
            <th className='text-left px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant'>
              Joined
            </th>
            <th className='text-right px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant'>
              Actions
            </th>
          </tr>
        </thead>
        <tbody className='divide-y divide-outline-variant/10'>
          {users.map((user: any) => (
            <tr
              key={user._id}
              className='hover:bg-surface-container-lowest transition-colors'
            >
              <td className='px-6 py-4'>
                <div className='flex items-center gap-3'>
                  <UserAvatar src={user.profilePicUrl} name={user.name} size="sm" />
                  <div className='min-w-0'>
                    <p className='text-sm font-bold text-on-surface truncate'>
                      {user.name}
                    </p>
                    <p className='text-[10px] text-on-surface-variant truncate'>
                      {user.email}
                    </p>
                  </div>
                </div>
              </td>
              <td className='px-6 py-4 text-xs font-bold capitalize'>
                {user.role}
              </td>
              <td className='px-6 py-4'>
                {user.role === 'student' ? (
                  user.isStudentVerified ? (
                    <span className='inline-flex items-center gap-1 px-2 py-1 bg-emerald-50 text-emerald-700 rounded-full text-[9px] font-bold border border-emerald-200'>
                      <ShieldCheck className='w-3 h-3' />
                      Verified
                    </span>
                  ) : (
                    <span className='inline-flex items-center gap-1 px-2 py-1 bg-gray-50 text-gray-600 rounded-full text-[9px] font-bold border border-gray-200'>
                      <XCircle className='w-3 h-3' />
                      Not Verified
                    </span>
                  )
                ) : (
                  <span className='text-[9px] text-on-surface-variant uppercase font-medium'>
                    N/A
                  </span>
                )}
              </td>
              <td className='px-6 py-4'>
                <span
                  className={`px-2 py-0.5 rounded-full text-[9px] uppercase tracking-tighter ${getStatusColor(user.status || 'active')}`}
                >
                  {user.status || 'Active'}
                </span>
              </td>
              <td className='px-6 py-4 text-xs text-on-surface-variant font-medium'>
                {format(new Date(user.createdAt), 'MMM dd, yyyy')}
              </td>
              <td className='px-6 py-4'>
                <div className='flex justify-end gap-1'>
                  <Button
                    variant='ghost'
                    size='icon'
                    className='h-8 w-8 text-blue-600'
                    onClick={() => onViewUser(user._id)}
                    title='View Details'
                  >
                    <Eye size={16} />
                  </Button>
                  {user.status === 'suspended' || user.status === 'banned' ? (
                    <Button
                      variant='ghost'
                      size='icon'
                      className='h-8 w-8 text-emerald-600'
                      onClick={() => onActivateUser(user._id, user.name)}
                      title='Activate Account'
                    >
                      <CheckCircle2 size={16} />
                    </Button>
                  ) : (
                    <>
                      <Button
                        variant='ghost'
                        size='icon'
                        className='h-8 w-8 text-orange-600'
                        onClick={() => onSuspendUser(user._id, user.name)}
                        title='Suspend Account'
                      >
                        <Pause size={16} />
                      </Button>
                      <Button
                        variant='ghost'
                        size='icon'
                        className='h-8 w-8 text-red-600'
                        onClick={() => onBanUser(user._id, user.name)}
                        title='Ban Account'
                      >
                        <Ban size={16} />
                      </Button>
                    </>
                  )}
                  <Button
                    variant='ghost'
                    size='icon'
                    className='h-8 w-8 text-error'
                    onClick={() => onDeleteUser(user._id, user.name)}
                    title='Delete Account'
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
