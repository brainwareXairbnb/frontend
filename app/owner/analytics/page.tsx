'use client';

import { 
  Eye, 
  TrendingUp, 
  UserPlus, 
  CalendarCheck, 
  MapPin, 
  BarChart3, 
  ChevronRight, 
  Star, 
  ArrowUpRight, 
  Activity,
  Globe,
  PieChart
} from 'lucide-react';

export default function OwnerAnalyticsPage() {
  const propertyPerformance = [
    { name: 'Heritage Suite', revenue: 82400, occupancy: 98, views: 1240, inquiries: 89 },
    { name: 'Minimalist Loft', revenue: 42150, occupancy: 85, views: 890, inquiries: 62 },
    { name: 'Scholar\'s Atrium', revenue: 38900, occupancy: 78, views: 720, inquiries: 54 },
    { name: 'Modern Studio', revenue: 31200, occupancy: 72, views: 580, inquiries: 41 }
  ];

  const monthlyData = [
    { month: 'Jan', revenue: 28000, bookings: 12, views: 450 },
    { month: 'Feb', revenue: 32000, bookings: 14, views: 520 },
    { month: 'Mar', revenue: 29500, bookings: 13, views: 480 },
    { month: 'Apr', revenue: 42000, bookings: 18, views: 680 },
    { month: 'May', revenue: 38000, bookings: 16, views: 620 },
    { month: 'Jun', revenue: 35000, bookings: 15, views: 590 },
  ];

  const topCities = [
    { city: 'Kolkata', percentage: 68, count: 42 },
    { city: 'Mumbai', percentage: 18, count: 11 },
    { city: 'Delhi', percentage: 9, count: 6 },
    { city: 'Bangalore', percentage: 5, count: 3 }
  ];

  return (
    <div className="px-6 md:px-12 pb-20">
      {/* Header Section */}
      <header className="py-10 border-b border-outline-variant/5 mb-12">
         <h2 className="text-xl font-headline font-black text-on-surface mb-2 uppercase tracking-wide">Market Intelligence</h2>
        <p className="text-on-surface-variant font-body text-base leading-relaxed font-medium max-w-2xl">
          Deep telemetry into managed asset performance, yield trajectories, and student demographic clusters.
        </p>
      </header>

      {/* Key Metrics Overview */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-12">
        <div className="bg-white p-8 rounded-[2.5rem] border border-outline-variant/10 shadow-sm group hover:shadow-2xl transition-all duration-500">
          <div className="flex items-center justify-between mb-8">
            <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
               <Eye className="w-6 h-6" />
            </div>
            <div className="px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-lg flex items-center gap-1 text-[10px] font-black uppercase tracking-tighter">
              <TrendingUp className="w-3.5 h-3.5" />
              +15.2%
            </div>
          </div>
          <h3 className="text-4xl font-headline font-black text-on-surface mb-2 tracking-tighter">3,430</h3>
          <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-40">Total Impressions</p>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-outline-variant/10 shadow-sm group hover:shadow-2xl transition-all duration-500">
          <div className="flex items-center justify-between mb-8">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
               <UserPlus className="w-6 h-6" />
            </div>
            <div className="px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-lg flex items-center gap-1 text-[10px] font-black uppercase tracking-tighter">
              <TrendingUp className="w-3.5 h-3.5" />
              +22.8%
            </div>
          </div>
          <h3 className="text-4xl font-headline font-black text-on-surface mb-2 tracking-tighter">246</h3>
          <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-40">Verified Inquiries</p>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-outline-variant/10 shadow-sm group hover:shadow-2xl transition-all duration-500">
          <div className="flex items-center justify-between mb-8">
            <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center group-hover:bg-orange-600 group-hover:text-white transition-all">
               <CalendarCheck className="w-6 h-6" />
            </div>
            <div className="px-2.5 py-1 bg-orange-50 text-orange-600 rounded-lg text-[10px] font-black uppercase tracking-tighter">
              83% MATCH
            </div>
          </div>
          <h3 className="text-4xl font-headline font-black text-on-surface mb-2 tracking-tighter">88</h3>
          <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-40">Node Commitments</p>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-outline-variant/10 shadow-sm group hover:shadow-2xl transition-all duration-500">
          <div className="flex items-center justify-between mb-8">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all">
               <Activity className="w-6 h-6" />
            </div>
            <div className="px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-lg flex items-center gap-1 text-[10px] font-black uppercase tracking-tighter">
              <TrendingUp className="w-3.5 h-3.5" />
              +12.1%
            </div>
          </div>
          <h3 className="text-4xl font-headline font-black text-on-surface mb-2 tracking-tighter">36%</h3>
          <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-40">Ecosystem Conversion</p>
        </div>
      </section>

      {/* Revenue & Bookings Chart */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12">
        <div className="lg:col-span-12 xl:col-span-8 bg-white p-10 rounded-[2.5rem] border border-outline-variant/10 shadow-sm relative overflow-hidden group">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 relative z-10">
            <div>
              <h3 className="font-headline text-2xl font-black text-on-surface mb-1 tracking-tight">Yield Trajectory</h3>
              <p className="text-sm text-on-surface-variant font-medium">Consolidated asset performance sync</p>
            </div>
            <div className="flex gap-2 mt-6 md:mt-0 p-1 bg-surface-container-lowest border border-outline-variant/10 rounded-2xl">
               <button className="px-6 py-2.5 text-[10px] font-black uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors">6 MONTH CYCLE</button>
               <button className="px-6 py-2.5 bg-on-surface text-surface text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg shadow-on-surface/10 transition-all">ACTIVE ANNUAL</button>
            </div>
          </div>

          {/* Upgraded Bar Chart */}
          <div className="h-80 flex items-end justify-between gap-6 px-4 relative z-10">
            {monthlyData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-4 group/bar">
                <div className="w-full flex flex-col items-center justify-end h-64 relative">
                   <div className="absolute inset-x-0 bottom-0 w-full bg-primary/5 rounded-t-2xl h-full -z-0"></div>
                   <div
                     className="w-full bg-primary/10 rounded-t-2xl group-hover/bar:bg-primary/20 transition-all cursor-pointer relative z-10 overflow-hidden"
                     style={{ height: `${(data.revenue / 42000) * 100}%` }}
                   >
                      <div
                        className="absolute bottom-0 w-full bg-primary rounded-t-2xl transition-all duration-1000 group-hover/bar:scale-y-110 origin-bottom"
                        style={{ height: '70%', transitionDelay: `${index * 50}ms` }}
                      >
                         <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      </div>
                   </div>
                   {/* Advanced Tooltip */}
                   <div className="absolute -top-24 left-1/2 -translate-x-1/2 bg-on-surface p-4 rounded-2xl opacity-0 group-hover/bar:opacity-100 group-hover/bar:-top-28 transition-all whitespace-nowrap z-30 shadow-2xl pointer-events-none scale-75 group-hover/bar:scale-100">
                      <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">{data.month} PERIOD</p>
                      <p className="text-xl font-headline font-black text-white tracking-tighter">₹{(data.revenue).toLocaleString()}</p>
                      <p className="text-[10px] font-black text-primary uppercase mt-2">{data.bookings} NODE COMMITMENTS</p>
                   </div>
                </div>
                <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] opacity-40 group-hover/bar:opacity-100 transition-opacity">
                  {data.month}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-8 mt-10 pt-10 border-t border-outline-variant/10 relative z-10">
            <div className="flex items-center gap-2.5">
              <div className="w-3 h-3 bg-primary rounded-full shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]"></div>
              <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Captured Yield</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-3 h-3 bg-primary/20 rounded-full"></div>
              <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Theoretical Ceiling</span>
            </div>
          </div>
        </div>

        {/* Geographic Distribution */}
        <div className="lg:col-span-12 xl:col-span-4 bg-white p-10 rounded-[2.5rem] border border-outline-variant/10 shadow-sm relative overflow-hidden group">
           <div className="flex items-center justify-between mb-10">
               <h3 className="font-headline text-2xl font-black text-on-surface tracking-tight">Origin Clusters</h3>
               <Globe className="w-6 h-6 text-primary opacity-20 group-hover:rotate-[360deg] transition-transform duration-[2000ms]" />
           </div>
          <p className="text-sm text-on-surface-variant font-medium mb-12">Tenant distribution by regional identifier</p>

          <div className="space-y-8">
            {topCities.map((city, index) => (
              <div key={index} className="group/item">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-black text-on-surface tracking-tight">{city.city}</span>
                  <span className="text-[11px] font-black text-primary bg-primary/5 px-2.5 py-1 rounded-lg border border-primary/10">{city.percentage}%</span>
                </div>
                <div className="w-full h-2.5 bg-surface-container-lowest rounded-full overflow-hidden border border-outline-variant/10 p-0.5">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-1000 group-hover/item:shadow-[0_0_15px_rgba(var(--primary-rgb),0.4)]"
                    style={{ width: `${city.percentage}%`, transitionDelay: `${index * 100}ms` }}
                  />
                </div>
                <div className="flex items-center justify-between mt-2">
                   <p className="text-[9px] font-black text-on-surface-variant uppercase tracking-widest opacity-40">{city.count} TERMINALS ACTIVE</p>
                   <ArrowUpRight className="w-3 h-3 text-on-surface-variant opacity-0 group-hover/item:opacity-40" />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-outline-variant/10 group-hover:bg-primary/[0.02] transition-colors -mx-10 px-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                 <MapPin className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] opacity-40">Primary Grid</p>
                <p className="text-sm font-black text-on-surface tracking-tight">WEST BENGAL ECONOMIC ZONE</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Property Performance Table */}
      <section className="bg-white rounded-[2.5rem] border border-outline-variant/10 shadow-sm overflow-hidden group">
        <div className="p-10 border-b border-outline-variant/10 flex items-center justify-between">
           <div>
              <h3 className="font-headline text-3xl font-black text-on-surface mb-1 tracking-tighter">Asset Topology</h3>
              <p className="text-sm text-on-surface-variant font-medium">Granular breakdown by individual property node</p>
           </div>
           <div className="w-12 h-12 bg-surface-container-low rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform shadow-inner">
              <PieChart className="w-6 h-6 text-on-surface-variant" />
           </div>
        </div>

        {/* Desktop Table (Upgraded) */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-surface-container-lowest/50 border-b border-outline-variant/5">
                <th className="text-left px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-40">
                  ASSET IDENTIFIER
                </th>
                <th className="text-right px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-40">
                  REVENUE VOLUME
                </th>
                <th className="text-right px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-40">
                  SATURATION
                </th>
                <th className="text-right px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-40">
                  SENSORY IMPRESSIONS
                </th>
                <th className="text-right px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-40">
                  CURIOSITY TRACTION
                </th>
                <th className="text-right px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-40">
                  CYCLES
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/5">
              {propertyPerformance.map((property, index) => (
                <tr key={index} className="hover:bg-surface-container-lowest transition-all group/row">
                  <td className="px-10 py-10">
                    <div className="flex items-center gap-4">
                      <div className="w-3 h-3 bg-primary rounded-full group-hover/row:scale-150 transition-transform shadow-[0_0_10px_rgba(var(--primary-rgb),0.3)]"></div>
                      <span className="font-black text-lg text-on-surface tracking-tighter group-hover/row:text-primary transition-colors">{property.name}</span>
                    </div>
                  </td>
                  <td className="px-10 py-10 text-right">
                    <span className="font-headline font-black text-2xl text-on-surface tracking-tighter">₹{property.revenue.toLocaleString()}</span>
                  </td>
                  <td className="px-10 py-10 text-right">
                     <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100">
                        <Star className="w-3.5 h-3.5 fill-emerald-600" />
                        <span className="text-xs font-black tracking-tight">{property.occupancy}%</span>
                     </div>
                  </td>
                  <td className="px-10 py-10 text-right">
                    <span className="text-xs font-black text-on-surface-variant opacity-60 uppercase">{property.views.toLocaleString()} UNIT VIEWS</span>
                  </td>
                  <td className="px-10 py-10 text-right">
                    <span className="text-sm font-black text-on-surface-variant uppercase tracking-tighter">{property.inquiries} SIGNALS</span>
                  </td>
                  <td className="px-10 py-10 text-right">
                     <div className="flex items-center justify-end gap-2">
                        <span className="text-sm font-black text-primary tracking-tighter">
                          {Math.round((property.inquiries / property.views) * 100)}%
                        </span>
                        <BarChart3 className="w-4 h-4 text-primary opacity-20" />
                     </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Upgraded Cards */}
        <div className="lg:hidden p-8 space-y-8 bg-surface-container-lowest">
          {propertyPerformance.map((property, index) => (
            <div key={index} className="bg-white p-8 rounded-[2rem] border border-outline-variant/10 shadow-sm relative overflow-hidden">
               <div className="absolute top-0 right-0 w-1 h-full bg-primary/50"></div>
              <h4 className="font-headline text-2xl font-black text-on-surface mb-8 tracking-tighter">{property.name}</h4>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-[10px] text-on-surface-variant font-black uppercase tracking-widest opacity-40 mb-2">Revenue</p>
                  <p className="font-headline font-black text-primary text-2xl tracking-tighter leading-none">₹{(property.revenue / 1000).toFixed(1)}K</p>
                </div>
                <div>
                  <p className="text-[10px] text-on-surface-variant font-black uppercase tracking-widest opacity-40 mb-2">Occupancy</p>
                  <p className="font-black text-on-surface text-2xl tracking-tighter leading-none">{property.occupancy}%</p>
                </div>
                <div>
                  <p className="text-[10px] text-on-surface-variant font-black uppercase tracking-widest opacity-40 mb-2">Visibility</p>
                  <p className="text-sm font-black text-on-surface-variant uppercase tracking-tighter">{property.views.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-[10px] text-on-surface-variant font-black uppercase tracking-widest opacity-40 mb-2">Conversion</p>
                  <p className="text-sm font-black text-emerald-600 uppercase tracking-tighter">
                    {Math.round((property.inquiries / property.views) * 100)}% ALPHA
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
