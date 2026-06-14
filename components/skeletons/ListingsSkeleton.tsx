export default function ListingsSkeleton() {
  return (
    <div className='px-0 md:px-12 pb-20'>
      {/* Stats Grid Skeleton */}
      <section className='grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-10 animate-pulse'>
        {[1, 2, 3, 4].map((stat) => (
          <div
            key={stat}
            className='bg-white p-4 md:p-6 rounded border border-outline-variant/10 shadow-sm'
          >
            <div className='flex items-center gap-2 mb-3'>
              <div className='w-5 h-5 rounded bg-slate-100' />
              <div className='h-3 bg-slate-100 rounded w-16' />
            </div>
            <div className='h-8 md:h-9 bg-slate-100 rounded w-12' />
          </div>
        ))}
      </section>

      {/* Listings Grid Skeleton */}
      <section className='grid grid-cols-1 min-[480px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5 md:gap-6'>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((card) => (
          <div
            key={card}
            className='bg-white rounded-2xl overflow-hidden border border-outline-variant/10 shadow-sm animate-pulse'
          >
            {/* Image Skeleton */}
            <div className='relative aspect-[4/3] bg-slate-100'>
              {/* Status Badge Skeleton */}
              <div className='absolute top-2 left-2'>
                <div className='h-5 w-16 bg-slate-200 rounded-full' />
              </div>
              {/* Available Badge Skeleton - appears on some cards */}
              {card % 3 === 0 && (
                <div className='absolute top-2 right-2'>
                  <div className='h-5 w-20 bg-slate-200 rounded-full' />
                </div>
              )}
              {/* Bed Count Badge Skeleton */}
              <div className='absolute bottom-2 left-2'>
                <div className='h-5 w-12 bg-slate-200/80 rounded-full' />
              </div>
            </div>

            {/* Content Section Skeleton */}
            <div className='p-3 space-y-3'>
              {/* Title and Location */}
              <div className='space-y-2'>
                <div className='h-4 bg-slate-100 rounded w-3/4' />
                <div className='h-3 bg-slate-100 rounded w-1/2' />
              </div>

              {/* Stats Row */}
              <div className='flex items-center gap-3 pb-3 border-b border-outline-variant/10'>
                <div className='flex items-center gap-1'>
                  <div className='w-3 h-3 rounded bg-slate-100' />
                  <div className='h-3 bg-slate-100 rounded w-8' />
                </div>
                <div className='flex items-center gap-1'>
                  <div className='w-3 h-3 rounded bg-slate-100' />
                  <div className='h-3 bg-slate-100 rounded w-8' />
                </div>
              </div>

              {/* Price and Actions */}
              <div className='flex justify-between items-center'>
                <div className='space-y-1'>
                  <div className='h-3 bg-slate-100 rounded w-12' />
                  <div className='h-4 bg-slate-100 rounded w-16' />
                </div>
                <div className='flex gap-2'>
                  <div className='h-9 w-9 rounded bg-slate-100' />
                  <div className='h-9 w-9 rounded bg-slate-100' />
                  <div className='h-9 w-9 rounded bg-slate-100' />
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}
