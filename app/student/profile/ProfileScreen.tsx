"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { authApi } from "@/lib/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  User,
  Bell,
  History,
  Heart,
  Star,
  Lock,
  HelpCircle,
  LogOut,
  ChevronRight,
  ShieldCheck,
  Camera,
  Settings,
  CreditCard,
  Mail,
  Fingerprint,
  GraduationCap,
  Loader2,
  AlertCircle,
  PlusCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SProfile() {
  const { user, loading: authLoading, logout } = useAuth();
  const router = useRouter();
  const [studentEmail, setStudentEmail] = useState("");
  const [loading, setLoading] = useState(false);



  const stats = [
    { label: "STAYS", value: "3", icon: History },
    { label: "REVIEWS", value: "2", icon: Star },
    { label: "SAVED", value: "8", icon: Heart },
  ];

  const handleLinkInstitutionalEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await authApi.linkStudentEmail(studentEmail);
      toast.success('Sequence Dispatched', { description: 'Institutional link initialized' });
      router.push(`/verify-student-email?email=${encodeURIComponent(studentEmail)}`);
    } catch (err: any) {
      toast.error('Linkage Failed', { description: err.message || "Failed to link institutional email" });
    } finally {
      setLoading(false);
    }
  };

  const menuItems = [
    { icon: User, label: "Identity Matrix" },
    { icon: Bell, label: "Signal Feed" },
    { icon: CreditCard, label: "Fiscal Ledger" },
    { icon: ShieldCheck, label: "Trust Registry" },
    { icon: Lock, label: "Protocol Security" },
    { icon: HelpCircle, label: "Support Node" },
    { icon: Settings, label: "System Config" },
  ];

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 text-primary animate-spin" />
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-on-surface-variant opacity-40">Syncing Identity...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="px-6 py-12 md:px-12 md:py-20 max-w-7xl mx-auto min-h-screen bg-white">
        <h1 className="text-3xl font-bold text-[#222222] mb-12">Profile</h1>

        <div className="max-w-md">
          <h2 className="text-2xl font-semibold text-[#222222] mb-3">Log in to view your profile</h2>
          <p className="text-[#717171] leading-relaxed mb-8">
            You can view your profile once you've logged in.
          </p>

          <Button
            onClick={() => router.push('/login?redirect=/student/profile')}
            className="bg-[#FF385C] hover:bg-[#E31C5F] text-white px-8 h-12 rounded-lg font-semibold text-base transition-all active:scale-95"
          >
            Log in
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-16 md:pb-32">
      {/* Editorial Header - Adjusted for Mobile Comfort */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-4 md:pt-20 pb-4 flex justify-between items-end border-b border-outline-variant/10 md:mb-12 mb-6">
        <div className="space-y-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant opacity-50 block md:hidden mb-1">Account settings</p>
          <h1 className="text-3xl md:text-6xl font-bold text-on-surface tracking-tight leading-none">
            Profile
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16">

          {/* Left Column: Identity Sidebar */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32 space-y-8">
              {/* Identity Card - Centered aesthetic as requested */}
              <div className="bg-white rounded border border-outline-variant/10 p-10 shadow-[0_15px_50px_-5px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col items-center text-center group transition-all hover:shadow-[0_25px_60px_-10px_rgba(0,0,0,0.1)]">
                <div className="relative mb-6">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden shadow-xl transition-transform duration-500 group-hover:scale-105">
                    {user.profilePicUrl ? (
                      <img
                        src={user.profilePicUrl}
                        className="w-full h-full object-cover"
                        alt="Profile"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#222] flex items-center justify-center text-white text-3xl md:text-4xl font-medium tracking-tight">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <button className="absolute bottom-0 right-0 w-8 h-8 md:w-10 md:h-10 bg-on-surface text-white rounded-full flex items-center justify-center shadow-xl border-4 border-white cursor-pointer active:scale-90 transition-all hover:bg-primary">
                    <Camera className="w-3.5 md:w-4 h-3.5 md:h-4" />
                  </button>
                </div>

                <div className="flex flex-col items-center gap-3">
                  <h2 className="text-2xl md:text-3xl font-bold text-on-surface tracking-tight">{user.name}</h2>

                  {user.isStudentVerified ? (
                    <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-full text-[10px] font-bold uppercase tracking-wider">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Verified Student
                    </div>
                  ) : (
                    <div className="inline-flex items-center px-4 py-1.5 bg-surface-container-low text-on-surface-variant border border-outline-variant/10 rounded-full text-[10px] font-bold uppercase tracking-wider">
                      Guest Status
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Action: Become Owner */}
              <div
                onClick={() => router.push('/host/homes')}
                className="hidden md:flex bg-on-surface rounded p-8 text-white relative overflow-hidden group cursor-pointer hover:shadow-2xl hover:shadow-black/20 transition-all hover:-translate-y-1"
              >
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-[60px] group-hover:scale-125 transition-transform duration-1000"></div>
                <div className="relative z-10 flex flex-col gap-6">
                  <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded flex items-center justify-center">
                    <PlusCircle className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold uppercase tracking-tight mb-2">Become a Owner</h3>
                    <p className="text-xs text-white/60 font-medium leading-relaxed">Monetize your space and join our premium hosting network.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Main Content Hub */}
          <div className="lg:col-span-8 flex flex-col gap-10 md:gap-12">

            {/* Sector: Experience */}
            <section className="mt-2 md:mt-0">
              <h3 className="text-[12px] md:text-sm font-bold uppercase tracking-widest text-on-surface mb-6 ml-1">Journey Statistics</h3>
              <div className="grid grid-cols-3 gap-2 md:gap-6">
                {stats.map((stat) => (
                  <div key={stat.label} className="bg-white rounded border border-outline-variant/10 p-5 md:p-8 flex flex-col md:gap-6 gap-3 hover:shadow-xl hover:shadow-black/[0.02] transition-all group">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded bg-surface-container-low flex items-center justify-center transition-colors">
                      <stat.icon className="w-5 h-5 md:w-6 md:h-6 text-on-surface opacity-70" />
                    </div>
                    <div>
                      <p className="text-2xl md:text-4xl font-bold text-on-surface leading-none mb-1">{stat.value}</p>
                      <p className="text-[10px] font-bold text-on-surface-variant opacity-40 uppercase tracking-widest">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Become an Owner Card for Mobile */}
            <section className="md:hidden">
              <div
                onClick={() => router.push('/host/homes')}
                className="bg-white border border-outline-variant/10 rounded p-6 flex items-center justify-between group active:scale-[0.98] transition-all"
              >
                <div className="flex flex-col gap-1">
                  <h4 className="text-lg font-bold text-on-surface leading-tight">Become a Owner</h4>
                  <p className="text-xs text-on-surface-variant opacity-60 font-medium">Earn extra node credits from your space.</p>
                </div>
                <div className="w-12 h-12 bg-on-surface rounded flex items-center justify-center text-white shrink-0 shadow-lg">
                  <PlusCircle className="w-6 h-6" />
                </div>
              </div>
            </section>

            {/* Sector: Identity Sync */}
            {!user.isStudentVerified && (
              <section className="pb-2">
                <h3 className="text-[12px] font-bold uppercase tracking-widest text-on-surface mb-6 ml-1">Identity Verification</h3>
                <div className="bg-white rounded md:p-10 p-6 border border-outline-variant/10 shadow-[0_15px_40px_rgba(0,0,0,0.02)] flex flex-col md:flex-row gap-8 md:gap-12 items-center">
                  <div className="flex-1 space-y-4 md:space-y-6">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-amber-50 rounded md:rounded-3xl flex items-center justify-center">
                      <GraduationCap className="w-6 md:w-8 h-6 md:h-8 text-amber-500" />
                    </div>
                    <div>
                      <h4 className="text-xl md:text-2xl font-bold text-on-surface tracking-tight mb-2 uppercase">Claim Scholar Status</h4>
                      <p className="text-xs md:text-sm text-on-surface-variant font-medium leading-relaxed opacity-60">
                        Link your institutional email to unlock exclusive rates.
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleLinkInstitutionalEmail} className="w-full md:w-[320px] space-y-4">
                    <div className="relative">
                      <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/30" />
                      <input
                        className="w-full h-14 md:h-16 bg-[#F9F9F9] border border-outline-variant/10 rounded pl-14 pr-6 text-sm font-bold text-on-surface focus:border-primary outline-none transition-all placeholder:text-on-surface-variant/20"
                        placeholder="your@university.ac.in"
                        type="email"
                        value={studentEmail}
                        onChange={(e) => setStudentEmail(e.target.value)}
                        required
                        disabled={loading}
                      />
                    </div>
                    <Button
                      className="w-full h-14 md:h-16 bg-on-surface hover:bg-black text-white rounded text-[10px] font-bold uppercase tracking-widest"
                      disabled={loading || !studentEmail}
                      type="submit"
                    >
                      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Verify Identity"}
                    </Button>
                  </form>
                </div>
              </section>
            )}

            {/* Sector: Registry */}
            <section className="">
              <h3 className="text-[12px] font-bold uppercase tracking-widest text-on-surface mb-6 ml-1">Settings</h3>
              <div className="flex flex-col">
                {/* {menuItems.map((item, i) => (
                  <div
                    key={item.label}
                    className="flex justify-between items-center py-5 border-b border-outline-variant/10 cursor-pointer group active:opacity-60 transition-all"
                    onClick={() => router.push('#')}
                  >
                    <div className="flex items-center gap-5">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-surface-container-low md:rounded-2xl rounded-xl flex items-center justify-center transition-all">
                        <item.icon className="w-5 h-5 text-on-surface opacity-80" strokeWidth={1.5} />
                      </div>
                      <div>
                        <span className="text-[15px] md:text-[16px] font-bold text-on-surface block tracking-tight">{item.label}</span>
                        <span className="text-[10px] font-medium text-on-surface-variant opacity-40 uppercase tracking-widest hidden md:block">Registry Configuration</span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-on-surface-variant/30 group-hover:translate-x-1 transition-all" />
                  </div>
                ))} */}

                <div
                  onClick={logout}
                  className="flex justify-between items-center py-5 cursor-pointer group active:opacity-60 transition-all mt-4"
                >
                  <div className="flex items-center gap-5">
                    <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center border border-red-100/50">
                      <LogOut className="w-5 h-5 text-red-600" />
                    </div>
                    <span className="text-[15px] font-bold text-red-600 uppercase tracking-tight">Logout</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-red-100" />
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="border-t border-outline-variant/5 py-10">
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4 opacity-20 filter grayscale">
            <Fingerprint className="w-10 h-10" />
            <p className="text-[10px] font-bold uppercase tracking-widest">Protocol Secured Network</p>
          </div>
          <p className="text-[10px] font-bold uppercase tracking-widest opacity-20">© 2026 Brainware Rooms</p>
        </div>
      </div>
    </div>
  );
}