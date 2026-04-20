'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  ChevronRight,
  FileEdit,
  DoorOpen,
  MapPin,
  Wallet,
  ImagePlus,
  CheckSquare,
  Zap,
  ArrowLeft
} from 'lucide-react';
import { PhotoUpload } from '@/components/PhotoUpload';

export default function CreateListingPage() {
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [photos, setPhotos] = useState<string[]>([]);

  const amenities = [
    'High-Speed Wi-Fi',
    'Kitchen Access',
    'Air Conditioning',
    'Laundry In-Unit',
    'Private Bath',
    'Gym Access',
    'Pet Friendly',
    'Parking Space'
  ];

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  return (
    <div className="px-4 md:px-12 pb-20 bg-[#fafafa] min-h-screen">
      {/* Breadcrumb & Description */}
      <header className="py-12">
        <div className="flex items-center gap-3 text-on-surface-variant/40 mb-6">
          <Link href="/owner/listings" className="hover:text-primary transition-all text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
            <ArrowLeft className="w-3 h-3" />
            Inventory
          </Link>
          <ChevronRight className="w-3 h-3 opacity-20" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">New Deployment</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-headline font-black text-on-surface tracking-tighter uppercase mb-4">
           Initialize <span className="text-primary">Node Registry</span>
        </h1>
        <p className="text-on-surface-variant font-medium text-sm leading-relaxed max-w-2xl opacity-60 uppercase tracking-widest">
          Inject high-fidelity space telemetry into our residency ecosystem. Precision documentation accelerates node occupancy.
        </p>
      </header>

      {/* Form */}
      <form className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Primary Details */}
        <div className="lg:col-span-7 space-y-8">
          {/* Section 1: Identity */}
          <section className="bg-white p-8 md:p-10 rounded-[3rem] shadow-xl shadow-black/[0.02] border border-outline-variant/10">
            <div className="flex items-center gap-4 mb-10">
               <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary shadow-inner">
                  <FileEdit className="w-6 h-6" />
               </div>
               <div>
                  <h3 className="font-headline text-xl font-black text-on-surface tracking-tighter uppercase">Core Identity</h3>
                  <p className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant opacity-40">System Labels & Semantic Data</p>
               </div>
            </div>
            
            <div className="space-y-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-40 ml-1">
                  Module Designation
                </label>
                <input
                  className="w-full h-16 bg-[#FAFAFA] border border-outline-variant/10 rounded-2xl px-6 text-sm font-black text-on-surface focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/5 outline-none transition-all placeholder:opacity-30"
                  placeholder="e.g. Urban Habitat 01"
                  type="text"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-40 ml-1">
                  Telemetric manifest
                </label>
                <textarea
                  className="w-full bg-[#FAFAFA] border border-outline-variant/10 rounded-2xl p-6 text-sm font-black text-on-surface focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/5 outline-none transition-all placeholder:opacity-30 resize-none"
                  placeholder="Deconstruct your space into readable data points for prospective residents..."
                  rows={5}
                ></textarea>
              </div>
            </div>
          </section>

          {/* Section 2: Configuration */}
          <section className="bg-white p-8 md:p-10 rounded-[3rem] shadow-xl shadow-black/[0.02] border border-outline-variant/10">
            <div className="flex items-center gap-4 mb-10">
               <div className="w-12 h-12 bg-on-surface rounded-2xl flex items-center justify-center shadow-xl">
                  <DoorOpen className="w-6 h-6 text-white" />
               </div>
               <div>
                  <h3 className="font-headline text-xl font-black text-on-surface tracking-tighter uppercase">Physical Architecture</h3>
                  <p className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant opacity-40">Layout & Spatial Permissions</p>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-40 ml-1">
                  Space Category
                </label>
                <select className="w-full h-16 bg-[#FAFAFA] border border-outline-variant/10 rounded-2xl px-6 text-[10px] font-black uppercase tracking-widest text-on-surface focus:border-primary focus:bg-white outline-none appearance-none cursor-pointer">
                  <option>Individual Cell</option>
                  <option>Dual Habitat</option>
                  <option>Full Module (Flat)</option>
                  <option>Managed PG</option>
                  <option>Open Dormitory</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-40 ml-1">
                  Access Filter
                </label>
                <select className="w-full h-16 bg-[#FAFAFA] border border-outline-variant/10 rounded-2xl px-6 text-[10px] font-black uppercase tracking-widest text-on-surface focus:border-primary focus:bg-white outline-none appearance-none cursor-pointer">
                  <option>All Enrolled</option>
                  <option>Femme Only</option>
                  <option>Masculine Only</option>
                  <option>Integrated</option>
                </select>
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-40 ml-1">
                  Localization Coordinates (Address)
                </label>
                <div className="relative">
                  <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/20 transition-all" />
                  <input
                    className="w-full h-16 bg-[#FAFAFA] border border-outline-variant/10 rounded-2xl pl-16 pr-6 text-sm font-black text-on-surface focus:border-primary focus:bg-white outline-none transition-all placeholder:opacity-30"
                    placeholder="Sector, Landmark, Block, Hub..."
                    type="text"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Financials */}
          <section className="bg-white p-8 md:p-10 rounded-[3rem] shadow-xl shadow-black/[0.02] border border-outline-variant/10">
            <div className="flex items-center gap-4 mb-10">
               <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-xl shadow-emerald-500/20">
                  <Wallet className="w-6 h-6 text-white" />
               </div>
               <div>
                  <h3 className="font-headline text-xl font-black text-on-surface tracking-tighter uppercase">Fiscal Manifest</h3>
                  <p className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant opacity-40">Rental Rhythms & Security Staking</p>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-40 ml-1">
                  Cycle Yield (Monthly)
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-6 text-sm font-black text-on-surface opacity-40">₹</span>
                  <input
                    className="w-full h-16 bg-[#FAFAFA] border border-outline-variant/10 rounded-2xl pl-12 pr-6 text-sm font-black text-on-surface focus:border-primary focus:bg-white outline-none"
                    placeholder="0.00"
                    type="number"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-40 ml-1">
                  Staking Deposit
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-6 text-sm font-black text-on-surface opacity-40">₹</span>
                  <input
                    className="w-full h-16 bg-[#FAFAFA] border border-outline-variant/10 rounded-2xl pl-12 pr-6 text-sm font-black text-on-surface focus:border-primary focus:bg-white outline-none"
                    placeholder="0.00"
                    type="number"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Visuals & Amenities */}
        <div className="lg:col-span-5 space-y-8">
          {/* Image Upload Area */}
          <section className="bg-white p-8 md:p-10 rounded-[3rem] shadow-xl shadow-black/[0.02] border border-outline-variant/10">
            <div className="flex items-center gap-4 mb-10">
               <div className="w-12 h-12 bg-indigo-500 rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-500/20">
                  <ImagePlus className="w-6 h-6 text-white" />
               </div>
               <div>
                  <h3 className="font-headline text-xl font-black text-on-surface tracking-tighter uppercase">Visual Pipeline</h3>
                  <p className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant opacity-40">Raw Optical Data (Cloud Upload)</p>
               </div>
            </div>

            <PhotoUpload
              photos={photos}
              onChange={setPhotos}
              maxPhotos={10}
              minPhotos={2}
            />
          </section>

          {/* Amenities Checklist */}
          <section className="bg-white p-8 md:p-10 rounded-[3rem] shadow-xl shadow-black/[0.02] border border-outline-variant/10">
            <div className="flex items-center gap-4 mb-10">
               <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center shadow-xl shadow-orange-500/20">
                  <CheckSquare className="w-6 h-6 text-white" />
               </div>
               <div>
                  <h3 className="font-headline text-xl font-black text-on-surface tracking-tighter uppercase">Sub-Modules</h3>
                  <p className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant opacity-40">Utility Sync & Perks</p>
               </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {amenities.map((amenity) => (
                <label key={amenity} className="flex items-center gap-4 cursor-pointer group p-4 bg-[#FAFAFA] rounded-2xl border border-outline-variant/5 hover:border-primary/20 hover:bg-white transition-all">
                  <div className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-all ${selectedAmenities.includes(amenity) ? 'border-primary bg-primary shadow-lg shadow-primary/20' : 'border-outline-variant/20 bg-white group-hover:border-primary/20'}`}>
                    {selectedAmenities.includes(amenity) && <CheckSquare className="w-3.5 h-3.5 text-white" />}
                  </div>
                  <input
                    className="hidden"
                    type="checkbox"
                    checked={selectedAmenities.includes(amenity)}
                    onChange={() => toggleAmenity(amenity)}
                  />
                  <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant group-hover:text-primary transition-colors truncate">
                    {amenity}
                  </span>
                </label>
              ))}
            </div>
          </section>

          {/* Submit Button */}
          <div className="flex flex-col sm:flex-row gap-4 pt-10">
            <Link
              href="/owner/listings"
              className="flex-1 h-14 bg-surface-container-high border border-outline-variant/10 text-on-surface-variant px-8 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all"
            >
              Abort Entry
            </Link>
            <button
              type="submit"
              className="flex-1 h-14 bg-on-surface text-surface px-8 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-primary transition-all shadow-2xl shadow-on-surface/20 active:scale-95 flex items-center justify-center gap-3 group"
            >
              Deploy Deployment
              <Zap className="w-3 h-3 group-hover:scale-125 transition-transform" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
