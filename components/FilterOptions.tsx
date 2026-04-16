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
  Building
} from 'lucide-react'

export function useFilterState() {
  const [priceRange, setPriceRange] = useState({ min: 4700, max: 37000 })
  const [selectedType, setSelectedType] = useState('Any type')
  const [selectedGender, setSelectedGender] = useState('Any')
  const [selectedFurnishing, setSelectedFurnishing] = useState('Any')
  const [distance, setDistance] = useState<number>(5)
  const [minRating, setMinRating] = useState<number>(0)
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [availableNow, setAvailableNow] = useState(false)
  
  return {
    priceRange, setPriceRange,
    selectedType, setSelectedType,
    selectedGender, setSelectedGender,
    selectedFurnishing, setSelectedFurnishing,
    distance, setDistance,
    minRating, setMinRating,
    selectedAmenities, setSelectedAmenities,
    availableNow, setAvailableNow
  }
}

export default function FilterOptions({ state }: { state: ReturnType<typeof useFilterState> }) {
  const {
    priceRange, setPriceRange,
    selectedType, setSelectedType,
    selectedGender, setSelectedGender,
    selectedFurnishing, setSelectedFurnishing,
    distance, setDistance,
    minRating, setMinRating,
    selectedAmenities, setSelectedAmenities,
    availableNow, setAvailableNow
  } = state

  const [isDragging, setIsDragging] = useState(false)
  const MIN_PRICE = 4700
  const MAX_PRICE = 37000

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
    setSelectedAmenities(prev => 
      prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity]
    )
  }

  return (
    <>
      {/* Type of place */}
      <div className='mb-8 md:mb-10 border-b border-outline-variant/30 pb-6 md:pb-8 pt-2'>
        <h3 className='text-base md:text-lg font-black font-headline uppercase tracking-tighter mb-6'>Node Typology</h3>
        <div className='grid grid-cols-2 gap-3'>
          {[
            { id: 'Any type', icon: Home },
            { id: 'Room', icon: Bed },
            { id: 'Flat', icon: Building2 },
            { id: 'PG', icon: Key },
            { id: 'Dormitory', icon: Building }
          ].map((type) => (
            <Button 
              key={type.id}
              variant={selectedType === type.id ? 'default' : 'outline'}
              size="lg"
              rounded="2xl"
              onClick={() => setSelectedType(type.id)}
              className={`flex flex-col items-center justify-center text-center p-3 md:p-5 h-auto transition-all ${selectedType === type.id ? 'border-primary bg-primary/5 shadow-lg shadow-primary/5 ring-1 ring-primary text-primary hover:bg-primary/10' : 'border-outline-variant/40 hover:border-primary/20 bg-white hover:bg-surface-container-lowest'}`}
            >
              <type.icon className={`mb-3 w-6 h-6 ${selectedType === type.id ? 'text-primary' : 'text-on-surface-variant/40'}`} />
              <span className={`text-[10px] font-black uppercase tracking-widest ${selectedType === type.id ? 'text-primary' : 'text-on-surface'}`}>{type.id}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className='mb-8 md:mb-10 border-b border-outline-variant/30 pb-6 md:pb-8'>
        <h3 className='text-base md:text-lg font-black font-headline uppercase tracking-tighter mb-1'>Fiscal Parameters</h3>
        <p className='text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-40 mb-8'>Cycle rent, includes all node maintenance</p>

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
              28, 45, 62, 78, 85, 92, 88, 95, 100, 98, 90, 85, 78, 70,
              65, 58, 52, 48, 42, 38, 35, 32, 28, 25, 22, 20, 18, 15,
              12, 10, 8, 6, 5, 4, 3, 2, 1,
            ].map((height, i) => {
              const barPosition = (i / 36) * 100
              const isInRange =
                barPosition >= ((priceRange.min - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100 &&
                barPosition <= ((priceRange.max - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100

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
            <div className='flex-1 border border-outline-variant/10 bg-[#FAFAFA] rounded-2xl px-5 py-3'>
              <label className='text-[8px] font-black text-on-surface-variant uppercase tracking-widest block mb-1 opacity-40'>Minimum</label>
              <div className='flex items-center gap-1'>
                <span className='text-xs font-black text-on-surface'>₹</span>
                <input type='text' value={priceRange.min} readOnly className='bg-transparent border-none p-0 focus:ring-0 text-xs font-black text-on-surface w-full outline-none' />
              </div>
            </div>
            <div className='w-4 border-t border-outline-variant/10'></div>
            <div className='flex-1 border border-outline-variant/10 bg-[#FAFAFA] rounded-2xl px-5 py-3'>
              <label className='text-[8px] font-black text-on-surface-variant uppercase tracking-widest block mb-1 opacity-40'>Maximum</label>
              <div className='flex items-center gap-1'>
                <span className='text-xs font-black text-on-surface'>₹</span>
                <input type='text' value={`${priceRange.max}+`} readOnly className='bg-transparent border-none p-0 focus:ring-0 text-xs font-black text-on-surface w-full outline-none' />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gender Preference */}
      <div className='mb-8 md:mb-10 border-b border-outline-variant/30 pb-6 md:pb-8'>
        <h3 className='text-base md:text-lg font-black font-headline uppercase tracking-tighter mb-6'>Gender Filter</h3>
        <div className='flex gap-3 flex-wrap'>
          {['Any', 'Boys', 'Girls', 'Co-ed'].map((gender) => (
            <Button
              key={gender}
              variant={selectedGender === gender ? 'default' : 'outline'}
              rounded="2xl"
              onClick={() => setSelectedGender(gender)}
              className={`px-6 py-2.5 h-auto ${selectedGender === gender ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'text-on-surface-variant bg-white'}`}
            >
              {gender}
            </Button>
          ))}
        </div>
      </div>

      {/* Furnishing */}
      <div className='mb-8 md:mb-10 border-b border-outline-variant/30 pb-6 md:pb-8'>
        <h3 className='text-base md:text-lg font-black font-headline uppercase tracking-tighter mb-6'>Interior Level</h3>
        <div className='grid grid-cols-1 gap-4'>
          {['Any', 'Furnished', 'Semi-Furnished', 'Unfurnished'].map((fur) => (
            <label key={fur} className='flex items-center gap-4 cursor-pointer group'>
              <div className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-all ${selectedFurnishing === fur ? 'border-primary bg-primary shadow-lg shadow-primary/20' : 'border-outline-variant/20 group-hover:border-primary/30'}`}>
                {selectedFurnishing === fur && <Check className='w-3.5 h-3.5 text-white' />}
              </div>
              <input type="radio" className="hidden" checked={selectedFurnishing === fur} onChange={() => setSelectedFurnishing(fur)} />
              <span className='text-[11px] font-black uppercase tracking-widest text-on-surface opacity-80'>{fur}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div className='mb-8 md:mb-10 border-b border-outline-variant/30 pb-6 md:pb-8'>
        <h3 className='text-base md:text-lg font-black font-headline uppercase tracking-tighter mb-6'>Utility Modules</h3>
        <div className='grid grid-cols-2 gap-4'>
          {[
            { id: 'wifi', label: 'Wi-Fi', icon: Wifi },
            { id: 'ac', label: 'AC', icon: Wind },
            { id: 'kitchen', label: 'Culina', icon: ChefHat },
            { id: 'parking', label: 'Transit', icon: Car },
            { id: 'washing_machine', label: 'Washer', icon: Waves },
            { id: 'security', label: 'Shield', icon: ShieldCheck }
          ].map((amenity) => (
            <label key={amenity.id} className='flex items-center gap-4 cursor-pointer group p-3 bg-[#FAFAFA] rounded-2xl border border-outline-variant/5 hover:bg-white hover:border-primary/10 transition-all'>
              <div className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-all ${selectedAmenities.includes(amenity.id) ? 'border-primary bg-primary shadow-lg shadow-primary/20' : 'border-outline-variant/20 group-hover:border-primary/30 bg-white'}`}>
                {selectedAmenities.includes(amenity.id) && <Check className='w-3.5 h-3.5 text-white' />}
              </div>
              <input type="checkbox" className="hidden" checked={selectedAmenities.includes(amenity.id)} onChange={() => toggleAmenity(amenity.id)} />
              <span className='text-[10px] font-black uppercase tracking-widest text-on-surface opacity-80'>{amenity.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div className='mb-8 md:mb-10 border-b border-outline-variant/30 pb-6 md:pb-8'>
        <div className='flex justify-between items-center'>
          <div>
            <h3 className='text-base md:text-lg font-black font-headline uppercase tracking-tighter mb-1'>Real-time Access</h3>
            <p className='text-[9px] font-black uppercase tracking-widest text-on-surface-variant opacity-40'>Nodes ready for immediate initialization</p>
          </div>
          <button 
            onClick={() => setAvailableNow(!availableNow)}
            className={`w-14 h-8 rounded-full relative transition-all ${availableNow ? 'bg-primary shadow-lg shadow-primary/20' : 'bg-outline-variant/20'}`}
          >
            <div className={`absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full transition-all shadow-md ${availableNow ? 'right-1' : 'left-1'}`}></div>
          </button>
        </div>
      </div>

      {/* Distance */}
      <div className='mb-8 md:mb-10 border-b border-outline-variant/30 pb-6 md:pb-8'>
        <h3 className='text-base md:text-lg font-black font-headline uppercase tracking-tighter mb-1'>Proximity Hub</h3>
        <p className='text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-40 mb-10'>Within {distance} Kilometers of Campus Node</p>
        <div className='w-full px-2 mt-4 relative'>
          <input 
            type="range"
            min="1"
            max="20"
            step="1"
            value={distance}
            onChange={(e) => setDistance(parseInt(e.target.value))}
            className="w-full h-1 bg-outline-variant/20 rounded-lg appearance-none cursor-pointer accent-primary outline-none"
          />
        </div>
      </div>

      {/* Rating */}
      <div className='mb-2 md:mb-4'>
        <h3 className='text-base md:text-lg font-black font-headline uppercase tracking-tighter mb-6'>Trust Threshold</h3>
        <div className='flex gap-3 w-full'>
          {[1, 2, 3, 4, 5].map((rating) => (
            <Button
              key={rating}
              variant={minRating === rating ? 'default' : 'outline'}
              rounded="2xl"
              onClick={() => setMinRating(rating === minRating ? 0 : rating)}
              className={`flex-1 flex flex-col items-center justify-center p-4 h-auto ${minRating === rating ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-[1.05]' : 'bg-[#FAFAFA] hover:bg-white'}`}
            >
              <Star className={`w-4 h-4 mb-2 ${minRating === rating ? 'fill-white text-white' : 'text-on-surface-variant opacity-20'}`} />
              <span className={`text-[10px] font-black uppercase tracking-widest ${minRating === rating ? 'text-white' : 'text-on-surface'}`}>{rating}+</span>
            </Button>
          ))}
        </div>
      </div>
    </>
  )
}
