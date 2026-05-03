'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { roomsApi } from '@/lib/api'
import { Calendar } from '@/components/ui/calendar'
import 'react-day-picker/dist/style.css'
import FilterOptions, { useFilterState } from '@/components/FilterOptions'
import { FeeBadge } from '@/components/FeeBadge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { RoomCard } from '@/components/RoomCard'
import { SkeletonGrid } from '@/components/skeletons'
import { Search, ChevronLeft, ChevronRight, Tags, X, SlidersHorizontal } from 'lucide-react'

export default function HomePage() {
  const router = useRouter()
  const [showCalendar, setShowCalendar] = useState(false)
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [guestCount, setGuestCount] = useState(0)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [rooms, setRooms] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchRooms = async () => {
      setLoading(true)
      try {
        const response: any = await roomsApi.getListings()
        if (response && response.listings) {
          const mappedRooms = response.listings.map((listing: any) => ({
            id: listing._id,
            title: listing.title,
            description: listing.description,
            location:
              `${listing.address?.street || ''}, ${listing.address?.city || ''}`.replace(
                /^,\s*/,
                '',
              ),
            price: listing.rent,
            createdAt: listing.createdAt,
            deposit: listing.deposit,
            rating: listing.avgRating || 0,
            reviewCount: listing.viewCount || 0, // Fallback since reviews count isn't returned in list API
            isBookmarked: listing.isBookmarked || false,
            type: listing.roomType,
            gender: listing.genderPref,
            images: listing.photos?.length
              ? listing.photos
              : [
                  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=2340',
                  'https://images.unsplash.com/photo-1502672260266-1c1de2d93688?auto=format&fit=crop&q=80&w=2340',
                ],
            amenities: listing.amenities || [],
            owner: listing.owner || { name: 'Verified Owner' },
          }))

          if (mappedRooms.length > 0) {
            setRooms(mappedRooms)
          }
        }
      } catch (error) {
        console.error('Failed to fetch rooms:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchRooms()
  }, [])

  const filterState = useFilterState()

  const handleSearch = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    // Navigate to different search page
    router.push('/search')
  }

  return (
    <div className='min-h-full bg-white'>
      <FeeBadge />
      {/* Desktop Search Bar (Centered) - Now integrated closer to Navbar */}
      <div className='hidden md:flex justify-center px-10 pb-2 pt-0 relative bg-white border-b border-outline-variant/10'>
        {/* Desktop Expanded Search */}
        <div className='flex items-center bg-white border border-outline-variant/30 rounded-full shadow-md w-full max-w-3xl mx-auto'>
            <div className='flex-[1.5] h-14 flex items-center pl-8 pr-4 hover:bg-surface-container rounded-full cursor-pointer transition-colors'>
              <div className='w-full'>
                <div className='text-[10px] font-bold text-on-surface mb-0.5 tracking-wide uppercase'>
                  Where
                </div>
                <input
                  type='text'
                  placeholder='Search destinations'
                  className='bg-transparent border-none p-0 focus:ring-0 focus:outline-none placeholder:text-on-surface-variant text-sm text-on-surface font-medium w-full'
                />
              </div>
            </div>
            <div className='w-[1px] h-6 bg-outline-variant/40'></div>
            <div
              className='flex-1 h-14 flex items-center px-6 hover:bg-surface-container rounded-full cursor-pointer transition-colors relative'
              onClick={() => setShowCalendar(!showCalendar)}
            >
              <div>
                <div className='text-[10px] font-bold text-on-surface mb-0.5 tracking-wide uppercase'>
                  When
                </div>
                <div
                  className={`text-sm ${date ? 'text-on-surface font-medium' : 'text-on-surface-variant'}`}
                >
                  {date
                    ? date.toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })
                    : 'Add dates'}
                </div>
              </div>
            </div>
            <div className='w-[1px] h-6 bg-outline-variant/40'></div>
            <div className='flex-[1.2] h-14 flex items-center justify-between pr-2 relative group hover:bg-surface-container rounded-full transition-colors'>
              <div className='w-full h-full pl-8 pr-12 flex flex-col justify-center rounded-full'>
                <div className='text-[10px] font-bold text-on-surface mb-0.5 tracking-wide uppercase'>
                  Who
                </div>
                <input
                  type='number'
                  min='0'
                  placeholder='Add guests'
                  value={guestCount > 0 ? guestCount : ''}
                  onChange={(e) => setGuestCount(parseInt(e.target.value) || 0)}
                  className='bg-transparent border-none p-0 focus:ring-0 focus:outline-none text-sm text-on-surface placeholder:text-on-surface-variant font-medium w-full'
                />
              </div>
              <button
                onClick={handleSearch}
                className='absolute right-1.5 w-11 h-11 bg-[#FF385C] hover:bg-[#E31C5F] text-white rounded-full flex items-center justify-center transition-colors shadow-sm z-30 cursor-pointer'
              >
                <Search className='w-4.5 h-4.5' strokeWidth={3} />
              </button>
            </div>
          </div>

          {/* Calendar Dropdown */}
          {showCalendar && (
            <div className='absolute top-[80px] left-1/2 -translate-x-1/2 bg-white rounded-3xl p-6 shadow-2xl z-30 flex gap-4 border border-outline-variant/20'>
              <div className='flex flex-col items-center'>
                <div className='w-[350px] w-full flex justify-center'>
                  <Calendar
                    mode='single'
                    selected={date}
                    onSelect={(d) => {
                      setDate(d)
                      setShowCalendar(false)
                    }}
                    className='rounded-md border-0 bg-transparent w-full'
                  />
                </div>
              </div>
            </div>
          )}
          {showCalendar && (
            <div
              className='fixed inset-0 z-10'
              onClick={() => setShowCalendar(false)}
            />
          )}
        </div>

        {/* Mobile Search Pill as a Drawer */}
        <div className='md:hidden flex justify-center pb-4 pt-2 px-6'>
          <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <DrawerTrigger asChild>
              <div className='w-full bg-white border border-outline-variant/30 shadow-md rounded-[32px] flex items-center justify-center gap-3 px-5 py-3.5 cursor-pointer'>
                <Search className='w-5 h-5' strokeWidth={3} />
                <span className='text-[15px] font-semibold text-on-surface'>
                  Start your search
                </span>
              </div>
            </DrawerTrigger>
            <DrawerContent className='h-[90vh] bg-white'>
              <DrawerHeader className='border-b border-outline-variant/20 pb-4 relative'>
                <DrawerClose asChild>
                  <button className='absolute left-4 top-1/2 -translate-y-1/2 p-2 hover:bg-surface-container rounded-full transition-colors'>
                    <X className='w-5 h-5' />
                  </button>
                </DrawerClose>
                <DrawerTitle className='text-center text-lg font-bold'>
                  Filters
                </DrawerTitle>
              </DrawerHeader>
              <div className='p-6 overflow-y-auto pb-4'>
                <FilterOptions state={filterState} />
              </div>
              <DrawerFooter className='border-t border-outline-variant/20 pt-4 bg-white sticky bottom-0 flex-row justify-between'>
                <button
                  className='font-semibold underline text-on-surface-variant'
                  onClick={() => {
                    /* Clear filters logic */
                  }}
                >
                  Clear all
                </button>
                <button
                  className='bg-[#222222] text-white px-8 py-3 rounded-lg font-bold'
                  onClick={() => router.push('/search')}
                >
                  Show homes
                </button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
      </div>
      <div className='px-4 md:px-10 pb-32 pt-0'>
        {/* All Listings Section */}
        <section className='mb-12'>
          <div className='flex items-center justify-between mb-4'>
            <h2 className='text-[22px] font-semibold text-on-surface tracking-tight'>
              Explore
            </h2>
            <div className='flex gap-2'>
              <button
                className='w-8 h-8 rounded-full border border-outline-variant/50 flex items-center justify-center hover:shadow-md transition-shadow disabled:opacity-30'
                disabled
              >
                <ChevronLeft className='w-[18px] h-[18px]' strokeWidth={2} />
              </button>
              <button className='w-8 h-8 rounded-full border border-outline-variant/50 flex items-center justify-center hover:shadow-md transition-shadow'>
                <ChevronRight className='w-[18px] h-[18px]' strokeWidth={2} />
              </button>
            </div>
          </div>

          {loading ? (
            <SkeletonGrid
              count={8}
              className='grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6'
            />
          ) : (
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6'>
              {rooms.map((room) => (
                <RoomCard key={room.id} room={room} priceSuffix='/ month' />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
