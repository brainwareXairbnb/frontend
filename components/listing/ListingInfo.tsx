'use client'

import { Star, StarHalf, Medal, Sparkles } from 'lucide-react'

interface ListingInfoProps {
  title: string
  address?: { city?: string; state?: string }
  location?: string
  subLabel: string
  rating: number
  reviewCount: number
  owner?: { name?: string }
  description: string
}

export function ListingInfo({
  title,
  address,
  location,
  subLabel,
  rating,
  reviewCount,
  owner,
  description,
}: ListingInfoProps) {
  const renderStars = (rating: number, size = 'w-[10px] h-[10px]') => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5
    return (
      <div className='flex gap-[1px]'>
        {[...Array(5)].map((_, i) => {
          if (i < fullStars)
            return (
              <Star
                key={i}
                className={`${size} fill-current text-on-surface`}
                strokeWidth={1}
              />
            )
          if (i === fullStars && hasHalfStar)
            return (
              <StarHalf
                key={i}
                className={`${size} fill-current text-on-surface`}
                strokeWidth={1}
              />
            )
          return (
            <Star
              key={i}
              className={`${size} text-on-surface/20`}
              strokeWidth={1}
            />
          )
        })}
      </div>
    )
  }

  return (
    <>
      {/* Title and Location */}
      <div className='mb-6 md:mb-8 pb-8 border-b border-outline-variant/30'>
        <h1 className='text-[28px] md:text-xl font-bold md:font-semibold text-on-surface leading-tight mb-1'>
          {title}
        </h1>
        <h2 className='text-base font-semibold text-on-surface-variant mb-2'>
          {address?.city || location?.split(',')[0]}, {address?.state || ''}
        </h2>
        <p className='text-[15px] md:text-base text-on-surface-variant'>
          {subLabel}
        </p>
      </div>

      {/* Rating Badge */}
      {rating > 0 && (
        <div className='flex justify-between items-center border border-outline-variant/30 rounded-2xl p-4 mb-8 shadow-sm'>
          <div className='text-center pr-4 border-r border-outline-variant/30'>
            <div className='text-lg font-bold'>{rating}</div>
            <div className='flex justify-center mt-0.5'>
              {renderStars(rating)}
            </div>
          </div>
          <div className='text-center flex-1 px-2 flex flex-col items-center'>
            {rating >= 4.5 ? (
              <Medal className='w-6 h-6 mb-1' />
            ) : (
              <Sparkles className='w-6 h-6 mb-1' />
            )}
            <span className='text-xs font-semibold'>
              {rating >= 4.5 ? 'Student favorite' : 'Well rated'}
            </span>
          </div>
          <div className='text-center pl-4 border-l border-outline-variant/30'>
            <div className='text-lg font-bold'>{reviewCount}</div>
            <div className='text-[10px] mt-0.5 font-semibold'>Reviews</div>
          </div>
        </div>
      )}

      {/* Owner Section */}
      <div className='flex items-center gap-4 mb-8'>
        <div className='w-12 h-12 md:w-14 md:h-14 rounded-full bg-surface-container overflow-hidden'>
          <img
            src={`https://api.dicebear.com/7.x/initials/svg?seed=${owner?.name}`}
            className='w-full h-full object-cover'
            alt=''
          />
        </div>
        <div>
          <h3 className='font-semibold text-base md:text-lg'>
            Hosted by {owner?.name}
          </h3>
          <p className='text-sm text-on-surface-variant'>Property Owner</p>
        </div>
      </div>

      <div className='w-full h-[1px] bg-outline-variant/20 mb-8' />

      {/* Description */}
      <div className='pb-8 border-b border-outline-variant/20 mb-8'>
        <h3 className='text-[22px] font-semibold mb-4'>About this place</h3>
        <p className='text-[15px] md:text-base text-on-surface leading-relaxed whitespace-pre-line'>
          {description}
        </p>
      </div>
    </>
  )
}
