'use client'

import { useRouter } from 'next/navigation'
import { ChevronLeft, Share, Heart, CheckCircle2, X, AlertCircle } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'

interface ListingHeaderProps {
  mode: 'student' | 'admin'
  isScrolled: boolean
  isSaved: boolean
  onToggleSave: (e: React.MouseEvent) => void
  listingStatus?: string
  listingTitle?: string
}

export function ListingHeader({
  mode,
  isScrolled,
  isSaved,
  onToggleSave,
  listingStatus,
  listingTitle,
}: ListingHeaderProps) {
  const router = useRouter()
  const { user } = useAuth()
  
  const hasViewingIndicator = user && user.role !== 'student' && mode !== 'admin'
  const topClass = mode === 'admin' ? 'top-16' : hasViewingIndicator ? 'top-[53px]' : 'top-0'

  const getStatusInfo = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'approved':
        return {
          color: 'bg-emerald-50 text-emerald-600 border-emerald-200',
          icon: <CheckCircle2 className='w-4 h-4' />,
          label: 'Approved',
        }
      case 'rejected':
        return {
          color: 'bg-red-50 text-red-600 border-red-200',
          icon: <X className='w-4 h-4' />,
          label: 'Rejected',
        }
      default:
        return {
          color: 'bg-orange-50 text-orange-600 border-orange-200',
          icon: <AlertCircle className='w-4 h-4' />,
          label: 'Pending Review',
        }
    }
  }

  return (
    <div
      className={`md:hidden fixed ${topClass} w-full z-[100] transition-all duration-300 px-4 pt-2 pb-2 flex justify-between items-center ${isScrolled ? 'bg-white border-b border-outline-variant/10 shadow-sm pt-4' : 'bg-transparent'}`}
    >
      <button
        onClick={() => router.back()}
        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${isScrolled ? 'bg-transparent' : 'bg-white/90 shadow-sm'}`}
      >
        <ChevronLeft
          className={`w-5 h-5 ${isScrolled ? 'text-on-surface' : 'text-black'}`}
          strokeWidth={2.5}
        />
      </button>
      <div className='flex gap-3'>
        <button
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${isScrolled ? 'bg-transparent' : 'bg-white/90 shadow-sm'}`}
        >
          <Share
            className={`w-4 h-4 ${isScrolled ? 'text-on-surface' : 'text-black'}`}
            strokeWidth={2.5}
          />
        </button>
        {mode === 'student' && (
          <button
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${isScrolled ? 'bg-transparent' : 'bg-white/90 shadow-sm'}`}
            onClick={onToggleSave}
          >
            <Heart
              className={`w-4 h-4 transition-colors ${isSaved ? 'fill-[#FF385C] stroke-[#FF385C]' : isScrolled ? 'text-on-surface' : 'text-black'}`}
              strokeWidth={2.5}
            />
          </button>
        )}
      </div>
    </div>
  )
}
