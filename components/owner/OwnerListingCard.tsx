'use client'

import { useState } from 'react'
import {
  MapPin,
  Bed,
  SquarePen,
  Eye,
  Trash2,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Star,
  ImageIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Listing, OwnerListingCardProps } from '@/lib/types'

export default function OwnerListingCard({
  listing,
  onDelete,
  onEdit,
  onView,
}: OwnerListingCardProps) {
  const [imageError, setImageError] = useState(false)

  const getImageUrl = () => {
    // Try to get the first valid image
    const images = listing.photos || listing.images || []
    const firstImage = images.find((img) => img && img.trim() !== '')

    // Return first valid image or fallback
    return (
      firstImage ||
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop'
    )
  }

  const getStatusBadge = (status: string) => {
    const statusMap: Record<
      string,
      { bg: string; text: string; icon: any; textColor: string }
    > = {
      approved: {
        bg: 'bg-emerald-500',
        text: 'LIVE',
        icon: CheckCircle2,
        textColor: 'text-white',
      },
      under_review: {
        bg: 'bg-amber-500',
        text: 'REVIEW',
        icon: Clock,
        textColor: 'text-white',
      },
      draft: {
        bg: 'bg-gray-400',
        text: 'DRAFT',
        icon: Clock,
        textColor: 'text-white',
      },
      rejected: {
        bg: 'bg-red-600',
        text: 'REJECTED',
        icon: AlertTriangle,
        textColor: 'text-white',
      },
      changes_required: {
        bg: 'bg-orange-600',
        text: 'CHANGES',
        icon: AlertTriangle,
        textColor: 'text-white',
      },
    }
    return statusMap[status] || statusMap.draft
  }

  const badge = getStatusBadge(listing.status)
  const StatusIcon = badge.icon

  return (
    <div className='group cursor-pointer block bg-white rounded overflow-hidden border border-outline-variant/10 shadow-sm hover:shadow-lg transition-all max-w-full'>
      {/* Image Section */}
      <div className='relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200'>
        {imageError ? (
          <div className='w-full h-full flex flex-col items-center justify-center text-gray-400'>
            <ImageIcon
              className='w-12 h-12 md:w-16 md:h-16 mb-2'
              strokeWidth={1.5}
            />
            <p className='text-xs md:text-sm font-medium'>No Image</p>
          </div>
        ) : (
          <img
            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
              listing.status !== 'approved' ? 'grayscale opacity-60' : ''
            }`}
            src={getImageUrl()}
            alt={listing.title}
            loading='lazy'
            onError={() => setImageError(true)}
          />
        )}

        {/* Status Badge */}
        <div className='absolute top-1.5 left-1.5 md:top-2 md:left-2'>
          <span
            className={`${badge.bg} ${badge.textColor} px-1.5 py-0.5 md:px-2 md:py-1 rounded-full text-[8px] md:text-[9px] font-black tracking-wider flex items-center gap-0.5 md:gap-1 shadow-lg`}
          >
            <StatusIcon className='w-2 h-2 md:w-2.5 md:h-2.5' />
            {badge.text}
          </span>
        </div>

        {/* Available Badge */}
        {listing.isAvailable && listing.status === 'approved' && (
          <div className='absolute top-1.5 right-1.5 md:top-2 md:right-2'>
            <span className='bg-white/90 backdrop-blur-sm text-on-surface px-1.5 py-0.5 md:px-2 md:py-1 rounded-full text-[8px] md:text-[9px] font-black tracking-wider border border-white/20'>
              AVAILABLE
            </span>
          </div>
        )}

        {/* Bed Count Badge */}
        {listing.availableBeds !== undefined && (
          <div className='absolute bottom-1.5 left-1.5 md:bottom-2 md:left-2'>
            <span className='bg-black/60 backdrop-blur-sm text-white px-1.5 py-0.5 md:px-2 md:py-1 rounded-full text-[8px] md:text-[9px] font-bold flex items-center gap-0.5 md:gap-1'>
              <Bed className='w-2.5 h-2.5 md:w-3 md:h-3' />
              {listing.availableBeds}/{listing.totalBeds || 0}
            </span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className='p-2.5 md:p-3'>
        {/* Title and Location */}
        <div className='mb-2 md:mb-3'>
          <h3 className='font-bold text-on-surface text-xs md:text-sm line-clamp-1 mb-1'>
            {listing.title}
          </h3>
          <div className='flex items-center gap-1 text-on-surface-variant text-[10px] md:text-xs'>
            <MapPin className='w-2.5 h-2.5 md:w-3 md:h-3' />
            <span className='truncate'>{listing.address?.city || 'N/A'}</span>
            <span className='text-[9px] md:text-[10px]'>•</span>
            <span className='uppercase text-[9px] md:text-[10px]'>
              {listing.roomType}
            </span>
          </div>
        </div>

        {/* Stats Row */}
        <div className='flex items-center gap-2 md:gap-3 mb-2 md:mb-3 pb-2 md:pb-3 border-b border-outline-variant/10'>
          <div className='flex items-center gap-1'>
            <Eye className='w-2.5 h-2.5 md:w-3 md:h-3 text-on-surface-variant' />
            <span className='text-[10px] md:text-xs font-semibold text-on-surface'>
              {listing.viewCount || 0}
            </span>
          </div>
          <div className='flex items-center gap-1'>
            <Star className='w-2.5 h-2.5 md:w-3 md:h-3 fill-yellow-500 text-yellow-500' />
            <span className='text-[10px] md:text-xs font-semibold text-on-surface'>
              {listing.avgRating || 0}
            </span>
          </div>
        </div>

        {/* Rejection Reason (Short) */}
        {listing.status === 'rejected' && listing.rejectionReason && (
          <div className='mb-2 md:mb-3 bg-red-50 border border-red-100 rounded p-2 md:p-2.5 flex items-start gap-1.5 md:gap-2 shadow-sm animate-in fade-in duration-300'>
            <AlertTriangle className='w-3 h-3 md:w-3.5 md:h-3.5 text-red-600 mt-0.5 shrink-0' />
            <p className='text-[9px] md:text-[10px] text-red-800 line-clamp-2 leading-relaxed italic font-medium'>
              {listing.rejectionReason}
            </p>
          </div>
        )}

        {/* Price and Actions */}
        <div className='flex justify-between items-center'>
          <div>
            <span className='text-[10px] md:text-xs text-on-surface-variant'>
              Monthly
            </span>
            <div className='text-xs md:text-sm font-bold text-primary'>
              ₹{(listing.rent || listing.price || 0).toLocaleString('en-IN')}
            </div>
          </div>

          {/* Action Buttons */}
          <div className='flex gap-1 md:gap-2'>
            <Button
              variant='outline'
              size='icon'
              onClick={(e) => {
                e.preventDefault()
                onView(listing)
              }}
              className='h-7 w-7 md:h-9 md:w-9 bg-blue-50 border-blue-200 text-blue-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all shadow-sm'
              title='View Details'
            >
              <Eye className='w-3 h-3 md:w-4 md:h-4' />
            </Button>
            <Button
              variant='outline'
              size='icon'
              onClick={(e) => {
                e.preventDefault()
                onEdit(listing)
              }}
              className='h-7 w-7 md:h-9 md:w-9 bg-purple-50 border-purple-200 text-purple-600 hover:bg-purple-600 hover:text-white hover:border-purple-600 transition-all shadow-sm'
              title='Edit Listing'
            >
              <SquarePen className='w-3 h-3 md:w-4 md:h-4' />
            </Button>
            <Button
              variant='outline'
              size='icon'
              onClick={(e) => {
                e.preventDefault()
                onDelete(listing._id)
              }}
              className='h-7 w-7 md:h-9 md:w-9 bg-red-50 border-red-200 text-red-600 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all shadow-sm'
              title='Delete Listing'
            >
              <Trash2 className='w-3 h-3 md:w-4 md:h-4' />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
