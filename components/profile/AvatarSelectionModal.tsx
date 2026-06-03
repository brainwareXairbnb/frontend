'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { createAvatar } from '@dicebear/core'
import * as avataaars from '@dicebear/avataaars'
import * as bottts from '@dicebear/bottts'
import * as funEmoji from '@dicebear/fun-emoji'
import * as lorelei from '@dicebear/lorelei'
import * as micah from '@dicebear/micah'
import * as personas from '@dicebear/personas'

interface AvatarSelectionModalProps {
  isOpen: boolean
  onClose: () => void
  onSelectAvatar: (avatarUrl: string) => void
  userName: string
}

const avatarStyles = [
  { name: 'Avataaars', style: avataaars as any, label: 'Cartoon' },
  { name: 'Personas', style: personas as any, label: 'Modern' },
  { name: 'Lorelei', style: lorelei as any, label: 'Illustrated' },
  { name: 'Micah', style: micah as any, label: 'Minimalist' },
  { name: 'Fun Emoji', style: funEmoji as any, label: 'Emoji' },
  { name: 'Bottts', style: bottts as any, label: 'Robot' },
]

export default function AvatarSelectionModal({
  isOpen,
  onClose,
  onSelectAvatar,
  userName,
}: AvatarSelectionModalProps) {
  const [selectedStyle, setSelectedStyle] = useState(0)
  const [seed, setSeed] = useState(userName || 'default')
  const [avatarVariants, setAvatarVariants] = useState<string[]>([])

  useEffect(() => {
    if (isOpen) {
      generateAvatarVariants()
    }
  }, [isOpen, selectedStyle, seed])

  const generateAvatarVariants = () => {
    const variants: string[] = []
    const currentStyle = avatarStyles[selectedStyle]

    for (let i = 0; i < 12; i++) {
      const avatar = createAvatar(currentStyle.style, {
        seed: `${seed}-${i}`,
        size: 128,
      })
      variants.push(avatar.toDataUri())
    }

    setAvatarVariants(variants)
  }

  const handleRandomize = () => {
    setSeed(`${userName || 'user'}-${Date.now()}`)
  }

  if (!isOpen) return null

  return (
    <div className='fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50 p-4'>
      <div className='bg-white rounded shadow-2xl max-w-3xl w-full max-h-[85vh] overflow-hidden flex flex-col'>
        {/* Header */}
        <div className='flex items-center justify-between p-4 sm:p-6 border-b border-gray-200'>
          <div>
            <h2 className='text-xl sm:text-2xl font-bold text-gray-900'>
              Choose an Avatar
            </h2>
            <p className='text-sm text-gray-600 mt-1'>
              Select a style and pick your avatar
            </p>
          </div>
          <button
            type='button'
            onClick={onClose}
            className='p-2 hover:bg-gray-100 rounded-full transition-colors'
          >
            <X className='w-5 h-5' />
          </button>
        </div>

        {/* Content */}
        <div className='flex-1 overflow-y-auto p-4 sm:p-6'>
          {/* Style Selection */}
          <div className='mb-6'>
            <label className='block text-sm font-semibold text-gray-900 mb-3'>
              Avatar Style
            </label>
            <div className='grid grid-cols-3 sm:grid-cols-6 gap-2'>
              {avatarStyles.map((style, index) => (
                <button
                  type='button'
                  key={style.name}
                  onClick={() => setSelectedStyle(index)}
                  className={`p-3 rounded-lg border-2 transition-all ${selectedStyle === index
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                    }`}
                >
                  <div className='text-xs font-medium text-gray-900 text-center'>
                    {style.label}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Randomize Button */}
          <div className='mb-4 flex justify-end'>
            <button
              type='button'
              onClick={handleRandomize}
              className='px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-lg font-medium transition-colors text-sm'
            >
              Generate New
            </button>
          </div>

          {/* Avatar Grid */}
          <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3'>
            {avatarVariants.map((avatarUrl, index) => (
              <button
                key={index}
                type='button'
                onClick={() => {
                  onSelectAvatar(avatarUrl)
                  onClose()
                }}
                className='aspect-square rounded-lg overflow-hidden border-2 border-gray-200 hover:border-blue-500 hover:scale-105 transition-all bg-gray-50'
              >
                <img
                  src={avatarUrl}
                  alt={`Avatar ${index + 1}`}
                  className='w-full h-full object-cover'
                />
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className='p-4 sm:p-6 border-t border-gray-200 bg-gray-50'>
          <button
            onClick={onClose}
            type='button'
            className='w-full px-4 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-900 hover:bg-gray-100 transition-colors'
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
