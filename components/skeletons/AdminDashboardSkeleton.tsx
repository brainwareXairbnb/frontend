'use client'

import { Skeleton } from './Skeleton'

/**
 * Admin Dashboard Skeleton - Loading state for admin dashboard
 * Matches the exact layout structure of the dashboard page
 */
export function AdminDashboardSkeleton() {
  return (
    <div className='px-4 md:px-12 pt-4 pb-24'>
      {/* Header Section */}
      <header className='mb-3 md:mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4'>
        <div className='flex-1'>
          <Skeleton className='h-7 w-48 mb-2' />
          <Skeleton className='h-4 w-96 hidden md:block' />
        </div>
        <div className='flex flex-col sm:flex-row gap-3'>
          <Skeleton className='h-10 w-32' />
          <Skeleton className='h-10 w-32' />
        </div>
      </header>

      {/* KPI Cards */}
      <section className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 mb-3 md:mb-6'>
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className='bg-white p-3 md:p-5 rounded-2xl border border-outline-variant/10 shadow-sm'
          >
            <Skeleton className='h-3 w-24 mb-2 md:mb-4' />
            <Skeleton className='h-9 w-32 mb-2' />
            <Skeleton className='h-4 w-20' />
          </div>
        ))}
      </section>

      {/* Growth Analytics & Live Stream */}
      <section className='grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-5 mb-3 md:mb-6'>
        {/* Growth Analytics Chart */}
        <div className='lg:col-span-8 bg-white p-3 md:p-6 rounded-3xl border border-outline-variant/10 shadow-sm'>
          <div className='flex flex-col md:flex-row md:items-center justify-between mb-4 md:mb-8'>
            <div className='flex-1'>
              <Skeleton className='h-6 w-48 mb-2' />
              <Skeleton className='h-4 w-64' />
            </div>
            <Skeleton className='h-10 w-32 mt-4 md:mt-0' />
          </div>

          {/* Bar Chart Skeleton */}
          <div className='h-64 flex items-end justify-between gap-3 px-2'>
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className='flex-1 flex flex-col items-center gap-3'>
                <div className='w-full flex flex-col items-center justify-end h-48'>
                  <Skeleton
                    className='w-full rounded-t-xl'
                    style={{
                      height: `${Math.random() * 120 + 72}px`,
                    }}
                  />
                </div>
                <Skeleton className='h-3 w-8' />
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className='flex items-center justify-center gap-8 mt-8 pt-6 border-t border-outline-variant/10'>
            <div className='flex items-center gap-2'>
              <Skeleton className='w-3 h-1.5 rounded-full' />
              <Skeleton className='h-3 w-32' />
            </div>
            <div className='flex items-center gap-2'>
              <Skeleton className='w-3 h-1.5 rounded-full' />
              <Skeleton className='h-3 w-28' />
            </div>
          </div>
        </div>

        {/* Live Stream */}
        <div className='lg:col-span-4 bg-white p-4 md:p-8 rounded-3xl border border-outline-variant/10 shadow-sm'>
          <div className='flex items-center justify-between mb-4 md:mb-8'>
            <div className='flex-1'>
              <Skeleton className='h-6 w-28 mb-2' />
              <Skeleton className='h-4 w-40' />
            </div>
            <Skeleton className='h-6 w-16 rounded-full' />
          </div>

          <div className='space-y-6'>
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className='flex items-start gap-4 pb-6 border-b border-outline-variant/10 last:border-0 last:pb-0'
              >
                <Skeleton className='w-10 h-10 rounded-2xl shrink-0' />
                <div className='flex-1 min-w-0'>
                  <Skeleton className='h-4 w-32 mb-2' />
                  <Skeleton className='h-3 w-full mb-2' />
                  <Skeleton className='h-3 w-20' />
                </div>
              </div>
            ))}
          </div>

          <Skeleton className='h-4 w-full mt-6 pt-6 border-t border-outline-variant/10' />
        </div>
      </section>

      {/* Top Performing Rooms */}
      <section className='bg-white rounded-3xl border border-outline-variant/10 shadow-sm p-4 md:p-8'>
        <div className='flex items-center justify-between mb-4 md:mb-8'>
          <div className='flex-1'>
            <Skeleton className='h-6 w-56 mb-2' />
            <Skeleton className='h-4 w-72' />
          </div>
          <Skeleton className='h-4 w-32' />
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className='bg-surface-container-lowest rounded-2xl overflow-hidden border border-outline-variant/10'
            >
              <Skeleton className='aspect-video w-full' />
              <div className='p-5'>
                <Skeleton className='h-5 w-3/4 mb-3' />
                <div className='flex items-center justify-between'>
                  <Skeleton className='h-5 w-20' />
                  <Skeleton className='h-6 w-16 rounded-lg' />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
