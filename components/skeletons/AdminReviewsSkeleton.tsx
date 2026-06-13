'use client'

import { Skeleton } from './Skeleton'

/**
 * Admin Reviews Skeleton - Loading state for admin reviews page
 * Matches the exact layout structure of the reviews page
 */
export function AdminReviewsSkeleton() {
  return (
    <div className='px-4 sm:px-6 lg:px-8 py-6 pb-20 bg-gray-50 min-h-screen'>
      {/* Header Section */}
      <header className='mb-8'>
        <Skeleton className='h-8 w-64 mb-2' />
        <Skeleton className='h-4 w-80' />
      </header>

      {/* Stats Cards */}
      <section className='grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6'>
        {/* Pending Reviews Card */}
        <div className='bg-white p-4 sm:p-6 rounded border border-gray-200 shadow-sm'>
          <div className='flex items-center justify-between'>
            <div className='flex-1'>
              <Skeleton className='h-3 w-32 mb-2' />
              <Skeleton className='h-8 w-16' />
            </div>
            <Skeleton className='w-12 h-12 rounded-lg' />
          </div>
        </div>

        {/* Average Approval Time Card */}
        <div className='bg-gray-900 p-4 sm:p-6 rounded shadow-sm'>
          <div className='flex items-center justify-between'>
            <div className='flex-1'>
              <Skeleton className='h-3 w-40 mb-2' />
              <Skeleton className='h-8 w-20' />
            </div>
            <Skeleton className='w-12 h-12 rounded-lg' />
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <div className='mb-6 flex flex-col sm:flex-row gap-3'>
        <Skeleton className='flex-1 h-11 rounded-lg' />
        <div className='flex gap-3'>
          <Skeleton className='h-11 w-32 rounded-lg' />
          <Skeleton className='h-11 w-24 rounded-lg' />
        </div>
      </div>

      {/* Reviews List */}
      <section className='space-y-4'>
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className='bg-white rounded border border-gray-200 shadow-sm overflow-hidden'
          >
            <div className='p-4 sm:p-6'>
              <div className='flex flex-col sm:flex-row gap-4'>
                {/* Property Image */}
                <Skeleton className='w-full sm:w-32 h-32 sm:h-24 rounded-lg shrink-0' />

                {/* Review Details */}
                <div className='flex-1 flex flex-col min-w-0'>
                  <div className='flex items-start justify-between gap-3 mb-3'>
                    <div className='flex-1 min-w-0'>
                      <Skeleton className='h-6 w-48 mb-2' />
                      <div className='flex items-center gap-2'>
                        <Skeleton className='h-3 w-20' />
                        <Skeleton className='h-3 w-1 rounded-full' />
                        <Skeleton className='h-3 w-24' />
                      </div>
                    </div>
                    <Skeleton className='h-6 w-20 rounded-md shrink-0' />
                  </div>

                  <div className='flex items-start gap-3 mb-4 p-3 bg-gray-50 rounded-lg'>
                    <Skeleton className='w-10 h-10 rounded-full shrink-0' />
                    <div className='flex-1 min-w-0'>
                      <Skeleton className='h-4 w-32 mb-2' />
                      <Skeleton className='h-4 w-full mb-1' />
                      <Skeleton className='h-4 w-3/4' />
                    </div>
                  </div>

                  <div className='flex flex-col sm:flex-row gap-2 mt-auto pt-4 border-t border-gray-100'>
                    <Skeleton className='flex-1 h-10 rounded-lg' />
                    <Skeleton className='flex-1 h-10 rounded-lg' />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Pagination */}
      <div className='mt-6 flex flex-col sm:flex-row items-center justify-between gap-4'>
        <Skeleton className='h-4 w-48' />
        <div className='flex gap-1'>
          <Skeleton className='w-9 h-9 rounded-lg' />
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className='w-9 h-9 rounded-lg' />
          ))}
          <Skeleton className='w-9 h-9 rounded-lg' />
        </div>
      </div>
    </div>
  )
}
