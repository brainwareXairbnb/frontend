'use client'

import { cn } from '@/lib/utils'

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

/**
 * Base Skeleton component - Animated loading placeholder
 * Can be used standalone or as a building block for complex skeletons
 */
export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%]',
        className,
      )}
      style={{
        animation: 'shimmer 2s infinite',
      }}
      {...props}
    />
  )
}

/**
 * Skeleton Card component - Mimics RoomCard layout
 * Used for listing grids
 */
export function SkeletonCard() {
  return (
    <div className='group cursor-pointer block'>
      {/* Image skeleton */}
      <div className='relative rounded overflow-hidden mb-2 sm:mb-3 aspect-[20/19]'>
        <Skeleton className='w-full h-full' />
        {/* Badge skeleton */}
        <div className='absolute top-2 left-2 sm:top-3 sm:left-3'>
          <Skeleton className='w-24 h-6 rounded-full' />
        </div>
        {/* Heart icon skeleton */}
        <div className='absolute top-2 right-2 sm:top-3 sm:right-3'>
          <Skeleton className='w-6 h-6 sm:w-7 sm:h-7 rounded-full' />
        </div>
      </div>

      <div className='flex justify-between items-start'>
        <div className='overflow-hidden pr-2 flex-1'>
          {/* Title */}
          <Skeleton className='h-4 w-3/4 mb-2' />
          {/* Location */}
          <Skeleton className='h-3 w-1/2 mb-2' />
          {/* Price */}
          <Skeleton className='h-4 w-1/3 mt-2' />
        </div>
        {/* Rating */}
        <div className='shrink-0 pl-1 mt-1'>
          <Skeleton className='h-4 w-10' />
        </div>
      </div>
    </div>
  )
}

/**
 * Skeleton Grid - Multiple skeleton cards in a grid layout
 * @param count - Number of skeleton cards to show (default: 12)
 */
interface SkeletonGridProps {
  count?: number
  className?: string
}

export function SkeletonGrid({ count = 12, className }: SkeletonGridProps) {
  return (
    <section
      className={cn(
        'grid grid-cols-1 min-[480px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6',
        className,
      )}
    >
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </section>
  )
}

/**
 * Skeleton Text - For text placeholders
 */
interface SkeletonTextProps {
  lines?: number
  className?: string
}

export function SkeletonText({ lines = 3, className }: SkeletonTextProps) {
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className='h-4'
          style={{
            width: i === lines - 1 ? '80%' : '100%',
          }}
        />
      ))}
    </div>
  )
}

/**
 * Skeleton Avatar - For profile pictures or icons
 */
interface SkeletonAvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

export function SkeletonAvatar({
  size = 'md',
  className,
}: SkeletonAvatarProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  }

  return (
    <Skeleton className={cn('rounded-full', sizeClasses[size], className)} />
  )
}

/**
 * Skeleton Button - For button placeholders
 */
interface SkeletonButtonProps {
  className?: string
  fullWidth?: boolean
}

export function SkeletonButton({
  className,
  fullWidth = false,
}: SkeletonButtonProps) {
  return (
    <Skeleton
      className={cn(
        'h-10 rounded-lg',
        fullWidth ? 'w-full' : 'w-24',
        className,
      )}
    />
  )
}

// Add shimmer animation to global styles
if (typeof window !== 'undefined') {
  const style = document.createElement('style')
  style.textContent = `
    @keyframes shimmer {
      0% {
        background-position: -200% 0;
      }
      100% {
        background-position: 200% 0;
      }
    }
  `
  document.head.appendChild(style)
}
