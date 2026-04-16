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
import { 
  X, 
  FileEdit, 
  DoorOpen, 
  MapPin, 
  Wallet, 
  ImagePlus, 
  UploadCloud, 
  CheckSquare,
  Sparkles,
  Zap
} from 'lucide-react'

interface CreateListingDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function CreateListingDrawer({
  open,
  onOpenChange,
}: CreateListingDrawerProps) {
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const amenities = [
    'High-Speed Wi-Fi',
    'Kitchen Access',
    'Air Conditioning',
    'Laundry In-Unit',
    'Private Bath',
    'Gym Access',
    'Pet Friendly',
    'Parking Space',
  ]

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity],
    )
  }

  const FormContent = () => (
    <>
      {/* Header */}
      <DrawerHeader className='border-b border-outline-variant/5 shrink-0 px-8 py-8'>
        <div className='flex items-center justify-between'>
          <div>
            <div className="flex items-center gap-3 mb-2">
               <div className="w-8 h-8 bg-primary/5 rounded-xl flex items-center justify-center text-primary">
                  <Sparkles className="w-4 h-4" />
               </div>
               <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">New Protocol</h2>
            </div>
            <DrawerTitle className='font-headline text-3xl font-black text-on-surface tracking-tighter uppercase'>
              Create Node Listing
            </DrawerTitle>
            <DrawerDescription className='text-on-surface-variant text-[11px] font-bold uppercase tracking-widest opacity-40 mt-1'>
              Define your residency module with precision
            </DrawerDescription>
          </div>
          <DrawerClose asChild>
            <button className='w-12 h-12 flex items-center justify-center rounded-2xl bg-[#FAFAFA] border border-outline-variant/5 hover:bg-white hover:shadow-xl transition-all group'>
              <X className='w-5 h-5 text-on-surface-variant group-hover:text-primary' />
            </button>
          </DrawerClose>
        </div>
      </DrawerHeader>

      {/* Scrollable Form Content */}
      <div className='flex-1 overflow-y-auto px-8 py-10'>
        <form className='space-y-10'>
          {/* Section 1: Core Identity */}
          <section className='space-y-8'>
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                  <FileEdit className="w-5 h-5 text-white" />
               </div>
               <h3 className='font-headline text-xl font-black text-on-surface tracking-tighter uppercase'>
                 Core Identity
               </h3>
            </div>
            
            <div className='space-y-6'>
              <div className='space-y-2'>
                <label className='text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-40 ml-1'>
                  Listing Label
                </label>
                <input
                  className='w-full h-16 bg-[#FAFAFA] border border-outline-variant/10 rounded-2xl px-6 text-sm font-black text-on-surface focus:border-primary focus:bg-white outline-none transition-all placeholder:opacity-30'
                  placeholder='e.g. Modern Residency Alpha'
                  type='text'
                />
              </div>
              <div className='space-y-2'>
                <label className='text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-40 ml-1'>
                  Telemetric Description
                </label>
                <textarea
                  className='w-full bg-[#FAFAFA] border border-outline-variant/10 rounded-2xl p-6 text-sm font-black text-on-surface focus:border-primary focus:bg-white outline-none transition-all placeholder:opacity-30 resize-none'
                  placeholder='Share the story of your space, the neighborhood vibes, and unique features...'
                  rows={4}
                ></textarea>
              </div>
            </div>
          </section>

          {/* Section 2: Space Configuration */}
          <section className='space-y-8'>
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 bg-on-surface rounded-xl flex items-center justify-center shadow-lg">
                  <DoorOpen className="w-5 h-5 text-white" />
               </div>
               <h3 className='font-headline text-xl font-black text-on-surface tracking-tighter uppercase'>
                 Node Config
               </h3>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div className="space-y-2">
                <label className='text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-40 ml-1'>
                  Unit Typology
                </label>
                <select className='w-full h-16 bg-[#FAFAFA] border border-outline-variant/10 rounded-2xl px-6 text-xs font-black uppercase tracking-widest text-on-surface focus:border-primary focus:bg-white outline-none appearance-none cursor-pointer'>
                  <option>Single Unit</option>
                  <option>Dual Occupancy</option>
                  <option>Cluster PG</option>
                  <option>Isolated Flat</option>
                  <option>Studio Module</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className='text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-40 ml-1'>
                  Sector Access
                </label>
                <select className='w-full h-16 bg-[#FAFAFA] border border-outline-variant/10 rounded-2xl px-6 text-xs font-black uppercase tracking-widest text-on-surface focus:border-primary focus:bg-white outline-none appearance-none cursor-pointer'>
                  <option>Universal</option>
                  <option>Femme Restricted</option>
                  <option>Masculine Restricted</option>
                  <option>Integrated (Co-ed)</option>
                </select>
              </div>
              <div className='md:col-span-2 space-y-2'>
                <label className='text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-40 ml-1'>
                  Geographic Coordinates
                </label>
                <div className='relative'>
                   <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/20 transition-all" />
                   <input
                    className='w-full h-16 bg-[#FAFAFA] border border-outline-variant/10 rounded-2xl pl-16 pr-6 text-sm font-black text-on-surface focus:border-primary focus:bg-white outline-none transition-all placeholder:opacity-30'
                    placeholder='Sector, Block, Building, and Portal ID'
                    type='text'
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Financial Terms */}
          <section className='space-y-8'>
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                  <Wallet className="w-5 h-5 text-white" />
               </div>
               <h3 className='font-headline text-xl font-black text-on-surface tracking-tighter uppercase'>
                 Fiscal Protocol
               </h3>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div className='space-y-2'>
                <label className='text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-40 ml-1'>
                  Cycle Revenue (Rent)
                </label>
                <div className='relative flex items-center'>
                  <span className="absolute left-6 text-sm font-black text-on-surface opacity-40">₹</span>
                  <input
                    className='w-full h-16 bg-[#FAFAFA] border border-outline-variant/10 rounded-2xl pl-12 pr-6 text-sm font-black text-on-surface focus:border-primary focus:bg-white outline-none transition-all placeholder:opacity-30'
                    placeholder='0.00'
                    type='number'
                  />
                </div>
              </div>
              <div className='space-y-2'>
                <label className='text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-40 ml-1'>
                  Trust Deposit
                </label>
                <div className='relative flex items-center'>
                  <span className="absolute left-6 text-sm font-black text-on-surface opacity-40">₹</span>
                  <input
                    className='w-full h-16 bg-[#FAFAFA] border border-outline-variant/10 rounded-2xl pl-12 pr-6 text-sm font-black text-on-surface focus:border-primary focus:bg-white outline-none transition-all placeholder:opacity-30'
                    placeholder='0.00'
                    type='number'
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Image Upload */}
          <section className='space-y-8'>
             <div className="flex items-center gap-3">
               <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                  <ImagePlus className="w-5 h-5 text-white" />
               </div>
               <h3 className='font-headline text-xl font-black text-on-surface tracking-tighter uppercase'>
                 Visual Feed
               </h3>
            </div>

            <div className='flex flex-col items-center justify-center py-16 px-8 bg-[#FAFAFA] border-2 border-dashed border-outline-variant/20 rounded-[2.5rem] cursor-pointer hover:bg-white hover:border-primary/20 transition-all group'>
              <div className='w-20 h-20 bg-primary/10 rounded-[2rem] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary transition-all duration-500'>
                <UploadCloud className='w-8 h-8 text-primary group-hover:text-white transition-colors' />
              </div>
              <p className='text-xs font-black uppercase tracking-widest text-on-surface mb-2'>
                Synchronize Visual Data
              </p>
              <p className='text-[9px] font-bold uppercase tracking-widest text-on-surface-variant opacity-40'>
                Lossless JPG, PNG or WEBP (Max 10MB)
              </p>
              
              <div className="mt-8 flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-outline-variant/5 shadow-sm">
                 <Zap className="w-3 h-3 text-indigo-500" />
                 <span className='text-[8px] uppercase tracking-widest text-indigo-500 font-black'>
                    CLOUD SYNC ACTIVE
                 </span>
              </div>
            </div>
            
            <div className='grid grid-cols-3 gap-4'>
              {[1, 2, 3].map(i => (
                <div key={i} className='aspect-square rounded-2xl bg-[#FAFAFA] border border-outline-variant/5 animate-pulse flex items-center justify-center'>
                    <div className="w-4 h-4 bg-outline-variant/10 rounded-full"></div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 5: Amenities */}
          <section className='space-y-8'>
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
                  <CheckSquare className="w-5 h-5 text-white" />
               </div>
               <h3 className='font-headline text-xl font-black text-on-surface tracking-tighter uppercase'>
                 Module Utilities
               </h3>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              {amenities.map((amenity) => (
                <label
                  key={amenity}
                  className='flex items-center gap-4 cursor-pointer group p-4 bg-[#FAFAFA] rounded-2xl border border-outline-variant/5 hover:bg-white hover:border-primary/10 transition-all'
                >
                  <div className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-all ${selectedAmenities.includes(amenity) ? 'border-primary bg-primary shadow-lg shadow-primary/20' : 'border-outline-variant/20 group-hover:border-primary/30 bg-white'}`}>
                    {selectedAmenities.includes(amenity) && <CheckSquare className='w-3.5 h-3.5 text-white' />}
                  </div>
                  <input
                    className='hidden'
                    type='checkbox'
                    checked={selectedAmenities.includes(amenity)}
                    onChange={() => toggleAmenity(amenity)}
                  />
                  <span className='text-[10px] font-black uppercase tracking-widest text-on-surface opacity-80 group-hover:text-primary transition-colors'>
                    {amenity}
                  </span>
                </label>
              ))}
            </div>
          </section>
        </form>
      </div>

      {/* Footer Actions */}
      <DrawerFooter className='border-t border-outline-variant/5 px-8 py-8 shrink-0 bg-white'>
        <div className='flex flex-col sm:flex-row gap-4'>
          <DrawerClose asChild>
            <button
              type='button'
              className='flex-1 h-16 bg-[#FAFAFA] text-on-surface-variant px-8 rounded-2xl font-black text-[10px] uppercase tracking-widest text-center hover:bg-red-50 hover:text-red-600 transition-all'
            >
              Abort Entry
            </button>
          </DrawerClose>
          <button
            type='submit'
            className='flex-1 h-16 bg-on-surface text-surface px-8 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-primary transition-all shadow-2xl shadow-on-surface/20 active:scale-95'
          >
            Deploy for Sync
          </button>
        </div>
      </DrawerFooter>
    </>
  )

  return (
    <Drawer
      open={open}
      onOpenChange={onOpenChange}
      direction={isMobile ? 'bottom' : 'right'}
    >
      <DrawerContent
        className={
          isMobile
            ? 'h-[90vh] inset-x-0 bottom-0 left-0 right-0 top-auto rounded-t-[3rem] mt-0 overflow-hidden border-none'
            : 'h-screen w-1/2 min-w-[600px] max-w-[50vw] inset-y-0 right-0 left-auto bottom-0 top-0 rounded-l-[3rem] rounded-t-none border-l border-outline-variant/5 mt-0 overflow-hidden'
        }
      >
        <FormContent />
      </DrawerContent>
    </Drawer>
  )
}
