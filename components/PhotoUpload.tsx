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
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
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

        // Get auth token from localStorage
        const authToken =
          typeof window !== 'undefined'
            ? localStorage.getItem('br_access_token')
            : null

        const headers: Record<string, string> = {}
        if (authToken) {
          headers['Authorization'] = `Bearer ${authToken}`
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/owner/upload-photo`,
          {
            method: 'POST',
            credentials: 'include',
            headers,
            body: formData,
          },
        )

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          throw new Error(errorData.error || `Failed to upload ${file.name}`)
        }

        const data = await response.json()
        return data.url
      })

      const uploadedUrls = await Promise.all(uploadPromises)
      onChange([...photos, ...uploadedUrls])
      toast.success(
        `${uploadedUrls.length} photo${uploadedUrls.length > 1 ? 's' : ''} uploaded successfully`,
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
        <div>
          <p className='text-sm text-on-surface-variant mb-3'>
            Drag and drop photos to reorder. First photo will be the cover
            image.
          </p>
          <div className='columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4'>
            {photos.map((photo, index) => (
              <div
                key={index}
                draggable
                onDragStart={() => setDraggedIndex(index)}
                onDragOver={(e) => {
                  e.preventDefault()
                  if (draggedIndex !== null && draggedIndex !== index) {
                    handleReorder(draggedIndex, index)
                    setDraggedIndex(index)
                  }
                }}
                onDragEnd={() => setDraggedIndex(null)}
                className={`break-inside-avoid rounded-2xl overflow-hidden border border-neutral-200 bg-white group cursor-move transition-all duration-300 shadow-sm mb-4 relative ${
                  draggedIndex === index
                    ? 'opacity-50 scale-95'
                    : 'hover:scale-[1.02] hover:shadow-md'
                }`}
              >
                {/* Foreground image showing actual uncropped size */}
                <img
                  src={photo}
                  alt={`Photo ${index + 1}`}
                  className='w-full h-auto pointer-events-none block'
                />

                {/* Cover Badge */}
                {index === 0 && (
                  <div className='absolute top-3 left-3 bg-primary text-white text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-1 rounded-lg shadow z-20'>
                    Cover Photo
                  </div>
                )}

                {/* Remove Button */}
                <button
                  type='button'
                  onClick={() => handleRemovePhoto(index)}
                  className='absolute top-3 right-3 w-8 h-8 bg-black/60 hover:bg-black/90 text-white rounded-full flex items-center justify-center transition-colors shadow z-20'
                >
                  <X className='w-4 h-4' />
                </button>

                {/* Photo Number */}
                <div className='absolute bottom-3 left-3 bg-black/60 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-lg shadow z-20'>
                  {index + 1}
                </div>
              </div>
            ))}
          </div>
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
