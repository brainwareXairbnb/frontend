'use client'

import { RoomCard } from './RoomCard'
import { ChevronRight } from 'lucide-react'

interface CategorySectionProps {
  title: string
  listings: any[]
  onViewAll?: () => void
}

export function CategorySection({
  title,
  listings,
  onViewAll,
}: CategorySectionProps) {
  if (!listings || listings.length === 0) return null

  // Map backend listings to Room format for RoomCard
  const mappedRooms = listings.slice(0, 8).map((listing) => ({
    id: listing._id,
    title: listing.title,
    description: listing.description,
    location:
      `${listing.address?.street || ''}, ${listing.address?.city || ''}`.replace(
        /^,\s*/,
        '',
      ),
    distanceToCampus: listing.distance
      ? `${listing.distance} km from campus`
      : undefined,
    distanceZone: listing.distanceZone,
    price: listing.rent,
    createdAt: listing.createdAt,
    deposit: listing.deposit || 0,
    rating: listing.avgRating || 0,
    reviewCount: listing.viewCount || 0,
    isBookmarked: listing.isBookmarked || false,
    type: listing.roomType,
    gender: listing.genderPref,
    images: listing.photos?.length
      ? listing.photos
      : [
          'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=2340',
        ],
    amenities: listing.amenities || [],
    owner: listing.owner || { name: 'Verified Owner' },
  }))

  return (
    <section className='mb-8 md:mb-16'>
      {/* Category Header */}
      <div className='flex items-center justify-between mb-6'>
        <div>
          <h2 className='text-2xl md:text-3xl font-black font-headline tracking-tight text-on-surface'>
            {title}
          </h2>
          <p className='text-sm text-on-surface-variant mt-1'>
            {listings.length} {listings.length === 1 ? 'listing' : 'listings'}{' '}
            available
          </p>
        </div>
        {onViewAll && (
          <button
            onClick={onViewAll}
            className='flex items-center gap-2 text-primary font-bold text-sm hover:gap-3 transition-all group'
          >
            <span className='hidden md:block'>View all</span>
            <ChevronRight className='w-5 h-5 group-hover:translate-x-1 transition-transform' />
          </button>
        )}
      </div>

      {/* Horizontal Scrollable Grid */}
      <div className='overflow-x-auto scrollbar-hide -mx-4 px-4'>
        <div className='flex gap-3 md:gap-6'>
          {mappedRooms.map((room) => (
            <div
              key={room.id}
              className='flex-shrink-0 w-[160px] sm:w-[200px] md:w-[280px] lg:w-[320px]'
            >
              <RoomCard
                room={room}
                subtitle={room.distanceToCampus}
                showReviewCount={true}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Show More Button (Mobile) */}
      {listings.length > 8 && onViewAll && (
        <div className='mt-6 flex justify-center md:hidden'>
          <button
            onClick={onViewAll}
            className='px-6 py-3 bg-surface-container border border-outline-variant/20 rounded-xl font-bold text-sm text-on-surface hover:bg-surface-container-high transition-colors'
          >
            Show all {listings.length} listings
          </button>
        </div>
      )}
    </section>
  )
}
