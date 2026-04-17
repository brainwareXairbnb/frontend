"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { rooms as staticRooms } from "@/data/rooms";
import { RoomCard } from "@/components/RoomCard";
import { AuthPrompt } from "@/components/AuthPrompt";

export default function StudentSavedPage() {
   const router = useRouter();
   const { user, loading } = useAuth();
   const [savedRooms] = useState(staticRooms.slice(0, 3));

   if (loading) {
      return (
         <div className="min-h-screen bg-white flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-[#FF385C]/20 border-t-[#FF385C] rounded-full animate-spin"></div>
         </div>
      );
   }

   return (
      <div className="bg-white min-h-screen">
         <main className="px-8 md:px-10 pb-32 pt-10">
            {!user ? (
               <AuthPrompt
                  title="Log in to view your wishlists"
                  description="You can create, view, or edit wishlists once you've logged in."
               />
            ) : savedRooms.length > 0 ? (
               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                  {savedRooms.map((room) => (
                     <div key={room.id} onClick={() => router.push(`/student/detail?id=${room.id}`)} className="cursor-pointer">
                        <RoomCard room={room} />
                     </div>
                  ))}
               </div>
            ) : (
               <div className="py-20 text-center">
                  <h2 className="text-[20px] font-bold mb-3 text-on-surface">Create your first wishlist</h2>
                  <p className="text-[15px] text-on-surface-variant leading-relaxed opacity-70">
                     As you explore rooms, click the heart icon to save the ones you love.
                  </p>
                  <button
                     onClick={() => router.push('/')}
                     className="mt-8 px-8 py-3 bg-[#222222] text-white rounded-lg font-bold"
                  >
                     Start exploring
                  </button>
               </div>
            )}
         </main>
      </div>
   );
}