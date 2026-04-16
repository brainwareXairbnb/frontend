"use client";
import { useState } from "react";
import { fmt } from "@/lib/data";
import { 
  ChevronLeft, 
  Star, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  CreditCard, 
  Zap, 
  CheckCircle2, 
  Home, 
  ArrowRight,
  Info,
  Smartphone,
  Landmark,
  Wallet,
  ZapIcon
} from "lucide-react";

interface SPaymentProps {
  room: any;
  setScreen: (screen: string) => void;
}

const Stars = ({ v }: { v: number }) => (
  <div className="flex items-center gap-0.5">
     <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
     <span className="text-[10px] font-black text-on-surface">{v}</span>
  </div>
);

export default function SPayment({ room, setScreen }: SPaymentProps) {
  const r = room;
  const [months, setMonths] = useState(3);
  const [moveIn, setMoveIn] = useState("");
  const [step, setStep] = useState(1);
  const gross = r.rent * months;
  const sc = Math.round(gross * 0.05);
  const total = gross + r.deposit + sc;

  if (step === 2) return (
    <div className="p-10 flex flex-col items-center text-center animate-in fade-in zoom-in duration-700">
      <div className="w-24 h-24 rounded-[2.5rem] bg-emerald-500 text-white flex items-center justify-center shadow-2xl shadow-emerald-500/30 mb-10 group bg-on-surface">
         <CheckCircle2 className="w-10 h-10 group-hover:scale-110 transition-transform" />
      </div>
      <h2 className="text-3xl font-headline font-black text-on-surface tracking-tighter mb-4">Request Deployed</h2>
      <p className="text-sm font-medium text-on-surface-variant leading-relaxed opacity-60 mb-12">
        Your residency request has been transmitted to the node host. You'll receive a system sync once validated.
      </p>
      <div className="w-full bg-[#FAFAFA] border border-outline-variant/10 rounded-[2.5rem] p-8 text-left mb-10 overflow-hidden relative">
         <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest mb-6 opacity-40">Booking Manifest</p>
        <div className="space-y-4">
          {[
            { l: "Unit", v: r.title, i: Home },
            { l: "Timeline", v: moveIn || "1 May 2026", i: Calendar },
            { l: "Cycles", v: `${months} Months`, i: Clock },
            { l: "Total Yield", v: fmt(total), i: CreditCard },
          ].map(row => {
            const Icon = row.i;
            return (
              <div key={row.l} className="flex justify-between items-center group">
                <div className="flex items-center gap-2">
                   <Icon className="w-3.5 h-3.5 text-primary opacity-40 group-hover:opacity-100 transition-opacity" />
                   <span className="text-xs font-bold text-on-surface-variant opacity-60 uppercase tracking-tighter">{row.l}</span>
                </div>
                <span className="text-sm font-black text-on-surface tracking-tight">{row.v}</span>
              </div>
            );
          })}
        </div>
      </div>
      <button 
         onClick={() => setScreen("s-bookings")} 
         className="w-full h-16 bg-on-surface text-surface rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-on-surface/20 active:scale-95 transition-all mb-4"
      >
         Monitor Stays
      </button>
      <button 
         onClick={() => setScreen("s-home")} 
         className="w-full h-16 bg-white border border-outline-variant/10 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] text-on-surface-variant hover:bg-surface-container-low transition-all"
      >
         Exploration Hub
      </button>
    </div>
  );

  return (
    <div className="bg-white min-h-screen pb-32">
      {/* Header */}
      <div className="p-8 pb-6 flex items-center justify-between border-b border-outline-variant/5">
        <button 
           onClick={() => setScreen("s-detail")} 
           className="w-12 h-12 bg-[#FAFAFA] rounded-2xl flex items-center justify-center border border-outline-variant/10 hover:border-primary/20 transition-all active:scale-90"
        >
          <ChevronLeft className="w-5 h-5 text-on-surface" />
        </button>
        <h2 className="text-xl font-headline font-black tracking-tighter uppercase">Request Node</h2>
        <div className="w-12 h-12"></div>
      </div>

      {/* Mini Summary */}
      <div className="flex gap-4 p-8 bg-[#FAFAFA] border-b border-outline-variant/5">
        <div className="w-20 h-20 rounded-2xl overflow-hidden border-4 border-white shadow-lg" style={{ background: r.grad }}>
           <img src={`https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=100&w=200`} className="w-full h-full object-cover mix-blend-overlay opacity-80" alt={r.title} />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-black text-on-surface truncate mb-1">{r.title}</p>
          <p className="text-[10px] font-black text-on-surface-variant opacity-40 uppercase tracking-widest mb-2">{r.area} <span className="mx-1">•</span> {r.type}</p>
          <Stars v={r.rating} />
        </div>
      </div>

      <div className="p-8">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-40 mb-8">Residency Trajectory</h3>
        
        {/* Date & Duration */}
        <div className="border border-outline-variant/10 rounded-[2rem] overflow-hidden mb-10 shadow-sm">
          <div className="p-6 border-b border-outline-variant/5 bg-white group hover:bg-primary/[0.02] transition-colors">
            <p className="text-[9px] font-black text-primary uppercase tracking-[0.2em] mb-2">Initialize Move-in</p>
            <div className="flex items-center gap-3">
               <Calendar className="w-4 h-4 text-on-surface-variant opacity-40" />
               <input 
                  type="date" 
                  value={moveIn} 
                  onChange={e => setMoveIn(e.target.value)} 
                  className="bg-transparent border-none outline-none text-sm font-black text-on-surface w-full uppercase tracking-tighter" 
               />
            </div>
          </div>
          <div className="p-6 bg-white">
            <p className="text-[9px] font-black text-on-surface-variant uppercase tracking-[0.2em] mb-4 opacity-40">Orbital Duration</p>
            <div className="grid grid-cols-5 gap-2">
              {[1,2,3,6,12].map(m => (
                <button 
                   key={m} 
                   onClick={() => setMonths(m)} 
                   className={`h-10 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${months === m ? 'bg-on-surface text-surface shadow-lg' : 'bg-[#FAFAFA] text-on-surface-variant opacity-60 border border-outline-variant/5'}`}
                >
                   {m}M
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Ledger Details */}
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-40 mb-8">Yield Calculations</h3>
        <div className="space-y-5 mb-12">
          {[
            { l: `${fmt(r.rent)} × ${months} Cycles`, v: fmt(gross), i: Clock },
            { l: "Security Bond (Refundable)", v: fmt(r.deposit), i: ShieldCheck },
            { l: "Platform Synchronization (5%)", v: fmt(sc), dim: true, i: ZapIcon },
          ].map(row => (
            <div key={row.l} className="flex justify-between items-center group">
              <div className="flex items-center gap-2">
                 <row.i className={`w-3.5 h-3.5 ${row.dim ? 'text-primary' : 'text-on-surface-variant opacity-40'}`} />
                 <span className={`text-[11px] font-bold uppercase tracking-tight ${row.dim ? 'text-primary' : 'text-on-surface-variant/80'}`}>{row.l}</span>
              </div>
              <span className={`text-sm font-black tracking-tight ${row.dim ? 'text-primary' : 'text-on-surface'}`}>{row.v}</span>
            </div>
          ))}
          <div className="pt-6 border-t border-outline-variant/10 flex justify-between items-center">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-on-surface">Consolidated Total</span>
            <span className="text-2xl font-black font-headline text-primary tracking-tighter">{fmt(total)}</span>
          </div>
        </div>

        {/* Payment Channels */}
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-40 mb-8">Integrated Gateways</h3>
        <div className="grid grid-cols-3 gap-3 mb-10">
          {[
             { m: "UPI Hub", i: Smartphone },
             { m: "Visa/Card", i: CreditCard },
             { m: "Fiat Sync", i: Landmark },
             { m: "Wallets", i: Wallet },
             { m: "Yield EMI", i: Zap },
             { m: "BNPL node", i: ShieldCheck }
          ].map((item, i) => (
            <div key={i} className="bg-white border border-outline-variant/5 p-4 rounded-2xl flex flex-col items-center gap-3 group hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all cursor-pointer">
              <item.i className="w-5 h-5 text-on-surface-variant opacity-20 group-hover:text-primary group-hover:opacity-100 transition-all" />
              <p className="text-[8px] font-black text-on-surface-variant uppercase tracking-widest">{item.m}</p>
            </div>
          ))}
        </div>

        {/* Compliance */}
        <div className="bg-orange-50 border border-orange-100 rounded-3xl p-6 mb-12 flex gap-4 group">
           <input type="checkbox" id="ack" defaultChecked className="w-5 h-5 mt-0.5 accent-orange-600 rounded-lg cursor-pointer" />
           <label htmlFor="ack" className="text-[10px] font-medium text-orange-700/80 leading-relaxed uppercase tracking-widest">
              I synchronize with the <strong>Refusal Protocol</strong>. Full node refund T+7 days before deployment.
           </label>
        </div>
      </div>

      {/* Action Dock */}
      <div className="fixed bottom-10 left-8 right-8 bg-white/95 backdrop-blur-2xl border border-outline-variant/10 h-24 rounded-[2.5rem] px-8 flex items-center justify-between shadow-[0_30px_60px_rgba(0,0,0,0.15)] z-[60]">
        <div className="flex flex-col">
            <span className="text-[10px] font-black text-on-surface-variant opacity-40 uppercase tracking-widest">Total commitment</span>
            <span className="text-xl font-black font-headline text-on-surface tracking-tighter">{fmt(total)}</span>
        </div>
        <button 
           onClick={() => setStep(2)} 
           className="h-14 px-10 bg-primary text-on-primary rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-primary/30 active:scale-95 transition-all flex items-center gap-3"
        >
           Deploy Request
           <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}