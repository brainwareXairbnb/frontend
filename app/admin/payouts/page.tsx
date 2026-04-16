'use client';

import { 
  Wallet, 
  Coins, 
  AlertCircle, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  PauseCircle, 
  Ban, 
  MoreVertical, 
  ChevronLeft, 
  ChevronRight,
  ArrowUpRight,
  Zap,
  Banknote,
  ShieldCheck,
  Calendar
} from 'lucide-react';

export default function AdminPayoutsPage() {
  const stats = {
    totalPending: '₹1,42,850',
    pendingCount: 14,
    failedPayouts: 3,
  };

  const payouts = [
    {
      owner: 'Ankit Verma',
      email: 'ankit@example.com',
      bankStatus: 'Verified',
      amount: '₹2,840.00',
      dueDate: 'Apr 15, 2024',
      status: 'Ready',
      avatar: 'https://ui-avatars.com/api/?name=Ankit+Verma&background=b6212f&color=fff&size=128',
    },
    {
      owner: 'Priya Chatterjee',
      email: 'priya@example.com',
      bankStatus: 'On Hold',
      amount: '₹8,920.50',
      dueDate: 'Apr 14, 2024',
      status: 'Hold',
      avatar: 'https://ui-avatars.com/api/?name=Priya+Chatterjee&background=b6212f&color=fff&size=128',
    },
    {
      owner: 'Arnesh Maheshwari',
      email: 'arnesh@example.com',
      bankStatus: 'Verified',
      amount: '₹15,120.75',
      dueDate: 'Apr 13, 2024',
      status: 'Processing',
      avatar: 'https://ui-avatars.com/api/?name=Arnesh+Maheshwari&background=b6212f&color=fff&size=128',
    },
    {
      owner: 'Rohit Kumar',
      email: 'rohit@example.com',
      bankStatus: 'Verified',
      amount: '₹5,640.00',
      dueDate: 'Apr 12, 2024',
      status: 'Ready',
      avatar: 'https://ui-avatars.com/api/?name=Rohit+Kumar&background=b6212f&color=fff&size=128',
    },
  ];

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'Ready':
        return { color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100', icon: CheckCircle2 };
      case 'Processing':
        return { color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100', icon: Clock };
      case 'Hold':
        return { color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-100', icon: PauseCircle };
      case 'Failed':
        return { color: 'text-red-500', bg: 'bg-red-50', border: 'border-red-100', icon: Ban };
      default:
        return { color: 'text-gray-400', bg: 'bg-gray-50', border: 'border-gray-100', icon: Clock };
    }
  };

  return (
    <div className="px-6 md:px-12 py-10 pb-24 bg-[#fafafa]">
      {/* Header Section */}
      <header className="mb-10">
        <div className="flex items-center gap-3 mb-4">
           <div className="w-8 h-8 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500">
              <Banknote className="w-4 h-4" />
           </div>
           <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500">Fiscal Operations</h2>
        </div>
        <h1 className="text-4xl md:text-5xl font-headline font-black text-on-surface tracking-tighter uppercase mb-4">
           Revenue <span className="text-primary">Disbursement</span>
        </h1>
        <p className="text-on-surface-variant font-medium text-sm leading-relaxed max-w-2xl opacity-60 uppercase tracking-widest">
          Coordinate partner payouts and schedule automated fiscal cycles. Resolve failed transactions and verify bank identity modules.
        </p>
      </header>

      {/* Stats Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        <div className="bg-white p-8 rounded-[2.5rem] border border-outline-variant/10 shadow-xl shadow-black/[0.02] group">
          <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-40 mb-3">
            Total Liability
          </p>
          <div className="flex items-end justify-between">
             <h3 className="text-3xl font-headline font-black text-on-surface tracking-tighter uppercase">
               {stats.totalPending}
             </h3>
             <Wallet className="w-8 h-8 opacity-[0.05] group-hover:opacity-20 transition-opacity" />
          </div>
          <p className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant opacity-40 mt-3">{stats.pendingCount} Pending Batches</p>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-outline-variant/10 shadow-xl shadow-black/[0.02] group">
          <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-40 mb-3">
            Clearance Buffer
          </p>
          <div className="flex items-end justify-between">
             <h3 className="text-3xl font-headline font-black text-emerald-500 tracking-tighter uppercase">
               {stats.pendingCount}
             </h3>
             <Coins className="w-8 h-8 text-emerald-500 opacity-[0.05] group-hover:opacity-20 transition-opacity" />
          </div>
          <p className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant opacity-40 mt-3">Verified Entity Wallets</p>
        </div>

        <div className="bg-on-surface p-8 rounded-[2.5rem] shadow-2xl group">
          <p className="text-[10px] font-black uppercase tracking-widest text-surface opacity-40 mb-3">
            High Priority (Failed)
          </p>
          <div className="flex items-end justify-between">
             <h3 className="text-3xl font-headline font-black text-primary tracking-tighter uppercase">
               {stats.failedPayouts}
             </h3>
             <AlertCircle className="w-8 h-8 text-primary shadow-xl shadow-primary/20 rotate-12 transition-transform" />
          </div>
          <p className="text-[9px] font-black uppercase tracking-widest text-surface opacity-40 mt-3 flex items-center gap-2">
            Requires Manual Override
          </p>
        </div>
      </section>

      {/* Search and Filters */}
      <div className="mb-10 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/20 group-focus-within:text-primary transition-all" />
          <input
            type="text"
            placeholder="SEARCH ENTITY NAME OR FISCAL ID..."
            className="w-full h-16 bg-white border border-outline-variant/10 rounded-2xl pl-16 pr-6 text-[10px] font-black uppercase tracking-widest text-on-surface focus:border-primary outline-none shadow-sm transition-all"
          />
        </div>
        <div className="flex gap-4">
          <button className="h-16 px-8 bg-white border border-outline-variant/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:border-primary/20 transition-all flex items-center gap-3">
            <Filter className="w-4 h-4 opacity-40" />
            Classifiers
          </button>
        </div>
      </div>

      {/* Payouts Table */}
      <section className="bg-white rounded-[3rem] border border-outline-variant/10 shadow-xl shadow-black/[0.02] overflow-hidden group/table">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-outline-variant/5 bg-[#FAFAFA]">
                <th className="text-left px-8 py-6 text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-40">
                  Global Entity
                </th>
                <th className="text-left px-8 py-6 text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-40">
                  Bank Registry
                </th>
                <th className="text-left px-8 py-6 text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-40">
                  Cycle Yield
                </th>
                <th className="text-left px-8 py-6 text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-40">
                  Maturity Date
                </th>
                <th className="text-left px-8 py-6 text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-40">
                  Protocol Status
                </th>
                <th className="text-right px-8 py-6 text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-40">
                  Override
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/5">
              {payouts.map((payout, index) => {
                const status = getStatusConfig(payout.status);
                const StatusIcon = status.icon;
                return (
                  <tr
                    key={index}
                    className="hover:bg-[#FAFAFA] transition-colors group/row"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl overflow-hidden bg-white shadow-sm shrink-0 border border-outline-variant/5">
                          <img
                            alt={payout.owner}
                            className="w-full h-full object-cover grayscale group-hover/row:grayscale-0 transition-all duration-500"
                            src={payout.avatar}
                          />
                        </div>
                        <div>
                          <p className="text-[11px] font-black uppercase tracking-widest text-on-surface">{payout.owner}</p>
                          <p className="text-[9px] font-bold text-on-surface-variant opacity-40 uppercase tracking-widest">{payout.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest ${payout.bankStatus === 'Verified' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-orange-50 text-orange-600 border border-orange-100'}`}>
                        {payout.bankStatus === 'Verified' ? <ShieldCheck className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                        {payout.bankStatus}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-base font-headline font-black text-on-surface tracking-tighter">
                        {payout.amount}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-[10px] font-black uppercase tracking-widest text-on-surface opacity-40">{payout.dueDate}</span>
                    </td>
                    <td className="px-8 py-6">
                      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-[9px] font-black uppercase tracking-widest border ${status.bg} ${status.color} ${status.border}`}>
                        <StatusIcon className="w-3 h-3" />
                        {payout.status}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-3">
                        {payout.status === 'Ready' && (
                          <button className="h-10 px-6 bg-primary text-white rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:opacity-90 active:scale-95 transition-all">
                            Initialize
                          </button>
                        )}
                        <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white hover:shadow-xl hover:border border-outline-variant/5 transition-all opacity-20 hover:opacity-100">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-10 py-8 border-t border-outline-variant/5 flex flex-col md:flex-row items-center justify-between gap-6 bg-[#FAFAFA]">
          <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-40">
            Current Buffer <span className="text-on-surface opacity-100">1-4</span> / <span className="text-on-surface opacity-100">14</span> Units
          </p>
          <div className="flex gap-2">
            <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-outline-variant/10 hover:bg-white transition-all opacity-40 hover:opacity-100">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-on-surface text-surface font-black text-[10px] shadow-xl">
              1
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-outline-variant/10 text-on-surface-variant font-black text-[10px] hover:border-primary/20 transition-all">
              2
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-outline-variant/10 hover:bg-white transition-all opacity-40 hover:opacity-100">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Info Cards */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
        <div className="bg-white p-8 md:p-10 rounded-[3rem] border border-outline-variant/10 shadow-xl shadow-black/[0.02] relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <h3 className="font-headline text-xl font-black text-on-surface tracking-tighter uppercase mb-2">
            Protocol Automation
          </h3>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-40 mb-8">
            Global Hub Cycles (Weekly)
          </p>
          <p className="text-[11px] font-medium text-on-surface-variant/60 leading-relaxed uppercase tracking-widest mb-10">
            Synchronize bank-level packet deployment schedules. All validated units will automatically initialize at high-velocity thresholds.
          </p>
          <button className="h-14 bg-primary text-white px-10 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-primary/20 hover:opacity-90 transition-all group-hover:scale-105">
            Calibrate Schedule
          </button>
        </div>

        <div className="bg-white p-8 md:p-10 rounded-[3rem] border border-outline-variant/10 shadow-xl shadow-black/[0.02] relative overflow-hidden">
          <h3 className="font-headline text-xl font-black text-on-surface tracking-tighter uppercase mb-2">
            Disbursement Pulse
          </h3>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-40 mb-8">
            Next Cycle: T-Minus 48 Hours
          </p>
          
          <div className="space-y-6">
             <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                <span className="text-on-surface-variant opacity-40">Validation Cluster Status</span>
                <span className="text-primary">75% DEPLETION</span>
             </div>
             <div className="h-4 bg-[#FAFAFA] rounded-full overflow-hidden border border-outline-variant/5">
                <div className="h-full bg-primary w-3/4 shadow-[0_0_20px_rgba(182,33,47,0.4)] animate-pulse"></div>
             </div>
             <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center gap-3">
                   <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white">
                      <Zap className="w-4 h-4" />
                   </div>
                   <span className="text-[9px] font-black uppercase tracking-widest text-emerald-700">NODE ACTIVE</span>
                </div>
                <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 flex items-center gap-3">
                   <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white">
                      <Calendar className="w-4 h-4" />
                   </div>
                   <span className="text-[9px] font-black uppercase tracking-widest text-blue-700">APR 14 TARGET</span>
                </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
