"use client";
import { useState } from "react";
import { fmt } from "@/lib/data";
import { 
  ChevronLeft, 
  Heart, 
  Star, 
  MapPin, 
  Building2, 
  ShieldCheck, 
  Wifi, 
  Wind, 
  Utensils, 
  WashingMachine, 
  Lock, 
  ChefHat,
  Info,
  Calendar,
  Bed,
  CreditCard,
  Zap,
  UserCheck,
  X,
  ChevronRight
} from "lucide-react";

interface SDetailProps {
  room: any;
  setScreen: (screen: string) => void;
}

const Chip = ({ label, bg, color }: { label: string, bg?: string, color?: string }) => (
  <span 
    className="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-outline-variant/5"
    style={{ backgroundColor: bg || '#FAFAFA', color: color || '#1a1a1a' }}
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

export default function SDetail({ room, setScreen }: SDetailProps) {
  const r = room;
  const [saved, setSaved] = useState(false);

  const amenitiesMap: Record<string, any> = {
    "WiFi": { icon: Wifi, label: "Broadband" },
    "AC": { icon: Wind, label: "Climate Control" },
    "Meals": { icon: Utensils, label: "Nutritional Support" },
    "Laundry": { icon: WashingMachine, label: "Sanitation Lab" },
    "CCTV": { icon: Lock, label: "Grid Security" },
    "Kitchen": { icon: ChefHat, label: "Culinary Zone" }
  };

  return (
    <div className="bg-white min-h-screen pb-32">
      {/* Hero Image */}
      <div className="relative h-[380px] overflow-hidden">
        <div className="absolute inset-0" style={{ background: r.grad }}></div>
        <img 
           src={`https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=1200`}
           className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-80"
           alt={r.title}
        />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        
        {/* Navigation */}
        <div className="absolute top-8 left-8 right-8 flex justify-between items-center z-10">
          <button 
            onClick={() => setScreen("s-home")} 
            className="w-12 h-12 bg-white/90 backdrop-blur-xl rounded-2xl flex items-center justify-center shadow-xl active:scale-90 transition-all border border-white/20"
          >
            <ChevronLeft className="w-6 h-6 text-on-surface" />
          </button>
          <button 
            onClick={() => setSaved(!saved)}
            className="w-12 h-12 bg-white/90 backdrop-blur-xl rounded-2xl flex items-center justify-center shadow-xl active:scale-90 transition-all border border-white/20"
          >
            <Heart className={`w-6 h-6 ${saved ? 'fill-primary text-primary' : 'text-on-surface'}`} />
          </button>
        </div>

        <div className="absolute bottom-8 left-8 flex gap-3 z-10">
           <div className="px-4 py-1.5 bg-emerald-500/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest rounded-xl border border-white/10 shadow-xl">
              Verified Node
           </div>
           <div className="px-4 py-1.5 bg-white/20 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest rounded-xl border border-white/10">
              1 / 5 Assets
           </div>
        </div>
      </div>

      <div className="p-8">
        {/* Identity Section */}
        <div className="mb-10">
           <h1 className="text-3xl font-headline font-black text-on-surface tracking-tighter leading-none mb-6">
              {r.title}
           </h1>
           <div className="flex items-center gap-6 mb-8 pt-6 border-t border-outline-variant/5">
              <div className="flex items-center gap-2">
                 <Stars v={r.rating} />
                 <span className="text-[10px] font-black text-on-surface-variant opacity-40 uppercase tracking-widest">({r.reviews} Reports)</span>
              </div>
              <div className="w-px h-3 bg-outline-variant/10"></div>
              <div className="flex items-center gap-2 text-on-surface-variant font-bold text-xs opacity-60">
                 <MapPin className="w-3.5 h-3.5" />
                 {r.area}
              </div>
           </div>
           <div className="flex flex-wrap gap-3 mb-10">
              <Chip label={r.gender} bg="rgba(var(--primary-rgb),0.05)" color="var(--primary)" />
              <Chip label={r.type} />
              <Chip label={r.distance + " From Campus Hub"} />
           </div>
        </div>

        {/* Intelligence Summary */}
        <div className="bg-surface-container-low/30 border border-outline-variant/5 rounded-3xl p-8 mb-10">
           <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-4">Tactical briefing</h3>
           <p className="text-sm font-medium text-on-surface-variant leading-relaxed opacity-80">
              {r.desc}
           </p>
        </div>

        {/* Host Identity */}
        <div className="flex items-center gap-5 p-6 bg-[#FAFAFA] rounded-3xl border border-outline-variant/10 mb-12 group hover:bg-white hover:shadow-2xl transition-all duration-500">
           <div className="w-16 h-16 rounded-2xl overflow-hidden border-4 border-white shadow-xl group-hover:scale-110 transition-transform">
              <img src="https://ui-avatars.com/api/?name=Anita+Ghosh&background=b6212f&color=fff&size=128" alt="Host" />
           </div>
           <div>
              <p className="text-sm font-black text-on-surface mb-0.5">Anita Ghosh</p>
              <div className="flex items-center gap-1.5 text-[10px] font-black text-emerald-600 uppercase tracking-widest">
                 <UserCheck className="w-3.5 h-3.5" />
                 Verified System Host
              </div>
           </div>
           <div className="ml-auto">
              <ChevronRight className="w-5 h-5 text-on-surface-variant opacity-20" />
           </div>
        </div>

        {/* Amenity Grid */}
        <div className="mb-12">
           <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-40 mb-8">Facility Node Support</h3>
           <div className="grid grid-cols-2 gap-4">
              {Object.entries(amenitiesMap).map(([id, info]) => {
                const isIncluded = r.amenities.includes(id);
                const Icon = info.icon;
                return (
                  <div key={id} className={`flex items-center gap-4 p-5 rounded-2xl border transition-all ${isIncluded ? 'bg-white border-outline-variant/10 shadow-sm' : 'bg-[#FAFAFA] border-transparent opacity-30'}`}>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isIncluded ? 'bg-primary/5 text-primary' : 'bg-surface-container text-on-surface-variant'}`}>
                       <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-black text-on-surface uppercase tracking-widest">{info.label}</span>
                    {!isIncluded && <X className="ml-auto w-3.5 h-3.5 text-on-surface-variant/40" />}
                  </div>
                );
              })}
           </div>
        </div>

        {/* Node Specs */}
        <div className="mb-12">
           <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-40 mb-8">Hardware Specifications</h3>
           <div className="bg-white border border-outline-variant/10 rounded-3xl overflow-hidden shadow-sm">
              {[
                { l: "Monthly Lease", v: fmt(r.rent), i: CreditCard },
                { l: "Security Deposit", v: fmt(r.deposit), i: ShieldCheck },
                { l: "Uptime Sync", v: r.availFrom, i: Calendar },
                { l: "Unit Capacity", v: `${r.beds} Beds`, i: Bed },
              ].map((row, i, arr) => {
                const Icon = row.i;
                return (
                  <div key={row.l} className={`flex justify-between items-center p-6 ${i < arr.length - 1 ? 'border-b border-outline-variant/5' : ''}`}>
                    <div className="flex items-center gap-3">
                       <Icon className="w-4 h-4 text-primary opacity-40" />
                       <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-60">{row.l}</span>
                    </div>
                    <span className="text-sm font-black text-on-surface tracking-tight">{row.v}</span>
                  </div>
                );
              })}
           </div>
        </div>

        {/* Global Mapping */}
        <div className="mb-12">
           <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-40 mb-8">Territory Mapping</h3>
           <div className="h-40 relative rounded-[2.5rem] overflow-hidden border border-outline-variant/10 group">
              <div className="absolute inset-0 bg-blue-50/50"></div>
              <img 
                 src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=800" 
                 className="absolute inset-0 w-full h-full object-cover grayscale opacity-20"
                 alt="Map"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/20 backdrop-blur-[2px]">
                 <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white shadow-2xl shadow-primary/40 animate-bounce">
                    <MapPin className="w-6 h-6" />
                 </div>
                 <div className="mt-4 text-center">
                    <p className="text-xs font-black text-on-surface uppercase tracking-widest">{r.area}, KOLKATA HUB</p>
                    <p className="text-[10px] font-bold text-primary uppercase mt-1">SYNERGY SYNC: {r.distance}</p>
                 </div>
              </div>
           </div>
        </div>

        {/* Protocol Alert */}
        <div className="bg-orange-50 border border-orange-100 rounded-[2rem] p-8 mb-6 group overflow-hidden relative">
           <div className="absolute top-0 right-0 w-32 h-32 bg-orange-200/20 rounded-full -translate-y-1/2 translate-x-1/2 scale-150"></div>
           <div className="flex gap-4 relative z-10">
              <Info className="w-6 h-6 text-orange-600 shrink-0" />
              <div>
                 <h4 className="text-[10px] font-black text-orange-600 uppercase tracking-widest mb-2">Refund Protocol 1.0</h4>
                 <p className="text-xs font-medium text-orange-700/80 leading-relaxed">
                    Full sync refund T+7 days before move-in. 50% liquidity within 3–7 days. Total lockout within 72 hours.
                 </p>
              </div>
           </div>
        </div>
      </div>

      {/* Floating Action Dock */}
      <div className="fixed bottom-10 left-8 right-8 bg-white/90 backdrop-blur-2xl border border-outline-variant/10 h-24 rounded-[2.5rem] px-8 flex items-center justify-between shadow-[0_30px_60px_rgba(0,0,0,0.15)] z-[60]">
        <div>
          <div className="flex items-baseline gap-1">
             <span className="text-2xl font-black font-headline text-on-surface tracking-tighter">{fmt(r.rent)}</span>
             <span className="text-[10px] font-black text-on-surface-variant opacity-40 uppercase">/ CYCLE</span>
          </div>
          <div className="flex items-center gap-2 mt-1">
             <Stars v={r.rating} />
             <div className="w-1 h-1 bg-outline-variant/20 rounded-full"></div>
             <span className="text-[8px] font-black text-emerald-600 uppercase tracking-widest">Active Node</span>
          </div>
        </div>
        <button 
           onClick={() => setScreen("s-payment")} 
           className="h-14 px-8 bg-primary text-on-primary rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-primary/30 active:scale-95 transition-all flex items-center gap-3"
        >
           Book Node
           <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}