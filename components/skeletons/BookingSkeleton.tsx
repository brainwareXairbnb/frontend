export function BookingSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="bg-white rounded-[24px] md:rounded-[32px] overflow-hidden shadow-sm animate-pulse"
        >
          {/* Image skeleton */}
          <div className="relative aspect-[16/11] md:aspect-[4/3] overflow-hidden">
            <div className="w-full h-full bg-gray-200" />

            {/* Status badge skeleton */}
            <div className="absolute top-4 right-4">
              <div className="w-24 h-8 bg-white/80 rounded-full" />
            </div>
          </div>

          {/* Content skeleton */}
          <div className="p-4 md:p-6">
            {/* Title + Price */}
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex-1 space-y-2">
                <div className="h-5 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>
              <div className="text-right space-y-1">
                <div className="h-7 bg-gray-200 rounded w-20" />
                <div className="h-3 bg-gray-200 rounded w-16" />
              </div>
            </div>

            {/* Move-in details */}
            <div className="space-y-2 mb-4">
              <div className="h-4 bg-gray-200 rounded w-32" />
              <div className="h-4 bg-gray-200 rounded w-24" />
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 pt-4 border-t border-gray-100">
              <div className="flex-1 h-11 bg-gray-200 rounded-xl" />
              <div className="flex-1 h-11 bg-gray-200 rounded-xl" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export function BookingDetailSkeleton() {
  return (
    <div className="bg-white min-h-screen pb-32">
      <div className="max-w-4xl mx-auto px-2 pt-2 animate-pulse">
        {/* Listing Info skeleton */}
        <div className="border border-outline-variant/10 rounded-2xl p-6 mb-6">
          <div className="flex gap-4 mb-4">
            <div className="w-24 h-24 bg-gray-200 rounded-xl shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-5 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
              <div className="h-4 bg-gray-200 rounded w-1/3" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-outline-variant/10">
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-24" />
              <div className="h-4 bg-gray-200 rounded w-32" />
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-24" />
              <div className="h-4 bg-gray-200 rounded w-32" />
            </div>
          </div>
        </div>

        {/* Payment Summary skeleton */}
        <div className="border border-outline-variant/10 rounded-2xl p-5 mb-6">
          <div className="h-5 bg-gray-200 rounded w-40 mb-4" />
          <div className="space-y-3">
            <div className="flex justify-between">
              <div className="h-4 bg-gray-200 rounded w-32" />
              <div className="h-4 bg-gray-200 rounded w-24" />
            </div>
            <div className="flex justify-between">
              <div className="h-4 bg-gray-200 rounded w-40" />
              <div className="h-4 bg-gray-200 rounded w-20" />
            </div>
            <div className="flex justify-between">
              <div className="h-4 bg-gray-200 rounded w-36" />
              <div className="h-4 bg-gray-200 rounded w-16" />
            </div>
            <div className="flex justify-between pt-3 border-t border-outline-variant/20">
              <div className="h-5 bg-gray-200 rounded w-32" />
              <div className="h-5 bg-gray-200 rounded w-28" />
            </div>
          </div>
        </div>

        {/* Action buttons skeleton */}
        <div className="flex flex-col gap-3">
          <div className="h-14 bg-gray-200 rounded-xl" />
          <div className="h-14 bg-gray-200 rounded-xl" />
        </div>
      </div>
    </div>
  )
}

export function PaymentScheduleSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {[1, 2].map((i) => (
        <div
          key={i}
          className="border border-outline-variant/20 rounded overflow-hidden"
        >
          {/* Property Header skeleton */}
          <div className="flex gap-3 p-4 bg-slate-50 border-b border-outline-variant/10">
            <div className="w-16 h-16 bg-gray-200 rounded-lg shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-3 bg-gray-200 rounded w-1/2" />
              <div className="flex items-center gap-2 mt-2">
                <div className="flex-1 bg-gray-200 rounded-full h-1.5" />
                <div className="h-3 bg-gray-200 rounded w-10" />
              </div>
            </div>
          </div>

          {/* Next Payment Alert skeleton */}
          <div className="p-4 border-b border-outline-variant/10 bg-blue-50">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 bg-gray-300 rounded shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-300 rounded w-32" />
                <div className="h-3 bg-gray-300 rounded w-48" />
              </div>
              <div className="h-10 bg-gray-300 rounded-lg w-24" />
            </div>
          </div>

          {/* Auto-Pay Toggle skeleton */}
          <div className="p-4 border-b border-outline-variant/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-200 rounded" />
                <div className="space-y-1">
                  <div className="h-4 bg-gray-200 rounded w-20" />
                  <div className="h-3 bg-gray-200 rounded w-32" />
                </div>
              </div>
              <div className="w-11 h-6 bg-gray-200 rounded-full" />
            </div>
          </div>

          {/* Payment Schedule skeleton */}
          <div className="p-4">
            <div className="h-4 bg-gray-200 rounded w-32 mb-3" />
            <div className="space-y-2">
              {[1, 2, 3].map((j) => (
                <div key={j} className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-full" />
                    <div className="space-y-1">
                      <div className="h-4 bg-gray-200 rounded w-20" />
                      <div className="h-3 bg-gray-200 rounded w-24" />
                    </div>
                  </div>
                  <div className="h-6 bg-gray-200 rounded-full w-16" />
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
