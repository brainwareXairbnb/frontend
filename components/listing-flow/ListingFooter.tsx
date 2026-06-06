'use client'

import { ChevronLeft, Loader2 } from 'lucide-react'
import { ListingProgress } from './ListingProgress'

interface ListingFooterProps {
  currentStepIndex: number
  onBack: () => void
  onNext: () => void
  canGoBack: boolean
  canGoNext: boolean
  isFirstStep: boolean
  isLastStep: boolean
  nextLabel?: string
  loading?: boolean
  disabled?: boolean
}

export function ListingFooter({
  currentStepIndex,
  onBack,
  onNext,
  canGoBack,
  canGoNext,
  isFirstStep,
  isLastStep,
  nextLabel = 'Next',
  loading = false,
  disabled = false,
}: ListingFooterProps) {
  return (
    <footer className='sticky bottom-0 z-50 bg-white border-t border-outline-variant/20'>
      {/* Progress Bar */}
      <ListingProgress currentStepIndex={currentStepIndex} />

      {/* Navigation Buttons */}
      <div className='max-w-4xl mx-auto px-4 py-4 flex items-center justify-between gap-4'>
        {/* Back Button */}
        {!isFirstStep && canGoBack ? (
          <button
            type='button'
            onClick={onBack}
            disabled={disabled || loading}
            className='flex items-center gap-2 text-on-surface font-semibold hover:underline disabled:opacity-50 disabled:cursor-not-allowed transition-all'
          >
            <ChevronLeft className='w-5 h-5' />
            <span>Back</span>
          </button>
        ) : (
          <div /> // Spacer
        )}

        {/* Next/Publish Button */}
        <button
          type='button'
          onClick={onNext}
          disabled={disabled || loading || !canGoNext}
          className='ml-auto px-6 py-3 bg-on-surface text-white rounded-2xl font-bold text-sm hover:bg-on-surface/90 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2'
        >
          {loading && <Loader2 className='w-4 h-4 animate-spin' />}
          <span>{nextLabel}</span>
        </button>
      </div>
    </footer>
  )
}
