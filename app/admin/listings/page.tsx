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
import AdminListingsSkeleton from '@/components/skeletons/AdminListingsSkeleton'

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
    action?: 'approve' | 'reject' | 'delete' | 'unlist' | 'relist'
  }>({
    isOpen: false,
    type: 'info',
    title: '',
    message: '',
    confirmText: 'Confirm',
    requiresInput: false,
    listingId: null,
    action: undefined,
  })

  useEffect(() => {
    fetchListings()
  }, [])

  const fetchListings = async () => {
    try {
      setLoading(true)
      // Fetch all listings (draft listings are already filtered out on server side)
      const response = await adminApi.getAllListings()
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
      action: 'approve',
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
      action: 'reject',
    })
  }

  const handleDeleteClick = (listingId: string, listingTitle: string) => {
    setModalConfig({
      isOpen: true,
      type: 'danger',
      title: 'Delete Listing',
      message: `Are you sure you want to permanently delete "${listingTitle}"? This action cannot be undone. Note: Listings with active bookings cannot be deleted.`,
      confirmText: 'Delete Listing',
      requiresInput: false,
      listingId,
      action: 'delete',
    })
  }

  const handleUnlistClick = (listingId: string, listingTitle: string) => {
    setModalConfig({
      isOpen: true,
      type: 'warning',
      title: 'Unlist Listing',
      message: `Are you sure you want to unlist "${listingTitle}"? This will hide it from students but keep it in the system.`,
      confirmText: 'Unlist',
      requiresInput: false,
      listingId,
      action: 'unlist',
    })
  }

  const handleRelistClick = (listingId: string, listingTitle: string) => {
    setModalConfig({
      isOpen: true,
      type: 'success',
      title: 'Re-list Listing',
      message: `Are you sure you want to re-list "${listingTitle}"? This will make it visible to students again.`,
      confirmText: 'Re-list',
      requiresInput: false,
      listingId,
      action: 'relist',
    })
  }

  const handleConfirmAction = async (inputValue?: string) => {
    if (!modalConfig.listingId) return

    try {
      setActionLoading(modalConfig.listingId)

      switch (modalConfig.action) {
        case 'approve':
          await adminApi.approveListing(modalConfig.listingId)
          toast.success('Listing Approved', {
            description: 'Property is now visible to students',
          })
          setListings((prev) =>
            prev.map((l) =>
              l._id === modalConfig.listingId
                ? { ...l, status: 'approved' }
                : l,
            ),
          )
          setStats((prev) => ({
            ...prev,
            pending: Math.max(0, prev.pending - 1),
            approved: prev.approved + 1,
          }))
          break

        case 'reject':
          await adminApi.rejectListing(
            modalConfig.listingId,
            inputValue || 'No reason provided',
          )
          toast.warning('Listing Rejected', {
            description: 'Owner has been notified',
          })
          setListings((prev) =>
            prev.map((l) =>
              l._id === modalConfig.listingId
                ? { ...l, status: 'rejected' }
                : l,
            ),
          )
          setStats((prev) => ({
            ...prev,
            pending: Math.max(0, prev.pending - 1),
            rejected: prev.rejected + 1,
          }))
          break

        case 'delete':
          await adminApi.deleteListing(modalConfig.listingId)
          toast.success('Listing Deleted', {
            description: 'Listing has been permanently removed',
          })
          setListings((prev) =>
            prev.filter((l) => l._id !== modalConfig.listingId),
          )
          setStats((prev) => ({
            ...prev,
            total: prev.total - 1,
          }))
          break

        case 'unlist':
          await adminApi.unlistListing(modalConfig.listingId)
          toast.success('Listing Unlisted', {
            description: 'Listing is now hidden from students',
          })
          setListings((prev) =>
            prev.map((l) =>
              l._id === modalConfig.listingId
                ? { ...l, isAvailable: false, status: 'rejected' }
                : l,
            ),
          )
          break

        case 'relist':
          await adminApi.relistListing(modalConfig.listingId)
          toast.success('Listing Re-listed', {
            description: 'Listing is now visible to students again',
          })
          setListings((prev) =>
            prev.map((l) =>
              l._id === modalConfig.listingId
                ? { ...l, isAvailable: true, status: 'approved' }
                : l,
            ),
          )
          break

        default:
          break
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

  if (loading) {
    return <AdminListingsSkeleton />
  }

  return (
    <div className='px-4 sm:px-6 lg:px-8 pt-4 pb-24 md:pb-8 bg-gray-50 min-h-screen'>
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

      {/* Header Section */}
      <header className='mb-3 md:mb-6'>
        <h1 className='text-2xl sm:text-3xl font-bold text-gray-900 mb-1 md:mb-2'>
          Listing Approval
        </h1>
        <p className='text-sm text-gray-600 hidden sm:block'>
          Review and manage property listings submitted by owners
        </p>
      </header>

      {/* Stats Cards */}
      <section className='grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-6'>
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
            className='bg-white p-3 sm:p-5 rounded border border-gray-200 shadow-sm hover:shadow-md transition-shadow'
          >
            <div className='flex items-center justify-between mb-2 md:mb-4'>
              <div
                className={`w-10 h-10 md:w-12 md:h-12 rounded-lg ${stat.bg} flex items-center justify-center shrink-0`}
              >
                <stat.icon className={`w-5 h-5 md:w-6 md:h-6 ${stat.color}`} />
              </div>
            </div>
            <p className='text-[10px] md:text-xs font-medium text-gray-500 uppercase mb-1'>
              {stat.label}
            </p>
            <h3 className='text-xl sm:text-3xl font-bold text-gray-900'>
              {stat.value}
            </h3>
          </div>
        ))}
      </section>

      {/* Search and Filters */}
      <div className='mb-4 md:mb-6 flex flex-col gap-2 md:gap-3'>
        {/* Search Bar */}
        <div className='relative'>
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
          <input
            type='text'
            placeholder='Search by title, owner, or city...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='w-full h-11 bg-white border border-gray-300 rounded-lg pl-10 pr-4 text-sm text-gray-900 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition-all placeholder:text-gray-400'
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className='absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors'
            >
              <X className='w-4 h-4 text-gray-400' />
            </button>
          )}
        </div>

        {/* Filter Tabs */}
        <div className='flex gap-2 overflow-x-auto pb-2 scrollbar-hide'>
          {[
            { key: 'all', label: 'All', count: stats.total },
            { key: 'pending', label: 'Pending', count: stats.pending },
            { key: 'approved', label: 'Approved', count: stats.approved },
            { key: 'rejected', label: 'Rejected', count: stats.rejected },
          ].map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`h-9 px-4 rounded-lg text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-2 ${
                activeFilter === filter.key
                  ? 'bg-gray-900 text-white shadow-sm'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span>{filter.label}</span>
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                  activeFilter === filter.key
                    ? 'bg-white/20 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {filter.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {filteredListings.length === 0 ? (
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
                handleDeleteClick={handleDeleteClick}
                handleUnlistClick={handleUnlistClick}
                handleRelistClick={handleRelistClick}
                actionLoading={actionLoading}
              />
            ))}
          </section>
        </>
      )}
    </div>
  )
}
