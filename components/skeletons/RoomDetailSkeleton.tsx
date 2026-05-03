'use client'

import { Skeleton } from './Skeleton'

/**
 * Room Detail Page Skeleton Loader
 * Mimics the layout of the room detail page with image carousel, details, and booking card
 */
export function RoomDetailSkeleton() {
  return (
    <div className='bg-white min-h-screen pb-24 md:pb-0'>
      {/* Mobile Header Skeleton */}
      <div className='md:hidden fixed top-0 w-full z-[100] bg-transparent px-4 pt-2 pb-2 flex justify-between items-center'>
        <Skeleton className='w-8 h-8 rounded-full' />
        <div className='flex gap-3'>
          <Skeleton className='w-8 h-8 rounded-full' />
          <Skeleton className='w-8 h-8 rounded-full' />
        </div>
      </div>

      {/* Mobile Image Carousel Skeleton */}
      <div className='md:hidden relative w-full h-[60vh]'>
        <Skeleton className='w-full h-full' />
        <div className='absolute bottom-10 right-4'>
          <Skeleton className='w-12 h-6 rounded-md' />
        </div>
      </div>

      {/* Main Content */}
      <main className='md:pt-28 max-w-7xl mx-auto px-0 md:px-10'>
        {/* Desktop Title & Image Gallery Skeleton */}
        <div className='hidden md:block mb-8'>
          {/* Title and Actions */}
          <div className='flex justify-between items-end mb-6'>
            <Skeleton className='h-8 w-96' />
            <div className='flex gap-4'>
              <Skeleton className='h-10 w-24' />
              <Skeleton className='h-10 w-24' />
            </div>
          </div>

          {/* Image Grid */}
          <div className='grid grid-cols-4 grid-rows-2 gap-2 h-[60vh] min-h-[400px] rounded-2xl overflow-hidden'>
            <Skeleton className='col-span-2 row-span-2' />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
        </div>

        {/* Content Container */}
        <div className='bg-white rounded-t-3xl -mt-6 md:mt-0 relative z-20 px-6 pt-6 md:px-0 md:pt-0 flex flex-col md:flex-row gap-0 md:gap-20'>
          {/* Left Content Column */}
          <div className='md:w-[60%] flex-1'>
            {/* Mobile Title */}
            <div className='md:hidden mb-6'>
              <Skeleton className='h-8 w-full mb-2' />
              <Skeleton className='h-5 w-3/4 mb-2' />
              <Skeleton className='h-4 w-1/2' />
            </div>

            {/* Desktop Subtitle */}
            <div className='hidden md:block mb-8 pb-8 border-b border-outline-variant/30'>
              <Skeleton className='h-6 w-full mb-2' />
              <Skeleton className='h-5 w-2/3' />
            </div>

            {/* Rating/Badge Row */}
            <div className='md:hidden flex justify-between items-center border border-outline-variant/30 rounded-2xl p-4 mb-6'>
              <Skeleton className='h-16 w-20' />
              <div className='w-px h-12 bg-outline-variant/30' />
              <Skeleton className='h-16 w-20' />
              <div className='w-px h-12 bg-outline-variant/30' />
              <Skeleton className='h-16 w-20' />
            </div>

            {/* Description Section */}
            <div className='mb-8 pb-8 border-b border-outline-variant/30'>
              <Skeleton className='h-6 w-32 mb-4' />
              <div className='space-y-2'>
                <Skeleton className='h-4 w-full' />
                <Skeleton className='h-4 w-full' />
                <Skeleton className='h-4 w-5/6' />
              </div>
            </div>

            {/* Amenities Section */}
            <div className='mb-8 pb-8 border-b border-outline-variant/30'>
              <Skeleton className='h-6 w-48 mb-6' />
              <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className='flex items-center gap-3'>
                    <Skeleton className='w-6 h-6 rounded' />
                    <Skeleton className='h-4 w-24' />
                  </div>
                ))}
              </div>
            </div>

            {/* Host Section */}
            <div className='mb-8 pb-8 border-b border-outline-variant/30'>
              <Skeleton className='h-6 w-40 mb-6' />
              <div className='flex items-center gap-4'>
                <Skeleton className='w-16 h-16 rounded-full' />
                <div className='flex-1'>
                  <Skeleton className='h-5 w-32 mb-2' />
                  <Skeleton className='h-4 w-48' />
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className='mb-8'>
              <Skeleton className='h-6 w-48 mb-6' />
              <div className='space-y-6'>
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className='flex gap-4'>
                    <Skeleton className='w-12 h-12 rounded-full flex-shrink-0' />
                    <div className='flex-1'>
                      <Skeleton className='h-4 w-32 mb-2' />
                      <Skeleton className='h-3 w-24 mb-3' />
                      <div className='space-y-2'>
                        <Skeleton className='h-4 w-full' />
                        <Skeleton className='h-4 w-4/5' />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Booking Card (Desktop) */}
          <div className='hidden md:block w-[35%] relative'>
            <div className='sticky top-28 bg-white border border-outline-variant/30 rounded-2xl p-6 shadow-lg'>
              {/* Price */}
              <div className='mb-6'>
                <Skeleton className='h-8 w-40 mb-2' />
              </div>

              {/* Date Inputs */}
              <div className='border border-outline-variant/50 rounded overflow-hidden mb-4'>
                <div className='flex divide-x divide-outline-variant/50 border-b border-outline-variant/50'>
                  <div className='flex-1 p-3'>
                    <Skeleton className='h-3 w-24 mb-2' />
                    <Skeleton className='h-4 w-20' />
                  </div>
                  <div className='flex-1 p-3'>
                    <Skeleton className='h-3 w-16 mb-2' />
                    <Skeleton className='h-4 w-16' />
                  </div>
                </div>
                <div className='p-3'>
                  <Skeleton className='h-8 w-full' />
                </div>
              </div>

              {/* Reserve Button */}
              <Skeleton className='h-12 w-full rounded-lg mb-4' />

              {/* Price Breakdown */}
              <div className='space-y-3 pt-4 border-t border-outline-variant/30'>
                <div className='flex justify-between'>
                  <Skeleton className='h-4 w-24' />
                  <Skeleton className='h-4 w-16' />
                </div>
                <div className='flex justify-between'>
                  <Skeleton className='h-4 w-32' />
                  <Skeleton className='h-4 w-16' />
                </div>
                <div className='flex justify-between pt-3 border-t border-outline-variant/30'>
                  <Skeleton className='h-5 w-20' />
                  <Skeleton className='h-5 w-20' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Bottom Bar */}
      <div className='md:hidden fixed bottom-0 w-full bg-white border-t border-outline-variant/20 px-6 py-4 flex justify-between items-center z-40'>
        <div>
          <Skeleton className='h-5 w-24 mb-1' />
          <Skeleton className='h-4 w-32' />
        </div>
        <Skeleton className='h-12 w-28 rounded-lg' />
      </div>
    </div>
  )
}
