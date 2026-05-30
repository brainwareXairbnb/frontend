'use client'

import { Button } from '@/components/ui/button'
import { Loader2, CheckCircle, ImagePlus } from 'lucide-react'
import { Listing } from '@/lib/types'

interface FormNavigationProps {
  currentStep: number
  totalSteps: number
  loadingAction: 'draft' | 'submit' | null
  editingListing?: Listing | null
  onPrevStep: () => void
  onNextStep: () => void
  onSaveDraft: () => void
  onSubmit: () => void
}

export function FormNavigation({
  currentStep,
  totalSteps,
  loadingAction,
  editingListing,
  onPrevStep,
  onNextStep,
  onSaveDraft,
  onSubmit,
}: FormNavigationProps) {
  const isDraftLoading = loadingAction === 'draft'
  const isSubmitLoading = loadingAction === 'submit'
  const isAnyLoading = loadingAction !== null

  if (currentStep < totalSteps) {
    // Navigation Buttons (Steps 1-3)
    return (
      <div className='flex items-center justify-between gap-3 w-full'>
        {currentStep > 1 ? (
          <Button
            type='button'
            variant='outline'
            size='sm'
            rounded='md'
            onClick={onPrevStep}
            disabled={isAnyLoading}
            className='h-11 px-8 border border-gray-300 bg-white hover:bg-gray-50 text-xs font-bold text-gray-700 uppercase tracking-wider'
          >
            Previous
          </Button>
        ) : (
          <div className='w-0'></div>
        )}
        <Button
          type='button'
          size='sm'
          rounded='md'
          onClick={onNextStep}
          disabled={isAnyLoading}
          className='h-11 px-12 bg-primary text-white hover:bg-primary/90 text-xs font-bold shadow-md shadow-primary/20 uppercase tracking-wider'
        >
          Next
        </Button>
      </div>
    )
  }

  // Final Step (Step 4) - Submit Buttons
  return (
    <div className='flex flex-col gap-2 w-full'>
      {/* Previous Button - Full Width on Mobile */}
      <Button
        type='button'
        variant='outline'
        size='sm'
        rounded='md'
        onClick={onPrevStep}
        disabled={isAnyLoading}
        className='w-full h-10 border border-gray-300 bg-white hover:bg-gray-50 text-xs font-bold text-gray-700 uppercase tracking-wider md:hidden'
      >
        Previous
      </Button>

      {/* Action Buttons Row */}
      <div className='flex items-center gap-2 w-full'>
        {/* Previous Button - Desktop Only */}
        <Button
          type='button'
          variant='outline'
          size='sm'
          rounded='md'
          onClick={onPrevStep}
          disabled={isAnyLoading}
          className='hidden md:flex h-10 px-6 border border-gray-300 bg-white hover:bg-gray-50 text-xs font-bold text-gray-700 uppercase tracking-wider'
        >
          Previous
        </Button>

        {editingListing ? (
          // Edit Mode - Update and/or Submit Buttons
          <>
            <Button
              type='button'
              variant='outline'
              size='sm'
              rounded='md'
              onClick={onSaveDraft}
              disabled={isAnyLoading}
              className='flex-1 h-10 border border-gray-300 bg-white hover:bg-gray-50 text-xs font-bold text-gray-700 uppercase tracking-wider'
            >
              {isDraftLoading ? (
                <>
                  <Loader2 className='w-3.5 h-3.5 animate-spin mr-1.5' />
                  Updating...
                </>
              ) : (
                <>
                  <CheckCircle className='w-3.5 h-3.5 mr-1.5' />
                  Save
                </>
              )}
            </Button>
            {(editingListing.status === 'draft' || editingListing.status === 'rejected') && (
              <Button
                type='button'
                size='sm'
                rounded='md'
                onClick={onSubmit}
                disabled={isAnyLoading}
                className='flex-1 h-10 bg-primary text-white hover:bg-primary/90 text-xs font-bold shadow-md shadow-primary/20 uppercase tracking-wider'
              >
                {isSubmitLoading ? (
                  <>
                    <Loader2 className='w-3.5 h-3.5 animate-spin mr-1.5' />
                    Submitting...
                  </>
                ) : (
                  <>
                    <ImagePlus className='w-3.5 h-3.5 mr-1.5' />
                    Re-Submit
                  </>
                )}
              </Button>
            )}
          </>
        ) : (
          // Create Mode - Save Draft, Submit Buttons
          <>
            <Button
              type='button'
              variant='outline'
              size='sm'
              rounded='md'
              onClick={onSaveDraft}
              disabled={isAnyLoading}
              className='flex-1 h-10 border border-gray-300 bg-white hover:bg-gray-50 text-xs font-bold text-gray-700 uppercase tracking-wider'
            >
              {isDraftLoading ? (
                <>
                  <Loader2 className='w-3.5 h-3.5 animate-spin mr-1.5' />
                  Saving...
                </>
              ) : (
                <>
                  <CheckCircle className='w-3.5 h-3.5 mr-1.5' />
                  Save Draft
                </>
              )}
            </Button>
            <Button
              type='button'
              size='sm'
              rounded='md'
              onClick={onSubmit}
              disabled={isAnyLoading}
              className='flex-1 h-10 bg-primary text-white hover:bg-primary/90 text-xs font-bold shadow-md shadow-primary/20 uppercase tracking-wider'
            >
              {isSubmitLoading ? (
                <>
                  <Loader2 className='w-3.5 h-3.5 animate-spin mr-1.5' />
                  Submitting...
                </>
              ) : (
                <>
                  <ImagePlus className='w-3.5 h-3.5 mr-1.5' />
                  Submit
                </>
              )}
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
