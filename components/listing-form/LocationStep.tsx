'use client'

import { useState, useEffect } from 'react'
import { MapPin, Navigation, Edit3 } from 'lucide-react'
import { toast } from 'sonner'
import { Geolocation } from '@capacitor/geolocation'
import { Capacitor } from '@capacitor/core'

interface LocationData {
  coordinates: [number, number]
}

interface AddressData {
  street: string
  city: string
  pincode: string
  landmark: string
}

interface LocationStepProps {
  location: LocationData
  address: AddressData
  onLocationChange: (location: LocationData) => void
  onAddressChange: (address: Partial<AddressData>) => void
  disabled?: boolean
}

export function LocationStep({
  location,
  address,
  onLocationChange,
  onAddressChange,
  disabled = false,
}: LocationStepProps) {
  const [showCoordinateInput, setShowCoordinateInput] = useState(false)
  const [loadingLocation, setLoadingLocation] = useState(false)
  const [mapKey, setMapKey] = useState(Date.now()) // Force map refresh with timestamp
  const [justUpdated, setJustUpdated] = useState(false) // Visual feedback

  // Update map when location coordinates change
  useEffect(() => {
    console.log('📍 Location prop changed:', location.coordinates)
    // Use random number + timestamp for aggressive cache busting
    setMapKey(Date.now() + Math.random() * 10000)
  }, [location.coordinates[0], location.coordinates[1]])

  const handleUseMyLocation = async () => {
    setLoadingLocation(true)
    const isNative = Capacitor.isNativePlatform()

    try {
      // Request permissions first on native platforms
      if (isNative) {
        const permissionStatus = await Geolocation.checkPermissions()

        if (permissionStatus.location !== 'granted') {
          const requestResult = await Geolocation.requestPermissions()

          if (requestResult.location !== 'granted') {
            toast.error('Location permission denied', {
              description:
                'Please enable location access in your device settings',
            })
            setLoadingLocation(false)
            return
          }
        }
      }

      toast.loading('Getting your location...')

      // Use Capacitor Geolocation for native platforms, fallback to browser API
      const position = isNative
        ? await Geolocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
          })
        : await new Promise<GeolocationPosition>((resolve, reject) => {
            if (!navigator.geolocation) {
              reject(new Error('Geolocation not supported'))
              return
            }
            navigator.geolocation.getCurrentPosition(resolve, reject, {
              enableHighAccuracy: true,
              timeout: 10000,
              maximumAge: 0,
            })
          })

      const { latitude, longitude, accuracy } = position.coords

      console.log('📍 Location received:', { latitude, longitude, accuracy })

      // Update location coordinates FIRST
      onLocationChange({
        coordinates: [longitude, latitude],
      })

      console.log('🗺️ Coordinates updated:', [longitude, latitude])

      // Force immediate map refresh
      setMapKey(Date.now() + Math.random())

      // Small delay to ensure parent component updates location state
      setTimeout(() => {
        setLoadingLocation(false)
        setJustUpdated(true)

        // Force another refresh after parent state updates
        setTimeout(() => {
          setMapKey(Date.now())
          setJustUpdated(false)
        }, 500)
      }, 200)

      toast.dismiss()
      toast.success('📍 Location and address updated!', {
        description: `Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)} (±${Math.round(accuracy)}m)`,
        duration: 5000,
      })
    } catch (error: any) {
      setLoadingLocation(false)
      toast.dismiss()
      console.error('Geolocation error:', error)

      if (error.message === 'Geolocation not supported') {
        toast.error('Geolocation not supported', {
          description: 'Please enter coordinates manually',
        })
      } else if (error.code === 1 || error.message?.includes('denied')) {
        toast.error('Location access denied', {
          description: 'Click "Edit Coordinates" below to enter manually',
        })
      } else if (error.code === 3 || error.message?.includes('timeout')) {
        toast.error('Location request timed out', {
          description: 'Please try again or enter coordinates manually',
        })
      } else {
        toast.error('Could not get your location', {
          description: 'Please enable location access or enter manually',
        })
      }
    }
  }

  const handleResetLocation = () => {
    onLocationChange({
      coordinates: [88.4337, 22.9716], // Reset to Kalyani
    })
    toast.success('Location reset to Kalyani, West Bengal')
  }

  return (
    <section className='space-y-4'>
      <div className='flex items-center gap-3 mb-4'>
        <div className='w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center'>
          <MapPin className='w-4 h-4 text-blue-600' />
        </div>
        <h3 className='text-base font-bold text-on-surface'>Location</h3>
      </div>

      {/* Google Maps Location Picker */}
      <div className='space-y-2'>
        <label className='text-xs font-semibold text-on-surface-variant tracking-wider'>
          Pick Location on Map
        </label>
        <div
          className={`relative w-full h-64 bg-surface-container border border-outline-variant/20 rounded overflow-hidden group ${justUpdated ? 'ring-4 ring-primary/50 animate-pulse' : ''}`}
        >
          {/* Loading Overlay */}
          {loadingLocation && (
            <div className='absolute inset-0 bg-white/80 backdrop-blur-sm z-20 flex items-center justify-center'>
              <div className='text-center'>
                <div className='w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2'></div>
                <p className='text-sm font-bold text-primary'>
                  Getting your location...
                </p>
              </div>
            </div>
          )}

          {/* Static Map Image - Click to open interactive */}
          {!loadingLocation ? (
            <a
              href={`https://www.google.com/maps?q=${location.coordinates[1]},${location.coordinates[0]}`}
              target='_blank'
              rel='noopener noreferrer'
              className='block w-full h-full relative'
              key={`map-container-${mapKey}`}
            >
              <img
                src={`https://maps.googleapis.com/maps/api/staticmap?center=${location.coordinates[1]},${location.coordinates[0]}&zoom=16&size=600x400&scale=2&markers=color:red%7C${location.coordinates[1]},${location.coordinates[0]}&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&t=${mapKey}`}
                alt='Location map'
                className='w-full h-full object-cover'
                loading='eager'
                onLoad={() =>
                  console.log('🗺️ Map loaded:', location.coordinates)
                }
                onError={(e) => {
                  console.error('❌ Map load failed, using iframe fallback')
                  e.currentTarget.style.display = 'none'
                  const iframe = document.createElement('iframe')
                  iframe.src = `https://maps.google.com/maps?q=${location.coordinates[1]},${location.coordinates[0]}&z=16&output=embed`
                  iframe.className = 'w-full h-full border-0'
                  e.currentTarget.parentElement?.appendChild(iframe)
                }}
              />
              <div className='absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold text-on-surface shadow-sm'>
                📍 Click to open in Google Maps
              </div>
            </a>
          ) : null}

          <button
            type='button'
            onClick={handleUseMyLocation}
            disabled={disabled || loadingLocation}
            className='absolute bottom-3 right-3 bg-primary hover:bg-primary/90 text-white px-3 py-2 rounded-lg text-xs font-bold shadow-lg flex items-center gap-2 transition-all active:scale-95 z-10 disabled:opacity-50 disabled:cursor-not-allowed'
          >
            <Navigation
              className={`w-4 h-4 ${loadingLocation ? 'animate-pulse' : ''}`}
            />
            {loadingLocation ? 'Locating...' : 'Use My Location'}
          </button>
          <button
            type='button'
            onClick={handleResetLocation}
            disabled={disabled}
            className='absolute bottom-3 left-3 bg-white hover:bg-gray-50 text-on-surface px-3 py-2 rounded-lg text-xs font-bold shadow-lg border border-outline-variant/20 transition-all active:scale-95 z-10 disabled:opacity-50 disabled:cursor-not-allowed'
          >
            Reset
          </button>
        </div>
        <div className='flex items-center justify-between bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded p-3 animate-in fade-in slide-in-from-bottom-2'>
          <div>
            <p className='text-[10px] tracking-wider font-bold text-blue-600 mb-0.5'>
              Current Location
            </p>
            <p className='text-xs text-on-surface font-mono font-bold'>
              📍 {location.coordinates[1].toFixed(6)},{' '}
              {location.coordinates[0].toFixed(6)}
            </p>
          </div>
          <button
            type='button'
            onClick={() => setShowCoordinateInput(!showCoordinateInput)}
            disabled={disabled}
            className='text-xs font-bold text-primary hover:text-primary/80 flex items-center gap-1 bg-white px-2 py-1.5 rounded border border-primary/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all'
          >
            <Edit3 className='w-3 h-3' />
            {showCoordinateInput ? 'Hide' : 'Edit'}
          </button>
        </div>
        <div className='bg-blue-50/50 border border-blue-200 rounded p-3'>
          <p className='text-xs font-bold text-blue-900 mb-1'>
            💡 How to set your property location:
          </p>
          <ul className='text-xs text-blue-800 space-y-1 list-disc list-inside'>
            <li>
              <strong>"Use My Location"</strong> - Automatically detect your
              current GPS location
            </li>
            <li>
              <strong>"Click the map"</strong> - Opens in Google Maps to
              manually select exact location
            </li>
            <li>
              <strong>"Edit"</strong> - Manually enter latitude/longitude
              coordinates
            </li>
          </ul>
        </div>
      </div>

      {/* Manual Coordinate Input */}
      {showCoordinateInput && (
        <div className='bg-primary/5 border-2 border-primary/30 rounded p-4 space-y-3 animate-in slide-in-from-top-2'>
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
                value={location.coordinates[1]}
                disabled={disabled}
                onChange={(e) => {
                  const lat = parseFloat(e.target.value) || 0
                  onLocationChange({
                    coordinates: [location.coordinates[0], lat],
                  })
                }}
                className='w-full h-10 bg-white border-2 border-outline-variant/30 rounded px-3 text-sm font-semibold text-on-surface focus:border-primary outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed'
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
                value={location.coordinates[0]}
                disabled={disabled}
                onChange={(e) => {
                  const lng = parseFloat(e.target.value) || 0
                  onLocationChange({
                    coordinates: [lng, location.coordinates[1]],
                  })
                }}
                className='w-full h-10 bg-white border-2 border-outline-variant/30 rounded px-3 text-sm font-semibold text-on-surface focus:border-primary outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed'
                placeholder='88.3639'
                type='number'
                step='0.0001'
              />
            </div>
          </div>
          <div className='bg-blue-50 border border-blue-200 rounded p-3 space-y-2'>
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
        <label className='text-xs font-semibold text-on-surface-variant tracking-wider'>
          Street Address *
        </label>
        <input
          required
          value={address.street}
          disabled={disabled}
          onChange={(e) => onAddressChange({ street: e.target.value })}
          className='w-full h-12 bg-surface-container border border-outline-variant/20 rounded px-4 text-sm text-on-surface focus:border-primary focus:bg-white outline-none transition-all placeholder:text-on-surface-variant/40 disabled:opacity-50 disabled:cursor-not-allowed'
          placeholder='House/Building name and street'
          type='text'
        />
      </div>

      <div className='grid grid-cols-2 gap-4'>
        <div className='space-y-2'>
          <label className='text-xs font-semibold text-on-surface-variant tracking-wider'>
            City
          </label>
          <input
            value={address.city}
            disabled={disabled}
            onChange={(e) => onAddressChange({ city: e.target.value })}
            className='w-full h-12 bg-surface-container border border-outline-variant/20 rounded px-4 text-sm text-on-surface focus:border-primary focus:bg-white outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed'
            placeholder='City'
            type='text'
          />
        </div>

        <div className='space-y-2'>
          <label className='text-xs font-semibold text-on-surface-variant tracking-wider'>
            Pincode *
          </label>
          <input
            required
            value={address.pincode}
            disabled={disabled}
            onChange={(e) => onAddressChange({ pincode: e.target.value })}
            className='w-full h-12 bg-surface-container border border-outline-variant/20 rounded px-4 text-sm text-on-surface focus:border-primary focus:bg-white outline-ne transition-all disabled:opacity-50 disabled:cursor-not-allowed'
            placeholder='6-digit pincode'
            type='text'
            maxLength={6}
          />
        </div>
      </div>

      <div className='space-y-2'>
        <label className='text-xs font-semibold text-on-surface-variant tracking-wider'>
          Landmark (Optional)
        </label>
        <input
          value={address.landmark}
          disabled={disabled}
          onChange={(e) => onAddressChange({ landmark: e.target.value })}
          className='w-full h-12 bg-surface-container border border-outline-variant/20 rounded px-4 text-sm text-on-surface focus:border-primary focus:bg-white outline-none transition-all placeholder:text-on-surface-variant/40 disabled:opacity-50 disabled:cursor-not-allowed'
          placeholder='Nearby landmark for easy navigation'
          type='text'
        />
      </div>
    </section>
  )
}
