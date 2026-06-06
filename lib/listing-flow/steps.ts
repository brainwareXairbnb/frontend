/**
 * Listing Flow Steps Configuration
 * Defines the 15-step Airbnb-style listing creation flow
 */

import {
  validatePropertyType,
  validateGenderPref,
  validateCapacity,
  validateAddress,
  validateLocation,
  validatePhotos,
  validateTitle,
  validatePricing,
} from './validation'

export type StepId =
  // Section 1: Tell us about your place
  | 'intro-place'
  | 'property-type'
  | 'gender-pref'
  | 'capacity'
  | 'location-map'
  | 'address'
  // Section 2: Make it stand out
  | 'intro-standout'
  | 'amenities'
  | 'photos'
  | 'title-description'
  // Section 3: Finish up
  | 'intro-publish'
  | 'pricing'
  | 'availability'
  | 'review-publish'

export interface ListingFormData {
  title: string
  description: string
  roomType: string
  rent: string
  deposit: string
  street: string
  city: string
  pincode: string
  landmark: string
  genderPref: string
  amenities: string[]
  houseRules: string[]
  // Capacity fields
  totalStudents: string
  totalBedrooms: string
  totalBeds: string
  totalBathrooms: string
  isAvailable: boolean
  location: {
    coordinates: [number, number]
  }
}

export interface Step {
  id: StepId
  title: string
  section: 1 | 2 | 3
  isIntro?: boolean
  validate?: (formData: ListingFormData, photos: string[]) => boolean
}

export const STEPS: Step[] = [
  // Section 1: Tell us about your place
  {
    id: 'intro-place',
    title: 'Tell us about your place',
    section: 1,
    isIntro: true,
  },
  {
    id: 'property-type',
    title: 'Property type',
    section: 1,
    validate: validatePropertyType,
  },
  {
    id: 'gender-pref',
    title: 'Gender preference',
    section: 1,
    validate: validateGenderPref,
  },
  {
    id: 'capacity',
    title: 'Capacity',
    section: 1,
    validate: validateCapacity,
  },
  {
    id: 'location-map',
    title: 'Location',
    section: 1,
    validate: validateLocation,
  },
  {
    id: 'address',
    title: 'Address',
    section: 1,
    validate: validateAddress,
  },

  // Section 2: Make it stand out
  {
    id: 'intro-standout',
    title: 'Make it stand out',
    section: 2,
    isIntro: true,
  },
  {
    id: 'amenities',
    title: 'Amenities',
    section: 2,
  },
  {
    id: 'photos',
    title: 'Photos',
    section: 2,
    validate: (_formData, photos) => validatePhotos(photos),
  },
  {
    id: 'title-description',
    title: 'Title & description',
    section: 2,
    validate: validateTitle,
  },

  // Section 3: Finish up
  {
    id: 'intro-publish',
    title: 'Finish up and publish',
    section: 3,
    isIntro: true,
  },
  {
    id: 'pricing',
    title: 'Pricing',
    section: 3,
    validate: validatePricing,
  },
  {
    id: 'availability',
    title: 'Availability',
    section: 3,
  },
  {
    id: 'review-publish',
    title: 'Review & publish',
    section: 3,
  },
]

/**
 * Get section progress for progress bar
 */
export const getSectionProgress = (
  currentStepIndex: number
): {
  section1: number
  section2: number
  section3: number
} => {
  const currentStep = STEPS[currentStepIndex]
  const section = currentStep.section

  // Calculate progress within each section
  const section1Steps = STEPS.filter((s) => s.section === 1)
  const section2Steps = STEPS.filter((s) => s.section === 2)
  const section3Steps = STEPS.filter((s) => s.section === 3)

  let section1 = 0
  let section2 = 0
  let section3 = 0

  if (section === 1) {
    // In section 1, show partial progress
    const section1Index = section1Steps.findIndex((s) => s.id === currentStep.id)
    section1 = ((section1Index + 1) / section1Steps.length) * 100
  } else if (section === 2) {
    // Section 1 complete, section 2 in progress
    section1 = 100
    const section2Index = section2Steps.findIndex((s) => s.id === currentStep.id)
    section2 = ((section2Index + 1) / section2Steps.length) * 100
  } else if (section === 3) {
    // Sections 1 & 2 complete, section 3 in progress
    section1 = 100
    section2 = 100
    const section3Index = section3Steps.findIndex((s) => s.id === currentStep.id)
    section3 = ((section3Index + 1) / section3Steps.length) * 100
  }

  return { section1, section2, section3 }
}
