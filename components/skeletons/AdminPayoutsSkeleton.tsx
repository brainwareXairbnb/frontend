'use client'

import { Skeleton } from './Skeleton'

/**
 * Admin Payouts Skeleton - Loading state for admin payouts page
 * Matches the exact layout structure of the payouts page
 */
export function AdminPayoutsSkeleton() {
  return (
    <div className='px-4 sm:px-6 lg:px-8 pt-4 pb-24 bg-gray-50 min-h-screen'>
      {/* Header Section */}
      <header className='mb-3 md:mb-6'>
        <div className='flex items-center justify-between mb-2 md:mb-4'>
          <div className='flex-1'>
            <Skeleton className='h-8 w-56 mb-1 md:mb-2' />
            <Skeleton className='h-4 w-96 hidden sm:block' />
          </div>
          <Skeleton className='h-10 w-24 shrink-0' />
        </div>
      </header>

      {/* Stats Cards */}
      <section className='grid grid-cols-2 lg:grid-cols-3 gap-3 mb-4 md:mb-6'>
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className={`${index === 2 ? 'sm:col-span-2 lg:col-span-1' : ''} ${index === 2 ? 'bg-gray-900' : 'bg-white'} p-3 sm:p-5 rounded border ${index === 2 ? 'border-gray-900' : 'border-gray-200'} shadow-sm`}
          >
            <div className='flex items-center justify-between mb-2 md:mb-4'>
              <Skeleton className='w-10 h-10 md:w-12 md:h-12 rounded-lg' />
              <Skeleton className='h-6 w-16 rounded-md' />
            </div>
            <Skeleton className='h-3 w-32 mb-2' />
            <Skeleton className='h-8 w-40 mb-2' />
            <Skeleton className='h-3 w-28' />
          </div>
        ))}
      </section>

      {/* Search and Filters */}
      <div className='mb-6 flex flex-col gap-3'>
        <Skeleton className='h-11 w-full rounded-lg' />
        <div className='flex gap-2 overflow-x-auto pb-2'>
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className='h-9 w-20 rounded-lg shrink-0' />
          ))}
        </div>
      </div>

      {/* Mobile Cards (visible on mobile) */}
      <section className='space-y-4 lg:hidden'>
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className='bg-white rounded border border-gray-200 shadow-sm overflow-hidden'
          >
            <div className='p-4'>
              {/* Owner Info */}
              <div className='flex items-center gap-3 mb-4 pb-4 border-b border-gray-100'>
                <Skeleton className='w-12 h-12 rounded-lg shrink-0' />
                <div className='flex-1 min-w-0'>
                  <Skeleton className='h-4 w-32 mb-2' />
                  <Skeleton className='h-3 w-40' />
                </div>
                <Skeleton className='h-6 w-20 rounded-md' />
              </div>

              {/* Amount & Date */}
              <div className='grid grid-cols-2 gap-4 mb-4'>
                <div>
                  <Skeleton className='h-3 w-20 mb-2' />
                  <Skeleton className='h-6 w-24' />
                </div>
                <div>
                  <Skeleton className='h-3 w-12 mb-2' />
                  <Skeleton className='h-4 w-28' />
                </div>
              </div>

              {/* Bank Details */}
              <div className='bg-gray-50 rounded-lg p-3 mb-4'>
                <div className='flex items-center justify-between mb-2'>
                  <Skeleton className='h-3 w-24' />
                  <Skeleton className='h-5 w-16 rounded' />
                </div>
                <Skeleton className='h-4 w-32 mb-2' />
                <Skeleton className='h-3 w-40 mb-3' />
                <div className='flex items-center justify-between'>
                  <div className='flex-1'>
                    <Skeleton className='h-3 w-20 mb-1' />
                    <Skeleton className='h-3 w-28' />
                  </div>
                  <div className='flex-1 text-right'>
                    <Skeleton className='h-3 w-12 mb-1 ml-auto' />
                    <Skeleton className='h-3 w-20 ml-auto' />
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className='flex gap-2'>
                <Skeleton className='flex-1 h-10 rounded-lg' />
                <Skeleton className='h-10 w-24 rounded-lg' />
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Desktop Table (visible on desktop) */}
      <section className='hidden lg:block bg-white rounded border border-gray-200 shadow-sm overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full border-collapse'>
            <thead>
              <tr className='bg-gray-50 border-b border-gray-200'>
                <th className='text-left px-6 py-3'>
                  <Skeleton className='h-3 w-12' />
                </th>
                <th className='text-left px-6 py-3'>
                  <Skeleton className='h-3 w-24' />
                </th>
                <th className='text-left px-6 py-3'>
                  <Skeleton className='h-3 w-16' />
                </th>
                <th className='text-left px-6 py-3'>
                  <Skeleton className='h-3 w-12' />
                </th>
                <th className='text-left px-6 py-3'>
                  <Skeleton className='h-3 w-12' />
                </th>
                <th className='text-right px-6 py-3'>
                  <Skeleton className='h-3 w-16 ml-auto' />
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-100'>
              {Array.from({ length: 8 }).map((_, index) => (
                <tr key={index}>
                  <td className='px-6 py-4'>
                    <div className='flex items-center gap-3'>
                      <Skeleton className='w-10 h-10 rounded-lg shrink-0' />
                      <div className='min-w-0'>
                        <Skeleton className='h-4 w-32 mb-2' />
                        <Skeleton className='h-3 w-40' />
                      </div>
                    </div>
                  </td>
                  <td className='px-6 py-4'>
                    <Skeleton className='h-6 w-20 mb-2 rounded' />
                    <Skeleton className='h-4 w-32 mb-1' />
                    <Skeleton className='h-3 w-24' />
                  </td>
                  <td className='px-6 py-4'>
                    <Skeleton className='h-5 w-24 mb-2' />
                    <Skeleton className='h-3 w-32' />
                  </td>
                  <td className='px-6 py-4'>
                    <Skeleton className='h-4 w-28 mb-2' />
                    <Skeleton className='h-3 w-20' />
                  </td>
                  <td className='px-6 py-4'>
                    <Skeleton className='h-7 w-24 rounded-lg' />
                  </td>
                  <td className='px-6 py-4'>
                    <div className='flex items-center justify-end gap-2'>
                      <Skeleton className='h-9 w-20 rounded-lg' />
                      <Skeleton className='h-9 w-16 rounded-lg' />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className='px-6 py-4 border-t border-gray-200 bg-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4'>
          <Skeleton className='h-4 w-48' />
          <div className='flex gap-1'>
            <Skeleton className='w-9 h-9 rounded-lg' />
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className='w-9 h-9 rounded-lg' />
            ))}
            <Skeleton className='w-9 h-9 rounded-lg' />
          </div>
        </div>
      </section>

      {/* Mobile Pagination */}
      <div className='lg:hidden mt-6 flex flex-col sm:flex-row items-center justify-between gap-4'>
        <Skeleton className='h-4 w-32' />
        <div className='flex gap-1'>
          <Skeleton className='w-9 h-9 rounded-lg' />
          <Skeleton className='w-9 h-9 rounded-lg' />
        </div>
      </div>
    </div>
  )
}
