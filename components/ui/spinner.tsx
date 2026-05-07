import { cn } from '@/lib/utils'

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  variant?: 'primary' | 'white' | 'gradient'
}

export function Spinner({
  size = 'md',
  className,
  variant = 'primary',
}: SpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  }

  const variantClasses = {
    primary: 'border-primary border-t-transparent',
    white: 'border-white border-t-transparent',
    gradient: 'border-[#FF385C] border-t-transparent',
  }

  return (
    <div
      className={cn(
        'rounded-full border-2 animate-spin',
        sizeClasses[size],
        variantClasses[variant],
        className,
      )}
      role='status'
      aria-label='Loading'
    />
  )
}

interface AirbnbLoaderProps {
  message?: string
  className?: string
}

export function AirbnbLoader({ message = '', className }: AirbnbLoaderProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-6',
        className,
      )}
    >
      {/* Pulsing Airbnb-style logo animation */}
      <div className='relative'>
        {/* Outer pulsing ring */}
        <div className='absolute inset-0 rounded-full bg-gradient-to-br from-[#FF385C]/20 to-[#E31C5F]/20 animate-ping' />

        {/* Middle ring */}
        <div className='relative w-20 h-20 rounded-full bg-gradient-to-br from-[#FF385C]/10 to-[#E31C5F]/10 flex items-center justify-center'>
          {/* Inner spinning gradient circle */}
          <div className='w-16 h-16 rounded-full bg-gradient-to-br from-[#FF385C] to-[#E31C5F] flex items-center justify-center animate-pulse'>
            <div className='w-12 h-12 rounded-full bg-white flex items-center justify-center'>
              {/* Icon/Letter */}
              <svg
                className='w-8 h-8 text-[#FF385C] animate-bounce'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={2}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Rotating dots */}
        <div className='absolute inset-0 animate-spin-slow'>
          <div className='absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-[#FF385C] rounded-full' />
          <div className='absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-[#E31C5F] rounded-full' />
          <div className='absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-2 h-2 bg-[#FF385C] rounded-full' />
          <div className='absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-2 bg-[#E31C5F] rounded-full' />
        </div>
      </div>

      {/* Message */}
      {message && (
        <div className='text-center'>
          <p className='text-base sm:text-lg font-medium text-gray-900 mb-1'>
            {message}
          </p>
          <div className='flex items-center justify-center gap-1'>
            <div className='w-1.5 h-1.5 bg-[#FF385C] rounded-full animate-bounce [animation-delay:-0.3s]' />
            <div className='w-1.5 h-1.5 bg-[#FF385C] rounded-full animate-bounce [animation-delay:-0.15s]' />
            <div className='w-1.5 h-1.5 bg-[#FF385C] rounded-full animate-bounce' />
          </div>
        </div>
      )}
    </div>
  )
}

interface FullPageLoaderProps {
  message?: string
}

export function FullPageLoader({ message }: FullPageLoaderProps) {
  return (
    <div className='min-h-screen flex items-center justify-center bg-white'>
      <AirbnbLoader message={message} />
    </div>
  )
}
