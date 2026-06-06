'use client'

import { useState, useEffect } from 'react'
import { MapPin, Navigation, Move } from 'lucide-react'
import { toast } from 'sonner'
import { Geolocation } from '@capacitor/geolocation'
import { Capacitor } from '@capacitor/core'
import dynamic from 'next/dynamic'
import type { ListingFormData } from '@/lib/listing-flow/steps'

// Dynamically import InteractiveMap to avoid SSR issues with Leaflet
const InteractiveMap = dynamic(
  () =>
    import('../../../listing-form/InteractiveMap').then((mod) => ({
      default: mod.InteractiveMap,
    })),
  { ssr: false }
)

interface MapStepProps {
  formData: ListingFormData
  onChange: (data: Partial<ListingFormData>) => void
  disabled?: boolean
}

export function MapStep({ formData, onChange, disabled = false }: MapStepProps) {
  const [loadingLocation, setLoadingLocation] = useState(false)
  const [justUpdated, setJustUpdated] = useState(false)
  const [mapMounted, setMapMounted] = useState(false)

  useEffect(() => {
    setMapMounted(true)
  }, [])

  const fetchAddressFromCoordinates = async (coords: [number, number]) => {
    try {
      const [lng, lat] = coords
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
        {
          headers: {
            'Accept-Language': 'en',
          },
        }
      )

      if (response.ok) {
        const data = await response.json()
        const address = data.address || {}

        // Extract address components
        const street = address.road || address.street || address.neighbourhood || ''
        const city = address.city || address.town || address.village || address.state_district || 'Kolkata'
        const pincode = address.postcode || ''
        const landmark = address.suburb || address.quarter || ''

        // Update form with address data
        onChange({
          location: { coordinates: coords },
          street,
          city,
          pincode,
          landmark,
        })

        toast.success('📍 Location and address updated!')
      }
    } catch (error) {
      console.error('Reverse geocoding error:', error)
      // Still update location even if address fetch fails
      onChange({
        location: { coordinates: coords },
      })
    }
  }

  const handleMapLocationChange = (newCoordinates: [number, number]) => {
    fetchAddressFromCoordinates(newCoordinates)
    setJustUpdated(true)
    setTimeout(() => setJustUpdated(false), 1000)
  }

  const handleUseMyLocation = async () => {
    setLoadingLocation(true)
    const isNative = Capacitor.isNativePlatform()

    try {
      if (isNative) {
        const permissionStatus = await Geolocation.checkPermissions()
        if (permissionStatus.location !== 'granted') {
          const requestResult = await Geolocation.requestPermissions()
          if (requestResult.location !== 'granted') {
            toast.error('Location permission denied')
            setLoadingLocation(false)
            return
          }
        }
      }

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

      const { latitude, longitude } = position.coords

      // Fetch address from coordinates
      await fetchAddressFromCoordinates([longitude, latitude])

      setLoadingLocation(false)
      setJustUpdated(true)
      setTimeout(() => setJustUpdated(false), 1000)
    } catch (error: any) {
      setLoadingLocation(false)
      console.error('Geolocation error:', error)
      toast.error('Could not get your location')
    }
  }

  return (
    <div className='max-w-4xl mx-auto py-8 px-4'>
      {/* Title */}
      <h1 className='text-2xl md:text-3xl font-bold text-on-surface mb-2'>
        Confirm your location on the map
      </h1>
      <p className='text-on-surface-variant mb-6'>
        Pin your exact location so guests can find you easily
      </p>

      {/* Map Container */}
      <div
        className={`relative w-full h-[500px] bg-surface-container border-2 border-outline-variant/20 rounded-2xl overflow-hidden ${justUpdated ? 'ring-4 ring-primary/50 animate-pulse' : ''}`}
      >
        {loadingLocation && (
          <div className='absolute inset-0 bg-white/80 backdrop-blur-sm z-20 flex items-center justify-center'>
            <div className='text-center'>
              <div className='w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2'></div>
              <p className='text-sm font-bold text-primary'>Getting your location...</p>
            </div>
          </div>
        )}

        {mapMounted && !loadingLocation && (
          <>
            <InteractiveMap
              coordinates={formData.location.coordinates}
              onLocationChange={handleMapLocationChange}
              disabled={disabled}
            />
            <div className='absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-semibold text-on-surface shadow-md flex items-center gap-1.5 pointer-events-none z-1000'>
              <Move className='w-3.5 h-3.5 text-primary' />
              Drag pin or click map to set location
            </div>
          </>
        )}

        <button
          type='button'
          onClick={handleUseMyLocation}
          disabled={disabled || loadingLocation}
          className='absolute bottom-3 right-3 bg-primary hover:bg-primary/90 text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-lg flex items-center gap-2 transition-all active:scale-95 z-1000 disabled:opacity-50 disabled:cursor-not-allowed'
        >
          <Navigation className={`w-4 h-4 ${loadingLocation ? 'animate-pulse' : ''}`} />
          {loadingLocation ? 'Locating...' : 'Use My Location'}
        </button>
      </div>
    </div>
  )
}
