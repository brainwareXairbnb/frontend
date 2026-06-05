'use client'

import { useState, useEffect } from 'react'
import { adminApi } from '@/lib/api'
import { DashboardStats } from '@/lib/types'
import {
  UserPlus,
  Home,
  CalendarCheck,
  TrendingUp,
  Users,
  IndianRupee,
  Activity,
  Download,
} from 'lucide-react'
import { exportToCSV, formatCurrency } from '@/lib/export-utils'
import { format } from 'date-fns'
import { toast } from 'sonner'

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true)
  const [statsData, setStatsData] = useState<any>(null)
  const [filterPeriod, setFilterPeriod] = useState<string>('30days')
  const [exporting, setExporting] = useState(false)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true)
        const response = await adminApi.getDashboardStats(filterPeriod)
        setStatsData(response)
      } catch (error) {
        console.error('Failed to fetch admin stats:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [filterPeriod])

  const handleExportCSV = async () => {
    try {
      setExporting(true)

      if (!statsData?.monthlyRevenue || statsData.monthlyRevenue.length === 0) {
        toast.error('No revenue data to export')
        return
      }

      // Prepare data for export
      const exportData = statsData.monthlyRevenue.map((item: any) => ({
        month: `${monthNames[item._id.month - 1]} ${item._id.year}`,
        totalRevenue: formatCurrency(item.revenue),
        totalBookings: statsData.stats?.totalBookings || 0,
        totalUsers: statsData.stats?.totalUsers || 0,
        activeListings: statsData.stats?.totalRooms || 0,
      }))

      // Add summary row
      const totalRevenue = statsData.monthlyRevenue.reduce(
        (sum: number, m: any) => sum + m.revenue,
        0,
      )
      exportData.push({
        month: 'TOTAL',
        totalRevenue: formatCurrency(totalRevenue),
        totalBookings: statsData.stats?.totalBookings || 0,
        totalUsers: statsData.stats?.totalUsers || 0,
        activeListings: statsData.stats?.totalRooms || 0,
      })

      // Define CSV headers
      const headers = {
        month: 'Month',
        totalRevenue: 'Total Revenue',
        totalBookings: 'Total Bookings',
        totalUsers: 'Total Users',
        activeListings: 'Active Listings',
      }

      // Generate filename with current date
      const filename = `admin_dashboard_${format(new Date(), 'yyyy-MM-dd')}.csv`

      // Export CSV
      await exportToCSV(exportData, filename, headers)

      toast.success('Dashboard data exported successfully!')
    } catch (err: any) {
      console.error('Export error:', err)
      toast.error(err.message || 'Failed to export dashboard data')
    } finally {
      setExporting(false)
    }
  }

  const kpis = [
    {
      label: 'TOTAL USERS',
      value: statsData?.stats?.totalUsers?.toLocaleString() || '0',
      trend: 'Platform growth',
      icon: Users,
    },
    {
      label: 'GROSS REVENUE',
      value: `₹${statsData?.stats?.totalRevenue?.toLocaleString('en-IN') || '0'}`,
      trend: 'Total earnings',
      icon: IndianRupee,
    },
    {
      label: 'TOTAL BOOKINGS',
      value: statsData?.stats?.totalBookings?.toLocaleString() || '0',
      trend: 'All time',
      icon: CalendarCheck,
    },
    {
      label: 'ACTIVE LISTINGS',
      value: statsData?.stats?.totalRooms?.toLocaleString() || '0',
      trend: 'Approved rooms',
      icon: Home,
    },
  ]

  // Month names mapping
  const monthNames = [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC',
  ]

  // Format monthly revenue data from API (already filtered by server)
  const monthlyData =
    statsData?.monthlyRevenue?.map((item: any) => ({
      month: monthNames[item._id.month - 1],
      revenue: item.revenue,
      target: item.revenue * 1.2, // Set target as 20% more than revenue
    })) || []

  // Format recent activity from API
  const recentActivity = [
    ...(statsData?.recentActivity?.users?.slice(0, 1).map((user: any) => ({
      user: 'New User Registered',
      desc: `${user.name} (${user.role})`,
      time: getTimeAgo(user.createdAt),
      icon: UserPlus,
      color: 'primary',
    })) || []),
    ...(statsData?.recentActivity?.listings
      ?.slice(0, 1)
      .map((listing: any) => ({
        user: 'New Room Posted',
        desc: `${listing.title}, ${listing.address?.city || 'Kolkata'}`,
        time: getTimeAgo(listing.createdAt),
        icon: Home,
        color: 'tertiary',
      })) || []),
    ...(statsData?.recentActivity?.bookings
      ?.slice(0, 1)
      .map((booking: any) => ({
        user: 'Booking Confirmed',
        desc: `${booking.listing?.title || 'Room'} - ₹${booking.listing?.rent?.toLocaleString('en-IN') || '0'}`,
        time: getTimeAgo(booking.createdAt),
        icon: CalendarCheck,
        color: 'primary',
      })) || []),
  ]

  const topRooms = statsData?.topListings || []

  const maxRevenue = Math.max(
    ...monthlyData.map((d: any) => Math.max(d.revenue, d.target)),
    1,
  )

  // Helper function to format time ago
  function getTimeAgo(date: string) {
    const diff = Date.now() - new Date(date).getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return 'Just now'
    if (minutes < 60) return `${minutes} min ago`
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`
    return `${days} day${days > 1 ? 's' : ''} ago`
  }

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-[60vh]'>
        <div className='text-center'>
          <div className='w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4'></div>
          <p className='text-on-surface-variant font-medium'>
            Loading dashboard...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className='px-4 md:px-12 pt-4 pb-24'>
      {/* Header Section */}
      <header className='mb-3 md:mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4'>
        <div>
          <h2 className='text-xl font-headline font-bold text-on-surface mb-1'>
            System Overview
          </h2>
          <p className='text-on-surface-variant font-body text-sm leading-relaxed hidden md:block'>
            Monitor live platform trends, user activity and booking performance.
          </p>
        </div>
        <div className='flex flex-col sm:flex-row gap-3'>
          <select
            value={filterPeriod}
            onChange={(e) => setFilterPeriod(e.target.value)}
            className='bg-white border border-outline-variant/20 rounded-lg px-4 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer hover:border-primary/40 transition-all'
          >
            <option value='7days'>Last 7 days</option>
            <option value='30days'>Last 30 days</option>
            <option value='3months'>Last 3 months</option>
            <option value='year'>Last year</option>
          </select>
          <button
            onClick={handleExportCSV}
            disabled={
              exporting ||
              !statsData?.monthlyRevenue ||
              statsData.monthlyRevenue.length === 0
            }
            className='bg-primary text-on-primary px-5 py-2 rounded-xl font-bold text-sm hover:opacity-90 transition-all shadow-sm active:scale-95 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
          >
            {exporting ? (
              <>
                <div className='w-4 h-4 border-2 border-on-primary/30 border-t-on-primary rounded-full animate-spin' />
                <span className='hidden sm:inline'>Exporting...</span>
              </>
            ) : (
              <>
                <Download className='w-4 h-4' />
                <span className='hidden sm:inline'>Export Data</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* KPI Cards */}
      <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-3 md:mb-6'>
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon
          return (
            <div
              key={index}
              className='bg-white p-3 md:p-5 rounded-2xl border border-outline-variant/10 shadow-sm relative overflow-hidden group'
            >
              <div className='absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform'>
                <Icon className='w-12 h-12' />
              </div>
              <p className='text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2 md:mb-4'>
                {kpi.label}
              </p>
              <h3 className='text-3xl font-headline font-bold text-on-surface mb-2 tracking-tight'>
                {kpi.value}
              </h3>
              <div className='flex items-center gap-1.5 text-xs font-bold text-emerald-600'>
                <TrendingUp className='w-3 h-3' />
                <span>{kpi.trend}</span>
              </div>
            </div>
          )
        })}
      </section>

      {/* Growth Analytics & Live Stream */}
      <section className='grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-5 mb-3 md:mb-6'>
        {/* Growth Analytics Chart */}
        <div className='lg:col-span-8 bg-white p-3 md:p-6 rounded-3xl border border-outline-variant/10 shadow-sm'>
          <div className='flex flex-col md:flex-row md:items-center justify-between mb-4 md:mb-8'>
            <div>
              <h3 className='font-headline text-lg font-bold text-on-surface mb-1'>
                Growth Analytics
              </h3>
              <p className='text-xs text-on-surface-variant'>
                Monthly user engagement trends
              </p>
            </div>
            <div className='flex gap-2 mt-4 md:mt-0 bg-surface-container-lowest p-1 rounded-xl border border-outline-variant/10'>
              <button className='px-4 py-1.5 bg-white text-xs font-bold rounded-lg text-on-surface shadow-sm transition-all'>
                6M
              </button>
              <button className='px-4 py-1.5 text-on-surface-variant text-xs font-bold rounded-lg hover:bg-white/50 transition-all'>
                1Y
              </button>
            </div>
          </div>

          {/* Bar Chart */}
          <div className='h-64 flex items-end justify-between gap-3 px-2'>
            {monthlyData.map((data: any, index: any) => (
              <div
                key={index}
                className='flex-1 flex flex-col items-center gap-3 group'
              >
                <div className='w-full flex flex-col items-center justify-end h-48 relative'>
                  {/* Tooltip on hover */}
                  <div className='absolute -top-10 left-1/2 -translate-x-1/2 bg-on-surface text-surface text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none'>
                    ₹{data.revenue.toLocaleString()}
                  </div>

                  <div className='relative w-full group/bar'>
                    {/* Target bar (light) */}
                    <div
                      className='w-full bg-primary/10 rounded-t-xl transition-all h-48'
                      style={{
                        height: `${Math.min((data.target / maxRevenue) * 192, 192)}px`,
                      }}
                    >
                      {/* Revenue bar (dark) */}
                      <div
                        className='absolute bottom-0 w-full bg-primary rounded-t-xl transition-all group-hover:brightness-110'
                        style={{
                          height: `${(data.revenue / data.target) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
                <span className='text-[10px] font-bold text-on-surface-variant uppercase tracking-wider'>
                  {data.month}
                </span>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className='flex items-center justify-center gap-8 mt-8 pt-6 border-t border-outline-variant/10'>
            <div className='flex items-center gap-2'>
              <div className='w-3 h-1.5 bg-primary rounded-full'></div>
              <span className='text-xs font-bold text-on-surface-variant'>
                Revenue Achieved
              </span>
            </div>
            <div className='flex items-center gap-2'>
              <div className='w-3 h-1.5 bg-primary/20 rounded-full'></div>
              <span className='text-xs font-bold text-on-surface-variant'>
                Target Revenue
              </span>
            </div>
          </div>
        </div>

        {/* Live Stream */}
        <div className='lg:col-span-4 bg-white p-4 md:p-8 rounded-3xl border border-outline-variant/10 shadow-sm relative overflow-hidden'>
          <div className='flex items-center justify-between mb-4 md:mb-8'>
            <div>
              <h3 className='font-headline text-lg font-bold text-on-surface mb-1'>
                Live Stream
              </h3>
              <p className='text-xs text-on-surface-variant'>
                Platform activity feed
              </p>
            </div>
            <div className='flex items-center gap-2 px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100'>
              <div className='w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse'></div>
              <span className='text-[9px] font-black uppercase tracking-widest'>
                Live
              </span>
            </div>
          </div>

          <div className='space-y-6'>
            {recentActivity.map((activity, index) => {
              const Icon = activity.icon
              return (
                <div
                  key={index}
                  className='flex items-start gap-4 pb-6 border-b border-outline-variant/10 last:border-0 last:pb-0'
                >
                  <div
                    className={`w-10 h-10 rounded-2xl ${activity.color === 'primary' ? 'bg-primary/10 text-primary' : 'bg-tertiary/10 text-tertiary'} flex items-center justify-center shrink-0`}
                  >
                    <Icon className='w-5 h-5' />
                  </div>
                  <div className='flex-1 min-w-0'>
                    <p className='text-sm font-bold text-on-surface leading-snug'>
                      {activity.user}
                    </p>
                    <p className='text-xs text-on-surface-variant mt-1 leading-relaxed'>
                      {activity.desc}
                    </p>
                    <div className='flex items-center gap-1.5 mt-2 opacity-60'>
                      <Activity className='w-3 h-3 text-on-surface-variant' />
                      <span className='text-[10px] font-bold text-on-surface-variant uppercase'>
                        {activity.time}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <button className='w-full text-center mt-6 pt-6 border-t border-outline-variant/10 text-[10px] font-black text-primary uppercase tracking-widest hover:tracking-[0.15em] transition-all'>
            View Full Activity Log
          </button>
        </div>
      </section>

      {/* Top Performing Rooms */}
      <section className='bg-white rounded-3xl border border-outline-variant/10 shadow-sm p-4 md:p-8'>
        <div className='flex items-center justify-between mb-4 md:mb-8'>
          <div>
            <h3 className='font-headline text-lg font-bold text-on-surface mb-1'>
              Top Performing Rooms
            </h3>
            <p className='text-xs text-on-surface-variant'>
              Highest occupancy and revenue generators
            </p>
          </div>
          <button className='text-[10px] font-black text-primary uppercase tracking-widest hover:tracking-[0.1em] transition-all'>
            Manage Inventory
          </button>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {topRooms.map((room: any, index: any) => (
            <div
              key={index}
              className='group bg-surface-container-lowest rounded-2xl overflow-hidden border border-outline-variant/10 hover:shadow-xl hover:-translate-y-1 transition-all duration-300'
            >
              <div className='aspect-video overflow-hidden bg-surface-container relative'>
                <img
                  alt={room.name}
                  className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
                  src={room.image}
                />
                <div className='absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-black text-primary border border-primary/10'>
                  TOP RATED
                </div>
              </div>
              <div className='p-5'>
                <h4 className='font-headline font-bold text-on-surface text-base mb-3 group-hover:text-primary transition-colors'>
                  {room.name}
                </h4>
                <div className='flex items-center justify-between'>
                  <span className='text-base font-black text-on-surface'>
                    {room.price}
                  </span>
                  <div className='flex items-center gap-1.5 px-2.5 py-1 bg-tertiary/10 text-tertiary rounded-lg border border-tertiary/10'>
                    <TrendingUp className='w-3 h-3' />
                    <span className='text-[10px] font-black'>
                      {room.occupancy}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
