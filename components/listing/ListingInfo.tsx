'use client'

import { Star, StarHalf } from 'lucide-react'

interface ListingInfoProps {
  title: string
  address?: { city?: string; state?: string; street?: string }
  location?: string
  subLabel: string
  rating: number
  reviewCount: number
  owner?: { name?: string; profilePicUrl?: string; createdAt?: string }
  description: string
  totalStudents?: number
  totalBedrooms?: number
  totalBeds?: number
  totalBathrooms?: number
  roomType?: string
  furnishing?: string
}

export function ListingInfo({
  title,
  address,
  rating,
  reviewCount,
  owner,
  description,
  totalStudents,
  totalBedrooms,
  totalBeds,
  totalBathrooms,
  roomType,
  furnishing,
}: ListingInfoProps) {
  const displayRating = rating !== undefined && rating !== null ? rating : 0
  const displayReviewCount = reviewCount !== undefined && reviewCount !== null ? reviewCount : 0
  const hasRating = displayRating > 0

  const renderStars = (val: number, size = 'w-3 h-3') => {
    if (val <= 0) return null
    const fullStars = Math.floor(val)
    const hasHalfStar = val % 1 >= 0.5
    return (
      <div className='flex gap-0.5'>
        {[...Array(5)].map((_, i) => {
          if (i < fullStars)
            return (
              <Star
                key={i}
                className={`${size} fill-black text-black`}
                strokeWidth={0}
              />
            )
          if (i === fullStars && hasHalfStar)
            return (
              <StarHalf
                key={i}
                className={`${size} fill-black text-black`}
                strokeWidth={0}
              />
            )
          return (
            <Star
              key={i}
              className={`${size} text-gray-300 fill-gray-300`}
              strokeWidth={0}
            />
          )
        })}
      </div>
    )
  }

  // Subtitle
  const getPropertyTypeLabel = (type?: string) => {
    if (!type) return 'Private room'
    const mapping: Record<string, string> = {
      single: 'Single room',
      double: 'Double room',
      shared: 'Shared room',
      triple: 'Triple room',
      dormitory: 'Dormitory room',
      flat: 'Entire flat',
      pg: 'Paying guest (PG)',
    }
    return mapping[type.toLowerCase()] || `${type.charAt(0).toUpperCase() + type.slice(1)} room`
  }

  const propertyType = getPropertyTypeLabel(roomType)
  const city = address?.city || ''
  const state = address?.state || ''
  const locationStr = city && state ? `${city}, ${state}` : city || state || ''
  const subtitle = locationStr ? `${propertyType} in ${locationStr}` : propertyType

  // Capacity info string (completely dynamic from API)
  const capacityParts = []
  if (totalStudents !== undefined && totalStudents !== null && totalStudents > 0) {
    capacityParts.push(`${totalStudents} ${totalStudents === 1 ? 'Student' : 'Students'}`)
  }
  if (totalBedrooms !== undefined && totalBedrooms !== null && totalBedrooms > 0) {
    capacityParts.push(`${totalBedrooms} ${totalBedrooms === 1 ? 'Bedroom' : 'Bedrooms'}`)
  }
  if (totalBeds !== undefined && totalBeds !== null && totalBeds > 0) {
    capacityParts.push(`${totalBeds} ${totalBeds === 1 ? 'Bed' : 'Beds'}`)
  }
  if (totalBathrooms !== undefined && totalBathrooms !== null && totalBathrooms > 0) {
    capacityParts.push(`${totalBathrooms} ${totalBathrooms === 1 ? 'Bathroom' : 'Bathrooms'}`)
  }
  if (furnishing) {
    capacityParts.push(furnishing)
  }
  const capacityStr = capacityParts.join(' · ')

  // Calculate hosting duration dynamically from owner signup year
  const getHostingDuration = () => {
    if (!owner?.createdAt) return 'Host'
    const startYear = new Date(owner.createdAt).getFullYear()
    const currentYear = new Date().getFullYear()
    const diff = currentYear - startYear
    if (diff <= 0) return 'Joined recently'
    return `${diff} year${diff === 1 ? '' : 's'} hosting`
  }
  const hostingDuration = getHostingDuration()

  // Format profile picture URL safely
  const getProfilePicUrl = (url?: string) => {
    if (!url) return null
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url
    }
    const backendUrl = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:3001'
    return `${backendUrl}${url.startsWith('/') ? '' : '/'}${url}`
  }
  const profilePicUrl = getProfilePicUrl(owner?.profilePicUrl)

  const isStudentFavorite = displayRating >= 4.5 && displayReviewCount >= 3

  return (
    <>
      {/* Title section (centralized) */}
      <div className='mb-6 text-center border-b border-gray-100 pb-6'>
        <h1 className='text-[28px] md:text-[32px] font-extrabold text-gray-900 leading-tight mb-2 tracking-tight'>
          {title}
        </h1>
        <p className='text-[15px] md:text-base text-gray-500 font-medium mb-1'>
          {subtitle}
        </p>
        {capacityStr && (
          <p className='text-sm md:text-[15px] text-gray-400 font-normal'>
            {capacityStr}
          </p>
        )}
      </div>

      {/* Stats Row (Centralized, partitioned) */}
      {hasRating && (
        <div
          className={`grid ${isStudentFavorite ? 'grid-cols-3' : 'grid-cols-2'} border-y border-gray-200/80 py-4 my-6 divide-x divide-gray-200 text-center items-center`}
        >
          {/* Rating */}
          <div className='flex flex-col items-center justify-center px-2'>
            <span className='text-[22px] font-bold text-gray-900 leading-none mb-1.5'>
              {displayRating.toFixed(2)}
            </span>
            <div className='flex justify-center'>
              {renderStars(displayRating, 'w-3 h-3')}
            </div>
          </div>

          {/* Student Favorite Wreath */}
          {isStudentFavorite && (
            <div className='flex items-center justify-center px-2 gap-1'>
              {/* Left Laurel Wreath Leaf */}
              <svg className='w-6 h-12 text-black shrink-0' viewBox='0 0 24 48' fill='currentColor'>
                <path d='M16,40 C12,32 12,16 16,8' fill='none' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round' />
                <path d='M14,12 C10,10 7,11 6,14 C9,15 12,14 14,12 Z' />
                <path d='M14,18 C9,17 6,19 5,22 C8,23 11,21 14,18 Z' />
                <path d='M15,25 C10,25 7,28 6,31 C9,31 12,29 15,25 Z' />
                <path d='M16,32 C12,33 9,37 9,40 C12,39 15,36 16,32 Z' />
                <path d='M15,8 C12,5 12,2 14,0 C16,2 16,5 15,8 Z' />
              </svg>

              <div className='flex flex-col text-[11px] font-extrabold uppercase tracking-wider text-gray-900 leading-tight select-none'>
                <span>Student</span>
                <span>favorite</span>
              </div>

              {/* Right Laurel Wreath Leaf */}
              <svg className='w-6 h-12 text-black scale-x-[-1] shrink-0' viewBox='0 0 24 48' fill='currentColor'>
                <path d='M16,40 C12,32 12,16 16,8' fill='none' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round' />
                <path d='M14,12 C10,10 7,11 6,14 C9,15 12,14 14,12 Z' />
                <path d='M14,18 C9,17 6,19 5,22 C8,23 11,21 14,18 Z' />
                <path d='M15,25 C10,25 7,28 6,31 C9,31 12,29 15,25 Z' />
                <path d='M16,32 C12,33 9,37 9,40 C12,39 15,36 16,32 Z' />
                <path d='M15,8 C12,5 12,2 14,0 C16,2 16,5 15,8 Z' />
              </svg>
            </div>
          )}

          {/* Reviews */}
          <div className='flex flex-col items-center justify-center px-2'>
            <span className='text-[22px] font-bold text-gray-900 leading-none mb-1.5'>
              {displayReviewCount}
            </span>
            <span className='text-xs font-semibold text-gray-900 underline cursor-pointer hover:text-gray-700 tracking-tight'>
              {displayReviewCount === 1 ? 'Review' : 'Reviews'}
            </span>
          </div>
        </div>
      )}

      {/* Host Section */}
      <div className='border-b border-gray-200/80 pb-6 mb-6'>
        <div className='flex items-center gap-4'>
          {profilePicUrl ? (
            <img
              src={profilePicUrl}
              alt={owner?.name || 'Host'}
              className='w-12 h-12 rounded-full object-cover border border-gray-200'
            />
          ) : (
            <div className='w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-white font-bold text-lg shadow-sm'>
              {owner?.name?.charAt(0).toUpperCase() || 'H'}
            </div>
          )}
          <div>
            <h3 className='font-bold text-gray-950 text-base'>
              Hosted by {owner?.name || 'Host'}
            </h3>
            <p className='text-xs text-gray-500 font-medium'>{hostingDuration}</p>
          </div>
        </div>
      </div>

      {/* Rare Find Badge Card */}
      {isStudentFavorite && (
        <div className='mb-6 pb-6 border-b border-gray-200/80'>
          <div className='flex items-start gap-4 p-4 bg-white border border-gray-200/60 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.03)]'>
            <div className='w-10 h-10 flex items-center justify-center bg-pink-50 rounded-xl shrink-0'>
              {/* Pink Gem/Diamond Icon */}
              <svg className='w-6 h-6 text-[#FF385C]' viewBox='0 0 24 24' fill='currentColor'>
                <path d='M12 2L2 9l10 13 10-13L12 2zm0 3.3l6.5 4.5H5.5L12 5.3z' />
              </svg>
            </div>
            <div className='flex-1'>
              <h3 className='font-bold text-gray-950 text-sm mb-0.5'>
                Rare find! This place is usually booked
              </h3>
              <p className='text-xs text-gray-500 leading-normal'>
                Recent guests gave the check-in process a 5-star rating.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Description */}
      {description && (
        <div className='pb-6 border-b border-gray-200/80 mb-6'>
          <p className='text-sm md:text-base text-gray-700 leading-relaxed whitespace-pre-line font-normal'>
            {description}
          </p>
        </div>
      )}
    </>
  )
}


