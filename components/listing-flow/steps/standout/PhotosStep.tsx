'use client'

import { PhotoUpload } from '@/components/PhotoUpload'
import type { ListingFormData } from '@/lib/listing-flow/steps'

interface PhotosStepProps {
  photos: string[]
  onPhotosChange: (photos: string[]) => void
  disabled?: boolean
}

export function PhotosStep({ photos, onPhotosChange, disabled = false }: PhotosStepProps) {
  return (
    <div className='max-w-4xl mx-auto py-8 px-4'>
      <h1 className='text-2xl md:text-3xl font-bold text-on-surface mb-2'>
        Add some photos of your place
      </h1>
      <p className='text-on-surface-variant mb-8'>
        {"You'll need at least 2 photos to get started. You can add more or make changes later."}
      </p>

      <PhotoUpload
        photos={photos}
        onChange={onPhotosChange}
        maxPhotos={10}
        minPhotos={2}
      />
    </div>
  )
}
