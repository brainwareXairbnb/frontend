'use client'

import { useState, useEffect } from 'react'
import { adminApi } from '@/lib/api'
import {
  Search,
  MapPin,
  Eye,
  CheckCircle2,
  X,
  AlertCircle,
  Loader2,
  Home,
  Users,
  IndianRupee,
  Calendar,
  Building2,
} from 'lucide-react'
import { format } from 'date-fns'
import { toast } from 'sonner'
import { ConfirmationModal } from '@/components/ConfirmationModal'
import { EmptyState } from '@/components/EmptyState'
import { AdminListingCard } from '@/components/admin/AdminListingCard'
import { Listing, ModalConfig, FilterStatus } from '@/lib/types'

export default function AdminListingsPage() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const [listings, setListings] = useState<Listing[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  // Stats
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
  })

  // Modal State
  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean
    type: 'success' | 'danger' | 'warning' | 'info'
    title: string
    message: string
    confirmText: string
    requiresInput: boolean
    listingId: string | null
  }>({
    isOpen: false,
    type: 'info',
    title: '',
    message: '',
    confirmText: 'Confirm',
    requiresInput: false,
    listingId: null,
  })

  useEffect(() => {
    fetchListings()
  }, [])

  const fetchListings = async () => {
    try {
      setLoading(true)
      // Fetch all listings (draft listings are already filtered out on server side)
      const response: any = await adminApi.getAllListings()
      const allListings = response.listings || []
      setListings(allListings)

      // Calculate stats - use 'under_review' instead of 'pending'
      const total = allListings.length
      const pending = allListings.filter(
        (l: Listing) => l.status === 'under_review',
      ).length
      const approved = allListings.filter(
        (l: Listing) => l.status === 'approved',
      ).length
      const rejected = allListings.filter(
        (l: Listing) => l.status === 'rejected',
      ).length

      setStats({ total, pending, approved, rejected })
    } catch (error: any) {
      toast.error('Failed to load listings', { description: error.message })
    } finally {
      setLoading(false)
    }
  }

  const handleApproveClick = (listingId: string, listingTitle: string) => {
    setModalConfig({
      isOpen: true,
      type: 'success',
      title: 'Approve Listing',
      message: `Are you sure you want to approve "${listingTitle}"? This will make it visible to all students.`,
      confirmText: 'Approve Listing',
      requiresInput: false,
      listingId,
    })
  }

  const handleRejectClick = (listingId: string, listingTitle: string) => {
    setModalConfig({
      isOpen: true,
      type: 'danger',
      title: 'Reject Listing',
      message: `Please provide a reason for rejecting "${listingTitle}". This message will be sent to the owner.`,
      confirmText: 'Reject Listing',
      requiresInput: true,
      listingId,
    })
  }

  const handleConfirmAction = async (inputValue?: string) => {
    if (!modalConfig.listingId) return

    try {
      setActionLoading(modalConfig.listingId)

      if (modalConfig.type === 'success') {
        // Approve listing
        await adminApi.approveListing(modalConfig.listingId)
        toast.success('Listing Approved', {
          description: 'Property is now visible to students',
        })
        setListings((prev) =>
          prev.map((l) =>
            l._id === modalConfig.listingId ? { ...l, status: 'approved' } : l,
          ),
        )
        setStats((prev) => ({
          ...prev,
          pending: Math.max(0, prev.pending - 1),
          approved: prev.approved + 1,
        }))
      } else if (modalConfig.type === 'danger') {
        // Reject listing
        await adminApi.rejectListing(
          modalConfig.listingId,
          inputValue || 'No reason provided',
        )
        toast.warning('Listing Rejected', {
          description: 'Owner has been notified',
        })
        setListings((prev) =>
          prev.map((l) =>
            l._id === modalConfig.listingId ? { ...l, status: 'rejected' } : l,
          ),
        )
        setStats((prev) => ({
          ...prev,
          pending: Math.max(0, prev.pending - 1),
          rejected: prev.rejected + 1,
        }))
      }

      setModalConfig((prev) => ({ ...prev, isOpen: false }))
      await fetchListings() // Refresh data
    } catch (error: any) {
      toast.error('Action Failed', {
        description: error.message || 'Could not process request',
      })
    } finally {
      setActionLoading(null)
    }
  }



  // Filter listings based on active filter and search query
  const filteredListings = listings.filter((listing) => {
    // Map 'pending' filter to 'under_review' status
    const statusToMatch =
      activeFilter === 'pending' ? 'under_review' : activeFilter

    const matchesFilter =
      activeFilter === 'all' || listing.status?.toLowerCase() === statusToMatch

    const matchesSearch =
      searchQuery === '' ||
      listing.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.owner?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.address?.city?.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesFilter && matchesSearch
  })

  return (
    <div className='px-4 sm:px-6 lg:px-8 py-6 pb-24 md:pb-8 max-w-[1600px] mx-auto'>
      <ConfirmationModal
        isOpen={modalConfig.isOpen}
        onClose={() => setModalConfig((prev) => ({ ...prev, isOpen: false }))}
        onConfirm={handleConfirmAction}
        title={modalConfig.title}
        message={modalConfig.message}
        type={modalConfig.type}
        requiresInput={modalConfig.requiresInput}
        confirmText={modalConfig.confirmText}
        inputPlaceholder='Reason for rejection...'
        inputLabel='Rejection Reason'
      />

      {/* Stats Cards */}
      <section className='grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6'>
        {[
          {
            label: 'Total',
            value: stats.total,
            icon: Building2,
            color: 'text-blue-600',
            bg: 'bg-blue-50',
            border: 'border-blue-100',
          },
          {
            label: 'Pending',
            value: stats.pending,
            icon: AlertCircle,
            color: 'text-orange-600',
            bg: 'bg-orange-50',
            border: 'border-orange-100',
          },
          {
            label: 'Approved',
            value: stats.approved,
            icon: CheckCircle2,
            color: 'text-emerald-600',
            bg: 'bg-emerald-50',
            border: 'border-emerald-100',
          },
          {
            label: 'Rejected',
            value: stats.rejected,
            icon: X,
            color: 'text-red-600',
            bg: 'bg-red-50',
            border: 'border-red-100',
          },
        ].map((stat, index) => (
          <div
            key={index}
            className={`bg-white p-4 sm:p-5 rounded-2xl border ${stat.border} shadow-sm hover:shadow-md transition-shadow`}
          >
            <div className='flex items-center justify-between mb-3'>
              <div className={`p-2.5 rounded-xl ${stat.bg}`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
            </div>
            <h3 className='text-2xl sm:text-3xl font-bold text-on-surface mb-1'>
              {stat.value}
            </h3>
            <p className='text-xs font-bold uppercase tracking-wider text-on-surface-variant'>
              {stat.label}
            </p>
          </div>
        ))}
      </section>

      {/* Search and Filters */}
      <div className='mb-6 space-y-4'>
        {/* Search Bar */}
        <div className='bg-white border-2 border-outline-variant/10 rounded-2xl px-4 py-3.5 flex items-center gap-3 shadow-sm focus-within:border-primary focus-within:shadow-md transition-all'>
          <Search className='text-on-surface-variant w-5 h-5 shrink-0' />
          <input
            type='text'
            placeholder='Search by title, owner, or city...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='flex-1 bg-transparent border-none focus:outline-none text-sm placeholder:text-on-surface-variant/50'
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className='p-1 hover:bg-surface-container rounded-full transition-colors'
            >
              <X className='w-4 h-4 text-on-surface-variant' />
            </button>
          )}
        </div>

        {/* Filter Tabs */}
        <div className='flex gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-hide'>
          {[
            { key: 'all', label: 'All', count: stats.total },
            { key: 'pending', label: 'Pending', count: stats.pending },
            { key: 'approved', label: 'Approved', count: stats.approved },
            { key: 'rejected', label: 'Rejected', count: stats.rejected },
          ].map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                activeFilter === filter.key
                  ? 'bg-primary text-on-primary shadow-lg shadow-primary/25'
                  : 'bg-white border-2 border-outline-variant/10 text-on-surface-variant hover:bg-surface-container-lowest hover:border-primary/20'
              }`}
            >
              <span>{filter.label}</span>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-black min-w-[24px] text-center ${
                  activeFilter === filter.key
                    ? 'bg-on-primary/20 text-on-primary'
                    : 'bg-surface-container text-on-surface-variant'
                }`}
              >
                {filter.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className='h-96 flex flex-col items-center justify-center gap-4'>
          <Loader2 className='w-10 h-10 animate-spin text-primary' />
          <p className='text-sm text-on-surface-variant font-medium'>
            Loading listings...
          </p>
        </div>
      ) : filteredListings.length === 0 ? (
        <EmptyState
          icon={Home}
          title='No Listings Found'
          message={
            searchQuery
              ? 'No listings match your search criteria'
              : `No ${activeFilter === 'all' ? '' : activeFilter} listings found in the system.`
          }
        />
      ) : (
        <>
          {/* Listings Grid */}
          <section className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6'>
            {filteredListings.map((listing) => (
              <AdminListingCard
                key={listing._id}
                listing={listing}
                handleApproveClick={handleApproveClick}
                handleRejectClick={handleRejectClick}
                actionLoading={actionLoading}
              />
            ))}
          </section>
        </>
      )}
    </div>
  )
}
