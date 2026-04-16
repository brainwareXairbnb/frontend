'use client';

import { 
  Filter, 
  MapPin, 
  Clock, 
  ChevronRight, 
  GraduationCap, 
  Building2, 
  Calendar, 
  ShieldCheck,
  Zap,
  Star,
  Activity,
  UserCheck,
  CheckCircle2
} from 'lucide-react';
import { EmptyState } from '@/components/EmptyState';

export default function OwnerBookingsPage() {
  const bookings = [
    {
      id: 1,
      name: 'Rohit Saha',
      status: 'pending',
      program: 'B.Tech Computer Science',
      university: 'Brainware University',
      property: 'Heritage Suite, Room 2A',
      appliedTime: '2h ago',
      moveInDate: 'Sept 15, 2024',
      duration: '12 Months',
      avatar: 'https://ui-avatars.com/api/?name=Rohit+Saha&background=b6212f&color=fff&size=128'
    },
    {
      id: 2,
      name: 'Priya Nandi',
      status: 'pending',
      program: 'MBA Marketing',
      university: 'St. Xavier\'s College',
      property: 'Scholars Atrium',
      appliedTime: '1d ago',
      moveInDate: 'Aug 28, 2024',
      duration: '24 Months',
      avatar: 'https://ui-avatars.com/api/?name=Priya+Nandi&background=b6212f&color=fff&size=128'
    },
    {
      id: 3,
      name: 'Arif Islam',
      status: 'pending',
      program: 'M.Sc Data Science',
      university: 'Jadavpur University',
      property: 'Modern Loft, Room 1B',
      appliedTime: '3d ago',
      moveInDate: 'Oct 1, 2024',
      duration: '18 Months',
      avatar: 'https://ui-avatars.com/api/?name=Arif+Islam&background=b6212f&color=fff&size=128'
    }
  ];

  return (
    <div className="px-6 md:px-12 pb-20">
      {/* Header Section */}
      <header className="py-10 flex flex-col md:flex-row md:items-end justify-between gap-10 border-b border-outline-variant/5 mb-10">
        <div className="max-w-2xl">
           <h2 className="text-xl font-headline font-black text-on-surface mb-2 uppercase tracking-wide">Tenant Intel</h2>
          <p className="text-on-surface-variant font-body text-base leading-relaxed font-medium">
            Manage your incoming student residency lifecycle. Audit academic profiles, verified university affiliations, and secure move-in trajectories.
          </p>
        </div>
        <div className="flex gap-4">
           <div className="h-14 px-6 bg-white border border-outline-variant/10 rounded-2xl flex items-center gap-3 shadow-md shadow-black/[0.02] hover:bg-surface-container-low transition-all cursor-pointer group">
            <Filter className="text-primary w-4 h-4 group-hover:rotate-12 transition-transform" />
            <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Asset Topology</span>
          </div>
        </div>
      </header>

      {/* Inbox Grid/Bento Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Summary Stats (Intelligent Sidebar) */}
        <div className="lg:col-span-12 xl:col-span-3 space-y-8">
          <div className="bg-primary p-8 rounded-[2rem] shadow-xl shadow-primary/20 relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-on-primary/70 mb-4 relative z-10">
              Audit Queue
            </p>
            <div className="text-6xl font-black font-headline text-on-primary tracking-tighter relative z-10">08</div>
            <div className="mt-8 flex items-center justify-between relative z-10">
               <p className="text-xs font-medium text-on-primary/80 max-w-[140px]">
                  Unverified academic requests pending node commitment.
               </p>
               <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20">
                  <Zap className="w-5 h-5 text-on-primary" />
               </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2rem] border border-outline-variant/10 shadow-sm">
            <div className="flex items-center justify-between mb-8">
               <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-60">Asset Saturation</p>
               <Building2 className="w-4 h-4 text-primary" />
            </div>
            <div className="space-y-8">
               <div className="group">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-bold text-on-surface">The Heritage Loft</span>
                    <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded">2 UNITS LEFT</span>
                  </div>
                  <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden border border-outline-variant/5">
                    <div className="bg-emerald-500 h-full rounded-full transition-all duration-1000 group-hover:bg-primary shadow-[0_0_10px_rgba(16,185,129,0.3)]" style={{ width: '82%' }}></div>
                  </div>
               </div>
               <div className="group">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-bold text-on-surface">Scholars Atrium</span>
                    <span className="text-[10px] font-black text-orange-600 bg-orange-50 px-2 py-1 rounded">CRITICAL</span>
                  </div>
                  <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden border border-outline-variant/5">
                    <div className="bg-orange-500 h-full rounded-full transition-all duration-1000 group-hover:bg-primary shadow-[0_0_10px_rgba(249,115,22,0.3)]" style={{ width: '94%' }}></div>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Booking List */}
        <div className="lg:col-span-12 xl:col-span-9 space-y-6">
          {bookings.length === 0 ? (
            <EmptyState
              icon={CheckCircle2}
              title="Inbox Purified"
              message="No pending residency requests identifiers detected in the current ecosystem cycle."
            />
          ) : (
            bookings.map((booking) => (
              <div
                key={booking.id}
                className="group bg-white p-8 rounded-[2.5rem] flex flex-col lg:flex-row lg:items-center gap-8 shadow-sm border border-outline-variant/10 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 relative overflow-hidden"
              >
                 <div className="absolute top-0 right-0 w-2 h-full bg-primary/10 group-hover:bg-primary transition-colors"></div>
                <div className="flex items-center gap-6 flex-1">
                  <div className="relative shrink-0">
                     <div className="w-20 h-20 rounded-[2rem] overflow-hidden border-4 border-surface-container-low shadow-xl group-hover:scale-110 transition-transform duration-700">
                        <img
                          alt={booking.name}
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-opacity"
                          src={booking.avatar}
                        />
                     </div>
                    <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-emerald-500 border-4 border-white rounded-2xl shadow-lg flex items-center justify-center">
                       <ShieldCheck className="w-3.5 h-3.5 text-white" />
                    </div>
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-black font-headline text-on-surface tracking-tighter hover:text-primary transition-colors cursor-default">{booking.name}</h3>
                      <div className="flex items-center gap-1.5 px-3 py-1 bg-primary/5 text-primary rounded-xl text-[9px] font-black uppercase tracking-widest border border-primary/10">
                         <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></div>
                         {booking.status}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-on-surface-variant font-bold text-xs opacity-70 mb-4">
                       <GraduationCap className="w-4 h-4 text-primary" />
                       {booking.program} <span className="text-outline-variant mx-1">•</span> {booking.university}
                    </div>
                    <div className="flex flex-wrap items-center gap-6 text-[10px] font-black text-on-surface-variant uppercase tracking-widest opacity-40">
                      <div className="flex items-center gap-2 group/icon">
                        <MapPin className="w-3.5 h-3.5 group-hover/icon:text-primary transition-colors" />
                        {booking.property}
                      </div>
                      <div className="flex items-center gap-2 group/icon">
                        <Clock className="w-3.5 h-3.5 group-hover/icon:text-primary transition-colors" />
                        Applied {booking.appliedTime}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row xl:flex-col 2xl:flex-row items-center xl:items-end 2xl:items-center gap-8 lg:border-l lg:border-outline-variant/10 lg:pl-10 pt-8 lg:pt-0">
                  <div className="text-left xl:text-right 2xl:text-left min-w-[120px]">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant mb-2 opacity-50">
                      Residency Orbit
                    </p>
                    <div className="flex flex-col">
                      <span className="text-lg font-black font-headline text-on-surface tracking-tight">{booking.moveInDate}</span>
                      <div className="flex items-center gap-1.5 mt-1">
                         <Calendar className="w-3 h-3 text-primary" />
                         <span className="text-[10px] font-black text-primary uppercase tracking-wider">{booking.duration} Cycle</span>
                      </div>
                    </div>
                  </div>
                  <button className="h-14 px-8 bg-on-surface text-surface rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-primary hover:text-white hover:shadow-xl hover:shadow-primary/30 transition-all active:scale-95 flex items-center justify-center gap-2">
                    <UserCheck className="w-4 h-4" />
                    Audit Identity
                  </button>
                </div>
              </div>
            ))
          )}

          {/* Pagination/Load More */}
          <div className="pt-10 flex justify-center">
             <button className="h-14 px-10 border-2 border-outline-variant/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant hover:bg-white hover:border-primary/20 hover:text-primary transition-all">
                Load Extended Ecosystem Data
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
