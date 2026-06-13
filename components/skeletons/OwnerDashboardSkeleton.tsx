'use client'

import { Skeleton } from './Skeleton'

/**
 * Owner Dashboard Skeleton - Loading state for owner dashboard page
 * Matches the exact layout structure of the owner dashboard
 */
export function OwnerDashboardSkeleton() {
  return (
    <div className='px-4 sm:px-6 lg:px-8 pt-6 pb-24 bg-gray-50 min-h-screen'>
      {/* Header Section */}
      <header className='mb-6'>
        <Skeleton className='h-8 w-64 mb-2' />
        <Skeleton className='h-4 w-80' />
      </header>

      {/* Stats Cards */}
      <section className='grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6'>
        {/* Total Earnings Card */}
        <div className='bg-white p-4 sm:p-6 rounded border border-gray-200 shadow-sm'>
          <div className='flex items-center justify-between mb-4'>
            <Skeleton className='h-3 w-24' />
            <Skeleton className='w-10 h-10 rounded-lg' />
          </div>
          <Skeleton className='h-8 w-32 mb-2' />
          <div className='flex items-center gap-2'>
            <Skeleton className='h-5 w-16 rounded' />
            <Skeleton className='h-3 w-20' />
          </div>
        </div>

        {/* Total Properties Card */}
        <div className='bg-white p-4 sm:p-6 rounded border border-gray-200 shadow-sm'>
          <div className='flex items-center justify-between mb-4'>
            <Skeleton className='h-3 w-28' />
            <Skeleton className='w-10 h-10 rounded-lg' />
          </div>
          <Skeleton className='h-8 w-16 mb-2' />
          <Skeleton className='h-3 w-24' />
        </div>

        {/* Pending Requests Card */}
        <div className='col-span-2 lg:col-span-1 bg-white p-4 sm:p-6 rounded border border-gray-200 shadow-sm'>
          <div className='flex items-center justify-between mb-4'>
            <Skeleton className='h-3 w-32' />
            <Skeleton className='w-10 h-10 rounded-lg' />
          </div>
          <Skeleton className='h-8 w-16 mb-2' />
          <Skeleton className='h-5 w-28 rounded' />
        </div>
      </section>

      {/* Revenue Chart + Recent Requests */}
      <section className='grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6'>
        {/* Revenue Chart */}
        <div className='lg:col-span-8 bg-white p-4 sm:p-6 rounded border border-gray-200 shadow-sm'>
          <div className='flex items-center justify-between mb-6'>
            <div className='flex-1'>
              <Skeleton className='h-6 w-40 mb-2' />
              <Skeleton className='h-3 w-48' />
            </div>
            <div className='flex gap-3'>
              <Skeleton className='h-10 w-32 rounded-lg' />
              <Skeleton className='h-10 w-10 rounded-lg' />
            </div>
          </div>

          {/* Bar Chart */}
          <div className='flex items-end justify-between gap-3 h-64'>
            {Array.from({ length: 7 }).map((_, index) => (
              <div key={index} className='flex-1 flex flex-col items-center gap-2'>
                <Skeleton
                  className='w-full rounded-t-lg'
                  style={{
                    height: `${Math.random() * 60 + 40}%`,
                  }}
                />
                <Skeleton className='h-3 w-8' />
              </div>
            ))}
          </div>
        </div>

        {/* Recent Booking Requests */}
        <div className='lg:col-span-4 bg-white p-4 sm:p-6 rounded border border-gray-200 shadow-sm'>
          <div className='flex items-center justify-between mb-6'>
            <Skeleton className='h-6 w-48' />
            <Skeleton className='h-5 w-8 rounded-full' />
          </div>

          <div className='space-y-4 mb-4'>
            {Array.from({ length: 2 }).map((_, index) => (
              <div
                key={index}
                className='p-4 bg-gray-50 rounded-lg border border-gray-200'
              >
                <div className='flex items-start gap-3 mb-3'>
                  <Skeleton className='w-12 h-12 rounded-full shrink-0' />
                  <div className='flex-1 min-w-0'>
                    <Skeleton className='h-4 w-32 mb-2' />
                    <Skeleton className='h-3 w-24' />
                  </div>
                </div>
                <div className='space-y-2 mb-3'>
                  <div className='flex items-center gap-2'>
                    <Skeleton className='w-4 h-4 rounded' />
                    <Skeleton className='h-3 w-28' />
                  </div>
                  <div className='flex items-center gap-2'>
                    <Skeleton className='w-4 h-4 rounded' />
                    <Skeleton className='h-3 w-32' />
                  </div>
                </div>
                <div className='flex gap-2'>
                  <Skeleton className='flex-1 h-9 rounded-lg' />
                  <Skeleton className='flex-1 h-9 rounded-lg' />
                </div>
              </div>
            ))}
          </div>

          <Skeleton className='h-10 w-full rounded-lg' />
        </div>
      </section>

      {/* Top Performing Properties */}
      <section>
        <div className='flex items-center justify-between mb-4'>
          <Skeleton className='h-6 w-56' />
          <Skeleton className='h-4 w-32' />
        </div>

        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {/* Top by Revenue */}
          <div className='bg-white p-4 sm:p-6 rounded border border-gray-200 shadow-sm'>
            <Skeleton className='h-5 w-24 rounded mb-4' />
            <Skeleton className='w-full h-40 rounded-lg mb-4' />
            <Skeleton className='h-5 w-48 mb-2' />
            <Skeleton className='h-3 w-32 mb-4' />
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <Skeleton className='h-3 w-16 mb-2' />
                <Skeleton className='h-6 w-20' />
              </div>
              <div>
                <Skeleton className='h-3 w-16 mb-2' />
                <Skeleton className='h-6 w-16' />
              </div>
            </div>
          </div>

          {/* Top by Views */}
          <div className='bg-white p-4 sm:p-6 rounded border border-gray-200 shadow-sm'>
            <Skeleton className='h-5 w-28 rounded mb-4' />
            <Skeleton className='w-full h-40 rounded-lg mb-4' />
            <Skeleton className='h-5 w-48 mb-2' />
            <Skeleton className='h-3 w-32 mb-4' />
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <Skeleton className='h-3 w-16 mb-2' />
                <Skeleton className='h-6 w-20' />
              </div>
              <div>
                <Skeleton className='h-3 w-12 mb-2' />
                <Skeleton className='h-6 w-16' />
              </div>
            </div>
          </div>

          {/* Add New Property Card */}
          <div className='bg-white p-4 sm:p-6 rounded border-2 border-dashed border-gray-300 shadow-sm flex flex-col items-center justify-center min-h-[280px]'>
            <Skeleton className='w-12 h-12 rounded-lg mb-4' />
            <Skeleton className='h-5 w-40 mb-2' />
            <Skeleton className='h-3 w-48' />
          </div>
        </div>
      </section>
    </div>
  )
}
