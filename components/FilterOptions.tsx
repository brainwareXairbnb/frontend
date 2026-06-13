'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Home,
  Bed,
  Building2,
  Key,
  BaggageClaim,
  Check,
  Star,
  Wifi,
  Wind,
  ChefHat,
  Car,
  Waves,
  ShieldCheck,
  Building,
} from 'lucide-react'

export function useFilterState() {
  const [priceRange, setPriceRange] = useState({ min: 0, max: 30000 })
  const [selectedType, setSelectedType] = useState('Any type')
  const [selectedGender, setSelectedGender] = useState('Any')
  const [selectedFurnishing, setSelectedFurnishing] = useState('Any')
  const [distance, setDistance] = useState<number>(0)
  const [minRating, setMinRating] = useState<number>(0)
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [availableNow, setAvailableNow] = useState(false)

  return {
    priceRange,
    setPriceRange,
    selectedType,
    setSelectedType,
    selectedGender,
    setSelectedGender,
    selectedFurnishing,
    setSelectedFurnishing,
    distance,
    setDistance,
    minRating,
    setMinRating,
    selectedAmenities,
    setSelectedAmenities,
    availableNow,
    setAvailableNow,
  }
}

export default function FilterOptions({
  state,
}: {
  state: ReturnType<typeof useFilterState>
}) {
  const {
    priceRange,
    setPriceRange,
    selectedType,
    setSelectedType,
    selectedGender,
    setSelectedGender,
    selectedFurnishing,
    setSelectedFurnishing,
    distance,
    setDistance,
    minRating,
    setMinRating,
    selectedAmenities,
    setSelectedAmenities,
    availableNow,
    setAvailableNow,
  } = state

  const [isDragging, setIsDragging] = useState(false)
  const MIN_PRICE = 0
  const MAX_PRICE = 30000

  const handleHistogramInteraction = (
    e: React.MouseEvent<HTMLDivElement>,
    containerRef: HTMLDivElement,
  ) => {
    const rect = containerRef.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = Math.max(0, Math.min(1, x / rect.width))
    const price = Math.round(MIN_PRICE + percentage * (MAX_PRICE - MIN_PRICE))

    const snappedPrice = Math.round(price / 1000) * 1000
    const midPoint = (priceRange.min + priceRange.max) / 2

    if (snappedPrice < midPoint) {
      setPriceRange({
        ...priceRange,
        min: Math.min(snappedPrice, priceRange.max - 1000),
      })
    } else {
      setPriceRange({
        ...priceRange,
        max: Math.max(snappedPrice, priceRange.min + 1000),
      })
    }
  }

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity],
    )
  }

  return (
    <>
      {/* Type of place */}
      <div className='mb-8 md:mb-10 border-b border-outline-variant/30 pb-6 md:pb-8 pt-2'>
        <h3 className='text-base md:text-lg font-bold mb-2'>Room Type</h3>
        <p className='text-xs text-on-surface-variant mb-4'>
          Choose the type of accommodation
        </p>
        <div className='grid grid-cols-2 gap-3'>
          {[
            { id: 'Any type', label: 'Any Type', icon: Home },
            { id: 'Room', label: 'Room', icon: Bed },
            { id: 'Flat', label: 'Flat', icon: Building2 },
            { id: 'PG', label: 'PG', icon: Key },
            { id: 'Dormitory', label: 'Dormitory', icon: Building },
          ].map((type) => (
            <Button
              key={type.id}
              variant={selectedType === type.id ? 'default' : 'outline'}
              size='lg'
              rounded='2xl'
              onClick={() => setSelectedType(type.id)}
              className={`flex flex-col items-center justify-center text-center p-3 md:p-4 h-auto transition-all ${selectedType === type.id ? 'border-primary bg-primary/5 shadow-lg shadow-primary/5 ring-1 ring-primary text-primary hover:bg-primary/10' : 'border-outline-variant/40 hover:border-primary/20 bg-white hover:bg-surface-container-lowest'}`}
            >
              <type.icon
                className={`mb-2 w-5 h-5 ${selectedType === type.id ? 'text-primary' : 'text-on-surface-variant/40'}`}
              />
              <span
                className={`text-xs font-semibold ${selectedType === type.id ? 'text-primary' : 'text-on-surface'}`}
              >
                {type.label}
              </span>
            </Button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className='mb-8 md:mb-10 border-b border-outline-variant/30 pb-6 md:pb-8'>
        <h3 className='text-base md:text-lg font-bold mb-2'>Price Range</h3>
        <p className='text-xs text-on-surface-variant mb-6'>
          Monthly rent in ₹
        </p>

        {/* Interactive Histogram */}
        <div className='px-2'>
          <div
            className='relative h-16 flex items-end gap-1 mb-6 cursor-pointer select-none group'
            onMouseDown={(e) => {
              setIsDragging(true)
              handleHistogramInteraction(e, e.currentTarget)
            }}
            onMouseMove={(e) => {
              if (isDragging) {
                handleHistogramInteraction(e, e.currentTarget)
              }
            }}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
          >
            {[
              28, 45, 62, 78, 85, 92, 88, 95, 100, 98, 90, 85, 78, 70, 65, 58,
              52, 48, 42, 38, 35, 32, 28, 25, 22, 20, 18, 15, 12, 10, 8, 6, 5,
              4, 3, 2, 1,
            ].map((height, i) => {
              const barPosition = (i / 36) * 100
              const isInRange =
                barPosition >=
                  ((priceRange.min - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) *
                    100 &&
                barPosition <=
                  ((priceRange.max - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100

              return (
                <div
                  key={i}
                  className={`flex-1 rounded-full transition-all ${isInRange ? 'bg-primary' : 'bg-outline-variant/20'}`}
                  style={{ height: `${height}%` }}
                />
              )
            })}
          </div>

          {/* Price inputs min/max */}
          <div className='flex items-center gap-4'>
            <div className='flex-1 border border-outline-variant/20 bg-white rounded-xl px-4 py-3 shadow-sm'>
              <label className='text-[10px] font-semibold text-on-surface-variant block mb-1'>
                Min
              </label>
              <div className='flex items-center gap-1'>
                <span className='text-sm font-semibold text-on-surface'>₹</span>
                <input
                  type='text'
                  value={priceRange.min.toLocaleString('en-IN')}
                  readOnly
                  className='bg-transparent border-none p-0 focus:ring-0 text-sm font-semibold text-on-surface w-full outline-none'
                />
              </div>
            </div>
            <div className='w-4 border-t border-outline-variant/20'></div>
            <div className='flex-1 border border-outline-variant/20 bg-white rounded-xl px-4 py-3 shadow-sm'>
              <label className='text-[10px] font-semibold text-on-surface-variant block mb-1'>
                Max
              </label>
              <div className='flex items-center gap-1'>
                <span className='text-sm font-semibold text-on-surface'>₹</span>
                <input
                  type='text'
                  value={`${priceRange.max.toLocaleString('en-IN')}+`}
                  readOnly
                  className='bg-transparent border-none p-0 focus:ring-0 text-sm font-semibold text-on-surface w-full outline-none'
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gender Preference */}
      <div className='mb-8 md:mb-10 border-b border-outline-variant/30 pb-6 md:pb-8'>
        <h3 className='text-base md:text-lg font-bold mb-2'>
          Gender Preference
        </h3>
        <p className='text-xs text-on-surface-variant mb-4'>
          Who can stay here
        </p>
        <div className='flex gap-3 flex-wrap'>
          {['Any', 'Boys', 'Girls', 'Co-ed'].map((gender) => (
            <Button
              key={gender}
              variant={selectedGender === gender ? 'default' : 'outline'}
              rounded='xl'
              onClick={() => setSelectedGender(gender)}
              className={`px-5 py-2.5 h-auto text-sm font-semibold ${selectedGender === gender ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-on-surface bg-white border-outline-variant/30 hover:border-primary/30'}`}
            >
              {gender}
            </Button>
          ))}
        </div>
      </div>

      {/* Furnishing */}
      <div className='mb-8 md:mb-10 border-b border-outline-variant/30 pb-6 md:pb-8'>
        <h3 className='text-base md:text-lg font-bold mb-2'>Furnishing</h3>
        <p className='text-xs text-on-surface-variant mb-4'>
          Select furnishing level
        </p>
        <div className='grid grid-cols-1 gap-3'>
          {['Any', 'Furnished', 'Semi-Furnished', 'Unfurnished'].map((fur) => (
            <label
              key={fur}
              className='flex items-center gap-3 cursor-pointer group p-3 rounded-lg hover:bg-surface-container/50 transition-colors'
            >
              <div
                className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${selectedFurnishing === fur ? 'border-primary bg-primary shadow-md shadow-primary/20' : 'border-outline-variant/30 group-hover:border-primary/40'}`}
              >
                {selectedFurnishing === fur && (
                  <Check className='w-3 h-3 text-white' strokeWidth={3} />
                )}
              </div>
              <input
                type='radio'
                className='hidden'
                checked={selectedFurnishing === fur}
                onChange={() => setSelectedFurnishing(fur)}
              />
              <span className='text-sm font-medium text-on-surface'>{fur}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div className='mb-8 md:mb-10 border-b border-outline-variant/30 pb-6 md:pb-8'>
        <h3 className='text-base md:text-lg font-bold mb-2'>Amenities</h3>
        <p className='text-xs text-on-surface-variant mb-4'>
          Select facilities you need
        </p>
        <div className='grid grid-cols-2 gap-3'>
          {[
            { id: 'wifi', label: 'Wi-Fi', icon: Wifi },
            { id: 'ac', label: 'AC', icon: Wind },
            { id: 'kitchen', label: 'Kitchen', icon: ChefHat },
            { id: 'parking', label: 'Parking', icon: Car },
            { id: 'washing_machine', label: 'Washing Machine', icon: Waves },
            { id: 'security', label: 'Security', icon: ShieldCheck },
          ].map((amenity) => (
            <label
              key={amenity.id}
              className='flex items-center gap-3 cursor-pointer group p-3 bg-white rounded-xl border border-outline-variant/20 hover:border-primary/30 hover:shadow-sm transition-all'
            >
              <div
                className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all flex-shrink-0 ${selectedAmenities.includes(amenity.id) ? 'border-primary bg-primary shadow-md shadow-primary/20' : 'border-outline-variant/30 group-hover:border-primary/40'}`}
              >
                {selectedAmenities.includes(amenity.id) && (
                  <Check className='w-3 h-3 text-white' strokeWidth={3} />
                )}
              </div>
              <input
                type='checkbox'
                className='hidden'
                checked={selectedAmenities.includes(amenity.id)}
                onChange={() => toggleAmenity(amenity.id)}
              />
              <span className='text-xs font-medium text-on-surface'>
                {amenity.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div className='mb-8 md:mb-10 border-b border-outline-variant/30 pb-6 md:pb-8'>
        <div className='flex justify-between items-center gap-4'>
          <div className='flex-1'>
            <h3 className='text-base md:text-lg font-bold mb-1'>
              Available Now
            </h3>
            <p className='text-xs text-on-surface-variant'>
              Ready for immediate move-in
            </p>
          </div>
          <button
            type='button'
            onClick={() => {
              console.log('Toggle clicked, current state:', availableNow)
              setAvailableNow(!availableNow)
            }}
            className={`flex-shrink-0 w-14 h-8 rounded-full relative transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 hover:shadow-lg ${
              availableNow
                ? 'bg-primary shadow-md shadow-primary/30'
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            role='switch'
            aria-checked={availableNow}
            aria-label='Toggle Available Now filter'
          >
            <div
              className={`absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full transition-all duration-200 shadow-md ${
                availableNow ? 'translate-x-7' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Distance */}
      <div className='mb-8 md:mb-10 border-b border-outline-variant/30 pb-6 md:pb-8'>
        <div className='flex justify-between items-baseline mb-2'>
          <h3 className='text-base md:text-lg font-bold'>
            Distance from Campus
          </h3>
          <span className='text-sm font-semibold text-primary'>
            {distance} km
          </span>
        </div>
        <p className='text-xs text-on-surface-variant mb-6'>
          Maximum distance from Brainware University
        </p>
        <div className='w-full px-1'>
          <input
            type='range'
            min='1'
            max='20'
            step='1'
            value={distance}
            onChange={(e) => setDistance(parseInt(e.target.value))}
            style={{
              background: `linear-gradient(to right, #FF385C 0%, #FF385C ${((distance - 1) / 19) * 100}%, #E5E7EB ${((distance - 1) / 19) * 100}%, #E5E7EB 100%)`,
            }}
            className='w-full h-2 rounded-lg appearance-none cursor-pointer outline-none
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:w-5
              [&::-webkit-slider-thumb]:h-5
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-white
              [&::-webkit-slider-thumb]:border-2
              [&::-webkit-slider-thumb]:border-primary
              [&::-webkit-slider-thumb]:shadow-md
              [&::-webkit-slider-thumb]:cursor-pointer
              [&::-webkit-slider-thumb]:hover:scale-110
              [&::-webkit-slider-thumb]:transition-transform
              [&::-moz-range-thumb]:w-5
              [&::-moz-range-thumb]:h-5
              [&::-moz-range-thumb]:rounded-full
              [&::-moz-range-thumb]:bg-white
              [&::-moz-range-thumb]:border-2
              [&::-moz-range-thumb]:border-primary
              [&::-moz-range-thumb]:shadow-md
              [&::-moz-range-thumb]:cursor-pointer
              [&::-moz-range-track]:bg-transparent
              [&::-moz-range-track]:h-2
              [&::-moz-range-track]:rounded-lg'
          />
          <div className='flex justify-between mt-2 text-xs text-on-surface-variant'>
            <span>1 km</span>
            <span>20 km</span>
          </div>
        </div>
      </div>

      {/* Rating */}
      <div className='mb-2 md:mb-4'>
        <h3 className='text-base md:text-lg font-bold mb-2'>Minimum Rating</h3>
        <p className='text-xs text-on-surface-variant mb-4'>
          Show listings rated at least
        </p>
        <div className='flex gap-2 w-full'>
          {[1, 2, 3, 4, 5].map((rating) => (
            <Button
              key={rating}
              variant={minRating === rating ? 'default' : 'outline'}
              rounded='xl'
              onClick={() => setMinRating(rating === minRating ? 0 : rating)}
              className={`flex-1 flex flex-col items-center justify-center p-3 h-auto transition-all ${minRating === rating ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105' : 'bg-white border-outline-variant/30 hover:border-primary/30 hover:shadow-sm'}`}
            >
              <Star
                className={`w-4 h-4 mb-1 ${minRating === rating ? 'fill-white text-white' : 'fill-yellow-400 text-yellow-400'}`}
              />
              <span
                className={`text-xs font-semibold ${minRating === rating ? 'text-white' : 'text-on-surface'}`}
              >
                {rating}+
              </span>
            </Button>
          ))}
        </div>
      </div>
    </>
  )
}
