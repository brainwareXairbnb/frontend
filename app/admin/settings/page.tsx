'use client'

import { useState, useEffect } from 'react'
import {
  RefreshCcw,
  Gavel,
  ShieldCheck,
  Info,
  History,
  Download,
  AlertCircle,
  CheckCircle2,
  Clock,
  Loader2,
} from 'lucide-react'
import { adminApi } from '@/lib/api'
import { useAuth } from '@/lib/auth-context'
import { toast } from 'sonner'
import { format } from 'date-fns'
import { ConfirmationModal } from '@/components/ConfirmationModal'
import { AdminSettingsSkeleton } from '@/components/skeletons/AdminSettingsSkeleton'

export default function AdminSettingsPage() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [serviceRate, setServiceRate] = useState('0')
  const [history, setHistory] = useState<any[]>([])

  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    reason: '',
  })

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      setLoading(true)
      const response = await adminApi.getServiceCharge()
      setServiceRate((response.currentRate * 100).toString())
      setHistory(response.history || [])
    } catch (error: any) {
      toast.error('Failed to load settings', { description: error.message })
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateClick = () => {
    const rateNum = parseFloat(serviceRate)
    if (isNaN(rateNum) || rateNum < 0 || rateNum > 100) {
      toast.error('Invalid Rate', {
        description: 'Rate must be between 0 and 100',
      })
      return
    }
    setModalConfig({ isOpen: true, reason: '' })
  }

  const handleCommit = async (reason?: string) => {
    try {
      setSaving(true)
      const rateNum = parseFloat(serviceRate) / 100
      await adminApi.updateServiceCharge(rateNum, reason || '')
      toast.success('Configuration Propagated', {
        description: `Global service rate updated to ${serviceRate}%`,
      })
      await fetchSettings()
      setModalConfig({ isOpen: false, reason: '' })
    } catch (error: any) {
      toast.error('Propagation Failed', { description: error.message })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <AdminSettingsSkeleton />
  }

  return (
    <div className='px-4 sm:px-6 lg:px-8 pt-4 pb-24 bg-gray-50 min-h-screen'>
      <ConfirmationModal
        isOpen={modalConfig.isOpen}
        onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
        onConfirm={handleCommit}
        title='Update Service Fee'
        message={`Update the service fee to ${serviceRate}% for all future bookings?`}
        type='warning'
        confirmText='Update Rate'
        requiresInput={true}
        inputPlaceholder='Reason for change...'
        inputLabel='Reason'
      />

      {/* Header Section */}
      <header className='mb-4 md:mb-8'>
        <h1 className='text-2xl sm:text-3xl font-bold text-gray-900 mb-1 md:mb-2'>
          Platform Settings
        </h1>
        <p className='text-sm text-gray-600 hidden sm:block'>
          Manage your service fees and financial configurations here.
        </p>
      </header>

      {/* Main Settings Card */}
      <section className='grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6'>
        {/* Service Rate Configuration */}
        <div className='lg:col-span-2 bg-white p-4 sm:p-6 rounded border border-gray-200 shadow-sm'>
          <div className='mb-6'>
            <div className='inline-flex items-center gap-2 px-2 py-1 bg-primary/10 text-primary rounded-md text-xs font-semibold mb-3'>
              <div className='w-1.5 h-1.5 bg-primary rounded-full animate-pulse' />
              Live Settings
            </div>
            <h2 className='text-lg font-bold text-gray-900 mb-1'>
              Service Fee
            </h2>
            <p className='text-xs text-gray-500'>
              Percentage deducted from bookings as a platform fee. Applied to
              all new payments.
            </p>
          </div>

          <div className='mb-6'>
            <label className='block text-xs font-medium text-gray-500  mb-3'>
              Current Service Rate (%)
            </label>
            <div className='relative group max-w-md'>
              <input
                type='number'
                value={serviceRate}
                onChange={(e) => setServiceRate(e.target.value)}
                className='w-full text-4xl sm:text-5xl font-bold text-primary bg-gray-50 rounded-lg px-6 py-6 focus:outline-none focus:ring-2 focus:ring-primary/20 border border-gray-200 group-hover:border-primary/30 transition-all font-mono'
                step='0.01'
                min='0'
                max='100'
              />
              <span className='absolute right-6 top-1/2 -translate-y-1/2 text-3xl sm:text-4xl font-bold text-gray-300 group-focus-within:text-primary/30 transition-colors'>
                %
              </span>
            </div>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6'>
            <div className='p-4 bg-emerald-50 rounded-lg border border-emerald-200 flex items-center gap-3'>
              <div className='w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center shrink-0'>
                <CheckCircle2 className='w-5 h-5 text-white' />
              </div>
              <div>
                <p className='text-xs font-medium text-emerald-700/60 '>
                  Status
                </p>
                <p className='text-sm font-bold text-emerald-700'>Active</p>
              </div>
            </div>
            <div className='p-4 bg-blue-50 rounded-lg border border-blue-200 flex items-center gap-3'>
              <div className='w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center shrink-0'>
                <History className='w-5 h-5 text-white' />
              </div>
              <div>
                <p className='text-xs font-medium text-blue-700/60 '>
                  Last Modified
                </p>
                <p className='text-sm font-bold text-blue-700'>
                  {history[0]
                    ? format(new Date(history[0].createdAt), 'dd MMM yyyy')
                    : 'No records'}
                </p>
              </div>
            </div>
          </div>

          <button
            disabled={saving}
            onClick={handleUpdateClick}
            className='w-full sm:max-w-md h-11 bg-gray-900 text-white rounded-lg text-sm font-semibold hover:bg-gray-800 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
          >
            {saving ? (
              <Loader2 className='w-4 h-4 animate-spin' />
            ) : (
              <RefreshCcw className='w-4 h-4' />
            )}
            Update Rate
          </button>
        </div>

        {/* Change History */}
        <div className='lg:col-span-1 bg-white p-4 sm:p-6 rounded border border-gray-200 shadow-sm'>
          <div className='mb-6 flex items-center justify-between'>
            <div>
              <h3 className='text-lg font-bold text-gray-900 mb-1'>
                Change History
              </h3>
              <p className='text-xs text-gray-500'>
                Historical fee adjustments
              </p>
            </div>
            <button className='w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-50 transition-all'>
              <Download className='w-4 h-4 text-gray-600' />
            </button>
          </div>

          <div className='space-y-4 max-h-[400px] overflow-y-auto pr-2'>
            {history.length === 0 ? (
              <div className='text-center py-12'>
                <Info className='w-12 h-12 text-gray-300 mx-auto mb-3' />
                <p className='text-xs text-gray-400'>No history found</p>
              </div>
            ) : (
              history.map((change, index) => (
                <div
                  key={change._id}
                  className='relative pl-6 before:absolute before:left-0 before:top-1.5 before:bottom-0 before:w-0.5 before:bg-gray-200 last:before:hidden group'
                >
                  <div className='absolute left-[-4px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-white bg-gray-300 group-hover:bg-primary group-hover:scale-125 transition-all' />
                  <div className='flex items-start justify-between mb-2'>
                    <div className='flex-1'>
                      <p className='text-xl font-bold text-primary mb-1'>
                        {(change.rate * 100).toFixed(2)}%
                      </p>
                      <p className='text-xs font-medium text-gray-500 mb-1'>
                        By:{' '}
                        <span className='text-gray-900'>
                          {change.updatedBy?.name || 'Admin'}
                        </span>
                      </p>
                      <div className='flex items-center gap-1 text-gray-400'>
                        <Clock className='w-3 h-3' />
                        <p className='text-xs'>
                          {format(new Date(change.createdAt), 'MMM dd, HH:mm')}
                        </p>
                      </div>
                    </div>
                    {index === 0 && (
                      <span className='px-2 py-0.5 bg-primary/10 text-primary border border-primary/20 rounded text-xs font-semibold'>
                        Current
                      </span>
                    )}
                  </div>
                  {change.reason && (
                    <p className='text-xs text-gray-600 italic mt-2 leading-relaxed border-l-2 border-gray-200 pl-3 py-1 bg-gray-50 rounded-r-lg'>
                      "{change.reason}"
                    </p>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Info Cards */}
      <section className='grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6'>
        <div className='bg-white p-4 sm:p-6 rounded border border-gray-200 shadow-sm hover:shadow-md transition-shadow group'>
          <div className='flex items-start gap-4'>
            <div className='w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center shrink-0 border border-red-100 group-hover:bg-red-500 transition-all'>
              <Gavel className='text-red-600 w-6 h-6 group-hover:text-white transition-all' />
            </div>
            <div className='flex-1'>
              <h3 className='text-base font-bold text-gray-900 mb-1 group-hover:text-red-600 transition-colors'>
                Audit Trail
              </h3>
              <p className='text-xs text-gray-600 leading-relaxed mb-3'>
                All changes to financial settings are tracked. Updates apply to
                all new transactions immediately.
              </p>
              <div className='inline-flex items-center gap-2 px-2 py-1 bg-gray-100 rounded-lg text-xs font-semibold text-gray-700'>
                <ShieldCheck className='w-3 h-3' />
                Logging Active
              </div>
            </div>
          </div>
        </div>

        <div className='bg-white p-4 sm:p-6 rounded border border-gray-200 shadow-sm hover:shadow-md transition-shadow group'>
          <div className='flex items-start gap-4'>
            <div className='w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center shrink-0 border border-emerald-100 group-hover:bg-emerald-500 transition-all'>
              <ShieldCheck className='text-emerald-600 w-6 h-6 group-hover:text-white transition-all' />
            </div>
            <div className='flex-1'>
              <h3 className='text-base font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors'>
                Secure Access
              </h3>
              <p className='text-xs text-gray-600 leading-relaxed mb-3'>
                Only verified administrators can modify these settings. Every
                session is validated for security.
              </p>
              <div className='inline-flex items-center gap-2 px-2 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-xs font-semibold shadow-sm'>
                <AlertCircle className='w-3 h-3' />
                Level: High
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Notice Banner */}
      <div className='bg-gray-900 p-4 sm:p-6 rounded border border-gray-800 shadow-sm relative overflow-hidden'>
        <div className='absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2' />
        <div className='flex items-start gap-4 relative z-10'>
          <div className='w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0 border border-white/10'>
            <Info className='text-white w-5 h-5' />
          </div>
          <div>
            <h4 className='text-white font-bold text-sm mb-1'>Important</h4>
            <p className='text-xs text-white/70 leading-relaxed'>
              Updating the service fee affects how much owners receive. Past
              transactions are not changed.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
