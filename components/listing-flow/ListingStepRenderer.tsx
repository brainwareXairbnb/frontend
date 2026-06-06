'use client'

import { motion, AnimatePresence } from 'framer-motion'
import type { StepId, ListingFormData } from '@/lib/listing-flow/steps'

// Step components (will be created next)
import { IntroPlaceStep } from './steps/intro/IntroPlaceStep'
import { IntroStandoutStep } from './steps/intro/IntroStandoutStep'
import { IntroPublishStep } from './steps/intro/IntroPublishStep'
import { PropertyTypeStep } from './steps/place/PropertyTypeStep'
import { GenderPrefStep } from './steps/place/GenderPrefStep'
import { CapacityStep } from './steps/place/CapacityStep'
import { AddressStep } from './steps/location/AddressStep'
import { MapStep } from './steps/location/MapStep'
import { AmenitiesStep } from './steps/standout/AmenitiesStep'
import { PhotosStep } from './steps/standout/PhotosStep'
import { TitleDescriptionStep } from './steps/standout/TitleDescriptionStep'
import { PricingStep } from './steps/publish/PricingStep'
import { AvailabilityStep } from './steps/publish/AvailabilityStep'
import { ReviewStep } from './steps/publish/ReviewStep'

interface ListingStepRendererProps {
  currentStepId: StepId
  formData: ListingFormData
  photos: string[]
  onFormChange: (data: Partial<ListingFormData>) => void
  onPhotosChange: (photos: string[]) => void
  onEditStep?: (stepId: StepId) => void
  viewMode?: boolean
}

export function ListingStepRenderer({
  currentStepId,
  formData,
  photos,
  onFormChange,
  onPhotosChange,
  onEditStep,
  viewMode = false,
}: ListingStepRendererProps) {
  const renderStep = () => {
    const commonProps = {
      formData,
      photos,
      onChange: onFormChange,
      onPhotosChange,
      disabled: viewMode,
    }

    switch (currentStepId) {
      // Intro steps
      case 'intro-place':
        return <IntroPlaceStep />
      case 'intro-standout':
        return <IntroStandoutStep />
      case 'intro-publish':
        return <IntroPublishStep />

      // Section 1: Tell us about your place
      case 'property-type':
        return <PropertyTypeStep {...commonProps} />
      case 'gender-pref':
        return <GenderPrefStep {...commonProps} />
      case 'capacity':
        return <CapacityStep {...commonProps} />
      case 'address':
        return <AddressStep {...commonProps} />
      case 'location-map':
        return <MapStep {...commonProps} />

      // Section 2: Make it stand out
      case 'amenities':
        return <AmenitiesStep {...commonProps} />
      case 'photos':
        return <PhotosStep {...commonProps} />
      case 'title-description':
        return <TitleDescriptionStep {...commonProps} />

      // Section 3: Finish up
      case 'pricing':
        return <PricingStep {...commonProps} />
      case 'availability':
        return <AvailabilityStep {...commonProps} />
      case 'review-publish':
        return <ReviewStep {...commonProps} onEditStep={onEditStep} />

      default:
        return <div>Step not found</div>
    }
  }

  return (
    <AnimatePresence mode='wait'>
      <motion.div
        key={currentStepId}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className='w-full'
      >
        {renderStep()}
      </motion.div>
    </AnimatePresence>
  )
}
