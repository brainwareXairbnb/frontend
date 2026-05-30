'use client'

import { useState, useEffect } from 'react'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { X, Home, MapPin, IndianRupee, ImagePlus, AlertTriangle } from 'lucide-react'
import { roomsApi } from '@/lib/api'
import { toast } from 'sonner'
import useIsMobile from '@/lib/useIsMobile'
import { CreateListingDrawerProps } from '@/lib/types'
import { StepIndicator } from '@/components/listing-form/StepIndicator'
import { BasicInfoStep } from '@/components/listing-form/BasicInfoStep'
import { LocationStep } from '@/components/listing-form/LocationStep'
import { PricingAmenitiesStep } from '@/components/listing-form/PricingAmenitiesStep'
import { PhotosStep } from '@/components/listing-form/PhotosStep'
import { FormNavigation } from '@/components/listing-form/FormNavigation'

export default function CreateListingDrawer({
  open,
  onOpenChange,
  onSuccess,
  editingListing,
  viewMode = false,
}: CreateListingDrawerProps) {
  const [loadingAction, setLoadingAction] = useState<'draft' | 'submit' | null>(null)
  const [photos, setPhotos] = useState<string[]>([])
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 4
  const [formData, setFormData] = useState({
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
    amenities: [] as string[],
    totalBeds: '1',
    isAvailable: true,
    location: {
      coordinates: [88.4337, 22.9716] as [number, number], // Default: Kalyani, West Bengal
    },
  })

  const isMobile = useIsMobile()

  const steps = [
    { number: 1, title: 'Basic Info', icon: Home },
    { number: 2, title: 'Location', icon: MapPin },
    { number: 3, title: 'Pricing & Amenities', icon: IndianRupee },
    { number: 4, title: 'Photos', icon: ImagePlus },
  ]

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.title && formData.totalBeds)
      case 2:
        return !!(formData.street && formData.pincode)
      case 3:
        return !!formData.rent
      case 4:
        return photos.length >= 2
      default:
        return true
    }
  }

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps))
    } else {
      toast.error('Please fill all required fields in this step')
    }
  }

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

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
        amenities: editingListing.amenities,
        totalBeds: String(editingListing.totalBeds || 1),
        isAvailable: editingListing.isAvailable ?? true,
        location: {
          coordinates: Array.isArray(editingListing.location?.coordinates)
            ? (editingListing.location.coordinates as [number, number])
            : [88.4337, 22.9716],
        },
      })
      setPhotos(editingListing.photos || [])
    } else {
      // Reset form when not editing
      setFormData({
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
        amenities: [],
        totalBeds: '1',
        isAvailable: true,
        location: {
          coordinates: [88.4337, 22.9716],
        },
      })
      setPhotos([])
    }
  }, [editingListing])

  const handleSaveAsDraft = async () => {
    // Basic validation
    if (
      !formData.title ||
      !formData.rent ||
      !formData.street ||
      !formData.pincode ||
      !formData.totalBeds
    ) {
      toast.error('Please fill all required fields')
      return
    }

    try {
      setLoadingAction('draft')

      const listingData = {
        title: formData.title,
        description: formData.description,
        roomType: formData.roomType,
        rent: Number(formData.rent),
        deposit: Number(formData.deposit),
        address: {
          street: formData.street,
          city: formData.city,
          pincode: formData.pincode,
          landmark: formData.landmark,
        },
        genderPref: formData.genderPref,
        amenities: formData.amenities,
        totalBeds: Number(formData.totalBeds),
        isAvailable: formData.isAvailable,
        location: {
          type: 'Point',
          coordinates: formData.location.coordinates,
        },
        photos: photos,
      }

      if (editingListing) {
        // Update existing listing
        await roomsApi.updateListing(editingListing._id, listingData)
        toast.success('Listing updated successfully!')
      } else {
        // Create new listing as draft
        await roomsApi.createListing(listingData)
        toast.success('Listing saved as draft!', {
          description: 'You can submit it for approval later',
        })
      }

      onOpenChange(false)
      if (onSuccess) onSuccess()

      // Reset form
      setFormData({
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
        amenities: [],
        totalBeds: '1',
        isAvailable: true,
        location: {
          coordinates: [88.4337, 22.9716],
        },
      })
      setPhotos([])
    } catch (error: any) {
      toast.error('Failed to save listing', {
        description: error.message,
      })
    } finally {
      setLoadingAction(null)
    }
  }

  const handleSubmitForApproval = async () => {
    // Basic validation
    if (
      !formData.title ||
      !formData.rent ||
      !formData.street ||
      !formData.pincode ||
      !formData.totalBeds
    ) {
      toast.error('Please fill all required fields')
      return
    }

    try {
      setLoadingAction('submit')

      const listingData = {
        title: formData.title,
        description: formData.description,
        roomType: formData.roomType,
        rent: Number(formData.rent),
        deposit: Number(formData.deposit),
        address: {
          street: formData.street,
          city: formData.city,
          pincode: formData.pincode,
          landmark: formData.landmark,
        },
        genderPref: formData.genderPref,
        amenities: formData.amenities,
        totalBeds: Number(formData.totalBeds),
        isAvailable: formData.isAvailable,
        location: {
          type: 'Point',
          coordinates: formData.location.coordinates,
        },
        photos: photos,
      }

      if (editingListing) {
        // Update existing listing
        await roomsApi.updateListing(editingListing._id, listingData)
        // Then submit for approval
        await roomsApi.submitListing(editingListing._id)
        toast.success('Listing updated and submitted for approval!')
      } else {
        // Create new listing and submit
        const response: any = await roomsApi.createListing(listingData)
        const listingId = response.listing._id
        await roomsApi.submitListing(listingId)
        toast.success('Listing submitted for approval!', {
          description: 'Admin will review your listing soon',
        })
      }

      onOpenChange(false)
      if (onSuccess) onSuccess()

      // Reset form
      setFormData({
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
        amenities: [],
        totalBeds: '1',
        isAvailable: true,
        location: {
          coordinates: [88.4337, 22.9716],
        },
      })
      setPhotos([])
    } catch (error: any) {
      toast.error('Failed to submit listing', {
        description: error.message,
      })
    } finally {
      setLoadingAction(null)
    }
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction={isMobile ? 'bottom' : 'right'}>
      <DrawerContent
        className='h-[90dvh] md:h-screen w-full md:w-[600px] lg:w-[700px] md:inset-y-0 md:right-0 md:left-auto bottom-0 md:top-0 rounded-t-3xl md:rounded-none mt-0 overflow-hidden md:border-l border-outline-variant/10 flex flex-col'
        style={{
          maxHeight: isMobile ? '90dvh' : '100vh',
          height: isMobile ? '90dvh' : '100vh'
        }}
      >
        {/* Header */}
        <DrawerHeader className='border-b border-outline-variant/10 shrink-0 px-6 py-5 text-left'>
          <div className='flex items-center justify-between mb-4'>
            <div>
              <DrawerTitle className='text-xl font-bold mb-1'>
                {viewMode
                  ? 'Listing Details'
                  : editingListing
                    ? 'Edit Listing'
                    : 'Create New Listing'}
              </DrawerTitle>
              <DrawerDescription className='text-sm text-on-surface-variant'>
                {viewMode
                  ? 'View your property details'
                  : editingListing
                    ? 'Update your property details'
                    : 'Add your property details to get started'}
              </DrawerDescription>
            </div>
            <DrawerClose asChild>
              <button className='w-10 h-10 flex items-center justify-center rounded-full bg-surface-container hover:bg-surface-container-high transition-colors text-on-surface'>
                <X className='w-5 h-5' />
              </button>
            </DrawerClose>
          </div>

          {/* Step Indicator */}
          {!viewMode && <StepIndicator steps={steps} currentStep={currentStep} />}
        </DrawerHeader>

        {/* Scrollable Form Content */}
        <div className='flex-1 overflow-y-auto px-6 py-6'>
          <form className='space-y-8'>
            {/* Rejection / Changes Required Reason Alert */}
            {editingListing?.status === 'rejected' && editingListing?.rejectionReason && (
              <div className='bg-red-50 border border-red-200 rounded p-4 mb-8 animate-in fade-in slide-in-from-top-2'>
                <div className='flex items-center gap-3 mb-2'>
                  <AlertTriangle className='w-5 h-5 text-red-600' />
                  <h4 className='font-bold text-red-900 text-sm'>
                    {editingListing.status === 'rejected' ? 'Listing Rejected' : 'Changes Required'}
                  </h4>
                </div>
                <p className='text-sm text-red-800 leading-relaxed bg-white/50 p-3 rounded border border-red-100 italic'>
                  &quot;{editingListing.rejectionReason}&quot;
                </p>
                <p className='text-[11px] text-red-600 mt-2 font-medium tracking-wider'>
                  Please address the issues mentioned above and update to resubmit for approval.
                </p>
              </div>
            )}

            {/* Step 1: Basic Information */}
            {(viewMode || currentStep === 1) && (
              <BasicInfoStep
                formData={{
                  title: formData.title,
                  description: formData.description,
                  roomType: formData.roomType,
                  genderPref: formData.genderPref,
                  totalBeds: formData.totalBeds,
                }}
                onChange={(data) => setFormData({ ...formData, ...data })}
                disabled={viewMode}
              />
            )}

            {/* Step 2: Location */}
            {(viewMode || currentStep === 2) && (
              <LocationStep
                location={formData.location}
                address={{
                  street: formData.street,
                  city: formData.city,
                  pincode: formData.pincode,
                  landmark: formData.landmark,
                }}
                onLocationChange={(location) => setFormData({ ...formData, location })}
                onAddressChange={(address) => setFormData({ ...formData, ...address })}
                disabled={viewMode}
              />
            )}

            {/* Step 3: Pricing & Amenities */}
            {(viewMode || currentStep === 3) && (
              <PricingAmenitiesStep
                pricing={{ rent: formData.rent, deposit: formData.deposit }}
                amenitiesData={{ amenities: formData.amenities }}
                availability={{ isAvailable: formData.isAvailable }}
                onPricingChange={(pricing) => setFormData({ ...formData, ...pricing })}
                onAmenitiesChange={(amenities) => setFormData({ ...formData, amenities })}
                onAvailabilityChange={(isAvailable) => setFormData({ ...formData, isAvailable })}
                disabled={viewMode}
                editingListing={editingListing}
              />
            )}

            {/* Step 4: Photos Upload */}
            {(viewMode || currentStep === 4) && !viewMode && (
              <PhotosStep photos={photos} onChange={setPhotos} />
            )}
          </form>
        </div>

        {/* Footer Actions */}
        {!viewMode && (
          <DrawerFooter className='border-t border-outline-variant/10 px-4 py-3 shrink-0 bg-white'>
            <FormNavigation
              currentStep={currentStep}
              totalSteps={totalSteps}
              loadingAction={loadingAction}
              editingListing={editingListing}
              onPrevStep={handlePrevStep}
              onNextStep={handleNextStep}
              onSaveDraft={handleSaveAsDraft}
              onSubmit={handleSubmitForApproval}
            />
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  )
}
