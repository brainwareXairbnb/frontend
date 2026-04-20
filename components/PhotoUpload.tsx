'use client'

import { useState, useRef } from 'react'
import { X, Upload, Loader2, Image as ImageIcon } from 'lucide-react'
import { toast } from 'sonner'
import api from '@/lib/api'

interface PhotoUploadProps {
  photos: string[]
  onChange: (photos: string[]) => void
  maxPhotos?: number
  minPhotos?: number
}

export function PhotoUpload({
  photos,
  onChange,
  maxPhotos = 10,
  minPhotos = 2,
}: PhotoUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [uploadingCount, setUploadingCount] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return

    // Check if adding these photos would exceed max
    if (photos.length + files.length > maxPhotos) {
      toast.error(`Maximum ${maxPhotos} photos allowed`)
      return
    }

    // Validate file types and sizes
    const validFiles = files.filter((file) => {
      if (!file.type.startsWith('image/')) {
        toast.error(`${file.name} is not an image file`)
        return false
      }
      if (file.size > 5 * 1024 * 1024) {
        // 5MB
        toast.error(`${file.name} is too large (max 5MB)`)
        return false
      }
      return true
    })

    if (validFiles.length === 0) return

    setUploading(true)
    setUploadingCount(validFiles.length)

    try {
      const uploadPromises = validFiles.map(async (file) => {
        const formData = new FormData()
        formData.append('photo', file)

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/owner/upload-photo`,
          {
            method: 'POST',
            credentials: 'include',
            body: formData,
          }
        )

        if (!response.ok) {
          throw new Error(`Failed to upload ${file.name}`)
        }

        const data = await response.json()
        return data.url
      })

      const uploadedUrls = await Promise.all(uploadPromises)
      onChange([...photos, ...uploadedUrls])
      toast.success(
        `${uploadedUrls.length} photo${uploadedUrls.length > 1 ? 's' : ''} uploaded successfully`
      )
    } catch (error: any) {
      toast.error('Upload failed', {
        description: error.message || 'Please try again',
      })
    } finally {
      setUploading(false)
      setUploadingCount(0)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleRemovePhoto = (index: number) => {
    const newPhotos = photos.filter((_, i) => i !== index)
    onChange(newPhotos)
    toast.success('Photo removed')
  }

  const handleReorder = (fromIndex: number, toIndex: number) => {
    const newPhotos = [...photos]
    const [removed] = newPhotos.splice(fromIndex, 1)
    newPhotos.splice(toIndex, 0, removed)
    onChange(newPhotos)
  }

  return (
    <div className='space-y-4'>
      {/* Upload Button */}
      <div>
        <input
          ref={fileInputRef}
          type='file'
          accept='image/*'
          multiple
          onChange={handleFileSelect}
          className='hidden'
          disabled={uploading || photos.length >= maxPhotos}
        />
        <button
          type='button'
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading || photos.length >= maxPhotos}
          className='w-full md:w-auto px-6 py-3 bg-primary text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
        >
          {uploading ? (
            <>
              <Loader2 className='w-5 h-5 animate-spin' />
              Uploading {uploadingCount} photo{uploadingCount > 1 ? 's' : ''}...
            </>
          ) : (
            <>
              <Upload className='w-5 h-5' />
              Add Photos ({photos.length}/{maxPhotos})
            </>
          )}
        </button>
        <p className='text-xs text-on-surface-variant mt-2'>
          Add {minPhotos}-{maxPhotos} high-quality photos. First photo will be
          the cover image.
        </p>
      </div>

      {/* Photo Grid */}
      {photos.length > 0 && (
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {photos.map((photo, index) => (
            <div
              key={index}
              className='relative aspect-[4/3] rounded overflow-hidden bg-surface-container group'
            >
              <img
                src={photo}
                alt={`Photo ${index + 1}`}
                className='w-full h-full object-cover'
              />

              {/* Cover Badge */}
              {index === 0 && (
                <div className='absolute top-2 left-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded-lg'>
                  Cover Photo
                </div>
              )}

              {/* Remove Button */}
              <button
                type='button'
                onClick={() => handleRemovePhoto(index)}
                className='absolute top-2 right-2 w-8 h-8 bg-black/70 text-white rounded-full flex items-center justify-center hover:bg-black transition-colors'
              >
                <X className='w-4 h-4' />
              </button>

              {/* Photo Number */}
              <div className='absolute bottom-2 left-2 bg-black/70 text-white text-xs font-bold px-2 py-1 rounded-lg'>
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {photos.length === 0 && (
        <div className='border-2 border-dashed border-outline-variant rounded-xl p-12 text-center'>
          <ImageIcon className='w-16 h-16 text-on-surface-variant/30 mx-auto mb-4' />
          <p className='font-bold text-on-surface mb-1'>No photos yet</p>
          <p className='text-sm text-on-surface-variant'>
            Click "Add Photos" to upload images of your property
          </p>
        </div>
      )}

      {/* Validation Message */}
      {photos.length > 0 && photos.length < minPhotos && (
        <p className='text-sm text-orange-600'>
          ⚠️ Please add at least {minPhotos} photos to submit your listing
        </p>
      )}
    </div>
  )
}
