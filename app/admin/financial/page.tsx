'use client';

import { 
  TrendingUp, 
  IndianRupee, 
  Clock, 
  ArrowUpRight, 
  Wallet, 
  BarChart3, 
  Calendar,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

export default function AdminFinancialPage() {
  const kpis = [
    { label: 'TOTAL GROSS', value: '₹12,48,500', trend: 'Up 18.2%', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'NET REVENUE (10%)', value: '₹1,24,850', trend: 'Up 12.8%', icon: Wallet, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'PAYOUTS', value: '₹9,82,000', trend: 'Up 15.3%', icon: IndianRupee, color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'PENDING PAYOUTS', value: '12 Request', trend: 'Pending actions', icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50' },
  ];

  const revenueData = [
    { month: 'JAN', revenue: 45000 },
    { month: 'FEB', revenue: 52000 },
    { month: 'MAR', revenue: 48000 },
    { month: 'APR', revenue: 65000 },
    { month: 'MAY', revenue: 58000 },
    { month: 'JUN', revenue: 51000 },
    { month: 'JUL', revenue: 55000 },
    { month: 'AUG', revenue: 49000 },
  ];

  const recentPayouts = [
    {
      id: '#TXN-88291',
      owner: 'Arnesh Maheshwari',
      amount: '₹28,400',
      netAmount: '₹22,720',
      status: 'Complete',
      avatar: 'https://ui-avatars.com/api/?name=Arnesh+Maheshwari&background=b6212f&color=fff&size=128',
    },
    {
      id: '#TXN-88290',
      owner: 'Arjun Bose Das',
      amount: '₹15,800',
      netAmount: '₹12,640',
      status: 'Complete',
      avatar: 'https://ui-avatars.com/api/?name=Arjun+Das&background=b6212f&color=fff&size=128',
    },
    {
      id: '#TXN-88289',
      owner: 'Romanda Doodle Room',
      amount: '₹24,050',
      netAmount: '₹19,240',
      status: 'Complete',
      avatar: 'https://ui-avatars.com/api/?name=Romanda+Room&background=b6212f&color=fff&size=128',
    },
  ];

  const listingPerformance = [
    { name: 'Heritage Suite', revenue: '₹4,21,50' },
    { name: 'Doodle Room', revenue: '₹3,56,00' },
    { name: 'Zen Place', revenue: '₹2,83,40' },
  ];

  const maxRevenue = Math.max(...revenueData.map(d => d.revenue));

  return (
    <div className="px-6 md:px-12 py-6 pb-20">
      {/* Header Section */}
      <header className="mb-8">
        <h2 className="text-xl font-headline font-bold text-on-surface mb-1">Financial Intelligence</h2>
        <p className="text-on-surface-variant font-body text-sm leading-relaxed max-w-2xl">
          Real-time platform financials with precise revenue breakdown, commission tracking and payout lifecycle management.
        </p>
      </header>

      {/* KPI Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-3xl border border-outline-variant/10 shadow-sm relative overflow-hidden group hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-4">
                <span className={`p-2.5 rounded-xl ${kpi.bg} ${kpi.color}`}>
                  <Icon className="w-5 h-5" />
                </span>
                <div className="flex items-center gap-1 text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full uppercase tracking-tighter">
                  <ArrowUpRight className="w-3 h-3" />
                  12.5%
                </div>
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant mb-2 opacity-60">
                {kpi.label}
              </p>
              <h3 className="text-2xl font-headline font-black text-on-surface tracking-tight">
                {kpi.value}
              </h3>
              <p className="text-[10px] font-bold text-on-surface-variant/40 mt-1">{kpi.trend}</p>
            </div>
          );
        })}
      </section>

      {/* Revenue Trends & Listing Performance */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        {/* Revenue Trends Chart */}
        <div className="lg:col-span-8 bg-white p-8 rounded-[2rem] border border-outline-variant/10 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
            <div>
              <h3 className="font-headline text-lg font-bold text-on-surface mb-1">
                Revenue Velocity
              </h3>
              <p className="text-xs text-on-surface-variant">
                Daily commission capture and gross trends
              </p>
            </div>
            <div className="flex gap-2 mt-4 md:mt-0 bg-surface-container-lowest p-1 rounded-xl border border-outline-variant/10">
              <button className="px-4 py-1.5 bg-white text-[10px] font-black uppercase tracking-widest rounded-lg text-primary shadow-sm transition-all">
                Daily
              </button>
              <button className="px-4 py-1.5 text-on-surface-variant text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-white/50 transition-all">
                Weekly
              </button>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="h-64 flex items-end justify-between gap-3 px-2">
            {revenueData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-3 group">
                <div className="w-full flex flex-col items-center justify-end h-52 relative">
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-on-surface text-surface text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    ₹{data.revenue.toLocaleString()}
                  </div>
                  <div
                    className="w-full bg-primary/10 rounded-t-xl transition-all h-52 group-hover:bg-primary/20 relative"
                  >
                    <div 
                      className="absolute bottom-0 left-0 right-0 bg-primary rounded-t-xl transition-all"
                      style={{ height: `${(data.revenue / maxRevenue) * 100}%` }}
                    />
                  </div>
                </div>
                <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-wider">
                  {data.month}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Listing Performance */}
        <div className="lg:col-span-4 bg-white p-8 rounded-[2rem] border border-outline-variant/10 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="font-headline text-lg font-bold text-on-surface mb-1">
                Yield Analysis
              </h3>
              <p className="text-xs text-on-surface-variant font-medium">Top performing inventory assets</p>
            </div>
            <BarChart3 className="text-on-surface-variant opacity-20 w-6 h-6" />
          </div>

          <div className="space-y-6">
            {listingPerformance.map((listing, index) => (
              <div key={index} className="flex items-center justify-between pb-6 border-b border-outline-variant/10 last:border-0 last:pb-0">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-surface-container rounded-xl flex items-center justify-center">
                    <span className="text-xs font-black text-on-surface-variant">0{index + 1}</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-on-surface leading-snug">{listing.name}</p>
                    <div className="flex items-center gap-1.5 mt-1 opacity-60">
                      <Calendar className="w-3 h-3 text-on-surface-variant" />
                      <span className="text-[10px] font-bold text-on-surface-variant uppercase">Current Month</span>
                    </div>
                  </div>
                </div>
                <p className="text-lg font-headline font-black text-primary tracking-tight">{listing.revenue}</p>
              </div>
            ))}
          </div>

          <button className="w-full mt-8 pt-6 border-t border-outline-variant/10 text-[10px] font-black text-primary uppercase tracking-[0.2em] hover:brightness-110 transition-all text-center">
            View Analytics →
          </button>
        </div>
      </section>

      {/* Recent Payouts */}
      <section className="bg-white rounded-[2rem] border border-outline-variant/10 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-outline-variant/10 flex items-center justify-between">
          <div>
            <h3 className="font-headline text-lg font-bold text-on-surface mb-1 text-primary">
              Recent Payout Requests
            </h3>
            <p className="text-xs text-on-surface-variant font-medium">Latest automated and manual settlements</p>
          </div>
          <button className="h-10 px-6 bg-surface-container hover:bg-surface-container-high rounded-xl text-[10px] font-black text-on-surface uppercase tracking-widest transition-all active:scale-95">
            View Ledger
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-outline-variant/10 bg-surface-container-lowest">
                <th className="text-left px-8 py-5 text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-60">
                  REF ID
                </th>
                <th className="text-left px-8 py-5 text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-60">
                  PARTNER
                </th>
                <th className="text-left px-8 py-5 text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-60">
                  GROSS
                </th>
                <th className="text-left px-8 py-5 text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-60 text-right">
                   NET PAYOUT
                </th>
                <th className="text-right px-8 py-5 text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-60">
                  STATUS
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {recentPayouts.map((payout, index) => (
                <tr
                  key={index}
                  className="hover:bg-surface-container-lowest/50 transition-colors group"
                >
                  <td className="px-8 py-5">
                    <span className="text-xs font-bold text-on-surface font-mono">{payout.id}</span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl overflow-hidden bg-primary shrink-0 relative">
                        <img
                          alt={payout.owner}
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all"
                          src={payout.avatar}
                        />
                      </div>
                      <span className="text-sm font-bold text-on-surface">{payout.owner}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-sm font-bold text-on-surface-variant">{payout.amount}</span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <span className="text-base font-black text-primary tracking-tight">{payout.netAmount}</span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <span className="inline-flex items-center px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest bg-emerald-50 text-emerald-600 border border-emerald-100">
                      Settled
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
