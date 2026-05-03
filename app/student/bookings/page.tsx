"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { bookingsApi } from "@/lib/api";
import { Calendar, MapPin, ChevronRight, Info } from "lucide-react";
import { AuthPrompt } from "@/components/AuthPrompt";

export default function StudentBookingsPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState("Upcoming");
  const [bookings, setBookings] = useState<any[]>([]);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if (!user) return;
    const fetchBookings = async () => {
      setFetching(true);
      setError(null);
      try {
        const response: any = await bookingsApi.getStudentBookings();
        if (response && response.bookings) {
          setBookings(response.bookings);
        }
      } catch (err: any) {
        console.error('Failed to fetch bookings:', err);
        if (err?.isForbidden || err?.status === 403) {
          setError({
            type: 'role_mismatch',
            message: 'This section is only available for student accounts.',
            userRole: user?.role,
          });
        } else {
          setError({
            type: 'generic',
            message: 'Failed to load bookings. Please try again later.',
          });
        }
      } finally {
        setFetching(false);
      }
    };
    fetchBookings();
  }, [user]);

  if (loading || fetching) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#FF385C]/20 border-t-[#FF385C] rounded-full animate-spin"></div>
      </div>
    );
  }

  const upcomingBookings = bookings.filter(b => ['pending', 'accepted', 'payment_confirmed'].includes(b.status));
  const pastBookings = bookings.filter(b => ['cancelled', 'rejected', 'completed'].includes(b.status));
  const displayedBookings = activeTab === 'Upcoming' ? upcomingBookings : pastBookings;

  const statusLabel: Record<string, string> = {
    pending: 'Pending',
    accepted: 'Confirmed',
    payment_confirmed: 'Paid',
    cancelled: 'Cancelled',
    rejected: 'Rejected',
    completed: 'Completed',
  };

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

      <div className="px-8 md:px-10 pb-32 pt-2">
        {!user ? (
          <AuthPrompt
            title="Log in to view your bookings"
            description="You can view your active stays and booking history once you've logged in."
          />
        ) : error?.type === 'role_mismatch' ? (
          <div className="max-w-md mx-auto text-center py-12">
            <Info className="w-16 h-16 mx-auto text-blue-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">Student-Only Section</h3>
            <p className="text-on-surface-variant mb-4">{error.message}</p>
            <p className="text-sm text-on-surface-variant/60">
              You're viewing as: <strong className="capitalize">{error.userRole}</strong>
            </p>
          </div>
        ) : error?.type === 'generic' ? (
          <div className="max-w-md mx-auto text-center py-12">
            <p className="text-on-surface-variant mb-4">{error.message}</p>
          </div>
        ) : displayedBookings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedBookings.map((b) => {
              const listing = b.listing;
              const images = listing?.photos?.length ? listing.photos : [
                'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=2340'
              ];
              const location = listing?.address
                ? `${listing.address.street || ''}, ${listing.address.city || ''}`.replace(/^,\s*/, '')
                : 'Location unavailable';
              const moveIn = b.moveInDate ? new Date(b.moveInDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '';

              return (
                <div
                  key={b._id}
                  onClick={() => router.push(`/rooms/${listing?._id}`)}
                  className="flex flex-col gap-4 group cursor-pointer"
                >
                  <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-sm">
                    <img src={images[0]} className="w-full h-full object-cover" alt={listing?.title || 'Listing'} />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold uppercase">
                      {statusLabel[b.status] || b.status}
                    </div>
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-base font-bold text-on-surface group-hover:underline decoration-2 underline-offset-4">{listing?.title || 'Listing'}</p>
                      {moveIn && (
                        <div className="flex items-center gap-1.5 text-sm text-on-surface-variant mt-1">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>Move in: {moveIn}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1.5 text-sm text-on-surface-variant mt-1">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{location}</span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 opacity-30 mt-1" />
                  </div>
                  <div className="w-full h-px bg-outline-variant/10 mt-2" />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-20 text-center">
            <h2 className="text-[20px] font-bold mb-3">
              {activeTab === 'Upcoming' ? 'No upcoming bookings' : 'No past bookings'}
            </h2>
            <p className="text-[15px] text-on-surface-variant opacity-70">
              {activeTab === 'Upcoming'
                ? 'When you request a room, it will appear here.'
                : 'When you stay at a room, it will appear here.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}