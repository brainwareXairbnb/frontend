export function ProfileSkeleton() {
  return (
    <div className='min-h-screen bg-white'>
      <div className='max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 py-8 sm:py-12'>
        {/* Profile Card Skeleton */}
        <div className='bg-white border border-gray-200 rounded p-4 sm:p-6 mb-6 sm:mb-8 animate-pulse'>
          <div className='flex items-start justify-between gap-3'>
            <div className='flex items-start gap-3 sm:gap-5 flex-1 min-w-0'>
              {/* Avatar Skeleton */}
              <div className='w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gray-200 shrink-0' />

              {/* Info Skeleton */}
              <div className='flex-1 min-w-0 space-y-3'>
                {/* Name */}
                <div className='h-5 sm:h-6 bg-gray-200 rounded w-32 sm:w-40' />

                {/* Email and Join Date */}
                <div className='space-y-2'>
                  <div className='h-4 bg-gray-200 rounded w-48 sm:w-56' />
                  <div className='h-4 bg-gray-200 rounded w-36 sm:w-44' />
                </div>
              </div>
            </div>

            {/* Badge Skeleton */}
            <div className='hidden sm:block w-28 h-8 bg-gray-200 rounded-full shrink-0' />
          </div>
        </div>

        {/* Account Settings Cards Skeleton */}
        <div className='space-y-3 sm:space-y-6'>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className='w-full bg-white border border-gray-200 rounded p-4 sm:p-6 animate-pulse'
            >
              <div className='flex items-center justify-between gap-3'>
                <div className='flex items-center gap-3 sm:gap-4 flex-1 min-w-0'>
                  {/* Icon Skeleton */}
                  <div className='w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 rounded-lg sm:rounded-xl shrink-0' />

                  {/* Text Skeleton */}
                  <div className='flex-1 min-w-0 space-y-2'>
                    <div className='h-4 sm:h-5 bg-gray-200 rounded w-32 sm:w-40' />
                    <div className='h-3 sm:h-4 bg-gray-200 rounded w-48 sm:w-64' />
                  </div>
                </div>

                {/* Arrow Skeleton */}
                <div className='w-5 h-5 bg-gray-200 rounded shrink-0' />
              </div>
            </div>
          ))}
        </div>

        {/* Logout Section Skeleton */}
        <div className='mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-gray-200'>
          <div className='flex items-center gap-2.5 sm:gap-3 animate-pulse'>
            <div className='w-4.5 h-4.5 sm:w-5 sm:h-5 bg-gray-200 rounded' />
            <div className='h-4 sm:h-5 bg-gray-200 rounded w-20' />
          </div>
        </div>

        {/* Version Footer Skeleton */}
        <div className='mt-8 sm:mt-12 pt-6 sm:pt-8 text-center'>
          <div className='h-3 bg-gray-200 rounded w-24 mx-auto animate-pulse' />
        </div>
      </div>
    </div>
  )
}

export function StudentProfileSkeleton() {
  return (
    <div className='min-h-screen bg-white'>
      <div className='max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 py-8 sm:py-12'>
        {/* Verification Banner Skeleton */}
        <div className='mb-6 sm:mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 animate-pulse'>
          <div className='flex items-start gap-3 sm:gap-4'>
            <div className='w-10 h-10 sm:w-12 sm:h-12 bg-blue-200 rounded-lg sm:rounded-xl shrink-0' />
            <div className='flex-1 min-w-0 space-y-3'>
              <div className='h-5 bg-blue-200 rounded w-48' />
              <div className='h-4 bg-blue-200 rounded w-full' />
              <div className='h-4 bg-blue-200 rounded w-3/4' />
              <div className='h-9 sm:h-10 bg-blue-300 rounded w-full sm:w-32' />
            </div>
          </div>
        </div>

        {/* Profile Card Skeleton */}
        <div className='bg-white border border-gray-200 rounded p-4 sm:p-6 mb-6 sm:mb-8 animate-pulse'>
          <div className='flex items-start justify-between gap-3'>
            <div className='flex items-start gap-3 sm:gap-5 flex-1 min-w-0'>
              {/* Avatar Skeleton */}
              <div className='w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gray-200 shrink-0' />

              {/* Info Skeleton */}
              <div className='flex-1 min-w-0 space-y-3'>
                <div className='h-5 sm:h-6 bg-gray-200 rounded w-32 sm:w-40' />
                <div className='space-y-2'>
                  <div className='h-4 bg-gray-200 rounded w-48 sm:w-56' />
                  <div className='h-4 bg-gray-200 rounded w-36 sm:w-44' />
                </div>
              </div>
            </div>

            <div className='hidden sm:block w-20 h-8 bg-gray-200 rounded-full shrink-0' />
          </div>
        </div>

        {/* Account Settings Cards Skeleton */}
        <div className='space-y-3 sm:space-y-6'>
          {[1, 2].map((i) => (
            <div
              key={i}
              className='w-full bg-white border border-gray-200 rounded p-4 sm:p-6 animate-pulse'
            >
              <div className='flex items-center justify-between gap-3'>
                <div className='flex items-center gap-3 sm:gap-4 flex-1 min-w-0'>
                  <div className='w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 rounded-lg sm:rounded-xl shrink-0' />
                  <div className='flex-1 min-w-0 space-y-2'>
                    <div className='h-4 sm:h-5 bg-gray-200 rounded w-32 sm:w-40' />
                    <div className='h-3 sm:h-4 bg-gray-200 rounded w-48 sm:w-64' />
                  </div>
                </div>
                <div className='w-5 h-5 bg-gray-200 rounded shrink-0' />
              </div>
            </div>
          ))}
        </div>

        {/* Hosting Section Skeleton */}
        <div className='mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-gray-200'>
          <div className='h-5 sm:h-6 bg-gray-200 rounded w-24 mb-4 sm:mb-6 animate-pulse' />
          <div className='space-y-3 sm:space-y-6'>
            <div className='w-full bg-gradient-to-br from-[#FF385C]/5 to-[#E31C5F]/5 border border-[#FF385C]/20 rounded p-4 sm:p-6 animate-pulse'>
              <div className='flex items-center justify-between gap-3'>
                <div className='flex items-center gap-3 sm:gap-4 flex-1 min-w-0'>
                  <div className='w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-lg sm:rounded-xl shrink-0' />
                  <div className='flex-1 min-w-0 space-y-2'>
                    <div className='h-4 sm:h-5 bg-[#FF385C]/20 rounded w-32 sm:w-40' />
                    <div className='h-3 sm:h-4 bg-[#FF385C]/20 rounded w-48 sm:w-64' />
                  </div>
                </div>
                <div className='w-5 h-5 bg-[#FF385C]/20 rounded shrink-0' />
              </div>
            </div>
          </div>
        </div>

        {/* Logout Section Skeleton */}
        <div className='mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-gray-200'>
          <div className='flex items-center gap-2.5 sm:gap-3 animate-pulse'>
            <div className='w-4.5 h-4.5 sm:w-5 sm:h-5 bg-gray-200 rounded' />
            <div className='h-4 sm:h-5 bg-gray-200 rounded w-20' />
          </div>
        </div>

        {/* Version Footer Skeleton */}
        <div className='mt-8 sm:mt-12 pt-6 sm:pt-8 text-center'>
          <div className='h-3 bg-gray-200 rounded w-24 mx-auto animate-pulse' />
        </div>
      </div>
    </div>
  )
}
