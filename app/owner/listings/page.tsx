'use client'

import { useState, useEffect } from 'react'
import CreateListingDrawer from '@/components/CreateListingDrawer'
import OwnerListingCard from '@/components/owner/OwnerListingCard'
import { ConfirmationModal } from '@/components/ConfirmationModal'
import { roomsApi } from '@/lib/api'
import { toast } from 'sonner'
import {
  Search,
  Filter,
  Plus,
  Star,
  Activity,
  Loader2,
  Eye,
  Building2,
  ChevronDown,
  Check,
  X,
  RotateCcw,
} from 'lucide-react'
import { Listing } from '@/lib/types'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export default function OwnerListingsPage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [listings, setListings] = useState<Listing[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [editingListing, setEditingListing] = useState<Listing | null>(null)
  const [viewMode, setViewMode] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [listingToDelete, setListingToDelete] = useState<string | null>(null)

  useEffect(() => {
    fetchListings()
  }, [])

  const fetchListings = async () => {
    try {
      setLoading(true)
      const response: any = await roomsApi.getOwnerListings()
      setListings(response.listings || [])
    } catch (error: any) {
      toast.error('Failed to load listings', { description: error.message })
    } finally {
      setLoading(false)
    }
  }

  const handleToggleAvailability = async (
    listingId: string,
    currentStatus: boolean,
  ) => {
    try {
      await roomsApi.updateListing(listingId, { isAvailable: !currentStatus })
      toast.success('Availability updated')
      setListings((prev) =>
        prev.map((l) =>
          l._id === listingId ? { ...l, isAvailable: !currentStatus } : l,
        ),
      )
    } catch (error: any) {
      toast.error('Failed to update availability', {
        description: error.message,
      })
    }
  }

  const handleDeleteListing = (listingId: string) => {
    setListingToDelete(listingId)
    setDeleteModalOpen(true)
  }

  const confirmDelete = async () => {
    if (!listingToDelete) return

    await roomsApi.deleteListing(listingToDelete)
    toast.success('Listing deleted successfully')
    setListings((prev) => prev.filter((l) => l._id !== listingToDelete))
    setListingToDelete(null)
  }

  const handleEditListing = (listing: Listing) => {
    setEditingListing(listing)
    setViewMode(false)
    setIsDrawerOpen(true)
  }

  const handleViewListing = (listing: Listing) => {
    setEditingListing(listing)
    setViewMode(true)
    setIsDrawerOpen(true)
  }

  const handleDrawerClose = (open: boolean) => {
    setIsDrawerOpen(open)
    if (!open) {
      setEditingListing(null)
      setViewMode(false)
    }
  }

  const filteredListings = listings.filter((listing) => {
    const matchesSearch =
      listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.address?.city?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter =
      filterStatus === 'all' || listing.status.toLowerCase() === filterStatus
    return matchesSearch && matchesFilter
  })

  const statsData = {
    totalListings: listings.length,
    approved: listings.filter((l) => l.status === 'approved').length,
    totalViews: listings.reduce((sum, l) => sum + (l.viewCount || 0), 0),
    avgRating:
      listings.length > 0
        ? (
            listings.reduce((sum, l) => sum + (l.avgRating || 0), 0) /
            listings.length
          ).toFixed(1)
        : '0.0',
  }

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <Loader2 className='w-8 h-8 animate-spin text-primary' />
      </div>
    )
  }

  return (
    <>
      <div className='px-6 md:px-12 pb-20'>
        {/* Header Section */}
        <header className='py-10'>
          <div className='max-w-3xl mb-10'>
            <h2 className='text-xl font-headline font-black text-on-surface mb-2 uppercase tracking-wide'>
              Property Ecosystem
            </h2>
            <p className='text-on-surface-variant font-body text-base leading-relaxed font-medium'>
              Review and curate your collection of managed properties.
              Orchestrate status cycles, deployment availability, and
              high-fidelity editorial details.
            </p>
          </div>
          <div className='flex flex-col gap-4'>
            {/* Search Bar - Full Width on Mobile */}
            <div className='w-full bg-white border border-outline-variant/10 rounded-2xl px-4 sm:px-5 py-3 sm:py-4 flex items-center gap-3 shadow-sm focus-within:border-primary transition-all'>
              <Search className='text-on-surface-variant/40 w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0' />
              <input
                className='flex-1 bg-transparent border-none focus:ring-0 text-sm font-bold outline-none placeholder:text-on-surface-variant/30 focus:outline-none'
                placeholder='Search by name or location...'
                type='text'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Action Buttons Row - Responsive */}
            <div className='flex flex-wrap gap-2 sm:gap-3'>
              {/* Status Filter Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className='h-10 sm:h-12 px-3 sm:px-4 border rounded transition-all flex items-center gap-2 shadow-sm text-on-surface font-black uppercase tracking-widest text-[9px] sm:text-[10px] bg-white border-outline-variant/10 hover:bg-surface-container-low flex-shrink-0'>
                    <Filter className='w-3.5 h-3.5 sm:w-4 sm:h-4' />
                    <span className='hidden sm:inline'>
                      {filterStatus === 'all'
                        ? 'All Status'
                        : filterStatus === 'draft'
                          ? 'Draft'
                          : filterStatus === 'under_review'
                            ? 'Under Review'
                            : filterStatus === 'approved'
                              ? 'Approved'
                              : filterStatus === 'rejected'
                                ? 'Rejected'
                                : 'All Status'}
                    </span>
                    <span className='sm:hidden'>
                      {filterStatus === 'all'
                        ? 'All'
                        : filterStatus === 'draft'
                          ? 'Draft'
                          : filterStatus === 'under_review'
                            ? 'Review'
                            : filterStatus === 'approved'
                              ? 'Approved'
                              : filterStatus === 'rejected'
                                ? 'Rejected'
                                : 'All'}
                    </span>
                    <ChevronDown className='w-3 h-3' />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align='end'
                  className='w-48 bg-white border border-outline-variant/10 rounded shadow-lg p-1'
                >
                  <DropdownMenuItem
                    onClick={() => setFilterStatus('all')}
                    className='cursor-pointer px-3 py-2.5 rounded-lg hover:bg-surface-container-low transition-colors flex items-center justify-between'
                  >
                    <span className='text-sm font-bold'>All Status</span>
                    {filterStatus === 'all' && (
                      <Check className='w-4 h-4 text-primary' />
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setFilterStatus('draft')}
                    className='cursor-pointer px-3 py-2.5 rounded-lg hover:bg-surface-container-low transition-colors flex items-center justify-between'
                  >
                    <span className='text-sm font-bold'>Draft</span>
                    {filterStatus === 'draft' && (
                      <Check className='w-4 h-4 text-primary' />
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setFilterStatus('under_review')}
                    className='cursor-pointer px-3 py-2.5 rounded-lg hover:bg-surface-container-low transition-colors flex items-center justify-between'
                  >
                    <span className='text-sm font-bold'>Under Review</span>
                    {filterStatus === 'under_review' && (
                      <Check className='w-4 h-4 text-primary' />
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setFilterStatus('approved')}
                    className='cursor-pointer px-3 py-2.5 rounded-lg hover:bg-surface-container-low transition-colors flex items-center justify-between'
                  >
                    <span className='text-sm font-bold'>Approved</span>
                    {filterStatus === 'approved' && (
                      <Check className='w-4 h-4 text-primary' />
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setFilterStatus('rejected')}
                    className='cursor-pointer px-3 py-2.5 rounded-lg hover:bg-surface-container-low transition-colors flex items-center justify-between'
                  >
                    <span className='text-sm font-bold'>Rejected</span>
                    {filterStatus === 'rejected' && (
                      <Check className='w-4 h-4 text-primary' />
                    )}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Reset Filter Button - Show when filters are active */}
              {(filterStatus !== 'all' || searchQuery) && (
                <button
                  onClick={() => {
                    setFilterStatus('all')
                    setSearchQuery('')
                  }}
                  className='h-10 sm:h-12 px-3 sm:px-4 border rounded-xl transition-all flex items-center gap-2 shadow-sm text-on-surface-variant font-black uppercase tracking-widest text-[9px] sm:text-[10px] bg-white border-outline-variant/10 hover:bg-orange-50 hover:border-orange-200 hover:text-orange-600 flex-shrink-0'
                  title='Reset all filters'
                >
                  <RotateCcw className='w-3.5 h-3.5 sm:w-4 sm:h-4' />
                  <span className='hidden sm:inline'>Reset</span>
                </button>
              )}

              {/* Spacer */}
              <div className='flex-1 hidden sm:block' />

              {/* Create New Listing Button */}
              <button
                onClick={() => setIsDrawerOpen(true)}
                className='flex-1 sm:flex-none h-10 sm:h-12 bg-primary text-on-primary px-4 sm:px-6 rounded font-black text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] hover:brightness-110 transition-all flex items-center justify-center gap-2 sm:gap-3 shadow-xl shadow-primary/20 active:scale-95 whitespace-nowrap'
              >
                <Plus className='w-4 h-4 sm:w-5 sm:h-5' />
                <span className='hidden sm:inline'>Create New Listing</span>
                <span className='sm:hidden'>New Listing</span>
              </button>
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <section className='grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-10'>
          <div className='bg-white p-4 md:p-6 rounded border border-outline-variant/10 shadow-sm'>
            <div className='flex items-center gap-2 mb-2'>
              <Building2 className='w-4 h-4 md:w-5 md:h-5 text-on-surface-variant/40' />
              <p className='text-[9px] md:text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60'>
                Total
              </p>
            </div>
            <p className='text-2xl md:text-3xl font-headline font-black text-on-surface'>
              {statsData.totalListings}
            </p>
          </div>
          <div className='bg-white p-4 md:p-6 rounded border border-outline-variant/10 shadow-sm'>
            <div className='flex items-center gap-2 mb-2'>
              <Activity className='w-4 h-4 md:w-5 md:h-5 text-emerald-600/60' />
              <p className='text-[9px] md:text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60'>
                Live
              </p>
            </div>
            <p className='text-2xl md:text-3xl font-headline font-black text-emerald-600'>
              {statsData.approved}
            </p>
          </div>
          <div className='bg-white p-4 md:p-6 rounded border border-outline-variant/10 shadow-sm'>
            <div className='flex items-center gap-2 mb-2'>
              <Eye className='w-4 h-4 md:w-5 md:h-5 text-primary/60' />
              <p className='text-[9px] md:text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60'>
                Views
              </p>
            </div>
            <p className='text-2xl md:text-3xl font-headline font-black text-primary'>
              {statsData.totalViews}
            </p>
          </div>
          <div className='bg-white p-4 md:p-6 rounded border border-outline-variant/10 shadow-sm'>
            <div className='flex items-center gap-2 mb-2'>
              <Star className='w-4 h-4 md:w-5 md:h-5 fill-yellow-500 text-yellow-500' />
              <p className='text-[9px] md:text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60'>
                Rating
              </p>
            </div>
            <p className='text-2xl md:text-3xl font-headline font-black text-on-surface'>
              {statsData.avgRating}
            </p>
          </div>
        </section>

        {/* Listings Grid */}
        {filteredListings.length === 0 ? (
          <div className='text-center py-12 md:py-20 bg-surface-container/20 rounded-2xl md:rounded-3xl border-2 border-dashed border-outline-variant/10'>
            <Activity className='w-10 h-10 md:w-12 md:h-12 text-on-surface-variant/20 mx-auto mb-3 md:mb-4' />
            <p className='font-bold text-sm md:text-base text-on-surface-variant px-4'>
              No listings found
            </p>
            <button
              onClick={() => setIsDrawerOpen(true)}
              className='mt-3 md:mt-4 bg-primary text-on-primary px-5 md:px-6 py-2.5 md:py-3 rounded-xl font-bold text-xs md:text-sm hover:brightness-110 transition-all'
            >
              Create Your First Listing
            </button>
          </div>
        ) : (
          <section className='grid grid-cols-1 min-[480px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5 md:gap-6'>
            {filteredListings.map((listing) => (
              <OwnerListingCard
                key={listing._id}
                listing={listing}
                onDelete={handleDeleteListing}
                onEdit={handleEditListing}
                onView={handleViewListing}
              />
            ))}
          </section>
        )}
      </div>

      <CreateListingDrawer
        open={isDrawerOpen}
        onOpenChange={handleDrawerClose}
        onSuccess={fetchListings}
        editingListing={editingListing}
        viewMode={viewMode}
      />

      <ConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false)
          setListingToDelete(null)
        }}
        onConfirm={confirmDelete}
        title='Delete Listing'
        message='Are you sure you want to delete this listing? This action cannot be undone.'
        confirmText='Delete'
        cancelText='Cancel'
        type='danger'
      />
    </>
  )
}
