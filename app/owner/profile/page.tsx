'use client';

import { useState } from 'react';
import { 
  Edit3, 
  CheckCircle2, 
  User, 
  Lock, 
  BadgeCheck, 
  Clock, 
  Landmark, 
  Bell, 
  Globe,
  Camera,
  ShieldCheck,
  CreditCard,
  ChevronRight,
  Zap,
  Mail,
  Phone,
  MapPin,
  Calendar
} from 'lucide-react';

export default function OwnerProfilePage() {
  const [activeTab, setActiveTab] = useState<'account' | 'verification' | 'preferences'>('account');

  return (
    <div className="px-6 md:px-12 pb-20">
      {/* Header Section */}
      <header className="py-10 border-b border-outline-variant/5 mb-12">
         <h2 className="text-xl font-headline font-black text-on-surface mb-2 uppercase tracking-wide">Partner Identity</h2>
        <p className="text-on-surface-variant font-body text-base leading-relaxed font-medium max-w-2xl">
          Manage your organizational credentials, security synchronization, and ecosystem preferences.
        </p>
      </header>

      {/* Profile Overview Card (Upgraded) */}
      <section className="bg-white p-10 rounded-[3rem] border border-outline-variant/10 shadow-sm mb-12 relative overflow-hidden group">
         <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="flex flex-col xl:flex-row items-center gap-10 relative z-10">
          <div className="relative group/avatar">
            <div className="w-32 h-32 rounded-[2.5rem] overflow-hidden border-8 border-surface-container-low shadow-2xl group-hover/avatar:scale-105 transition-transform duration-700">
              <img
                alt="Profile"
                className="w-full h-full object-cover"
                src="https://ui-avatars.com/api/?name=Editorial+Guest&background=b6212f&color=fff&size=256"
              />
            </div>
            <button className="absolute -bottom-2 -right-2 w-12 h-12 bg-on-surface text-surface rounded-2xl flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-xl active:scale-90">
              <Camera className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 text-center xl:text-left">
            <h2 className="font-headline text-4xl font-black text-on-surface mb-3 tracking-tighter">Editorial Guest</h2>
            <p className="text-sm font-bold text-on-surface-variant opacity-60 uppercase tracking-widest mb-6 flex items-center justify-center xl:justify-start gap-2">
               <Calendar className="w-4 h-4" />
               Partner Node Active Since MAR 2024
            </p>
            <div className="flex flex-wrap justify-center xl:justify-start gap-4">
              <div className="bg-emerald-50 text-emerald-600 px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-emerald-100 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                VERIFIED ECOSYSTEM PARTNER
              </div>
              <div className="bg-primary text-on-primary px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-primary/20 flex items-center gap-2">
                <Zap className="w-4 h-4" />
                DIAMOND REVENUE TIER
              </div>
            </div>
          </div>
          <button className="h-14 px-10 border-2 border-outline-variant/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant hover:bg-white hover:border-primary/20 hover:text-primary transition-all">
            Identity Audit Log
          </button>
        </div>
      </section>

      {/* Advanced Tabs */}
      <div className="flex gap-4 mb-12 border-b border-outline-variant/5 overflow-x-auto pb-0.5">
        {[
          { id: 'account', label: 'Organization', icon: User },
          { id: 'verification', label: 'Trust Registry', icon: BadgeCheck },
          { id: 'preferences', label: 'Ecosystem', icon: Globe },
        ].map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-3 px-8 py-5 font-black text-[10px] uppercase tracking-[0.2em] transition-all relative border-b-2 ${
                active
                  ? 'text-primary border-primary bg-primary/5 rounded-t-2xl'
                  : 'text-on-surface-variant opacity-60 hover:opacity-100 border-transparent'
              }`}
            >
              <Icon className={`w-4 h-4 ${active ? 'text-primary' : ''}`} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Account Details Tab */}
      {activeTab === 'account' && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <section className="bg-white p-10 rounded-[2.5rem] border border-outline-variant/10 shadow-sm group">
            <h3 className="font-headline text-2xl font-black text-on-surface mb-10 flex items-center gap-4">
              <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center text-primary group-hover:rotate-12 transition-transform">
                <User className="w-5 h-5" />
              </div>
              Core Credentials
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-40 ml-1">
                  Legal Descriptor
                </label>
                <div className="relative group/input">
                   <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/40 group-focus-within/input:text-primary transition-colors" />
                   <input
                     className="w-full bg-surface-container-lowest border border-outline-variant/10 hover:border-primary/20 rounded-2xl pl-14 pr-6 py-4.5 text-sm font-black text-on-surface focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all"
                     type="text"
                     defaultValue="Editorial Guest"
                   />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-40 ml-1">
                  Satellite Connection
                </label>
                <div className="relative group/input">
                   <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/40 group-focus-within/input:text-primary transition-colors" />
                   <input
                     className="w-full bg-surface-container-lowest border border-outline-variant/10 hover:border-primary/20 rounded-2xl pl-14 pr-6 py-4.5 text-sm font-black text-on-surface focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all"
                     type="email"
                     defaultValue="editorial@curated.stay"
                   />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-40 ml-1">
                  Direct Line
                </label>
                <div className="relative group/input">
                   <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/40 group-focus-within/input:text-primary transition-colors" />
                   <input
                     className="w-full bg-surface-container-lowest border border-outline-variant/10 hover:border-primary/20 rounded-2xl pl-14 pr-6 py-4.5 text-sm font-black text-on-surface focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all"
                     type="tel"
                     defaultValue="+91 98765 43210"
                   />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-40 ml-1">
                  Temporal Birth
                </label>
                <div className="relative group/input">
                   <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/40 group-focus-within/input:text-primary transition-colors" />
                   <input
                     className="w-full bg-surface-container-lowest border border-outline-variant/10 hover:border-primary/20 rounded-2xl pl-14 pr-6 py-4.5 text-sm font-black text-on-surface focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all"
                     type="date"
                     defaultValue="1990-01-15"
                   />
                </div>
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-40 ml-1">
                  Operational Hub
                </label>
                <div className="relative group/input">
                   <MapPin className="absolute left-5 top-6 w-4 h-4 text-on-surface-variant/40 group-focus-within/input:text-primary transition-colors" />
                   <textarea
                     className="w-full bg-surface-container-lowest border border-outline-variant/10 hover:border-primary/20 rounded-2xl pl-14 pr-6 py-4.5 text-sm font-black text-on-surface focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all resize-none"
                     rows={3}
                     defaultValue="123 Park Street, Kolkata, West Bengal 700016"
                   ></textarea>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white p-10 rounded-[2.5rem] border border-outline-variant/10 shadow-sm group">
            <h3 className="font-headline text-2xl font-black text-on-surface mb-10 flex items-center gap-4">
              <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center text-primary group-hover:rotate-45 transition-transform">
                <Lock className="w-5 h-5" />
              </div>
              Cryptographic Security
            </h3>
            <div className="space-y-10">
              <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-40 ml-1">Current Protocol Key</label>
                 <input
                   className="w-full bg-surface-container-lowest border border-outline-variant/10 rounded-2xl px-6 py-4.5 text-sm font-black text-on-surface outline-none focus:border-primary transition-all"
                   type="password"
                   placeholder="••••••••••••"
                 />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-40 ml-1">New Protocol Key</label>
                  <input
                    className="w-full bg-surface-container-lowest border border-outline-variant/10 rounded-2xl px-6 py-4.5 text-sm font-black text-on-surface outline-none focus:border-primary transition-all"
                    type="password"
                    placeholder="Initialize new key"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-40 ml-1">Confirm New Protocol</label>
                  <input
                    className="w-full bg-surface-container-lowest border border-outline-variant/10 rounded-2xl px-6 py-4.5 text-sm font-black text-on-surface outline-none focus:border-primary transition-all"
                    type="password"
                    placeholder="Verify new key"
                  />
                </div>
              </div>
            </div>
          </section>

          <div className="flex justify-end gap-4 pt-6">
            <button className="h-16 px-10 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant hover:bg-surface-container transition-all">
              Discard Changes
            </button>
            <button className="h-16 px-12 bg-on-surface text-surface rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-primary transition-all shadow-xl shadow-on-surface/10 active:scale-95">
              Sync Credentials
            </button>
          </div>
        </div>
      )}

      {/* Verification Tab (Upgraded) */}
      {activeTab === 'verification' && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <section className="bg-white p-10 rounded-[2.5rem] border border-outline-variant/10 shadow-sm group">
            <h3 className="font-headline text-2xl font-black text-on-surface mb-10 flex items-center gap-4">
              <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <BadgeCheck className="w-5 h-5" />
              </div>
              Identity Ecosystem Audit
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { label: 'Goverment Identity (Aadhaar)', date: 'MAR 15, 2024', meta: 'XXXX XXXX 4321', status: 'VERIFIED' },
                { label: 'Fiscal Identity (PAN)', date: 'MAR 15, 2024', meta: 'ABCDE1234F', status: 'VERIFIED' }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-6 p-8 bg-emerald-50 rounded-[2rem] border border-emerald-100 group/item relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0 group-hover/item:scale-110 transition-transform" />
                  <div className="flex-1">
                    <h4 className="font-black text-on-surface tracking-tight mb-1">{item.label}</h4>
                    <p className="text-[10px] font-black text-emerald-600 opacity-60 uppercase tracking-widest mb-4">SYNCED ON {item.date}</p>
                    <p className="text-sm font-black text-on-surface-variant opacity-80 tracking-widest">{item.meta}</p>
                  </div>
                </div>
              ))}

              <div className="md:col-span-2 flex items-start gap-6 p-8 bg-orange-50 rounded-[2rem] border border-orange-100 group/item relative overflow-hidden">
                <Clock className="w-8 h-8 text-orange-600 shrink-0 animate-pulse" />
                <div className="flex-1">
                  <h4 className="font-black text-on-surface tracking-tight mb-1">Fiscal Clearing Node (Bank Account)</h4>
                  <p className="text-[10px] font-black text-orange-600 opacity-60 uppercase tracking-widest mb-6">VALIDATION COMMENCED IN PREVIOUS CYCLE</p>
                  <div className="flex flex-col sm:flex-row gap-4">
                     <button className="h-12 px-8 bg-orange-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:brightness-110 shadow-lg shadow-orange-600/20 transition-all">
                        Expedite Validation
                     </button>
                     <div className="flex items-center gap-2 text-[10px] font-black text-orange-600/60 uppercase tracking-widest">
                        <div className="w-1.5 h-1.5 bg-orange-600 rounded-full animate-ping"></div>
                        Awaiting Bank API Sync
                     </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white p-10 rounded-[2.5rem] border border-outline-variant/10 shadow-sm group">
            <h3 className="font-headline text-2xl font-black text-on-surface mb-10 flex items-center gap-4">
              <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center text-primary group-hover:-rotate-12 transition-transform">
                <Landmark className="w-5 h-5" />
              </div>
              Settlement Parameters
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-40 ml-1">Institutional Host</label>
                <div className="relative group/input">
                   <Landmark className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/40 group-focus-within/input:text-primary" />
                   <input
                     className="w-full bg-surface-container-lowest border border-outline-variant/10 rounded-2xl pl-14 pr-6 py-4.5 text-sm font-black text-on-surface focus:border-primary outline-none transition-all"
                     type="text"
                     defaultValue="State Bank of India"
                   />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-40 ml-1">Ledger Identifier</label>
                <div className="relative group/input">
                   <CreditCard className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/40 group-focus-within/input:text-primary" />
                   <input
                     className="w-full bg-surface-container-lowest border border-outline-variant/10 rounded-2xl pl-14 pr-6 py-4.5 text-sm font-black text-on-surface focus:border-primary outline-none transition-all"
                     type="text"
                     defaultValue="XXXX XXXX 9876"
                   />
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Preferences Tab (Upgraded) */}
      {activeTab === 'preferences' && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <section className="bg-white p-10 rounded-[2.5rem] border border-outline-variant/10 shadow-sm group">
            <h3 className="font-headline text-2xl font-black text-on-surface mb-10 flex items-center gap-4">
              <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center text-primary group-hover:animate-swing transition-transform">
                <Bell className="w-5 h-5" />
              </div>
              Telemetry & Alerts
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: 'Asset Interaction Alerts', desc: 'Real-time telemetry for new booking initializations' },
                { title: 'Fiscal Clearing Sync', desc: 'Instant confirmation of gross settlements' },
                { title: 'Ecosystem Intelligence', desc: 'Weekly market velocity and yield reports' },
                { title: 'Reputation Reminders', desc: 'Prompts for post-occupancy tenant audit' }
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-6 bg-surface-container-low/30 rounded-3xl border border-outline-variant/5 group/item hover:bg-white hover:shadow-xl transition-all duration-500">
                  <div className="pr-10">
                    <h4 className="font-black text-sm text-on-surface mb-1">{item.title}</h4>
                    <p className="text-[11px] font-medium text-on-surface-variant opacity-60 leading-relaxed">{item.desc}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0">
                    <input type="checkbox" className="sr-only peer" defaultChecked={i !== 2} />
                    <div className="w-14 h-8 bg-surface-container-highest rounded-full peer peer-checked:bg-primary transition-all after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:after:translate-x-6 shadow-inner"></div>
                  </label>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white p-10 rounded-[2.5rem] border border-outline-variant/10 shadow-sm group">
            <h3 className="font-headline text-2xl font-black text-on-surface mb-10 flex items-center gap-4">
              <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center text-primary group-hover:rotate-180 transition-transform">
                <Globe className="w-5 h-5" />
              </div>
              Regional Context
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-40 ml-1">Linguistic Node</label>
                <select className="w-full bg-surface-container-lowest border border-outline-variant/10 rounded-2xl px-6 py-4.5 text-sm font-black text-on-surface outline-none focus:border-primary cursor-pointer appearance-none shadow-sm">
                  <option>ENGLISH (SYSTEM DEFAULT)</option>
                  <option>हिन्दी (HINDI NODE)</option>
                  <option>বাংলা (BENGALI CLUSTER)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-40 ml-1">Fiscal Unit</label>
                <select className="w-full bg-surface-container-lowest border border-outline-variant/10 rounded-2xl px-6 py-4.5 text-sm font-black text-on-surface outline-none focus:border-primary cursor-pointer appearance-none shadow-sm">
                  <option>INR (INDIAN RUPEE)</option>
                  <option>USD (GLOBAL SETTLEMENT)</option>
                  <option>EUR (EURO ZONE)</option>
                </select>
              </div>
            </div>
          </section>

          <div className="flex justify-end gap-3 pt-6">
            <button className="h-16 px-12 bg-primary text-on-primary rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:brightness-110 shadow-xl shadow-primary/20 transition-all active:scale-95">
              Deploy Preferences
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
