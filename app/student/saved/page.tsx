'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { userApi } from '@/lib/api'
import { RoomCard } from '@/components/RoomCard'
import { SkeletonGrid, Skeleton } from '@/components/skeletons'

export default function StudentSavedPage() {
  const router = useRouter()
  const { user, loading } = useAuth()
  const [savedRooms, setSavedRooms] = useState<any[]>([])
  const [fetching, setFetching] = useState(true)
  const [error, setError] = useState<any>(null)

  useEffect(() => {

    const fetchSaved = async () => {
      setFetching(true)
      setError(null)
      try {
        const response: any = await userApi.getSavedRooms()
        if (response && response.listings) {
          const mapped = response.listings.map((l: any) => ({
            id: l._id,
            title: l.title,
            description: l.description,
            location:
              `${l.address?.street || ''}, ${l.address?.city || ''}`.replace(
                /^,\s*/,
                '',
              ),
            price: l.rent,
            createdAt: l.createdAt,
            deposit: l.deposit || 0,
            rating: l.avgRating || 0,
            reviewCount: l.viewCount || 0,
            isBookmarked: true,
            type: l.roomType,
            gender: l.genderPref,
            images: l.photos?.length
              ? l.photos
              : [
                'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=2340',
              ],
            amenities: l.amenities || [],
            owner: l.owner || { name: 'Verified Owner' },
          }))
          setSavedRooms(mapped)
        }
      } catch (err: any) {
        console.error('Failed to fetch saved rooms:', err)
        if (err?.isForbidden || err?.status === 403) {
          setError({
            type: 'role_mismatch',
            message: 'This section is only available for student accounts.',
            userRole: user?.role,
          })
        } else {
          setError({
            type: 'generic',
            message: 'Failed to load saved rooms. Please try again later.',
          })
        }
      } finally {
        setFetching(false)
      }
    }
    fetchSaved()
  }, [user])



  return (
    <div className='bg-slate-50 min-h-screen'>
      {/* Airbnb Style Header */}
      <div className='sticky top-[env(safe-area-inset-top)] z-30 bg-white/80 backdrop-blur-xl border-b border-black/5'>
        <div className='max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-4 md:py-6'>
          <h1 className='text-3xl md:text-5xl font-semibold tracking-tight text-neutral-900'>
            Wishlists
          </h1>
          <p className='mt-2 text-sm md:text-base text-neutral-500'>
            Explore your favorite places to stay and properties
          </p>
        </div>
      </div>

      <div className='min-h-screen bg-[#f7f7f7]'>
        <div className='max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8'>
        {loading || fetching ? (
          <div className='pt-4'>
            <SkeletonGrid count={8} className='grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6' />
          </div>
        ) : error?.type === 'generic' ? (
          <div className='max-w-md mx-auto text-center py-12'>
            <p className='text-on-surface-variant mb-4'>{error.message}</p>
          </div>
        ) : savedRooms.length > 0 ? (
          <>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 pt-4'>
              {savedRooms.map((room) => (
                <RoomCard key={room.id} room={room} priceSuffix='/ month' />
              ))}
            </div>
          </>
        ) : (
          <div className='flex flex-col pt-8 pb-24'>
            <div className='max-w-md'>
              <h2 className='text-[22px] font-semibold mb-3 text-gray-900'>
                Create your first wishlist
              </h2>
              <p className='text-[15px] text-gray-500 leading-relaxed mb-8'>
                As you search, tap the heart icon to save your favorite places to stay or things to do to a wishlist.
              </p>
              <button
                onClick={() => router.push('/')}
                className='px-6 py-3.5 bg-gray-900 hover:bg-black text-white rounded-lg font-semibold text-[15px] transition-colors'
              >
                Start exploring
              </button>
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  )
}
