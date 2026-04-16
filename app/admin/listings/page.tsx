'use client';

import { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Eye, 
  CheckCircle2, 
  X, 
  ChevronLeft, 
  ChevronRight,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

export default function AdminListingsPage() {
  const [activeFilter, setActiveFilter] = useState('all');

  const listings = [
    {
      id: 1,
      title: "Scholar's Atrium",
      owner: 'Arnesh Maheshwari',
      status: 'Under Review',
      submitted: 'Apr 08, 24',
      price: '₹12,400/month',
      location: 'Barasat, Kolkata',
      image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=400&h=300&fit=crop',
      badge: 'NEW SUBMISSION',
    },
    {
      id: 2,
      title: 'Minimalist Studio',
      owner: 'Priya Roy',
      status: 'Pending Review',
      submitted: 'Apr 07, 24',
      price: '₹8,900/month',
      location: 'Newtown, Kolkata',
      image: 'https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=400&h=300&fit=crop',
      badge: null,
    },
    {
      id: 3,
      title: 'The Serenity Loft',
      owner: 'Rohit Saha',
      status: 'Approved',
      submitted: 'Apr 06, 24',
      price: '₹15,200/month',
      location: 'Salt Lake, Kolkata',
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop',
      badge: null,
    },
    {
      id: 4,
      title: 'Nordic Designer Pad',
      owner: 'Ankit Verma',
      status: 'Needs Revision',
      submitted: 'Apr 05, 24',
      price: '₹11,800/month',
      location: 'Madhyamgram, Kolkata',
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop',
      badge: null,
    },
    {
      id: 5,
      title: 'The Constellation Loft',
      owner: 'Sneha Das',
      status: 'Under Review',
      submitted: 'Apr 04, 24',
      price: '₹13,600/month',
      location: 'Barasat, Kolkata',
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&h=300&fit=crop',
      badge: null,
    },
    {
      id: 6,
      title: 'High-Rise Urban Suite',
      owner: 'Arjun Ghosh',
      status: 'Rejected',
      submitted: 'Apr 03, 24',
      price: '₹9,500/month',
      location: 'Rajarhat, Kolkata',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop',
      badge: 'REJECTED',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-emerald-50 text-emerald-600 border border-emerald-100';
      case 'Under Review':
        return 'bg-blue-50 text-blue-600 border border-blue-100';
      case 'Pending Review':
        return 'bg-orange-50 text-orange-600 border border-orange-100';
      case 'Needs Revision':
        return 'bg-yellow-50 text-yellow-700 border border-yellow-100';
      case 'Rejected':
        return 'bg-red-50 text-red-600 border border-red-100';
      default:
        return 'bg-gray-50 text-gray-600 border border-gray-100';
    }
  };

  return (
    <div className="px-6 md:px-12 py-6 pb-20">
      {/* Header Section */}
      <header className="mb-8">
        <h2 className="text-xl font-headline font-bold text-on-surface mb-1">Listing Approval</h2>
        <p className="text-on-surface-variant font-body text-sm leading-relaxed mb-6 max-w-2xl">
          Review and approve property listings to maintain quality standards and ensure property safety for students.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="flex-1 bg-white border border-outline-variant/10 rounded-xl px-4 py-3 flex items-center gap-3 w-full max-w-md shadow-sm focus-within:border-primary transition-all">
            <Search className="text-on-surface-variant w-5 h-5" />
            <input
              type="text"
              placeholder="Search listings by title or owner..."
              className="flex-1 bg-transparent border-none focus:outline-none text-sm placeholder:text-on-surface-variant/40"
            />
          </div>
        </div>
      </header>

      {/* Filter Tabs */}
      <div className="mb-8 flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {[
          { key: 'all', label: 'All Listings', count: 124 },
          { key: 'pending', label: 'Pending Review', count: 38 },
          { key: 'approved', label: 'Approved', count: 72 },
          { key: 'rejected', label: 'Rejected', count: 14 },
        ].map((filter) => (
          <button
            key={filter.key}
            onClick={() => setActiveFilter(filter.key)}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
              activeFilter === filter.key
                ? 'bg-primary text-on-primary shadow-md'
                : 'bg-white border border-outline-variant/10 text-on-surface-variant hover:bg-surface-container-lowest'
            }`}
          >
            {filter.label}
            <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-black ${activeFilter === filter.key ? 'bg-on-primary/20 text-on-primary' : 'bg-surface-container text-on-surface-variant/60'}`}>
              {filter.count}
            </span>
          </button>
        ))}
      </div>

      {/* Listings Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((listing) => (
          <div
            key={listing.id}
            className="group bg-white rounded-2xl border border-outline-variant/10 shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300"
          >
            <div className="relative aspect-video overflow-hidden bg-surface-container">
              {listing.badge && (
                <div className="absolute top-3 left-3 bg-primary/90 backdrop-blur-sm text-on-primary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest z-10 border border-primary/20">
                  {listing.badge}
                </div>
              )}
              <img
                alt={listing.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                src={listing.image}
              />
            </div>

            <div className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 min-w-0">
                  <h3 className="font-headline font-bold text-on-surface text-base mb-1.5 truncate group-hover:text-primary transition-colors">
                    {listing.title}
                  </h3>
                  <div className="flex items-center gap-1 text-on-surface-variant font-medium">
                    <MapPin className="w-3.5 h-3.5" />
                    <span className="text-[11px] uppercase tracking-wider">{listing.location}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center mb-6">
                <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${getStatusColor(listing.status)}`}>
                  {listing.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-5 border-t border-outline-variant/10 mb-6">
                <div>
                  <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest opacity-60 mb-1">Owner</p>
                  <p className="text-sm font-bold text-on-surface truncate">{listing.owner}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest opacity-60 mb-1">Price</p>
                  <p className="text-sm font-black text-primary">{listing.price}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 bg-surface-container hover:bg-surface-container-high active:scale-95 text-on-surface h-12 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-sm">
                  <Eye className="w-4 h-4" />
                  View
                </button>
                {listing.status === 'Under Review' || listing.status === 'Pending Review' ? (
                  <>
                    <button className="flex-1 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white h-12 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-sm">
                      <CheckCircle2 className="w-4 h-4" />
                      Approve
                    </button>
                    <button className="w-12 h-12 flex items-center justify-center rounded-xl bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 active:scale-95 transition-all">
                      <X className="w-5 h-5" />
                    </button>
                  </>
                ) : (
                  <button className="flex-1 bg-primary hover:brightness-110 active:scale-95 text-on-primary h-12 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-sm">
                    View Logs
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Pagination */}
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest opacity-60">
          Showing <span className="text-on-surface">1-6</span> of <span className="text-on-surface">124</span> listings
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
