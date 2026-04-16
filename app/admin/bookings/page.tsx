'use client';

import { useState } from 'react';
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  Home, 
  MoreVertical, 
  ChevronLeft, 
  ChevronRight,
  Calendar,
  Clock,
  User,
  Building2,
  FileText
} from 'lucide-react';

export default function AdminBookingsPage() {
  const [activeView, setActiveView] = useState('list');

  const bookings = [
    {
      id: 'BR-88218',
      property: 'The Scholar Suite',
      propertyImage: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=400&h=300&fit=crop',
      student: 'Arnesh Maheshwari',
      owner: 'Priya Chatterjee',
      checkIn: 'Feb 12, 2024',
      checkOut: 'Jul 30, 2024',
      duration: '169 days',
      amount: '₹82,400',
      status: 'Accepted',
      badge: 'ONGOING',
    },
    {
      id: 'BR-88220',
      property: 'Urban Retreat',
      propertyImage: 'https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=400&h=300&fit=crop',
      student: 'Rohit Kumar',
      owner: 'Ankit Verma',
      checkIn: 'Feb 20, 2024',
      checkOut: 'Jun 18, 2024',
      duration: '119 days',
      amount: '₹54,200',
      status: 'Payment Confirmed',
      badge: null,
    },
    {
      id: 'BR-88225',
      property: 'Heritage Loft',
      propertyImage: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop',
      student: 'Sneha Roy',
      owner: 'Arjun Das',
      checkIn: 'Feb 08, 2024',
      checkOut: 'June 20, 2024',
      duration: '133 days',
      amount: '₹68,900',
      status: 'Pending',
      badge: null,
    },
    {
      id: 'BR-87910',
      property: 'Smart Haven',
      propertyImage: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop',
      student: 'Priya Sharma',
      owner: 'Rohit Saha',
      checkIn: 'Jan 15, 2024',
      checkOut: 'Jul 15, 2024',
      duration: '182 days',
      amount: '₹91,200',
      status: 'Completed',
      badge: null,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Accepted':
      case 'Completed':
        return 'bg-emerald-50 text-emerald-600 border border-emerald-100';
      case 'Payment Confirmed':
        return 'bg-blue-50 text-blue-600 border border-blue-100';
      case 'Pending':
        return 'bg-orange-50 text-orange-600 border border-orange-100';
      case 'Cancelled':
        return 'bg-red-50 text-red-600 border border-red-100';
      default:
        return 'bg-gray-50 text-gray-600 border border-gray-100';
    }
  };

  return (
    <div className="px-6 md:px-12 py-6 pb-20">
      {/* Header Section */}
      <header className="mb-8">
        <h2 className="text-xl font-headline font-bold text-on-surface mb-1">Booking Management</h2>
        <p className="text-on-surface-variant font-body text-sm leading-relaxed mb-6 max-w-2xl">
          Comprehensive overview of all platform bookings with real-time status tracking and management.
        </p>
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
          <div className="flex-1 bg-white border border-outline-variant/10 rounded-xl px-4 py-3 flex items-center gap-3 w-full max-w-md shadow-sm focus-within:border-primary transition-all">
            <Search className="text-on-surface-variant w-5 h-5" />
            <input
              type="text"
              placeholder="Search by student, owner, or Booking ID..."
              className="flex-1 bg-transparent border-none focus:outline-none text-sm placeholder:text-on-surface-variant/40"
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="h-12 px-4 bg-white border border-outline-variant/10 rounded-xl text-xs font-black uppercase tracking-widest text-on-surface-variant hover:bg-surface-container transition-all flex items-center gap-2 shadow-sm">
              <Filter className="w-4 h-4" />
              Filter
            </button>
            <button className="h-12 px-4 bg-white border border-outline-variant/10 rounded-xl text-xs font-black uppercase tracking-widest text-on-surface-variant hover:bg-surface-container transition-all flex items-center gap-2 shadow-sm">
              <ArrowUpDown className="w-4 h-4" />
              Sort
            </button>
            <button className="h-12 px-6 bg-primary text-on-primary rounded-xl font-black text-xs uppercase tracking-[0.15em] hover:brightness-110 active:scale-95 transition-all shadow-md shadow-primary/20">
              Apply
            </button>
          </div>
        </div>
      </header>

      {/* View Toggle */}
      <div className="mb-8 flex gap-3 p-1 bg-surface-container-lowest w-fit rounded-2xl border border-outline-variant/10">
        <button
          onClick={() => setActiveView('list')}
          className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
            activeView === 'list'
              ? 'bg-white text-primary shadow-sm'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          List View
        </button>
        <button
          onClick={() => setActiveView('calendar')}
          className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
            activeView === 'calendar'
              ? 'bg-white text-primary shadow-sm'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          Calendar
        </button>
      </div>

      {/* Bookings List */}
      <section className="space-y-4">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="group bg-white rounded-3xl border border-outline-variant/10 shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="p-6 flex flex-col lg:flex-row gap-6">
              {/* Property Image */}
              <div className="relative w-full lg:w-40 h-40 rounded-2xl overflow-hidden bg-surface-container shrink-0">
                {booking.badge && (
                  <div className="absolute top-3 left-3 bg-primary/90 backdrop-blur-sm text-on-primary px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest z-10 border border-primary/20">
                    {booking.badge}
                  </div>
                )}
                <img
                  alt={booking.property}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  src={booking.propertyImage}
                />
              </div>

              {/* Booking Details */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Booking ID & Property */}
                <div className="space-y-3">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-60 mb-1">
                      Booking ID
                    </p>
                    <p className="text-xl font-headline font-black text-on-surface tracking-tight group-hover:text-primary transition-colors">
                      #{booking.id}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-on-surface-variant">
                    <Home className="w-3.5 h-3.5" />
                    <span className="text-[11px] font-bold uppercase tracking-wider truncate">{booking.property}</span>
                  </div>
                </div>

                {/* Student & Owner */}
                <div className="space-y-3">
                  <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-60">
                    Parties Involved
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-primary/5 flex items-center justify-center">
                      <User className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <p className="text-sm font-bold text-on-surface">{booking.student}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-surface-container flex items-center justify-center">
                      <Building2 className="w-3.5 h-3.5 text-on-surface-variant" />
                    </div>
                    <p className="text-[11px] font-bold text-on-surface-variant truncate">Owner: {booking.owner}</p>
                  </div>
                </div>

                {/* Duration */}
                <div className="space-y-3">
                  <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-60">
                    Stay Duration
                  </p>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-on-surface-variant" />
                    <p className="text-xs font-bold text-on-surface">{booking.checkIn}</p>
                  </div>
                  <div className="flex items-center gap-2 pl-[1.125rem] border-l border-outline-variant/30 ml-[0.4375rem] py-1">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-primary" />
                      <p className="text-[11px] font-black text-primary uppercase tracking-wider">{booking.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 font-medium">
                    <p className="text-[10px] text-on-surface-variant opacity-60 uppercase pl-[1.125rem]">to</p>
                    <p className="text-xs font-bold text-on-surface">{booking.checkOut}</p>
                  </div>
                </div>

                {/* Status & Actions */}
                <div className="flex flex-col justify-between">
                  <div className="space-y-2">
                    <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-60">
                      Current Status
                    </p>
                    <span className={`inline-flex items-center px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-4">
                    <button className="flex-1 bg-surface-container hover:bg-surface-container-high h-10 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest text-on-surface transition-all active:scale-95 shadow-sm flex items-center justify-center gap-2">
                      <FileText className="w-3.5 h-3.5" />
                      Details
                    </button>
                    <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-surface-container-lowest border border-outline-variant/10 hover:bg-surface-container active:scale-95 transition-all">
                      <MoreVertical className="w-4 h-4 text-on-surface-variant" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Amount */}
              <div className="lg:border-l lg:border-outline-variant/10 lg:pl-6 flex flex-col justify-center items-start lg:items-end lg:min-w-[140px]">
                <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-60 mb-2">
                  Total Revenue
                </p>
                <p className="text-2xl font-headline font-black text-primary tracking-tighter">
                  {booking.amount}
                </p>
                <div className="mt-2 flex items-center gap-1.5 px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100">
                  <span className="text-[8px] font-black uppercase tracking-widest">PAID</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Pagination */}
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest opacity-60">
          Showing <span className="text-on-surface font-black">1-4</span> of <span className="text-on-surface font-black">1,842</span> bookings
        </p>
        <div className="flex gap-2 p-1 bg-surface-container-lowest rounded-2xl border border-outline-variant/10">
          <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-surface-container transition-all active:scale-90">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20 text-on-primary font-black text-xs">
            1
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-surface-container transition-all text-xs font-bold active:scale-90">
            2
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-surface-container transition-all text-xs font-bold active:scale-90">
            3
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-surface-container transition-all active:scale-90">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
