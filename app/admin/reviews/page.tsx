'use client'

/**
 * Admin Reviews Management Page
 *
 * This page allows administrators to approve or reject user reviews before they appear on the platform.
 *
 * KEY FEATURES:
 *
 * 1. AVERAGE APPROVAL TIME
 *    - Measures how quickly admins review submitted reviews
 *    - Calculated as: (Time review was approved) - (Time review was submitted)
 *    - Displayed in minutes (m), hours (h), or days (d)
 *    - Example: If a review was submitted at 2pm and approved at 3:30pm, approval time = 1.5h
 *    - Only calculated for reviews that have been approved
 *    - Shows 'N/A' if no reviews have been approved yet
 *
 * 2. APPROVE REVIEW
 *    - Approves the review and makes it visible to all users on the platform
 *    - The review will appear on the listing detail page
 *    - Updates the listing's average rating
 *    - Sends a notification to the student who wrote the review
 *    - Use this when the review is genuine and appropriate
 *
 * 3. DELETE REVIEW
 *    - Permanently removes the review from the platform
 *    - Cannot be undone - the review is deleted from the database
 *    - Sends a notification to the student explaining the removal
 *    - Use this when the review violates community guidelines:
 *      - Contains inappropriate content (profanity, hate speech)
 *      - Is spam or contains promotional links
 *      - Contains false information
 *      - Violates user privacy
 *
 * WORKFLOW:
 * 1. Student submits a review for a listing
 * 2. Review appears as "Pending" on this page for admin review
 * 3. Admins review the content and decide to either:
 *    a) Approve it - makes it visible to everyone
 *    b) Delete it - removes it permanently
 * 4. The student is notified of the decision
 * 5. Approval time metrics help track moderation efficiency
 */

import {
  ShieldAlert,
  Search,
  Filter,
  Star,
  CheckCircle2,
  Trash2,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Zap,
  MessageSquareOff,
  Loader2,
  Info,
  AlertCircle,
} from 'lucide-react'
import { EmptyState } from '@/components/EmptyState'
import { ConfirmationModal } from '@/components/ConfirmationModal'
import { useState, useEffect } from 'react'
import { adminApi } from '@/lib/api'
import { toast } from 'sonner'

