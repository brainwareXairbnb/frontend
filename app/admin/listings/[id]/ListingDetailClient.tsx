'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { adminApi } from '@/lib/api'
import { toast } from 'sonner'
import {
  ChevronLeft,
  MapPin,
  Users,
  Home,
  Bed,
  Bath,
  Grid3x3,
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  CheckCircle2,
  X,
  AlertCircle,
  Loader2,
  Wifi,
  Utensils,
  Shirt,
  Droplet,
  Zap,
  Wind,
  Tv,
  Car,
  Lock,
  Camera,
  TreeDeciduous,
  Dumbbell,
  Building2,
  Grip,
  Check,
  Medal,
} from 'lucide-react'
import { format } from 'date-fns'
import { ConfirmationModal } from '@/components/ConfirmationModal'
import { Listing } from '@/lib/types'

export default function ListingDetailClient() {
  const router = useRouter()
  const params = useParams()
  const listingId = params.id as string

  const [listing, setListing] = useState<Listing | null>(null)
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)

  // Modal State
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
    fetchListing()
  }, [listingId])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const fetchListing = async () => {
    try {
      setLoading(true)
      const response: any = await adminApi.getListingById(listingId)
      setListing(response.listing)
    } catch (error: any) {
      toast.error('Failed to load listing', { description: error.message })
      router.push('/admin/listings')
    } finally {
      setLoading(false)
    }
  }

  const handleApproveClick = () => {
    setModalConfig({
      isOpen: true,
      type: 'success',
      title: 'Approve Listing',
      message: `Are you sure you want to approve "${listing?.title}"? This will make it visible to all students.`,
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
      message: `Please provide a reason for rejecting "${listing?.title}". This message will be sent to the owner.`,
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
        toast.success('Listing Approved', {
          description: 'Property is now visible to students',
        })
        setListing({ ...listing, status: 'approved' })
      } else if (modalConfig.action === 'reject') {
        await adminApi.rejectListing(
          listing._id,
          inputValue || 'No reason provided'
        )
        toast.warning('Listing Rejected', {
          description: 'Owner has been notified',
        })
        setListing({ ...listing, status: 'rejected' })
      }

      setModalConfig((prev) => ({ ...prev, isOpen: false }))
    } catch (error: any) {
      toast.error('Action Failed', {
        description: error.message || 'Could not process request',
      })
    } finally {
      setActionLoading(false)
    }
  }

  const getStatusColor = (status?: string) => {
    switch (status?.toLowerCase()) {
      case 'approved':
        return 'bg-emerald-50 text-emerald-600 border border-emerald-200'
      case 'under_review':
      case 'pending':
        return 'bg-orange-50 text-orange-600 border border-orange-200'
      case 'rejected':
        return 'bg-red-50 text-red-600 border border-red-200'
      default:
        return 'bg-blue-50 text-blue-600 border border-blue-200'
    }
  }

  const getStatusIcon = (status?: string) => {
    switch (status?.toLowerCase()) {
      case 'approved':
        return <CheckCircle2 className='w-4 h-4' />
      case 'under_review':
      case 'pending':
        return <AlertCircle className='w-4 h-4' />
      case 'rejected':
        return <X className='w-4 h-4' />
      default:
        return <AlertCircle className='w-4 h-4' />
    }
  }

  const getStatusLabel = (status?: string) => {
    switch (status?.toLowerCase()) {
      case 'under_review':
        return 'Pending Review'
      case 'approved':
        return 'Approved'
      case 'rejected':
        return 'Rejected'
      default:
        return status || 'Unknown'
    }
  }

  // Amenities icon mapping
  const amenityIcons: { [key: string]: any } = {
    wifi: Wifi,
    'air conditioning': Wind,
    heating: Zap,
    kitchen: Utensils,
    washer: Shirt,
    dryer: Wind,
    tv: Tv,
    parking: Car,
    gym: Dumbbell,
    pool: Droplet,
    'hot water': Droplet,
    security: Lock,
    cctv: Camera,
    garden: TreeDeciduous,
    balcony: Building2,
  }

  const getAmenityIcon = (amenity: string) => {
    const key = amenity.toLowerCase()
    const Icon = amenityIcons[key] || Check
    return <Icon className='w-[26px] h-[26px] text-on-surface-variant/80' strokeWidth={2} />
  }

  if (loading) {
    return (
      <div className='min-h-screen bg-white flex items-center justify-center'>
        <div className='flex flex-col items-center gap-4'>
          <div className='w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin'></div>
          <p className='text-[10px] font-black uppercase tracking-widest text-on-surface-variant'>
            Loading Listing Details...
          </p>
        </div>
      </div>
    )
  }

  if (!listing) {
    return null
  }

  const roomSubLabel = `${listing.roomType} · ${(listing as any).genderPreference || 'Any'} · ${(listing as any).totalArea ? `${(listing as any).totalArea} sqft` : 'N/A'}`

  return (
    <div className='bg-white min-h-screen pb-24 md:pb-0'>
      <ConfirmationModal
        isOpen={modalConfig.isOpen}
        onClose={() => setModalConfig((prev) => ({ ...prev, isOpen: false }))}
        onConfirm={handleConfirmAction}
        title={modalConfig.title}
        message={modalConfig.message}
        type={modalConfig.type}
        requiresInput={modalConfig.requiresInput}
        confirmText={modalConfig.confirmText}
        inputPlaceholder='Reason for rejection...'
        inputLabel='Rejection Reason'
      />

      {/* MOBILE HERO CAROUSEL */}
      <div className='md:hidden relative w-full h-[60vh]'>
        {/* Back Button - Positioned absolutely on image */}
        <div className='absolute top-4 left-0 right-0 z-10 px-4 flex justify-between items-center'>
          <button
            onClick={() => router.push('/admin/listings')}
            className='w-8 h-8 rounded-full flex items-center justify-center bg-white/90 shadow-sm'
          >
            <ChevronLeft className='w-5 h-5 text-black' strokeWidth={2.5} />
          </button>
          <div
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${getStatusColor(
              listing.status
            )}`}
          >
            {getStatusIcon(listing.status)}
            {getStatusLabel(listing.status)}
          </div>
        </div>
        <div
          className='flex w-full h-full overflow-x-auto snap-x snap-mandatory scrollbar-hide'
          onScroll={(e) => {
            const scrollLeft = e.currentTarget.scrollLeft
            const width = e.currentTarget.offsetWidth
            setCurrentImageIndex(Math.round(scrollLeft / width))
          }}
        >
          {listing.photos && listing.photos.length > 0 ? (
            listing.photos.map((img: string, idx: number) => (
              <img
                key={idx}
                src={img}
                alt={listing.title}
                className='w-full h-full object-cover shrink-0 snap-center'
              />
            ))
          ) : (
            <div className='w-full h-full flex flex-col items-center justify-center bg-surface-container-low shrink-0 snap-center'>
              <Home className='w-16 h-16 text-on-surface-variant/40' />
              <span className='text-sm text-on-surface-variant mt-2'>
                No images available
              </span>
            </div>
          )}
        </div>

        {listing.photos && listing.photos.length > 0 && (
          <div className='absolute bottom-10 right-4 bg-black/60 text-white text-xs px-2.5 py-1 rounded-md font-semibold tracking-wide'>
            {currentImageIndex + 1}/{listing.photos.length}
          </div>
        )}
      </div>

      {/* MAIN CONTENT */}
      <main className='max-w-7xl mx-auto px-0 md:px-10 md:py-6'>
        {/* DESKTOP TITLE & IMAGE GALLERY */}
        <div className='hidden md:block mb-8'>
          <div className='flex justify-between items-end mb-6'>
            <h1 className='text-[26px] font-semibold text-on-surface'>
              {listing.title}
            </h1>
            <div className='flex gap-4 items-center'>
              <div
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${getStatusColor(
                  listing.status
                )}`}
              >
                {getStatusIcon(listing.status)}
                {getStatusLabel(listing.status)}
              </div>
              <button
                onClick={() => router.push('/admin/listings')}
                className='flex items-center gap-2 text-sm font-medium'
              >
                <ChevronLeft className='w-[18px] h-[18px]' strokeWidth={2} />{' '}
                Back
              </button>
            </div>
          </div>

          <div className='grid grid-cols-4 grid-rows-2 gap-2 h-[60vh] min-h-[400px] rounded-2xl overflow-hidden relative'>
            {listing.photos && listing.photos.length > 0 ? (
              <>
                <div className='col-span-2 row-span-2 relative group cursor-pointer'>
                  <img
                    src={listing.photos[0]}
                    className='w-full h-full object-cover group-hover:brightness-90 transition-all duration-300'
                    alt='Listing primary'
                  />
                </div>
                <div className='relative group cursor-pointer'>
                  <img
                    src={listing.photos[1] || listing.photos[0]}
                    className='w-full h-full object-cover group-hover:brightness-90 transition-all duration-300'
                    alt='Listing'
                  />
                </div>
                <div className='relative group cursor-pointer'>
                  <img
                    src={listing.photos[2] || listing.photos[0]}
                    className='w-full h-full object-cover group-hover:brightness-90 transition-all duration-300'
                    alt='Listing'
                  />
                </div>
                <div className='relative group cursor-pointer'>
                  <img
                    src={listing.photos[3] || listing.photos[0]}
                    className='w-full h-full object-cover group-hover:brightness-90 transition-all duration-300'
                    alt='Listing'
                  />
                </div>
                <div className='relative group cursor-pointer'>
                  <img
                    src={listing.photos[4] || listing.photos[1] || listing.photos[0]}
                    className='w-full h-full object-cover group-hover:brightness-90 transition-all duration-300'
                    alt='Listing'
                  />
                </div>
                <button className='absolute bottom-6 right-6 bg-white px-4 py-1.5 rounded-lg border border-black flex items-center gap-2 text-sm font-semibold shadow-sm hover:bg-gray-50'>
                  <Grip className='w-[18px] h-[18px]' strokeWidth={2} />
                  Show all photos
                </button>
              </>
            ) : (
              <div className='col-span-4 row-span-2 flex flex-col items-center justify-center bg-surface-container-low text-on-surface-variant'>
                <Home className='w-16 h-16 mb-2 opacity-20' />
                <p className='text-sm'>No images available</p>
              </div>
            )}
          </div>
        </div>

        {/* CONTAINER FOR CONTENT */}
        <div className='bg-white rounded-t-3xl -mt-6 md:mt-0 relative z-20 px-6 pt-6 md:px-0 md:pt-0 flex flex-col md:flex-row gap-0 md:gap-20'>
          {/* LEFT CONTENT COLUMN */}
          <div className='md:w-[60%] flex-1'>
            {/* Mobile Title */}
            <div className='md:hidden mb-6'>
              <h1 className='text-[28px] font-semibold text-on-surface leading-tight mb-1'>
                {listing.title}
              </h1>
              <h2 className='text-base font-semibold text-on-surface-variant mb-2'>
                {listing.address.city}, {listing.address.state}
              </h2>
              <p className='text-[15px] text-on-surface-variant'>{roomSubLabel}</p>
            </div>

            {/* Desktop Sublabel */}
            <div className='hidden md:block mb-8 pb-8 border-b border-outline-variant/30 text-xl font-semibold'>
              <h2 className='mb-2'>
                {listing.address.city} listed by {listing.owner?.name}
              </h2>
              <p className='text-base font-normal text-on-surface-variant'>
                {roomSubLabel}
              </p>
            </div>

            {/* Owner Section */}
            <div className='flex items-center gap-4 border-b md:border-none border-outline-variant/20 pb-6 md:pb-0 mb-6 md:mb-8'>
              <div className='relative'>
                <div className='w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary/10 flex items-center justify-center'>
                  <User className='w-6 h-6 md:w-7 md:h-7 text-primary' />
                </div>
                <div className='absolute -bottom-1 -right-1 bg-[#E51D53] text-white rounded-full w-5 h-5 flex items-center justify-center border-2 border-white'>
                  <Medal className='w-[10px] h-[10px] font-bold' strokeWidth={3} />
                </div>
              </div>
              <div>
                <h3 className='font-semibold text-base md:text-lg'>
                  Listed by {listing.owner?.name}
                </h3>
                <p className='text-sm text-on-surface-variant font-medium'>
                  Property Owner
                </p>
              </div>
            </div>

            {/* Desktop Divider */}
            <div className='hidden md:block w-full h-[1px] bg-outline-variant/30 mb-8' />

            {/* Property Details */}
            <div className='space-y-6 pb-8 border-b border-outline-variant/20 mb-8'>
              <h3 className='text-[22px] font-semibold'>Property details</h3>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {listing.bedrooms && (
                  <div className='flex gap-3 items-start'>
                    <Bed className='w-7 h-7 mt-0.5 text-on-surface-variant/80' strokeWidth={1.5} />
                    <div>
                      <h4 className='font-semibold text-base'>{listing.bedrooms} Bedrooms</h4>
                      <p className='text-sm text-on-surface-variant mt-0.5'>
                        Comfortable sleeping spaces
                      </p>
                    </div>
                  </div>
                )}
                {listing.bathrooms && (
                  <div className='flex gap-3 items-start'>
                    <Bath className='w-7 h-7 mt-0.5 text-on-surface-variant/80' strokeWidth={1.5} />
                    <div>
                      <h4 className='font-semibold text-base'>{listing.bathrooms} Bathrooms</h4>
                      <p className='text-sm text-on-surface-variant mt-0.5'>
                        Modern facilities
                      </p>
                    </div>
                  </div>
                )}
                {listing.totalArea && (
                  <div className='flex gap-3 items-start'>
                    <Grid3x3 className='w-7 h-7 mt-0.5 text-on-surface-variant/80' strokeWidth={1.5} />
                    <div>
                      <h4 className='font-semibold text-base'>{listing.totalArea} sqft</h4>
                      <p className='text-sm text-on-surface-variant mt-0.5'>
                        Spacious living area
                      </p>
                    </div>
                  </div>
                )}
                <div className='flex gap-3 items-start'>
                  <Users className='w-7 h-7 mt-0.5 text-on-surface-variant/80' strokeWidth={1.5} />
                  <div>
                    <h4 className='font-semibold text-base capitalize'>
                      {listing.genderPreference || 'Any Gender'}
                    </h4>
                    <p className='text-sm text-on-surface-variant mt-0.5'>
                      Gender preference
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className='pb-8 border-b border-outline-variant/20 mb-8'>
              <h3 className='text-[22px] font-semibold mb-4'>Description</h3>
              <p className='text-[15px] md:text-base text-on-surface leading-relaxed whitespace-pre-line'>
                {listing.description || 'No description provided.'}
              </p>
            </div>

            {/* Amenities */}
            {listing.amenities && listing.amenities.length > 0 && (
              <div className='pb-8 border-b border-outline-variant/20 mb-8'>
                <h3 className='text-[22px] font-semibold mb-6'>
                  What this place offers
                </h3>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-2'>
                  {listing.amenities.map((amenity, idx) => (
                    <div key={idx} className='flex gap-4 items-center'>
                      {getAmenityIcon(amenity)}
                      <span className='text-[15px] md:text-base font-normal capitalize'>
                        {amenity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Location */}
            <div className='pb-8 border-b border-outline-variant/20 mb-8'>
              <h3 className='text-[22px] font-semibold mb-2'>Where you'll find it</h3>
              <p className='text-[15px] text-on-surface-variant mb-6'>
                <MapPin className='w-4 h-4 inline mr-1' />
                {listing.address.street}, {listing.address.city}
                {listing.address.state && `, ${listing.address.state}`}{' '}
                {listing.address.postalCode}
              </p>

              {/* Google Map */}
              <div className='w-full h-[250px] md:h-[400px] bg-surface-container rounded-2xl relative overflow-hidden mb-4'>
                {listing.location?.coordinates && listing.location.coordinates.length === 2 ? (
                  <iframe
                    width='100%'
                    height='100%'
                    style={{ border: 0 }}
                    loading='lazy'
                    allowFullScreen
                    referrerPolicy='no-referrer-when-downgrade'
                    src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8'}&q=${listing.location.coordinates[1]},${listing.location.coordinates[0]}&zoom=15`}
                  ></iframe>
                ) : (
                  // Fallback: Show static map with city search
                  <div className='relative w-full h-full'>
                    <iframe
                      width='100%'
                      height='100%'
                      style={{ border: 0 }}
                      loading='lazy'
                      allowFullScreen
                      referrerPolicy='no-referrer-when-downgrade'
                      src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8'}&q=${encodeURIComponent(`${listing.address.street}, ${listing.address.city}, ${listing.address.state}`)}&zoom=14`}
                    ></iframe>
                  </div>
                )}
              </div>

              {listing.location?.coordinates && listing.location.coordinates.length === 2 && (
                <div className='bg-surface-container-lowest rounded-lg p-3 text-xs text-on-surface-variant'>
                  <strong className='text-on-surface'>Coordinates:</strong>{' '}
                  {listing.location.coordinates[1].toFixed(6)}, {listing.location.coordinates[0].toFixed(6)}
                </div>
              )}
            </div>

            {/* Rejection Reason */}
            {listing.status === 'rejected' && listing.rejectionReason && (
              <div className='pb-8 mb-8'>
                <div className='bg-red-50 rounded-2xl p-6 border border-red-200'>
                  <div className='flex items-start gap-3'>
                    <div className='p-2 bg-red-100 rounded-lg'>
                      <AlertCircle className='w-5 h-5 text-red-600' />
                    </div>
                    <div>
                      <h3 className='font-semibold text-red-900 mb-1'>
                        Rejection Reason
                      </h3>
                      <p className='text-sm text-red-700'>
                        {listing.rejectionReason}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Metadata */}
            <div className='pb-8 border-b md:border-none border-outline-variant/20 mb-8 md:mb-16'>
              <h3 className='text-[22px] font-semibold mb-4'>Listing info</h3>
              <div className='space-y-2 text-sm text-on-surface-variant'>
                <div className='flex items-center gap-2'>
                  <Calendar className='w-4 h-4' />
                  <span>
                    Listed on {format(new Date(listing.createdAt), 'MMM dd, yyyy')}
                  </span>
                </div>
                <div className='flex items-center gap-2'>
                  <Clock className='w-4 h-4' />
                  <span>
                    Last updated {format(new Date(listing.updatedAt), 'MMM dd, yyyy')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: DESKTOP STICKY ACTION CARD */}
          <div className='hidden md:block w-[35%] relative'>
            <div className='sticky top-28 bg-white border border-outline-variant/30 rounded-2xl p-6 shadow-[0_6px_16px_rgba(0,0,0,0.12)]'>
              <div className='flex items-baseline gap-1 mb-6'>
                <span className='text-2xl font-semibold'>
                  ₹{listing.rent?.toLocaleString('en-IN')}
                </span>
                <span className='text-base text-on-surface-variant'>/ month</span>
              </div>

              {listing.deposit && (
                <div className='mb-6 pb-6 border-b border-outline-variant/30'>
                  <div className='flex justify-between text-sm'>
                    <span className='text-on-surface-variant'>Security Deposit</span>
                    <span className='font-semibold'>
                      ₹{listing.deposit?.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              )}

              {/* Owner Contact */}
              <div className='mb-6 pb-6 border-b border-outline-variant/30'>
                <h4 className='font-semibold text-sm mb-3'>Owner Contact</h4>
                <div className='space-y-2 text-sm'>
                  <div className='flex items-center gap-2 text-on-surface-variant'>
                    <Mail className='w-4 h-4' />
                    <span className='break-all'>{listing.owner?.email}</span>
                  </div>
                  {listing.owner?.phone && (
                    <div className='flex items-center gap-2 text-on-surface-variant'>
                      <Phone className='w-4 h-4' />
                      <span>{listing.owner.phone}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className='space-y-3'>
                {listing.status === 'under_review' ? (
                  <>
                    <button
                      onClick={handleApproveClick}
                      disabled={actionLoading}
                      className='w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 rounded-lg font-bold text-[15px] transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                      {actionLoading ? (
                        <>
                          <Loader2 className='w-5 h-5 animate-spin' />
                          Processing...
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className='w-5 h-5' />
                          Approve Listing
                        </>
                      )}
                    </button>

                    <button
                      onClick={handleRejectClick}
                      disabled={actionLoading}
                      className='w-full bg-white hover:bg-red-50 text-red-600 border-2 border-red-200 py-3.5 rounded-lg font-bold text-[15px] transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                      <X className='w-5 h-5' />
                      Reject Listing
                    </button>
                  </>
                ) : (
                  <div
                    className={`w-full px-4 py-3.5 rounded-lg font-semibold text-center text-sm ${getStatusColor(
                      listing.status
                    )}`}
                  >
                    {getStatusLabel(listing.status)}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* MOBILE BOTTOM ACTION BAR */}
      {listing.status === 'under_review' && (
        <div className='md:hidden fixed bottom-0 w-full bg-white border-t border-outline-variant/20 px-6 py-4 flex gap-3 z-40'>
          <button
            onClick={handleRejectClick}
            disabled={actionLoading}
            className='flex-1 bg-white text-red-600 border-2 border-red-200 px-6 py-3 rounded-lg font-bold text-[15px] disabled:opacity-50'
          >
            Reject
          </button>
          <button
            onClick={handleApproveClick}
            disabled={actionLoading}
            className='flex-1 bg-emerald-600 text-white px-6 py-3 rounded-lg font-bold text-[15px] disabled:opacity-50'
          >
            {actionLoading ? 'Processing...' : 'Approve'}
          </button>
        </div>
      )}
    </div>
  )
}
