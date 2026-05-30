'use client'

import { useState, useRef, useEffect } from 'react'
import { reviewsApi } from '@/lib/api'
import { toast } from 'sonner'
import {
  Star,
  ChevronLeft,
  ChevronRight,
  Trash,
  PenBoxIcon,
} from 'lucide-react'
import Link from 'next/link'
import { ReviewModal } from '@/components/ReviewModal'
import { ConfirmationModal } from '@/components/ConfirmationModal'

interface Review {
  author: string
  initials: string
  date: string
  content: string
  rating?: number
}

interface MyReview extends Review {
  _id: string
  rating: number
  isApproved: boolean
}

interface ListingReviewsProps {
  reviews?: Review[]
  myReview?: MyReview | null
  listingId?: string
  totalReviewCount?: number
}

export function ListingReviews({
  reviews = [],
  myReview,
  listingId,
  totalReviewCount,
}: ListingReviewsProps) {
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const allReviews = myReview ? [myReview, ...reviews] : reviews
  const hasReviews = allReviews.length > 0

  useEffect(() => {
    const checkScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } =
          scrollContainerRef.current
        setCanScrollLeft(scrollLeft > 0)
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
      }
    }

    checkScroll()
    const container = scrollContainerRef.current
    container?.addEventListener('scroll', checkScroll)
    window.addEventListener('resize', checkScroll)

    return () => {
      container?.removeEventListener('scroll', checkScroll)
      window.removeEventListener('resize', checkScroll)
    }
  }, [allReviews])

  if (!hasReviews) return null

  const handleEdit = () => {
    setShowEditModal(true)
  }

  const handleSaveEdit = async (rating: number, comment: string) => {
    if (!myReview?._id) return
    try {
      setLoading(true)
      await reviewsApi.updateReview(myReview._id, { rating, comment })
      toast.success('Review updated successfully')
      window.location.reload()
    } catch (error: any) {
      toast.error(error?.response?.data?.error || 'Failed to update review')
      throw error
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteClick = () => {
    setShowDeleteModal(true)
  }

  const handleDeleteConfirm = async () => {
    if (!myReview?._id) return
    try {
      setLoading(true)
      await reviewsApi.deleteReview(myReview._id)
      toast.success('Review deleted successfully')
      window.location.reload()
    } catch (error: any) {
      toast.error(error?.response?.data?.error || 'Failed to delete review')
      throw error
    } finally {
      setLoading(false)
    }
  }

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  const renderStars = (rating: number) => {
    return (
      <div className='flex gap-0.5'>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-3 h-3 ${star <= rating ? 'fill-black text-black' : 'fill-none text-gray-300'}`}
          />
        ))}
      </div>
    )
  }

  return (
    <div className='pb-8 border-t pt-8'>
      <div className='mb-6'>
        <h3 className='text-[22px] font-semibold mb-2'>Student reviews</h3>
        {totalReviewCount !== undefined && totalReviewCount > 0 && (
          <p className='text-gray-600 text-sm'>
            {totalReviewCount} {totalReviewCount === 1 ? 'review' : 'reviews'}
          </p>
        )}
      </div>

      <div className='relative group'>
        {/* Left Scroll Button */}
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className='absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white border border-gray-300 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all opacity-0 group-hover:opacity-100'
          >
            <ChevronLeft className='w-4 h-4' />
          </button>
        )}

        {/* Right Scroll Button */}
        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className='absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white border border-gray-300 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all opacity-0 group-hover:opacity-100'
          >
            <ChevronRight className='w-4 h-4' />
          </button>
        )}

        {/* Reviews Carousel */}
        <div
          ref={scrollContainerRef}
          className='flex gap-4 overflow-x-auto pb-4 scrollbar-hide scroll-smooth'
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {allReviews.map((review, i) => {
            const isMyReview = 'isApproved' in review
            const r = review as Review | MyReview

            return (
              <div
                key={isMyReview ? (review as MyReview)._id : i}
                className={`min-w-[340px] max-w-[340px] border rounded p-5 flex-shrink-0 ${
                  isMyReview
                    ? 'border-primary/40 bg-primary/5'
                    : 'border-gray-200 bg-white'
                }`}
              >
                {/* Pending Badge */}
                {isMyReview && !(review as MyReview).isApproved && (
                  <div className='mb-3 inline-flex items-center gap-1.5 px-2.5 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full'>
                    Pending Approval
                  </div>
                )}

                {/* Review Header */}
                <div className='flex items-start gap-3 mb-3'>
                  <div className='w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0'>
                    {r.initials}
                  </div>
                  <div className='flex-1 min-w-0'>
                    <div className='font-semibold text-sm truncate'>
                      {isMyReview ? 'Your Review' : r.author}
                    </div>
                    <div className='text-xs text-gray-500'>{r.date}</div>
                  </div>
                </div>

                {/* Rating */}
                <div className='mb-3'>{renderStars(r.rating || 5)}</div>

                {/* Review Content */}
                <p className='text-sm text-gray-700 line-clamp-4 leading-relaxed'>
                  {r.content}
                </p>

                {/* Action Buttons */}
                {isMyReview && !(review as MyReview).isApproved && (
                  <div className='flex gap-3 mt-4 pt-4 border-t border-gray-200'>
                    <button
                      onClick={handleEdit}
                      disabled={loading}
                      className='text-xs text-primary font-semibold hover:underline disabled:opacity-50'
                    >
                      <PenBoxIcon size={16} />
                    </button>
                    <button
                      onClick={handleDeleteClick}
                      disabled={loading}
                      className='text-xs text-red-600 font-semibold hover:underline disabled:opacity-50'
                    >
                      <Trash size={16} />
                    </button>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Show All Reviews Button */}
      {listingId && allReviews.length > 0 && (
        <Link
          href={`/rooms/reviews?id=${listingId}`}
          className='inline-block mt-6 px-6 py-3 border border-gray-900 text-gray-900 rounded font-semibold text-sm hover:bg-gray-50 transition'
        >
          Show all {totalReviewCount || allReviews.length} reviews
        </Link>
      )}

      {/* Review Edit Modal */}
      <ReviewModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSubmit={handleSaveEdit}
        initialRating={myReview?.rating || 5}
        initialComment={myReview?.content || ''}
        title='Edit Your Review'
        submitButtonText='Update Review'
      />

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteConfirm}
        title='Delete Review'
        message='Are you sure you want to delete your review? This action cannot be undone.'
        confirmText='Delete'
        cancelText='Cancel'
        type='danger'
      />
    </div>
  )
}
