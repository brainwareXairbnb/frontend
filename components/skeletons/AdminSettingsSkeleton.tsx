'use client'

import { Skeleton } from './Skeleton'

/**
 * Admin Settings Skeleton - Loading state for admin settings page
 * Matches the exact layout structure of the settings page
 */
export function AdminSettingsSkeleton() {
  return (
    <div className='px-4 sm:px-6 lg:px-8 pt-4 pb-24 bg-gray-50 min-h-screen'>
      {/* Header Section */}
      <header className='mb-4 md:mb-8'>
        <Skeleton className='h-8 w-64 mb-1 md:mb-2' />
        <Skeleton className='h-4 w-96 hidden sm:block' />
      </header>

      {/* Main Settings Card */}
      <section className='grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6'>
        {/* Service Rate Configuration */}
        <div className='lg:col-span-2 bg-white p-4 sm:p-6 rounded border border-gray-200 shadow-sm'>
          <div className='mb-6'>
            <Skeleton className='h-6 w-24 mb-3 rounded-md' />
            <Skeleton className='h-6 w-32 mb-2' />
            <Skeleton className='h-4 w-full max-w-md' />
          </div>

          <div className='mb-6'>
            <Skeleton className='h-3 w-48 mb-3' />
            <div className='max-w-md'>
              <Skeleton className='h-24 w-full rounded-lg' />
            </div>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6'>
            <div className='p-4 bg-emerald-50 rounded-lg border border-emerald-200 flex items-center gap-3'>
              <Skeleton className='w-10 h-10 rounded-lg' />
              <div className='flex-1'>
                <Skeleton className='h-3 w-16 mb-2' />
                <Skeleton className='h-4 w-20' />
              </div>
            </div>
            <div className='p-4 bg-blue-50 rounded-lg border border-blue-200 flex items-center gap-3'>
              <Skeleton className='w-10 h-10 rounded-lg' />
              <div className='flex-1'>
                <Skeleton className='h-3 w-24 mb-2' />
                <Skeleton className='h-4 w-28' />
              </div>
            </div>
          </div>

          <Skeleton className='h-11 w-full sm:max-w-md rounded-lg' />
        </div>

        {/* Change History */}
        <div className='lg:col-span-1 bg-white p-4 sm:p-6 rounded border border-gray-200 shadow-sm'>
          <div className='mb-6 flex items-center justify-between'>
            <div className='flex-1'>
              <Skeleton className='h-6 w-32 mb-2' />
              <Skeleton className='h-4 w-40' />
            </div>
            <Skeleton className='w-9 h-9 rounded-lg' />
          </div>

          <div className='space-y-4'>
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className='relative pl-6'>
                <div className='absolute left-[-4px] top-1.5 w-2.5 h-2.5 rounded-full bg-gray-300' />
                <div className='flex items-start justify-between mb-2'>
                  <div className='flex-1'>
                    <Skeleton className='h-6 w-16 mb-2' />
                    <Skeleton className='h-3 w-24 mb-2' />
                    <Skeleton className='h-3 w-28' />
                  </div>
                  {index === 0 && <Skeleton className='h-5 w-16 rounded' />}
                </div>
                <Skeleton className='h-12 w-full rounded-lg' />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Info Cards */}
      <section className='grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6'>
        {Array.from({ length: 2 }).map((_, index) => (
          <div
            key={index}
            className='bg-white p-4 sm:p-6 rounded border border-gray-200 shadow-sm'
          >
            <div className='flex items-start gap-4'>
              <Skeleton className='w-12 h-12 rounded-lg shrink-0' />
              <div className='flex-1'>
                <Skeleton className='h-5 w-32 mb-2' />
                <Skeleton className='h-4 w-full mb-1' />
                <Skeleton className='h-4 w-3/4 mb-3' />
                <Skeleton className='h-6 w-28 rounded-lg' />
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Notice Banner */}
      <div className='bg-gray-900 p-4 sm:p-6 rounded border border-gray-800 shadow-sm'>
        <div className='flex items-start gap-4'>
          <Skeleton className='w-10 h-10 rounded-lg shrink-0' />
          <div className='flex-1'>
            <Skeleton className='h-4 w-24 mb-2' />
            <Skeleton className='h-4 w-full mb-1' />
            <Skeleton className='h-4 w-2/3' />
          </div>
        </div>
      </div>
    </div>
  )
}
