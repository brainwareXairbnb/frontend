'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { roomsApi, userApi } from '@/lib/api';
import { useAuth } from '@/lib/auth-context';
import ImageModal from '@/components/ImageModal';
import { RoomDetailSkeleton } from '@/components/skeletons';

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
  Armchair,
  Smile,
  Sparkles,
  Check,
  CalendarClock,
  Scale,
  ChevronDown
} from 'lucide-react';
import { toast } from 'sonner';

export default function RoomDetailClient() {
  const params = useParams();
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const roomIdStr = params.id as string;
  const [room, setRoom] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [imageModalIndex, setImageModalIndex] = useState(0);
  const [imageModalShowGrid, setImageModalShowGrid] = useState(false);

  const handleToggleSave = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
      toast.error('Please login to save listings');
      return;
    }
    if (user?.role !== 'student') return;
    try {
      setIsSaved(prev => !prev);
      if (isSaved) {
        await userApi.unsaveRoom(roomIdStr);
      } else {
        await userApi.saveRoom(roomIdStr);
      }
    } catch (error) {
      console.error('Failed to toggle save:', error);
      setIsSaved(prev => !prev); // revert
    }
  };

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const data: any = await roomsApi.getListingById(roomIdStr);
        if (data && data.listing) {
          const l = data.listing;
          setIsSaved(!!data.isBookmarked);
          const reviews = data.reviews || [];
          const coords = l.location?.coordinates; // [lng, lat] GeoJSON order
          const lat = coords?.[1];
          const lng = coords?.[0];
          const mappedRoom = {
            id: l._id,
            title: l.title,
            description: l.description,
            location: `${l.address?.street || ''}, ${l.address?.city || ''}`.replace(/^,\s*/, ''),
            price: l.rent,
            deposit: l.deposit || 0,
            rating: l.avgRating || 0,
            reviewCount: reviews.length,
            type: l.roomType,
            gender: l.genderPref,
            images: l.photos?.length ? l.photos : [
              'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=2340',
              'https://images.unsplash.com/photo-1502672260266-1c1de2d93688?auto=format&fit=crop&q=80&w=2340',
              'https://images.unsplash.com/photo-1522771731478-44eb10e5c60c?auto=format&fit=crop&q=80&w=2340'
            ],
            amenities: l.amenities || [],
            owner: l.owner || { name: 'Verified Owner' },
            hostingSince: l.owner?.roleUpgradeRequest?.reviewedAt || null,
            reviews: reviews.map((r: any) => ({
              author: r.student?.name || 'Anonymous',
              initials: (r.student?.name || 'A').charAt(0),
              institution: 'Student',
              date: new Date(r.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
              content: r.reviewText
            })),
            lat,
            lng,
            area: l.totalBeds ? `${l.availableBeds ?? l.totalBeds} / ${l.totalBeds} Beds` : 'Spacious',
            availableFrom: l.availableFrom || null,
            houseRules: l.houseRules || [],
          };
          setRoom(mappedRoom);
        } else {
          throw new Error("Invalid format");
        }
      } catch (error) {
        console.error('Failed to fetch room detail:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRoom();
  }, [roomIdStr]);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBooking = () => {
    toast.warning('Under development...');
  }

  if (loading) {
    return <RoomDetailSkeleton />;
  }

  // If room not found, show error
  if (!room) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-on-surface mb-4">Room Not Found</h1>
          <p className="text-on-surface-variant mb-8">The room you&apos;re looking for doesn&apos;t exist.</p>
          <Link
            href="/"
            className="bg-[#E51D53] text-white px-8 py-3 rounded-full font-bold hover:opacity-90 transition-all inline-block"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

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

  const roomSubLabel = `${room.type} \u00B7 ${room.gender === 'boys' ? 'Boys' : room.gender === 'girls' ? 'Girls' : 'Co-ed'} \u00B7 ${room.area}`;

  return (
    <div className="bg-white min-h-screen pb-24 md:pb-0">

      {/* ----------------- MOBILE STICKY HEADER ----------------- */}
      <div className={`md:hidden fixed top-0 w-full z-[100] transition-all duration-300 px-4 pt-2 pb-2 flex justify-between items-center ${isScrolled ? 'bg-white border-b border-outline-variant/10 shadow-sm pt-4' : 'bg-transparent'}`}>
        <Link href="/">
          <button className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${isScrolled ? 'bg-transparent' : 'bg-white/90 shadow-sm'}`}>
            <ChevronLeft className={`w-5 h-5 ${isScrolled ? 'text-on-surface' : 'text-black'}`} strokeWidth={2.5} />
          </button>
        </Link>
        <div className="flex gap-3">
          <button className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${isScrolled ? 'bg-transparent' : 'bg-white/90 shadow-sm'}`}>
            <Share className={`w-4 h-4 ${isScrolled ? 'text-on-surface' : 'text-black'}`} strokeWidth={2.5} />
          </button>
          <button
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${isScrolled ? 'bg-transparent' : 'bg-white/90 shadow-sm'}`}
            onClick={handleToggleSave}
          >
            <Heart
              className={`w-4 h-4 transition-colors ${isSaved ? 'fill-[#FF385C] stroke-[#FF385C]' : (isScrolled ? 'text-on-surface' : 'text-black')}`}
              strokeWidth={2.5}
            />
          </button>
        </div>
      </div>

      {/* ----------------- MOBILE HERO CAROUSEL ----------------- */}
      <div className="md:hidden relative w-full h-[60vh]">
        <div
          className="flex w-full h-full overflow-x-auto snap-x snap-mandatory scrollbar-hide"
          onScroll={(e) => {
            const scrollLeft = e.currentTarget.scrollLeft;
            const width = e.currentTarget.offsetWidth;
            setActiveImageIndex(Math.round(scrollLeft / width));
          }}
        >
          {room.images.map((img: string, idx: number) => (
            <img
              key={idx}
              src={img}
              alt={room.title}
              className="w-full h-full object-cover shrink-0 snap-center cursor-pointer"
              onClick={() => {
                setImageModalIndex(idx);
                setImageModalShowGrid(false);
                setIsImageModalOpen(true);
              }}
            />
          ))}
        </div>

        {/* Image Indicator */}
        <div
          className="absolute bottom-10 right-4 bg-black/60 text-white text-xs px-2.5 py-1 rounded-md font-semibold tracking-wide cursor-pointer"
          onClick={() => {
            setImageModalShowGrid(true);
            setIsImageModalOpen(true);
          }}
        >
          {activeImageIndex + 1}/{room.images.length}
        </div>
      </div>



      {/* ----------------- MAIN CONTENT (MOBILE & DESKTOP) ----------------- */}
      <main className="md:pt-28 max-w-7xl mx-auto px-0 md:px-10">

        {/* DESKTOP TITLE & IMAGE GALLERY (Hidden on Mobile) */}
        <div className="hidden md:block mb-8">
          <div className="flex justify-between items-end mb-6">
            <h1 className="text-[26px] font-semibold text-on-surface">
              {room.title}
            </h1>
            <div className="flex gap-4">
              <button className="flex items-center gap-2 text-sm font-medium"><Share className="w-[18px] h-[18px]" strokeWidth={2} /> Share</button>
              <button
                className="flex items-center gap-2 text-sm font-medium hover:underline"
                onClick={handleToggleSave}
              >
                <Heart
                  className={`w-[18px] h-[18px] transition-colors ${isSaved ? 'fill-[#FF385C] stroke-[#FF385C]' : ''}`}
                  strokeWidth={2}
                />
                {isSaved ? 'Saved' : 'Save'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[60vh] min-h-[400px] rounded-2xl overflow-hidden relative">
            <div
              className="col-span-2 row-span-2 relative group cursor-pointer"
              onClick={() => {
                setImageModalIndex(0);
                setImageModalShowGrid(false);
                setIsImageModalOpen(true);
              }}
            >
              <img src={room.images[0]} className="w-full h-full object-cover group-hover:brightness-90 transition-all duration-300" alt="Room primary" />
            </div>
            <div
              className="relative group cursor-pointer"
              onClick={() => {
                setImageModalIndex(1);
                setImageModalShowGrid(false);
                setIsImageModalOpen(true);
              }}
            >
              <img src={room.images[1]} className="w-full h-full object-cover group-hover:brightness-90 transition-all duration-300" alt="Room" />
            </div>
            <div
              className="relative group cursor-pointer"
              onClick={() => {
                setImageModalIndex(2);
                setImageModalShowGrid(false);
                setIsImageModalOpen(true);
              }}
            >
              <img src={room.images[2]} className="w-full h-full object-cover group-hover:brightness-90 transition-all duration-300" alt="Room" />
            </div>
            <div
              className="relative group cursor-pointer"
              onClick={() => {
                setImageModalIndex(3);
                setImageModalShowGrid(false);
                setIsImageModalOpen(true);
              }}
            >
              <img src={room.images[3] || room.images[0]} className="w-full h-full object-cover group-hover:brightness-90 transition-all duration-300" alt="Room" />
            </div>
            <div
              className="relative group cursor-pointer"
              onClick={() => {
                setImageModalIndex(4);
                setImageModalShowGrid(false);
                setIsImageModalOpen(true);
              }}
            >
              <img src={room.images[4] || room.images[1]} className="w-full h-full object-cover group-hover:brightness-90 transition-all duration-300" alt="Room" />
            </div>
            <button
              className="absolute bottom-6 right-6 bg-white px-4 py-1.5 rounded-lg border border-black flex items-center gap-2 text-sm font-semibold shadow-sm hover:bg-gray-50"
              onClick={() => {
                setImageModalShowGrid(true);
                setIsImageModalOpen(true);
              }}
            >
              <Grip className="w-[18px] h-[18px]" strokeWidth={2} />
              Show all photos
            </button>
          </div>
        </div>

        {/* CONTAINER FOR BOTH (SLIDING UP ON MOBILE) */}
        <div className="bg-white rounded-t-3xl -mt-6 md:mt-0 relative z-20 px-6 pt-6 md:px-0 md:pt-0 flex flex-col md:flex-row gap-0 md:gap-20">

          {/* LEFT CONTENT COLUMN */}
          <div className="md:w-[60%] flex-1">

            {/* Mobile Title (Hidden on Desktop) */}
            <div className="md:hidden mb-6">
              <h1 className="text-[28px] font-semibold text-on-surface leading-tight mb-1">
                {room.title}
              </h1>
              <h2 className="text-base font-semibold text-on-surface-variant mb-2">
                {room.location}
              </h2>
              <p className="text-[15px] text-on-surface-variant">
                {roomSubLabel}
              </p>
            </div>

            {/* Desktop Room Sublabel */}
            <div className="hidden md:block mb-8 pb-8 border-b border-outline-variant/30 text-xl font-semibold">
              <h2 className="mb-2">{room.location} hosted by {room.owner.name}</h2>
              <p className="text-base font-normal text-on-surface-variant">{roomSubLabel}</p>
            </div>

            {/* Mobile Rating / Favorite Badge Row (Similar to Desktop's, but styled for Image) */}
            <div className="md:hidden flex justify-between items-center border border-outline-variant/30 rounded-2xl p-4 mb-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
              <div className="text-center pr-4 border-r border-outline-variant/30">
                <div className="text-lg font-bold">{room.rating || 'No rating'}</div>
                <div className="flex justify-center mt-0.5">
                  {renderStars(room.rating)}
                </div>
              </div>
              <div className="text-center flex-1 px-2 flex flex-col items-center">
                {room.rating >= 4 ? (
                  <>
                    <Medal className="w-6 h-6 mb-1" strokeWidth={1.5} />
                    <span className="text-xs font-semibold leading-tight">Student favorite</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-6 h-6 mb-1 text-on-surface-variant" strokeWidth={1.5} />
                    <span className="text-xs font-semibold leading-tight">New Listing</span>
                  </>
                )}
              </div>
              <div className="text-center pl-4 border-l border-outline-variant/30">
                <div className="text-lg font-bold">{room.reviewCount}</div>
                <div className="text-[10px] mt-0.5 font-semibold">Reviews</div>
              </div>
            </div>

            {/* Owner Section (Mobile styled, Desktop similar) */}
            <div className="flex items-center gap-4 border-b md:border-none border-outline-variant/20 pb-6 md:pb-0 mb-6 md:mb-8">
              <div className="relative">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-surface-container overflow-hidden flex items-center justify-center">
                  <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${room.owner.name}`} alt={room.owner.name} className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-[#E51D53] text-white rounded-full w-5 h-5 flex items-center justify-center border-2 border-white">
                  <Medal className="w-[10px] h-[10px] font-bold" strokeWidth={3} />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-base md:text-lg">Hosted by {room.owner.name}</h3>
                <p className="text-sm text-on-surface-variant font-medium">
                  Verified Owner{room.hostingSince ? ` · Hosting since ${new Date(room.hostingSince).getFullYear()}` : ''}
                </p>
              </div>
            </div>

            {/* Desktop Divider */}
            <div className="hidden md:block w-full h-[1px] bg-outline-variant/30 mb-8" />

            {/* Highlights — derived from amenities */}
            {room.amenities?.length > 0 && (
              <div className="space-y-6 pb-8 border-b border-outline-variant/20 mb-8 mt-2">
                {room.amenities.includes('ac') && (
                  <div className="flex gap-4 items-start">
                    <Snowflake className="w-7 h-7 mt-0.5 text-on-surface-variant/80" strokeWidth={1.5} />
                    <div>
                      <h4 className="font-semibold text-base">Air Conditioning</h4>
                      <p className="text-sm text-on-surface-variant mt-0.5">Beat the heat with the AC and ventilation.</p>
                    </div>
                  </div>
                )}
                {(room.amenities.includes('Security') || room.amenities.includes('CCTV')) && (
                  <div className="flex gap-4 items-start">
                    <DoorOpen className="w-7 h-7 mt-0.5 text-on-surface-variant/80" strokeWidth={1.5} />
                    <div>
                      <h4 className="font-semibold text-base">Security & Safe entry</h4>
                      <p className="text-sm text-on-surface-variant mt-0.5">24/7 security with CCTV surveillance.</p>
                    </div>
                  </div>
                )}
                {(room.amenities.includes('Balcony') || room.amenities.includes('Terrace')) && (
                  <div className="flex gap-4 items-start">
                    <Flower2 className="w-7 h-7 mt-0.5 text-on-surface-variant/80" strokeWidth={1.5} />
                    <div>
                      <h4 className="font-semibold text-base">{room.amenities.includes('Terrace') ? 'Terrace' : 'Balcony'} access</h4>
                      <p className="text-sm text-on-surface-variant mt-0.5">Enjoy open spaces and fresh air.</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Description */}
            {room.description && (
              <div className="pb-8 border-b border-outline-variant/20 mb-8">
                <p className="text-[15px] md:text-base text-on-surface leading-relaxed whitespace-pre-line">
                  {room.description}
                </p>
              </div>
            )}

            {/* Guest Favorite Huge Badge Area */}
            {room.rating > 0 && (
              <div className="py-8 md:py-12 border-b border-outline-variant/20 mb-8 flex flex-col items-center text-center">
                <div className="flex items-center justify-center gap-4 mb-2">
                  <Infinity className="w-16 h-16 md:w-20 md:h-20 text-on-surface opacity-20" strokeWidth={1} />
                  <span className="text-[4rem] md:text-[5rem] font-bold tracking-tighter leading-none">{room.rating}</span>
                  <Infinity className="w-16 h-16 md:w-20 md:h-20 text-on-surface opacity-20 transform rotate-180" strokeWidth={1} />
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-2">
                  {room.rating >= 4.5 ? 'Student favorite' : 'Well rated'}
                </h3>
                <p className="text-[15px] md:text-lg text-on-surface-variant max-w-sm">
                  {room.rating >= 4.5
                    ? 'This home is a student favorite based on ratings, reviews, and reliability'
                    : 'This home has consistently good ratings from other students'}
                </p>
              </div>
            )}

            {/* Reviews */}
            {room.reviews?.length > 0 && (
              <div className="pb-8 border-b border-outline-variant/20 mb-8">
                <h3 className="text-[22px] font-semibold mb-6">Student Reviews</h3>
                <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-6 px-6 md:mx-0 md:px-0">
                  {room.reviews.map((review: any, idx: number) => (
                    <div key={idx} className="w-[85vw] md:w-[300px] shrink-0 snap-center border border-outline-variant/30 rounded-2xl p-5 shadow-sm">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-surface-container rounded-full flex items-center justify-center font-bold text-sm">
                          {review.initials}
                        </div>
                        <div>
                          <h4 className="font-semibold text-base">{review.author}</h4>
                          <p className="text-xs text-on-surface-variant">{review.institution}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-0.5 mb-2">
                        {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-3 h-3 fill-current" strokeWidth={1} />)}
                        <span className="text-xs text-on-surface-variant ml-1.5 font-medium">{review.date}</span>
                      </div>
                      <p className="text-sm leading-relaxed text-on-surface line-clamp-4">&quot;{review.content}&quot;</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Amenities Section */}
            <div className="pb-8 border-b border-outline-variant/20 mb-8">
              <h3 className="text-[22px] font-semibold mb-6">What this place offers</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-2">
                {(showAllAmenities ? room.amenities : room.amenities.slice(0, 6)).map((amenity: string, idx: number) => (
                  <div key={idx} className="flex gap-4 items-center">
                    <Check className="w-[26px] h-[26px] text-on-surface-variant/80" strokeWidth={2} />
                    <span className="text-[15px] md:text-base font-normal">{amenity}</span>
                  </div>
                ))}
              </div>
              {room.amenities.length > 6 && (
                <button
                  onClick={() => setShowAllAmenities(!showAllAmenities)}
                  className="w-full md:w-auto md:px-6 mt-8 py-3.5 border border-black rounded-lg font-semibold text-[15px] hover:bg-gray-50 flex items-center justify-center gap-1"
                >
                  {showAllAmenities ? 'Show fewer amenities' : `Show all ${room.amenities.length} amenities`}
                </button>
              )}
            </div>

            {/* Location Section */}
            <div className="pb-8 border-b border-outline-variant/20 mb-8">
              <h3 className="text-[22px] font-semibold mb-2">Where you&apos;ll be</h3>
              <p className="text-[15px] text-on-surface-variant mb-6">{room.location}</p>
              {room.lat && room.lng ? (
                <div className="relative group">
                  <iframe
                    title="Location map"
                    className="w-full h-[250px] md:h-[400px] rounded-2xl border-0 shadow-sm"
                    src={`https://www.openstreetmap.org/export/embed.html?bbox=${room.lng - 0.01}%2C${room.lat - 0.01}%2C${room.lng + 0.01}%2C${room.lat + 0.01}&layer=mapnik&marker=${room.lat}%2C${room.lng}`}
                    allowFullScreen
                  />
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${room.lat},${room.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-4 right-4 bg-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all border border-outline-variant/30 flex items-center gap-2 text-sm font-semibold text-on-surface"
                  >
                    <img src="https://www.google.com/images/branding/product/ico/maps15_64dp.ico" alt="G" className="w-4 h-4" />
                    Open in Google Maps
                  </a>
                </div>
              ) : (
                <div className="w-full h-[250px] md:h-[400px] bg-surface-container rounded-2xl relative overflow-hidden mb-6 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-surface-container to-surface-container-high" />
                  <div className="relative z-10 text-center px-6">
                    <div className="w-14 h-14 bg-[#E51D53]/20 rounded-full flex items-center justify-center border border-[#E51D53] mx-auto mb-3">
                      <div className="w-4 h-4 bg-[#E51D53] rounded-full shadow-lg border-2 border-white" />
                    </div>
                    <p className="font-semibold text-on-surface">{room.location}</p>
                    <p className="text-sm text-on-surface-variant mt-1">Contact owner for exact location</p>
                  </div>
                </div>
              )}
            </div>

            {/* Meet your owner Card */}
            <div className="pb-8 border-b border-outline-variant/20 mb-8">
              <h3 className="text-[22px] font-semibold mb-6">Meet your owner</h3>
              <div className="bg-surface-container-lowest shadow-[0_10px_30px_rgba(0,0,0,0.08)] rounded-3xl p-6 md:p-8 flex flex-col items-center text-center">
                <div className="relative mb-2">
                  <div className="w-24 h-24 rounded-full overflow-hidden bg-surface-container">
                    <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${room.owner.name}`} alt={room.owner.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute bottom-0 right-0 bg-[#E51D53] text-white rounded-full w-7 h-7 flex items-center justify-center border-2 border-white">
                    <Medal className="w-[14px] h-[14px] font-bold" strokeWidth={2} />
                  </div>
                </div>
                <h2 className="text-[28px] font-bold leading-tight">{room.owner.name}</h2>
                <p className="text-[13px] font-bold text-on-surface-variant flex items-center justify-center gap-1 mb-8"><Medal className="w-[14px] h-[14px]" strokeWidth={2} /> Verified Owner</p>
                <div className="flex justify-center divide-x divide-outline-variant/30 w-full mb-8">
                  <div className="px-4">
                    <div className="text-xl font-bold">{room.reviewCount}</div>
                    <div className="text-[11px] font-bold w-12 text-on-surface-variant mx-auto">Reviews</div>
                  </div>
                  <div className="px-4">
                    <div className="text-xl font-bold">{room.rating}</div>
                    <div className="text-[11px] font-bold w-12 text-on-surface-variant mx-auto">Rating</div>
                  </div>
                  <div className="px-4">
                    <div className="text-xl font-bold">{room.amenities?.length || 0}</div>
                    <div className="text-[11px] font-bold w-12 text-on-surface-variant mx-auto text-center leading-tight">Amenities</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Things to know */}
            <div className="pb-8 mb-8 md:mb-16">
              <h3 className="text-[22px] font-semibold mb-6">Things to know</h3>
              <div className="flex flex-col md:flex-row gap-6 md:gap-10">
                <div className="flex-1 space-y-4">
                  <h4 className="font-semibold text-base flex items-center gap-2"><CalendarClock className="w-5 h-5" strokeWidth={2} /> Room details</h4>
                  <p className="text-[15px] text-on-surface-variant">
                    Type: {room.type || 'N/A'}<br />
                    Gender: {room.gender === 'boys' ? 'Boys only' : room.gender === 'girls' ? 'Girls only' : 'Co-ed'}<br />
                    Beds: {room.area}
                  </p>
                </div>
                {room.houseRules?.length > 0 && (
                  <div className="flex-1 space-y-4">
                    <h4 className="font-semibold text-base flex items-center gap-2"><Scale className="w-5 h-5" strokeWidth={2} /> House rules</h4>
                    <ul className="text-[15px] text-on-surface-variant space-y-1">
                      {room.houseRules.map((rule: string, i: number) => <li key={i}>• {rule}</li>)}
                    </ul>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: DESKTOP STICKY BOOKING CARD */}
          <div className="hidden md:block w-[35%] relative">
            <div className="sticky top-28 bg-white border border-outline-variant/30 rounded-2xl p-6 shadow-[0_6px_16px_rgba(0,0,0,0.12)]">
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-2xl font-semibold">₹{room.price.toLocaleString('en-IN')}</span>
                <span className="text-base text-on-surface-variant">/ month</span>
              </div>

              <div className="border border-outline-variant/50 rounded overflow-hidden mb-4">
                <div className="flex divide-x divide-outline-variant/50 border-b border-outline-variant/50">
                  <div className="flex-1 p-3">
                    <div className="text-[10px] font-bold uppercase">Available from</div>
                    <div className="text-sm">{room.availableFrom ? new Date(room.availableFrom).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Immediately'}</div>
                  </div>
                  <div className="flex-1 p-3">
                    <div className="text-[10px] font-bold uppercase">Room type</div>
                    <div className="text-sm capitalize">{room.type || 'N/A'}</div>
                  </div>
                </div>
                <div className="p-3 flex justify-between items-center">
                  <div>
                    <div className="text-[10px] font-bold uppercase">Beds available</div>
                    <div className="text-sm">{room.area}</div>
                  </div>
                </div>
              </div>

              <button className="w-full bg-[#E51D53] hover:bg-[#D5003B] text-white py-3.5 rounded-lg font-bold text-[15px] transition-colors mb-4 cursor-pointer">
                Request to book
              </button>

              <p className="text-center text-[13px] text-on-surface-variant mb-6">You won't be charged yet</p>

              <div className="space-y-3 pb-6 border-b border-outline-variant/30 mb-4">
                <div className="flex justify-between text-[15px] text-on-surface">
                  <span>₹{room.price.toLocaleString('en-IN')} x 1 month</span>
                  <span>₹{room.price.toLocaleString('en-IN')}</span>
                </div>
                {room.deposit > 0 && <div className="flex justify-between text-[15px] text-on-surface">
                  <span>Security Deposit</span>
                  <span>₹{room.deposit.toLocaleString('en-IN')}</span>
                </div>}
              </div>
              <div className="flex justify-between font-bold text-[15px]">
                <span>Total (before taxes)</span>
                <span>₹{(room.price + room.deposit).toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

        </div>
      </main>

      <div className="md:hidden fixed bottom-0 w-full bg-white border-t border-outline-variant/20 px-6 py-4 flex justify-between items-center z-40">
        <div>
          <div className="font-semibold text-lg flex items-baseline gap-1">
            ₹{room.price.toLocaleString('en-IN')} <span className="text-sm font-normal text-on-surface-variant">/ mo</span>
          </div>
          <p className="text-[13px] text-on-surface-variant">
            {room.availableFrom ? `From ${new Date(room.availableFrom).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}` : 'Available now'}
          </p>
        </div>
        <button onClick={handleBooking} className="bg-[#E51D53] text-white px-8 py-3 rounded-lg font-bold text-[15px] cursor-pointer">
          Reserve
        </button>
      </div>

      {/* Image Modal */}
      <ImageModal
        images={room.images}
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        initialIndex={imageModalIndex}
        showGrid={imageModalShowGrid}
      />
    </div>
  );
}
