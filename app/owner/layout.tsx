'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Building2, 
  Calendar, 
  IndianRupee, 
  BarChart3, 
  LogOut, 
  Bell, 
  User,
  Menu,
  X,
  Plus
} from 'lucide-react';

interface OwnerLayoutProps {
  children: React.ReactNode;
}

export default function OwnerLayout({ children }: OwnerLayoutProps) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/owner') return pathname === '/owner';
    return pathname?.startsWith(path);
  };

  const menuItems = [
    { href: '/owner', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/owner/listings', label: 'My Listings', icon: Building2 },
    { href: '/owner/bookings', label: 'Bookings', icon: Calendar },
    { href: '/owner/payouts', label: 'Payouts', icon: IndianRupee },
    { href: '/owner/analytics', label: 'Analytics', icon: BarChart3 },
  ];

  return (
    <div className="bg-[#FAFAFA] font-body text-on-surface min-h-screen">
      {/* Desktop Sidebar */}
      <aside className="fixed left-0 top-0 hidden md:flex h-full w-72 bg-white flex-col p-6 z-50 shadow-[20px_0_40px_rgba(0,0,0,0.02)] border-r border-outline-variant/5">
        <div className="mb-12 px-2 flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
             <div className="w-4 h-4 bg-white rounded-sm"></div>
          </div>
          <span className="text-on-surface font-black uppercase tracking-[0.2em] text-xs font-headline">Brainware Rooms</span>
        </div>
        
        <div className="flex-1 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-300 group ${
                  active
                    ? 'bg-primary text-on-primary shadow-lg shadow-primary/20 scale-[1.02]'
                    : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
                }`}
              >
                <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${active ? 'text-on-primary' : 'text-primary'}`} />
                <span className="font-headline font-bold text-sm tracking-tight">{item.label}</span>
              </Link>
            );
          })}
        </div>

        <div className="mt-auto space-y-6">
          <div className="bg-surface-container-lowest p-5 rounded-[2rem] border border-outline-variant/10 relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
             <div className="flex items-center gap-4 relative z-10">
                <div className="w-11 h-11 rounded-2xl overflow-hidden bg-primary/10 border-2 border-white shadow-sm shrink-0">
                  <img
                    alt="Owner"
                    className="w-full h-full object-cover transition-transform group-hover:scale-110"
                    src="https://ui-avatars.com/api/?name=Editorial+Guest&background=b6212f&color=fff&size=128"
                  />
                </div>
                <div className="min-w-0">
                  <p className="font-headline font-black text-xs text-on-surface truncate">Editorial Guest</p>
                  <p className="text-[10px] text-tertiary font-black uppercase tracking-widest mt-0.5">Verified Partner</p>
                </div>
             </div>
          </div>

          <Link
            href="/logout"
            className="flex items-center gap-4 px-6 py-4 text-on-surface-variant hover:text-red-600 transition-all duration-300 group rounded-2xl bg-surface-container-lowest border border-outline-variant/5"
          >
            <LogOut className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            <span className="font-headline font-bold text-sm">Logout Session</span>
          </Link>
        </div>
      </aside>

      {/* Common Header */}
      <header className="fixed top-0 right-0 left-0 md:left-72 z-40 bg-white/80 backdrop-blur-xl border-b border-outline-variant/5">
        <div className="px-6 md:px-12 h-24 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="font-headline text-xl md:text-2xl font-black tracking-tighter text-on-surface uppercase">
              {pathname === '/owner' && 'Overview'}
              {pathname === '/owner/listings' && 'My Inventory'}
              {pathname?.startsWith('/owner/listings/create') && 'Asset Creation'}
              {pathname === '/owner/bookings' && 'Tenant Ledger'}
              {pathname === '/owner/payouts' && 'Yield Settlements'}
              {pathname === '/owner/analytics' && 'Market Intelligence'}
              {pathname === '/owner/profile' && 'Partner Identity'}
            </h1>
          </div>
          <div className="flex items-center gap-5">
            <button className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white border border-outline-variant/10 hover:shadow-lg hover:-translate-y-0.5 transition-all text-on-surface group">
              <Bell className="w-5 h-5 text-on-surface-variant group-hover:text-primary transition-colors" />
            </button>
            <div className="hidden lg:flex items-center gap-3 pl-5 border-l border-outline-variant/10">
               <div className="text-right">
                  <p className="text-[9px] font-black text-on-surface-variant uppercase tracking-widest opacity-60">Revenue Tier</p>
                  <p className="text-xs font-black text-primary uppercase">Diamond Partner</p>
               </div>
               <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.55)]"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="md:ml-72 min-h-screen pb-24 md:pb-12 pt-24">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-6 left-6 right-6 bg-white/90 backdrop-blur-xl flex justify-around items-center h-20 px-4 z-50 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-outline-variant/5">
        {menuItems.slice(0, 3).map((item) => {
           const Icon = item.icon;
           const active = isActive(item.href);
           return (
             <Link key={item.href} href={item.href} className={`flex flex-col items-center justify-center transition-all ${active ? 'scale-110' : 'opacity-40'}`}>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${active ? 'bg-primary text-on-primary shadow-lg shadow-primary/20' : ''}`}>
                   <Icon className="w-6 h-6" />
                </div>
             </Link>
           );
        })}
        <Link href="/owner/profile" className={`flex flex-col items-center justify-center transition-all ${isActive('/owner/profile') ? 'scale-110' : 'opacity-40'}`}>
           <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${isActive('/owner/profile') ? 'bg-primary text-on-primary shadow-lg shadow-primary/20' : ''}`}>
              <User className="w-6 h-6" />
           </div>
        </Link>
        <Link href="/owner/listings/create" className="flex flex-col items-center justify-center">
           <div className="w-14 h-14 bg-on-surface text-surface rounded-[2rem] flex items-center justify-center shadow-xl shadow-on-surface/20 active:scale-95 transition-all -mt-12">
              <Plus className="w-7 h-7" />
           </div>
        </Link>
      </nav>
    </div>
  );
}
