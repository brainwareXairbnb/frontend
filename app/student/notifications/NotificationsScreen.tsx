"use client";
import React from 'react';
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { NOTIFICATIONS } from "@/lib/data";
import { 
  Bell, 
  MessageSquare, 
  CreditCard, 
  CheckCircle2, 
  AlertCircle,
  Package,
  ArrowRight
} from "lucide-react";

const NotificationIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'booking': return <Package className="w-5 h-5 text-emerald-500" />;
    case 'payment': return <CreditCard className="w-5 h-5 text-blue-500" />;
    case 'system': return <CheckCircle2 className="w-5 h-5 text-purple-500" />;
    default: return <Bell className="w-5 h-5 text-[#222222]" />;
  }
};

export default function SNotifications() {
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
           <h1 className="text-3xl font-bold text-[#222222] mb-12">Notifications</h1>
           
           <div className="max-w-md">
              <h2 className="text-2xl font-semibold text-[#222222] mb-3">Log in to view notifications</h2>
              <p className="text-[#717171] leading-relaxed mb-8">
                 Stay updated on your booking requests, payments, and system alerts.
              </p>
              
              <Button 
                 onClick={() => router.push('/login?redirect=/student/notifications')}
                 className="bg-[#FF385C] hover:bg-[#E31C5F] text-white px-8 h-12 rounded-lg font-semibold text-base transition-all active:scale-95"
              >
                 Log in
              </Button>
           </div>
        </div>
     );
  }

  return (
    <div className="px-6 py-12 md:px-12 md:py-20 max-w-2xl mx-auto bg-white min-h-screen">
      <header className="mb-12">
         <h1 className="text-3xl font-bold text-[#222222] tracking-tight">Notifications</h1>
         <p className="text-[#717171] mt-2 font-medium">Activity and alerts on your account</p>
      </header>

      <div className="space-y-4">
        {NOTIFICATIONS.map((n) => (
          <div 
             key={n.id} 
             className={`p-6 rounded-2xl border transition-all hover:shadow-md cursor-pointer flex gap-5 ${n.read ? 'bg-white border-[#EBEBEB]' : 'bg-[#f7f7f7] border-transparent shadow-sm'}`}
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${n.read ? 'bg-[#f7f7f7]' : 'bg-white shadow-sm'}`}>
               <NotificationIcon type={n.type} />
            </div>

            <div className="flex-1 space-y-1">
               <div className="flex justify-between items-start">
                  <h3 className={`font-bold tracking-tight ${n.read ? 'text-[#222222]' : 'text-[#FF385C]'}`}>
                     {n.title}
                  </h3>
                  <span className="text-[10px] font-bold text-[#717171] uppercase">{n.date}</span>
               </div>
               <p className="text-[#717171] text-sm leading-relaxed pr-4">
                  {n.message}
               </p>
               {!n.read && (
                 <div className="flex items-center gap-1 text-[10px] font-bold text-[#FF385C] uppercase tracking-wider pt-2">
                    Action required <ArrowRight className="w-3 h-3" />
                 </div>
               )}
            </div>
          </div>
        ))}

        {NOTIFICATIONS.length === 0 && (
           <div className="py-20 flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-[#f7f7f7] rounded-full flex items-center justify-center text-[#717171] mb-6">
                 <Bell className="w-8 h-8 opacity-20" />
              </div>
              <h3 className="text-xl font-semibold text-[#222222] mb-2">All caught up!</h3>
              <p className="text-[#717171] mb-8">When you get a notification, it will show up here.</p>
           </div>
        )}
      </div>
    </div>
  );
}
