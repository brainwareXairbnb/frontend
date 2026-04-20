'use client'

import { useEffect, useState } from 'react'
import { adminApi } from '@/lib/api'
import { format } from 'date-fns'
import { toast } from 'sonner'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'

import {
  Mail,
  Phone,
  Calendar,
  Building2,
  CreditCard,
  Shield,
  CheckCircle2,
} from 'lucide-react'

interface Props {
  userId: string | null
  isOpen: boolean
  onClose: () => void
}

export function UserDetailModal({ userId, isOpen, onClose }: Props) {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (userId && isOpen) {
      fetchUser(userId)
    }
  }, [userId, isOpen])

  const fetchUser = async (id: string) => {
    setLoading(true)
    try {
      const res = await adminApi.getUserById(id)
      setUser(res.user)
    } catch (err: any) {
      toast.error('Failed to fetch user')
      onClose()
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyBank = async () => {
    try {
      const res = await adminApi.verifyUserBank(userId!)
      toast.success(res.message || 'Bank verified manually')
      if (user) {
        setUser({
          ...user,
          bankDetails: {
            ...user.bankDetails,
            isVerified: true
          }
        })
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to verify bank details')
    }
  }

  const roleColor = (role: string) => {
    if (role === 'admin') return 'secondary'
    if (role === 'owner') return 'default'
    return 'outline'
  }

  const statusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-700 border-green-200'
      case 'suspended':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'banned':
        return 'bg-red-100 text-red-700 border-red-200'
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className='
    w-full 
    max-w-lg 
    sm:max-w-xl 
    md:max-w-2xl 
    rounded-2xl 
    p-0 
    overflow-hidden
    max-h-[90vh]
    flex flex-col
  '
      >
        {/* Header */}
        <DialogHeader className='px-4 sm:px-6 pt-5 pb-2'>
          <DialogTitle className='text-base sm:text-lg font-semibold'>
            User Details
          </DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className='p-10 text-center text-sm text-muted-foreground'>
            Loading user...
          </div>
        ) : user ? (
          <div className='flex-1 overflow-y-auto px-4 sm:px-6 pb-5 sm:pb-6 space-y-4 sm:space-y-6'>
            <Card className='shadow-sm border-none bg-muted/30'>
              <CardContent className='p-4 sm:p-5 flex flex-col sm:flex-row gap-3 sm:gap-4'>
                <div className='flex justify-center sm:justify-start'>
                  <Avatar className='h-12 w-12 sm:h-14 sm:w-14'>
                    <AvatarFallback className='text-base sm:text-lg font-bold'>
                      {user.name?.[0]}
                    </AvatarFallback>
                  </Avatar>
                </div>

                <div className='flex-1 space-y-2 text-center sm:text-left'>
                  <div className='flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 justify-center sm:justify-start'>
                    <h2 className='text-lg sm:text-xl font-semibold'>
                      {user.name}
                    </h2>

                    <div className='flex gap-2 justify-center sm:justify-start'>
                      <Badge className='capitalize' variant={roleColor(user.role)}>{user.role}</Badge>
                      <Badge className={`capitalize ${statusColor(user.status)}`}>
                        {user.status || 'active'}
                      </Badge>
                    </div>
                  </div>

                  <div className='space-y-1 text-xs sm:text-sm text-muted-foreground'>
                    <div className='flex items-center justify-center sm:justify-start gap-2'>
                      <Mail className='w-4 h-4' />
                      {user.email}
                    </div>
                    <div className='flex items-center justify-center sm:justify-start gap-2'>
                      <Phone className='w-4 h-4' />
                      {user.phone || 'N/A'}
                    </div>
                    <div className='flex items-center justify-center sm:justify-start gap-2'>
                      <Calendar className='w-4 h-4' />
                      {format(new Date(user.createdAt), 'MMM dd, yyyy')}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* STUDENT */}
            {user.role === 'student' && (
              <Card>
                <CardContent className='p-4 sm:p-5 space-y-4'>
                  <h3 className='font-medium text-sm sm:text-base'>
                    Student Info
                  </h3>

                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4'>
                    <Info label='Student Email' value={user.studentEmail} />
                    <Info label='Roll No' value={user.universityRollNo} />
                    <Info label='Gender' value={user.gender} />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* OWNER */}
            {user.role === 'owner' && (
              <Card>
                <CardContent className='p-4 sm:p-5 space-y-5'>
                  <h3 className='font-medium flex items-center gap-2 text-sm sm:text-base'>
                    <Building2 className='w-4 h-4' />
                    Owner Info
                  </h3>

                  <Info label='Business Address' value={user.businessAddress} />
                  <Info label='NID' value={user.nidNo} />

                  {user.bankDetails && (
                    <>
                      <Separator />

                      <div>
                        <div className='flex items-center justify-between mb-3'>
                          <h4 className='text-sm font-medium flex items-center gap-2'>
                            <CreditCard className='w-4 h-4' />
                            Bank Details
                            <Badge variant='outline' className={`ml-2 text-[10px] ${user.bankDetails.isVerified ? 'bg-green-100 text-green-700 border-green-200' : 'bg-gray-100 text-gray-700 border-gray-200'}`}>
                              {user.bankDetails.isVerified ? 'Verified' : 'Pending'}
                            </Badge>
                          </h4>
                          {!user.bankDetails.isVerified && (
                            <Button
                              size='sm'
                              onClick={handleVerifyBank}
                              className='h-7 sm:h-8 px-3 text-[10px] sm:text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded transition-all flex items-center gap-1.5 shadow-sm hover:shadow active:scale-95'
                            >
                              <CheckCircle2 className='w-3 h-3 sm:w-3.5 sm:h-3.5' strokeWidth={2.5} />
                              Verify
                            </Button>
                          )}
                        </div>

                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4'>
                          <Info
                            label='Bank'
                            value={user.bankDetails.bankName}
                          />
                          <Info
                            label='Account No'
                            value={user.bankDetails.accountNumber}
                          />
                          <Info label='IFSC' value={user.bankDetails.ifsc} />
                          <Info
                            label='Holder'
                            value={user.bankDetails.accountHolderName}
                          />
                          {user.bankDetails.upiId && (
                            <Info
                              label='UPI ID'
                              value={user.bankDetails.upiId}
                            />
                          )}
                        </div>
                      </div>
                    </>
                  )}

                  {user.upgradeRequest && (
                    <>
                      <Separator />

                      <div>
                        <h4 className='text-sm font-medium flex items-center gap-2 mb-2'>
                          <Shield className='w-4 h-4' />
                          Upgrade Request
                        </h4>

                        <div className='flex justify-between items-center'>
                          <span className='text-sm'>Status</span>
                          <Badge>{user.upgradeRequest.status}</Badge>
                        </div>

                        <p className='text-xs text-muted-foreground mt-1'>
                          {format(
                            new Date(user.upgradeRequest.requestedAt),
                            'MMM dd, yyyy',
                          )}
                        </p>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            )}

            {/* META */}
            <Card>
              <CardContent className='p-4 sm:p-5 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4'>
                <Info
                  label='Email Verified'
                  value={user.isEmailVerified ? 'Yes' : 'No'}
                />
                {user.role === 'owner' && (
                  <Info
                    label='Approved'
                    value={user.isApproved ? 'Yes' : 'No'}
                  />
                )}
                <Info
                  label='Updated'
                  value={format(new Date(user.updatedAt), 'MMM dd')}
                />
                {user.lastLogin && (
                  <Info
                    label='Last Login'
                    value={format(new Date(user.lastLogin), 'MMM dd, hh:mm a')}
                  />
                )}
              </CardContent>
            </Card>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  )
}

function Info({ label, value }: any) {
  if (!value) return null

  return (
    <div className='space-y-0.5'>
      <p className='text-[11px] sm:text-xs text-muted-foreground'>{label}</p>
      <p className='text-sm font-medium break-words'>{value}</p>
    </div>
  )
}
