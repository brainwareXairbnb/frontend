"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import {
  Bell,
  MessageCircle,
  Tag,
  Calendar
} from "lucide-react";
import { AuthPrompt } from "@/components/AuthPrompt";

export default function StudentNotificationsPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  const notifications = [
    {
      id: 1,
      title: "Booking confirmed!",
      body: "Anita Ghosh accepted your stay request at The Scholars' Atrium.",
      time: "2h ago",
      type: "booking",
      icon: Calendar,
      color: "text-emerald-500",
      bg: "bg-emerald-50"
    },
    {
      id: 2,
      title: "New message from Host",
      body: "Hi Ritwick! I've shared the check-in instructions with you. Let me know if you have any questions.",
      time: "5h ago",
      type: "message",
      icon: MessageCircle,
      color: "text-[#FF385C]",
      bg: "bg-[#FF385C]/5"
    },
    {
      id: 3,
      title: "Referral Bonus Sync",
      body: "Your peer sync was successful. ₹500 has been credited to your node wallet.",
      time: "1d ago",
      type: "promo",
      icon: Tag,
      color: "text-blue-500",
      bg: "bg-blue-50"
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#FF385C]/20 border-t-[#FF385C] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <main className="px-5 md:px-10 pb-32 pt-6 max-w-2xl mx-auto">
        {!user ? (
          <AuthPrompt
            title="Log in to see notifications"
            description="Stay updated on your booking status, messages from hosts, and exclusive student offers."
          />
        ) : notifications.length > 0 ? (
          <div className="divide-y divide-outline-variant/5">
            {notifications.map((n) => {
              const Icon = n.icon;
              return (
                <div
                  key={n.id}
                  className="flex gap-4 py-6 hover:bg-slate-50 transition-colors cursor-pointer group"
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${n.bg} ${n.color}`}>
                    <Icon className="w-5 h-5" strokeWidth={2.5} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="text-[15px] font-bold text-on-surface leading-tight">{n.title}</h3>
                      <span className="text-[10px] font-medium text-on-surface-variant opacity-40 uppercase tracking-wider shrink-0 ml-2">{n.time}</span>
                    </div>
                    <p className="text-[14px] text-on-surface-variant leading-relaxed opacity-80">
                      {n.body}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-20 text-center">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Bell className="w-8 h-8 opacity-20" />
            </div>
            <h2 className="text-lg font-bold mb-2">No notifications yet</h2>
            <p className="text-sm text-on-surface-variant opacity-60">
              We'll notify you when something important happens.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
