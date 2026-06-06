'use client'

import { X, HelpCircle } from 'lucide-react'

interface ListingHeaderProps {
  onSaveExit: () => void
  onHelp?: () => void
  saving: boolean
  disabled?: boolean
}

export function ListingHeader({
  onSaveExit,
  onHelp,
  saving,
  disabled = false,
}: ListingHeaderProps) {
  return (
    <header className='sticky top-0 z-50 bg-white border-b border-outline-variant/20'>
      <div className='max-w-4xl mx-auto px-4 h-16 flex items-center justify-between'>
        {/* Left: Save & Exit */}
        <button
          type='button'
          onClick={onSaveExit}
          disabled={disabled || saving}
          className='flex items-center gap-2 px-4 py-2 rounded-full border border-outline-variant/30 hover:bg-surface-container transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
        >
          <X className='w-4 h-4' />
          <span className='text-sm font-semibold'>
            {saving ? 'Saving...' : 'Save & Exit'}
          </span>
        </button>

        {/* Right: Questions */}
        {onHelp && (
          <button
            type='button'
            onClick={onHelp}
            disabled={disabled}
            className='flex items-center gap-2 px-4 py-2 rounded-full border border-outline-variant/30 hover:bg-surface-container transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
          >
            <HelpCircle className='w-4 h-4' />
            <span className='text-sm font-semibold'>Questions?</span>
          </button>
        )}
      </div>
    </header>
  )
}
