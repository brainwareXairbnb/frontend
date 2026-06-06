'use client'

import { useState } from 'react'
import { Grip, Share, Heart, CheckCircle2, X, AlertCircle } from 'lucide-react'
import ImageModal from '@/components/ImageModal'
import { Share as CapShare } from '@capacitor/share'
import { Capacitor } from '@capacitor/core'
import { toast } from 'sonner'

interface ListingHeroSectionProps {
  images: string[]
  mode: 'student' | 'admin'
  isSaved: boolean
  onToggleSave: (e: React.MouseEvent) => void
  listingStatus?: string
  listingTitle: string
  listingId?: string
}

export function ListingHeroSection({
  images,
  mode,
  isSaved,
  onToggleSave,
  listingStatus,
  listingTitle,
  listingId,
}: ListingHeroSectionProps) {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)
  const [imageModalIndex, setImageModalIndex] = useState(0)
  const [imageModalShowGrid, setImageModalShowGrid] = useState(false)

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation()
    const shareUrl = listingId 
      ? `https://brainxx.vercel.app/rooms/details?id=${listingId}`
      : window.location.href

    const shareData = {
      title: listingTitle || 'BrainX Room Listing',
      text: `Check out this room listing: ${listingTitle}`,
      url: shareUrl,
    }

    try {
      if (Capacitor.isNativePlatform()) {
        await CapShare.share({
          title: shareData.title,
          text: shareData.text,
          url: shareData.url,
          dialogTitle: 'Share this listing',
        })
      } else if (navigator.share) {
        await navigator.share(shareData)
      } else {
        await navigator.clipboard.writeText(shareData.url)
        toast.success('Listing link copied to clipboard!')
      }
    } catch (error: any) {
      if (error.message !== 'Share canceled') {
        toast.error('Could not share listing', { description: error.message })
      }
    }
  }

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
    <>
      {/* Mobile Image Carousel */}
      <div className='md:hidden relative w-full h-[60vh]'>
        <div
          className='flex w-full h-full overflow-x-auto snap-x snap-mandatory scrollbar-hide'
          onScroll={(e) => {
            const scrollLeft = e.currentTarget.scrollLeft
            const width = e.currentTarget.offsetWidth
            setImageModalIndex(Math.round(scrollLeft / width))
          }}
        >
          {images.map((img: string, idx: number) => (
            <img
              key={idx}
              src={img}
              alt=''
              className='w-full h-full object-contain bg-neutral-950 shrink-0 snap-center cursor-pointer'
              onClick={() => {
                setImageModalIndex(idx)
                setImageModalShowGrid(false)
                setIsImageModalOpen(true)
              }}
            />
          ))}
        </div>
        <div
          className='absolute bottom-10 right-4 bg-black/60 text-white text-xs px-2.5 py-1 rounded-md font-semibold tracking-wide cursor-pointer'
          onClick={() => {
            setImageModalShowGrid(true)
            setIsImageModalOpen(true)
          }}
        >
          {imageModalIndex + 1}/{images.length}
        </div>
      </div>

      {/* Desktop Header + Image Grid (Combined) */}
      <div className='hidden md:block mb-8'>
        {/* Desktop Header */}
        <div className='flex justify-between items-end mb-6'>
          <h1 className='text-[26px] font-semibold text-on-surface'>
            {listingTitle}
          </h1>
          <div className='flex gap-4 items-center'>
            {mode === 'admin' && listingStatus && (
              <div
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${getStatusInfo(listingStatus).color}`}
              >
                {getStatusInfo(listingStatus).icon}{' '}
                {getStatusInfo(listingStatus).label}
              </div>
            )}
            <button
              onClick={handleShare}
              className='flex items-center gap-2 text-sm font-medium hover:underline cursor-pointer'
            >
              <Share className='w-[18px] h-[18px]' /> Share
            </button>
            {mode === 'student' && (
              <button
                className='flex items-center gap-2 text-sm font-medium hover:underline'
                onClick={onToggleSave}
              >
                <Heart
                  className={`w-[18px] h-[18px] transition-colors ${isSaved ? 'fill-[#FF385C] stroke-[#FF385C]' : ''}`}
                />
                {isSaved ? 'Saved' : 'Save'}
              </button>
            )}
          </div>
        </div>

        {/* Desktop Image Grid */}
        <div className='grid grid-cols-4 grid-rows-2 gap-2 h-[60vh] min-h-[400px] rounded-2xl overflow-hidden relative'>
          <div
            className='col-span-2 row-span-2 relative group cursor-pointer'
            onClick={() => {
              setImageModalIndex(0)
              setImageModalShowGrid(false)
              setIsImageModalOpen(true)
            }}
          >
            <img
              src={images[0]}
              className='w-full h-full object-cover group-hover:brightness-90 transition-all duration-300'
              alt=''
            />
          </div>
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className='relative group cursor-pointer'
              onClick={() => {
                setImageModalIndex(i)
                setImageModalShowGrid(false)
                setIsImageModalOpen(true)
              }}
            >
              <img
                src={images[i] || images[0]}
                className='w-full h-full object-cover group-hover:brightness-90 transition-all duration-300'
                alt=''
              />
            </div>
          ))}
          <button
            className='absolute bottom-6 right-6 bg-white px-4 py-1.5 rounded-lg border border-black flex items-center gap-2 text-sm font-semibold shadow-sm hover:bg-gray-50'
            onClick={() => {
              setImageModalShowGrid(true)
              setIsImageModalOpen(true)
            }}
          >
            <Grip className='w-[18px] h-[18px]' /> Show all photos
          </button>
        </div>
      </div>

      <ImageModal
        images={images}
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        initialIndex={imageModalIndex}
        showGrid={imageModalShowGrid}
      />
    </>
  )
}
