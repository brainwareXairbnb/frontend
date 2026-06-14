'use client'

import { Skeleton } from './Skeleton'


export function AdminBookingCardSkeleton() {
  return (
    <div className='bg-white rounded-2xl border border-outline-variant/10 shadow-sm p-4 sm:p-5 lg:p-6'>
      <div className='flex flex-col xl:flex-row gap-5 animate-pulse'>
        {/* Image Skeleton */}
        <Skeleton className='w-full xl:w-52 h-52 sm:h-60 xl:h-44 rounded-2xl shrink-0' />

        {/* Content Skeleton */}
        <div className='flex-1 flex flex-col justify-between space-y-4 xl:space-y-0'>
          {/* Top section */}
          <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'>
            {/* Column 1: Property */}
            <div>
              <Skeleton className='h-3 w-16 mb-2' />
              <Skeleton className='h-6 w-24 mb-3' />
              <div className='flex items-center gap-3'>
                <Skeleton className='w-10 h-10 rounded-xl' />
                <div className='flex-1 space-y-1.5'>
                  <Skeleton className='h-4 w-3/4' />
                  <Skeleton className='h-3 w-1/2' />
                </div>
              </div>
            </div>

            {/* Column 2: People */}
            <div>
              <Skeleton className='h-3 w-16 mb-3' />
              <div className='space-y-4'>
                <div className='flex items-center gap-3'>
                  <Skeleton className='w-10 h-10 rounded-xl' />
                  <div className='flex-1 space-y-1.5'>
                    <Skeleton className='h-4 w-1/2' />
                    <Skeleton className='h-3 w-1/4' />
                  </div>
                </div>
                <div className='flex items-center gap-3'>
                  <Skeleton className='w-10 h-10 rounded-xl' />
                  <div className='flex-1 space-y-1.5'>
                    <Skeleton className='h-4 w-1/2' />
                    <Skeleton className='h-3 w-1/4' />
                  </div>
                </div>
              </div>
            </div>

            {/* Column 3: Stay */}
            <div>
              <Skeleton className='h-3 w-20 mb-3' />
              <div className='space-y-3'>
                <div className='flex items-center gap-3'>
                  <Skeleton className='w-4 h-4 rounded' />
                  <Skeleton className='h-4 w-24' />
                </div>
                <div className='flex items-center gap-3'>
                  <Skeleton className='w-4 h-4 rounded' />
                  <Skeleton className='h-4 w-16' />
                </div>
                <div className='flex items-center gap-3'>
                  <Skeleton className='w-4 h-4 rounded' />
                  <Skeleton className='h-4 w-24' />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom section */}
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6 pt-5 border-t border-outline-variant/10'>
            <Skeleton className='h-8 w-24 rounded-full' />
            <Skeleton className='h-11 w-full sm:w-36 rounded-xl' />
          </div>
        </div>
      </div>
    </div>
  )
}
