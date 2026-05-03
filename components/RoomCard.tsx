'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Heart, Star } from 'lucide-react'
import { RoomCardProps } from '@/lib/types'
import { useAuth } from '@/lib/auth-context'
import { userApi } from '@/lib/api'
import { toast } from 'sonner'

export function RoomCard({
  room,
  imageIndex = 0,
  subtitle,
  dateStr,
  priceSuffix,
  showReviewCount = false,
}: RoomCardProps) {
  const [isSaved, setIsSaved] = useState(room.isBookmarked || false)
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()

  // Calculate if listing is new (created within last 7 days)
  const isNewListing = () => {
    console.log(room)
    if (!room.createdAt) return false
    const createdDate = new Date(room.createdAt)
    const now = new Date()
    const daysDiff =
      (now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24)
    console.log({ daysDiff })
    return daysDiff <= 7
  }

  // Determine badge to show
  const getBadgeInfo = () => {
    console.log('Arijit')
    if (isNewListing()) {
      return {
        text: 'New Listing',
        bgColor: 'bg-emerald-500/95',
        textColor: 'text-white',
      }
    }
    if (room.verified) {
      return {
        text: 'Verified',
        bgColor: 'bg-blue-500/95',
        textColor: 'text-white',
      }
    }
    if (room.rating >= 4.5 && room.reviewCount >= 10) {
      return {
        text: 'Top Rated',
        bgColor: 'bg-amber-500/95',
        textColor: 'text-white',
      }
    }
    if (room.badge) {
      return {
        text: room.badge,
        bgColor: 'bg-white/95',
        textColor: 'text-on-surface',
      }
    }
    return null
  }

  const badgeInfo = getBadgeInfo()

  const handleToggleSave = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!isAuthenticated) {
      toast.error('Please login to save listings')
      return
    }

    if (user?.role !== 'student') {
      // Only students can save listings
      return
    }

    try {
      // Optimistic update
      setIsSaved(!isSaved)

      if (isSaved) {
        await userApi.unsaveRoom(room.id)
      } else {
        await userApi.saveRoom(room.id)
      }
    } catch (error) {
      console.error('Failed to toggle save:', error)
      // Revert on error
      setIsSaved(isSaved)
    }
  }

  return (
    <Link href={`/rooms/${room.id}`} className='group cursor-pointer block'>
      <div className='relative rounded overflow-hidden mb-2 sm:mb-3 aspect-[20/19]'>
        <img
          className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]'
          src={room.images[imageIndex] || room.images[0]}
          alt={room.title}
        />
        {badgeInfo && (
          <div
            className={`absolute top-2 left-2 sm:top-3 sm:left-3 ${badgeInfo.bgColor} px-2 sm:px-3 py-0.5 sm:py-1 rounded-full flex items-center gap-1 shadow-sm z-10`}
          >
            <span
              className={`text-[10px] sm:text-xs font-semibold ${badgeInfo.textColor}`}
            >
              {badgeInfo.text}
            </span>
          </div>
        )}
        <button
          className='absolute top-2 right-2 sm:top-3 sm:right-3 z-10 hover:scale-110 transition-transform bg-transparent outline-none p-1 pointer-events-auto'
          onClick={handleToggleSave}
        >
          <Heart
            className={`w-5 h-5 sm:w-6 sm:h-6 transition-colors ${isSaved ? 'fill-[#FF385C] stroke-[#FF385C]' : 'fill-black/50 stroke-white'}`}
            strokeWidth={2}
          />
        </button>
      </div>
      <div className='flex justify-between items-start'>
        <div className='overflow-hidden pr-2'>
          <h3 className='font-semibold text-on-surface truncate text-[12px] sm:text-[15px] leading-tight'>
            {room.title}
          </h3>

          <p className='text-on-surface-variant text-[11px] sm:text-sm mt-0.5 truncate leading-tight'>
            {subtitle || room.location}
          </p>

          {dateStr && (
            <p className='text-on-surface-variant text-[11px] sm:text-sm mt-0.5 truncate leading-tight'>
              {dateStr}
            </p>
          )}

          <div className='mt-1 text-[11px] sm:text-[15px] leading-tight'>
            <span className='font-semibold'>
              ₹{room.price.toLocaleString('en-IN')}
            </span>
            {priceSuffix && (
              <span className='text-on-surface-variant'> {priceSuffix}</span>
            )}
          </div>
        </div>
        <div className='flex items-center gap-1 mt-0.5 shrink-0 pl-1'>
          <Star className='w-3 h-3 sm:w-[13px] sm:h-[13px] fill-current text-on-surface inline-block mb-0.5' />
          <span className='text-[11px] sm:text-sm leading-none font-medium'>
            {room.rating}
            {showReviewCount && (
              <span className='hidden sm:inline font-normal'>
                {' '}
                ({room.reviewCount})
              </span>
            )}
          </span>
        </div>
      </div>
    </Link>
  )
}
