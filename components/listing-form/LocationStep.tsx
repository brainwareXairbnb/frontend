'use client'

import { useState, useEffect } from 'react'
import { MapPin, Navigation, Move } from 'lucide-react'
import { toast } from 'sonner'
import { Geolocation } from '@capacitor/geolocation'
import { Capacitor } from '@capacitor/core'
import dynamic from 'next/dynamic'

// Dynamically import InteractiveMap to avoid SSR issues with Leaflet
const InteractiveMap = dynamic(
  () =>
    import('./InteractiveMap').then((mod) => ({ default: mod.InteractiveMap })),
  { ssr: false },
)

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
  const [loadingLocation, setLoadingLocation] = useState(false)
  const [justUpdated, setJustUpdated] = useState(false) // Visual feedback
  const [mapMounted, setMapMounted] = useState(false)

  // Mount map after component loads (avoid SSR issues)
  useEffect(() => {
    setMapMounted(true)
  }, [])

  // Handle location changes from the map
  const handleMapLocationChange = (newCoordinates: [number, number]) => {
    onLocationChange({ coordinates: newCoordinates })
    setJustUpdated(true)
    setTimeout(() => setJustUpdated(false), 1000)
  }

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

      // Update location coordinates
      onLocationChange({
        coordinates: [longitude, latitude],
      })

      console.log('🗺️ Coordinates updated:', [longitude, latitude])

      setLoadingLocation(false)
      setJustUpdated(true)
      setTimeout(() => setJustUpdated(false), 1000)

      toast.dismiss()
      toast.success('📍 Location updated!', {
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

          {/* Interactive Map with Leaflet */}
          {mapMounted && !loadingLocation ? (
            <>
              <InteractiveMap
                coordinates={location.coordinates}
                onLocationChange={handleMapLocationChange}
                disabled={disabled}
              />
              <div className='absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-semibold text-on-surface shadow-md flex items-center gap-1.5 pointer-events-none z-1000'>
                <Move className='w-3.5 h-3.5 text-primary' />
                Drag pin or click map to set location
              </div>
            </>
          ) : null}

          {/* Loading state */}
          {!mapMounted && !loadingLocation ? (
            <div className='absolute inset-0 flex items-center justify-center bg-surface-container'>
              <div className='text-center'>
                <div className='w-10 h-10 border-3 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-2'></div>
                <p className='text-xs font-semibold text-on-surface-variant'>
                  Loading map...
                </p>
              </div>
            </div>
          ) : null}

          {/* Use My Location Button */}
          <button
            type='button'
            onClick={handleUseMyLocation}
            disabled={disabled || loadingLocation}
            className='absolute bottom-3 right-3 bg-primary hover:bg-primary/90 text-white px-3 py-2 rounded-lg text-xs font-bold shadow-lg flex items-center gap-2 transition-all active:scale-95 z-1000 disabled:opacity-50 disabled:cursor-not-allowed'
          >
            <Navigation
              className={`w-4 h-4 ${loadingLocation ? 'animate-pulse' : ''}`}
            />
            {loadingLocation ? 'Locating...' : 'Use My Location'}
          </button>
        </div>
      </div>

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
