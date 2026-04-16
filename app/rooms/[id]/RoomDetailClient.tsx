'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { roomsApi } from '@/lib/api';
import { rooms as staticRooms } from '@/data/rooms';
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

export default function RoomDetailClient() {
  const params = useParams();
  const roomIdStr = params.id as string;
  const [room, setRoom] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const data: any = await roomsApi.getListingById(roomIdStr);
        setRoom(data.listing);
      } catch (error) {
        console.error('Failed to fetch room detail:', error);
        // Fallback to static data for demo if API fails
        const legacyId = parseInt(roomIdStr);
        const fallback = staticRooms.find(r => r.id === legacyId);
        if (fallback) setRoom(fallback);
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

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
           <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
           <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Synchronizing Room Telemetry...</p>
        </div>
      </div>
    );
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

  const roomSubLabel = `${room.type} \u00B7 ${room.gender === 'male' ? 'Boys' : room.gender === 'female' ? 'Girls' : 'Co-ed'} \u00B7 ${room.area}`;

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
          <button className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${isScrolled ? 'bg-transparent' : 'bg-white/90 shadow-sm'}`}>
            <Heart className={`w-4 h-4 ${isScrolled ? 'text-on-surface' : 'text-black'}`} strokeWidth={2.5} />
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
              className="w-full h-full object-cover shrink-0 snap-center"
            />
          ))}
        </div>

        {/* Image Indicator */}
        <div className="absolute bottom-10 right-4 bg-black/60 text-white text-xs px-2.5 py-1 rounded-md font-semibold tracking-wide">
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
              <button className="flex items-center gap-2 text-sm font-medium"><Heart className="w-[18px] h-[18px]" strokeWidth={2} /> Save</button>
            </div>
          </div>

          <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[60vh] min-h-[400px] rounded-2xl overflow-hidden relative">
            <div className="col-span-2 row-span-2 relative group cursor-pointer">
              <img src={room.images[0]} className="w-full h-full object-cover group-hover:brightness-90 transition-all duration-300" alt="Room primary" />
            </div>
            <div className="relative group cursor-pointer"><img src={room.images[1]} className="w-full h-full object-cover group-hover:brightness-90 transition-all duration-300" alt="Room" /></div>
            <div className="relative group cursor-pointer"><img src={room.images[2]} className="w-full h-full object-cover group-hover:brightness-90 transition-all duration-300" alt="Room" /></div>
            <div className="relative group cursor-pointer"><img src={room.images[3] || room.images[0]} className="w-full h-full object-cover group-hover:brightness-90 transition-all duration-300" alt="Room" /></div>
            <div className="relative group cursor-pointer"><img src={room.images[4] || room.images[1]} className="w-full h-full object-cover group-hover:brightness-90 transition-all duration-300" alt="Room" /></div>
            <button className="absolute bottom-6 right-6 bg-white px-4 py-1.5 rounded-lg border border-black flex items-center gap-2 text-sm font-semibold shadow-sm hover:bg-gray-50">
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
                <div className="text-lg font-bold">{room.rating}</div>
                <div className="flex justify-center mt-0.5 gap-[1px]">
                  <Star className="w-[10px] h-[10px] fill-current text-on-surface" strokeWidth={1} />
                  <Star className="w-[10px] h-[10px] fill-current text-on-surface" strokeWidth={1} />
                  <Star className="w-[10px] h-[10px] fill-current text-on-surface" strokeWidth={1} />
                  <Star className="w-[10px] h-[10px] fill-current text-on-surface" strokeWidth={1} />
                  <StarHalf className="w-[10px] h-[10px] fill-current text-on-surface" strokeWidth={1} />
                </div>
              </div>
              <div className="text-center flex-1 px-2 flex flex-col items-center">
                <Medal className="w-6 h-6 mb-1" strokeWidth={1.5} />
                <span className="text-xs font-semibold leading-tight">Student favorite</span>
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
                  Verified Owner · 5 years hosting
                </p>
              </div>
            </div>

            {/* Desktop Divider */}
            <div className="hidden md:block w-full h-[1px] bg-outline-variant/30 mb-8" />

            {/* Highlights list */}
            <div className="space-y-6 pb-8 border-b border-outline-variant/20 mb-8 mt-2">
              <div className="flex gap-4 items-start">
                <Snowflake className="w-7 h-7 mt-0.5 text-on-surface-variant/80" strokeWidth={1.5} />
                <div>
                  <h4 className="font-semibold text-base">Designed for staying cool</h4>
                  <p className="text-sm text-on-surface-variant mt-0.5">Beat the heat with the AC, ceiling fan, and ventilation.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <DoorOpen className="w-7 h-7 mt-0.5 text-on-surface-variant/80" strokeWidth={1.5} />
                <div>
                  <h4 className="font-semibold text-base">Self check-in</h4>
                  <p className="text-sm text-on-surface-variant mt-0.5">You can check in with the building staff.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <Flower2 className="w-7 h-7 mt-0.5 text-on-surface-variant/80" strokeWidth={1.5} />
                <div>
                  <h4 className="font-semibold text-base">Peace and quiet</h4>
                  <p className="text-sm text-on-surface-variant mt-0.5">Guests say this home is in a quiet area.</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="pb-8 border-b border-outline-variant/20 mb-8">
              <p className="text-[15px] md:text-base text-on-surface leading-relaxed whitespace-pre-line mb-4">
                Stop by and take a break in the modest and stylish home, surrounded by the serenity of nature.
                <br /><br />
                A perfect amalgamation of elegance and comfort, this is a cozy pit-stop in your journey.
                <br /><br />
                The design is curated with specific student needs in mind...
              </p>
              <button className="flex items-center gap-1 font-semibold text-sm md:text-base">
                Show more <ChevronRight className="w-[18px] h-[18px]" strokeWidth={2} />
              </button>
            </div>

            {/* Guest Favorite Huge Badge Area */}
            <div className="py-8 md:py-12 border-b border-outline-variant/20 mb-8 flex flex-col items-center text-center">
              <div className="flex items-center justify-center gap-4 mb-2">
                <Infinity className="w-16 h-16 md:w-20 md:h-20 text-on-surface opacity-20" strokeWidth={1} />
                <span className="text-[4rem] md:text-[5rem] font-bold tracking-tighter leading-none">{room.rating}</span>
                <Infinity className="w-16 h-16 md:w-20 md:h-20 text-on-surface opacity-20 transform rotate-180" strokeWidth={1} />
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-2">Student favorite</h3>
              <p className="text-[15px] md:text-lg text-on-surface-variant max-w-sm">This home is a student favorite based on ratings, reviews, and reliability</p>
            </div>

            {/* Horizontal Reviews Mini Carousel (Mobile & Desktop) */}
            <div className="pb-8 border-b border-outline-variant/20 mb-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-[22px] font-semibold">Student reviews mention</h3>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide md:flex-wrap">
                <span className="whitespace-nowrap px-4 py-2 border border-outline-variant/50 rounded-full text-sm font-semibold flex items-center gap-2"><Armchair className="w-4 h-4" strokeWidth={2} /> Decor</span>
                <span className="whitespace-nowrap px-4 py-2 border border-outline-variant/50 rounded-full text-sm font-semibold flex items-center gap-2"><Smile className="w-4 h-4" strokeWidth={2} /> Hospitality</span>
                <span className="whitespace-nowrap px-4 py-2 border border-outline-variant/50 rounded-full text-sm font-semibold flex items-center gap-2"><Sparkles className="w-4 h-4" strokeWidth={2} /> Cleanliness</span>
              </div>

              <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-6 px-6 md:mx-0 md:px-0 mt-2">
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
                      <Star className="w-3 h-3 fill-current" strokeWidth={1} />
                      <Star className="w-3 h-3 fill-current" strokeWidth={1} />
                      <Star className="w-3 h-3 fill-current" strokeWidth={1} />
                      <Star className="w-3 h-3 fill-current" strokeWidth={1} />
                      <Star className="w-3 h-3 fill-current" strokeWidth={1} />
                      <span className="text-xs text-on-surface-variant ml-1.5 font-medium">{review.date}</span>
                    </div>
                    <p className="text-sm leading-relaxed text-on-surface clamp-3 line-clamp-4">
                      "{review.content}"
                    </p>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-3.5 border border-black rounded-lg font-semibold text-[15px] hover:bg-gray-50 flex items-center justify-center gap-1">
                Show all {room.reviewCount} reviews
              </button>
            </div>

            {/* Amenities Section */}
            <div className="pb-8 border-b border-outline-variant/20 mb-8">
              <h3 className="text-[22px] font-semibold mb-6">What this place offers</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-2">
                {room.amenities.slice(0, 6).map((amenity: string, idx: number) => (
                  <div key={idx} className="flex gap-4 items-center">
                    <Check className="w-[26px] h-[26px] text-on-surface-variant/80" strokeWidth={2} />
                    <span className="text-[15px] md:text-base font-normal">{amenity}</span>
                  </div>
                ))}
              </div>
              <button className="w-full md:w-auto md:px-6 mt-8 py-3.5 border border-black rounded-lg font-semibold text-[15px] hover:bg-gray-50 flex items-center justify-center gap-1">
                Show all amenities
              </button>
            </div>

            {/* Location Section */}
            <div className="pb-8 border-b border-outline-variant/20 mb-8">
              <h3 className="text-[22px] font-semibold mb-2">Where you'll be</h3>
              <p className="text-[15px] text-on-surface-variant mb-6">{room.location}</p>
              <div className="w-full h-[250px] md:h-[400px] bg-surface-container rounded-2xl relative overflow-hidden mb-6">
                <img src="https://maps.googleapis.com/maps/api/staticmap?center=Kalyani,India&zoom=14&size=800x400&sensor=false" alt="Map" className="w-full h-full object-cover opacity-60" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-[#E51D53]/20 rounded-full flex items-center justify-center border border-[#E51D53]">
                  <div className="w-4 h-4 bg-[#E51D53] rounded-full shadow-lg border-2 border-white"></div>
                </div>
              </div>
              <h4 className="font-semibold text-base mb-2">Neighborhood highlights</h4>
              <p className="text-[15px] text-on-surface leading-relaxed">
                This is a residential colony in the heart of the town and is surrounded with flora. The pathways are beautiful covered with leaves...
              </p>
              <button className="flex items-center gap-1 mt-4 font-semibold text-[15px]">
                Show more <ChevronRight className="w-[18px] h-[18px]" strokeWidth={2} />
              </button>
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
                    <div className="text-xl font-bold">5</div>
                    <div className="text-[11px] font-bold w-12 text-on-surface-variant mx-auto text-center leading-tight">Years</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Things to know */}
            <div className="pb-8 border-b md:border-none border-outline-variant/20 mb-8 md:mb-16">
              <h3 className="text-[22px] font-semibold mb-6">Things to know</h3>
              <div className="flex flex-col md:flex-row gap-6 md:gap-10">
                <div className="flex-1 space-y-4">
                  <h4 className="font-semibold text-base flex items-center gap-2"><CalendarClock className="w-5 h-5" strokeWidth={2} /> Cancellation policy</h4>
                  <p className="text-[15px] text-on-surface-variant">Free cancellation before Aug 1. Cancel before check-in for partial refund.</p>
                  <button className="font-semibold text-[15px] flex items-center">Review policy <ChevronRight className="w-[18px] h-[18px]" strokeWidth={2} /></button>
                </div>
                <div className="flex-1 space-y-4">
                  <h4 className="font-semibold text-base flex items-center gap-2"><Scale className="w-5 h-5" strokeWidth={2} /> House rules</h4>
                  <p className="text-[15px] text-on-surface-variant">Check-in: 1:00 PM - 10:00 PM<br />Checkout before 11:00 AM<br />2 guests maximum</p>
                  <button className="font-semibold text-[15px] flex items-center">Show more <ChevronRight className="w-[18px] h-[18px]" strokeWidth={2} /></button>
                </div>
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
                  <div className="flex-1 p-3 cursor-pointer">
                    <div className="text-[10px] font-bold uppercase">Move in</div>
                    <div className="text-sm">Aug 1, 2024</div>
                  </div>
                  <div className="flex-1 p-3 cursor-pointer">
                    <div className="text-[10px] font-bold uppercase">Duration</div>
                    <div className="text-sm">6 Months</div>
                  </div>
                </div>
                <div className="p-3 flex justify-between items-center cursor-pointer">
                  <div>
                    <div className="text-[10px] font-bold uppercase">Guests / Sharing</div>
                    <div className="text-sm">1 guest</div>
                  </div>
                  <ChevronDown className="w-5 h-5" strokeWidth={2} />
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
          <p className="text-[13px] font-semibold text-on-surface">Aug 1 - Check out</p>
        </div>
        <button className="bg-[#E51D53] text-white px-8 py-3 rounded-lg font-bold text-[15px] cursor-pointer">
          Reserve
        </button>
      </div>


    </div>
  );
}
