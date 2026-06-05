'use client'

import { useState, useEffect } from 'react'
import {
  Search,
  Filter,
  ArrowUpDown,
  Home,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  User,
  Building2,
  FileText,
  Loader2,
  AlertCircle,
  IndianRupee,
  Eye,
} from 'lucide-react'
import { adminApi } from '@/lib/api'
import { toast } from 'sonner'
import { format, addMonths } from 'date-fns'
import { EmptyState } from '@/components/EmptyState'
import { Button } from '@/components/ui/button'

export default function AdminBookingsPage() {
  const [activeView, setActiveView] = useState('list')
  const [loading, setLoading] = useState(true)
  const [bookings, setBookings] = useState<any[]>([])
  const [pagination, setPagination] = useState<any>(null)
  const [statusFilter, setStatusFilter] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(1)
  const [stats, setStats] = useState<any>(null)

  useEffect(() => {
    fetchAnalytics()
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchBookings()
    }, 500)
    return () => clearTimeout(timer)
  }, [statusFilter, searchQuery, page])

  const fetchAnalytics = async () => {
    try {
      const response = await adminApi.getAnalytics()
      setStats(response.bookings)
    } catch (error: any) {
      console.error('Failed to load analytics:', error)
    }
  }

  const fetchBookings = async () => {
    try {
      setLoading(true)
      const response = await adminApi.getBookings({
        status: statusFilter || undefined,
        page,
        limit: 10,
      })
      setBookings(response.bookings)
      setPagination(response.pagination)
    } catch (error: any) {
      toast.error('Failed to load bookings', { description: error.message })
    } finally {
      setLoading(false)
    }
  }

  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'pending':
        return {
          label: 'Reviewing',
          color: 'bg-orange-50 text-orange-600 border-orange-100',
        }
      case 'accepted':
        return {
          label: 'Confirmed',
          color: 'bg-emerald-50 text-emerald-600 border-emerald-100',
        }
      case 'rejected':
        return {
          label: 'Rejected',
          color: 'bg-red-50 text-red-600 border-red-100',
        }
      case 'cancelled':
        return {
          label: 'Cancelled',
          color: 'bg-gray-50 text-gray-600 border-gray-100',
        }
      case 'payment_confirmed':
        return {
          label: 'Paid',
          color: 'bg-blue-50 text-blue-600 border-blue-100',
        }
      case 'completed':
        return {
          label: 'Finished',
          color: 'bg-emerald-50 text-emerald-600 border-emerald-100',
        }
      default:
        return {
          label: status,
          color: 'bg-gray-50 text-gray-600 border-gray-100',
        }
    }
  }

  const calculateMoveOut = (moveIn: string, months: number) => {
    try {
      return format(addMonths(new Date(moveIn), months), 'MMM dd, yyyy')
    } catch (e) {
      return 'N/A'
    }
  }

  if (loading && bookings.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center min-h-[60vh] gap-4'>
        <Loader2 className='w-10 h-10 text-primary animate-spin' />
        <p className='text-[10px] font-black tracking-[0.2em] text-on-surface-variant opacity-40'>
          Loading platform bookings...
        </p>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-[#fafafa] px-4 sm:px-6 lg:px-8 pt-4 pb-24'>
      {/* Header */}
      <header className='mb-3 md:mb-6'>
        <div className='flex items-center gap-2 mb-2'>
          <div className='w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center'>
            <Calendar className='w-4 h-4 text-primary' />
          </div>

          <span className='text-xs font-semibold tracking-wide text-primary uppercase'>
            Booking Overview
          </span>
        </div>

        <div className='flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4'>
          <div>
            <h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-on-surface'>
              Booking Management
            </h1>

            <p className='mt-2 text-sm text-on-surface-variant max-w-2xl leading-relaxed hidden md:block'>
              Manage reservations, payment statuses, tenants, and property
              bookings across the platform.
            </p>
          </div>
        </div>
      </header>

      {/* Stats */}
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4 md:mb-6'>
        <div className='bg-white rounded-2xl border border-outline-variant/10 p-3 md:p-4 shadow-sm'>
          <p className='text-xs text-on-surface-variant mb-1.5'>Total Bookings</p>
          <h3 className='text-2xl font-bold'>{stats?.total || 0}</h3>
        </div>

        <div className='bg-white rounded-2xl border border-outline-variant/10 p-3 md:p-4 shadow-sm'>
          <p className='text-xs text-on-surface-variant mb-1.5'>Confirmed</p>
          <h3 className='text-2xl font-bold text-blue-600'>
            {stats?.paymentConfirmed || 0}
          </h3>
        </div>

        <div className='bg-white rounded-2xl border border-outline-variant/10 p-3 md:p-4 shadow-sm'>
          <p className='text-xs text-on-surface-variant mb-1.5'>Pending</p>
          <h3 className='text-2xl font-bold text-amber-500'>
            {bookings.filter((b) => b.status === 'pending').length}
          </h3>
        </div>

        <div className='bg-white rounded-2xl border border-outline-variant/10 p-3 md:p-4 shadow-sm'>
          <p className='text-xs text-on-surface-variant mb-1.5'>Completed</p>
          <h3 className='text-2xl font-bold text-emerald-600'>
            {stats?.completed || 0}
          </h3>
        </div>
      </div>

      {/* Filters */}
      <div className='sticky top-0 z-20 bg-[#fafafa]/90 backdrop-blur-xl pb-4 mb-6'>
        <div className='flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between'>
          {/* Search */}
          <div className='relative flex-1 max-w-xl'>
            <Search className='absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/50' />

            <input
              type='text'
              placeholder='Search bookings...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='w-full h-12 pl-11 pr-4 rounded-xl border border-outline-variant/20 bg-white text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20'
            />
          </div>

          {/* Actions */}
          <div className='flex gap-3 w-full lg:w-auto'>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value)
                setPage(1)
              }}
              className='h-12 px-4 rounded-xl border border-outline-variant/20 bg-white text-sm shadow-sm flex-1 lg:flex-none focus:outline-none'
            >
              <option value=''>All Status</option>
              <option value='pending'>Reviewing</option>
              <option value='accepted'>Confirmed</option>
              <option value='payment_confirmed'>Paid</option>
              <option value='completed'>Finished</option>
              <option value='rejected'>Rejected</option>
              <option value='cancelled'>Cancelled</option>
            </select>

            <Button
              onClick={fetchBookings}
              className='h-12 px-5 rounded-xl shadow-sm'
            >
              Refresh
            </Button>
          </div>
        </div>
      </div>

      {/* Booking List */}
      <section className='space-y-4'>
        {bookings.length === 0 ? (
          <EmptyState
            icon={FileText}
            title='No Bookings Found'
            message={
              statusFilter
                ? `No ${getStatusDisplay(
                    statusFilter,
                  ).label.toLowerCase()} bookings found.`
                : 'There are no bookings yet.'
            }
          />
        ) : (
          bookings.map((booking) => {
            const status = getStatusDisplay(booking.status)

            return (
              <div
                key={booking._id}
                className='group bg-white rounded-2xl border border-outline-variant/10 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden'
              >
                <div className='p-4 sm:p-5 lg:p-6 flex flex-col xl:flex-row gap-5'>
                  {/* Image */}
                  <div className='relative w-full xl:w-52 h-52 sm:h-60 xl:h-44 rounded-2xl overflow-hidden bg-surface-container shrink-0'>
                    {booking.isPaid && (
                      <div className='absolute top-3 left-3 z-10 bg-emerald-500 text-white px-3 py-1 rounded-full text-[11px] font-medium shadow-sm flex items-center gap-1'>
                        <IndianRupee className='w-3 h-3' />
                        Paid
                      </div>
                    )}

                    <img
                      src={
                        booking.listing?.photos?.[0] ||
                        `https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400`
                      }
                      alt={booking.listing?.title || 'Property'}
                      className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
                    />
                  </div>

                  {/* Content */}
                  <div className='flex-1 flex flex-col justify-between'>
                    {/* Top */}
                    <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'>
                      {/* Property */}
                      <div>
                        <p className='text-xs uppercase tracking-wide text-on-surface-variant mb-2'>
                          Booking ID
                        </p>

                        <h3 className='text-lg font-bold mb-3'>
                          #{booking._id.substring(18).toUpperCase()}
                        </h3>

                        <div className='flex items-start gap-3'>
                          <div className='w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center shrink-0'>
                            <Home className='w-4 h-4 text-on-surface-variant' />
                          </div>

                          <div>
                            <p className='font-semibold text-sm leading-snug'>
                              {booking.listing?.title || 'Unknown Property'}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* People */}
                      <div>
                        <p className='text-xs uppercase tracking-wide text-on-surface-variant mb-3'>
                          People
                        </p>

                        <div className='space-y-4'>
                          <div className='flex items-center gap-3'>
                            <div className='w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center'>
                              <User className='w-4 h-4 text-primary' />
                            </div>

                            <div>
                              <p className='text-sm font-semibold'>
                                {booking.student?.name || 'Guest'}
                              </p>

                              <p className='text-xs text-on-surface-variant'>
                                Student
                              </p>
                            </div>
                          </div>

                          <div className='flex items-center gap-3'>
                            <div className='w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center'>
                              <Building2 className='w-4 h-4 text-on-surface-variant' />
                            </div>

                            <div>
                              <p className='text-sm font-semibold'>
                                {booking.owner?.name || 'Partner'}
                              </p>

                              <p className='text-xs text-on-surface-variant'>
                                Property Owner
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Stay */}
                      <div>
                        <p className='text-xs uppercase tracking-wide text-on-surface-variant mb-3'>
                          Stay Details
                        </p>

                        <div className='space-y-3'>
                          <div className='flex items-center gap-3'>
                            <Calendar className='w-4 h-4 text-on-surface-variant' />

                            <span className='text-sm font-medium'>
                              {format(
                                new Date(booking.moveInDate),
                                'MMM dd, yyyy',
                              )}
                            </span>
                          </div>

                          <div className='flex items-center gap-3'>
                            <Clock className='w-4 h-4 text-primary' />

                            <span className='text-sm font-medium text-primary'>
                              {booking.durationMonths} Months
                            </span>
                          </div>

                          <div className='flex items-center gap-3'>
                            <Calendar className='w-4 h-4 text-on-surface-variant' />

                            <span className='text-sm text-on-surface-variant'>
                              {calculateMoveOut(
                                booking.moveInDate,
                                booking.durationMonths,
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom */}
                    <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6 pt-5 border-t border-outline-variant/10'>
                      {/* Status */}
                      <div>
                        <span
                          className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium ${status.color}`}
                        >
                          <span className='w-2 h-2 rounded-full bg-current mr-2 opacity-70' />
                          {status.label}
                        </span>
                      </div>

                      {/* Actions */}
                      <div className='flex gap-2 w-full sm:w-auto'>
                        <Button
                          variant='outline'
                          className='flex-1 sm:flex-none h-11 px-5 rounded-xl border-outline-variant/20'
                        >
                          <Eye className='w-4 h-4 mr-2' />
                          View Details
                        </Button>

                        {/* <Button
                          variant='outline'
                          size='icon'
                          className='h-11 w-11 rounded-2xl border-outline-variant/20'
                        >
                          <MoreVertical className='w-4 h-4' />
                        </Button> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        )}
      </section>

      {/* Pagination */}
      {pagination && pagination.pages > 1 && (
        <div className='mt-8 bg-white rounded-2xl border border-outline-variant/10 shadow-sm p-4 sm:p-5'>
          <div className='flex flex-col sm:flex-row items-center justify-between gap-4'>
            <p className='text-sm text-on-surface-variant'>
              Showing{' '}
              <span className='font-semibold text-on-surface'>
                {(page - 1) * 10 + 1}
              </span>{' '}
              to{' '}
              <span className='font-semibold text-on-surface'>
                {Math.min(page * 10, pagination.total)}
              </span>{' '}
              of{' '}
              <span className='font-semibold text-on-surface'>
                {pagination.total}
              </span>{' '}
              bookings
            </p>

            <div className='flex items-center gap-2 overflow-x-auto no-scrollbar'>
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className='min-w-[40px] h-10 rounded-xl border border-outline-variant/10 bg-white flex items-center justify-center hover:bg-surface-container transition-all disabled:opacity-40'
              >
                <ChevronLeft className='w-4 h-4' />
              </button>

              {[...Array(pagination.pages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`min-w-[40px] h-10 rounded-xl text-sm font-medium transition-all ${
                    page === i + 1
                      ? 'bg-primary text-white shadow-sm'
                      : 'border border-outline-variant/10 bg-white hover:bg-surface-container'
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                disabled={page === pagination.pages}
                onClick={() =>
                  setPage((p) => Math.min(pagination.pages, p + 1))
                }
                className='min-w-[40px] h-10 rounded-xl border border-outline-variant/10 bg-white flex items-center justify-center hover:bg-surface-container transition-all disabled:opacity-40'
              >
                <ChevronRight className='w-4 h-4' />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
