'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { rooms as staticRooms } from '@/data/rooms'
import { Calendar } from '@/components/ui/calendar'
import 'react-day-picker/dist/style.css'
import FilterOptions, { useFilterState } from '@/components/FilterOptions'
import { FeeBadge } from '@/components/FeeBadge'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { RoomCard } from '@/components/RoomCard'
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Tags,
  X
} from 'lucide-react'

export default function HomePage() {
  const router = useRouter()
  const [showCalendar, setShowCalendar] = useState(false)
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [guestCount, setGuestCount] = useState(0)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [rooms, setRooms] = useState<any[]>(staticRooms)
  const [loading, setLoading] = useState(false)

  // Dynamic fetch is disabled to use high-fidelity dummy data
  // useEffect(() => {
  //   const fetchRooms = async () => {
  //     try {
  //       const response: any = await roomsApi.getListings();
  //       if (response && response.listings) {
  //         setRooms(response.listings);
  //       }
  //     } catch (error) {
  //       console.error('Failed to fetch rooms:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchRooms();
  // }, []);

  const filterState = useFilterState()

  const handleSearch = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    // Navigate to different search page
    router.push('/search')
  }

  // Group rooms for different sections to mimic Airbnb layout
  const topRooms = rooms.slice(0, 4)
  const nextRooms = rooms.slice(2, 6)

  return (
    <div className='min-h-screen bg-white'>
      <FeeBadge />
      <header className='w-full bg-white relative z-40 shadow-[0_1px_12px_rgba(0,0,0,0.08)]'>
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
                    <button key={i} className={`px-4 py-1.5 rounded-full border border-outline-variant/40 text-sm font-medium ${i === 0 ? 'bg-surface-container' : ''}`}>{range}</button>
                  ))}
                </div>
              </div>
            </div>
          )}
          {showCalendar && (
            <div className='fixed inset-0 z-10' onClick={() => setShowCalendar(false)} />
          )}
        </div>

        {/* Mobile Search Pill as a Drawer */}
        <div className='md:hidden flex justify-center pb-4 pt-2 px-6'>
          <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <DrawerTrigger asChild>
              <div className='w-full bg-white border border-outline-variant/30 shadow-md rounded-[32px] flex items-center justify-center gap-3 px-5 py-3.5 cursor-pointer'>
                <Search className='w-5 h-5' strokeWidth={3} />
                <span className='text-[15px] font-semibold text-on-surface'>Start your search</span>
              </div>
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
                <button className='font-semibold underline text-on-surface-variant' onClick={() => {
                  /* Clear filters logic */
                }}>Clear all</button>
                <button className='bg-[#222222] text-white px-8 py-3 rounded-lg font-bold' onClick={() => router.push('/search')}>Show homes</button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </header>

      <main className='px-4 md:px-10 pb-32 pt-8'>
        {/* Section 1 */}
        <section className='mb-12'>
          <div className='flex items-center justify-between mb-4'>
            <h2 className='text-[22px] font-semibold text-on-surface tracking-tight'>
              Popular homes in North 24 Parganas
            </h2>
            <div className='flex gap-2'>
              <button className='w-8 h-8 rounded-full border border-outline-variant/50 flex items-center justify-center hover:shadow-md transition-shadow disabled:opacity-30' disabled>
                <ChevronLeft className='w-[18px] h-[18px]' strokeWidth={2} />
              </button>
              <button className='w-8 h-8 rounded-full border border-outline-variant/50 flex items-center justify-center hover:shadow-md transition-shadow'>
                <ChevronRight className='w-[18px] h-[18px]' strokeWidth={2} />
              </button>
            </div>
          </div>

          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6'>
            {topRooms.map((room) => (
              <RoomCard
                key={room.id}
                room={room}
                priceSuffix="for 2 nights"
              />
            ))}
          </div>
        </section>

        {/* Section 2 */}
        <section>
          <div className='flex items-center justify-between mb-4'>
            <h2 className='text-[22px] font-semibold text-on-surface tracking-tight'>
              Available next month in Bengaluru
            </h2>
            <div className='flex gap-2'>
              <button className='w-8 h-8 rounded-full border border-outline-variant/50 flex items-center justify-center hover:shadow-md transition-shadow disabled:opacity-30' disabled>
                <ChevronLeft className='w-[18px] h-[18px]' strokeWidth={2} />
              </button>
              <button className='w-8 h-8 rounded-full border border-outline-variant/50 flex items-center justify-center hover:shadow-md transition-shadow'>
                <ChevronRight className='w-[18px] h-[18px]' strokeWidth={2} />
              </button>
            </div>
          </div>

          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6'>
            {nextRooms.map((room) => (
              <RoomCard
                key={room.id}
                room={room}
                imageIndex={1}
                priceSuffix="for 2 nights"
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
