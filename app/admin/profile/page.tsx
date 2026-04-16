'use client';

import { useState } from 'react';
import { 
  User, 
  Shield, 
  History, 
  Settings, 
  Camera, 
  CheckCircle2, 
  Lock, 
  Bell, 
  Mail, 
  Phone,
  BarChart3,
  CalendarDays,
  Activity,
  UserCheck,
  ChevronRight,
  Fingerprint
} from 'lucide-react';

export default function AdminProfilePage() {
  const [activeTab, setActiveTab] = useState('account');

  return (
    <div className="px-6 md:px-12 py-10 pb-24 bg-[#fafafa]">
      {/* Profile Header */}
      <section className="bg-white p-8 md:p-12 rounded-[3rem] border border-outline-variant/10 shadow-xl shadow-black/[0.02] mb-10 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-10">
          <div className="relative group">
            <div className="w-32 h-32 rounded-[2.5rem] bg-white border-8 border-[#FAFAFA] shadow-2xl overflow-hidden group-hover:scale-105 transition-transform duration-500">
              <img
                alt="Admin User"
                className="w-full h-full object-cover"
                src="https://ui-avatars.com/api/?name=Admin+User&background=b6212f&color=fff&size=256"
              />
            </div>
            <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-primary text-on-primary rounded-2xl flex items-center justify-center shadow-2xl border-4 border-white active:scale-90 transition-all">
              <Camera className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl font-headline font-black text-on-surface tracking-tighter mb-2 uppercase">
              Admin <span className="text-primary">User</span>
            </h2>
            <p className="text-sm font-black uppercase tracking-widest text-on-surface-variant opacity-40 mb-6 flex items-center justify-center md:justify-start gap-2">
              <Mail className="w-4 h-4" />
              admin@brainwarerooms.local
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-xl text-[10px] font-black uppercase tracking-widest">
                <UserCheck className="w-3.5 h-3.5" />
                Root Authority
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 border border-indigo-100 rounded-xl text-[10px] font-black uppercase tracking-widest">
                <Shield className="w-3.5 h-3.5" />
                Identity Secured
              </span>
            </div>
          </div>

          <button className="h-14 bg-on-surface text-surface px-8 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-black/10 hover:bg-primary transition-all flex items-center justify-center gap-3">
            <Settings className="w-4 h-4" />
            System Override
          </button>
        </div>
      </section>

      {/* Tabs */}
      <div className="flex gap-4 mb-10 overflow-x-auto pb-4 scrollbar-hide">
        {[
          { key: 'account', label: 'Identity Matrix', icon: User },
          { key: 'security', label: 'Protocol Keys', icon: Fingerprint },
          { key: 'activity', label: 'Event Ledger', icon: Activity },
          { key: 'settings', label: 'System Config', icon: Settings },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all whitespace-nowrap flex items-center gap-3 ${
                activeTab === tab.key
                  ? 'bg-primary text-white shadow-xl shadow-primary/20'
                  : 'bg-white border border-outline-variant/10 text-on-surface-variant hover:border-primary/20'
              }`}
            >
              <Icon className={`w-4 h-4 ${activeTab === tab.key ? 'text-white' : 'opacity-20'}`} />
              {tab.label}
            </button>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Content Area */}
        <div className="lg:col-span-8">
          {activeTab === 'account' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <section className="bg-white p-8 md:p-10 rounded-[3rem] border border-outline-variant/10 shadow-xl shadow-black/[0.02]">
                <h3 className="font-headline text-xl font-black text-on-surface tracking-tighter uppercase mb-8">
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   {[
                     { label: 'Full Designation', value: 'Admin User', icon: User },
                     { label: 'Digital Hub (Email)', value: 'admin@brainwarerooms.com', icon: Mail },
                     { label: 'Signal Number', value: '+91 98765 43210', icon: Phone },
                     { label: 'Authority Class', value: 'Root Access', icon: Shield, disabled: true },
                   ].map((field, i) => (
                     <div key={i} className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-40 ml-1">{field.label}</label>
                        <div className="relative group">
                           <field.icon className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/20 group-focus-within:text-primary transition-all" />
                           <input
                              type="text"
                              defaultValue={field.value}
                              disabled={field.disabled}
                              className={`w-full h-14 rounded-2xl pl-14 pr-6 text-sm font-black text-on-surface focus:outline-none focus:ring-4 focus:ring-primary/5 border border-outline-variant/10 transition-all ${field.disabled ? 'bg-[#FAFAFA] opacity-50' : 'bg-white focus:border-primary'}`}
                           />
                        </div>
                     </div>
                   ))}
                </div>
                <div className="mt-10 flex justify-end gap-3">
                  <button className="h-12 px-8 bg-[#FAFAFA] text-on-surface-variant rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-gray-100 transition-all">
                    Discard
                  </button>
                  <button className="h-12 px-8 bg-primary text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-primary/20 hover:opacity-90 transition-all">
                    Sync Changes
                  </button>
                </div>
              </section>

              <section className="bg-white p-8 md:p-10 rounded-[3rem] border border-outline-variant/10 shadow-xl shadow-black/[0.02]">
                <h3 className="font-headline text-xl font-black text-on-surface tracking-tighter uppercase mb-8">
                  Core Telemetry
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { label: 'Protocol Start', value: 'Jan 15, 2024', icon: CalendarDays },
                    { label: 'Last Sync', value: 'Active Now', icon: Activity },
                    { label: 'Audit Count', value: '2,847', icon: BarChart3, primary: true },
                  ].map((stat, i) => (
                    <div key={i} className="p-6 bg-[#FAFAFA] rounded-3xl border border-outline-variant/5 text-center group hover:bg-white hover:shadow-xl transition-all duration-500">
                      <div className="w-10 h-10 mx-auto bg-white rounded-xl flex items-center justify-center text-on-surface-variant/20 mb-4 group-hover:text-primary group-hover:opacity-100 transition-all">
                         <stat.icon className="w-5 h-5" />
                      </div>
                      <p className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant opacity-40 mb-1">
                        {stat.label}
                      </p>
                      <p className={`text-xl font-headline font-black tracking-tighter ${stat.primary ? 'text-primary' : 'text-on-surface'}`}>
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <section className="bg-white p-8 md:p-10 rounded-[3rem] border border-outline-variant/10 shadow-xl shadow-black/[0.02]">
                <h3 className="font-headline text-xl font-black text-on-surface tracking-tighter uppercase mb-8">
                  Key Rotation
                </h3>
                <div className="space-y-6">
                  {['Current Key', 'New Matrix Key', 'Validate Matrix'].map((label, i) => (
                    <div key={i} className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-40 ml-1">{label}</label>
                       <div className="relative group">
                          <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/20 transition-all" />
                          <input
                            type="password"
                            placeholder="••••••••••••"
                            className="w-full h-16 bg-[#FAFAFA] border border-outline-variant/10 rounded-2xl pl-16 pr-6 text-sm font-black focus:border-primary focus:bg-white outline-none transition-all"
                          />
                       </div>
                    </div>
                  ))}
                </div>
                <div className="mt-10">
                  <button className="h-16 px-10 bg-on-surface text-surface rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl hover:bg-primary transition-all">
                    Deploy New protocol
                  </button>
                </div>
              </section>

              <section className="bg-indigo-50/50 p-8 md:p-10 rounded-[3rem] border border-indigo-100 flex items-start gap-6">
                 <div className="w-16 h-16 bg-indigo-500 rounded-[1.5rem] flex items-center justify-center shadow-xl shadow-indigo-500/20 shrink-0">
                    <Fingerprint className="w-8 h-8 text-white" />
                 </div>
                 <div>
                    <h3 className="text-xl font-black font-headline text-indigo-900 tracking-tighter uppercase mb-2">Multimodal Sync</h3>
                    <p className="text-sm font-medium text-indigo-800/60 leading-relaxed uppercase tracking-wider mb-6">
                       Biometric and physical hardware tokens provide a secondary encryption layer for root level overrides.
                    </p>
                    <div className="flex items-center gap-4">
                       <span className="px-4 py-2 bg-emerald-500 text-white rounded-xl text-[9px] font-black uppercase tracking-widest">ENABLED</span>
                       <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline">Re-calibrate Token</button>
                    </div>
                 </div>
              </section>
            </div>
          )}

          {activeTab === 'activity' && (
            <section className="bg-white p-8 md:p-10 rounded-[3rem] border border-outline-variant/10 shadow-xl shadow-black/[0.02] animate-in fade-in slide-in-from-bottom-4 duration-700">
              <h3 className="font-headline text-xl font-black text-on-surface tracking-tighter uppercase mb-10">
                Centralized History
              </h3>
              <div className="space-y-6">
                {[
                  { action: 'Audit Complete', details: 'Node #2847 initialized by partnership', time: '2h', icon: CheckCircle2, status: 'emerald' },
                  { action: 'Config Updated', details: 'Economic yield adjusted by 2.5%', time: '5h', icon: Settings, status: 'primary' },
                  { action: 'System Initialization', details: 'Root sync via Desktop Cluster', time: '8h', icon: Activity, status: 'primary' },
                  { action: 'Fiscal Clear', details: 'Revenue deployment to partner Ankit', time: '1d', icon: History, status: 'indigo' },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center gap-6 p-6 bg-[#FAFAFA] rounded-[2rem] border border-outline-variant/5 group hover:bg-white hover:shadow-xl transition-all duration-500">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 bg-${activity.status}-50 text-${activity.status}-500 shadow-sm group-hover:rotate-6 transition-transform`}>
                       <activity.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-black uppercase tracking-widest text-on-surface">{activity.action}</p>
                      <p className="text-[9px] font-bold text-on-surface-variant uppercase tracking-widest opacity-40 mt-1">{activity.details}</p>
                    </div>
                    <div className="text-right">
                       <span className="text-[9px] font-black text-on-surface-variant opacity-40 uppercase tracking-widest block">
                         {activity.time}
                       </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {activeTab === 'settings' && (
            <section className="bg-white p-8 md:p-10 rounded-[3rem] border border-outline-variant/10 shadow-xl shadow-black/[0.02] animate-in fade-in slide-in-from-bottom-4 duration-700">
              <h3 className="font-headline text-xl font-black text-on-surface tracking-tighter uppercase mb-10">
                Signal Thresholds
              </h3>
              <div className="space-y-4">
                {[
                  { label: 'Booking Request Sync', enabled: true },
                  { label: 'Review Flag Telemetry', enabled: true },
                  { label: 'Payout Manifest Notifications', enabled: false },
                  { label: 'System Health Digest', enabled: true },
                ].map((pref, index) => (
                  <div key={index} className="flex items-center justify-between p-6 bg-[#FAFAFA] rounded-2xl border border-outline-variant/5">
                    <span className="text-[10px] font-black uppercase tracking-widest text-on-surface opacity-80">{pref.label}</span>
                    <button
                      className={`relative w-14 h-8 rounded-full transition-all ${
                        pref.enabled ? 'bg-primary shadow-lg shadow-primary/20' : 'bg-outline-variant/20'
                      }`}
                    >
                      <div
                        className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow-sm transition-all ${
                          pref.enabled ? 'left-7' : 'left-1'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar Widgets */}
        <div className="lg:col-span-4 space-y-8">
           <div className="p-8 bg-on-surface rounded-[3rem] text-surface shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 opacity-40">Security Advisory</h4>
              <p className="text-sm font-medium leading-relaxed uppercase tracking-wider mb-8 opacity-80">
                 System integrity is optimal. Zero unauthorized login attempts in the last 72 cycles.
              </p>
              <button className="flex items-center gap-2 text-[9px] font-black text-primary uppercase tracking-widest group">
                 Review Log
                 <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
           </div>

           <div className="p-8 bg-white rounded-[3rem] border border-outline-variant/10 shadow-xl shadow-black/[0.02]">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] mb-6 opacity-40">Connected Clusters</h4>
              <div className="space-y-6">
                 {[
                   { name: 'Primary Node', ip: '192.168.1.1', status: 'Active' },
                   { name: 'Audit Hub', ip: '10.0.0.42', status: 'Syncing' },
                 ].map((cluster, i) => (
                   <div key={i} className="flex items-center justify-between">
                      <div>
                         <p className="text-[10px] font-black uppercase tracking-widest text-on-surface">{cluster.name}</p>
                         <p className="text-[8px] font-bold text-on-surface-variant opacity-40 uppercase">{cluster.ip}</p>
                      </div>
                      <span className={`text-[8px] font-black uppercase px-2 py-1 rounded-md ${cluster.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-orange-50 text-orange-600'}`}>
                         {cluster.status}
                      </span>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
