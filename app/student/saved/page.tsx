'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { userApi } from '@/lib/api'
import { RoomCard } from '@/components/RoomCard'
import { AuthPrompt } from '@/components/AuthPrompt'
import { Info } from 'lucide-react'

export default function StudentSavedPage() {
  const router = useRouter()
  const { user, loading } = useAuth()
  const [savedRooms, setSavedRooms] = useState<any[]>([])
  const [fetching, setFetching] = useState(false)
  const [error, setError] = useState<any>(null)

  useEffect(() => {
    if (!user) return
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

  if (loading || fetching) {
    return (
      <div className='min-h-screen bg-white flex items-center justify-center'>
        <div className='w-8 h-8 border-4 border-[#FF385C]/20 border-t-[#FF385C] rounded-full animate-spin'></div>
      </div>
    )
  }

  return (
    <div className='bg-white min-h-full'>
      <div className='px-8 md:px-10 pb-32 pt-2'>
        {!user ? (
          <AuthPrompt
            title='Log in to view your wishlists'
            description="You can create, view, or edit wishlists once you've logged in."
          />
        ) : error?.type === 'role_mismatch' ? (
          <div className='max-w-md mx-auto text-center py-12'>
            <Info className='w-16 h-16 mx-auto text-blue-500 mb-4' />
            <h3 className='text-xl font-bold mb-2'>Student-Only Section</h3>
            <p className='text-on-surface-variant mb-4'>{error.message}</p>
            <p className='text-sm text-on-surface-variant/60'>
              You're viewing as:{' '}
              <strong className='capitalize'>{error.userRole}</strong>
            </p>
          </div>
        ) : error?.type === 'generic' ? (
          <div className='max-w-md mx-auto text-center py-12'>
            <p className='text-on-surface-variant mb-4'>{error.message}</p>
          </div>
        ) : savedRooms.length > 0 ? (
          <>
            <h1 className='text-2xl font-bold mb-6'>Saved Homes</h1>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6'>
              {savedRooms.map((room) => (
                <RoomCard key={room.id} room={room} priceSuffix='/ month' />
              ))}
            </div>
          </>
        ) : (
          <div className='py-20 text-center'>
            <h2 className='text-[20px] font-bold mb-3 text-on-surface'>
              Create your first wishlist
            </h2>
            <p className='text-[15px] text-on-surface-variant leading-relaxed opacity-70'>
              As you explore rooms, click the heart icon to save the ones you
              love.
            </p>
            <button
              onClick={() => router.push('/')}
              className='mt-8 px-8 py-3 bg-[#222222] text-white rounded-lg font-bold'
            >
              Start exploring
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
