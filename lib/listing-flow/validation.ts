/**
 * Listing Flow Validation Logic
 * Extracted from CreateListingDrawer for reusability
 */

import type { ListingFormData } from './steps'

export const validatePropertyType = (formData: ListingFormData): boolean => {
  return !!formData.roomType && formData.roomType.trim().length > 0
}

export const validateGenderPref = (formData: ListingFormData): boolean => {
  return !!formData.genderPref && formData.genderPref.trim().length > 0
}

export const validateCapacity = (formData: ListingFormData): boolean => {
  const students = parseInt(formData.totalStudents)
  const bedrooms = parseInt(formData.totalBedrooms)
  const beds = parseInt(formData.totalBeds)
  const bathrooms = parseInt(formData.totalBathrooms)

  return (
    !!formData.totalStudents && !isNaN(students) && students > 0 && students <= 50 &&
    !!formData.totalBedrooms && !isNaN(bedrooms) && bedrooms > 0 && bedrooms <= 20 &&
    !!formData.totalBeds && !isNaN(beds) && beds > 0 && beds <= 50 &&
    !!formData.totalBathrooms && !isNaN(bathrooms) && bathrooms > 0 && bathrooms <= 10
  )
}

export const validateAddress = (formData: ListingFormData): boolean => {
  return (
    !!formData.street &&
    formData.street.trim().length > 0 &&
    !!formData.pincode &&
    formData.pincode.length === 6 &&
    /^\d{6}$/.test(formData.pincode)
  )
}

export const validateLocation = (formData: ListingFormData): boolean => {
  return (
    !!formData.location?.coordinates &&
    Array.isArray(formData.location.coordinates) &&
    formData.location.coordinates.length === 2 &&
    !isNaN(formData.location.coordinates[0]) &&
    !isNaN(formData.location.coordinates[1])
  )
}

export const validatePhotos = (photos: string[]): boolean => {
  return Array.isArray(photos) && photos.length >= 2 && photos.length <= 10
}

export const validateTitle = (formData: ListingFormData): boolean => {
  return !!formData.title && formData.title.trim().length > 0 && formData.title.trim().length <= 100
}

export const validateDescription = (formData: ListingFormData): boolean => {
  // Description is optional, so always valid
  return true
}

export const validatePricing = (formData: ListingFormData): boolean => {
  const rent = parseFloat(formData.rent)
  return !!formData.rent && !isNaN(rent) && rent > 0
}

export const validateDeposit = (formData: ListingFormData): boolean => {
  // Deposit is optional
  if (!formData.deposit || formData.deposit.trim() === '') return true
  const deposit = parseFloat(formData.deposit)
  return !isNaN(deposit) && deposit >= 0
}

export const validateAvailability = (formData: ListingFormData): boolean => {
  // Availability is always valid (default is true)
  return typeof formData.isAvailable === 'boolean'
}

/**
 * Validate all required fields for final submission
 */
export const validateAllSteps = (formData: ListingFormData, photos: string[]): boolean => {
  return (
    validatePropertyType(formData) &&
    validateGenderPref(formData) &&
    validateCapacity(formData) &&
    validateAddress(formData) &&
    validateLocation(formData) &&
    validatePhotos(photos) &&
    validateTitle(formData) &&
    validatePricing(formData) &&
    validateDeposit(formData)
  )
}

/**
 * Get validation errors for displaying to user
 */
export const getValidationErrors = (
  formData: ListingFormData,
  photos: string[]
): string[] => {
  const errors: string[] = []

  if (!validatePropertyType(formData)) {
    errors.push('Please select a room type')
  }
  if (!validateGenderPref(formData)) {
    errors.push('Please select a gender preference')
  }
  if (!validateCapacity(formData)) {
    errors.push('Please enter valid capacity details (students, bedrooms, beds, bathrooms)')
  }
  if (!validateAddress(formData)) {
    errors.push('Please enter a valid street address and 6-digit pincode')
  }
  if (!validateLocation(formData)) {
    errors.push('Please set your location on the map')
  }
  if (!validatePhotos(photos)) {
    errors.push('Please upload at least 2 photos (maximum 10)')
  }
  if (!validateTitle(formData)) {
    errors.push('Please enter a listing title (maximum 100 characters)')
  }
  if (!validatePricing(formData)) {
    errors.push('Please enter a valid monthly rent amount')
  }
  if (!validateDeposit(formData)) {
    errors.push('Please enter a valid deposit amount (or leave empty)')
  }

  return errors
}