export default function AdminReviewsPage() {
  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean
    title: string
    message: string
    type: 'success' | 'danger' | 'warning' | 'info'
    onConfirm: (inputValue?: string) => Promise<void>
  }>({
    isOpen: false,
    title: '',
    message: '',
    type: 'info',
    onConfirm: async (inputValue?: string) => {},
  })

  const [loading, setLoading] = useState(true)
  const [reviews, setReviews] = useState<any[]>([])
  const [stats, setStats] = useState({
    totalPending: 0,
    avgApprovalTime: '0h',
    totalReviews: 0,
  })
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    pages: 0,
  })
  const [filterType, setFilterType] = useState<'all' | 'pending'>('pending')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchReviews()
  }, [pagination.page, filterType])

  const fetchReviews = async () => {
    try {
      setLoading(true)
      const params: any = {
        page: pagination.page,
        limit: pagination.limit,
      }

      if (filterType === 'pending') {
        params.isApproved = false
      }

      const response = await adminApi.getReviews(params)
      setReviews(response.reviews)
      setStats(response.stats)
      setPagination(response.pagination)
    } catch (error: any) {
      console.error('Failed to fetch reviews:', error)
      toast.error('Failed to load reviews')
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = (id: string) => {
    setModalConfig({
      isOpen: true,
      title: 'Approve Review',
      message:
        "Are you sure you want to approve this review? It will be visible to all users on the listing page and will affect the listing's rating.",
      type: 'success',
      onConfirm: async () => {
        try {
          await adminApi.approveReview(id)
          toast.success('Review approved successfully')
          fetchReviews()
        } catch (error: any) {
          console.error('Failed to approve review:', error)
          toast.error('Failed to approve review')
        }
      },
    })
  }

  const handlePurge = (id: string) => {
    setModalConfig({
      isOpen: true,
      title: 'Delete Review Permanently',
      message:
        'Are you sure you want to delete this review? This action cannot be undone, and the review will be permanently removed from the platform.',
      type: 'danger',
      onConfirm: async () => {
        try {
          await adminApi.deleteReview(id)
          toast.success('Review deleted successfully')
          fetchReviews()
        } catch (error: any) {
          console.error('Failed to delete review:', error)
          toast.error('Failed to delete review')
        }
      },
    })
  }

  const handlePageChange = (newPage: number) => {
    setPagination((prev) => ({ ...prev, page: newPage }))
  }

  if (loading && reviews.length === 0) {
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
        onClose={() => setModalConfig((prev) => ({ ...prev, isOpen: false }))}
        onConfirm={modalConfig.onConfirm}
        title={modalConfig.title}
        message={modalConfig.message}
        type={modalConfig.type}
      />

      {/* Header Section */}
      <header className='mb-8'>
        <h1 className='text-2xl sm:text-3xl font-bold text-gray-900 mb-2'>
          Reviews Management
        </h1>
        <p className='text-sm text-gray-600'>
          Review and moderate user-submitted reviews
        </p>
      </header>

      {/* Stats Cards */}
      <section className='grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6'>
        <div className='bg-white p-4 sm:p-6 rounded border border-gray-200 shadow-sm'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-xs font-medium text-gray-500 uppercase mb-1'>
                Pending Reviews
              </p>
              <h3 className='text-2xl sm:text-3xl font-bold text-gray-900'>
                {stats.totalPending}
              </h3>
            </div>
            <div className='w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center'>
              <MessageSquareOff className='w-6 h-6 text-yellow-600' />
            </div>
          </div>
        </div>

        <div className='bg-gray-900 p-4 sm:p-6 rounded shadow-sm'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-xs font-medium text-gray-400 uppercase mb-1'>
                Average Approval Time
              </p>
              <h3 className='text-2xl sm:text-3xl font-bold text-white'>
                {stats.avgApprovalTime}
              </h3>
            </div>
            <div className='w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center'>
              <Zap className='w-6 h-6 text-white' />
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <div className='mb-6 flex flex-col sm:flex-row gap-3'>
        <div className='flex-1 relative'>
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
          <input
            type='text'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder='Search by reviewer name, property, or keyword...'
            className='w-full h-11 bg-white border border-gray-300 rounded-lg pl-10 pr-4 text-sm text-gray-900 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition-all placeholder:text-gray-400'
          />
        </div>
        <div className='flex gap-3'>
          <select
            value={filterType}
            onChange={(e) => {
              setFilterType(e.target.value as 'all' | 'pending')
              setPagination((prev) => ({ ...prev, page: 1 }))
            }}
            className='h-11 px-4 bg-white border border-gray-300 rounded-lg text-sm font-medium hover:border-gray-400 transition-all cursor-pointer'
          >
            <option value='all'>All Reviews</option>
            <option value='pending'>Pending Only</option>
          </select>
          <button
            onClick={fetchReviews}
            disabled={loading}
            className='h-11 px-5 bg-gray-900 text-white rounded-lg text-sm font-semibold hover:bg-gray-800 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2'
          >
            {loading ? (
              <Loader2 className='w-4 h-4 animate-spin' />
            ) : (
              <Filter className='w-4 h-4' />
            )}
            <span className='hidden sm:inline'>Refresh</span>
          </button>
        </div>
      </div>

      {/* Reviews List */}
      <section className='space-y-4'>
        {reviews.length === 0 ? (
          <EmptyState
            icon={CheckCircle2}
            title='All Clear!'
            message='No reviews pending approval at this time.'
          />
        ) : (
          reviews.map((review) => (
            <div
              key={review.id}
              className='bg-white rounded border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow'
            >
              <div className='p-4 sm:p-6'>
                <div className='flex flex-col sm:flex-row gap-4'>
                  {/* Property Image */}
                  <div className='w-full sm:w-32 h-32 sm:h-24 rounded-lg overflow-hidden bg-gray-100 shrink-0 relative'>
                    <img
                      alt={review.property}
                      className='w-full h-full object-cover'
                      src={review.propertyImage}
                    />
                    <div className='absolute top-2 left-2 flex items-center gap-1 px-2 py-1 bg-white/95 backdrop-blur-sm rounded-md shadow-sm'>
                      <Star className='w-3 h-3 text-yellow-500 fill-yellow-500' />
                      <span className='text-xs font-semibold text-gray-900'>
                        {review.rating}.0
                      </span>
                    </div>
                  </div>

                  {/* Review Details */}
                  <div className='flex-1 flex flex-col min-w-0'>
                    <div className='flex items-start justify-between gap-3 mb-3'>
                      <div className='flex-1 min-w-0'>
                        <h3 className='text-lg font-bold text-gray-900 mb-1 truncate'>
                          {review.property}
                        </h3>
                        <div className='flex flex-wrap items-center gap-2 text-xs text-gray-500'>
                          <span className='truncate'>
                            ID: {review.id.substring(0, 8)}
                          </span>
                          <span>•</span>
                          <span>
                            {new Date(review.date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </span>
                        </div>
                      </div>
                      {!review.isApproved && (
                        <div className='px-2 py-1 bg-yellow-50 text-yellow-700 border border-yellow-200 rounded-md text-xs font-medium flex items-center gap-1 shrink-0'>
                          <AlertCircle className='w-3 h-3' />
                          <span className='hidden sm:inline'>Pending</span>
                        </div>
                      )}
                    </div>

                    <div className='flex items-start gap-3 mb-4 p-3 bg-gray-50 rounded-lg'>
                      <div className='w-10 h-10 rounded-full overflow-hidden bg-white shrink-0'>
                        {review.avatar ? (
                          <img
                            alt={review.reviewer}
                            className='w-full h-full object-cover'
                            src={review.avatar}
                          />
                        ) : (
                          <div className='w-full h-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold text-sm'>
                            {review.reviewer.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </div>
                      <div className='flex-1 min-w-0'>
                        <p className='text-sm font-semibold text-gray-900 mb-1'>
                          {review.reviewer}
                        </p>
                        <p className='text-sm text-gray-600 leading-relaxed line-clamp-2'>
                          "{review.comment}"
                        </p>
                      </div>
                    </div>

                    <div className='flex flex-col sm:flex-row gap-2 mt-auto pt-4 border-t border-gray-100'>
                      {!review.isApproved ? (
                        <>
                          <button
                            onClick={() => handleApprove(review.id)}
                            className='flex-1 h-10 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700 active:scale-95 transition-all flex items-center justify-center gap-2'
                          >
                            <CheckCircle2 className='w-4 h-4' />
                            <span>Approve</span>
                          </button>
                          <button
                            onClick={() => handlePurge(review.id)}
                            className='flex-1 h-10 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 active:scale-95 transition-all flex items-center justify-center gap-2'
                          >
                            <Trash2 className='w-4 h-4' />
                            <span>Delete</span>
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => handlePurge(review.id)}
                          className='w-full h-10 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 active:scale-95 transition-all flex items-center justify-center gap-2'
                        >
                          <Trash2 className='w-4 h-4' />
                          <span>Delete Review</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </section>

      {/* Pagination */}
      {pagination.total > 0 && (
        <div className='mt-6 flex flex-col sm:flex-row items-center justify-between gap-4'>
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
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
              className='w-9 h-9 flex items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed'
            >
              <ChevronLeft className='w-4 h-4' />
            </button>
            {Array.from({ length: Math.min(5, pagination.pages) }, (_, i) => {
              let pageNum
              if (pagination.pages <= 5) {
                pageNum = i + 1
              } else if (pagination.page <= 3) {
                pageNum = i + 1
              } else if (pagination.page >= pagination.pages - 2) {
                pageNum = pagination.pages - 4 + i
              } else {
                pageNum = pagination.page - 2 + i
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-semibold transition-all ${
                    pageNum === pagination.page
                      ? 'bg-gray-900 text-white'
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {pageNum}
                </button>
              )
            })}
            <button
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page === pagination.pages}
              className='w-9 h-9 flex items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed'
            >
              <ChevronRight className='w-4 h-4' />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
