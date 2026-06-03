'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { Camera, X, Loader2, User, Sparkles } from 'lucide-react'
import { userApi } from '@/lib/api'
import AvatarSelectionModal from './AvatarSelectionModal'
import { useAuth } from '@/lib/auth-context'

interface ProfilePictureUploadProps {
  currentPictureUrl?: string | null
  onUploadSuccess?: (url: string) => void
  onDeleteSuccess?: () => void
}

export default function ProfilePictureUpload({
  currentPictureUrl,
  onUploadSuccess,
  onDeleteSuccess,
}: ProfilePictureUploadProps) {
  const { user } = useAuth()
  const [isUploading, setIsUploading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showAvatarModal, setShowAvatarModal] = useState(false)
  const [profilePicUrl, setProfilePicUrl] = useState<string | null>(
    currentPictureUrl || null
  )
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!validTypes.includes(file.type)) {
      setError('Please select a valid image file (JPEG, PNG, or WebP)')
      return
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB')
      return
    }

    setError(null)
    setIsUploading(true)

    try {
      const response = await userApi.uploadProfilePicture(file)
      setProfilePicUrl(response.profilePicUrl)
      if (onUploadSuccess) {
        onUploadSuccess(response.profilePicUrl)
      }
    } catch (err: any) {
      setError(err.message || 'Failed to upload profile picture')
    } finally {
      setIsUploading(false)
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleDelete = async () => {
    if (!profilePicUrl) return

    setIsDeleting(true)
    setError(null)

    try {
      await userApi.deleteProfilePicture()
      setProfilePicUrl(null)
      if (onDeleteSuccess) {
        onDeleteSuccess()
      }
    } catch (err: any) {
      setError(err.message || 'Failed to delete profile picture')
    } finally {
      setIsDeleting(false)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const handleAvatarSelect = async (avatarDataUri: string) => {
    setError(null)
    setIsUploading(true)

    try {
      // Convert SVG data URI to PNG using canvas
      const img = document.createElement('img')

      await new Promise((resolve, reject) => {
        img.onload = resolve
        img.onerror = reject
        img.src = avatarDataUri
      })

      // Create canvas and draw image
      const canvas = document.createElement('canvas')
      canvas.width = 400
      canvas.height = 400
      const ctx = canvas.getContext('2d')

      if (!ctx) {
        throw new Error('Failed to get canvas context')
      }

      // Draw white background
      ctx.fillStyle = '#FFFFFF'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw the image
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

      // Convert canvas to blob
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob)
          } else {
            reject(new Error('Failed to convert canvas to blob'))
          }
        }, 'image/png', 0.95)
      })

      const file = new File([blob], 'avatar.png', { type: 'image/png' })

      // Upload the avatar as a file
      const uploadResponse = await userApi.uploadProfilePicture(file)
      setProfilePicUrl(uploadResponse.profilePicUrl)
      if (onUploadSuccess) {
        onUploadSuccess(uploadResponse.profilePicUrl)
      }
    } catch (err: any) {
      setError(err.message || 'Failed to upload avatar')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative group">
        {/* Profile Picture Display */}
        <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-100 border-4 border-white shadow-lg">
          {profilePicUrl ? (
            <Image
              src={profilePicUrl}
              alt="Profile Picture"
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">
              <User className="w-16 h-16 text-blue-500" />
            </div>
          )}

          {/* Overlay on hover */}
          {!isUploading && !isDeleting && (
            <div
              className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              onClick={triggerFileInput}
            >
              <Camera className="w-8 h-8 text-white" />
            </div>
          )}

          {/* Loading Spinner */}
          {(isUploading || isDeleting) && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-white animate-spin" />
            </div>
          )}
        </div>

        {/* Delete Button */}
        {profilePicUrl && !isUploading && !isDeleting && (
          <button
            type="button"
            onClick={handleDelete}
            className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-lg transition-colors"
            title="Remove profile picture"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
        <button
          type="button"
          onClick={triggerFileInput}
          disabled={isUploading || isDeleting}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isUploading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Camera className="w-4 h-4" />
              {profilePicUrl ? 'Change Photo' : 'Upload Photo'}
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() => setShowAvatarModal(true)}
          disabled={isUploading || isDeleting}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          Use Avatar
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-sm text-red-600 text-center max-w-xs">{error}</p>
      )}

      {/* Helper Text */}
      <p className="text-xs text-gray-500 text-center max-w-xs">
        Upload your own photo or generate a unique avatar
        <br />
        Max size: 5MB (JPG, PNG, WebP)
      </p>

      {/* Avatar Selection Modal */}
      <AvatarSelectionModal
        isOpen={showAvatarModal}
        onClose={() => setShowAvatarModal(false)}
        onSelectAvatar={handleAvatarSelect}
        userName={user?.name || 'User'}
      />
    </div>
  )
}
