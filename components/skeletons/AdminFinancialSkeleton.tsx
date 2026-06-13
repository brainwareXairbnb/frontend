'use client'

import { Skeleton } from './Skeleton'

/**
 * Admin Financial Skeleton - Loading state for admin financial page
 * Matches the exact layout structure of the financial page
 */
export function AdminFinancialSkeleton() {
  return (
    <div className='px-4 sm:px-6 lg:px-8 py-6 pb-20 bg-gray-50 min-h-screen'>
      {/* Header Section */}
      <header className='mb-8'>
        <div className='flex items-center justify-between mb-4'>
          <div className='flex-1'>
            <Skeleton className='h-8 w-64 mb-2' />
            <Skeleton className='h-4 w-96' />
          </div>
          <Skeleton className='h-10 w-24 shrink-0' />
        </div>
      </header>

      {/* KPI Cards */}
      <section className='grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6'>
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className='bg-white p-4 sm:p-6 rounded border border-gray-200 shadow-sm'
          >
            <div className='flex items-center justify-between mb-4'>
              <Skeleton className='w-12 h-12 rounded-lg' />
              <Skeleton className='h-6 w-12 rounded-md' />
            </div>
            <Skeleton className='h-3 w-24 mb-2' />
            <Skeleton className='h-8 w-32 mb-2' />
            <Skeleton className='h-3 w-28' />
          </div>
        ))}
      </section>

      {/* Revenue Trends & Listing Performance */}
      <section className='grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6'>
        {/* Revenue Trends Chart */}
        <div className='lg:col-span-2 bg-white p-4 sm:p-6 rounded border border-gray-200 shadow-sm'>
          <div className='flex flex-col sm:flex-row sm:items-center justify-between mb-6'>
            <div className='flex-1'>
              <Skeleton className='h-6 w-40 mb-2' />
              <Skeleton className='h-4 w-56' />
            </div>
            <Skeleton className='h-10 w-48 mt-4 sm:mt-0 rounded-lg' />
          </div>

          {/* Bar Chart Skeleton */}
          <div className='h-64 flex items-end justify-between gap-2 sm:gap-3'>
            {Array.from({ length: 12 }).map((_, index) => (
              <div key={index} className='flex-1 flex flex-col items-center gap-2'>
                <div className='w-full flex flex-col items-center justify-end h-48'>
                  <Skeleton
                    className='w-full rounded-t-lg'
                    style={{
                      height: `${Math.random() * 120 + 72}px`,
                    }}
                  />
                </div>
                <Skeleton className='h-3 w-8' />
              </div>
            ))}
          </div>
        </div>

        {/* Listing Performance */}
        <div className='lg:col-span-1 bg-white p-4 sm:p-6 rounded border border-gray-200 shadow-sm'>
          <div className='flex items-center justify-between mb-6'>
            <div className='flex-1'>
              <Skeleton className='h-6 w-32 mb-2' />
              <Skeleton className='h-4 w-24' />
            </div>
            <Skeleton className='w-10 h-10 rounded-lg' />
          </div>

          <div className='space-y-4'>
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className='flex items-center justify-between py-4 border-b border-gray-100 last:border-0 last:pb-0'
              >
                <div className='flex items-center gap-3 flex-1 min-w-0'>
                  <Skeleton className='w-8 h-8 rounded-lg shrink-0' />
                  <div className='flex-1 min-w-0'>
                    <Skeleton className='h-4 w-32 mb-2' />
                    <Skeleton className='h-3 w-20' />
                  </div>
                </div>
                <div className='shrink-0 ml-3'>
                  <Skeleton className='h-5 w-16 mb-1' />
                  <Skeleton className='h-3 w-16' />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Transactions */}
      <section className='bg-white rounded border border-gray-200 shadow-sm overflow-hidden'>
        <div className='p-4 sm:p-6 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
          <div className='flex-1'>
            <div className='flex items-center gap-2 mb-1'>
              <Skeleton className='w-2 h-2 rounded-full' />
              <Skeleton className='h-6 w-48' />
            </div>
            <Skeleton className='h-4 w-64' />
          </div>
        </div>

        <div className='overflow-x-auto'>
          <table className='w-full border-collapse'>
            <thead>
              <tr className='bg-gray-50'>
                <th className='text-left px-4 sm:px-6 py-3'>
                  <Skeleton className='h-3 w-24' />
                </th>
                <th className='text-left px-4 sm:px-6 py-3'>
                  <Skeleton className='h-3 w-16' />
                </th>
                <th className='text-left px-4 sm:px-6 py-3'>
                  <Skeleton className='h-3 w-12' />
                </th>
                <th className='text-right px-4 sm:px-6 py-3'>
                  <Skeleton className='h-3 w-20 ml-auto' />
                </th>
                <th className='text-right px-4 sm:px-6 py-3'>
                  <Skeleton className='h-3 w-16 ml-auto' />
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-100'>
              {Array.from({ length: 8 }).map((_, index) => (
                <tr key={index}>
                  <td className='px-4 sm:px-6 py-4'>
                    <Skeleton className='h-4 w-32 mb-2' />
                    <Skeleton className='h-3 w-24' />
                  </td>
                  <td className='px-4 sm:px-6 py-4'>
                    <div className='flex items-center gap-3'>
                      <Skeleton className='w-10 h-10 rounded-lg shrink-0' />
                      <Skeleton className='h-4 w-28' />
                    </div>
                  </td>
                  <td className='px-4 sm:px-6 py-4'>
                    <Skeleton className='h-4 w-20 mb-2' />
                    <Skeleton className='h-3 w-16' />
                  </td>
                  <td className='px-4 sm:px-6 py-4 text-right'>
                    <Skeleton className='h-4 w-16 ml-auto mb-2' />
                    <Skeleton className='h-3 w-16 ml-auto' />
                  </td>
                  <td className='px-4 sm:px-6 py-4 text-right'>
                    <Skeleton className='h-6 w-20 ml-auto rounded-md' />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
