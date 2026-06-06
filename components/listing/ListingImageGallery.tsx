'use client'

import { useState } from 'react'
import { Grip } from 'lucide-react'
import ImageModal from '@/components/ImageModal'

interface ListingImageGalleryProps {
  images: string[]
}

export function ListingImageGallery({ images }: ListingImageGalleryProps) {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)
  const [imageModalIndex, setImageModalIndex] = useState(0)
  const [imageModalShowGrid, setImageModalShowGrid] = useState(false)

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

      {/* Desktop Image Grid */}
      <div className='hidden md:block mb-8'>
        {/* Header will be rendered above this by parent */}
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
