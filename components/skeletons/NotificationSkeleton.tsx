export default function NotificationSkeleton() {
  return (
    <div className='divide-y divide-outline-variant/5'>
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div key={item} className='flex gap-4 py-6 animate-pulse'>
          {/* Icon skeleton */}
          <div className='w-10 h-10 rounded-full bg-slate-100 shrink-0' />

          {/* Content */}
          <div className='flex-1 min-w-0 space-y-3'>
            {/* Title and time */}
            <div className='flex justify-between items-baseline gap-4'>
              <div className='flex items-center gap-2 flex-1'>
                <div className='h-4 bg-slate-100 rounded w-2/5' />
                {/* Unread dot - appears on some items */}
                {item % 3 === 0 && <div className='w-2 h-2 rounded-full bg-slate-100 shrink-0' />}
              </div>
              <div className='h-3 bg-slate-100 rounded w-12 shrink-0' />
            </div>

            {/* Message body */}
            <div className='space-y-2'>
              <div className='h-3.5 bg-slate-100 rounded w-full' />
              <div className='h-3.5 bg-slate-100 rounded w-4/5' />
            </div>
          </div>

          {/* Delete button skeleton */}
          <div className='w-8 h-8 rounded-lg bg-slate-100 shrink-0 opacity-0' />
        </div>
      ))}
    </div>
  )
}
