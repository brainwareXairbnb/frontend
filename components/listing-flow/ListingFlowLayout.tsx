'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { roomsApi } from '@/lib/api'
import type { Listing } from '@/lib/types'
import { STEPS, type ListingFormData, type StepId } from '@/lib/listing-flow/steps'
import { navigateNext, navigatePrev, getButtonLabels } from '@/lib/listing-flow/navigation'
import { ListingHeader } from './ListingHeader'
import { ListingFooter } from './ListingFooter'
import { ListingStepRenderer } from './ListingStepRenderer'

interface ListingFlowLayoutProps {
  editingListing?: Listing | null
  viewMode?: boolean
  onSuccess?: () => void
  onClose?: () => void
}

export function ListingFlowLayout({
  editingListing,
  viewMode = false,
  onSuccess,
  onClose,
}: ListingFlowLayoutProps) {
  const router = useRouter()
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [loadingAction, setLoadingAction] = useState<'draft' | 'submit' | null>(null)
  const [photos, setPhotos] = useState<string[]>([])
  const [formData, setFormData] = useState<ListingFormData>({
    title: '',
    description: '',
    roomType: 'single',
    rent: '',
    deposit: '',
    street: '',
    city: 'Kolkata',
    pincode: '',
    landmark: '',
    genderPref: 'any',
    furnishing: 'Unfurnished',
    amenities: [],
    houseRules: [],
    // Capacity fields
    totalStudents: '1',
    totalBedrooms: '1',
    totalBeds: '1',
    totalBathrooms: '1',
    isAvailable: true,
    location: {
      coordinates: [88.4337, 22.9716], // Default: Kalyani, West Bengal
    },
  })

  const currentStep = STEPS[currentStepIndex]
  const isFirstStep = currentStepIndex === 0
  const isLastStep = currentStepIndex === STEPS.length - 1
  const { backLabel, nextLabel } = getButtonLabels(currentStepIndex)

  // Populate form when editing
  useEffect(() => {
    if (editingListing) {
      setFormData({
        title: editingListing.title,
        description: editingListing.description || '',
        roomType: editingListing.roomType,
        rent: String(editingListing.rent),
        deposit: String(editingListing.deposit || ''),
        street: editingListing.address?.street || '',
        city: editingListing.address?.city || 'Kolkata',
        pincode: editingListing.address?.pincode || '',
        landmark: editingListing.address?.landmark || '',
        genderPref: editingListing.genderPref || 'any',
        furnishing: editingListing.furnishing || 'Unfurnished',
        amenities: editingListing.amenities || [],
        houseRules: editingListing.houseRules || [],
        // Capacity fields
        totalStudents: String(editingListing.totalStudents || 1),
        totalBedrooms: String(editingListing.totalBedrooms || 1),
        totalBeds: String(editingListing.totalBeds || 1),
        totalBathrooms: String(editingListing.totalBathrooms || 1),
        isAvailable: editingListing.isAvailable ?? true,
        location: {
          coordinates: Array.isArray(editingListing.location?.coordinates)
            ? (editingListing.location.coordinates as [number, number])
            : [88.4337, 22.9716],
        },
      })
      setPhotos(editingListing.photos || [])
    }
  }, [editingListing])

  const handleFormChange = (data: Partial<ListingFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const handlePhotosChange = (newPhotos: string[]) => {
    setPhotos(newPhotos)
  }

  const handleNext = () => {
    if (isLastStep) {
      handleSubmit()
      return
    }

    const result = navigateNext(currentStepIndex, formData, photos)
    if (result.error) {
      toast.error(result.error)
      return
    }

    let nextIndex = result.nextIndex

    // Skip availability step if creating new listing (not editing)
    if (!editingListing && STEPS[nextIndex]?.id === 'availability') {
      nextIndex = Math.min(nextIndex + 1, STEPS.length - 1)
    }

    setCurrentStepIndex(nextIndex)
  }

  const handleBack = () => {
    let prevIndex = navigatePrev(currentStepIndex)

    // Skip availability step if creating new listing (not editing)
    if (!editingListing && STEPS[prevIndex]?.id === 'availability') {
      prevIndex = Math.max(prevIndex - 1, 0)
    }

    setCurrentStepIndex(prevIndex)
  }

  const handleSaveExit = async () => {
    setLoadingAction('draft')

    try {
      const listingData = {
        title: formData.title,
        description: formData.description,
        roomType: formData.roomType,
        rent: parseFloat(formData.rent) || 0,
        deposit: formData.deposit ? parseFloat(formData.deposit) : 0,
        address: {
          street: formData.street,
          city: formData.city,
          pincode: formData.pincode,
          landmark: formData.landmark,
        },
        genderPref: formData.genderPref,
        furnishing: formData.furnishing,
        amenities: formData.amenities,
        houseRules: formData.houseRules,
        // Capacity fields
        totalStudents: parseInt(formData.totalStudents) || 1,
        totalBedrooms: parseInt(formData.totalBedrooms) || 1,
        totalBeds: parseInt(formData.totalBeds) || 1,
        totalBathrooms: parseInt(formData.totalBathrooms) || 1,
        isAvailable: editingListing ? formData.isAvailable : true, // Always true for new listings
        location: {
          type: 'Point',
          coordinates: formData.location.coordinates,
        },
        photos,
      }

      if (editingListing) {
        await roomsApi.updateListing(editingListing._id, listingData)
        toast.success('Draft saved successfully')
      } else {
        await roomsApi.createListing(listingData)
        toast.success('Draft saved successfully')
      }

      onSuccess?.()
      onClose?.()
    } catch (error: any) {
      toast.error('Failed to save draft', { description: error.message })
    } finally {
      setLoadingAction(null)
    }
  }

  const handleSubmit = async () => {
    setLoadingAction('submit')

    try {
      const listingData = {
        title: formData.title,
        description: formData.description,
        roomType: formData.roomType,
        rent: parseFloat(formData.rent),
        deposit: formData.deposit ? parseFloat(formData.deposit) : 0,
        address: {
          street: formData.street,
          city: formData.city,
          pincode: formData.pincode,
          landmark: formData.landmark,
        },
        genderPref: formData.genderPref,
        furnishing: formData.furnishing,
        amenities: formData.amenities,
        houseRules: formData.houseRules,
        // Capacity fields
        totalStudents: parseInt(formData.totalStudents),
        totalBedrooms: parseInt(formData.totalBedrooms),
        totalBeds: parseInt(formData.totalBeds),
        totalBathrooms: parseInt(formData.totalBathrooms),
        isAvailable: editingListing ? formData.isAvailable : true, // Always true for new listings
        location: {
          type: 'Point',
          coordinates: formData.location.coordinates,
        },
        photos,
      }

      if (editingListing) {
        await roomsApi.updateListing(editingListing._id, listingData)
        if (
          editingListing.status === 'draft' ||
          editingListing.status === 'rejected' ||
          editingListing.status === 'changes_required'
        ) {
          await roomsApi.submitListing(editingListing._id)
        }
        toast.success('Listing updated and submitted for review')
      } else {
        const response: any = await roomsApi.createListing(listingData)
        const listingId = response?.listing?._id || response?._id
        if (listingId) {
          await roomsApi.submitListing(listingId)
        }
        toast.success('Listing submitted for review')
      }

      onSuccess?.()
      onClose?.()
    } catch (error: any) {
      toast.error('Failed to submit listing', { description: error.message })
    } finally {
      setLoadingAction(null)
    }
  }

  const handleEditStep = (stepId: StepId) => {
    const stepIndex = STEPS.findIndex((s) => s.id === stepId)
    if (stepIndex >= 0) {
      setCurrentStepIndex(stepIndex)
    }
  }

  return (
    <div className='h-full flex flex-col bg-surface pt-[env(safe-area-inset-top)]'>
      {/* Header */}
      <ListingHeader
        onSaveExit={handleSaveExit}
        saving={loadingAction === 'draft'}
        disabled={viewMode}
      />

      {/* Main Content */}
      <main className='flex-1 overflow-y-auto'>
        <div className='max-w-4xl mx-auto pb-4'>
          <ListingStepRenderer
            currentStepId={currentStep.id}
            formData={formData}
            photos={photos}
            onFormChange={handleFormChange}
            onPhotosChange={handlePhotosChange}
            onEditStep={handleEditStep}
            viewMode={viewMode}
          />
        </div>
      </main>

      {/* Footer */}
      {!viewMode && (
        <div className='pb-[env(safe-area-inset-bottom)]'>
          <ListingFooter
            currentStepIndex={currentStepIndex}
            onBack={handleBack}
            onNext={handleNext}
            canGoBack={!isFirstStep}
            canGoNext={true}
            isFirstStep={isFirstStep}
            isLastStep={isLastStep}
            nextLabel={nextLabel}
            loading={loadingAction === 'submit'}
            disabled={viewMode}
          />
        </div>
      )}
    </div>
  )
}
