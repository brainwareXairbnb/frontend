'use client'

import { format } from 'date-fns'
import {
  CheckCircle2,
  XCircle,
  Phone,
  CreditCard,
  MapPin,
  Fingerprint,
  Loader2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { UserProfile } from '@/lib/types'

interface UpgradeRequestsListProps {
  upgradeRequests: UserProfile[]
  onApprove: (userId: string, userName: string) => void
  onReject: (userId: string, userName: string) => void
  actionLoading: string | null
}

export function UpgradeRequestsList({
  upgradeRequests,
  onApprove,
  onReject,
  actionLoading,
}: UpgradeRequestsListProps) {
  return (
    <div className='space-y-6'>
      {upgradeRequests.map((req, index) => (
        <div
          key={req._id || req.id || index}
          className='group overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg'
        >
          <div className='grid grid-cols-1 xl:grid-cols-[300px_1fr]'>
            {/* LEFT PANEL */}
            <div className='relative border-b border-zinc-100 bg-zinc-50 p-4 xl:border-b-0 xl:border-r'>
              {/* top user */}
              <div className='flex items-center gap-3'>
                <div className='flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-rose-500 text-sm font-bold text-white'>
                  {req.name?.charAt(0)}
                </div>

                <div className='min-w-0 flex-1'>
                  <h3 className='truncate text-sm font-semibold text-zinc-900'>
                    {req.name}
                  </h3>
                  <p className='truncate text-xs text-zinc-500'>{req.email}</p>
                </div>
              </div>

              {/* compact info */}
              <div className='mt-6 space-y-3'>
                <div className='flex items-center gap-3'>
                  <Phone className='h-4 w-4 text-sky-600 shrink-0' />
                  <span className='truncate text-sm font-medium text-zinc-700'>
                    {req.phone || 'N/A'}
                  </span>
                </div>

                <div className='flex items-center gap-3'>
                  <Fingerprint className='h-4 w-4 text-violet-600 shrink-0' />
                  <span className='truncate text-sm font-medium text-zinc-700'>
                    {req.nidNo || 'N/A'}
                  </span>
                </div>

                <div className='flex items-start gap-3'>
                  <MapPin className='h-4 w-4 text-amber-600 mt-0.5 shrink-0' />
                  <span className='text-sm text-zinc-700 line-clamp-2'>
                    {req.businessAddress || 'No address provided'}
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT PANEL */}
            <div className='flex flex-col p-5 md:p-6 justify-between'>
              <div>
                {/* header */}
                <div className='flex items-center gap-3 mb-6'>
                  <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 shrink-0'>
                    <CreditCard className='h-5 w-5 text-emerald-600' />
                  </div>
                  <div>
                    <h4 className='text-sm font-semibold text-zinc-900'>
                      Banking Info
                    </h4>
                    <p className='text-xs text-zinc-500'>Payout details</p>
                  </div>
                </div>

                {/* banking info inline */}
                <div className='grid grid-cols-2 gap-y-5 gap-x-4 sm:grid-cols-3 lg:grid-cols-5'>
                  <div className='space-y-1'>
                    <p className='text-[10px] uppercase font-medium text-zinc-400'>
                      Date
                    </p>
                    <p className='truncate text-xs font-semibold text-zinc-900'>
                      {req.upgradeRequest?.requestedAt
                        ? format(
                            new Date(req.upgradeRequest.requestedAt),
                            'MMM dd, yyyy',
                          )
                        : 'N/A'}
                    </p>
                  </div>
                  <div className='space-y-1'>
                    <p className='text-[10px] uppercase font-medium text-zinc-400'>
                      Bank
                    </p>
                    <p className='truncate text-xs font-semibold text-zinc-900'>
                      {req.bankDetails?.bankName || 'N/A'}
                    </p>
                  </div>
                  <div className='space-y-1'>
                    <p className='text-[10px] uppercase font-medium text-zinc-400'>
                      IFSC
                    </p>
                    <p className='truncate text-xs font-semibold text-zinc-900 uppercase'>
                      {req.bankDetails?.ifsc || 'N/A'}
                    </p>
                  </div>
                  <div className='space-y-1'>
                    <p className='text-[10px] uppercase font-medium text-zinc-400'>
                      Holder
                    </p>
                    <p className='truncate text-xs font-semibold text-zinc-900'>
                      {req.bankDetails?.accountHolderName || 'N/A'}
                    </p>
                  </div>
                  <div className='space-y-1'>
                    <p className='text-[10px] uppercase font-medium text-zinc-400'>
                      UPI
                    </p>
                    <p className='truncate text-xs font-semibold text-zinc-900'>
                      {req.bankDetails?.upiId || 'N/A'}
                    </p>
                  </div>
                </div>
              </div>

              {/* actions */}
              <div className='mt-8 flex flex-col sm:flex-row gap-3'>
                <Button
                  variant='default'
                  onClick={() => onApprove(req._id || req.id || '', req.name)}
                  disabled={actionLoading === (req._id || req.id || '')}
                >
                  {actionLoading === (req._id || req.id || '') ? (
                    <Loader2 className='h-4 w-4 animate-spin' />
                  ) : (
                    <CheckCircle2 className='h-4 w-4' />
                  )}
                  Approve Request
                </Button>

                <Button
                  variant='outline'
                  onClick={() => onReject(req._id || req.id || '', req.name)}
                  disabled={actionLoading === (req._id || req.id || '')}
                  className='w-full sm:w-auto'
                >
                  <XCircle className='h-4 w-4' />
                  Reject
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
