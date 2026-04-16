import Link from 'next/link'
import { Room } from '@/data/rooms'
import { Heart, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface RoomCardProps {
  room: Room
  imageIndex?: number
  subtitle?: React.ReactNode
  dateStr?: React.ReactNode
  priceSuffix?: React.ReactNode
  showReviewCount?: boolean
}

export function RoomCard({
  room,
  imageIndex = 0,
  subtitle,
  dateStr,
  priceSuffix,
  showReviewCount = false,
}: RoomCardProps) {
  return (
    <Link href={`/rooms/${room.id}`} className='group cursor-pointer block'>
      <div className='relative rounded overflow-hidden mb-2 sm:mb-3 aspect-[20/19]'>
        <img
          className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]'
          src={room.images[imageIndex] || room.images[0]}
          alt={room.title}
        />
        <div className='absolute top-2 left-2 sm:top-3 sm:left-3 bg-white/95 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full flex items-center gap-1 shadow-sm'>
          <span className='text-[10px] sm:text-xs font-semibold text-on-surface'>
            Student favourite
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className='absolute top-2 right-2 sm:top-3 sm:right-3 text-white hover:scale-110 transition-transform hover:bg-transparent'
        >
          <Heart className='w-5 h-5 sm:w-6 sm:h-6 fill-black/50 stroke-white' strokeWidth={2} />
        </Button>
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
            <span className='font-semibold'>₹{room.price.toLocaleString('en-IN')}</span>
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
