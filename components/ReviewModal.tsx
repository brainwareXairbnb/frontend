'use client'

import { useState, useEffect } from 'react'
import { Star } from 'lucide-react'

interface ReviewModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (rating: number, comment: string) => Promise<void>
  initialRating?: number
  initialComment?: string
  title?: string
  submitButtonText?: string
}

export function ReviewModal({
  isOpen,
  onClose,
  onSubmit,
  initialRating = 5,
  initialComment = '',
  title = 'Write a Review',
  submitButtonText = 'Submit Review',
}: ReviewModalProps) {
  const [rating, setRating] = useState(initialRating)
  const [comment, setComment] = useState(initialComment)
  const [submitting, setSubmitting] = useState(false)

  // Reset form when modal opens with new initial values
  useEffect(() => {
    if (isOpen) {
      setRating(initialRating)
      setComment(initialComment)
    }
  }, [isOpen, initialRating, initialComment])

  const handleSubmit = async () => {
    if (!comment.trim() || comment.length < 10) {
      return
    }

    try {
      setSubmitting(true)
      await onSubmit(rating, comment)
      onClose()
    } catch (error) {
      // Error handling is done in the parent component
    } finally {
      setSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div
      className='fixed inset-0 z-[200] flex items-end md:items-center justify-center bg-black/50 backdrop-blur-sm md:p-4'
      onClick={onClose}
    >
      <div
        className='bg-white rounded-t-3xl md:rounded-2xl w-full max-w-md animate-slide-up'
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile drag handle */}
        <div className='md:hidden pt-2 pb-1 flex justify-center'>
          <div className='w-10 h-1 bg-outline-variant/30 rounded-full' />
        </div>

        <div className='p-6'>
          <h2 className='text-xl font-bold mb-4'>{title}</h2>

          {/* Rating Section */}
          <div className='mb-4'>
            <label className='block text-sm font-bold mb-2'>Rating</label>
            <div className='flex gap-2'>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type='button'
                  onClick={() => setRating(star)}
                  className='p-1 transition-transform hover:scale-110'
                  disabled={submitting}
                >
                  <Star
                    className={`w-8 h-8 transition-colors ${
                      star <= rating
                        ? 'fill-[#FF385C] text-[#FF385C]'
                        : 'text-slate-300'
                    }`}
                  />
                </button>
              ))}
            </div>
            <p className='text-xs text-gray-500 mt-1'>
              {rating === 1 && 'Poor'}
              {rating === 2 && 'Fair'}
              {rating === 3 && 'Good'}
              {rating === 4 && 'Very Good'}
              {rating === 5 && 'Excellent'}
            </p>
          </div>

          {/* Comment Section */}
          <div className='mb-6'>
            <label className='block text-sm font-bold mb-2'>
              Your Review
              <span className='text-xs font-normal text-gray-500 ml-2'>
                (minimum 10 characters)
              </span>
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={10}
              placeholder='Share your experience with this property...'
              className='w-full px-4 py-3 border border-outline-variant/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF385C] resize-none'
              disabled={submitting}
              minLength={10}
              maxLength={1000}
            />
            <p className='text-xs text-gray-500 mt-1 text-right'>
              {comment.length}/1000
            </p>
          </div>

          {/* Action Buttons */}
          <div className='flex flex-col-reverse md:flex-row gap-3'>
            <button
              onClick={onClose}
              disabled={submitting}
              className='flex-1 py-3 border border-outline-variant/30 rounded-lg font-bold hover:bg-gray-50 transition-colors disabled:opacity-50'
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={submitting || !comment.trim() || comment.length < 10}
              className='flex-1 py-3 bg-[#FF385C] text-white rounded-lg font-bold hover:brightness-95 disabled:opacity-50 transition-all'
            >
              {submitting ? 'Submitting...' : submitButtonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
