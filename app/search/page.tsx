'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { roomsApi } from '@/lib/api'
import { rooms as staticRooms } from '@/data/rooms'
import { Calendar } from '@/components/ui/calendar'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'

import 'react-day-picker/dist/style.css'
import FilterOptions, { useFilterState } from '@/components/FilterOptions'
import { RoomCard } from '@/components/RoomCard'
import { Search, X, SlidersHorizontal } from 'lucide-react'

import { Suspense } from 'react'

function SearchContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [showCalendar, setShowCalendar] = useState(false)
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [guestCount, setGuestCount] = useState(0)
  const [isDrawerOpen, setIsDrawerOpen] = useState(searchParams.get('filter') === 'open')
  const [rooms, setRooms] = useState<any[]>(staticRooms)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response: any = await roomsApi.getListings({
          search: searchParams.get('q') || undefined,
          roomType: searchParams.get('type') || undefined,
          gender: searchParams.get('gender') || undefined,
        });
        if (response && response.listings) {
          setRooms(response.listings);
        }
      } catch (error) {
        console.error('Failed to fetch rooms:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, [searchParams]);

  const filterState = useFilterState()
  const { priceRange, distance, selectedType, selectedGender, selectedFurnishing, selectedAmenities, availableNow, minRating } = filterState

  const handleSearch = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    router.push('/search')
  }

  return (
    <div className='min-h-screen bg-white'>
      <header className='w-full bg-white relative z-40 shadow-[0_1px_12px_rgba(0,0,0,0.08)] -mt-1'>
        {/* Desktop Search Pill */}

        {/* Desktop Search Pill */}
        <div className='hidden md:flex justify-center pb-6 pt-4'>
          <div className='flex items-center bg-white border border-outline-variant/30 shadow-md rounded-full max-w-[850px] w-full relative z-20'>
            <div className='flex-1 h-16 flex flex-col justify-center px-8 hover:bg-surface-container rounded-full cursor-pointer transition-colors'>
              <div className='text-[11px] font-bold text-on-surface mb-0.5 tracking-wide'>Where</div>
              <input type='text' placeholder='Search destinations' className='bg-transparent border-none p-0 focus:ring-0 text-[13px] text-on-surface placeholder:text-on-surface-variant font-medium' />
            </div>
            <div className='w-[1px] h-8 bg-outline-variant/40'></div>
            <div 
              className='flex-1 h-16 flex flex-col justify-center px-8 hover:bg-surface-container rounded-full cursor-pointer transition-colors relative'
              onClick={() => setShowCalendar(!showCalendar)}
            >
              <div className='text-[11px] font-bold text-on-surface mb-0.5 tracking-wide'>When</div>
              <div className='text-[13px] text-on-surface-variant w-full focus:outline-none bg-transparent'>
                {date ? date.toLocaleDateString() : 'Add dates'}
              </div>
            </div>
            <div className='w-[1px] h-8 bg-outline-variant/40'></div>
            <div className='flex-[1.2] h-16 flex items-center justify-between pr-2 relative group hover:bg-surface-container rounded-full transition-colors'>
              <div className='w-full h-full pl-8 pr-[140px] flex flex-col justify-center rounded-full'>
                <div className='text-[11px] font-bold text-on-surface mb-0.5 tracking-wide'>Who</div>
                <input 
                  type='number' 
                  min='0'
                  placeholder='Add guests' 
                  value={guestCount > 0 ? guestCount : ''}
                  onChange={(e) => setGuestCount(parseInt(e.target.value) || 0)}
                  className='bg-transparent border-none p-0 focus:ring-0 focus:outline-none border-transparent focus:border-transparent ring-0 shadow-none text-[13px] text-on-surface placeholder:text-on-surface-variant font-medium w-full'
                />
              </div>
              <button onClick={handleSearch} className='absolute right-2 h-12 bg-[#FF385C] hover:bg-[#E31C5F] text-white px-6 rounded-full flex items-center justify-center gap-2 transition-colors shadow-sm z-30 cursor-pointer pointer-events-auto'>
                <Search className='w-5 h-5 pointer-events-none' strokeWidth={3} />
                <span className='font-semibold text-[15px] pointer-events-none'>Search</span>
              </button>
            </div>
          </div>
          {/* Calendar Dropdown */}
          {showCalendar && (
            <div className='absolute top-[90px] left-1/2 -translate-x-1/2 bg-white rounded-3xl p-6 shadow-2xl z-30 flex gap-4 border border-outline-variant/20'>
              <div className='flex flex-col items-center'>
                <div className='flex bg-surface-container rounded-full p-1 mb-6'>
                  <button className='px-6 py-2 bg-white rounded-full font-semibold shadow-sm text-sm'>Dates</button>
                  <button className='px-6 py-2 rounded-full font-semibold text-on-surface-variant hover:text-on-surface text-sm'>Flexible</button>
                </div>
                <div className='w-[350px] w-full flex justify-center'>
                  <Calendar
                    mode='single'
                    selected={date}
                    onSelect={(d) => { setDate(d); setShowCalendar(false); }}
                    className='rounded-md border-0 bg-transparent w-full'
                  />
                </div>
                <div className='flex gap-2 mt-4'>
                  {['Exact dates', '± 1 day', '± 2 days', '± 3 days', '± 7 days', '± 14 days'].map((range, i) => (
                    <button key={i} className={`px-4 py-1.5 rounded-full border border-outline-variant/40 text-sm font-medium ${i===0?'bg-surface-container':''}`}>{range}</button>
                  ))}
                </div>
              </div>
            </div>
          )}
          {showCalendar && (
            <div className='fixed inset-0 z-10' onClick={() => setShowCalendar(false)} />
          )}
        </div>

        {/* Mobile Search Pill */}
        <div className='md:hidden flex justify-center pb-4 pt-2 px-6'>
           <div className='w-full bg-white border border-outline-variant/30 shadow-md rounded-[32px] flex items-center justify-center gap-3 px-5 py-3.5 cursor-pointer' onClick={() => setIsDrawerOpen(true)}>
             <Search className='w-5 h-5 text-on-surface' strokeWidth={3} />
             <span className='text-[15px] font-semibold text-on-surface'>Start your search</span>
           </div>
        </div>
      </header>

      <main className='flex relative -mt-5'>
        {/* Left Side Filters Bar (Desktop) */}
        <aside className='hidden lg:block w-[360px] shrink-0 h-[calc(100vh-140px)] overflow-y-auto sticky top-[140px] p-6 border-r border-outline-variant/20 bg-white'>
          <h2 className='text-xl font-bold mb-6 pb-4 border-b border-outline-variant/30'>Filters</h2>
          <FilterOptions state={filterState} />
        </aside>

        {/* Right side Grid */}
        <section className='flex-1 p-4 lg:p-8 pb-32'>
          <p className='text-sm font-semibold mb-6 hidden md:block'>Over 1,000 homes</p>
          
          <div className='grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-6'>
            {rooms.map((room) => (
              <RoomCard 
                key={room.id}
                room={room}
                subtitle={room.distanceToCampus}
                dateStr="19-24 Apr"
                priceSuffix={<span className='hidden sm:inline'>for 5 nights</span>}
                showReviewCount={true}
              />
            ))}
          </div>
        </section>
      </main>

      {/* Floating Mobile Filter Button */}
      <div className='lg:hidden fixed bottom-[110px] left-1/2 -translate-x-1/2 z-40'>
        <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
          <DrawerTrigger asChild>
            <button className='bg-[#222222] text-white px-5 py-3 rounded-full shadow-lg font-bold flex items-center gap-2 hover:scale-105 transition-transform'>
              <span>Filters</span>
              <SlidersHorizontal className='w-[18px] h-[18px]' />
            </button>
          </DrawerTrigger>
          <DrawerContent className='h-[90vh] bg-white'>
            <DrawerHeader className='border-b border-outline-variant/20 pb-4 relative'>
              <DrawerClose asChild>
                <button className='absolute left-4 top-1/2 -translate-y-1/2 p-2 hover:bg-surface-container rounded-full transition-colors'>
                  <X className='w-5 h-5' />
                </button>
              </DrawerClose>
              <DrawerTitle className='text-center text-lg font-bold'>Filters</DrawerTitle>
            </DrawerHeader>
            <div className='p-6 overflow-y-auto pb-4'>
              <FilterOptions state={filterState} />
            </div>
            <DrawerFooter className='border-t border-outline-variant/20 pt-4 bg-white sticky bottom-0 flex-row justify-between'>
              <button className='font-semibold underline text-on-surface-variant' onClick={() => {/* Clear logic */}}>Clear all</button>
              <DrawerClose asChild>
                <button className='bg-[#222222] text-white px-8 py-3 rounded-lg font-bold'>Show homes</button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>

    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Search className="w-8 h-8 text-primary animate-pulse" />
      </div>
    }>
      <SearchContent />
    </Suspense>
  )
}
