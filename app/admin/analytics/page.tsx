'use client';

import { 
  TrendingUp, 
  TrendingDown, 
  GraduationCap, 
  Activity, 
  PieChart, 
  Map, 
  BarChart, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export default function AdminAnalyticsPage() {
  const kpis = [
    { label: 'TOTAL ECOSYSTEM REVENUE', value: '₹24,82,900.00', trend: 'Lifetime platform earnings', color: 'primary' },
    { label: 'COMMISSION CAPTURE', value: '₹84,215', trend: 'Up 28.4% since last month', color: 'tertiary' },
  ];

  const serviceChargeData = [
    { month: 'JAN', charge: 12000 },
    { month: 'FEB', charge: 15000 },
    { month: 'MAR', charge: 14000 },
    { month: 'APR', charge: 28000 },
    { month: 'MAY', charge: 32000 },
    { month: 'JUN', charge: 35000 },
  ];

  const campusRevenue = [
    { name: 'S.N.S College Area', revenue: '₹82,920', percentage: '42%', trend: 'up' },
    { name: 'C.K Memorial Area', revenue: '₹48,150', percentage: '25%', trend: 'up' },
    { name: 'J.S.G School Area', revenue: '₹34,680', percentage: '17%', trend: 'down' },
  ];

  const topCategories = [
    { name: 'Academic Suites', revenue: '₹2.25L' },
    { name: 'Loft Residences', revenue: '₹1.42L' },
    { name: 'Garden Studios', revenue: '₹98k' },
    { name: 'Executive Villas', revenue: '₹75k' },
  ];

  const maxCharge = Math.max(...serviceChargeData.map(d => d.charge));

  return (
    <div className="px-6 md:px-12 py-6 pb-20">
      {/* Header Section */}
      <header className="mb-8">
        <h2 className="text-xl font-headline font-bold text-on-surface mb-1 text-primary">Revenue Intel</h2>
        <p className="text-on-surface-variant font-body text-sm leading-relaxed max-w-2xl">
          Deep-dive analysis into platform yield, geographic performance hubs and category-level transaction velocity.
        </p>
      </header>

      {/* KPI Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {kpis.map((kpi, index) => (
          <div key={index} className="bg-white p-8 rounded-3xl border border-outline-variant/10 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform">
              <PieChart className="w-20 h-20" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant mb-4 opacity-70">
              {kpi.label}
            </p>
            <h3 className="text-4xl font-headline font-black text-on-surface mb-3 tracking-tighter">
              {kpi.value}
            </h3>
            <div className="flex items-center gap-2">
               <Activity className="w-4 h-4 text-primary" />
               <p className="text-xs font-bold text-on-surface-variant">{kpi.trend}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Growth Stats Card */}
      <div className="bg-primary p-10 rounded-[2.5rem] shadow-2xl mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="flex flex-col md:flex-row items-start justify-between relative z-10">
          <div className="max-w-xl">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-on-primary/70 mb-4">
              Monthly Platform Velocity
            </p>
            <h3 className="text-5xl font-headline font-black text-on-primary mb-6 tracking-tighter">
              ₹3,72,435
            </h3>
            <p className="text-sm font-medium text-on-primary/80 leading-relaxed">
              Indicating hyper-growth in student acquisition and owner-to-platform trust cycles. Quarterly projections are exceeding initial targets by 14.2%.
            </p>
          </div>
          <div className="mt-8 md:mt-0 bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10 shadow-xl">
            <p className="text-[10px] font-black uppercase tracking-[0.1em] text-on-primary/60 mb-1 leading-none">Fiscal Period</p>
            <p className="text-3xl font-headline font-black text-on-primary">Q2 2024</p>
          </div>
        </div>
      </div>

      {/* Service Charge Growth & Revenue Heatmap */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        {/* Service Charge Growth */}
        <div className="lg:col-span-12 xl:col-span-8 bg-white p-8 rounded-[2rem] border border-outline-variant/10 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
            <div>
              <h3 className="font-headline text-lg font-bold text-on-surface mb-1">
                Yield Scaling
              </h3>
              <p className="text-xs text-on-surface-variant font-medium">
                Consolidated platform fees and value-added service capture
              </p>
            </div>
            <div className="flex gap-2 mt-4 md:mt-0 bg-surface-container-lowest p-1 rounded-xl border border-outline-variant/10">
              <button className="px-5 py-2 bg-white text-[10px] font-black uppercase tracking-widest rounded-lg text-primary shadow-sm transition-all">
                Last 6M
              </button>
              <button className="px-5 py-2 text-on-surface-variant text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-white/50 transition-all">
                FY 2024
              </button>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="h-64 flex items-end justify-between gap-3 px-2">
            {serviceChargeData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-3 group">
                <div className="w-full flex flex-col items-center justify-end h-52 relative">
                   <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-on-surface text-surface text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                    ₹{data.charge.toLocaleString()}
                  </div>
                  <div
                    className="w-full bg-primary rounded-t-xl transition-all h-52 relative overflow-hidden"
                  >
                    <div 
                      className="absolute bottom-0 left-0 right-0 bg-primary h-full brightness-110 group-hover:brightness-125 transition-all"
                      style={{ height: `${(data.charge / maxCharge) * 100}%` }}
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

        {/* Revenue Heatmap Placeholder Alternative */}
        <div className="lg:col-span-12 xl:col-span-4 bg-white p-8 rounded-[2rem] border border-outline-variant/10 shadow-sm">
          <div className="mb-8">
            <h3 className="font-headline text-lg font-bold text-on-surface mb-1">
              Geographic Clusters
            </h3>
            <p className="text-xs text-on-surface-variant font-medium">
              High-velocity revenue zones
            </p>
          </div>

          <div className="aspect-square bg-surface-container rounded-2xl overflow-hidden mb-6 relative group border border-outline-variant/5">
             <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/10 opacity-50"></div>
             <Map className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 text-primary/10 group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 flex items-center justify-center p-6">
              <div className="text-center relative z-10">
                 <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary text-on-primary rounded-full text-[9px] font-black uppercase tracking-widest mb-4 shadow-lg shadow-primary/20">
                    CORE HUB
                 </div>
                <p className="text-3xl font-headline font-black text-on-surface tracking-tighter">Kolkata</p>
                <p className="text-xs font-bold text-on-surface-variant/60 mt-2 uppercase tracking-widest">North & Salt Lake Sectors</p>
              </div>
            </div>
          </div>

          <button className="w-full h-12 flex items-center justify-center gap-2 text-[10px] font-black text-primary uppercase tracking-[0.15em] hover:bg-primary/5 rounded-xl transition-all">
            Spatial Analysis
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Campus Proximity & Top Categories */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Campus Proximity */}
        <div className="bg-white p-8 rounded-[2rem] border border-outline-variant/10 shadow-sm">
          <div className="mb-10">
            <h3 className="font-headline text-lg font-bold text-on-surface mb-1">
              Campus Concentration
            </h3>
            <p className="text-xs text-on-surface-variant font-medium">
              Revenue yield relative to nearest academic hub
            </p>
          </div>

          <div className="space-y-8">
            {campusRevenue.map((campus, index) => (
              <div key={index} className="group">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-on-primary transition-all shadow-sm">
                      <GraduationCap className="w-5 h-5 text-primary group-hover:text-on-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-on-surface leading-none mb-1">{campus.name}</p>
                      <p className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-widest">{campus.percentage} Contribution</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-headline font-black text-primary tracking-tight">{campus.revenue}</p>
                    {campus.trend === 'up' ? (
                      <div className="flex items-center justify-end gap-1 text-[10px] font-black text-emerald-600 uppercase tracking-widest mt-0.5">
                        <TrendingUp className="w-3 h-3" />
                        UP
                      </div>
                    ) : (
                      <div className="flex items-center justify-end gap-1 text-[10px] font-black text-red-600 uppercase tracking-widest mt-0.5">
                        <TrendingDown className="w-3 h-3" />
                        DOWN
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex-1 h-3 bg-surface-container rounded-full overflow-hidden border border-outline-variant/5">
                  <div
                    className="h-full bg-primary rounded-full shadow-[0_0_10px_rgba(var(--primary-rgb),0.3)] transition-all duration-1000"
                    style={{ width: campus.percentage }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Categories */}
        <div className="bg-white p-8 rounded-[2rem] border border-outline-variant/10 shadow-sm">
          <div className="mb-10">
            <h3 className="font-headline text-lg font-bold text-on-surface mb-1">
              Segment Velocity
            </h3>
            <p className="text-xs text-on-surface-variant font-medium">
              Category-level contribution to gross volume
            </p>
          </div>

          <div className="space-y-4">
            {topCategories.map((category, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-5 bg-surface-container-lowest rounded-2xl border border-outline-variant/5 hover:border-primary/20 hover:bg-white hover:shadow-lg transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-surface-container group-hover:bg-primary/10 rounded-xl flex items-center justify-center transition-colors">
                    <span className="text-xs font-black text-on-surface-variant group-hover:text-primary">0{index + 1}</span>
                  </div>
                  <p className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors">{category.name}</p>
                </div>
                <div className="flex items-center gap-2">
                   <p className="text-lg font-headline font-black text-on-surface tracking-tighter group-hover:text-primary transition-colors">{category.revenue}</p>
                   <ChevronRight className="w-4 h-4 text-on-surface-variant/20 group-hover:text-primary/50 transition-all" />
                </div>
              </div>
            ))}
          </div>

          <button className="w-full h-12 flex items-center justify-center gap-2 mt-8 text-[10px] font-black text-primary uppercase tracking-[0.2em] border-2 border-primary/10 rounded-2xl hover:bg-primary hover:text-on-primary transition-all">
             Full Category Reports
          </button>
        </div>
      </section>
    </div>
  );
}
