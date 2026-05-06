export default function AdminListingsSkeleton() {
  return (
    <div className='px-4 py-6 pb-24 md:pb-8'>
      {/* Stats Cards Skeleton */}
      <section className='grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 animate-pulse'>
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

      {/* Search and Filters Skeleton */}
      <div className='mb-6 space-y-4 animate-pulse'>
        {/* Search Bar Skeleton */}
        <div className='bg-white border-2 border-outline-variant/10 rounded-2xl px-4 py-3.5 flex items-center gap-3 shadow-sm'>
          <div className='w-5 h-5 rounded bg-slate-100' />
          <div className='flex-1 h-4 bg-slate-100 rounded' />
        </div>

        {/* Filter Tabs Skeleton */}
        <div className='flex gap-2 sm:gap-3 overflow-x-auto pb-2'>
          {[1, 2, 3, 4].map((filter) => (
            <div
              key={filter}
              className='h-11 w-28 bg-white border-2 border-outline-variant/10 rounded-xl'
            />
          ))}
        </div>
      </div>

      {/* Listings Grid Skeleton */}
      <section className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6'>
        {[1, 2, 3, 4, 5, 6].map((card) => (
          <div
            key={card}
            className='bg-white rounded-2xl overflow-hidden border border-border/50 shadow-sm animate-pulse'
          >
            {/* Image Skeleton */}
            <div className='relative aspect-[4/3] bg-slate-100'>
              {/* Price Badge Skeleton */}
              <div className='absolute bottom-3 left-3 w-24 h-7 bg-slate-200 rounded-lg' />
              {/* Status Badge Skeleton */}
              <div className='absolute top-3 right-3 w-28 h-6 bg-slate-200 rounded-full' />
            </div>

            {/* Content Skeleton */}
            <div className='p-4 space-y-3'>
              {/* Title Skeleton */}
              <div className='h-4 bg-slate-100 rounded w-3/4' />

              {/* Location Skeleton */}
              <div className='flex items-center gap-1'>
                <div className='w-3.5 h-3.5 rounded bg-slate-100' />
                <div className='h-3 bg-slate-100 rounded w-1/2' />
              </div>

              {/* Info Grid Skeleton */}
              <div className='grid grid-cols-2 gap-3'>
                <div className='flex items-center gap-1'>
                  <div className='w-3.5 h-3.5 rounded bg-slate-100' />
                  <div className='h-3 bg-slate-100 rounded w-16' />
                </div>
                <div className='flex items-center justify-end gap-1'>
                  <div className='w-3.5 h-3.5 rounded bg-slate-100' />
                  <div className='h-3 bg-slate-100 rounded w-12' />
                </div>
                <div className='h-3 bg-slate-100 rounded w-14' />
                <div className='flex items-center justify-end gap-1'>
                  <div className='w-3.5 h-3.5 rounded bg-slate-100' />
                  <div className='h-3 bg-slate-100 rounded w-14' />
                </div>
              </div>

              {/* Actions Skeleton */}
              <div className='flex flex-col gap-2 pt-2'>
                {/* Primary action buttons - varies per card */}
                {card % 3 === 0 ? (
                  <div className='flex gap-2'>
                    <div className='flex-1 h-9 bg-slate-100 rounded' />
                    <div className='flex-1 h-9 bg-slate-100 rounded' />
                  </div>
                ) : (
                  <div className='h-9 bg-slate-100 rounded w-full' />
                )}

                {/* Secondary actions */}
                <div className='flex gap-2'>
                  <div className='flex-1 h-9 bg-slate-100 rounded' />
                  <div className='flex-1 h-9 bg-slate-100 rounded' />
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}
