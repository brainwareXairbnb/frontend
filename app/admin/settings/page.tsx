'use client';

import { useState } from 'react';
import { 
  RefreshCcw, 
  Gavel, 
  ShieldCheck, 
  Info, 
  History, 
  Download, 
  AlertCircle,
  FileText,
  CheckCircle2,
  Clock
} from 'lucide-react';

export default function AdminSettingsPage() {
  const [serviceRate, setServiceRate] = useState('12.50');

  const rateChanges = [
    { rate: '12.5%', changedBy: 'System Admin', date: 'Today, 10:24 AM', reason: 'Q2 adjustment for market scaling' },
    { rate: '10.0%', changedBy: 'Sneha Verma', date: 'Apr 09, 2024', reason: 'Platform fee reduction campaign' },
    { rate: '11.5%', changedBy: 'System Boot', date: 'Mar 01, 2024', reason: 'Initial platform rate definition' },
  ];

  return (
    <div className="px-6 md:px-12 py-6 pb-20">
      {/* Header Section */}
      <header className="mb-8">
        <h2 className="text-xl font-headline font-bold text-on-surface mb-1">Service Policies</h2>
        <p className="text-on-surface-variant font-body text-sm leading-relaxed max-w-2xl">
          Configure platform-wide commission rates, service charge logic, and automated financial settlements.
        </p>
      </header>

      {/* Main Settings Card */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        {/* Service Rate Configuration */}
        <div className="lg:col-span-12 xl:col-span-7 bg-white p-8 rounded-[2rem] border border-outline-variant/10 shadow-sm relative overflow-hidden">
           <div className="absolute top-0 right-0 p-8 opacity-5">
              <ShieldCheck className="w-32 h-32" />
           </div>
          
          <div className="mb-10 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
               <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></div>
               Live Configuration
            </div>
            <h2 className="font-headline text-3xl font-black text-on-surface mb-4 tracking-tight">
              Global Platform Tax
            </h2>
            <p className="text-sm text-on-surface-variant font-medium leading-relaxed">
              Define the standard platform commission percentage deducted from property owners per successful transaction. This parameter dictates platform gross profitability.
            </p>
          </div>

          <div className="mb-10">
            <label className="block text-[10px] font-black uppercase tracking-widest text-on-surface-variant mb-4 opacity-70">
              Active Service Rate (%)
            </label>
            <div className="relative group max-w-md">
              <input
                type="number"
                value={serviceRate}
                onChange={(e) => setServiceRate(e.target.value)}
                className="w-full text-5xl font-headline font-black text-primary bg-surface-container-lowest rounded-3xl px-8 py-8 focus:outline-none focus:ring-4 focus:ring-primary/5 border-2 border-outline-variant/5 group-hover:border-primary/20 transition-all font-mono"
                step="0.01"
                min="0"
                max="100"
              />
              <span className="absolute right-8 top-1/2 -translate-y-1/2 text-4xl font-headline font-black text-on-surface-variant/20 group-focus-within:text-primary/20 transition-colors">
                %
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center gap-4">
               <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200">
                  <CheckCircle2 className="w-5 h-5 text-white" />
               </div>
               <div>
                  <p className="text-[10px] font-black text-emerald-700/60 uppercase tracking-widest">Status</p>
                  <p className="text-sm font-bold text-emerald-700">Operational</p>
               </div>
            </div>
            <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 flex items-center gap-4">
               <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
                  <History className="w-5 h-5 text-white" />
               </div>
               <div>
                  <p className="text-[10px] font-black text-blue-700/60 uppercase tracking-widest">Convergence</p>
                  <p className="text-sm font-bold text-blue-700">14 Apr 2024</p>
               </div>
            </div>
          </div>

          <button className="w-full max-w-md bg-primary text-on-primary h-14 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3">
            <RefreshCcw className="w-4 h-4" />
            Commit & Propagate
          </button>
        </div>

        {/* Rate Change Log */}
        <div className="lg:col-span-12 xl:col-span-5 bg-white p-8 rounded-[2rem] border border-outline-variant/10 shadow-sm relative overflow-hidden">
          <div className="mb-10 flex items-center justify-between">
            <div>
              <h3 className="font-headline text-lg font-bold text-on-surface mb-1">
                Policy Ledger
              </h3>
              <p className="text-xs text-on-surface-variant font-medium">Historical lifecycle of rate modifications</p>
            </div>
            <button className="p-2.5 hover:bg-surface-container rounded-xl transition-all group">
              <Download className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
            </button>
          </div>

          <div className="space-y-8">
            {rateChanges.map((change, index) => (
              <div
                key={index}
                className="relative pl-8 before:absolute before:left-0 before:top-1.5 before:bottom-0 before:w-0.5 before:bg-outline-variant/10 last:before:hidden group"
              >
                <div className="absolute left-[-4px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-white bg-outline-variant/30 group-hover:bg-primary group-hover:scale-125 transition-all"></div>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <p className="text-xl font-headline font-black text-primary mb-1 tracking-tighter">
                      {change.rate}
                    </p>
                    <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1 opacity-60">
                      Operator: <span className="text-on-surface opacity-100">{change.changedBy}</span>
                    </p>
                    <div className="flex items-center gap-1.5 opacity-40">
                       <Clock className="w-3 h-3" />
                       <p className="text-[10px] font-bold uppercase tracking-widest">{change.date}</p>
                    </div>
                  </div>
                  {index === 0 && (
                    <span className="px-2 py-1 bg-primary text-on-primary rounded text-[8px] font-black uppercase tracking-widest">
                      ACTIVE
                    </span>
                  )}
                </div>
                <p className="text-xs text-on-surface-variant italic font-medium mt-3 leading-relaxed border-l-2 border-on-surface/5 pl-3 py-1 bg-surface-container-lowest/50 rounded-r-lg">
                  "{change.reason}"
                </p>
              </div>
            ))}
          </div>

          <button className="w-full mt-10 pt-6 border-t border-outline-variant/10 text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] hover:text-primary transition-colors text-center">
            Extended Audit Trail
          </button>
        </div>
      </section>

      {/* Info Cards */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Audit Notice */}
        <div className="bg-white p-8 rounded-[2rem] border border-outline-variant/10 shadow-sm group hover:border-red-100 transition-colors">
          <div className="flex items-start gap-6">
            <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center shrink-0 border border-red-100 group-hover:bg-red-500 transition-all duration-500">
              <Gavel className="text-red-600 w-7 h-7 group-hover:text-white transition-all duration-500" />
            </div>
            <div className="flex-1">
              <h3 className="font-headline text-lg font-bold text-on-surface mb-2 group-hover:text-red-600 transition-colors">
                Regulatory Compliance
              </h3>
              <p className="text-sm text-on-surface-variant font-medium leading-relaxed mb-4">
                Platform financial adjustments are immutable once propagated. All modifications require high-level clearance and automated audit logging.
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container rounded-lg text-[9px] font-black uppercase tracking-widest text-on-surface-variant">
                 <ShieldCheck className="w-3 h-3" />
                 Last Compliance Audit: 12.04.24
              </div>
            </div>
          </div>
        </div>

        {/* Validation Layer */}
        <div className="bg-white p-8 rounded-[2rem] border border-outline-variant/10 shadow-sm group hover:border-emerald-100 transition-colors">
          <div className="flex items-start gap-6">
            <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center shrink-0 border border-emerald-100 group-hover:bg-emerald-500 transition-all duration-500">
              <ShieldCheck className="text-emerald-600 w-7 h-7 group-hover:text-white transition-all duration-500" />
            </div>
            <div className="flex-1">
              <h3 className="font-headline text-lg font-bold text-on-surface mb-2 group-hover:text-emerald-600 transition-colors">
                Secured Validation
              </h3>
              <p className="text-sm text-on-surface-variant font-medium leading-relaxed mb-4">
                Multi-layer encryption and session validation ensure only verified system administrators can commit changes to the global policy.
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-[9px] font-black uppercase tracking-widest shadow-sm">
                 <AlertCircle className="w-3 h-3" />
                 L3 SECURITY ENABLED
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Notice Banner */}
      <div className="mt-8 bg-on-surface p-8 rounded-[2rem] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="flex items-start gap-6 relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 border border-white/10">
            <Info className="text-white w-6 h-6" />
          </div>
          <div>
            <h4 className="text-white font-bold text-sm mb-2 uppercase tracking-widest">System Propagation Notice</h4>
            <p className="text-sm text-white/70 leading-relaxed font-medium">
              Updating the <span className="text-white font-black hover:underline cursor-help">Global Service Rate</span> will immediately alter the yield calculations for all incoming property listings. Active contracts and historical transaction logs remain unaffected but will show in legacy reports as "grandfathered."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
