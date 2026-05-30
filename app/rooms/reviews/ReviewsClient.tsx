'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { roomsApi, reviewsApi } from '@/lib/api'
import { Star, ArrowLeft, Loader2, PenBoxIcon, Trash } from 'lucide-react'
import { toast } from 'sonner'
import { ReviewModal } from '@/components/ReviewModal'
import { ConfirmationModal } from '@/components/ConfirmationModal'

interface Review {
  _id?: string
  author: string
  initials: string
  date: string
  content: string
  rating: number
  isApproved?: boolean
}

export default function ReviewsClient() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const listingId = searchParams.get('id')

  const [loading, setLoading] = useState(true)
  const [listing, setListing] = useState<any>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [myReview, setMyReview] = useState<Review | null>(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [actionLoading, setActionLoading] = useState(false)

  useEffect(() => {
    if (listingId) {
      fetchData()
    }
  }, [listingId])

  const fetchData = async () => {
    if (!listingId) return

    try {
      setLoading(true)

      // Fetch listing details
      const listingData: any = await roomsApi.getListingById(listingId)
      setListing(listingData.listing)

      // Fetch reviews
      const reviewsData = await reviewsApi.getListingReviews(listingId, 1, 100)

      // Map reviews
      const mappedReviews = reviewsData.reviews.map((r: any) => ({
        author: r.student?.name || 'Anonymous',
        initials: (r.student?.name || 'A').charAt(0).toUpperCase(),
        date: new Date(r.createdAt).toLocaleDateString('en-US', {
          month: 'long',
          year: 'numeric',
        }),
        content: r.reviewText,
        rating: r.overallRating,
      }))

      setReviews(mappedReviews)

      // Handle my review
      if (reviewsData.myReview) {
        setMyReview({
          _id: reviewsData.myReview._id,
          author: 'Your Review',
          initials: (reviewsData.myReview.student?.name || 'Y')
            .charAt(0)
            .toUpperCase(),
          date: new Date(reviewsData.myReview.createdAt).toLocaleDateString(
            'en-US',
            {
              month: 'long',
              year: 'numeric',
            },
          ),
          content: reviewsData.myReview.reviewText,
          rating: reviewsData.myReview.overallRating,
          isApproved: reviewsData.myReview.isApproved,
        })
      }
    } catch (error) {
      console.error('Failed to fetch reviews:', error)
      toast.error('Failed to load reviews')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = () => {
    setShowEditModal(true)
  }

  const handleSaveEdit = async (rating: number, comment: string) => {
    if (!myReview?._id) return
    try {
      setActionLoading(true)
      await reviewsApi.updateReview(myReview._id, { rating, comment })
      toast.success('Review updated successfully')
      fetchData()
    } catch (error: any) {
      toast.error(error?.response?.data?.error || 'Failed to update review')
      throw error
    } finally {
      setActionLoading(false)
    }
  }

  const handleDeleteClick = () => {
    setShowDeleteModal(true)
  }

  const handleDeleteConfirm = async () => {
    if (!myReview?._id) return
    try {
      setActionLoading(true)
      await reviewsApi.deleteReview(myReview._id)
      toast.success('Review deleted successfully')
      router.back()
    } catch (error: any) {
      toast.error(error?.response?.data?.error || 'Failed to delete review')
      throw error
    } finally {
      setActionLoading(false)
    }
  }

  const renderStars = (rating: number) => {
    return (
      <div className='flex gap-0.5'>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${star <= rating ? 'fill-black text-black' : 'fill-none text-gray-300'}`}
          />
        ))}
      </div>
    )
  }

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <Loader2 className='w-8 h-8 animate-spin text-primary' />
      </div>
    )
  }

  if (!listingId) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold mb-4'>No listing specified</h1>
          <button
            onClick={() => router.push('/')}
            className='text-primary font-semibold hover:underline'
          >
            Go to home
          </button>
        </div>
      </div>
    )
  }

  const allReviews = myReview ? [myReview, ...reviews] : reviews
  const totalReviews = allReviews.length

  return (
    <div className='min-h-screen bg-white'>
      {/* Header */}
      <div className='sticky top-0 z-10 bg-white border-b'>
        <div className='max-w-7xl mx-auto px-6 py-4'>
          <button
            onClick={() => router.back()}
            className='flex items-center gap-2 text-gray-700 hover:text-gray-900 transition'
          >
            <ArrowLeft className='w-5 h-5' />
            <span className='font-semibold'>Back to listing</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className='max-w-7xl mx-auto px-6 py-8'>
        {/* Title */}
        <div className='mb-8'>
          <h1 className='text-3xl font-semibold mb-2'>
            {totalReviews} {totalReviews === 1 ? 'review' : 'reviews'}
          </h1>
          {listing && (
            <p className='text-gray-600'>Reviews for {listing.title}</p>
          )}
        </div>

        {/* Reviews Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          {allReviews.map((review, i) => {
            const isMyReview =
              '_id' in review && review.author === 'Your Review'

            return (
              <div
                key={isMyReview ? review._id : i}
                className={`border rounded p-6 ${
                  isMyReview
                    ? 'border-primary/40 bg-primary/5'
                    : 'border-gray-200 bg-white'
                }`}
              >
                {/* Pending Badge */}
                {isMyReview && !review.isApproved && (
                  <div className='mb-4 inline-flex items-center gap-1.5 px-3 py-1.5 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full'>
                    Pending Approval
                  </div>
                )}

                {/* Review Header */}
                <div className='flex items-start gap-3 mb-4'>
                  <div className='w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0'>
                    {review.initials}
                  </div>
                  <div className='flex-1 min-w-0'>
                    <div className='font-semibold text-base mb-1'>
                      {review.author}
                    </div>
                    <div className='text-sm text-gray-500'>{review.date}</div>
                  </div>
                </div>

                {/* Rating */}
                <div className='mb-4'>{renderStars(review.rating)}</div>

                {/* Review Content */}
                <p className='text-sm text-gray-700 leading-relaxed'>
                  {review.content}
                </p>

                {/* Action Buttons */}
                {isMyReview && !review.isApproved && (
                  <div className='flex gap-4 mt-5 pt-5 border-t border-gray-200'>
                    <button
                      onClick={handleEdit}
                      disabled={actionLoading}
                      className='text-sm text-primary font-semibold hover:underline disabled:opacity-50'
                    >
                      <PenBoxIcon size={16} />
                    </button>
                    <button
                      onClick={handleDeleteClick}
                      disabled={actionLoading}
                      className='text-sm text-red-600 font-semibold hover:underline disabled:opacity-50'
                    >
                      <Trash size={16} />
                    </button>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Empty State */}
        {allReviews.length === 0 && (
          <div className='text-center py-12'>
            <p className='text-gray-500 text-lg'>No reviews yet</p>
            <p className='text-gray-400 text-sm mt-2'>
              Be the first to review this property
            </p>
          </div>
        )}
      </div>

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
