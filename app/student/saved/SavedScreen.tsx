"use client";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { RoomCard } from "@/components/RoomCard";
import { Heart } from "lucide-react";
import { rooms as staticRooms } from '@/data/rooms';

interface SSavedProps {
   setScreen?: (screen: string) => void; // Optional if using router
   setRoom?: (room: any) => void;
}

export default function SSaved({ setScreen, setRoom }: SSavedProps) {
   const { user, loading } = useAuth();
   const router = useRouter();

   if (loading) return (
      <div className="flex items-center justify-center min-h-[60vh]">
         <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
   );

   if (!user) {
      return (
         <div className="px-6 py-12 md:px-12 md:py-20 max-w-7xl mx-auto min-h-screen bg-white">
            <h1 className="text-3xl font-bold text-[#222222] mb-12">Wishlists</h1>
            
            <div className="max-w-md">
               <h2 className="text-2xl font-semibold text-[#222222] mb-3">Log in to view your wishlists</h2>
               <p className="text-[#717171] leading-relaxed mb-8">
                  You can create, view, or edit wishlists once you've logged in.
               </p>
               
               <Button 
                  onClick={() => router.push('/login?redirect=/student/saved')}
                  className="bg-[#FF385C] hover:bg-[#E31C5F] text-white px-8 h-12 rounded-lg font-semibold text-base transition-all active:scale-95"
               >
                  Log in
               </Button>
            </div>
         </div>
      );
   }

   return (
      <div className="px-6 py-12 md:px-12 md:py-20 max-w-7xl mx-auto bg-white min-h-screen">
         <header className="mb-12">
            <h1 className="text-3xl font-bold text-[#222222]">Wishlists</h1>
            <p className="text-[#717171] mt-2 font-medium">{staticRooms.length} units bookmarked</p>
         </header>

         <div className="">
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8'>
               {staticRooms.map((room) => (
                  <RoomCard
                     key={room.id}
                     room={room}
                    // priceSuffix="for 2 nights"
                  />
               ))}
            </div>

            {staticRooms.length === 0 && (
               <div className="py-20 flex flex-col items-center text-center">
                  <div className="w-20 h-20 bg-[#f7f7f7] rounded-full flex items-center justify-center text-[#717171] mb-6">
                     <Heart className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#222222] mb-2">Create your first wishlist</h3>
                  <p className="text-[#717171] mb-8">As you search, click the heart icon to save your favorite homes.</p>
                  <Button
                     onClick={() => router.push('/')}
                     className="bg-[#222222] hover:bg-black text-white px-8 h-12 rounded-lg font-semibold transition-all"
                  >
                     Start exploring
                  </Button>
               </div>
            )}
         </div>
      </div>
   );
}