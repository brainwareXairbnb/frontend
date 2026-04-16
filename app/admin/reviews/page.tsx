'use client';

import { 
  ShieldAlert, 
  Search, 
  Filter, 
  Star, 
  CheckCircle2, 
  Trash2, 
  MoreVertical, 
  ChevronLeft, 
  ChevronRight,
  Sparkles,
  Zap,
  MessageSquareOff,
  PackageOpen
} from 'lucide-react';
import { EmptyState } from '@/components/EmptyState';
import { ConfirmationModal } from '@/components/ConfirmationModal';
import { useState } from 'react';

export default function AdminReviewsPage() {
  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    type: 'success' | 'danger' | 'warning' | 'info';
    onConfirm: () => Promise<void>;
  }>({
    isOpen: false,
    title: '',
    message: '',
    type: 'info',
    onConfirm: async () => {},
  });

  const stats = {
    totalFlagged: 24,
    avgResponseTime: '1.2h',
  };

  const reviews = [
    {
      id: 1,
      property: "Scholar's Atrium",
      propertyImage: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=400&h=300&fit=crop',
      reviewer: 'Arnesh Maheshwari',
      rating: 2,
      date: 'Apr 08, 2024',
      flagReason: 'Inappropriate Content',
      comment: "This room was absolutely terrible. Dirty walls, broken furniture, and the owner was extremely rude. Don't waste your money on this scam!",
      avatar: 'https://ui-avatars.com/api/?name=Arnesh+Maheshwari&background=b6212f&color=fff&size=128',
    },
    {
      id: 2,
      property: 'The Nordic Retreat',
      propertyImage: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop',
      reviewer: 'Priya Sharma',
      rating: 1,
      date: 'Apr 07, 2024',
      flagReason: 'Spam Content',
      comment: "Visit my website for better deals! www.example.com - much cheaper rooms available. This platform charges too much!!!",
      avatar: 'https://ui-avatars.com/api/?name=Priya+Sharma&background=b6212f&color=fff&size=128',
    },
    {
      id: 3,
      property: 'Heritage Suite',
      propertyImage: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop',
      reviewer: 'Rohit Das',
      rating: 3,
      date: 'Apr 06, 2024',
      flagReason: 'False Information',
      comment: "The listing says it's 5 minutes from campus but it's actually 25 minutes. Total misrepresentation. The HVAC system doesn't work properly either.",
      avatar: 'https://ui-avatars.com/api/?name=Rohit+Das&background=b6212f&color=fff&size=128',
    },
  ];

  const handleApprove = (id: number) => {
    setModalConfig({
      isOpen: true,
      title: 'Approve Content',
      message: 'Are you sure you want to approve this review? It will be re-synchronized with the public asset profile.',
      type: 'success',
      onConfirm: async () => {
        // Mock API call
        console.log('Approved review', id);
      }
    });
  };

  const handlePurge = (id: number) => {
    setModalConfig({
      isOpen: true,
      title: 'Initialize Purge Sequence',
      message: 'This action will permanently delete the review from the ecosystem ledger. This operation is irreversible.',
      type: 'danger',
      onConfirm: async () => {
        // Mock API call
        console.log('Purged review', id);
      }
    });
  };

  return (
    <div className="px-6 md:px-12 py-10 pb-24 bg-[#fafafa]">
      <ConfirmationModal
        isOpen={modalConfig.isOpen}
        onClose={() => setModalConfig(prev => ({ ...prev, isOpen: false }))}
        onConfirm={modalConfig.onConfirm}
        title={modalConfig.title}
        message={modalConfig.message}
        type={modalConfig.type}
      />
      {/* Header Section */}
      <header className="mb-10">
        <div className="flex items-center gap-3 mb-4">
           <div className="w-8 h-8 bg-red-500/10 rounded-xl flex items-center justify-center text-red-500">
              <ShieldAlert className="w-4 h-4" />
           </div>
           <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-red-500">Content Moderation</h2>
        </div>
        <h1 className="text-4xl md:text-5xl font-headline font-black text-on-surface tracking-tighter uppercase mb-4">
           Flagged <span className="text-primary">Intelligence</span>
        </h1>
        <p className="text-on-surface-variant font-medium text-sm leading-relaxed max-w-2xl opacity-60 uppercase tracking-widest">
          Monitor and moderate user-flagged reviews. Maintain ecosystem integrity through direct protocol intervention.
        </p>
      </header>

      {/* Stats Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div className="bg-white p-8 rounded-[2.5rem] border border-outline-variant/10 shadow-xl shadow-black/[0.02] flex items-center justify-between group">
           <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-40 mb-2">
                Queue Depth
              </p>
              <h3 className="text-4xl font-headline font-black text-on-surface tracking-tighter uppercase">
                {stats.totalFlagged} <span className="text-[10px] opacity-20 ml-1">UNITS</span>
              </h3>
           </div>
           <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-red-500 group-hover:bg-red-500 group-hover:text-white transition-all duration-500">
              <MessageSquareOff className="w-8 h-8" />
           </div>
        </div>

        <div className="bg-on-surface p-8 rounded-[2.5rem] shadow-2xl flex items-center justify-between group">
           <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-surface opacity-40 mb-2">
                Velocity (Avg Response)
              </p>
              <h3 className="text-4xl font-headline font-black text-surface tracking-tighter uppercase">
                {stats.avgResponseTime} <span className="text-[10px] opacity-20 ml-1">CYCLES</span>
              </h3>
           </div>
           <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white shadow-xl shadow-primary/20 group-hover:rotate-12 transition-all">
              <Zap className="w-8 h-8" />
           </div>
        </div>
      </section>

      {/* Search and Filters */}
      <div className="mb-10 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/20 group-focus-within:text-primary transition-all" />
          <input
            type="text"
            placeholder="FILTER REVIEWS BY KEYWORD OR ENTITY..."
            className="w-full h-16 bg-white border border-outline-variant/10 rounded-2xl pl-16 pr-6 text-[10px] font-black uppercase tracking-widest text-on-surface focus:border-primary outline-none shadow-sm transition-all placeholder:opacity-30"
          />
        </div>
        <div className="flex gap-4">
          <button className="h-16 px-8 bg-white border border-outline-variant/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:border-primary/20 transition-all flex items-center gap-3">
            <Filter className="w-4 h-4 opacity-40" />
            Classifiers
          </button>
          <button className="h-16 px-10 bg-primary text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-primary/20 hover:opacity-90 active:scale-95 transition-all">
            Execute Filter
          </button>
        </div>
      </div>

      {/* Flagged Reviews List */}
      <section className="space-y-8">
        {reviews.length === 0 ? (
          <EmptyState
            icon={CheckCircle2}
            title="Registry Purified"
            message="No flagged content identifiers detected in the current ecosystem cycle."
          />
        ) : (
          reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-[3rem] border border-outline-variant/10 shadow-xl shadow-black/[0.02] overflow-hidden hover:shadow-2xl transition-all duration-700 group/card"
            >
              <div className="p-8 md:p-10">
                <div className="flex flex-col lg:flex-row gap-10">
                  {/* Property Image */}
                  <div className="w-full lg:w-64 h-48 rounded-[2rem] overflow-hidden bg-[#FAFAFA] shrink-0 relative">
                     <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700"></div>
                     <img
                      alt={review.property}
                      className="w-full h-full object-cover grayscale group-hover/card:grayscale-0 group-hover/card:scale-110 transition-all duration-1000"
                      src={review.propertyImage}
                    />
                    <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-xl shadow-sm">
                       <Star className="w-3 h-3 text-primary fill-primary" />
                       <span className="text-[10px] font-black text-on-surface">{review.rating}.0</span>
                    </div>
                  </div>

                  {/* Review Details */}
                  <div className="flex-1 flex flex-col">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                      <div>
                        <h3 className="font-headline text-2xl font-black text-on-surface tracking-tighter uppercase mb-1">
                          {review.property}
                        </h3>
                        <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-40">
                           <span>ENTITY ID: MOD-{review.id * 1024}</span>
                           <span>•</span>
                           <span>LOGGED: {review.date}</span>
                        </div>
                      </div>
                      <div className="px-4 py-2 bg-red-50 text-red-600 border border-red-100 rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center gap-2">
                        <ShieldAlert className="w-3 h-3" />
                        {review.flagReason}
                      </div>
                    </div>

                    <div className="flex items-start gap-5 mb-8 bg-[#FAFAFA] p-6 rounded-3xl border border-outline-variant/5">
                      <div className="w-12 h-12 rounded-2xl overflow-hidden bg-white shadow-sm shrink-0">
                        <img
                          alt={review.reviewer}
                          className="w-full h-full object-cover"
                          src={review.avatar}
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-[11px] font-black uppercase tracking-widest text-on-surface mb-2">{review.reviewer}</p>
                        <p className="text-sm font-medium text-on-surface-variant leading-relaxed italic opacity-80">
                          "{review.comment}"
                        </p>
                      </div>
                    </div>

                    <div className="mt-auto flex flex-wrap gap-4 pt-8 border-t border-outline-variant/10">
                      <button 
                        onClick={() => handleApprove(review.id)}
                        className="flex-1 h-14 bg-emerald-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 active:scale-95 transition-all flex items-center justify-center gap-3"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        Protocol Approve
                      </button>
                      <button 
                        onClick={() => handlePurge(review.id)}
                        className="flex-1 h-14 bg-red-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-red-500/20 hover:bg-red-600 active:scale-95 transition-all flex items-center justify-center gap-3"
                      >
                        <Trash2 className="w-4 h-4" />
                        Purge Sequence
                      </button>
                      <button className="w-14 h-14 flex items-center justify-center rounded-2xl border border-outline-variant/10 hover:bg-white hover:border-primary/20 transition-all group/more">
                        <MoreVertical className="w-5 h-5 text-on-surface-variant group-hover/more:text-primary" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </section>

      {/* Pagination */}
      <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-40">
          Showing <span className="text-on-surface opacity-100">1-3</span> of <span className="text-on-surface opacity-100">24</span> units in queue
        </p>
        <div className="flex gap-2">
          <button className="w-12 h-12 flex items-center justify-center rounded-2xl border border-outline-variant/10 hover:bg-white hover:border-primary/20 transition-all">
            <ChevronLeft className="w-4 h-4" />
          </button>
          {[1, 2, 3].map(page => (
            <button key={page} className={`w-12 h-12 flex items-center justify-center rounded-2xl font-black text-[10px] transition-all ${page === 1 ? 'bg-on-surface text-surface shadow-xl shadow-black/10' : 'bg-white border border-outline-variant/10 text-on-surface-variant hover:border-primary/20'}`}>
              {page}
            </button>
          ))}
          <button className="w-12 h-12 flex items-center justify-center rounded-2xl border border-outline-variant/10 hover:bg-white hover:border-primary/20 transition-all">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
