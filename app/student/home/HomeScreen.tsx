"use client";
import { useState } from "react";
import { ROOMS, fmt } from "@/lib/data";
import { 
  Search, 
  Settings2, 
  MapPin, 
  Star, 
  Heart, 
  ChevronRight, 
  SlidersHorizontal, 
  X,
  Plus,
  Compass,
  Zap,
  Building2
} from "lucide-react";

interface ChipProps {
  label: string;
  bg?: string;
  color?: string;
}

const Chip = ({ label, bg, color }: ChipProps) => (
  <span 
    className="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-white/20"
    style={{ backgroundColor: bg || 'rgba(255,255,255,0.9)', color: color || '#1a1a1a' }}
  >
    {label}
  </span>
);

const Stars = ({ v }: { v: number }) => (
  <div className="flex items-center gap-0.5">
     <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
     <span className="text-[11px] font-black text-on-surface">{v}</span>
  </div>
);

interface SHomeProps {
  setScreen: (screen: string) => void;
  setRoom: (room: any) => void;
}

export default function SHome({ setScreen, setRoom }: SHomeProps) {
  const [activeType, setActiveType] = useState("All");
  const [saved, setSaved] = useState(ROOMS.map(r => r.saved));
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 50000 });
  const [selectedGender, setSelectedGender] = useState("All");
  
  const types = ["All","PG","Flat","Single","Double","Dormitory"];
  const genders = ["All", "Male", "Female", "Co-ed"];
  
  const filtered = ROOMS.filter(r =>
    (activeType === "All" || r.type === activeType) &&
    (selectedGender === "All" || r.gender === selectedGender) &&
    r.rent >= priceRange.min && r.rent <= priceRange.max
  );

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-xl z-40 border-b border-outline-variant/5">
        <div className="p-6 pb-2">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                 <Compass className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-headline font-black tracking-tighter uppercase">
                 Brainware <span className="text-primary">Rooms</span>
              </span>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-orange-400 border-4 border-white shadow-xl flex items-center justify-center text-white font-black text-sm">R</div>
          </div>

          <div 
            onClick={() => setShowFilters(true)} 
            className="bg-[#FAFAFA] rounded-2xl p-4 flex items-center gap-4 border border-outline-variant/10 shadow-sm active:scale-[0.98] transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:text-primary transition-colors">
               <Search className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-black text-on-surface tracking-tight truncate">Explore Campus Orbit</p>
              <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest opacity-60">
                 {activeType} · {selectedGender} · ₹{priceRange.min/1000}k+
              </p>
            </div>
            <div className="w-10 h-10 bg-on-surface text-surface rounded-xl flex items-center justify-center shadow-xl shadow-on-surface/10">
               <SlidersHorizontal className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-2 p-6 pt-2 pb-6 overflow-x-auto noscrollbar">
          {types.map(t => (
            <button 
              key={t} 
              onClick={() => setActiveType(t)} 
              className={`px-6 h-10 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap active:scale-90 ${activeType === t ? 'bg-on-surface text-surface shadow-lg shadow-on-surface/10' : 'bg-[#FAFAFA] border border-outline-variant/10 text-on-surface-variant opacity-60'}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Main List */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
           <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-40">
              {filtered.length} DISCOVERIES DETECTED
           </h2>
           <div className="flex items-center gap-1.5 text-[10px] font-black text-emerald-600">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
              NEAR CAMPUS
           </div>
        </div>

        <div className="space-y-10">
          {filtered.map((room, i) => (
            <div 
              key={room.id} 
              onClick={() => { setRoom(room); setScreen("s-detail"); }} 
              className="group relative animate-in fade-in slide-in-from-bottom-8 duration-700"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="relative aspect-[1.1] rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-700 group-hover:-translate-y-2 group-hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.2)]">
                <div className="absolute inset-0" style={{ background: room.grad }}></div>
                <img 
                   src={`https://images.unsplash.com/photo-${1550000000000 + i}?auto=format&fit=crop&q=80&w=800`}
                   className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-80 group-hover:scale-110 transition-transform duration-[2000ms]"
                   alt={room.title}
                />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                
                {/* Actions */}
                <button 
                  onClick={ev => { ev.stopPropagation(); setSaved(s => s.map((v,j) => j===i?!v:v)); }} 
                  className="absolute top-6 right-6 w-12 h-12 bg-white/90 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center shadow-xl active:scale-90 transition-all z-10"
                >
                  <Heart className={`w-5 h-5 transition-all ${saved[i] ? 'fill-primary text-primary scale-125' : 'text-on-surface'}`} />
                </button>
                
                {/* Badges */}
                <div className="absolute bottom-10 left-8 flex gap-3 z-10">
                  <Chip label={room.gender} bg="rgba(255,255,255,0.95)" />
                  <Chip label={room.type} bg="rgba(0,0,0,0.5)" color="#fff" />
                </div>
              </div>

              <div className="mt-8 px-2">
                <div className="flex justify-between items-start mb-4">
                  <div className="min-w-0 flex-1 pr-6">
                    <h3 className="font-headline text-2xl font-black text-on-surface tracking-tighter mb-1 truncate group-hover:text-primary transition-colors">
                       {room.title}
                    </h3>
                    <div className="flex items-center gap-2 text-on-surface-variant font-bold text-xs opacity-60">
                       <MapPin className="w-3.5 h-3.5" />
                       {room.area} <span className="mx-1 opacity-20">•</span> {room.distance} CAMPUS SYNC
                    </div>
                  </div>
                  <div className="pt-1">
                    <Stars v={room.rating} />
                  </div>
                </div>
                
                <div className="flex justify-between items-end border-t border-outline-variant/5 pt-6">
                  <div>
                    <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest opacity-40 mb-1">Monthly Ledger</p>
                    <div className="flex items-baseline gap-1">
                       <strong className="text-2xl font-black font-headline text-primary tracking-tighter">{fmt(room.rent)}</strong>
                       <span className="text-[10px] font-black text-on-surface-variant opacity-40">/ CYCLE</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-[#FAFAFA] border border-outline-variant/10 px-4 py-2 rounded-xl">
                     <Zap className="w-3.5 h-3.5 text-primary" />
                     <span className="text-[10px] font-black text-on-surface tracking-widest">{room.reviews} REPORTS</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Bottom Drawer */}
      {showFilters && (
        <>
          {/* Backdrop */}
          <div 
             onClick={() => setShowFilters(false)} 
             className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999] animate-in fade-in duration-300" 
          />

          {/* Drawer */}
          <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[3rem] z-[1000] p-8 pb-12 shadow-[0_-20px_60px_rgba(0,0,0,0.2)] animate-in slide-in-from-bottom duration-500">
            {/* Handle */}
            <div className="flex justify-center mb-8">
              <div className="w-12 h-1.5 bg-outline-variant/20 rounded-full" />
            </div>

            {/* Header */}
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-3xl font-headline font-black tracking-tighter">Refine Hub</h3>
              <button 
                onClick={() => setShowFilters(false)} 
                className="w-12 h-12 bg-[#FAFAFA] rounded-2xl flex items-center justify-center border border-outline-variant/10 active:scale-90 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filter Content */}
            <div className="space-y-12">
              {/* Room Type */}
              <div className="space-y-6">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-40">Topology Selection</h4>
                <div className="flex flex-wrap gap-3">
                  {types.map(t => (
                    <button 
                      key={t} 
                      onClick={() => setActiveType(t)} 
                      className={`px-6 h-12 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeType === t ? 'bg-primary text-on-primary shadow-xl shadow-primary/20' : 'bg-[#FAFAFA] border border-outline-variant/10 text-on-surface-variant'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Gender Preference */}
              <div className="space-y-6">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-40">Demographic Filtering</h4>
                <div className="flex flex-wrap gap-3">
                  {genders.map(g => (
                    <button 
                      key={g} 
                      onClick={() => setSelectedGender(g)} 
                      className={`px-6 h-12 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${selectedGender === g ? 'bg-primary text-on-primary shadow-xl shadow-primary/20' : 'bg-[#FAFAFA] border border-outline-variant/10 text-on-surface-variant'}`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range (Simplified for Mobile UI) */}
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                   <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-40">Monthly Budget Sink</h4>
                   <span className="text-sm font-black text-primary tracking-tight">₹{fmt(priceRange.max)}</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="50000" 
                  step="1000" 
                  value={priceRange.max} 
                  onChange={e => setPriceRange({...priceRange, max: parseInt(e.target.value)})} 
                  className="w-full accent-primary h-2 bg-slate-100 rounded-full appearance-none cursor-pointer" 
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6">
                <button 
                  onClick={() => { setActiveType("All"); setSelectedGender("All"); setPriceRange({min:0,max:50000}); }} 
                  className="flex-1 h-16 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant hover:bg-[#FAFAFA] transition-all"
                >
                  Reset Registry
                </button>
                <button 
                   onClick={() => setShowFilters(false)} 
                   className="flex-[1.5] h-16 bg-on-surface text-surface rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl shadow-on-surface/20 active:scale-95 transition-all"
                >
                  Deploy {filtered.length} Discoveries
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      
      <style jsx global>{`
        .noscrollbar::-webkit-scrollbar {
          display: none;
        }
        .noscrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}