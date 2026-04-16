'use client';

import { useState } from 'react';
import CreateListingDrawer from '@/components/CreateListingDrawer';
import { 
  Search, 
  Filter, 
  Plus, 
  CheckCircle2, 
  MapPin, 
  Bed, 
  Edit3, 
  Eye, 
  Clock, 
  AlertTriangle,
  ChevronRight,
  Zap,
  Star,
  Activity,
  ArrowUpRight
} from 'lucide-react';

export default function OwnerListingsPage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
    <div className="px-6 md:px-12 pb-20">
      {/* Header Section */}
      <header className="py-10">
        <div className="max-w-3xl mb-10">
           <h2 className="text-xl font-headline font-black text-on-surface mb-2 uppercase tracking-wide">Property Ecosystem</h2>
          <p className="text-on-surface-variant font-body text-base leading-relaxed font-medium">
            Review and curate your collection of managed properties. Orchestrate status cycles, deployment availability, and high-fidelity editorial details.
          </p>
        </div>
        <div className="flex flex-col xl:flex-row gap-4 xl:items-center justify-between">
          <div className="flex-1 bg-white border border-outline-variant/10 rounded-2xl px-5 py-4 flex items-center gap-3 shadow-sm focus-within:border-primary transition-all max-w-xl">
            <Search className="text-on-surface-variant/40 w-5 h-5" />
            <input
              className="flex-1 bg-transparent border-none focus:ring-0 text-sm font-bold outline-none placeholder:text-on-surface-variant/30"
              placeholder="Search by asset identifier or location..."
              type="text"
            />
          </div>
          <div className="flex gap-3">
            <button className="h-14 px-5 bg-white border border-outline-variant/10 rounded-2xl hover:bg-surface-container-low transition-all flex items-center gap-2 shadow-sm text-on-surface font-black uppercase tracking-widest text-[10px]">
              <Filter className="w-4 h-4" />
              Categorize
            </button>
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="flex-1 sm:flex-none h-14 bg-primary text-on-primary px-8 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:brightness-110 transition-all flex items-center justify-center gap-3 shadow-xl shadow-primary/20 active:scale-95 whitespace-nowrap"
            >
              <Plus className="w-5 h-5" />
              Deploy New Asset
            </button>
          </div>
        </div>
      </header>

      {/* Bento Grid Listings */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Listing 1: Approved */}
        <div className="lg:col-span-12 xl:col-span-8 bg-white rounded-[2.5rem] overflow-hidden border border-outline-variant/10 shadow-sm group hover:shadow-2xl transition-all duration-500">
          <div className="relative h-[480px] bg-surface-container overflow-hidden">
            <img
              alt="Cozy PG near North Gate"
              className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
              src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=1200&h=800&fit=crop"
            />
             <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="absolute top-8 left-8 flex gap-3">
              <span className="bg-emerald-500 text-white px-5 py-2 rounded-full text-[10px] font-black tracking-widest flex items-center gap-2 shadow-xl shadow-emerald-500/20">
                <CheckCircle2 className="w-3.5 h-3.5" />
                VERIFIED & DEPLOYED
              </span>
              <span className="bg-white/90 backdrop-blur-md text-on-surface px-5 py-2 rounded-full text-[10px] font-black tracking-widest border border-white/20">
                98% YIELD
              </span>
            </div>
             <div className="absolute bottom-10 left-10 right-10 flex flex-col md:flex-row justify-between items-end gap-6 text-white">
                <div>
                   <h2 className="font-headline text-3xl md:text-4xl font-black tracking-tighter mb-4 leading-none">
                     Cozy PG near North Gate
                   </h2>
                   <div className="flex flex-wrap items-center gap-6 font-bold text-sm opacity-90">
                      <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl">
                         <MapPin className="w-4 h-4" />
                         <span className="uppercase tracking-widest text-[10px]">Barasat, Kolkata</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl">
                         <Bed className="w-4 h-4" />
                         <span className="uppercase tracking-widest text-[10px]">Academic PG</span>
                      </div>
                   </div>
                </div>
                <div className="bg-primary px-8 py-6 rounded-3xl shadow-2xl shadow-primary/30 flex flex-col items-center">
                   <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">Monthly Yield</p>
                   <p className="text-3xl font-headline font-black tracking-tighter">₹6,500</p>
                </div>
             </div>
          </div>
          <div className="p-10 flex justify-between items-center gap-6">
             <div className="flex gap-10">
                <div>
                   <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest opacity-40 mb-2">Total Tenants</p>
                   <p className="text-xl font-headline font-black text-on-surface tracking-tight">1,248 Units</p>
                </div>
                <div className="w-px h-10 bg-outline-variant/10"></div>
                <div>
                   <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest opacity-40 mb-2">Retention Rate</p>
                   <p className="text-xl font-headline font-black text-emerald-600 tracking-tight">94.2%</p>
                </div>
             </div>
            <div className="flex gap-4">
              <button className="w-14 h-14 bg-surface-container rounded-2xl flex items-center justify-center hover:bg-primary hover:text-white hover:rotate-[360deg] transition-all duration-700 active:scale-90">
                <Edit3 className="w-6 h-6" />
              </button>
              <button className="w-14 h-14 bg-surface-container rounded-2xl flex items-center justify-center hover:bg-on-surface hover:text-white hover:-translate-y-1 transition-all active:scale-90">
                <Eye className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Stats/Action Cards (Bento Style) */}
        <div className="lg:col-span-12 xl:col-span-4 flex flex-col gap-8">
          <div className="bg-primary p-10 rounded-[2.5rem] flex-1 flex flex-col justify-between shadow-xl shadow-primary/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
            <div className="relative z-10">
               <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 text-on-primary rounded-full text-[9px] font-black uppercase tracking-widest mb-6">
                  <Activity className="w-3 h-3" />
                  Live Velocity
               </div>
              <h3 className="font-headline text-2xl font-black text-on-primary tracking-tight mb-4 leading-tight">Interaction Intelligence</h3>
              <p className="text-on-primary/80 font-medium text-sm leading-relaxed">
                Your managed properties achieved <span className="text-white font-black underline">1.4k interactions</span> across the ecosystem this week.
              </p>
            </div>
            <div className="mt-10 flex flex-col gap-6 relative z-10">
              <div className="flex justify-between items-end border-b border-on-primary/10 pb-4 group/item">
                <div className="flex flex-col">
                   <span className="text-[10px] font-black uppercase tracking-widest opacity-60 text-on-primary">Total Conversions</span>
                   <span className="font-headline text-3xl font-black text-on-primary tracking-tighter mt-1">24</span>
                </div>
                <ArrowUpRight className="w-5 h-5 text-on-primary/40 group-hover/item:translate-x-1 group-hover/item:-translate-y-1 transition-transform" />
              </div>
              <div className="flex justify-between items-end border-b border-on-primary/10 pb-4 group/item">
                <div className="flex flex-col">
                   <span className="text-[10px] font-black uppercase tracking-widest opacity-60 text-on-primary">Trust Score</span>
                   <span className="font-headline text-3xl font-black text-on-primary tracking-tighter mt-1 flex items-center gap-2">
                      4.9
                      <Star className="w-6 h-6 fill-white text-white" />
                   </span>
                </div>
                <Zap className="w-5 h-5 text-on-primary/40 group-hover:scale-125 transition-transform" />
              </div>
            </div>
          </div>

          <div className="bg-surface-container-low p-10 rounded-[2.5rem] flex-1 border border-outline-variant/10 group">
            <h3 className="font-headline text-xl font-black text-on-surface tracking-tight mb-8">Node Parameters</h3>
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                   <span className="block font-bold text-sm text-on-surface">Auto-Deployment</span>
                   <span className="text-[10px] font-medium text-on-surface-variant opacity-60">Accept bookings instantly</span>
                </div>
                <div className="w-14 h-8 bg-emerald-500 rounded-full relative flex items-center px-1 cursor-pointer shadow-inner">
                  <div className="w-6 h-6 bg-white rounded-full ml-auto shadow-lg transition-all"></div>
                </div>
              </div>
              <div className="w-full h-px bg-outline-variant/10"></div>
              <div className="flex justify-between items-center">
                <div>
                   <span className="block font-bold text-sm text-on-surface">Premium Multiplier</span>
                   <span className="text-[10px] font-medium text-on-surface-variant opacity-60">Peak market rate scaling</span>
                </div>
                <div className="w-14 h-8 bg-surface-container-highest rounded-full relative flex items-center px-1 cursor-pointer transition-colors hover:bg-surface-variant">
                  <div className="w-6 h-6 bg-white rounded-full shadow-lg transition-all"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Listing 2: Under Review */}
        <div className="lg:col-span-12 xl:col-span-6 bg-white rounded-[2.5rem] overflow-hidden border border-outline-variant/10 shadow-sm group hover:shadow-xl transition-all duration-500">
          <div className="relative h-[340px] bg-surface-container overflow-hidden">
            <img
              alt="Modern Flat"
              className="w-full h-full object-cover grayscale opacity-50 transition-transform duration-1000 group-hover:scale-105"
              src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop"
            />
             <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute top-8 left-8">
              <span className="bg-primary/90 backdrop-blur-md text-on-primary px-5 py-2 rounded-full text-[10px] font-black tracking-widest flex items-center gap-2 border border-white/10 shadow-lg">
                <Clock className="w-3.5 h-3.5" />
                INTELLIGENCE SYNCING
              </span>
            </div>
          </div>
          <div className="p-10">
            <h2 className="font-headline text-3xl font-black text-on-surface tracking-tight mb-4">
              Modern Flat — Fully Furnished
            </h2>
            <div className="flex items-center gap-2 text-on-surface-variant font-bold text-xs mb-8 opacity-70">
              <MapPin className="w-4 h-4" /> 
              <span className="uppercase tracking-widest">Green Park Sector, Kolkata</span>
            </div>
            <div className="flex justify-between items-center pt-8 border-t border-outline-variant/5">
              <div className="flex flex-col">
                 <span className="text-[9px] font-black text-on-surface-variant uppercase tracking-widest opacity-40 mb-1">Estimated Uptime</span>
                 <span className="text-sm font-bold text-on-surface">24 - 48 Business Hours</span>
              </div>
              <button className="text-primary font-black text-[10px] uppercase tracking-[0.2em] px-6 py-3 border border-primary/10 rounded-xl hover:bg-primary/5 transition-all">
                Sync Details
              </button>
            </div>
          </div>
        </div>

        {/* Listing 3: Rejected/Issue */}
        <div className="lg:col-span-12 xl:col-span-6 bg-white rounded-[2.5rem] overflow-hidden border border-outline-variant/10 shadow-sm group hover:shadow-xl transition-all duration-500 border-red-50">
          <div className="relative h-[340px] bg-red-500/5 group-hover:bg-red-500/10 transition-colors overflow-hidden">
            <img
              alt="3BHK Apartment"
              className="w-full h-full object-cover saturate-50 opacity-40 mix-blend-multiply transition-transform duration-1000 group-hover:scale-105"
              src="https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&h=600&fit=crop"
            />
            <div className="absolute top-8 left-8">
              <span className="bg-red-600 text-white px-5 py-2 rounded-full text-[10px] font-black tracking-widest flex items-center gap-2 shadow-xl shadow-red-600/20">
                <AlertTriangle className="w-3.5 h-3.5" />
                VALIDATION FAILED
              </span>
            </div>
          </div>
          <div className="p-10">
            <h2 className="font-headline text-3xl font-black text-on-surface tracking-tight mb-4 group-hover:text-red-600 transition-colors">3BHK Near South Gate</h2>
            <div className="bg-red-50 border border-red-100 p-6 rounded-[1.5rem] mb-8 group-hover:shadow-lg transition-all">
              <div className="flex items-start gap-4">
                 <AlertTriangle className="w-5 h-5 text-red-600 mt-1 shrink-0" />
                 <div>
                    <h4 className="text-xs font-black text-red-600 uppercase tracking-widest mb-1">Editorial Rejection</h4>
                    <p className="text-sm text-red-700/80 font-medium leading-relaxed">
                      L3 Validation failed: High-fidelity visual assets are required for the "Primary Living Zone." Current resolution is below platform par.
                    </p>
                 </div>
              </div>
            </div>
            <div className="flex justify-between items-center pt-8 border-t border-outline-variant/5">
               <span className="text-[10px] font-black text-red-600/60 uppercase tracking-widest">
                  Compliance Action Needed
               </span>
              <button className="bg-red-600 px-8 py-3.5 rounded-2xl text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-red-700 active:scale-95 transition-all shadow-xl shadow-red-600/20">
                Resolve Block
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>

    <CreateListingDrawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen} />
    </>
  );
}
