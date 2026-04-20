'use client';

import { useState, useEffect } from 'react';
import { adminApi } from '@/lib/api';
import { DashboardStats } from '@/lib/types';
import { 
  UserPlus, 
  Home, 
  CalendarCheck, 
  TrendingUp, 
  Users, 
  IndianRupee, 
  Activity 
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [statsData, setStatsData] = useState<DashboardStats | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await adminApi.getDashboardStats();
        setStatsData(response.stats);
      } catch (error) {
        console.error('Failed to fetch admin stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const kpis = [
    { label: 'TOTAL USERS', value: statsData?.totalUsers?.toLocaleString() || '0', trend: 'Up 12.5%', icon: Users },
    { label: 'GROSS REVENUE', value: `₹${statsData?.totalRevenue?.toLocaleString() || '0'}`, trend: 'Up 18.3%', icon: IndianRupee },
    { label: 'NEW BOOKINGS', value: statsData?.totalBookings?.toLocaleString() || '0', trend: 'Up 5.2%', icon: CalendarCheck },
    { label: 'ACTIVE LISTINGS', value: statsData?.totalRooms?.toLocaleString() || '0', trend: 'Up 8.1%', icon: Home }
  ];

  const monthlyData = [
    { month: 'JAN', revenue: 28000, target: 35000 },
    { month: 'FEB', revenue: 32000, target: 40000 },
    { month: 'MAR', revenue: 29500, target: 38000 },
    { month: 'APR', revenue: 42000, target: 45000 },
    { month: 'MAY', revenue: 38000, target: 42000 },
    { month: 'JUN', revenue: 35000, target: 40000 },
    { month: 'JUL', revenue: 39000, target: 43000 },
    { month: 'AUG', revenue: 36000, target: 41000 },
  ];

  const recentActivity = [
    { user: 'New User Registered', desc: 'ID: Priyanka Chatterjee', time: 'Just now', icon: UserPlus, color: 'primary' },
    { user: 'New Room Posted', desc: 'Heritage Suite, Kolkata', time: '2 min ago', icon: Home, color: 'tertiary' },
    { user: 'Booking Confirmed', desc: 'Room ID #2847 - ₹12,400', time: '8 min ago', icon: CalendarCheck, color: 'primary' }
  ];

  const topRooms = [
    { name: 'The Nordic Loft', price: '₹5,400/night', occupancy: '92%', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop' },
    { name: 'Azure Shore Villa', price: '₹8,200/night', occupancy: '88%', image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop' },
    { name: 'The Serenity Suite', price: '₹7,300/night', occupancy: '95%', image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&h=300&fit=crop' },
  ];

  const maxRevenue = Math.max(...monthlyData.map(d => Math.max(d.revenue, d.target)));

  return (
    <div className="px-6 md:px-12 py-6 pb-20">
      {/* Header Section */}
      <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-headline font-bold text-on-surface mb-1">System Overview</h2>
          <p className="text-on-surface-variant font-body text-sm leading-relaxed">
            Monitor live platform trends, user activity and booking performance.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <select className="bg-white border border-outline-variant/20 rounded-lg px-4 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer">
            <option>Last 30 days</option>
            <option>Last 7 days</option>
            <option>Last 3 months</option>
            <option>Last year</option>
          </select>
          <button className="bg-primary text-on-primary px-5 py-2 rounded-xl font-bold text-sm hover:opacity-90 transition-all shadow-sm active:scale-95 whitespace-nowrap">
            Export Data
          </button>
        </div>
      </header>

      {/* KPI Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-2xl border border-outline-variant/10 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                <Icon className="w-12 h-12" />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-4">
                {kpi.label}
              </p>
              <h3 className="text-3xl font-headline font-bold text-on-surface mb-2 tracking-tight">
                {kpi.value}
              </h3>
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                <TrendingUp className="w-3 h-3" />
                <span>{kpi.trend}</span>
              </div>
            </div>
          );
        })}
      </section>

      {/* Growth Analytics & Live Stream */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-8">
        {/* Growth Analytics Chart */}
        <div className="lg:col-span-8 bg-white p-8 rounded-3xl border border-outline-variant/10 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h3 className="font-headline text-lg font-bold text-on-surface mb-1">
                Growth Analytics
              </h3>
              <p className="text-xs text-on-surface-variant">
                Monthly user engagement trends
              </p>
            </div>
            <div className="flex gap-2 mt-4 md:mt-0 bg-surface-container-lowest p-1 rounded-xl border border-outline-variant/10">
              <button className="px-4 py-1.5 bg-white text-xs font-bold rounded-lg text-on-surface shadow-sm transition-all">
                6M
              </button>
              <button className="px-4 py-1.5 text-on-surface-variant text-xs font-bold rounded-lg hover:bg-white/50 transition-all">
                1Y
              </button>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="h-64 flex items-end justify-between gap-3 px-2">
            {monthlyData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-3 group">
                <div className="w-full flex flex-col items-center justify-end h-48 relative">
                  {/* Tooltip on hover */}
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-on-surface text-surface text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                    ₹{data.revenue.toLocaleString()}
                  </div>
                  
                  <div className="relative w-full group/bar">
                    {/* Target bar (light) */}
                    <div
                      className="w-full bg-primary/10 rounded-t-xl transition-all h-48"
                      style={{ height: `${Math.min((data.target / maxRevenue) * 192, 192)}px` }}
                    >
                      {/* Revenue bar (dark) */}
                      <div
                        className="absolute bottom-0 w-full bg-primary rounded-t-xl transition-all group-hover:brightness-110"
                        style={{ height: `${(data.revenue / data.target) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">
                  {data.month}
                </span>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-8 mt-8 pt-6 border-t border-outline-variant/10">
            <div className="flex items-center gap-2">
              <div className="w-3 h-1.5 bg-primary rounded-full"></div>
              <span className="text-xs font-bold text-on-surface-variant">Revenue Achieved</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-1.5 bg-primary/20 rounded-full"></div>
              <span className="text-xs font-bold text-on-surface-variant">Target Revenue</span>
            </div>
          </div>
        </div>

        {/* Live Stream */}
        <div className="lg:col-span-4 bg-white p-8 rounded-3xl border border-outline-variant/10 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="font-headline text-lg font-bold text-on-surface mb-1">
                Live Stream
              </h3>
              <p className="text-xs text-on-surface-variant">Platform activity feed</p>
            </div>
            <div className="flex items-center gap-2 px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-[9px] font-black uppercase tracking-widest">Live</span>
            </div>
          </div>

          <div className="space-y-6">
            {recentActivity.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <div key={index} className="flex items-start gap-4 pb-6 border-b border-outline-variant/10 last:border-0 last:pb-0">
                  <div className={`w-10 h-10 rounded-2xl ${activity.color === 'primary' ? 'bg-primary/10 text-primary' : 'bg-tertiary/10 text-tertiary'} flex items-center justify-center shrink-0`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-on-surface leading-snug">
                      {activity.user}
                    </p>
                    <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">{activity.desc}</p>
                    <div className="flex items-center gap-1.5 mt-2 opacity-60">
                      <Activity className="w-3 h-3 text-on-surface-variant" />
                      <span className="text-[10px] font-bold text-on-surface-variant uppercase">{activity.time}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <button className="w-full text-center mt-6 pt-6 border-t border-outline-variant/10 text-[10px] font-black text-primary uppercase tracking-widest hover:tracking-[0.15em] transition-all">
            View Full Activity Log
          </button>
        </div>
      </section>

      {/* Top Performing Rooms */}
      <section className="bg-white rounded-3xl border border-outline-variant/10 shadow-sm p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="font-headline text-lg font-bold text-on-surface mb-1">
              Top Performing Rooms
            </h3>
            <p className="text-xs text-on-surface-variant">
              Highest occupancy and revenue generators
            </p>
          </div>
          <button className="text-[10px] font-black text-primary uppercase tracking-widest hover:tracking-[0.1em] transition-all">
            Manage Inventory
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topRooms.map((room, index) => (
            <div key={index} className="group bg-surface-container-lowest rounded-2xl overflow-hidden border border-outline-variant/10 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="aspect-video overflow-hidden bg-surface-container relative">
                <img
                  alt={room.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  src={room.image}
                />
                <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-black text-primary border border-primary/10">
                  TOP RATED
                </div>
              </div>
              <div className="p-5">
                <h4 className="font-headline font-bold text-on-surface text-base mb-3 group-hover:text-primary transition-colors">
                  {room.name}
                </h4>
                <div className="flex items-center justify-between">
                  <span className="text-base font-black text-on-surface">{room.price}</span>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-tertiary/10 text-tertiary rounded-lg border border-tertiary/10">
                    <TrendingUp className="w-3 h-3" />
                    <span className="text-[10px] font-black">{room.occupancy}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
