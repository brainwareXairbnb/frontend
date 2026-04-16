'use client';

import { 
  TrendingUp, 
  Wallet, 
  Search, 
  Download, 
  IndianRupee, 
  ArrowUpRight, 
  History, 
  ChevronRight,
  ShieldCheck,
  Building2,
  Clock,
  ArrowDownCircle
} from 'lucide-react';

export default function OwnerPayoutsPage() {
  const transactions = [
    {
      id: 1,
      date: 'Oct 24, 2023',
      time: '14:22 PM',
      property: 'The Heritage Suite',
      bookingId: '#BW-90210-A',
      gross: 4500,
      serviceFee: 540,
      net: 3960,
      status: 'settled'
    },
    {
      id: 2,
      date: 'Oct 18, 2023',
      time: '09:15 AM',
      property: 'Scholars Atrium',
      bookingId: '#BW-88942-C',
      gross: 6500,
      serviceFee: 780,
      net: 5720,
      status: 'settled'
    },
    {
      id: 3,
      date: 'Oct 12, 2023',
      time: '16:44 PM',
      property: 'Modern Loft',
      bookingId: '#BW-77531-B',
      gross: 12000,
      serviceFee: 1440,
      net: 10560,
      status: 'pending'
    }
  ];

  const totalGross = transactions.reduce((sum, t) => sum + t.gross, 0);
  const totalFees = transactions.reduce((sum, t) => sum + t.serviceFee, 0);
  const totalNet = transactions.reduce((sum, t) => sum + t.net, 0);

  return (
    <div className="px-6 md:px-12 pb-20">
      <header className="py-10 border-b border-outline-variant/5 mb-12">
         <h2 className="text-xl font-headline font-black text-on-surface mb-2 uppercase tracking-wide">Financial Velocity</h2>
        <p className="text-on-surface-variant font-body text-base leading-relaxed font-medium max-w-2xl">
          Manage your yield capture from stays with institutional precision. Audit automated settlements, platform commission capture, and gross scaling.
        </p>
      </header>

      {/* Bento Grid Earnings Summary */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-12">
        {/* Lifetime Earnings */}
        <div className="xl:col-span-2 bg-on-surface p-10 rounded-[2.5rem] flex flex-col justify-between shadow-2xl shadow-on-surface/20 relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-4">
              Consolidated Net Yield
            </p>
            <h2 className="text-5xl md:text-7xl font-black font-headline text-white tracking-tighter mb-8 leading-none">
              ₹1,42,850.00
            </h2>
            <div className="flex gap-4 flex-wrap">
              <div className="px-4 py-1.5 bg-emerald-500/10 text-emerald-400 text-[10px] font-black rounded-xl border border-emerald-500/20 flex items-center gap-2 uppercase tracking-widest shadow-lg shadow-emerald-500/5">
                <ArrowUpRight className="w-4 h-4" /> 
                +12.4% SCALE VS PREV
              </div>
              <div className="px-4 py-1.5 bg-white/5 text-white/60 text-[10px] font-black rounded-xl border border-white/5 flex items-center gap-2 uppercase tracking-widest">
                 <History className="w-3.5 h-3.5" />
                 ACTIVE SINCE MAR 2021
              </div>
            </div>
          </div>
          <div className="absolute right-10 bottom-10 opacity-10 group-hover:scale-110 transition-transform duration-700">
             <Wallet className="w-40 h-40 text-white" />
          </div>
        </div>

        {/* Current Month */}
        <div className="bg-white p-10 rounded-[2.5rem] flex flex-col shadow-sm border border-outline-variant/10 group hover:border-primary/20 transition-all duration-500">
          <div className="flex items-center justify-between mb-8">
             <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-60">Settlement Period</p>
             <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                <IndianRupee className="w-5 h-5" />
             </div>
          </div>
          <h3 className="text-4xl font-black font-headline text-on-surface tracking-tighter mb-10 leading-none">
            ₹{totalNet.toLocaleString('en-IN')}
          </h3>
          <div className="flex-1 space-y-6">
            <div className="flex justify-between items-center group/item">
              <span className="text-xs font-bold text-on-surface-variant/60 uppercase tracking-widest">Gross Stays</span>
              <span className="text-sm font-black text-on-surface">₹{totalGross.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between items-center group/item">
              <div className="flex items-center gap-2">
                 <span className="text-xs font-bold text-on-surface-variant/60 uppercase tracking-widest text-primary">Service Fee</span>
                 <ShieldCheck className="w-3.5 h-3.5 text-primary/40" />
              </div>
              <span className="text-sm font-black text-primary">-₹{totalFees.toLocaleString('en-IN')}</span>
            </div>
            <div className="pt-6 border-t border-outline-variant/10 flex justify-between items-center">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-on-surface opacity-80">Final Liquid</span>
              <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-600 px-3 py-1 rounded-lg border border-emerald-100">
                 <span className="text-[11px] font-black tracking-tight">₹{totalNet.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction Controls */}
      <div className="flex flex-col xl:flex-row justify-between items-center mb-10 gap-6">
        <div className="relative w-full xl:w-96 group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-on-surface-variant/30 group-focus-within:text-primary transition-colors w-5 h-5" />
          <input
            className="w-full h-14 pl-14 pr-6 bg-white rounded-2xl border border-outline-variant/10 focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none text-sm font-bold transition-all shadow-sm placeholder:text-on-surface-variant/30"
            placeholder="Search transaction identifier or room..."
            type="text"
          />
        </div>
        <div className="flex gap-4 w-full xl:w-auto">
          <button className="flex-1 xl:flex-none h-14 px-8 bg-white border border-outline-variant/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-on-surface-variant hover:bg-surface-container-low transition-all shadow-sm active:scale-95">
            Filter Results
          </button>
          <button className="flex-1 xl:flex-none h-14 px-8 bg-on-surface text-surface rounded-2xl text-[10px] font-black uppercase tracking-widest hover:brightness-110 transition-all flex items-center justify-center gap-3 shadow-xl shadow-on-surface/10 active:scale-95 group">
            <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" /> 
            Export Ledger
          </button>
        </div>
      </div>

      {/* Transaction List */}
      <div className="bg-white rounded-[2.5rem] shadow-sm overflow-hidden border border-outline-variant/10">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-lowest/50 border-b border-outline-variant/10">
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-40">
                  TEMPORAL STAMP
                </th>
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-40">
                  ASSET / ORBIT
                </th>
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-40">
                  GROSS VOLUME
                </th>
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-40">
                  PLATFORM FEE
                </th>
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-40">
                  NET PAYOUT
                </th>
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-40 text-right">
                  STATUS
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/5">
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-surface-container-lowest transition-all group">
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-3">
                       <Clock className="w-4 h-4 text-on-surface-variant opacity-20" />
                       <div>
                          <p className="text-sm font-bold text-on-surface">{transaction.date}</p>
                          <p className="text-[10px] font-black text-on-surface-variant opacity-40 uppercase tracking-tighter">{transaction.time}</p>
                       </div>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-3">
                       <Building2 className="w-4 h-4 text-primary opacity-20 group-hover:opacity-100 transition-opacity" />
                       <div>
                          <p className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors">{transaction.property}</p>
                          <p className="text-[10px] font-black text-on-surface-variant opacity-60 uppercase tracking-widest">ID: {transaction.bookingId}</p>
                       </div>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <span className="text-sm font-black text-on-surface-variant">₹{transaction.gross.toLocaleString('en-IN')}</span>
                  </td>
                  <td className="px-10 py-8">
                    <span className="text-sm font-black text-primary opacity-60">
                      -₹{transaction.serviceFee.toLocaleString('en-IN')}
                    </span>
                  </td>
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-2">
                       <ArrowDownCircle className="w-4 h-4 text-emerald-500 opacity-40" />
                       <span className="text-lg font-black font-headline text-on-surface tracking-tighter">
                         ₹{transaction.net.toLocaleString('en-IN')}
                       </span>
                    </div>
                  </td>
                  <td className="px-10 py-8 text-right">
                    <span
                      className={`inline-flex items-center px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-xl ${
                        transaction.status === 'settled'
                          ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                          : 'bg-orange-50 text-orange-600 border border-orange-100'
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
