'use client'

import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Create custom red marker icon
const redIcon = L.divIcon({
  className: 'custom-pin-marker',
  html: `
    <svg width="32" height="42" viewBox="0 0 32 42" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 0C7.163 0 0 7.163 0 16c0 12 16 26 16 26s16-14 16-26c0-8.837-7.163-16-16-16z" fill="#FF385C"/>
      <circle cx="16" cy="16" r="6" fill="white"/>
    </svg>
  `,
  iconSize: [32, 42],
  iconAnchor: [16, 42],
  popupAnchor: [0, -42],
})

interface InteractiveMapProps {
  coordinates: [number, number] // [lng, lat]
  onLocationChange: (coordinates: [number, number]) => void
  disabled?: boolean
}

export function InteractiveMap({
  coordinates,
  onLocationChange,
  disabled = false,
}: InteractiveMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)
  const markerRef = useRef<L.Marker | null>(null)

  useEffect(() => {
    if (!mapRef.current) return

    const [lng, lat] = coordinates

    // Initialize map if not already created
    if (!mapInstanceRef.current) {
      // Create map instance
      mapInstanceRef.current = L.map(mapRef.current, {
        center: [lat, lng],
        zoom: 16,
        zoomControl: true,
        scrollWheelZoom: true,
        attributionControl: false, // Hide attribution
      })

      // Add OpenStreetMap tile layer (free, no API key needed)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '', // Remove attribution
        maxZoom: 19,
      }).addTo(mapInstanceRef.current)

      // Create draggable marker with custom red icon
      markerRef.current = L.marker([lat, lng], {
        draggable: !disabled,
        autoPan: true,
        icon: redIcon,
      }).addTo(mapInstanceRef.current)

      // Add tooltip to marker
      markerRef.current.bindTooltip('Drag me to set location', {
        permanent: false,
        direction: 'top',
      })

      // Listen to marker drag end
      markerRef.current.on('dragend', () => {
        if (!markerRef.current) return
        const position = markerRef.current.getLatLng()
        onLocationChange([position.lng, position.lat])
      })

      // Listen to map clicks
      mapInstanceRef.current.on('click', (e: L.LeafletMouseEvent) => {
        if (disabled) return
        const { lat: newLat, lng: newLng } = e.latlng
        if (markerRef.current) {
          markerRef.current.setLatLng([newLat, newLng])
        }
        onLocationChange([newLng, newLat])
      })
    } else {
      // Update existing map and marker position
      mapInstanceRef.current.setView([lat, lng], 16)
      if (markerRef.current) {
        markerRef.current.setLatLng([lat, lng])
        markerRef.current.dragging?.[disabled ? 'disable' : 'enable']()
      }
    }

    // Cleanup on unmount
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
        markerRef.current = null
      }
    }
  }, []) // Only run once on mount

  // Update map center and marker when coordinates change externally
  useEffect(() => {
    if (mapInstanceRef.current && markerRef.current) {
      const [lng, lat] = coordinates
      mapInstanceRef.current.setView([lat, lng], mapInstanceRef.current.getZoom())
      markerRef.current.setLatLng([lat, lng])
    }
  }, [coordinates[0], coordinates[1]])

  // Update marker draggability when disabled changes
  useEffect(() => {
    if (markerRef.current) {
      if (disabled) {
        markerRef.current.dragging?.disable()
      } else {
        markerRef.current.dragging?.enable()
      }
    }
  }, [disabled])

  return <div ref={mapRef} className='w-full h-full' />
}
