'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import CreateListingDrawer from '@/components/CreateListingDrawer'
import {
  Landmark,
  TrendingUp,
  Building2,
  BookOpen,
  Star,
  Plus,
  ArrowUp,
  ArrowDown,
  Clock,
  ChevronRight,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Loader2,
  Eye,
  UserCheck,
  Download,
  Filter,
} from 'lucide-react'
import { ownerApi, bookingsApi } from '@/lib/api'
import { useAuth } from '@/lib/auth-context'
import { toast } from 'sonner'
import { exportToCSV, formatCurrency } from '@/lib/export-utils'
import { format } from 'date-fns'

interface AnalyticsData {
  views: number
  avgRating: number
  totalListings: number
  totalBookingRequests: number
  acceptedBookings: number
  acceptanceRate: number
  completedBookings: number
  monthlyRevenue: Array<{
    _id: { month: number; year: number }
    gross: number
    serviceCharge: number
    net: number
  }>
  topPerformers: {
    byViews: {
      id: string
      title: string
      viewCount: number
      avgRating: number
      image?: string | null
    } | null
    byRevenue: {
      id: string
      title: string
      totalRevenue: number
      avgRating: number
      image?: string | null
    } | null
  }
}

const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

export default function OwnerDashboardPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [pendingBookings, setPendingBookings] = useState<any[]>([])
  const [bankDetails, setBankDetails] = useState<any>(null)
  const [filterPeriod, setFilterPeriod] = useState<string>('all')
  const [exporting, setExporting] = useState(false)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      const [analyticsData, bookingsData, bankData] = await Promise.all([
        ownerApi.getAnalytics(),
        bookingsApi.getOwnerBookings(),
        ownerApi.getBankDetails(),
      ])

      setAnalytics(analyticsData)
      setPendingBookings(
        bookingsData.bookings
          .filter((b: any) => b.status === 'pending')
          .slice(0, 2),
      )
      setBankDetails(bankData.bankDetails)
    } catch (error: any) {
      console.error('Failed to fetch dashboard data:', error)
      toast.error('Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }

  const handleAcceptBooking = async (bookingId: string) => {
    try {
      await bookingsApi.acceptBooking(bookingId)
      toast.success('Booking accepted!')
      fetchDashboardData()
    } catch (error: any) {
      toast.error('Failed to accept booking')
    }
  }

  const handleRejectBooking = async (bookingId: string) => {
    try {
      await bookingsApi.rejectBooking(bookingId, 'Not available at the moment')
      toast.success('Booking rejected')
      fetchDashboardData()
    } catch (error: any) {
      toast.error('Failed to reject booking')
    }
  }

  const handleExportCSV = async () => {
    try {
      setExporting(true)

      const dataToExport = getFilteredRevenue()

      if (!dataToExport || dataToExport.length === 0) {
        toast.error('No revenue data to export')
        return
      }

      // Prepare data for export
      const exportData = dataToExport.map((month) => ({
        month: `${monthNames[month._id.month - 1]} ${month._id.year}`,
        grossRevenue: formatCurrency(month.gross),
        serviceFee: formatCurrency(month.serviceCharge),
        netEarnings: formatCurrency(month.net),
      }))

      // Add summary row
      exportData.push({
        month: 'TOTAL',
        grossRevenue: formatCurrency(dataToExport.reduce((sum, m) => sum + m.gross, 0)),
        serviceFee: formatCurrency(dataToExport.reduce((sum, m) => sum + m.serviceCharge, 0)),
        netEarnings: formatCurrency(dataToExport.reduce((sum, m) => sum + m.net, 0)),
      })

      // Define CSV headers
      const headers = {
        month: 'Month',
        grossRevenue: 'Gross Revenue',
        serviceFee: 'Service Fee',
        netEarnings: 'Net Earnings',
      }

      // Generate filename with current date and filter period
      const periodLabel = filterPeriod === 'all' ? 'all-time' : filterPeriod.replace('months', 'mo').replace('month', 'mo')
      const filename = `owner_revenue_${periodLabel}_${format(new Date(), 'yyyy-MM-dd')}.csv`

      // Export CSV
      await exportToCSV(exportData, filename, headers)

      toast.success('Revenue data exported successfully!')
    } catch (err: any) {
      console.error('Export error:', err)
      toast.error(err.message || 'Failed to export revenue data')
    } finally {
      setExporting(false)
    }
  }

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-[60vh]'>
        <Loader2 className='w-8 h-8 animate-spin text-primary' />
      </div>
    )
  }

  // Filter revenue data based on selected period
  const getFilteredRevenue = () => {
    if (!analytics?.monthlyRevenue) return []

    const now = new Date()
    const currentYear = now.getFullYear()
    const currentMonth = now.getMonth() + 1 // JavaScript months are 0-indexed

    switch (filterPeriod) {
      case '1month':
        return analytics.monthlyRevenue.filter(
          m => m._id.year === currentYear && m._id.month === currentMonth
        )
      case '3months':
        return analytics.monthlyRevenue.slice(0, 3)
      case '6months':
        return analytics.monthlyRevenue.slice(0, 6)
      case 'all':
      default:
        return analytics.monthlyRevenue
    }
  }

  const filteredRevenue = getFilteredRevenue()
  const totalRevenue = filteredRevenue.reduce((sum, m) => sum + m.net, 0) || 0
  const revenueGrowth =
    filteredRevenue.length >= 2
      ? (((filteredRevenue[0]?.net || 0) - (filteredRevenue[1]?.net || 0)) /
          (filteredRevenue[1]?.net || 1)) *
        100
      : 0

  // Get last 7 months of revenue data for the chart
  const revenueChartData = filteredRevenue.slice(0, 7).reverse()
  const maxRevenue = Math.max(...revenueChartData.map((m) => m.net), 1)

  return (
    <>
      <div className='px-4 md:px-6 lg:px-12 pb-20 space-y-8 md:space-y-10'>
        {/* Bank Account Setup Banner */}
        {!bankDetails && (
          <div className='bg-primary/5 mt-6 md:mt-12 rounded-2xl md:rounded-[2.5rem] p-6 md:p-8 lg:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 md:gap-8 border border-primary/10 relative overflow-hidden group'>
            <div className='absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2'></div>
            <div className='flex items-start gap-4 md:gap-6 relative z-10'>
              <div className='w-12 h-12 md:w-16 md:h-16 bg-primary rounded-2xl md:rounded-3xl flex items-center justify-center text-on-primary shadow-xl shadow-primary/30 group-hover:rotate-12 transition-transform duration-500 shrink-0'>
                <Landmark className='w-6 h-6 md:w-8 md:h-8' />
              </div>
              <div>
                <div className='inline-flex items-center gap-1.5 md:gap-2 px-2.5 md:px-3 py-1 bg-primary/10 text-primary rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest mb-2 md:mb-3'>
                  <ShieldCheck className='w-3 h-3 md:w-3.5 md:h-3.5' />
                  Action Required
                </div>
                <h3 className='font-headline font-black text-lg md:text-2xl text-on-surface tracking-tight mb-1 md:mb-2'>
                  Setup Your Payout Account
                </h3>
                <p className='text-xs md:text-sm text-on-surface-variant font-medium max-w-lg leading-relaxed'>
                  Add your bank account details to receive payments from
                  confirmed bookings.
                </p>
              </div>
            </div>
            <button
              onClick={() => router.push('/owner/payouts')}
              className='w-full lg:w-auto px-6 md:px-8 h-12 md:h-14 bg-on-surface text-surface rounded-xl md:rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-[0.2em] hover:bg-primary hover:text-white transition-all active:scale-95 shadow-xl shadow-on-surface/10 relative z-10'
            >
              Add Bank Details
            </button>
          </div>
        )}

        {/* Stats Cards */}
        <section className='grid grid-cols-3 gap-2 md:gap-6 lg:gap-8 mt-6 md:mt-12'>
          {/* Total Revenue */}
          <div className='bg-white p-3 md:p-6 lg:p-8 rounded border border-outline-variant/10 shadow-sm relative overflow-hidden group hover:shadow-2xl transition-all duration-500'>
            <div className='flex flex-col md:flex-row md:justify-between md:items-start mb-2 md:mb-4 lg:mb-6'>
              <div className='w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-emerald-50 text-emerald-600 rounded-lg md:rounded-xl lg:rounded-2xl flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500 mb-1 md:mb-0'>
                <TrendingUp className='w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6' />
              </div>
              <p className='text-[7px] md:text-[9px] lg:text-[10px] font-black text-on-surface-variant uppercase tracking-wider md:tracking-widest opacity-60'>
                Total Earnings
              </p>
            </div>
            <div className='flex flex-col'>
              <h2 className='text-lg md:text-3xl lg:text-4xl font-headline font-black text-on-surface tracking-tighter'>
                ₹{totalRevenue.toLocaleString('en-IN')}
              </h2>
              {(analytics?.monthlyRevenue?.length ?? 0) >= 2 && (
                <div className='flex items-center gap-1 md:gap-2 mt-1 md:mt-3 lg:mt-4'>
                  <div
                    className={`px-1 md:px-2 py-0.5 md:py-1 rounded md:rounded-lg flex items-center gap-0.5 md:gap-1 text-[7px] md:text-[9px] lg:text-[10px] font-black uppercase tracking-tight md:tracking-tighter ${
                      revenueGrowth >= 0
                        ? 'bg-emerald-50 text-emerald-600'
                        : 'bg-red-50 text-red-600'
                    }`}
                  >
                    {revenueGrowth >= 0 ? (
                      <ArrowUp className='w-2 h-2 md:w-3 md:h-3' />
                    ) : (
                      <ArrowDown className='w-2 h-2 md:w-3 md:h-3' />
                    )}
                    {Math.abs(revenueGrowth).toFixed(1)}%
                  </div>
                  <p className='hidden md:block text-on-surface-variant/40 text-[9px] lg:text-[10px] font-bold uppercase tracking-widest'>
                    vs last month
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Total Listings */}
          <div className='bg-white p-3 md:p-6 lg:p-8 rounded border border-outline-variant/10 shadow-sm relative overflow-hidden group hover:shadow-2xl transition-all duration-500'>
            <div className='flex flex-col md:flex-row md:justify-between md:items-start mb-2 md:mb-4 lg:mb-6'>
              <div className='w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-blue-50 text-blue-600 rounded-lg md:rounded-xl lg:rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 mb-1 md:mb-0'>
                <Building2 className='w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6' />
              </div>
              <p className='text-[7px] md:text-[9px] lg:text-[10px] font-black text-on-surface-variant uppercase tracking-wider md:tracking-widest opacity-60'>
                Total Properties
              </p>
            </div>
            <div className='flex flex-col'>
              <h2 className='text-lg md:text-3xl lg:text-4xl font-headline font-black text-on-surface tracking-tighter'>
                {analytics?.totalListings || 0}
              </h2>
              <p className='text-on-surface-variant/40 text-[7px] md:text-[9px] lg:text-[10px] font-bold uppercase tracking-wider md:tracking-widest mt-1 md:mt-3 lg:mt-4'>
                <span className='text-blue-600 font-black'>
                  {analytics?.views || 0}
                </span>{' '}
                <span className='hidden md:inline'>views</span>
              </p>
            </div>
          </div>

          {/* Pending Requests */}
          <div
            onClick={() => router.push('/owner/bookings?status=pending')}
            className='bg-white p-3 md:p-6 lg:p-8 rounded border border-outline-variant/10 shadow-sm relative overflow-hidden group hover:shadow-2xl transition-all duration-500 cursor-pointer'
          >
            <div className='flex flex-col md:flex-row md:justify-between md:items-start mb-2 md:mb-4 lg:mb-6'>
              <div className='w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-orange-50 text-orange-600 rounded-lg md:rounded-xl lg:rounded-2xl flex items-center justify-center group-hover:bg-orange-600 group-hover:text-white transition-all duration-500 mb-1 md:mb-0'>
                <BookOpen className='w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6' />
              </div>
              <p className='text-[7px] md:text-[9px] lg:text-[10px] font-black text-on-surface-variant uppercase tracking-wider md:tracking-widest opacity-60'>
                Pending Requests
              </p>
            </div>
            <div className='flex flex-col'>
              <h2 className='text-lg md:text-3xl lg:text-4xl font-headline font-black text-on-surface tracking-tighter'>
                {(analytics?.totalBookingRequests || 0) -
                  (analytics?.acceptedBookings || 0) -
                  (analytics?.completedBookings || 0)}
              </h2>
              <div className='flex items-center gap-1 md:gap-2 mt-1 md:mt-3 lg:mt-4'>
                <div className='px-1 md:px-2 py-0.5 md:py-1 bg-orange-50 text-orange-600 rounded md:rounded-lg flex items-center gap-0.5 md:gap-1 text-[7px] md:text-[9px] lg:text-[10px] font-black uppercase tracking-tight md:tracking-tighter'>
                  <Zap className='w-2 h-2 md:w-3 md:h-3' />
                  <span className='hidden md:inline'>REVIEW NEEDED</span>
                  <span className='md:hidden'>REVIEW</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Revenue Chart & Recent Requests */}
        <section className='grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8'>
          {/* Revenue Chart */}
          <div className='lg:col-span-8 bg-white p-6 md:p-8 lg:p-10 rounded border border-outline-variant/10 shadow-sm'>
            <div className='flex flex-col md:flex-row md:items-center justify-between mb-8 md:mb-12 gap-4'>
              <div>
                <h3 className='font-headline font-black text-xl md:text-2xl tracking-tighter'>
                  Revenue Overview
                </h3>
                <p className='text-xs md:text-sm text-on-surface-variant font-medium'>
                  Monthly earnings from your properties
                </p>
              </div>
              <div className='flex flex-col sm:flex-row gap-3'>
                <select
                  value={filterPeriod}
                  onChange={(e) => setFilterPeriod(e.target.value)}
                  className='bg-white border border-outline-variant/20 rounded-xl px-4 py-2.5 text-xs font-bold text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer hover:border-primary/40 transition-all'
                >
                  <option value='all'>All Time</option>
                  <option value='6months'>Last 6 Months</option>
                  <option value='3months'>Last 3 Months</option>
                  <option value='1month'>Last Month</option>
                </select>
                <button
                  onClick={handleExportCSV}
                  disabled={exporting || filteredRevenue.length === 0}
                  className='bg-on-surface text-surface px-5 py-2.5 rounded-xl font-black text-xs hover:opacity-90 transition-all shadow-sm active:scale-95 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
                >
                  {exporting ? (
                    <>
                      <div className='w-3.5 h-3.5 border-2 border-surface/30 border-t-surface rounded-full animate-spin' />
                      <span className='hidden sm:inline'>Exporting...</span>
                    </>
                  ) : (
                    <>
                      <Download className='w-4 h-4' />
                      <span className='hidden sm:inline'>Export CSV</span>
                    </>
                  )}
                </button>
              </div>
            </div>
            {revenueChartData.length > 0 ? (
              <>
                <div className='h-72 flex items-end justify-between gap-4 px-2'>
                  {revenueChartData.map((monthData, index) => {
                    const height = (monthData.net / maxRevenue) * 100
                    return (
                      <div
                        key={index}
                        className={`w-full rounded-t-[1rem] relative group transition-all duration-500 overflow-hidden ${
                          index === revenueChartData.length - 1
                            ? 'bg-primary'
                            : 'bg-primary/10 hover:bg-primary/20'
                        }`}
                        style={{ height: `${Math.max(height, 10)}%` }}
                      >
                        {index === revenueChartData.length - 1 && (
                          <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent'></div>
                        )}
                        <div className='absolute -top-12 left-1/2 -translate-x-1/2 bg-on-surface text-surface text-[10px] font-black py-2 px-3 rounded-xl opacity-0 group-hover:opacity-100 transition-all transform scale-90 group-hover:scale-100 shadow-xl whitespace-nowrap z-20 pointer-events-none'>
                          ₹{monthData.net.toLocaleString('en-IN')}
                        </div>
                      </div>
                    )
                  })}
                </div>
                <div className='flex justify-between mt-8 text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] px-2 opacity-40'>
                  {revenueChartData.map((monthData, index) => (
                    <span key={index}>
                      {monthNames[monthData._id.month - 1]}
                    </span>
                  ))}
                </div>
              </>
            ) : (
              <div className='h-72 flex items-center justify-center'>
                <div className='text-center'>
                  <TrendingUp className='w-12 h-12 mx-auto text-gray-300 mb-3' />
                  <p className='text-gray-500 text-sm'>No revenue data yet</p>
                  <p className='text-gray-400 text-xs mt-1'>
                    Start accepting bookings to see your earnings
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Recent Booking Requests */}
          <div className='lg:col-span-4'>
            <div className='bg-white p-6 md:p-8 rounded border border-outline-variant/10 shadow-sm h-full flex flex-col'>
              <div className='flex items-center justify-between mb-8 md:mb-10'>
                <h3 className='font-headline font-black text-lg md:text-xl tracking-tight'>
                  Recent Requests
                </h3>
                {pendingBookings.length > 0 && (
                  <div className='w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center'>
                    <span className='text-xs font-black text-primary'>
                      {pendingBookings.length}
                    </span>
                  </div>
                )}
              </div>

              {pendingBookings.length > 0 ? (
                <>
                  <div className='space-y-8 flex-1'>
                    {pendingBookings.map((booking, i) => {
                      const timeDiff =
                        Date.now() - new Date(booking.createdAt).getTime()
                      const hoursAgo = Math.floor(timeDiff / (1000 * 60 * 60))
                      const timeLabel =
                        hoursAgo < 1 ? 'NEW' : `${hoursAgo}H AGO`

                      return (
                        <div
                          key={i}
                          className='flex items-start gap-5 pb-8 border-b border-outline-variant/5 last:border-0 last:pb-0 group'
                        >
                          <div className='w-14 h-14 rounded-2xl overflow-hidden shadow-md shrink-0 border-2 border-white group-hover:scale-110 transition-transform bg-primary/10 flex items-center justify-center'>
                            <UserCheck className='w-7 h-7 text-primary' />
                          </div>
                          <div className='flex-1 min-w-0'>
                            <div className='flex justify-between items-center mb-1'>
                              <p className='font-bold text-sm text-on-surface truncate'>
                                {booking.student?.name || 'Student'}
                              </p>
                              <span
                                className={`text-[8px] font-black px-1.5 py-0.5 rounded ${hoursAgo < 1 ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface-variant'}`}
                              >
                                {timeLabel}
                              </span>
                            </div>
                            <p className='text-[11px] font-medium text-on-surface-variant mb-4 flex items-center gap-1 opacity-70'>
                              <Building2 className='w-3 h-3' />
                              {booking.listing?.title || 'Property'} •{' '}
                              {booking.durationMonths} months
                            </p>
                            <div className='flex gap-2'>
                              <button
                                onClick={() => handleAcceptBooking(booking._id)}
                                className='flex-1 h-9 bg-emerald-600 hover:bg-emerald-700 text-white text-[9px] font-black rounded-xl uppercase tracking-widest transition-all active:scale-95 shadow-sm'
                              >
                                Accept
                              </button>
                              <button
                                onClick={() => handleRejectBooking(booking._id)}
                                className='flex-1 h-9 bg-surface-container hover:bg-surface-container-high text-on-surface-variant text-[9px] font-black rounded-xl uppercase tracking-widest transition-all active:scale-95'
                              >
                                Reject
                              </button>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  <button
                    onClick={() => router.push('/owner/bookings')}
                    className='w-full text-center mt-10 pt-8 border-t border-outline-variant/10 text-[10px] font-black text-primary uppercase tracking-[0.2em] hover:tracking-[0.25em] transition-all'
                  >
                    View All Requests
                  </button>
                </>
              ) : (
                <div className='flex-1 flex items-center justify-center text-center py-12'>
                  <div>
                    <BookOpen className='w-12 h-12 mx-auto text-gray-300 mb-3' />
                    <p className='text-gray-500 text-sm'>No pending requests</p>
                    <p className='text-gray-400 text-xs mt-1'>
                      New booking requests will appear here
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Top Performing Properties */}
        {analytics?.topPerformers &&
          (analytics.topPerformers.byRevenue ||
            analytics.topPerformers.byViews) && (
            <section className='space-y-6 md:space-y-10'>
              <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
                <div>
                  <h3 className='font-headline font-black text-xl md:text-2xl tracking-tighter'>
                    Your Top Performers
                  </h3>
                  <p className='text-xs md:text-sm text-on-surface-variant font-medium mt-1'>
                    Properties with the best performance
                  </p>
                </div>
                <button
                  onClick={() => router.push('/owner/listings')}
                  className='text-[9px] md:text-[10px] font-black text-primary uppercase tracking-widest hover:underline text-left sm:text-right'
                >
                  View All Properties
                </button>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'>
                {/* Top by Revenue */}
                {analytics.topPerformers.byRevenue && (
                  <div
                    onClick={() => router.push(`/owner/listings`)}
                    className='group bg-white rounded overflow-hidden border border-outline-variant/10 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 shadow-sm cursor-pointer'
                  >
                    <div className='aspect-[1.4] overflow-hidden bg-gradient-to-br from-emerald-500 to-emerald-600 relative flex items-center justify-center'>
                      {analytics.topPerformers.byRevenue.image ? (
                        <Image
                          src={analytics.topPerformers.byRevenue.image}
                          alt={analytics.topPerformers.byRevenue.title}
                          fill
                          className='object-cover group-hover:scale-110 transition-transform duration-500'
                          sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
                        />
                      ) : (
                        <TrendingUp className='w-16 h-16 md:w-20 md:h-20 text-white/20' />
                      )}
                      <div className='absolute top-4 left-4 md:top-6 md:left-6 px-3 md:px-4 py-1 md:py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[9px] md:text-[10px] font-black text-emerald-600 border border-emerald-100 shadow-lg z-10'>
                        TOP EARNER
                      </div>
                    </div>
                    <div className='p-6 md:p-8'>
                      <div className='flex justify-between items-start mb-4 md:mb-6'>
                        <h4 className='font-headline font-black text-lg md:text-xl tracking-tight group-hover:text-primary transition-colors line-clamp-2'>
                          {analytics.topPerformers.byRevenue.title}
                        </h4>
                        <div className='p-2 md:p-2.5 bg-surface-container-lowest rounded-xl md:rounded-2xl group-hover:bg-primary group-hover:text-white transition-all shrink-0'>
                          <ChevronRight className='w-4 h-4 md:w-5 md:h-5' />
                        </div>
                      </div>
                      <div className='flex items-center gap-4 md:gap-6 pt-4 md:pt-6 border-t border-outline-variant/5'>
                        <div className='flex-1 min-w-0'>
                          <p className='text-[9px] md:text-[10px] text-on-surface-variant font-black uppercase tracking-widest opacity-40 mb-1.5 md:mb-2'>
                            Total Revenue
                          </p>
                          <p className='font-headline font-black text-xl md:text-2xl text-primary tracking-tighter truncate'>
                            ₹
                            {analytics.topPerformers.byRevenue.totalRevenue.toLocaleString(
                              'en-IN',
                            )}
                          </p>
                        </div>
                        <div className='w-px h-8 md:h-10 bg-outline-variant/10'></div>
                        <div className='flex-1 text-right min-w-0'>
                          <p className='text-[9px] md:text-[10px] text-on-surface-variant font-black uppercase tracking-widest opacity-40 mb-1.5 md:mb-2'>
                            Rating
                          </p>
                          <div className='flex items-center justify-end gap-1 md:gap-1.5'>
                            <Star className='w-4 h-4 md:w-5 md:h-5 text-yellow-400 fill-yellow-400' />
                            <span className='font-black text-base md:text-lg tracking-tighter'>
                              {analytics.topPerformers.byRevenue.avgRating.toFixed(
                                1,
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Top by Views */}
                {analytics.topPerformers.byViews &&
                  analytics.topPerformers.byViews.id !==
                    analytics.topPerformers.byRevenue?.id && (
                    <div
                      onClick={() => router.push(`/owner/listings`)}
                      className='group bg-white rounded overflow-hidden border border-outline-variant/10 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 shadow-sm cursor-pointer'
                    >
                      <div className='aspect-[1.4] overflow-hidden bg-gradient-to-br from-blue-500 to-blue-600 relative flex items-center justify-center'>
                        {analytics.topPerformers.byViews.image ? (
                          <Image
                            src={analytics.topPerformers.byViews.image}
                            alt={analytics.topPerformers.byViews.title}
                            fill
                            className='object-cover group-hover:scale-110 transition-transform duration-500'
                            sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
                          />
                        ) : (
                          <Eye className='w-16 h-16 md:w-20 md:h-20 text-white/20' />
                        )}
                        <div className='absolute top-4 left-4 md:top-6 md:left-6 px-3 md:px-4 py-1 md:py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[9px] md:text-[10px] font-black text-blue-600 border border-blue-100 shadow-lg z-10'>
                          MOST VIEWED
                        </div>
                      </div>
                      <div className='p-6 md:p-8'>
                        <div className='flex justify-between items-start mb-4 md:mb-6'>
                          <h4 className='font-headline font-black text-lg md:text-xl tracking-tight group-hover:text-primary transition-colors line-clamp-2'>
                            {analytics.topPerformers.byViews.title}
                          </h4>
                          <div className='p-2 md:p-2.5 bg-surface-container-lowest rounded-xl md:rounded-2xl group-hover:bg-primary group-hover:text-white transition-all shrink-0'>
                            <ChevronRight className='w-4 h-4 md:w-5 md:h-5' />
                          </div>
                        </div>
                        <div className='flex items-center gap-4 md:gap-6 pt-4 md:pt-6 border-t border-outline-variant/5'>
                          <div className='flex-1 min-w-0'>
                            <p className='text-[9px] md:text-[10px] text-on-surface-variant font-black uppercase tracking-widest opacity-40 mb-1.5 md:mb-2'>
                              Total Views
                            </p>
                            <p className='font-headline font-black text-xl md:text-2xl text-primary tracking-tighter truncate'>
                              {analytics.topPerformers.byViews.viewCount.toLocaleString(
                                'en-IN',
                              )}
                            </p>
                          </div>
                          <div className='w-px h-8 md:h-10 bg-outline-variant/10'></div>
                          <div className='flex-1 text-right min-w-0'>
                            <p className='text-[9px] md:text-[10px] text-on-surface-variant font-black uppercase tracking-widest opacity-40 mb-1.5 md:mb-2'>
                              Rating
                            </p>
                            <div className='flex items-center justify-end gap-1 md:gap-1.5'>
                              <Star className='w-4 h-4 md:w-5 md:h-5 text-yellow-400 fill-yellow-400' />
                              <span className='font-black text-base md:text-lg tracking-tighter'>
                                {analytics.topPerformers.byViews.avgRating.toFixed(
                                  1,
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                {/* Add New Property Card */}
                <div
                  onClick={() => setIsDrawerOpen(true)}
                  className='flex items-center justify-center border-2 border-dashed border-outline-variant/20 rounded group hover:border-primary/50 hover:bg-primary/[0.02] transition-all duration-500 cursor-pointer min-h-[300px] md:min-h-[400px]'
                >
                  <div className='text-center p-8 md:p-10'>
                    <div className='w-16 h-16 md:w-20 md:h-20 bg-primary/5 rounded flex items-center justify-center mx-auto mb-6 md:mb-8 group-hover:bg-primary group-hover:rotate-90 transition-all duration-700 shadow-sm'>
                      <Plus className='w-8 h-8 md:w-10 md:h-10 text-primary group-hover:text-white transition-all' />
                    </div>
                    <h4 className='font-headline font-black text-lg md:text-xl tracking-tight mb-2'>
                      Add New Property
                    </h4>
                    <p className='text-xs md:text-sm text-on-surface-variant font-medium max-w-[200px] mx-auto leading-relaxed'>
                      List another property to increase your earnings
                    </p>
                    <div className='mt-6 md:mt-8 inline-flex items-center gap-2 text-[9px] md:text-[10px] font-black text-primary uppercase tracking-[0.2em] group-hover:gap-4 transition-all'>
                      Create Listing
                      <ChevronRight className='w-3 h-3 md:w-3.5 md:h-3.5' />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

        {/* No Properties State */}
        {analytics?.totalListings === 0 && (
          <section className='space-y-6 md:space-y-10'>
            <div className='bg-white rounded p-8 md:p-12 lg:p-16 text-center border border-outline-variant/10'>
              <div className='w-20 h-20 md:w-24 md:h-24 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8'>
                <Building2 className='w-10 h-10 md:w-12 md:h-12 text-primary' />
              </div>
              <h3 className='font-headline font-black text-2xl md:text-3xl tracking-tight mb-3 md:mb-4'>
                Welcome to BrainX Owner Portal
              </h3>
              <p className='text-on-surface-variant font-medium text-sm md:text-base lg:text-lg max-w-2xl mx-auto mb-6 md:mb-8 leading-relaxed px-4'>
                Start earning by listing your student accommodation. It's quick
                and easy to get started!
              </p>
              <button
                onClick={() => setIsDrawerOpen(true)}
                className='px-8 md:px-10 py-3 md:py-4 bg-primary text-white rounded font-black text-xs md:text-sm uppercase tracking-widest hover:brightness-110 transition-all active:scale-95 shadow-xl shadow-primary/20'
              >
                Create Your First Listing
              </button>
            </div>
          </section>
        )}
      </div>

      <CreateListingDrawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen} />
    </>
  )
}
