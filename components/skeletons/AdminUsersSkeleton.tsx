export default function AdminUsersSkeleton() {
  return (
    <div className='px-4 md:px-12 py-6 pb-24'>
      {/* KPI Cards Skeleton */}
      <section className='grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-8 animate-pulse'>
        {[1, 2, 3, 4].map((stat) => (
          <div
            key={stat}
            className='bg-white p-4 md:p-6 rounded-2xl border border-outline-variant/10 shadow-sm'
          >
            <div className='flex items-center justify-between mb-2'>
              <div className='w-9 h-9 rounded-lg bg-slate-100' />
              <div className='h-3 bg-slate-100 rounded w-16' />
            </div>
            <div className='h-7 bg-slate-100 rounded w-12' />
          </div>
        ))}
      </section>

      {/* Tabs Skeleton */}
      <div className='mb-6 border-b border-outline-variant/10 overflow-x-auto animate-pulse'>
        <div className='flex gap-0'>
          {[1, 2, 3, 4].map((tab) => (
            <div key={tab} className='px-4 md:px-6 py-6 h-14'>
              <div className='h-4 bg-slate-100 rounded w-24' />
            </div>
          ))}
        </div>
      </div>

      {/* Table Skeleton - Desktop */}
      <div className='hidden md:block bg-white rounded-2xl border border-outline-variant/10 shadow-sm overflow-hidden animate-pulse'>
        <table className='w-full'>
          <thead>
            <tr className='border-b border-outline-variant/10 bg-surface-container-lowest'>
              <th className='text-left px-6 py-4'>
                <div className='h-3 bg-slate-100 rounded w-12' />
              </th>
              <th className='text-left px-6 py-4'>
                <div className='h-3 bg-slate-100 rounded w-10' />
              </th>
              <th className='text-left px-6 py-4'>
                <div className='h-3 bg-slate-100 rounded w-12' />
              </th>
              <th className='text-left px-6 py-4'>
                <div className='h-3 bg-slate-100 rounded w-12' />
              </th>
              <th className='text-right px-6 py-4'>
                <div className='h-3 bg-slate-100 rounded w-16 ml-auto' />
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-outline-variant/10'>
            {[1, 2, 3, 4, 5, 6].map((row) => (
              <tr key={row}>
                <td className='px-6 py-4'>
                  <div className='flex items-center gap-3'>
                    <div className='w-10 h-10 rounded-full bg-slate-100' />
                    <div className='space-y-2 flex-1'>
                      <div className='h-3.5 bg-slate-100 rounded w-32' />
                      <div className='h-3 bg-slate-100 rounded w-40' />
                    </div>
                  </div>
                </td>
                <td className='px-6 py-4'>
                  <div className='h-3 bg-slate-100 rounded w-16' />
                </td>
                <td className='px-6 py-4'>
                  <div className='h-5 bg-slate-100 rounded-full w-16' />
                </td>
                <td className='px-6 py-4'>
                  <div className='h-3 bg-slate-100 rounded w-24' />
                </td>
                <td className='px-6 py-4'>
                  <div className='flex justify-end gap-1'>
                    <div className='w-8 h-8 rounded bg-slate-100' />
                    <div className='w-8 h-8 rounded bg-slate-100' />
                    <div className='w-8 h-8 rounded bg-slate-100' />
                    <div className='w-8 h-8 rounded bg-slate-100' />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards Skeleton - Mobile */}
      <div className='md:hidden space-y-3 animate-pulse'>
        {[1, 2, 3, 4].map((card) => (
          <div
            key={card}
            className='bg-white rounded-2xl border border-outline-variant/10 shadow-sm overflow-hidden'
          >
            {/* User Info Header */}
            <div className='p-4 bg-gradient-to-br from-surface-container-lowest to-white'>
              <div className='flex items-start gap-3'>
                <div className='w-12 h-12 rounded-xl bg-slate-100 shrink-0' />
                <div className='flex-1 space-y-2'>
                  <div className='h-4 bg-slate-100 rounded w-28' />
                  <div className='h-3 bg-slate-100 rounded w-40' />
                  <div className='flex items-center gap-2'>
                    <div className='h-5 bg-slate-100 rounded-full w-16' />
                    <div className='h-5 bg-slate-100 rounded-full w-14' />
                  </div>
                </div>
              </div>

              {/* Joined Date */}
              <div className='mt-3 pt-3 border-t border-outline-variant/10'>
                <div className='flex items-center gap-2'>
                  <div className='w-3.5 h-3.5 rounded bg-slate-100' />
                  <div className='h-3 bg-slate-100 rounded w-32' />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className='p-3 bg-surface-container-lowest/30'>
              <div className='grid grid-cols-4 gap-2'>
                {[1, 2, 3, 4].map((btn) => (
                  <div
                    key={btn}
                    className='flex flex-col items-center gap-1.5 p-2.5 rounded-xl bg-white'
                  >
                    <div className='w-8 h-8 rounded-lg bg-slate-100' />
                    <div className='h-2.5 bg-slate-100 rounded w-10' />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
