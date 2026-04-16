"use client";
import { useState } from "react";
import { 
  Compass, 
  Mail, 
  Lock, 
  ArrowRight, 
  Fingerprint, 
  Zap,
  Search
} from "lucide-react";

interface SLoginProps {
  setScreen: (screen: string) => void;
}

export default function SLogin({ setScreen }: SLoginProps) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setScreen("s-home");
  };

  return (
    <div className="bg-white min-h-screen flex flex-col px-10 pt-24 pb-12 animate-in fade-in duration-700">
      <div className="mb-20">
         <div className="w-20 h-20 bg-primary rounded-[2rem] flex items-center justify-center shadow-2xl shadow-primary/30 mb-8 animate-bounce">
            <Compass className="w-10 h-10 text-white" />
         </div>
         <h1 className="text-4xl font-headline font-black text-on-surface tracking-tighter mb-4">
            Initialize <br />
            <span className="text-primary">Ecosystem Hub</span>
         </h1>
         <p className="text-sm font-medium text-on-surface-variant opacity-60 leading-relaxed uppercase tracking-widest">
            Enter your orbital credentials to synchronize with student housing nodes.
         </p>
      </div>

      <form onSubmit={handleLogin} className="space-y-6">
        <div className="space-y-2">
           <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] ml-1 opacity-40">Linguistic Identifier</label>
           <div className="relative group/input">
              <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/20 group-focus-within/input:text-primary transition-all" />
              <input 
                 type="email" 
                 placeholder="orbital@bwu.res"
                 value={email}
                 onChange={e => setEmail(e.target.value)}
                 className="w-full h-16 bg-[#FAFAFA] border border-outline-variant/10 rounded-2xl pl-16 pr-6 text-sm font-black text-on-surface focus:border-primary outline-none transition-all"
              />
           </div>
        </div>

        <div className="space-y-2">
           <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] ml-1 opacity-40">Protocol Key</label>
           <div className="relative group/input">
              <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/20 group-focus-within/input:text-primary transition-all" />
              <input 
                 type="password" 
                 placeholder="••••••••••••"
                 value={pass}
                 onChange={e => setPass(e.target.value)}
                 className="w-full h-16 bg-[#FAFAFA] border border-outline-variant/10 rounded-2xl pl-16 pr-6 text-sm font-black text-on-surface focus:border-primary outline-none transition-all"
              />
           </div>
        </div>

        <div className="flex justify-end pt-2">
           <button type="button" className="text-[10px] font-black text-primary uppercase tracking-widest hover:opacity-80 transition-opacity">Reset Protocol?</button>
        </div>

        <button 
           type="submit"
           className="w-full h-16 bg-on-surface text-surface rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-on-surface/20 active:scale-95 transition-all flex items-center justify-center gap-3 group mt-8"
        >
           Sync Hub
           <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </form>

      <div className="mt-auto">
         <div className="flex items-center gap-4 mb-8">
            <div className="h-px bg-outline-variant/10 flex-1"></div>
            <span className="text-[9px] font-black text-on-surface-variant opacity-40 uppercase tracking-widest whitespace-nowrap">Integrated Social Sync</span>
            <div className="h-px bg-outline-variant/10 flex-1"></div>
         </div>

         <div className="grid grid-cols-2 gap-4">
            <button className="h-14 bg-white border border-outline-variant/10 rounded-2xl flex items-center justify-center gap-3 hover:bg-[#FAFAFA] transition-all group">
               <Search className="w-5 h-5 text-on-surface-variant group-hover:text-primary transition-colors" />
               <span className="text-[10px] font-black uppercase tracking-widest">Google Hub</span>
            </button>
            <button className="h-14 bg-white border border-outline-variant/10 rounded-2xl flex items-center justify-center gap-3 hover:bg-[#FAFAFA] transition-all group">
               <Fingerprint className="w-5 h-5 text-on-surface-variant group-hover:text-primary transition-colors" />
               <span className="text-[10px] font-black uppercase tracking-widest">Bio Sync</span>
            </button>
         </div>

         <p className="text-center mt-10 text-[10px] font-black text-on-surface-variant uppercase tracking-widest opacity-40">
            Node Registry Version 2.4.1 (Gamma)
         </p>
      </div>
    </div>
  );
}
