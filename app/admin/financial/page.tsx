'use client'

import { useState, useEffect } from 'react'
import {
  TrendingUp,
  IndianRupee,
  Clock,
  ArrowUpRight,
  Wallet,
  BarChart3,
  Calendar,
  ChevronRight,
  ShieldCheck,
  Loader2,
  AlertCircle,
  FileText,
  Download,
  RefreshCw,
} from 'lucide-react'
import { adminApi } from '@/lib/api'
import { toast } from 'sonner'
import { format } from 'date-fns'
import { EmptyState } from '@/components/EmptyState'

export default function AdminFinancialPage() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<any>(null)
  const [timeRange, setTimeRange] = useState('monthly')

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      setLoading(true)
      const stats = await adminApi.getFinancialStats()
      setData(stats)
    } catch (error: any) {
      toast.error('Failed to sync financial data', {
        description: error.message,
      })
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-[60vh]'>
        <Loader2 className='w-8 h-8 animate-spin text-primary' />
      </div>
    )
  }

  if (!data) {
    return (
      <div className='px-4 sm:px-6 lg:px-8 py-6'>
        <EmptyState
          icon={AlertCircle}
          title='Connection Error'
          message="We couldn't load the financial statistics. Please check your internet connection."
        />
      </div>
    )
  }

  const kpis = [
    {
      label: 'Total Bookings',
      value: `₹${(data.kpis.totalGross || 0).toLocaleString()}`,
      trend: 'Total volume processed',
      icon: TrendingUp,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
    },
    {
      label: 'Net Revenue',
      value: `₹${(data.kpis.totalNetRevenue || 0).toLocaleString()}`,
      trend: 'Platform service fees',
      icon: Wallet,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      label: 'Owner Payouts',
      value: `₹${(data.kpis.totalPayoutsSettled || 0).toLocaleString()}`,
      trend: 'Successfully settled',
      icon: IndianRupee,
      color: 'text-primary',
      bg: 'bg-primary/10',
    },
    {
      label: 'Pending Payouts',
      value: `${data.kpis.pendingPayoutsCount || 0} Requests`,
      trend: 'Awaiting settlement',
      icon: Clock,
      color: 'text-orange-600',
      bg: 'bg-orange-50',
    },
  ]

  const maxRevenue = Math.max(
    ...(data.trends?.map((d: any) => d.revenue) || [1]),
    1,
  )

  const getMonthName = (month: number) => {
    return format(new Date(2000, month - 1, 1), 'MMM').toUpperCase()
  }

  return (
    <div className='px-4 sm:px-6 lg:px-8 py-6 pb-20 bg-gray-50 min-h-screen'>
      {/* Header Section */}
      <header className='mb-8'>
        <div className='flex items-center justify-between mb-4'>
          <div className='flex-1'>
            <h1 className='text-2xl sm:text-3xl font-bold text-gray-900 mb-2'>
              Financial Overview
            </h1>
            <p className='text-sm text-gray-600'>
              Monitor platform earnings, owner payouts, and property performance
            </p>
          </div>
          <button
            onClick={fetchStats}
            disabled={loading}
            className='h-10 px-4 sm:px-6 bg-gray-900 text-white rounded-lg text-sm font-semibold hover:bg-gray-800 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shrink-0'
          >
            {loading ? (
              <Loader2 className='w-4 h-4 animate-spin' />
            ) : (
              <Download className='w-4 h-4' />
            )}
            <span className='hidden sm:inline'>Export</span>
          </button>
        </div>
      </header>

      {/* KPI Cards */}
      <section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6'>
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon
          return (
            <div
              key={index}
              className='bg-white p-4 sm:p-6 rounded border border-gray-200 shadow-sm hover:shadow-md transition-shadow'
            >
              <div className='flex items-center justify-between mb-4'>
                <div
                  className={`w-12 h-12 rounded-lg ${kpi.bg} flex items-center justify-center shrink-0`}
                >
                  <Icon className={`w-6 h-6 ${kpi.color}`} />
                </div>
                <div className='flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-md'>
                  <ArrowUpRight className='w-3 h-3' />
                  <span>Live</span>
                </div>
              </div>
              <p className='text-xs font-medium text-gray-500 uppercase mb-1'>
                {kpi.label}
              </p>
              <h3 className='text-2xl sm:text-3xl font-bold text-gray-900 mb-1'>
                {kpi.value}
              </h3>
              <p className='text-xs text-gray-500'>{kpi.trend}</p>
            </div>
          )
        })}
      </section>

      {/* Revenue Trends & Listing Performance */}
      <section className='grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6'>
        {/* Revenue Trends Chart */}
        <div className='lg:col-span-2 bg-white p-4 sm:p-6 rounded border border-gray-200 shadow-sm'>
          <div className='flex flex-col sm:flex-row sm:items-center justify-between mb-6'>
            <div>
              <h3 className='text-lg font-bold text-gray-900 mb-1'>
                Revenue Trends
              </h3>
              <p className='text-xs text-gray-500'>
                Platform earnings over the last year
              </p>
            </div>
            <div className='flex gap-1 mt-4 sm:mt-0 bg-gray-100 p-1 rounded-lg'>
              {['Monthly', 'Quarterly'].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setTimeRange(mode.toLowerCase())}
                  className={`px-3 sm:px-4 py-2 text-xs font-semibold rounded-md transition-all ${
                    timeRange === mode.toLowerCase()
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          {/* Bar Chart */}
          <div className='h-64 flex items-end justify-between gap-2 sm:gap-3'>
            {data.trends.length === 0 ? (
              <div className='w-full h-full flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg'>
                <p className='text-xs text-gray-400'>Insufficient data</p>
              </div>
            ) : (
              data.trends.map((trend: any, index: number) => (
                <div
                  key={index}
                  className='flex-1 flex flex-col items-center gap-2 group'
                >
                  <div className='w-full flex flex-col items-center justify-end h-48 relative'>
                    <div className='absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs font-semibold px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap z-10 shadow-lg'>
                      ₹{trend.revenue.toLocaleString()}
                    </div>
                    <div className='w-full bg-gray-100 rounded-t-lg transition-all h-48 group-hover:bg-gray-200 relative overflow-hidden'>
                      <div
                        className='absolute bottom-0 left-0 right-0 bg-primary rounded-t-lg transition-all duration-700 ease-out'
                        style={{
                          height: `${(trend.revenue / maxRevenue) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                  <span className='text-xs font-medium text-gray-500 group-hover:text-gray-900 transition-colors'>
                    {getMonthName(trend._id.month)}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Listing Performance */}
        <div className='lg:col-span-1 bg-white p-4 sm:p-6 rounded border border-gray-200 shadow-sm'>
          <div className='flex items-center justify-between mb-6'>
            <div>
              <h3 className='text-lg font-bold text-gray-900 mb-1'>
                Top Properties
              </h3>
              <p className='text-xs text-gray-500'>Highest earning</p>
            </div>
            <div className='w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center shrink-0'>
              <TrendingUp className='w-5 h-5 text-blue-600' />
            </div>
          </div>

          <div className='space-y-4'>
            {data.topListings.length === 0 ? (
              <p className='text-xs text-gray-400 py-8 text-center'>
                No performance data
              </p>
            ) : (
              data.topListings.map((listing: any, index: number) => (
                <div
                  key={index}
                  className='flex items-center justify-between py-4 border-b border-gray-100 last:border-0 last:pb-0 group/item'
                >
                  <div className='flex items-center gap-3 flex-1 min-w-0'>
                    <div className='w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center shrink-0 group-hover/item:bg-primary group-hover/item:text-white transition-all'>
                      <span className='text-xs font-bold'>#{index + 1}</span>
                    </div>
                    <div className='flex-1 min-w-0'>
                      <p className='text-sm font-semibold text-gray-900 truncate'>
                        {listing.name}
                      </p>
                      <div className='flex items-center gap-1 mt-0.5'>
                        <Calendar className='w-3 h-3 text-gray-400' />
                        <span className='text-xs text-gray-500'>
                          {listing.bookingCount} bookings
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className='text-right shrink-0 ml-3'>
                    <p className='text-lg font-bold text-primary'>
                      ₹{listing.revenue.toLocaleString()}
                    </p>
                    <p className='text-xs text-gray-500'>Commission</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Recent Transactions */}
      <section className='bg-white rounded border border-gray-200 shadow-sm overflow-hidden'>
        <div className='p-4 sm:p-6 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
          <div>
            <div className='flex items-center gap-2 mb-1'>
              <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse' />
              <h3 className='text-lg font-bold text-gray-900'>
                Recent Transactions
              </h3>
            </div>
            <p className='text-xs text-gray-500'>
              Latest platform financial activities
            </p>
          </div>
        </div>

        <div className='overflow-x-auto'>
          <table className='w-full border-collapse'>
            <thead>
              <tr className='bg-gray-50'>
                <th className='text-left px-4 sm:px-6 py-3 text-xs font-medium text-gray-500 uppercase'>
                  Transaction ID
                </th>
                <th className='text-left px-4 sm:px-6 py-3 text-xs font-medium text-gray-500 uppercase'>
                  Owner
                </th>
                <th className='text-left px-4 sm:px-6 py-3 text-xs font-medium text-gray-500 uppercase'>
                  Rent
                </th>
                <th className='text-right px-4 sm:px-6 py-3 text-xs font-medium text-gray-500 uppercase'>
                  Commission
                </th>
                <th className='text-right px-4 sm:px-6 py-3 text-xs font-medium text-gray-500 uppercase'>
                  Status
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-100'>
              {data.recentTransactions.length === 0 ? (
                <tr>
                  <td colSpan={5} className='px-4 sm:px-6 py-12 text-center'>
                    <EmptyState
                      icon={FileText}
                      title='Ledger Empty'
                      message='No recent financial events recorded.'
                    />
                  </td>
                </tr>
              ) : (
                data.recentTransactions.map((payout: any, index: number) => (
                  <tr
                    key={index}
                    className='hover:bg-gray-50 transition-colors group'
                  >
                    <td className='px-4 sm:px-6 py-4'>
                      <div className='flex flex-col'>
                        <span className='text-sm font-semibold text-gray-900'>
                          TXN-{payout._id.substring(18).toUpperCase()}
                        </span>
                        <span className='text-xs text-gray-500 mt-0.5'>
                          {format(new Date(payout.createdAt), 'MMM dd, HH:mm')}
                        </span>
                      </div>
                    </td>
                    <td className='px-4 sm:px-6 py-4'>
                      <div className='flex items-center gap-3'>
                        <div className='w-10 h-10 rounded-lg overflow-hidden bg-gray-200 shrink-0'>
                          <img
                            alt={payout.owner?.name}
                            className='w-full h-full object-cover'
                            src={
                              payout.owner?.avatar ||
                              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                payout.owner?.name || '',
                              )}&background=b6212f&color=fff&size=128`
                            }
                          />
                        </div>
                        <div className='flex flex-col min-w-0'>
                          <span className='text-sm font-semibold text-gray-900 truncate'>
                            {payout.owner?.name}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className='px-4 sm:px-6 py-4'>
                      <div className='flex flex-col'>
                        <span className='text-sm font-semibold text-gray-900'>
                          ₹{payout.grossRent.toLocaleString()}
                        </span>
                        <span className='text-xs text-gray-500'>
                          Gross Rent
                        </span>
                      </div>
                    </td>
                    <td className='px-4 sm:px-6 py-4 text-right'>
                      <div className='flex flex-col items-end'>
                        <span className='text-sm font-bold text-primary'>
                          ₹{payout.serviceChargeAmount.toLocaleString()}
                        </span>
                        <span className='text-xs text-gray-500'>
                          Service Fee
                        </span>
                      </div>
                    </td>
                    <td className='px-4 sm:px-6 py-4 text-right'>
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-semibold ${
                          payout.payoutStatus === 'settled'
                            ? 'bg-green-50 text-green-700 border border-green-200'
                            : payout.payoutStatus === 'pending'
                              ? 'bg-yellow-50 text-yellow-700 border border-yellow-200'
                              : 'bg-blue-50 text-blue-700 border border-blue-200'
                        }`}
                      >
                        {payout.payoutStatus || 'Processing'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
