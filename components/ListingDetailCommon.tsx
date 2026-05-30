'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { roomsApi, userApi, adminApi, bookingsApi } from '@/lib/api'
import { useAuth } from '@/lib/auth-context'
import { RoomDetailSkeleton } from '@/components/skeletons'
import { BookingRequestModal } from '@/components/BookingRequestModal'
import { ConfirmationModal } from '@/components/ConfirmationModal'
import { ListingHeader } from '@/components/listing/ListingHeader'
import { ListingHeroSection } from '@/components/listing/ListingHeroSection'
import { ListingInfo } from '@/components/listing/ListingInfo'
import { ListingAmenities } from '@/components/listing/ListingAmenities'
import { ListingLocation } from '@/components/listing/ListingLocation'
import { ListingReviews } from '@/components/listing/ListingReviews'
import { BookingPanel } from '@/components/listing/BookingPanel'
import { toast } from 'sonner'

interface Props {
  mode: 'student' | 'admin'
  id?: string
}

export default function ListingDetailCommon({ mode, id }: Props) {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()

  const listingId = id || (params.id as string) || searchParams.get('id') || ''

  const [listing, setListing] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isSaved, setIsSaved] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [bookingLoading, setBookingLoading] = useState(false)
  const [hasActiveBooking, setHasActiveBooking] = useState(false)
  const [bookingStatus, setBookingStatus] = useState<string | null>(null)
  const [myReview, setMyReview] = useState<any>(null)

  // Admin Action State
  const [actionLoading, setActionLoading] = useState(false)
  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean
    type: 'success' | 'danger' | 'warning' | 'info'
    title: string
    message: string
    confirmText: string
    requiresInput: boolean
    action: 'approve' | 'reject' | null
  }>({
    isOpen: false,
    type: 'info',
    title: '',
    message: '',
    confirmText: 'Confirm',
    requiresInput: false,
    action: null,
  })

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true)
        let data: any
        if (mode === 'admin') {
          data = await adminApi.getListingById(listingId)
        } else {
          data = await roomsApi.getListingById(listingId)
        }

        if (data && data.listing) {
          const l = data.listing
          setIsSaved(!!data.isBookmarked)
          const reviews = data.reviews || []
          const coords = l.location?.coordinates
          const lat = Array.isArray(coords) ? coords[1] : l.location?.lat
          const lng = Array.isArray(coords) ? coords[0] : l.location?.lng

          const mapped = {
            ...l,
            id: l._id,
            price: l.rent || l.price,
            deposit: l.deposit || 0,
            rating: l.avgRating || 0,
            reviewCount: reviews.length || l.totalReviews || 0,
            images: l.photos?.length
              ? l.photos
              : l.images?.length
                ? l.images
                : [
                    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=2340',
                  ],
            reviews: reviews.map((r: any) => ({
              author: r.student?.name || 'Anonymous',
              initials: (r.student?.name || 'A').charAt(0),
              institution: 'Student',
              date: new Date(r.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                year: 'numeric',
              }),
              content: r.reviewText,
            })),
            lat,
            lng,
            area: l.totalBeds
              ? `${l.availableBeds ?? l.totalBeds} / ${l.totalBeds} Beds`
              : l.totalArea
                ? `${l.totalArea} sqft`
                : 'Spacious',
          }
          setListing(mapped)

          // Handle student's own review (approved or not)
          if (data.myReview) {
            setMyReview({
              _id: data.myReview._id,
              author: data.myReview.student?.name || 'You',
              initials: (data.myReview.student?.name || 'Y').charAt(0),
              institution: 'Student',
              date: new Date(data.myReview.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                year: 'numeric',
              }),
              content: data.myReview.reviewText,
              rating: data.myReview.overallRating,
              isApproved: data.myReview.isApproved,
            })
          } else {
            setMyReview(null)
          }

          // Check if user has an active booking for this listing
          if (mode === 'student' && data.hasActiveBooking) {
            setHasActiveBooking(true)
            setBookingStatus(data.bookingStatus || 'pending')
          }
        }
      } catch (error) {
        console.error('Failed to fetch listing:', error)
        toast.error('Failed to load listing details')
      } finally {
        setLoading(false)
      }
    }

    if (listingId) fetchListing()
  }, [listingId, mode])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleToggleSave = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (mode === 'admin') return
    if (!isAuthenticated) {
      toast.error('Please login to save listings')
      return
    }
    try {
      setIsSaved((prev) => !prev)
      if (isSaved) {
        await userApi.unsaveRoom(listingId)
      } else {
        await userApi.saveRoom(listingId)
      }
    } catch (error) {
      console.error('Failed to toggle save:', error)
      setIsSaved((prev) => !prev)
    }
  }

  const handleApproveClick = () => {
    setModalConfig({
      isOpen: true,
      type: 'success',
      title: 'Approve Listing',
      message: `Are you sure you want to approve "${listing?.title}"? It will become visible to students.`,
      confirmText: 'Approve Listing',
      requiresInput: false,
      action: 'approve',
    })
  }

  const handleRejectClick = () => {
    setModalConfig({
      isOpen: true,
      type: 'danger',
      title: 'Reject Listing',
      message: `Please provide a reason for rejecting "${listing?.title}".`,
      confirmText: 'Reject Listing',
      requiresInput: true,
      action: 'reject',
    })
  }

  const handleConfirmAction = async (inputValue?: string) => {
    if (!listing) return
    try {
      setActionLoading(true)
      if (modalConfig.action === 'approve') {
        await adminApi.approveListing(listing._id)
        toast.success('Listing Approved')
        setListing({ ...listing, status: 'approved' })
      } else if (modalConfig.action === 'reject') {
        await adminApi.rejectListing(
          listing._id,
          inputValue || 'No reason provided',
        )
        toast.success('Listing Rejected')
        setListing({ ...listing, status: 'rejected' })
      }
    } catch (error: any) {
      toast.error('Action failed: ' + (error.message || 'Unknown error'))
    } finally {
      setActionLoading(false)
      setModalConfig({ ...modalConfig, isOpen: false })
    }
  }

  const handleBookingRequest = () => {
    if (!isAuthenticated) {
      toast.error('Please login to book', {
        description: 'You need to be logged in to make a booking request.',
      })
      return
    }
    if (user?.role !== 'student') {
      toast.error('Student accounts only', {
        description: 'Only student accounts can make booking requests.',
      })
      return
    }
    if (hasActiveBooking) {
      toast.info('You already have a booking for this property', {
        description: 'Check your bookings page for details.',
      })
      return
    }
    setIsBookingModalOpen(true)
  }

  const handleConfirmBooking = async (
    moveInDate: string,
    durationMonths: number,
    message: string,
  ) => {
    try {
      setBookingLoading(true)
      const response = await bookingsApi.createBooking(
        listing._id || listing.id,
        moveInDate,
        durationMonths,
        message,
      )

      toast.success('Booking request sent!', {
        description: "The owner will be notified. You'll hear back soon.",
      })

      setIsBookingModalOpen(false)

      // Redirect to bookings page after a short delay
      setTimeout(() => {
        router.push('/student/bookings')
      }, 1500)
    } catch (error: any) {
      console.error('Booking failed:', error)
      toast.error('Booking request failed', {
        description:
          error?.response?.data?.error ||
          error.message ||
          'Please try again later.',
      })
    } finally {
      setBookingLoading(false)
    }
  }

  if (loading) return <RoomDetailSkeleton />
  if (!listing)
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold mb-4'>Listing Not Found</h1>
          <button
            onClick={() => router.back()}
            className='text-primary font-bold'
          >
            Go Back
          </button>
        </div>
      </div>
    )

  const subLabel = `${listing.roomType || listing.type || 'Room'} · ${listing.genderPref || listing.genderPreference || 'Any'} · ${listing.area}`

  return (
    <div className='bg-white min-h-full pb-24 md:pb-0'>
      <ListingHeader
        mode={mode}
        isScrolled={isScrolled}
        isSaved={isSaved}
        onToggleSave={handleToggleSave}
        listingStatus={listing.status}
        listingTitle={listing.title}
      />

      <main className='md:pt-28 max-w-7xl mx-auto px-0 md:px-10'>
        <ListingHeroSection
          images={listing.images}
          mode={mode}
          isSaved={isSaved}
          onToggleSave={handleToggleSave}
          listingStatus={listing.status}
          listingTitle={listing.title}
        />

        <div className='bg-white rounded-t-3xl -mt-6 md:mt-0 relative z-20 px-6 pt-6 md:px-0 md:pt-0 flex flex-col md:flex-row gap-0 md:gap-20'>
          <div className='md:w-[60%] flex-1'>
            <ListingInfo
              title={listing.title}
              address={listing.address}
              location={listing.location}
              subLabel={subLabel}
              rating={listing.rating}
              reviewCount={listing.reviewCount}
              owner={listing.owner}
              description={listing.description}
            />

            <ListingAmenities amenities={listing.amenities} />

            <ListingLocation lat={listing.lat} lng={listing.lng} />

            <ListingReviews
              reviews={listing.reviews}
              myReview={myReview}
              listingId={listing._id || listing.id}
              totalReviewCount={listing.totalReviews || listing.reviewCount}
            />
          </div>

          <BookingPanel
            mode={mode}
            price={listing.price}
            hasActiveBooking={hasActiveBooking}
            bookingStatus={bookingStatus}
            onBookingRequest={handleBookingRequest}
            onApprove={handleApproveClick}
            onReject={handleRejectClick}
            actionLoading={actionLoading}
          />
        </div>
      </main>

      <ConfirmationModal
        {...modalConfig}
        onConfirm={handleConfirmAction}
        onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
      />
      <BookingRequestModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        listing={listing}
        onConfirm={handleConfirmBooking}
        loading={bookingLoading}
      />
    </div>
  )
}
