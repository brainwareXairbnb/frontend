'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { roomsApi, userApi, adminApi } from '@/lib/api';
import { useAuth } from '@/lib/auth-context';
import ImageModal from '@/components/ImageModal';
import { RoomDetailSkeleton } from '@/components/skeletons';
import { toast } from 'sonner';
import { ConfirmationModal } from '@/components/ConfirmationModal';
import {
  ChevronLeft,
  Share,
  Heart,
  Star,
  StarHalf,
  Grip,
  Medal,
  Snowflake,
  DoorOpen,
  Flower2,
  ChevronRight,
  Infinity,
  Check,
  CalendarClock,
  Scale,
  Sparkles,
  MapPin,
  Clock,
  User,
  AlertCircle,
  X,
  CheckCircle2,
} from 'lucide-react';

interface Props {
  mode: 'student' | 'admin';
  id?: string;
}

export default function ListingDetailCommon({ mode, id }: Props) {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  
  const listingId = id || (params.id as string) || searchParams.get('id') || '';
  
  const [listing, setListing] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [imageModalIndex, setImageModalIndex] = useState(0);
  const [imageModalShowGrid, setImageModalShowGrid] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Admin Action State
  const [actionLoading, setActionLoading] = useState(false);
  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean;
    type: 'success' | 'danger' | 'warning' | 'info';
    title: string;
    message: string;
    confirmText: string;
    requiresInput: boolean;
    action: 'approve' | 'reject' | null;
  }>({
    isOpen: false,
    type: 'info',
    title: '',
    message: '',
    confirmText: 'Confirm',
    requiresInput: false,
    action: null,
  });

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        let data: any;
        if (mode === 'admin') {
          data = await adminApi.getListingById(listingId);
        } else {
          data = await roomsApi.getListingById(listingId);
        }

        if (data && data.listing) {
          const l = data.listing;
          setIsSaved(!!data.isBookmarked);
          const reviews = data.reviews || [];
          const coords = l.location?.coordinates;
          const lat = Array.isArray(coords) ? coords[1] : l.location?.lat;
          const lng = Array.isArray(coords) ? coords[0] : l.location?.lng;
          
          const mapped = {
            ...l,
            id: l._id,
            price: l.rent || l.price,
            deposit: l.deposit || 0,
            rating: l.avgRating || 0,
            reviewCount: reviews.length || l.totalReviews || 0,
            images: l.photos?.length ? l.photos : l.images?.length ? l.images : [
              'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=2340'
            ],
            reviews: reviews.map((r: any) => ({
              author: r.student?.name || 'Anonymous',
              initials: (r.student?.name || 'A').charAt(0),
              institution: 'Student',
              date: new Date(r.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
              content: r.reviewText
            })),
            lat,
            lng,
            area: l.totalBeds ? `${l.availableBeds ?? l.totalBeds} / ${l.totalBeds} Beds` : l.totalArea ? `${l.totalArea} sqft` : 'Spacious',
          };
          setListing(mapped);
        }
      } catch (error) {
        console.error('Failed to fetch listing:', error);
        toast.error('Failed to load listing details');
      } finally {
        setLoading(false);
      }
    };

    if (listingId) fetchListing();
  }, [listingId, mode]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleSave = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (mode === 'admin') return;
    if (!isAuthenticated) {
      toast.error('Please login to save listings');
      return;
    }
    try {
      setIsSaved(prev => !prev);
      if (isSaved) {
        await userApi.unsaveRoom(listingId);
      } else {
        await userApi.saveRoom(listingId);
      }
    } catch (error) {
      console.error('Failed to toggle save:', error);
      setIsSaved(prev => !prev);
    }
  };

  const handleApproveClick = () => {
    setModalConfig({
      isOpen: true,
      type: 'success',
      title: 'Approve Listing',
      message: `Are you sure you want to approve "${listing?.title}"? It will become visible to students.`,
      confirmText: 'Approve Listing',
      requiresInput: false,
      action: 'approve',
    });
  };

  const handleRejectClick = () => {
    setModalConfig({
      isOpen: true,
      type: 'danger',
      title: 'Reject Listing',
      message: `Please provide a reason for rejecting "${listing?.title}".`,
      confirmText: 'Reject Listing',
      requiresInput: true,
      action: 'reject',
    });
  };

  const handleConfirmAction = async (inputValue?: string) => {
    if (!listing) return;
    try {
      setActionLoading(true);
      if (modalConfig.action === 'approve') {
        await adminApi.approveListing(listing._id);
        toast.success('Listing Approved');
        setListing({ ...listing, status: 'approved' });
      } else if (modalConfig.action === 'reject') {
        await adminApi.rejectListing(listing._id, inputValue || 'No reason provided');
        toast.success('Listing Rejected');
        setListing({ ...listing, status: 'rejected' });
      }
    } catch (error: any) {
      toast.error('Action failed: ' + (error.message || 'Unknown error'));
    } finally {
      setActionLoading(false);
      setModalConfig({ ...modalConfig, isOpen: false });
    }
  };

  if (loading) return <RoomDetailSkeleton />;
  if (!listing) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Listing Not Found</h1>
        <button onClick={() => router.back()} className="text-primary font-bold">Go Back</button>
      </div>
    </div>
  );

  const getStatusInfo = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'approved': return { color: 'bg-emerald-50 text-emerald-600 border-emerald-200', icon: <CheckCircle2 className="w-4 h-4" />, label: 'Approved' };
      case 'rejected': return { color: 'bg-red-50 text-red-600 border-red-200', icon: <X className="w-4 h-4" />, label: 'Rejected' };
      default: return { color: 'bg-orange-50 text-orange-600 border-orange-200', icon: <AlertCircle className="w-4 h-4" />, label: 'Pending Review' };
    }
  };

  const renderStars = (rating: number, size = "w-[10px] h-[10px]") => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    return (
      <div className="flex gap-[1px]">
        {[...Array(5)].map((_, i) => {
          if (i < fullStars) return <Star key={i} className={`${size} fill-current text-on-surface`} strokeWidth={1} />;
          if (i === fullStars && hasHalfStar) return <StarHalf key={i} className={`${size} fill-current text-on-surface`} strokeWidth={1} />;
          return <Star key={i} className={`${size} text-on-surface/20`} strokeWidth={1} />;
        })}
      </div>
    );
  };

  const subLabel = `${listing.roomType || listing.type || 'Room'} \u00B7 ${listing.genderPref || listing.genderPreference || 'Any'} \u00B7 ${listing.area}`;

  return (
    <div className="bg-white min-h-full pb-24 md:pb-0">
      {/* ----------------- MOBILE STICKY HEADER ----------------- */}
      <div className={`md:hidden fixed ${mode === 'admin' ? 'top-16' : 'top-0'} w-full z-[100] transition-all duration-300 px-4 pt-2 pb-2 flex justify-between items-center ${isScrolled ? 'bg-white border-b border-outline-variant/10 shadow-sm pt-4' : 'bg-transparent'}`}>
        <button onClick={() => router.back()} className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${isScrolled ? 'bg-transparent' : 'bg-white/90 shadow-sm'}`}>
          <ChevronLeft className={`w-5 h-5 ${isScrolled ? 'text-on-surface' : 'text-black'}`} strokeWidth={2.5} />
        </button>
        <div className="flex gap-3">
          <button className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${isScrolled ? 'bg-transparent' : 'bg-white/90 shadow-sm'}`}>
            <Share className={`w-4 h-4 ${isScrolled ? 'text-on-surface' : 'text-black'}`} strokeWidth={2.5} />
          </button>
          {mode === 'student' && (
            <button
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${isScrolled ? 'bg-transparent' : 'bg-white/90 shadow-sm'}`}
              onClick={handleToggleSave}
            >
              <Heart className={`w-4 h-4 transition-colors ${isSaved ? 'fill-[#FF385C] stroke-[#FF385C]' : (isScrolled ? 'text-on-surface' : 'text-black')}`} strokeWidth={2.5} />
            </button>
          )}
        </div>
      </div>

      {/* ----------------- HERO IMAGES ----------------- */}
      <div className="md:hidden relative w-full h-[60vh]">
        <div className="flex w-full h-full overflow-x-auto snap-x snap-mandatory scrollbar-hide" onScroll={(e) => {
          const scrollLeft = e.currentTarget.scrollLeft;
          const width = e.currentTarget.offsetWidth;
          setImageModalIndex(Math.round(scrollLeft / width));
        }}>
          {listing.images.map((img: string, idx: number) => (
            <img key={idx} src={img} alt="" className="w-full h-full object-cover shrink-0 snap-center cursor-pointer" onClick={() => { setImageModalIndex(idx); setImageModalShowGrid(false); setIsImageModalOpen(true); }} />
          ))}
        </div>
        <div className="absolute bottom-10 right-4 bg-black/60 text-white text-xs px-2.5 py-1 rounded-md font-semibold tracking-wide cursor-pointer" onClick={() => { setImageModalShowGrid(true); setIsImageModalOpen(true); }}>
          {imageModalIndex + 1}/{listing.images.length}
        </div>
      </div>

      {/* ----------------- MAIN CONTENT ----------------- */}
      <main className="md:pt-28 max-w-7xl mx-auto px-0 md:px-10">
        <div className="hidden md:block mb-8">
          <div className="flex justify-between items-end mb-6">
            <h1 className="text-[26px] font-semibold text-on-surface">{listing.title}</h1>
            <div className="flex gap-4 items-center">
              {mode === 'admin' && (
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${getStatusInfo(listing.status).color}`}>
                  {getStatusInfo(listing.status).icon} {getStatusInfo(listing.status).label}
                </div>
              )}
              <button className="flex items-center gap-2 text-sm font-medium"><Share className="w-[18px] h-[18px]" /> Share</button>
              {mode === 'student' && (
                <button className="flex items-center gap-2 text-sm font-medium hover:underline" onClick={handleToggleSave}>
                  <Heart className={`w-[18px] h-[18px] transition-colors ${isSaved ? 'fill-[#FF385C] stroke-[#FF385C]' : ''}`} />
                  {isSaved ? 'Saved' : 'Save'}
                </button>
              )}
            </div>
          </div>
          <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[60vh] min-h-[400px] rounded-2xl overflow-hidden relative">
            <div className="col-span-2 row-span-2 relative group cursor-pointer" onClick={() => { setImageModalIndex(0); setImageModalShowGrid(false); setIsImageModalOpen(true); }}>
              <img src={listing.images[0]} className="w-full h-full object-cover group-hover:brightness-90 transition-all duration-300" alt="" />
            </div>
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="relative group cursor-pointer" onClick={() => { setImageModalIndex(i); setImageModalShowGrid(false); setIsImageModalOpen(true); }}>
                <img src={listing.images[i] || listing.images[0]} className="w-full h-full object-cover group-hover:brightness-90 transition-all duration-300" alt="" />
              </div>
            ))}
            <button className="absolute bottom-6 right-6 bg-white px-4 py-1.5 rounded-lg border border-black flex items-center gap-2 text-sm font-semibold shadow-sm hover:bg-gray-50" onClick={() => { setImageModalShowGrid(true); setIsImageModalOpen(true); }}>
              <Grip className="w-[18px] h-[18px]" /> Show all photos
            </button>
          </div>
        </div>

        <div className="bg-white rounded-t-3xl -mt-6 md:mt-0 relative z-20 px-6 pt-6 md:px-0 md:pt-0 flex flex-col md:flex-row gap-0 md:gap-20">
          <div className="md:w-[60%] flex-1">
            <div className="mb-6 md:mb-8 pb-8 border-b border-outline-variant/30">
              <h1 className="text-[28px] md:text-xl font-bold md:font-semibold text-on-surface leading-tight mb-1">
                {listing.title}
              </h1>
              <h2 className="text-base font-semibold text-on-surface-variant mb-2">
                {listing.address?.city || listing.location?.split(',')[0]}, {listing.address?.state || ''}
              </h2>
              <p className="text-[15px] md:text-base text-on-surface-variant">
                {subLabel}
              </p>
            </div>

            {/* Favorite / Badge Area */}
            {listing.rating > 0 && (
               <div className="flex justify-between items-center border border-outline-variant/30 rounded-2xl p-4 mb-8 shadow-sm">
                 <div className="text-center pr-4 border-r border-outline-variant/30">
                   <div className="text-lg font-bold">{listing.rating}</div>
                   <div className="flex justify-center mt-0.5">{renderStars(listing.rating)}</div>
                 </div>
                 <div className="text-center flex-1 px-2 flex flex-col items-center">
                    {listing.rating >= 4.5 ? <Medal className="w-6 h-6 mb-1" /> : <Sparkles className="w-6 h-6 mb-1" />}
                    <span className="text-xs font-semibold">{listing.rating >= 4.5 ? 'Student favorite' : 'Well rated'}</span>
                 </div>
                 <div className="text-center pl-4 border-l border-outline-variant/30">
                   <div className="text-lg font-bold">{listing.reviewCount}</div>
                   <div className="text-[10px] mt-0.5 font-semibold">Reviews</div>
                 </div>
               </div>
            )}

            {/* Owner Section */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-surface-container overflow-hidden">
                <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${listing.owner?.name}`} className="w-full h-full object-cover" alt="" />
              </div>
              <div>
                <h3 className="font-semibold text-base md:text-lg">Hosted by {listing.owner?.name}</h3>
                <p className="text-sm text-on-surface-variant">Property Owner</p>
              </div>
            </div>

            <div className="w-full h-[1px] bg-outline-variant/20 mb-8" />

            {/* Description */}
            <div className="pb-8 border-b border-outline-variant/20 mb-8">
              <h3 className="text-[22px] font-semibold mb-4">About this place</h3>
              <p className="text-[15px] md:text-base text-on-surface leading-relaxed whitespace-pre-line">{listing.description}</p>
            </div>

            {/* Amenities */}
            <div className="pb-8 border-b border-outline-variant/20 mb-8">
              <h3 className="text-[22px] font-semibold mb-6">What this place offers</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
                {(showAllAmenities ? listing.amenities : listing.amenities?.slice(0, 6))?.map((a: string, i: number) => (
                  <div key={i} className="flex gap-4 items-center">
                    <Check className="w-6 h-6 opacity-60" />
                    <span className="text-[15px] md:text-base">{a}</span>
                  </div>
                ))}
              </div>
              {listing.amenities?.length > 6 && (
                <button onClick={() => setShowAllAmenities(!showAllAmenities)} className="mt-8 px-6 py-3 border border-black rounded-lg font-semibold hover:bg-gray-50">
                  {showAllAmenities ? 'Show fewer' : `Show all ${listing.amenities.length} amenities`}
                </button>
              )}
            </div>

            {/* Map */}
            <div className="pb-8 border-b border-outline-variant/20 mb-8">
              <h3 className="text-[22px] font-semibold mb-4">Location</h3>
              <div className="w-full h-[300px] md:h-[400px] bg-surface-container rounded-2xl overflow-hidden relative">
                {listing.lat && listing.lng ? (
                   <iframe title="map" className="w-full h-full border-0" src={`https://www.openstreetmap.org/export/embed.html?bbox=${listing.lng-0.01}%2C${listing.lat-0.01}%2C${listing.lng+0.01}%2C${listing.lat+0.01}&layer=mapnik&marker=${listing.lat}%2C${listing.lng}`} />
                ) : <div className="flex items-center justify-center h-full text-on-surface-variant">Map location not available</div>}
              </div>
            </div>
            
            {/* Reviews (Only if exist) */}
            {listing.reviews?.length > 0 && (
              <div className="pb-8">
                <h3 className="text-[22px] font-semibold mb-6">Student Reviews</h3>
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                  {listing.reviews.map((r: any, i: number) => (
                    <div key={i} className="min-w-[280px] border border-outline-variant/30 rounded-2xl p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-surface-container rounded-full flex items-center justify-center font-bold">{r.initials}</div>
                        <div>
                          <div className="font-semibold text-sm">{r.author}</div>
                          <div className="text-xs text-on-surface-variant">{r.date}</div>
                        </div>
                      </div>
                      <p className="text-sm line-clamp-3 italic">"{r.content}"</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN (DESKTOP) */}
          <div className="hidden md:block w-[35%] relative">
             <div className="sticky top-28 bg-white border border-outline-variant/30 rounded-2xl p-6 shadow-lg">
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-2xl font-bold">₹{listing.price?.toLocaleString('en-IN')}</span>
                  <span className="text-on-surface-variant">/ month</span>
                </div>
                {mode === 'student' ? (
                  <>
                    <button className="w-full bg-[#E51D53] text-white py-3.5 rounded-lg font-bold mb-4">Request to book</button>
                    <p className="text-center text-xs text-on-surface-variant">You won't be charged yet</p>
                  </>
                ) : (
                  <div className="flex flex-col gap-3">
                    <button onClick={handleApproveClick} disabled={actionLoading} className="w-full bg-emerald-600 text-white py-3 rounded-lg font-bold disabled:opacity-50">Approve</button>
                    <button onClick={handleRejectClick} disabled={actionLoading} className="w-full border border-red-600 text-red-600 py-3 rounded-lg font-bold disabled:opacity-50">Reject</button>
                  </div>
                )}
             </div>
          </div>
        </div>
      </main>

      {/* MOBILE ACTIONS */}
      <div className="md:hidden fixed bottom-0 w-full bg-white border-t border-outline-variant/20 px-6 py-4 flex justify-between items-center z-40">
        {mode === 'student' ? (
          <>
            <div>
              <div className="font-bold text-lg">₹{listing.price?.toLocaleString('en-IN')} <span className="text-sm font-normal opacity-70">/ mo</span></div>
              <p className="text-xs text-on-surface-variant">Available now</p>
            </div>
            <button className="bg-[#E51D53] text-white px-8 py-3 rounded-lg font-bold">Reserve</button>
          </>
        ) : (
          <div className="flex gap-3 w-full">
            <button onClick={handleRejectClick} disabled={actionLoading} className="flex-1 border border-red-600 text-red-600 py-3 rounded-lg font-bold">Reject</button>
            <button onClick={handleApproveClick} disabled={actionLoading} className="flex-1 bg-emerald-600 text-white py-3 rounded-lg font-bold">Approve</button>
          </div>
        )}
      </div>

      <ImageModal images={listing.images} isOpen={isImageModalOpen} onClose={() => setIsImageModalOpen(false)} initialIndex={imageModalIndex} showGrid={imageModalShowGrid} />
      <ConfirmationModal {...modalConfig} onConfirm={handleConfirmAction} onClose={() => setModalConfig({ ...modalConfig, isOpen: false })} />
    </div>
  );
}
