'use client'

import { useState, useEffect } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

interface ImageModalProps {
  images: string[]
  isOpen: boolean
  onClose: () => void
  initialIndex?: number
  showGrid?: boolean
}

export default function ImageModal({
  images,
  isOpen,
  onClose,
  initialIndex = 0,
  showGrid = false,
}: ImageModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [viewMode, setViewMode] = useState<'grid' | 'single'>(
    showGrid ? 'grid' : 'single',
  )

  useEffect(() => {
    setCurrentIndex(initialIndex)
    setViewMode(showGrid ? 'grid' : 'single')
  }, [initialIndex, showGrid])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return
      if (e.key === 'Escape') onClose()
      if (viewMode === 'single') {
        if (e.key === 'ArrowLeft') handlePrev()
        if (e.key === 'ArrowRight') handleNext()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, currentIndex, viewMode])

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const handleImageClick = (index: number) => {
    setCurrentIndex(index)
    setViewMode('single')
  }

  if (!isOpen) return null

  return (
    <div className='fixed inset-0 z-[9999] bg-black'>
      {/* Header */}
      <div className='absolute top-0 left-0 right-0 z-50 flex items-center justify-between p-4 md:p-6 bg-gradient-to-b from-black/60 to-transparent'>
        <button
          onClick={onClose}
          className='flex items-center gap-2 text-white hover:text-white/80 transition-colors'
        >
          <X className='w-6 h-6' strokeWidth={2} />
          <span className='hidden md:inline text-sm font-medium'>Close</span>
        </button>

        {viewMode === 'single' && (
          <div className='text-white text-sm font-medium'>
            {currentIndex + 1} / {images.length}
          </div>
        )}

        {viewMode === 'single' && (
          <button
            onClick={() => setViewMode('grid')}
            className='text-white hover:text-white/80 transition-colors text-sm font-medium'
          >
            Show all photos
          </button>
        )}
      </div>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className='h-full w-full overflow-y-auto pt-20 pb-10 px-4 md:px-20'>
          <div className='max-w-7xl mx-auto'>
            <h2 className='text-white text-2xl md:text-3xl font-semibold mb-8'>
              All Photos
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
              {images.map((image, index) => (
                <div
                  key={index}
                  className='relative aspect-[4/3] cursor-pointer group overflow-hidden rounded'
                  onClick={() => handleImageClick(index)}
                >
                  <img
                    src={image}
                    alt={`Photo ${index + 1}`}
                    className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
                  />
                  <div className='absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300' />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Single Image View */}
      {viewMode === 'single' && (
        <div className='h-full w-full flex items-center justify-center px-4 md:px-20'>
          <div className='relative w-full h-full flex items-center justify-center'>
            {/* Previous Button */}
            {images.length > 1 && (
              <button
                onClick={handlePrev}
                className='absolute left-4 md:left-8 z-50 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110'
              >
                <ChevronLeft
                  className='w-6 h-6 text-gray-900'
                  strokeWidth={2}
                />
              </button>
            )}

            {/* Image */}
            <div className='relative max-w-7xl max-h-[80vh] w-full h-full flex items-center justify-center'>
              <img
                src={images[currentIndex]}
                alt={`Photo ${currentIndex + 1}`}
                className='max-w-full max-h-full object-contain rounded'
              />
            </div>

            {/* Next Button */}
            {images.length > 1 && (
              <button
                onClick={handleNext}
                className='absolute right-4 md:right-8 z-50 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110'
              >
                <ChevronRight
                  className='w-6 h-6 text-gray-900'
                  strokeWidth={2}
                />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
