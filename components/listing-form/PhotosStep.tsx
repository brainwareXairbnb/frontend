'use client'

import { ImagePlus } from 'lucide-react'
import { PhotoUpload } from '@/components/PhotoUpload'

interface PhotosStepProps {
  photos: string[]
  onChange: (photos: string[]) => void
}

export function PhotosStep({ photos, onChange }: PhotosStepProps) {
  return (
    <section className='space-y-4'>
      <div className='flex items-center gap-3 mb-4'>
        <div className='w-8 h-8 bg-indigo-500/10 rounded-lg flex items-center justify-center'>
          <ImagePlus className='w-4 h-4 text-indigo-600' />
        </div>
        <h3 className='text-base font-bold text-on-surface'>Photos</h3>
      </div>

      <PhotoUpload photos={photos} onChange={onChange} maxPhotos={10} minPhotos={2} />
    </section>
  )
}
