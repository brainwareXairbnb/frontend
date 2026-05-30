'use client'

import { useState, useEffect } from 'react'
import {
  Wallet,
  AlertCircle,
  Search,
  CheckCircle2,
  Clock,
  PauseCircle,
  Ban,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Loader2,
  RefreshCcw,
  Info,
  Copy,
  User,
} from 'lucide-react'
import { adminApi } from '@/lib/api'
import { toast } from 'sonner'
import { format } from 'date-fns'
import { ConfirmationModal } from '@/components/ConfirmationModal'

export default function AdminPayoutsPage() {
  const [loading, setLoading] = useState(true)
  const [payouts, setPayouts] = useState<any[]>([])
  const [stats, setStats] = useState({
    totalPendingAmount: 0,
    pendingCount: 0,
    failedPayouts: 0,
  })
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 1,
  })
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean
    transactionId: string | null
    status: string
    title: string
    message: string
  }>({
    isOpen: false,
    transactionId: null,
    status: '',
    title: '',
    message: '',
  })

  useEffect(() => {
    fetchPayouts()
  }, [pagination.page, statusFilter])

  const fetchPayouts = async () => {
    try {
      setLoading(true)
      const response = await adminApi.getPayouts({
        page: pagination.page,
        limit: pagination.limit,
        status: statusFilter,
        search: searchQuery,
      })
      setPayouts(response.transactions)
      setStats(response.stats)
      setPagination(response.pagination)
    } catch (error: any) {
      toast.error('Failed to load payouts', { description: error.message })
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setPagination({ ...pagination, page: 1 })
    fetchPayouts()
  }

  const handleStatusUpdate = async (
    transactionId: string,
    status: string,
    title: string,
    message: string,
  ) => {
    setModalConfig({
      isOpen: true,
      transactionId,
      status,
      title,
      message,
    })
  }

  const confirmStatusUpdate = async (reason?: string) => {
    if (!modalConfig.transactionId) return

    try {
      setActionLoading(modalConfig.transactionId)
      await adminApi.updatePayoutStatus(
        modalConfig.transactionId,
        modalConfig.status,
        reason,
      )
      toast.success('Payout Status Updated')
      fetchPayouts()
      setModalConfig({ ...modalConfig, isOpen: false })
    } catch (error: any) {
      toast.error('Update Failed', { description: error.message })
    } finally {
      setActionLoading(null)
    }
  }

  const handleVerifyBank = async (userId: string) => {
    try {
      setActionLoading(userId)
      await adminApi.verifyUserBank(userId)
      toast.success('Bank Account Verified')
      fetchPayouts()
    } catch (error: any) {
      toast.error('Verification Failed', { description: error.message })
    } finally {
      setActionLoading(null)
    }
  }

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'settled':
        return {
          label: 'Paid',
          color: 'text-green-700',
          bg: 'bg-green-50',
          border: 'border-green-200',
          icon: CheckCircle2,
        }
      case 'processing':
        return {
          label: 'Processing',
          color: 'text-blue-700',
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          icon: Clock,
        }
      case 'on_hold':
        return {
          label: 'On Hold',
          color: 'text-orange-700',
          bg: 'bg-orange-50',
          border: 'border-orange-200',
          icon: PauseCircle,
        }
      case 'failed':
        return {
          label: 'Failed',
          color: 'text-red-700',
          bg: 'bg-red-50',
          border: 'border-red-200',
          icon: Ban,
        }
      case 'pending':
      default:
        return {
          label: 'Pending',
          color: 'text-gray-700',
          bg: 'bg-gray-50',
          border: 'border-gray-200',
          icon: Clock,
        }
    }
  }

  if (loading && pagination.page === 1) {
    return (
      <div className='flex items-center justify-center min-h-[60vh]'>
        <Loader2 className='w-8 h-8 animate-spin text-primary' />
      </div>
    )
  }

  return (
    <div className='px-4 sm:px-6 lg:px-8 py-6 pb-20 bg-gray-50 min-h-screen'>
      <ConfirmationModal
        isOpen={modalConfig.isOpen}
        onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
        onConfirm={confirmStatusUpdate}
        title={modalConfig.title}
        message={modalConfig.message}
        type={modalConfig.status === 'settled' ? 'success' : 'warning'}
        confirmText='Confirm'
        requiresInput={
          modalConfig.status === 'on_hold' || modalConfig.status === 'failed'
        }
        inputPlaceholder='Reason for status change...'
      />

      {/* Header Section */}
      <header className='mb-8'>
        <div className='flex items-center justify-between mb-4'>
          <div className='flex-1'>
            <h1 className='text-2xl sm:text-3xl font-bold text-gray-900 mb-2'>
              Owner Settlements
            </h1>
            <p className='text-sm text-gray-600'>
              Manage payouts to property partners and verify bank credentials
            </p>
          </div>
          <button
            onClick={fetchPayouts}
            disabled={loading}
            className='h-10 px-4 sm:px-6 bg-gray-900 text-white rounded-lg text-sm font-semibold hover:bg-gray-800 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shrink-0'
          >
            {loading ? (
              <Loader2 className='w-4 h-4 animate-spin' />
            ) : (
              <RefreshCcw className='w-4 h-4' />
            )}
            <span className='hidden sm:inline'>Refresh</span>
          </button>
        </div>
      </header>

      {/* Stats Cards */}
      <section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6'>
        <div className='bg-white p-4 sm:p-6 rounded border border-gray-200 shadow-sm hover:shadow-md transition-shadow'>
          <div className='flex items-center justify-between mb-4'>
            <div className='w-12 h-12 rounded-lg bg-orange-50 flex items-center justify-center shrink-0'>
              <Wallet className='w-6 h-6 text-orange-600' />
            </div>
            <div className='w-2 h-2 rounded-full bg-orange-500 animate-pulse' />
          </div>
          <p className='text-xs font-medium text-gray-500 uppercase mb-1'>
            Awaiting Settlement
          </p>
          <h3 className='text-2xl sm:text-3xl font-bold text-gray-900 mb-1'>
            ₹{stats.totalPendingAmount.toLocaleString('en-IN')}
          </h3>
          <p className='text-xs text-gray-500'>
            {stats.pendingCount} owners in queue
          </p>
        </div>

        <div className='bg-white p-4 sm:p-6 rounded border border-gray-200 shadow-sm hover:shadow-md transition-shadow'>
          <div className='flex items-center justify-between mb-4'>
            <div className='w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center shrink-0'>
              <ShieldCheck className='w-6 h-6 text-green-600' />
            </div>
            <div className='flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-md'>
              <CheckCircle2 className='w-3 h-3' />
              <span>Ready</span>
            </div>
          </div>
          <p className='text-xs font-medium text-gray-500 uppercase mb-1'>
            Verified Accounts
          </p>
          <h3 className='text-2xl sm:text-3xl font-bold text-green-600 mb-1'>
            {payouts.filter((p) => p.owner?.bankDetails?.isVerified).length}
          </h3>
          <p className='text-xs text-gray-500'>Ready for transfer</p>
        </div>

        <div className='bg-gray-900 p-4 sm:p-6 rounded shadow-sm sm:col-span-2 lg:col-span-1'>
          <div className='flex items-center justify-between mb-4'>
            <div className='w-12 h-12 rounded-lg bg-red-500 flex items-center justify-center shrink-0'>
              <AlertCircle className='w-6 h-6 text-white' />
            </div>
          </div>
          <p className='text-xs font-medium text-gray-400 uppercase mb-1'>
            Manual Review Required
          </p>
          <h3 className='text-2xl sm:text-3xl font-bold text-white mb-1'>
            {stats.failedPayouts}
          </h3>
          <p className='text-xs text-gray-400'>Failed transactions</p>
        </div>
      </section>

      {/* Search and Filters */}
      <div className='mb-6 flex flex-col gap-3'>
        <form onSubmit={handleSearch} className='flex-1 relative'>
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
          <input
            type='text'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder='Search owners by name or email...'
            className='w-full h-11 bg-white border border-gray-300 rounded-lg pl-10 pr-4 text-sm text-gray-900 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition-all placeholder:text-gray-400'
          />
        </form>
        <div className='flex gap-2 overflow-x-auto pb-2 scrollbar-hide'>
          {['', 'pending', 'processing', 'settled', 'failed', 'on_hold'].map(
            (status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`h-9 px-4 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                  statusFilter === status
                    ? 'bg-gray-900 text-white shadow-sm'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {status === '' ? 'All' : getStatusConfig(status).label}
              </button>
            ),
          )}
        </div>
      </div>

      {/* Payouts List - Mobile Cards */}
      <section className='space-y-4 lg:hidden'>
        {payouts.length === 0 ? (
          <div className='bg-white rounded border border-gray-200 p-12 text-center'>
            <Info className='w-12 h-12 text-gray-300 mx-auto mb-3' />
            <p className='text-sm text-gray-500'>No payouts found</p>
          </div>
        ) : (
          payouts.map((payout) => {
            const status = getStatusConfig(payout.payoutStatus)
            const StatusIcon = status.icon
            return (
              <div
                key={payout._id}
                className='bg-white rounded border border-gray-200 shadow-sm overflow-hidden'
              >
                <div className='p-4'>
                  {/* Owner Info */}
                  <div className='flex items-center gap-3 mb-4 pb-4 border-b border-gray-100'>
                    <div className='w-12 h-12 rounded-lg overflow-hidden bg-gray-200 shrink-0'>
                      {payout.owner?.avatar ? (
                        <img
                          alt={payout.owner?.name}
                          className='w-full h-full object-cover'
                          src={payout.owner.avatar}
                        />
                      ) : (
                        <div className='w-full h-full flex items-center justify-center'>
                          <User className='w-6 h-6 text-gray-400' />
                        </div>
                      )}
                    </div>
                    <div className='flex-1 min-w-0'>
                      <p className='text-sm font-semibold text-gray-900 truncate'>
                        {payout.owner?.name || 'Unknown'}
                      </p>
                      <p className='text-xs text-gray-500 truncate'>
                        {payout.owner?.email || 'N/A'}
                      </p>
                    </div>
                    <div
                      className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold ${status.bg} ${status.color} border ${status.border}`}
                    >
                      <StatusIcon className='w-3 h-3' />
                      <span>{status.label}</span>
                    </div>
                  </div>

                  {/* Amount & Date */}
                  <div className='grid grid-cols-2 gap-4 mb-4'>
                    <div>
                      <p className='text-xs text-gray-500 mb-1'>Net Amount</p>
                      <p className='text-lg font-bold text-gray-900'>
                        ₹{payout.ownerNetPayout.toLocaleString('en-IN')}
                      </p>
                    </div>
                    <div>
                      <p className='text-xs text-gray-500 mb-1'>Date</p>
                      <p className='text-sm font-semibold text-gray-900'>
                        {format(new Date(payout.createdAt), 'MMM dd, yyyy')}
                      </p>
                    </div>
                  </div>

                  {/* Bank Details */}
                  {!payout.owner?.bankDetails?.accountNumber ? (
                    <div className='flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold bg-red-50 text-red-700 border border-red-200 mb-4'>
                      <AlertCircle className='w-4 h-4' />
                      <span>Bank details missing</span>
                    </div>
                  ) : (
                    <div className='bg-gray-50 rounded-lg p-3 mb-4'>
                      <div className='flex items-center justify-between mb-2'>
                        <span className='text-xs font-medium text-gray-500'>
                          Bank Account
                        </span>
                        <div
                          className={`flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold ${
                            payout.owner?.bankDetails?.isVerified
                              ? 'bg-green-50 text-green-700 border border-green-200'
                              : 'bg-orange-50 text-orange-700 border border-orange-200'
                          }`}
                        >
                          {payout.owner?.bankDetails?.isVerified ? (
                            <>
                              <ShieldCheck className='w-3 h-3' />
                              <span>Verified</span>
                            </>
                          ) : (
                            <>
                              <Clock className='w-3 h-3' />
                              <span>Pending</span>
                            </>
                          )}
                        </div>
                      </div>
                      <p className='text-sm font-semibold text-gray-900 mb-1'>
                        {payout.owner.bankDetails.bankName || 'Standard Bank'}
                      </p>
                      <p className='text-xs text-gray-600 mb-2'>
                        {payout.owner.bankDetails.accountHolderName ||
                          payout.owner.name}
                      </p>
                      <div className='flex items-center justify-between text-xs'>
                        <div>
                          <p className='text-gray-500 mb-0.5'>Account No.</p>
                          <p className='font-semibold text-gray-900'>
                            {payout.owner.bankDetails.accountNumber}
                          </p>
                        </div>
                        <div className='text-right'>
                          <p className='text-gray-500 mb-0.5'>IFSC</p>
                          <p className='font-semibold text-gray-900'>
                            {payout.owner.bankDetails.ifsc ||
                              payout.owner.bankDetails.ifscCode ||
                              'N/A'}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className='flex gap-2'>
                    {payout.payoutStatus === 'pending' && (
                      <button
                        onClick={() =>
                          handleStatusUpdate(
                            payout._id,
                            'processing',
                            'Mark as Processing',
                            'Update payout status to processing?',
                          )
                        }
                        disabled={actionLoading === payout._id}
                        className='flex-1 h-10 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary/90 active:scale-95 transition-all disabled:opacity-50'
                      >
                        {actionLoading === payout._id ? (
                          <Loader2 className='w-4 h-4 animate-spin mx-auto' />
                        ) : (
                          'Process'
                        )}
                      </button>
                    )}
                    {payout.payoutStatus === 'processing' && (
                      <button
                        onClick={() =>
                          handleStatusUpdate(
                            payout._id,
                            'settled',
                            'Mark as Paid',
                            'Confirm that the payout has been successfully transferred.',
                          )
                        }
                        disabled={actionLoading === payout._id}
                        className='flex-1 h-10 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700 active:scale-95 transition-all disabled:opacity-50'
                      >
                        {actionLoading === payout._id ? (
                          <Loader2 className='w-4 h-4 animate-spin mx-auto' />
                        ) : (
                          'Complete'
                        )}
                      </button>
                    )}
                    {!payout.owner?.bankDetails?.isVerified &&
                      payout.owner?.bankDetails?.accountNumber && (
                        <button
                          onClick={() => handleVerifyBank(payout.owner?._id)}
                          disabled={actionLoading === payout.owner?._id}
                          className='h-10 px-4 bg-gray-900 text-white rounded-lg text-sm font-semibold hover:bg-gray-800 active:scale-95 transition-all disabled:opacity-50 flex items-center gap-2'
                        >
                          {actionLoading === payout.owner?._id ? (
                            <Loader2 className='w-4 h-4 animate-spin' />
                          ) : (
                            <>
                              <ShieldCheck className='w-4 h-4' />
                              <span>Verify</span>
                            </>
                          )}
                        </button>
                      )}
                  </div>
                </div>
              </div>
            )
          })
        )}
      </section>

      {/* Payouts Table - Desktop */}
      <section className='hidden lg:block bg-white rounded border border-gray-200 shadow-sm overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full border-collapse'>
            <thead>
              <tr className='bg-gray-50 border-b border-gray-200'>
                <th className='text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase'>
                  Owner
                </th>
                <th className='text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase'>
                  Bank Account
                </th>
                <th className='text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase'>
                  Amount
                </th>
                <th className='text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase'>
                  Date
                </th>
                <th className='text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase'>
                  Status
                </th>
                <th className='text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-100'>
              {payouts.length === 0 ? (
                <tr>
                  <td colSpan={6} className='px-6 py-12 text-center'>
                    <Info className='w-12 h-12 text-gray-300 mx-auto mb-3' />
                    <p className='text-sm text-gray-500'>No payouts found</p>
                  </td>
                </tr>
              ) : (
                payouts.map((payout) => {
                  const status = getStatusConfig(payout.payoutStatus)
                  const StatusIcon = status.icon
                  return (
                    <tr
                      key={payout._id}
                      className='hover:bg-gray-50 transition-colors'
                    >
                      <td className='px-6 py-4'>
                        <div className='flex items-center gap-3'>
                          <div className='w-10 h-10 rounded-lg overflow-hidden bg-gray-200 shrink-0'>
                            {payout.owner?.avatar ? (
                              <img
                                alt={payout.owner?.name}
                                className='w-full h-full object-cover'
                                src={payout.owner.avatar}
                              />
                            ) : (
                              <div className='w-full h-full flex items-center justify-center'>
                                <User className='w-5 h-5 text-gray-400' />
                              </div>
                            )}
                          </div>
                          <div className='min-w-0'>
                            <p className='text-sm font-semibold text-gray-900 truncate'>
                              {payout.owner?.name || 'Unknown'}
                            </p>
                            <p className='text-xs text-gray-500 truncate'>
                              {payout.owner?.email || 'N/A'}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className='px-6 py-4'>
                        {!payout.owner?.bankDetails?.accountNumber ? (
                          <div className='flex items-center gap-2 text-xs font-semibold text-red-600'>
                            <AlertCircle className='w-4 h-4' />
                            <span>Missing</span>
                          </div>
                        ) : (
                          <div className='space-y-2'>
                            <div
                              className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold ${
                                payout.owner?.bankDetails?.isVerified
                                  ? 'bg-green-50 text-green-700 border border-green-200'
                                  : 'bg-orange-50 text-orange-700 border border-orange-200'
                              }`}
                            >
                              {payout.owner?.bankDetails?.isVerified ? (
                                <>
                                  <ShieldCheck className='w-3 h-3' />
                                  <span>Verified</span>
                                </>
                              ) : (
                                <>
                                  <Clock className='w-3 h-3' />
                                  <span>Pending</span>
                                </>
                              )}
                            </div>
                            <div className='text-xs text-gray-600'>
                              <p className='font-semibold text-gray-900'>
                                {payout.owner.bankDetails.accountNumber}
                              </p>
                              <p>
                                {payout.owner.bankDetails.ifsc ||
                                  payout.owner.bankDetails.ifscCode ||
                                  'N/A'}
                              </p>
                            </div>
                          </div>
                        )}
                      </td>
                      <td className='px-6 py-4'>
                        <p className='text-lg font-bold text-gray-900'>
                          ₹{payout.ownerNetPayout.toLocaleString('en-IN')}
                        </p>
                        <p className='text-xs text-gray-500'>
                          ID: {payout._id.substring(18).toUpperCase()}
                        </p>
                      </td>
                      <td className='px-6 py-4'>
                        <p className='text-sm font-semibold text-gray-900'>
                          {format(new Date(payout.createdAt), 'MMM dd, yyyy')}
                        </p>
                        <p className='text-xs text-gray-500'>
                          {format(new Date(payout.createdAt), 'hh:mm a')}
                        </p>
                      </td>
                      <td className='px-6 py-4'>
                        <div
                          className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-semibold ${status.bg} ${status.color} border ${status.border}`}
                        >
                          <StatusIcon className='w-4 h-4' />
                          {status.label}
                        </div>
                      </td>
                      <td className='px-6 py-4'>
                        <div className='flex items-center justify-end gap-2 flex-wrap'>
                          {payout.payoutStatus === 'pending' && (
                            <>
                              <button
                                onClick={() =>
                                  handleStatusUpdate(
                                    payout._id,
                                    'processing',
                                    'Mark as Processing',
                                    'Update payout status to processing?',
                                  )
                                }
                                disabled={actionLoading === payout._id}
                                className='h-9 px-3 bg-primary text-white rounded-lg text-xs font-semibold hover:bg-primary/90 transition-all disabled:opacity-50 whitespace-nowrap'
                              >
                                Process
                              </button>
                              {!payout.owner?.bankDetails?.isVerified &&
                                payout.owner?.bankDetails?.accountNumber && (
                                  <button
                                    onClick={() =>
                                      handleVerifyBank(payout.owner?._id)
                                    }
                                    disabled={
                                      actionLoading === payout.owner?._id
                                    }
                                    className='h-9 px-3 bg-gray-900 text-white rounded-lg text-xs font-semibold hover:bg-gray-800 transition-all disabled:opacity-50 whitespace-nowrap'
                                  >
                                    Verify
                                  </button>
                                )}
                              <button
                                onClick={() =>
                                  handleStatusUpdate(
                                    payout._id,
                                    'on_hold',
                                    'Put on Hold',
                                    'Put this payout on hold? Provide a reason.',
                                  )
                                }
                                disabled={actionLoading === payout._id}
                                className='h-9 px-3 bg-orange-600 text-white rounded-lg text-xs font-semibold hover:bg-orange-700 transition-all disabled:opacity-50 whitespace-nowrap'
                              >
                                Hold
                              </button>
                            </>
                          )}
                          {payout.payoutStatus === 'processing' && (
                            <>
                              <button
                                onClick={() =>
                                  handleStatusUpdate(
                                    payout._id,
                                    'settled',
                                    'Mark as Paid',
                                    'Confirm that the payout has been transferred.',
                                  )
                                }
                                disabled={actionLoading === payout._id}
                                className='h-9 px-3 bg-green-600 text-white rounded-lg text-xs font-semibold hover:bg-green-700 transition-all disabled:opacity-50 whitespace-nowrap'
                              >
                                Complete
                              </button>
                              {!payout.owner?.bankDetails?.isVerified &&
                                payout.owner?.bankDetails?.accountNumber && (
                                  <button
                                    onClick={() =>
                                      handleVerifyBank(payout.owner?._id)
                                    }
                                    disabled={
                                      actionLoading === payout.owner?._id
                                    }
                                    className='h-9 px-3 bg-gray-900 text-white rounded-lg text-xs font-semibold hover:bg-gray-800 transition-all disabled:opacity-50 whitespace-nowrap'
                                  >
                                    Verify
                                  </button>
                                )}
                              <button
                                onClick={() =>
                                  handleStatusUpdate(
                                    payout._id,
                                    'failed',
                                    'Mark as Failed',
                                    'Mark as failed? Provide a reason.',
                                  )
                                }
                                disabled={actionLoading === payout._id}
                                className='h-9 px-3 bg-red-600 text-white rounded-lg text-xs font-semibold hover:bg-red-700 transition-all disabled:opacity-50 whitespace-nowrap'
                              >
                                Fail
                              </button>
                            </>
                          )}
                          {(payout.payoutStatus === 'settled' ||
                            payout.payoutStatus === 'on_hold' ||
                            payout.payoutStatus === 'failed') && (
                            <span className='text-xs text-gray-500'>
                              No actions available
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination.total > 0 && (
          <div className='px-6 py-4 border-t border-gray-200 bg-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4'>
            <p className='text-sm text-gray-600'>
              Showing{' '}
              <span className='font-semibold text-gray-900'>
                {(pagination.page - 1) * pagination.limit + 1}-
                {Math.min(pagination.page * pagination.limit, pagination.total)}
              </span>{' '}
              of{' '}
              <span className='font-semibold text-gray-900'>
                {pagination.total}
              </span>
            </p>
            <div className='flex gap-1'>
              <button
                disabled={pagination.page === 1}
                onClick={() =>
                  setPagination({ ...pagination, page: pagination.page - 1 })
                }
                className='w-9 h-9 flex items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed'
              >
                <ChevronLeft className='w-4 h-4' />
              </button>
              {Array.from({ length: Math.min(5, pagination.pages) }, (_, i) => {
                const pageNum = i + 1
                return (
                  <button
                    key={pageNum}
                    onClick={() =>
                      setPagination({ ...pagination, page: pageNum })
                    }
                    className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-semibold transition-all ${
                      pagination.page === pageNum
                        ? 'bg-gray-900 text-white'
                        : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                )
              })}
              <button
                disabled={pagination.page === pagination.pages}
                onClick={() =>
                  setPagination({ ...pagination, page: pagination.page + 1 })
                }
                className='w-9 h-9 flex items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed'
              >
                <ChevronRight className='w-4 h-4' />
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Mobile Pagination */}
      {pagination.total > 0 && (
        <div className='lg:hidden mt-6 flex flex-col sm:flex-row items-center justify-between gap-4'>
          <p className='text-sm text-gray-600'>
            Page {pagination.page} of {pagination.pages}
          </p>
          <div className='flex gap-1'>
            <button
              disabled={pagination.page === 1}
              onClick={() =>
                setPagination({ ...pagination, page: pagination.page - 1 })
              }
              className='w-9 h-9 flex items-center justify-center rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed'
            >
              <ChevronLeft className='w-4 h-4' />
            </button>
            <button
              disabled={pagination.page === pagination.pages}
              onClick={() =>
                setPagination({ ...pagination, page: pagination.page + 1 })
              }
              className='w-9 h-9 flex items-center justify-center rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed'
            >
              <ChevronRight className='w-4 h-4' />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
