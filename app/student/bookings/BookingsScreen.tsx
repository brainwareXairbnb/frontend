"use client";
import React from 'react';
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { fmt, BOOKINGS_DATA } from "@/lib/data";
import {
   History,
   MapPin,
   Calendar,
   Clock,
   CreditCard,
   CheckCircle2,
   AlertCircle,
   MoreHorizontal,
   ChevronRight,
   Zap,
   Star,
   Receipt,
   RotateCcw
} from "lucide-react";

const StatusBadge = ({ s }: { s: string }) => {
   const styles: Record<string, string> = {
      "pending": "bg-orange-50 text-orange-600 border-orange-100",
      "accepted": "bg-emerald-50 text-emerald-600 border-emerald-100",
      "payment_confirmed": "bg-blue-50 text-blue-600 border-blue-100",
      "completed": "bg-slate-50 text-slate-500 border-slate-100",
      "rejected": "bg-red-50 text-red-600 border-red-100",
   };
   return (
      <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${styles[s] || 'bg-slate-50 text-slate-400 border-slate-100'}`}>
         {s.replace('_', ' ')}
      </span>
   );
};

export default function SBookings({ setScreen }: { setScreen?: (s: string) => void }) {
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
            <h1 className="text-3xl font-bold text-[#222222] mb-12">Bookings</h1>

            <div className="max-w-md">
               <h2 className="text-2xl font-semibold text-[#222222] mb-3">Log in to view your bookings</h2>
               <p className="text-[#717171] leading-relaxed mb-8">
                  You can view your bookings once you've logged in.
               </p>

               <Button
                  onClick={() => router.push('/login?redirect=/student/bookings')}
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
            <h1 className="text-3xl font-bold text-[#222222] tracking-tight">Trips</h1>
            <p className="text-[#717171] mt-2 font-medium">Manage your unit residency requests</p>
         </header>

         <div className="space-y-12">
            {BOOKINGS_DATA.map((b, i) => (
               <div
                  key={b.id}
                  className="group border-b border-[#EBEBEB] pb-12 last:border-0"
               >
                  <div className="flex flex-col md:flex-row gap-8">
                     <div className="relative w-full md:w-[300px] aspect-[1.4] rounded-2xl overflow-hidden shrink-0">
                        <div className="absolute inset-0" style={{ background: b.room.grad }}></div>
                        <img
                           src={`https://images.unsplash.com/photo-${1550000000000 + i}?auto=format&fit=crop&q=80&w=800`}
                           className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-80"
                           alt={b.room.title}
                        />
                        <div className="absolute top-4 left-4">
                           <StatusBadge s={b.status} />
                        </div>
                     </div>

                     <div className="flex-1 space-y-6">
                        <div className="flex justify-between items-start">
                           <div>
                              <h3 className="text-2xl font-bold text-[#222222] tracking-tight mb-2">
                                 {b.room.title}
                              </h3>
                              <div className="flex items-center gap-2 text-[#717171] font-medium text-sm">
                                 <MapPin className="w-4 h-4" />
                                 {b.room.area} <span className="mx-1 opacity-20">•</span> ID: {b.id.toUpperCase()}
                              </div>
                           </div>
                           <button className="w-10 h-10 hover:bg-[#F7F7F7] rounded-full flex items-center justify-center transition-colors">
                              <MoreHorizontal className="w-5 h-5 text-[#222222]" />
                           </button>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                           {[
                              { l: "Move-in", v: b.moveIn, i: Calendar },
                              { l: "Duration", v: `${b.duration} Months`, i: Clock },
                              { l: "Cycle Rent", v: fmt(b.rent), i: Zap },
                              { l: "Total Yield", v: fmt(b.rent * b.duration), i: CreditCard },
                           ].map(item => (
                              <div key={item.l} className="space-y-1">
                                 <p className="text-[10px] font-bold text-[#717171] uppercase tracking-[0.05em]">{item.l}</p>
                                 <div className="flex items-center gap-2">
                                    <item.i className="w-3.5 h-3.5 text-[#222222] opacity-40" />
                                    <p className="text-sm font-semibold text-[#222222]">{item.v}</p>
                                 </div>
                              </div>
                           ))}
                        </div>

                        <div className="flex flex-wrap gap-3 pt-2">
                           {b.status === "pending" && (
                              <Button variant="outline" className="rounded-lg h-11 px-6 font-semibold border-[#222222] text-[#222222] hover:bg-[#F7F7F7]">
                                 <RotateCcw className="w-4 h-4 mr-2" />
                                 Revoke Request
                              </Button>
                           )}
                           {b.status === "accepted" && (
                              <Button className="bg-[#FF385C] hover:bg-[#E31C5F] text-white rounded-lg h-11 px-8 font-semibold">
                                 Pay Deposit — {fmt(b.rent)}
                                 <ChevronRight className="w-4 h-4 ml-2" />
                              </Button>
                           )}
                           {b.status === "payment_confirmed" && (
                              <>
                                 <Button variant="outline" className="rounded-lg h-11 px-6 font-semibold border-[#222222] text-[#222222]">
                                    <Receipt className="w-4 h-4 mr-2" />
                                    Receipt
                                 </Button>
                                 <Button variant="ghost" className="rounded-lg h-11 px-6 font-semibold text-[#222222]">
                                    <Star className="w-4 h-4 mr-2" />
                                    Review
                                 </Button>
                              </>
                           )}
                           {b.status === "completed" && (
                              <Button variant="outline" className="rounded-lg h-11 px-6 font-semibold border-[#222222] text-[#222222]">
                                 <Star className="w-4 h-4 mr-2" />
                                 Write Review
                              </Button>
                           )}
                        </div>
                     </div>
                  </div>
               </div>
            ))}

            {BOOKINGS_DATA.length === 0 && (
               <div className="py-20 flex flex-col items-center text-center">
                  <div className="w-20 h-20 bg-[#f7f7f7] rounded-full flex items-center justify-center text-[#717171] mb-6">
                     <Calendar className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#222222] mb-2">No trips booked...yet!</h3>
                  <p className="text-[#717171] mb-8">Time to dust off your bags and start planning your next move.</p>
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