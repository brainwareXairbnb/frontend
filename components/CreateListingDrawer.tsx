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
import { Button } from '@/components/ui/button'
import {
  X,
  Home,
  MapPin,
  IndianRupee,
  ImagePlus,
  CheckCircle,
  Loader2,
  Users,
  Navigation,
  Edit3,
  ToggleLeft,
  ToggleRight,
  Power,
} from 'lucide-react'
import { roomsApi } from '@/lib/api'
import { toast } from 'sonner'
import useIsMobile from '@/lib/useIsMobile'
import { Listing, CreateListingDrawerProps } from '@/lib/types'
import { PhotoUpload } from '@/components/PhotoUpload'

export default function CreateListingDrawer({
  open,
  onOpenChange,
  onSuccess,
  editingListing,
  viewMode = false,
}: CreateListingDrawerProps) {
  const [loading, setLoading] = useState(false)
  const [showCoordinateInput, setShowCoordinateInput] = useState(false)
  const [photos, setPhotos] = useState<string[]>([])
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
      coordinates: [88.4337, 22.9716], // Default: Kalyani, West Bengal [longitude, latitude]
    },
  })

  const amenitiesList = [
    'wifi',
    'ac',
    'Attached Bath',
    'Laundry',
    'Parking',
    'Security',
    'CCTV',
  ]

  const isMobile = useIsMobile()

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
            ? editingListing.location.coordinates
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
      setLoading(true)

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
        toast.success('Listing saved as draft!')
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
      setLoading(false)
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
      setLoading(true)

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
      setLoading(false)
    }
  }

  const toggleAmenity = (amenity: string) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }))
  }

  return (
    <Drawer
      open={open}
      onOpenChange={onOpenChange}
      direction={isMobile ? 'bottom' : 'right'}
    >
      <DrawerContent className='h-[90vh] md:h-screen w-full md:w-[600px] lg:w-[700px] md:inset-y-0 md:right-0 md:left-auto bottom-0 md:top-0 rounded-t-3xl md:rounded-none mt-0 overflow-hidden md:border-l border-outline-variant/10 flex flex-col'>
        {/* Header */}
        <DrawerHeader className='border-b border-outline-variant/10 shrink-0 px-6 py-5 text-left'>
          <div className='flex items-center justify-between'>
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
        </DrawerHeader>

        {/* Scrollable Form Content */}
        <div className='flex-1 overflow-y-auto px-6 py-6'>
          <form className='space-y-8'>
            {/* Basic Information */}
            <section className='space-y-4'>
              <div className='flex items-center gap-3 mb-4'>
                <div className='w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center'>
                  <Home className='w-4 h-4 text-primary' />
                </div>
                <h3 className='text-base font-bold text-on-surface'>
                  Basic Information
                </h3>
              </div>

              <div className='space-y-2'>
                <label className='text-xs font-semibold text-on-surface-variant uppercase tracking-wider'>
                  Property Title *
                </label>
                <input
                  required
                  disabled={viewMode}
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className='w-full h-12 bg-surface-container border border-outline-variant/20 rounded px-4 text-sm text-on-surface focus:border-primary focus:bg-white outline-none transition-all placeholder:text-on-surface-variant/40 disabled:opacity-60 disabled:cursor-not-allowed'
                  placeholder='e.g., Spacious Room Near Campus'
                  type='text'
                />
              </div>

              <div className='space-y-2'>
                <label className='text-xs font-semibold text-on-surface-variant uppercase tracking-wider'>
                  Description
                </label>
                <textarea
                  value={formData.description}
                  disabled={viewMode}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className='w-full bg-surface-container border border-outline-variant/20 rounded p-4 text-sm text-on-surface focus:border-primary focus:bg-white outline-none transition-all placeholder:text-on-surface-variant/40 resize-none disabled:opacity-60 disabled:cursor-not-allowed'
                  placeholder='Describe your property...'
                  rows={4}
                />
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <label className='text-xs font-semibold text-on-surface-variant uppercase tracking-wider'>
                    Room Type
                  </label>
                  <select
                    value={formData.roomType}
                    disabled={viewMode}
                    onChange={(e) =>
                      setFormData({ ...formData, roomType: e.target.value })
                    }
                    className='w-full h-12 bg-surface-container border border-outline-variant/20 rounded px-4 text-sm text-on-surface focus:border-primary focus:bg-white outline-none cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed'
                  >
                    <option value='single'>Single Room</option>
                    <option value='shared'>Shared Room</option>
                    <option value='pg'>PG/Hostel</option>
                    <option value='flat'>Flat/Apartment</option>
                    <option value='studio'>Studio</option>
                  </select>
                </div>

                <div className='space-y-2'>
                  <label className='text-xs font-semibold text-on-surface-variant uppercase tracking-wider'>
                    Preferred Gender
                  </label>
                  <select
                    value={formData.genderPref}
                    disabled={viewMode}
                    onChange={(e) =>
                      setFormData({ ...formData, genderPref: e.target.value })
                    }
                    className='w-full h-12 bg-surface-container border border-outline-variant/20 rounded px-4 text-sm text-on-surface focus:border-primary focus:bg-white outline-none cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed'
                  >
                    <option value='any'>Any</option>
                    <option value='boys'>Boys Only</option>
                    <option value='girls'>Girls Only</option>
                    <option value='coed'>Co-ed</option>
                  </select>
                </div>
              </div>

              <div className='space-y-2'>
                <label className='text-xs font-semibold text-on-surface-variant uppercase tracking-wider'>
                  Total Beds / Capacity *
                </label>
                <div className='relative'>
                  <Users className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant' />
                  <input
                    required
                    value={formData.totalBeds}
                    disabled={viewMode}
                    onChange={(e) =>
                      setFormData({ ...formData, totalBeds: e.target.value })
                    }
                    className='w-full h-12 bg-surface-container border border-outline-variant/20 rounded pl-12 pr-4 text-sm text-on-surface focus:border-primary focus:bg-white outline-none transition-all disabled:opacity-60 disabled:cursor-not-allowed'
                    placeholder='Number of beds available'
                    type='number'
                    min='1'
                    max='20'
                  />
                </div>
                <p className='text-xs text-on-surface-variant'>
                  Total number of beds in this property (decreases with
                  bookings)
                </p>
              </div>
            </section>

            {/* Location */}
            <section className='space-y-4'>
              <div className='flex items-center gap-3 mb-4'>
                <div className='w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center'>
                  <MapPin className='w-4 h-4 text-blue-600' />
                </div>
                <h3 className='text-base font-bold text-on-surface'>
                  Location
                </h3>
              </div>

              {/* Google Maps Location Picker */}
              <div className='space-y-2'>
                <label className='text-xs font-semibold text-on-surface-variant uppercase tracking-wider'>
                  Pick Location on Map
                </label>
                <div className='relative w-full h-64 bg-surface-container border border-outline-variant/20 rounded overflow-hidden group'>
                  {/* Static Map Image - Click to open interactive */}
                  <a
                    href={`https://www.google.com/maps?q=${formData.location.coordinates[1]},${formData.location.coordinates[0]}`}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='block w-full h-full relative'
                  >
                    <img
                      key={`${formData.location.coordinates[0]}-${formData.location.coordinates[1]}`}
                      src={`https://maps.googleapis.com/maps/api/staticmap?center=${formData.location.coordinates[1]},${formData.location.coordinates[0]}&zoom=15&size=600x400&markers=color:red%7C${formData.location.coordinates[1]},${formData.location.coordinates[0]}&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8`}
                      alt='Location map'
                      className='w-full h-full object-cover'
                      onError={(e) => {
                        // Fallback to iframe if static map fails
                        e.currentTarget.style.display = 'none'
                        const iframe = document.createElement('iframe')
                        iframe.src = `https://maps.google.com/maps?q=${formData.location.coordinates[1]},${formData.location.coordinates[0]}&z=15&output=embed`
                        iframe.className = 'w-full h-full border-0'
                        e.currentTarget.parentElement?.appendChild(iframe)
                      }}
                    />
                    <div className='absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold text-on-surface shadow-sm'>
                      📍 Click to open in Google Maps
                    </div>
                  </a>

                  <button
                    type='button'
                    onClick={(e) => {
                      e.preventDefault()
                      if (navigator.geolocation) {
                        toast.loading('Getting your location...')
                        navigator.geolocation.getCurrentPosition(
                          (position) => {
                            setFormData({
                              ...formData,
                              location: {
                                coordinates: [
                                  position.coords.longitude,
                                  position.coords.latitude,
                                ],
                              },
                            })
                            toast.dismiss()
                            toast.success('Location updated successfully!', {
                              description: `${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`,
                            })
                          },
                          (error) => {
                            toast.dismiss()
                            if (error.code === 1) {
                              toast.error('Location access denied', {
                                description:
                                  'Click "Edit Coordinates" below to enter manually',
                              })
                            } else {
                              toast.error('Could not get your location', {
                                description:
                                  'Please enable location access or enter manually',
                              })
                            }
                          },
                          {
                            enableHighAccuracy: true,
                            timeout: 10000,
                            maximumAge: 0,
                          },
                        )
                      } else {
                        toast.error('Geolocation not supported by your browser')
                      }
                    }}
                    className='absolute bottom-3 right-3 bg-white hover:bg-gray-50 text-on-surface px-3 py-2 rounded-lg text-xs font-bold shadow-lg border border-outline-variant/20 flex items-center gap-2 transition-all active:scale-95 z-10'
                  >
                    <Navigation className='w-4 h-4' />
                    Use My Location
                  </button>
                  <button
                    type='button'
                    onClick={(e) => {
                      e.preventDefault()
                      setFormData({
                        ...formData,
                        location: {
                          coordinates: [88.4337, 22.9716], // Reset to Kalyani
                        },
                      })
                      toast.success('Location reset to Kalyani, West Bengal')
                    }}
                    className='absolute bottom-3 left-3 bg-white hover:bg-gray-50 text-on-surface px-3 py-2 rounded-lg text-xs font-bold shadow-lg border border-outline-variant/20 transition-all active:scale-95 z-10'
                  >
                    Reset
                  </button>
                </div>
                <div className='flex items-center justify-between bg-surface-container/50 rounded-lg p-2'>
                  <p className='text-xs text-on-surface-variant font-medium'>
                    📍 Lat: {formData.location.coordinates[1].toFixed(4)}, Lng:{' '}
                    {formData.location.coordinates[0].toFixed(4)}
                  </p>
                  <button
                    type='button'
                    onClick={() => setShowCoordinateInput(!showCoordinateInput)}
                    className='text-xs font-bold text-primary hover:text-primary/80 flex items-center gap-1 bg-white px-2 py-1 rounded border border-primary/20'
                  >
                    <Edit3 className='w-3 h-3' />
                    {showCoordinateInput ? 'Hide' : 'Edit'}
                  </button>
                </div>
                <p className='text-xs text-on-surface-variant/80 italic'>
                  💡 To change location: Use "Edit" button above, click "Use My
                  Location", or open the map in Google Maps
                </p>
              </div>

              {/* Manual Coordinate Input */}
              {showCoordinateInput && (
                <div className='bg-primary/5 border-2 border-primary/30 rounded-xl p-4 space-y-3 animate-in slide-in-from-top-2'>
                  <p className='text-xs font-bold text-on-surface mb-2 flex items-center gap-2'>
                    <Edit3 className='w-4 h-4 text-primary' />
                    Edit Coordinates Manually
                  </p>
                  <div className='grid grid-cols-2 gap-3'>
                    <div className='space-y-1'>
                      <label className='text-xs font-semibold text-on-surface-variant'>
                        Latitude
                      </label>
                      <input
                        value={formData.location.coordinates[1]}
                        disabled={viewMode}
                        onChange={(e) => {
                          const lat = parseFloat(e.target.value) || 0
                          setFormData({
                            ...formData,
                            location: {
                              coordinates: [
                                formData.location.coordinates[0],
                                lat,
                              ],
                            },
                          })
                        }}
                        className='w-full h-10 bg-white border-2 border-outline-variant/30 rounded px-3 text-sm font-semibold text-on-surface focus:border-primary outline-none transition-all'
                        placeholder='22.5726'
                        type='number'
                        step='0.0001'
                      />
                    </div>
                    <div className='space-y-1'>
                      <label className='text-xs font-semibold text-on-surface-variant'>
                        Longitude
                      </label>
                      <input
                        value={formData.location.coordinates[0]}
                        disabled={viewMode}
                        onChange={(e) => {
                          const lng = parseFloat(e.target.value) || 0
                          setFormData({
                            ...formData,
                            location: {
                              coordinates: [
                                lng,
                                formData.location.coordinates[1],
                              ],
                            },
                          })
                        }}
                        className='w-full h-10 bg-white border-2 border-outline-variant/30 rounded px-3 text-sm font-semibold text-on-surface focus:border-primary outline-none transition-all'
                        placeholder='88.3639'
                        type='number'
                        step='0.0001'
                      />
                    </div>
                  </div>
                  <div className='bg-blue-50 border border-blue-200 rounded-lg p-3 space-y-2'>
                    <p className='text-xs font-bold text-blue-900'>
                      How to get coordinates from Google Maps:
                    </p>
                    <ol className='text-xs text-blue-800 space-y-1 list-decimal list-inside'>
                      <li>Open Google Maps in a new tab</li>
                      <li>Right-click on your exact location</li>
                      <li>Click the coordinates that appear at the top</li>
                      <li>They'll be copied! Paste them here</li>
                    </ol>
                  </div>
                </div>
              )}

              <div className='space-y-2'>
                <label className='text-xs font-semibold text-on-surface-variant uppercase tracking-wider'>
                  Street Address *
                </label>
                <input
                  required
                  value={formData.street}
                  disabled={viewMode}
                  onChange={(e) =>
                    setFormData({ ...formData, street: e.target.value })
                  }
                  className='w-full h-12 bg-surface-container border border-outline-variant/20 rounded px-4 text-sm text-on-surface focus:border-primary focus:bg-white outline-none transition-all placeholder:text-on-surface-variant/40'
                  placeholder='House/Building name and street'
                  type='text'
                />
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <label className='text-xs font-semibold text-on-surface-variant uppercase tracking-wider'>
                    City
                  </label>
                  <input
                    value={formData.city}
                    disabled={viewMode}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                    className='w-full h-12 bg-surface-container border border-outline-variant/20 rounded px-4 text-sm text-on-surface focus:border-primary focus:bg-white outline-none transition-all'
                    placeholder='City'
                    type='text'
                  />
                </div>

                <div className='space-y-2'>
                  <label className='text-xs font-semibold text-on-surface-variant uppercase tracking-wider'>
                    Pincode *
                  </label>
                  <input
                    required
                    value={formData.pincode}
                    disabled={viewMode}
                    onChange={(e) =>
                      setFormData({ ...formData, pincode: e.target.value })
                    }
                    className='w-full h-12 bg-surface-container border border-outline-variant/20 rounded px-4 text-sm text-on-surface focus:border-primary focus:bg-white outline-ne transition-all'
                    placeholder='6-digit pincode'
                    type='text'
                    maxLength={6}
                  />
                </div>
              </div>

              <div className='space-y-2'>
                <label className='text-xs font-semibold text-on-surface-variant uppercase tracking-wider'>
                  Landmark (Optional)
                </label>
                <input
                  value={formData.landmark}
                  disabled={viewMode}
                  onChange={(e) =>
                    setFormData({ ...formData, landmark: e.target.value })
                  }
                  className='w-full h-12 bg-surface-container border border-outline-variant/20 rounded px-4 text-sm text-on-surface focus:border-primary focus:bg-white outline-none transition-all placeholder:text-on-surface-variant/40'
                  placeholder='Nearby landmark for easy navigation'
                  type='text'
                />
              </div>
            </section>

            {/* Pricing */}
            <section className='space-y-4'>
              <div className='flex items-center gap-3 mb-4'>
                <div className='w-8 h-8 bg-emerald-500/10 rounded-lg flex items-center justify-center'>
                  <IndianRupee className='w-4 h-4 text-emerald-600' />
                </div>
                <h3 className='text-base font-bold text-on-surface'>Pricing</h3>
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <label className='text-xs font-semibold text-on-surface-variant uppercase tracking-wider'>
                    Monthly Rent *
                  </label>
                  <div className='relative'>
                    <span className='absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-on-surface-variant'>
                      ₹
                    </span>
                    <input
                      required
                      value={formData.rent}
                      disabled={viewMode}
                      onChange={(e) =>
                        setFormData({ ...formData, rent: e.target.value })
                      }
                      className='w-full h-12 bg-surface-container border border-outline-variant/20 rounded pl-8 pr-4 text-sm text-on-surface focus:border-primary focus:bg-white outline-none transition-all disabled:opacity-60 disabled:cursor-not-allowed'
                      placeholder='0'
                      type='number'
                      min='0'
                    />
                  </div>
                </div>

                <div className='space-y-2'>
                  <label className='text-xs font-semibold text-on-surface-variant uppercase tracking-wider'>
                    Security Deposit
                  </label>
                  <div className='relative'>
                    <span className='absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-on-surface-variant'>
                      ₹
                    </span>
                    <input
                      value={formData.deposit}
                      disabled={viewMode}
                      onChange={(e) =>
                        setFormData({ ...formData, deposit: e.target.value })
                      }
                      className='w-full h-12 bg-surface-container border border-outline-variant/20 rounded pl-8 pr-4 text-sm text-on-surface focus:border-primary focus:bg-white outline-none transition-all disabled:opacity-60 disabled:cursor-not-allowed'
                      placeholder='0'
                      type='number'
                      min='0'
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Amenities */}
            <section className='space-y-4'>
              <div className='flex items-center gap-3 mb-4'>
                <div className='w-8 h-8 bg-orange-500/10 rounded-lg flex items-center justify-center'>
                  <CheckCircle className='w-4 h-4 text-orange-600' />
                </div>
                <h3 className='text-base font-bold text-on-surface'>
                  Amenities
                </h3>
              </div>

              <div className='grid grid-cols-2 gap-3'>
                {amenitiesList.map((amenity) => (
                  <label
                    key={amenity}
                    className={`flex items-center gap-3 group p-3 bg-surface-container rounded-lg border border-outline-variant/10 transition-all ${viewMode
                      ? 'opacity-60 cursor-not-allowed'
                      : 'cursor-pointer hover:bg-white hover:border-primary/20'
                      }`}
                  >
                    <div
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${formData.amenities.includes(amenity)
                        ? 'border-primary bg-primary'
                        : 'border-outline-variant/30 group-hover:border-primary/40'
                        }`}
                    >
                      {formData.amenities.includes(amenity) && (
                        <CheckCircle className='w-3 h-3 text-white' />
                      )}
                    </div>
                    <input
                      className='hidden'
                      type='checkbox'
                      checked={formData.amenities.includes(amenity)}
                      onChange={() => toggleAmenity(amenity)}
                      disabled={viewMode}
                    />
                    <span className='text-xs font-semibold text-on-surface'>
                      {amenity}
                    </span>
                  </label>
                ))}
              </div>
            </section>

            {/* Availability Status - Only in Edit Mode */}
            {editingListing && !viewMode && (
              <section className='space-y-4'>
                <div className='flex items-center gap-3 mb-4'>
                  <div className='w-8 h-8 bg-emerald-500/10 rounded-lg flex items-center justify-center'>
                    <Power className='w-4 h-4 text-emerald-600' />
                  </div>
                  <h3 className='text-base font-bold text-on-surface'>
                    Availability Status
                  </h3>
                </div>

                <div className='bg-gradient-to-br from-white to-gray-50 rounded-2xl p-5 border-2 border-outline-variant/20 shadow-sm'>
                  <div className='flex items-center justify-between gap-4'>
                    <div className='flex-1'>
                      <div className='flex items-center gap-2 mb-1.5'>
                        <div
                          className={`w-2 h-2 rounded-full ${formData.isAvailable ? 'bg-emerald-500' : 'bg-gray-400'} animate-pulse`}
                        />
                        <h4 className='text-sm font-bold text-on-surface'>
                          {formData.isAvailable ? 'Available' : 'Unavailable'}
                        </h4>
                      </div>
                      <p className='text-xs text-on-surface-variant leading-relaxed'>
                        {formData.isAvailable
                          ? 'Visible to students searching for rooms'
                          : 'Hidden from search results'}
                      </p>
                    </div>
                    <button
                      type='button'
                      onClick={() =>
                        setFormData({
                          ...formData,
                          isAvailable: !formData.isAvailable,
                        })
                      }
                      className={`relative inline-flex h-8 w-14 shrink-0 cursor-pointer rounded-full border-2 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 ${formData.isAvailable
                        ? 'bg-emerald-500 border-emerald-500 focus:ring-emerald-500'
                        : 'bg-gray-200 border-gray-300 focus:ring-gray-400'
                        }`}
                      role='switch'
                      aria-checked={formData.isAvailable}
                    >
                      <span
                        className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-lg ring-0 transition-all duration-300 ease-in-out ${formData.isAvailable
                          ? 'translate-x-6'
                          : 'translate-x-0'
                          }`}
                      />
                    </button>
                  </div>
                </div>
              </section>
            )}

            {/* Photos Upload */}
            {!viewMode && (
              <section className='space-y-4'>
                <div className='flex items-center gap-3 mb-4'>
                  <div className='w-8 h-8 bg-indigo-500/10 rounded-lg flex items-center justify-center'>
                    <ImagePlus className='w-4 h-4 text-indigo-600' />
                  </div>
                  <h3 className='text-base font-bold text-on-surface'>Photos</h3>
                </div>

                <PhotoUpload
                  photos={photos}
                  onChange={setPhotos}
                  maxPhotos={10}
                  minPhotos={2}
                />
              </section>
            )}
          </form>
        </div>

        {/* Footer Actions */}
        <DrawerFooter className='border-t border-outline-variant/10 px-4 py-3 shrink-0 bg-white'>
          {viewMode ? null : editingListing ? (
            // Edit Mode - Update Button
            <div className='flex flex-col md:flex-row gap-2 w-full'>
              <Button
                type='button'
                size='sm'
                rounded='md'
                onClick={handleSaveAsDraft}
                disabled={loading}
                className='w-full md:flex-1 h-10 bg-primary text-white hover:bg-primary/90 text-xs font-bold shadow-md shadow-primary/20 uppercase tracking-wider'
              >
                {loading ? (
                  <>
                    <Loader2 className='w-3.5 h-3.5 animate-spin mr-1.5' />
                    Updating...
                  </>
                ) : (
                  <>
                    <CheckCircle className='w-3.5 h-3.5 mr-1.5' />
                    Update
                  </>
                )}
              </Button>
            </div>
          ) : (
            // Create Mode - Save Draft, Submit Buttons
            <div className='flex flex-col md:flex-row gap-2 w-full'>
              <Button
                type='button'
                variant='outline'
                size='sm'
                rounded='md'
                onClick={handleSaveAsDraft}
                disabled={loading}
                className='w-full md:flex-1 h-10 border border-gray-300 bg-white hover:bg-gray-50 text-xs font-bold text-gray-700 uppercase tracking-wider'
              >
                {loading ? (
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
                onClick={handleSubmitForApproval}
                disabled={loading}
                className='w-full md:flex-1 h-10 bg-primary text-white hover:bg-primary/90 text-xs font-bold shadow-md shadow-primary/20 uppercase tracking-wider'
              >
                {loading ? (
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
            </div>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
