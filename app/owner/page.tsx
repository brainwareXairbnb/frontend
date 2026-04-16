'use client'

import { useState } from 'react';
import CreateListingDrawer from '@/components/CreateListingDrawer';
import { 
  Landmark, 
  TrendingUp, 
  Building2, 
  BookOpen, 
  Star, 
  Plus, 
  ArrowUp, 
  Clock, 
  ChevronRight,
  ShieldCheck,
  Zap,
  CheckCircle2
} from 'lucide-react';

export default function OwnerDashboardPage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
    <div className='px-6 md:px-12 pb-20 space-y-10'>
      {/* Platform Velocity Hero (Upgraded Alert) */}
      <div className='bg-primary/5 mt-12 rounded-[2.5rem] p-8 md:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8 border border-primary/10 relative overflow-hidden group'>
         <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
         <div className='flex items-start gap-6 relative z-10'>
          <div className='w-16 h-16 bg-primary rounded-3xl flex items-center justify-center text-on-primary shadow-xl shadow-primary/30 group-hover:rotate-12 transition-transform duration-500'>
            <Landmark className="w-8 h-8" />
          </div>
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest mb-3">
               <ShieldCheck className="w-3.5 h-3.5" />
               Security Verification
            </div>
            <h3 className='font-headline font-black text-2xl text-on-surface tracking-tight mb-2'>
              Settlement Account Active
            </h3>
            <p className='text-sm text-on-surface-variant font-medium max-w-lg leading-relaxed'>
              Your bank account verification is 80% complete. Final validation typically takes 24-48 hours. You can still accept bookings during this period.
            </p>
          </div>
        </div>
        <button className='px-8 h-14 bg-on-surface text-surface rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-primary hover:text-white transition-all active:scale-95 shadow-xl shadow-on-surface/10 relative z-10'>
          Finalize Node
        </button>
      </div>

      {/* Stats Intelligent Cards */}
      <section className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8'>
        <div className='bg-white p-8 rounded-[2rem] border border-outline-variant/10 shadow-sm relative overflow-hidden group hover:shadow-2xl transition-all duration-500'>
          <div className='flex justify-between items-start mb-6'>
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500">
               <TrendingUp className="w-6 h-6" />
            </div>
            <p className='text-[10px] font-black text-on-surface-variant uppercase tracking-widest opacity-60'>
              Yield Lifecycle
            </p>
          </div>
          <div className='flex flex-col'>
            <h2 className='text-4xl font-headline font-black text-on-surface tracking-tighter'>
              ₹1,84,200
            </h2>
            <div className='flex items-center gap-2 mt-4'>
               <div className="px-2 py-1 bg-emerald-50 text-emerald-600 rounded-lg flex items-center gap-1 text-[10px] font-black uppercase tracking-tighter">
                  <ArrowUp className="w-3 h-3" />
                  12.5%
               </div>
               <p className='text-on-surface-variant/40 text-[10px] font-bold uppercase tracking-widest'>vs previous period</p>
            </div>
          </div>
        </div>

        <div className='bg-white p-8 rounded-[2rem] border border-outline-variant/10 shadow-sm relative overflow-hidden group hover:shadow-2xl transition-all duration-500'>
          <div className='flex justify-between items-start mb-6'>
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
               <Building2 className="w-6 h-6" />
            </div>
            <p className='text-[10px] font-black text-on-surface-variant uppercase tracking-widest opacity-60'>
              Asset Inventory
            </p>
          </div>
          <div className='flex flex-col'>
            <h2 className='text-4xl font-headline font-black text-on-surface tracking-tighter'>
              08
            </h2>
            <p className='text-on-surface-variant/40 text-[10px] font-bold uppercase tracking-widest mt-4'>
              <span className="text-blue-600 font-black">2 Assets</span> currently deployed
            </p>
          </div>
        </div>

        <div className='bg-white p-8 rounded-[2rem] border border-outline-variant/10 shadow-sm relative overflow-hidden group hover:shadow-2xl transition-all duration-500'>
          <div className='flex justify-between items-start mb-6'>
            <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center group-hover:bg-orange-600 group-hover:text-white transition-all duration-500">
               <BookOpen className="w-6 h-6" />
            </div>
            <p className='text-[10px] font-black text-on-surface-variant uppercase tracking-widest opacity-60'>
              Action Required
            </p>
          </div>
          <div className='flex flex-col'>
            <h2 className='text-4xl font-headline font-black text-on-surface tracking-tighter'>
              14
            </h2>
            <div className='flex items-center gap-2 mt-4'>
               <div className="px-2 py-1 bg-orange-50 text-orange-600 rounded-lg flex items-center gap-1 text-[10px] font-black uppercase tracking-tighter">
                  <Zap className="w-3 h-3" />
                  CRITICAL
               </div>
               <p className='text-on-surface-variant/40 text-[10px] font-bold uppercase tracking-widest'>Response needed &lt;24h</p>
            </div>
          </div>
        </div>
      </section>

      {/* Revenue Chart & Recent Requests */}
      <section className='grid grid-cols-1 lg:grid-cols-12 gap-8'>
        {/* Revenue Growth Chart */}
        <div className='lg:col-span-8 bg-white p-10 rounded-[2.5rem] border border-outline-variant/10 shadow-sm'>
          <div className='flex flex-col md:flex-row md:items-center justify-between mb-12'>
            <div>
              <h3 className='font-headline font-black text-2xl tracking-tighter'>
                Revenue Scaling
              </h3>
              <p className='text-sm text-on-surface-variant font-medium'>
                Historical performance of your property cluster
              </p>
            </div>
            <div className='flex gap-2 mt-6 md:mt-0 p-1 bg-surface-container-lowest border border-outline-variant/10 rounded-2xl'>
              <span className='px-5 py-2 text-[10px] font-black uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors cursor-pointer'>
                6M
              </span>
              <span className='px-5 py-2 bg-primary text-on-primary text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg shadow-primary/20 cursor-pointer'>
                1Y
              </span>
            </div>
          </div>
          <div className='h-72 flex items-end justify-between gap-4 px-2'>
            {[40, 60, 45, 85, 70, 55, 90].map((height, index) => (
              <div
                key={index}
                className={`w-full rounded-t-[1rem] relative group transition-all duration-500 overflow-hidden ${
                  height === 85
                    ? 'bg-primary'
                    : 'bg-primary/10 hover:bg-primary/20'
                }`}
                style={{ height: `${height}%` }}
              >
                {height === 85 && (
                  <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent'></div>
                )}
                <div className='absolute -top-12 left-1/2 -translate-x-1/2 bg-on-surface text-surface text-[10px] font-black py-2 px-3 rounded-xl opacity-0 group-hover:opacity-100 transition-all transform scale-90 group-hover:scale-100 shadow-xl whitespace-nowrap z-20 pointer-events-none'>
                  ₹42,000.00
                </div>
              </div>
            ))}
          </div>
          <div className='flex justify-between mt-8 text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] px-2 opacity-40'>
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
            <span>Jul</span>
          </div>
        </div>

        {/* Recent Requests */}
        <div className='lg:col-span-4'>
          <div className='bg-white p-8 rounded-[2.5rem] border border-outline-variant/10 shadow-sm h-full flex flex-col'>
            <div className="flex items-center justify-between mb-10">
               <h3 className='font-headline font-black text-xl tracking-tight'>
                  Booking Inbox
               </h3>
               <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-xs font-black text-primary">14</span>
               </div>
            </div>
            <div className='space-y-8 flex-1'>
              {[
                { name: 'Aditi Sharma', avatar: 'https://ui-avatars.com/api/?name=Aditi+Sharma&background=b6212f&color=fff&size=128', property: 'Heritage Suite', duration: '3 Nights', status: 'NEW' },
                { name: 'Rohan Verma', avatar: 'https://ui-avatars.com/api/?name=Rohan+Verma&background=b6212f&color=fff&size=128', property: 'Minimalist Loft', duration: '5 Nights', status: '2H AGO' }
              ].map((request, i) => (
                <div key={i} className='flex items-start gap-5 pb-8 border-b border-outline-variant/5 last:border-0 last:pb-0 group'>
                  <div className='w-14 h-14 rounded-2xl overflow-hidden shadow-md shrink-0 border-2 border-white group-hover:scale-110 transition-transform'>
                    <img
                      alt={request.name}
                      className='w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500'
                      src={request.avatar}
                    />
                  </div>
                  <div className='flex-1 min-w-0'>
                    <div className='flex justify-between items-center mb-1'>
                      <p className='font-bold text-sm text-on-surface truncate'>{request.name}</p>
                      <span className={`text-[8px] font-black px-1.5 py-0.5 rounded ${request.status === 'NEW' ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface-variant'}`}>
                        {request.status}
                      </span>
                    </div>
                    <p className='text-[11px] font-medium text-on-surface-variant mb-4 flex items-center gap-1 opacity-70'>
                      <Building2 className="w-3 h-3" />
                      {request.property} • {request.duration}
                    </p>
                    <div className='flex gap-2'>
                      <button className='flex-1 h-9 bg-emerald-600 hover:bg-emerald-700 text-white text-[9px] font-black rounded-xl uppercase tracking-widest transition-all active:scale-95 shadow-sm'>
                        Accept
                      </button>
                      <button className='flex-1 h-9 bg-surface-container hover:bg-surface-container-high text-on-surface-variant text-[9px] font-black rounded-xl uppercase tracking-widest transition-all active:scale-95'>
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className='w-full text-center mt-10 pt-8 border-t border-outline-variant/10 text-[10px] font-black text-primary uppercase tracking-[0.2em] hover:tracking-[0.25em] transition-all'>
              Process All Requests
            </button>
          </div>
        </div>
      </section>

      {/* Top Performing Properties */}
      <section className='space-y-10'>
        <div className="flex items-center justify-between">
           <div>
              <h3 className='font-headline font-black text-2xl tracking-tighter'>
                Asset Portfolio
              </h3>
              <p className="text-sm text-on-surface-variant font-medium mt-1">Managed property assets and their yield health</p>
           </div>
           <button className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline">Download Performance PDF</button>
        </div>
        
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {/* Property Cards */}
          {[
            { name: 'The Heritage Suite', occupancy: '98%', revenue: '₹82,400', rating: '4.9', image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop' },
            { name: 'The Minimalist Loft', occupancy: '85%', revenue: '₹42,150', rating: '4.7', image: 'https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=800&h=600&fit=crop' }
          ].map((property, i) => (
            <div key={i} className='group bg-white rounded-[2.5rem] overflow-hidden border border-outline-variant/10 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 shadow-sm'>
              <div className='aspect-[1.4] overflow-hidden bg-surface-container relative'>
                <img
                  alt={property.name}
                  className='w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110'
                  src={property.image}
                />
                <div className='absolute top-6 left-6 px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black text-emerald-600 border border-emerald-100 shadow-lg'>
                  {property.occupancy} OCCUPANCY
                </div>
              </div>
              <div className='p-8'>
                <div className='flex justify-between items-start mb-6'>
                  <h4 className='font-headline font-black text-xl tracking-tight group-hover:text-primary transition-colors'>
                    {property.name}
                  </h4>
                  <div className="p-2.5 bg-surface-container-lowest rounded-2xl group-hover:bg-primary group-hover:text-white transition-all">
                     <ChevronRight className="w-5 h-5" />
                  </div>
                </div>
                <div className='flex items-center gap-6 pt-6 border-t border-outline-variant/5'>
                  <div className='flex-1'>
                    <p className='text-[10px] text-on-surface-variant font-black uppercase tracking-widest opacity-40 mb-2'>
                      Estimated Yield
                    </p>
                    <p className='font-headline font-black text-2xl text-primary tracking-tighter'>
                      {property.revenue}
                    </p>
                  </div>
                  <div className='w-px h-10 bg-outline-variant/10'></div>
                  <div className='flex-1 text-right'>
                    <p className='text-[10px] text-on-surface-variant font-black uppercase tracking-widest opacity-40 mb-2'>
                      Sentiment
                    </p>
                    <div className='flex items-center justify-end gap-1.5'>
                      <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                      <span className='font-black text-lg tracking-tighter'>{property.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* New Advanced Add Card */}
          <div
            onClick={() => setIsDrawerOpen(true)}
            className='flex items-center justify-center border-2 border-dashed border-outline-variant/20 rounded-[2.5rem] group hover:border-primary/50 hover:bg-primary/[0.02] transition-all duration-500 cursor-pointer min-h-[400px]'
          >
            <div className='text-center p-10'>
              <div className='w-20 h-20 bg-primary/5 rounded-[2rem] flex items-center justify-center mx-auto mb-8 group-hover:bg-primary group-hover:rotate-90 transition-all duration-700 shadow-sm'>
                <Plus className='w-10 h-10 text-primary group-hover:text-white transition-all' />
              </div>
              <h4 className='font-headline font-black text-xl tracking-tight mb-2'>Expand Inventory</h4>
              <p className='text-sm text-on-surface-variant font-medium max-w-[200px] leading-relaxed'>
                Deploy another property asset to the ecosystem.
              </p>
              <div className='mt-8 inline-flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-[0.2em] group-hover:gap-4 transition-all'>
                Initialize Node
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <CreateListingDrawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen} />
    </>
  )
}
