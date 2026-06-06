/**
 * Listing Flow Navigation Helpers
 */

import { STEPS, type StepId, type ListingFormData } from './steps'

export interface NavigationState {
  currentStepIndex: number
  currentStepId: StepId
  canGoBack: boolean
  canGoNext: boolean
  isFirstStep: boolean
  isLastStep: boolean
  isIntroStep: boolean
}

/**
 * Get navigation state for current step
 */
export const getNavigationState = (currentStepIndex: number): NavigationState => {
  const currentStep = STEPS[currentStepIndex]

  return {
    currentStepIndex,
    currentStepId: currentStep.id,
    canGoBack: currentStepIndex > 0,
    canGoNext: currentStepIndex < STEPS.length - 1,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === STEPS.length - 1,
    isIntroStep: currentStep.isIntro || false,
  }
}

/**
 * Determine if current step can be navigated away from
 */
export const canNavigateNext = (
  currentStepIndex: number,
  formData: ListingFormData,
  photos: string[]
): { canProceed: boolean; error?: string } => {
  const currentStep = STEPS[currentStepIndex]

  // Intro steps don't need validation
  if (currentStep.isIntro) {
    return { canProceed: true }
  }

  // If step has validation, check it
  if (currentStep.validate) {
    const isValid = currentStep.validate(formData, photos)
    if (!isValid) {
      return {
        canProceed: false,
        error: 'Please complete all required fields before continuing',
      }
    }
  }

  return { canProceed: true }
}

/**
 * Navigate to next step
 */
export const navigateNext = (
  currentStepIndex: number,
  formData: ListingFormData,
  photos: string[]
): { nextIndex: number; error?: string } => {
  const { canProceed, error } = canNavigateNext(currentStepIndex, formData, photos)

  if (!canProceed) {
    return { nextIndex: currentStepIndex, error }
  }

  const nextIndex = Math.min(currentStepIndex + 1, STEPS.length - 1)
  return { nextIndex }
}

/**
 * Navigate to previous step
 */
export const navigatePrev = (currentStepIndex: number): number => {
  return Math.max(currentStepIndex - 1, 0)
}

/**
 * Navigate to specific step by ID
 */
export const navigateToStepId = (stepId: StepId): number => {
  const index = STEPS.findIndex((s) => s.id === stepId)
  return index >= 0 ? index : 0
}

/**
 * Get button labels for current step
 */
export const getButtonLabels = (
  currentStepIndex: number
): {
  backLabel: string
  nextLabel: string
} => {
  const { isLastStep } = getNavigationState(currentStepIndex)

  return {
    backLabel: 'Back',
    nextLabel: isLastStep ? 'Submit for Review' : 'Next',
  }
}
