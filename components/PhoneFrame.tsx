"use client";
import { Home, Heart, ClipboardList, User, Wifi, Battery, Signal } from "lucide-react";

interface PhoneFrameProps {
  children: React.ReactNode;
  screen: string;
  setScreen: (screen: string) => void;
}

const NAV = [
  { id: "s-home", icon: Home, label: "Explore" },
  { id: "s-saved", icon: Heart, label: "Saved" },
  { id: "s-bookings", icon: ClipboardList, label: "Stays" },
  { id: "s-profile", icon: User, label: "Account" },
];

export function PhoneFrame({ children, screen, setScreen }: PhoneFrameProps) {
  return (
    <div className="flex flex-col items-center py-6 sm:py-12 bg-gradient-to-br from-slate-50 to-slate-100 min-h-[calc(100vh-64px)] overflow-x-hidden pt-20">
      <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant opacity-40 mb-8 sm:mb-12">
        Student Dashboard
      </div>
      
      {/* Device Body */}
      <div className="w-full sm:w-[390px] h-screen sm:h-[844px] bg-white rounded-none sm:rounded-[3.5rem] shadow-none sm:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15),0_0_0_12px_#1a1a1a] flex flex-col relative overflow-hidden">
        
        {/* Notch & Status Bar */}
        <div className="bg-white/80 backdrop-blur-md h-12 flex items-center justify-between px-8 shrink-0 z-50">
          <span className="text-xs font-black tracking-tight text-on-surface">9:41</span>
          <div className="w-24 h-6 bg-[#0a0a0a] rounded-full flex items-center justify-center">
             <div className="w-1.5 h-1.5 bg-zinc-800 rounded-full ml-auto mr-1.5"></div>
          </div>
          <div className="flex items-center gap-1.5">
             <Signal className="w-3.5 h-3.5" />
             <Wifi className="w-3.5 h-3.5" />
             <Battery className="w-4 h-4 fill-on-surface/20" />
          </div>
        </div>

        {/* Dynamic Content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden relative bg-white noscrollbar">
          {children}
        </div>

        {/* Global Nav */}
        <div className="bg-white/95 backdrop-blur-xl border-t border-outline-variant/10 flex justify-around items-center pt-3 pb-8 px-4 shrink-0 z-50 rounded-t-[2.5rem] shadow-[0_-10px_30px_rgba(0,0,0,0.03)]">
          {NAV.map((n) => {
            const Icon = n.icon;
            const active = screen === n.id;
            return (
              <button
                key={n.id}
                onClick={() => setScreen(n.id)}
                className={`flex flex-col items-center justify-center gap-1 transition-all duration-300 relative px-4 ${active ? 'scale-110' : 'opacity-30 hover:opacity-100'}`}
              >
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${active ? 'bg-primary text-on-primary shadow-lg shadow-primary/20' : ''}`}>
                   <Icon className={`w-5 h-5 ${active ? 'stroke-[2.5px]' : ''}`} />
                </div>
                <span className={`text-[8px] font-black uppercase tracking-widest mt-1 ${active ? 'text-primary' : 'text-on-surface-variant'}`}>
                   {n.label}
                </span>
                {active && (
                   <div className="absolute -top-1 w-1 h-1 bg-primary rounded-full blur-[1px]"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>

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