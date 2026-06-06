'use client'

import { Edit2, Home, MapPin, IndianRupee, Image as ImageIcon, Users } from 'lucide-react'
import type { ListingFormData, StepId } from '@/lib/listing-flow/steps'

interface ReviewStepProps {
  formData: ListingFormData
  photos: string[]
  onEditStep?: (stepId: StepId) => void
  disabled?: boolean
}

export function ReviewStep({ formData, photos, onEditStep, disabled = false }: ReviewStepProps) {
  return (
    <div className='max-w-3xl mx-auto py-8 px-4'>
      <h1 className='text-2xl md:text-3xl font-bold text-on-surface mb-2'>
        Review your listing
      </h1>
      <p className='text-on-surface-variant mb-8'>
        {"Here's what we'll show to guests. Make sure everything looks good."}
      </p>

      <div className='space-y-4'>
        {/* Photos */}
        <ReviewSection
          icon={ImageIcon}
          title='Photos'
          onEdit={() => onEditStep?.('photos')}
          disabled={disabled}
        >
          <div className='grid grid-cols-3 gap-2'>
            {photos.slice(0, 6).map((photo, i) => (
              <img
                key={i}
                src={photo}
                alt={`Photo ${i + 1}`}
                className='w-full aspect-square object-cover rounded-lg'
              />
            ))}
          </div>
          {photos.length > 6 && (
            <p className='text-sm text-on-surface-variant mt-2'>
              +{photos.length - 6} more photos
            </p>
          )}
        </ReviewSection>

        {/* Title & Description */}
        <ReviewSection
          icon={Home}
          title='Title & Description'
          onEdit={() => onEditStep?.('title-description')}
          disabled={disabled}
        >
          <h3 className='font-bold text-lg text-on-surface mb-2'>{formData.title || 'No title'}</h3>
          <p className='text-sm text-on-surface-variant'>
            {formData.description || 'No description provided'}
          </p>
        </ReviewSection>

        {/* Property Details */}
        <ReviewSection
          icon={Users}
          title='Property Details'
          onEdit={() => onEditStep?.('property-type')}
          disabled={disabled}
        >
          <div className='grid grid-cols-2 gap-3 text-sm'>
            <div>
              <p className='text-on-surface-variant'>Room Type</p>
              <p className='font-semibold text-on-surface capitalize'>{formData.roomType}</p>
            </div>
            <div>
              <p className='text-on-surface-variant'>Gender Preference</p>
              <p className='font-semibold text-on-surface capitalize'>{formData.genderPref}</p>
            </div>
            <div>
              <p className='text-on-surface-variant'>Capacity</p>
              <p className='font-semibold text-on-surface'>{formData.totalBeds} beds</p>
            </div>
            <div>
              <p className='text-on-surface-variant'>Amenities</p>
              <p className='font-semibold text-on-surface'>{formData.amenities.length} selected</p>
            </div>
          </div>
        </ReviewSection>

        {/* Location */}
        <ReviewSection
          icon={MapPin}
          title='Location'
          onEdit={() => onEditStep?.('address')}
          disabled={disabled}
        >
          <p className='text-sm text-on-surface'>
            {formData.street}, {formData.city} - {formData.pincode}
          </p>
          {formData.landmark && (
            <p className='text-sm text-on-surface-variant mt-1'>
              Near: {formData.landmark}
            </p>
          )}
        </ReviewSection>

        {/* Pricing */}
        <ReviewSection
          icon={IndianRupee}
          title='Pricing'
          onEdit={() => onEditStep?.('pricing')}
          disabled={disabled}
        >
          <div className='flex items-baseline gap-2'>
            <span className='text-2xl font-bold text-on-surface'>₹{formData.rent}</span>
            <span className='text-sm text-on-surface-variant'>per month</span>
          </div>
          {formData.deposit && (
            <p className='text-sm text-on-surface-variant mt-1'>
              Security deposit: ₹{formData.deposit}
            </p>
          )}
        </ReviewSection>
      </div>

      {/* Final Note */}
      <div className='mt-8 bg-blue-50/50 border border-blue-200 rounded p-4'>
        <p className='text-sm text-blue-900'>
          <strong>Ready to publish?</strong> Click "Submit for Review" below to submit your listing for review.
          {" You'll be notified once it's approved and live."}
        </p>
      </div>
    </div>
  )
}

function ReviewSection({
  icon: Icon,
  title,
  children,
  onEdit,
  disabled,
}: {
  icon: any
  title: string
  children: React.ReactNode
  onEdit: () => void
  disabled?: boolean
}) {
  return (
    <div className='bg-white rounded-2xl border-2 border-outline-variant/30 p-6'>
      <div className='flex items-center justify-between mb-4'>
        <div className='flex items-center gap-2'>
          <Icon className='w-5 h-5 text-on-surface-variant' />
          <h3 className='font-bold text-on-surface'>{title}</h3>
        </div>
        {onEdit && !disabled && (
          <button
            type='button'
            onClick={onEdit}
            className='flex items-center gap-1 text-sm text-primary hover:text-primary/80 font-semibold'
          >
            <Edit2 className='w-4 h-4' />
            Edit
          </button>
        )}
      </div>
      {children}
    </div>
  )
}
