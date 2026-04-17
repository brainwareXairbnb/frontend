"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { rooms as staticRooms } from "@/data/rooms";
import { Calendar, MapPin, ChevronRight } from "lucide-react";
import { AuthPrompt } from "@/components/AuthPrompt";

export default function StudentBookingsPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState("Upcoming");
  const myRooms = staticRooms.slice(2, 4);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#FF385C]/20 border-t-[#FF385C] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {user && (
        <header className="p-8 pb-2 sticky top-0 bg-white z-40 border-b border-outline-variant/10 md:px-10">
           <h1 className="text-2xl font-bold mb-4 md:pt-4">Bookings</h1>
           <div className="flex gap-8">
              {["Upcoming", "Past"].map(t => (
                <button 
                  key={t}
                  onClick={() => setActiveTab(t)}
                  className={`pb-3 text-sm font-bold transition-all border-b-2 ${activeTab === t ? 'border-on-surface text-on-surface' : 'border-transparent text-on-surface-variant opacity-50'}`}
                >
                  {t}
                </button>
              ))}
           </div>
        </header>
      )}

      <main className="px-8 md:px-10 pb-32 pt-10">
        {!user ? (
          <AuthPrompt 
            title="Log in to view your bookings"
            description="You can view your active stays and booking history once you've logged in."
          />
        ) : activeTab === "Upcoming" ? (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {myRooms.map((r, i) => (
                <div 
                  key={r.id} 
                  onClick={() => router.push(`/student/detail?id=${r.id}`)}
                  className="flex flex-col gap-4 group cursor-pointer"
                >
                  <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-sm">
                     <img src={r.images[0]} className="w-full h-full object-cover" alt={r.title} />
                     <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold uppercase">
                        Confirmed
                     </div>
                  </div>
                  <div className="flex justify-between items-start">
                     <div>
                        <p className="text-base font-bold text-on-surface group-hover:underline decoration-2 underline-offset-4">{r.title}</p>
                        <div className="flex items-center gap-1.5 text-sm text-on-surface-variant mt-1">
                           <Calendar className="w-3.5 h-3.5" /> 
                           <span>Aug 1, 2024 - Jan 31, 2025</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-sm text-on-surface-variant mt-1 capitalize">
                           <MapPin className="w-3.5 h-3.5" /> 
                           <span>{r.area}</span>
                        </div>
                     </div>
                     <ChevronRight className="w-5 h-5 opacity-30 mt-1" />
                  </div>
                  <div className="w-full h-px bg-outline-variant/10 mt-2" />
                </div>
              ))}
           </div>
        ) : (
          <div className="py-20 text-center">
             <h2 className="text-[20px] font-bold mb-3">No past bookings</h2>
             <p className="text-[15px] text-on-surface-variant opacity-70">
                When you stay at a room, it will appear here.
             </p>
          </div>
        )}
      </main>
    </div>
  );
}