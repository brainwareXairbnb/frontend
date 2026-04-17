"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import {
  User,
  Settings,
  Shield,
  HelpCircle,
  LogOut,
  FileText,
  ChevronRight,
  PlusCircle,
  Building2,
  FileSearch
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function StudentProfilePage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  const sections = [
    {
      title: "Account settings",
      items: [
        { l: "Personal information", i: User },
        { l: "Payments and payouts", i: Shield },
      ]
    },
    {
      title: "Hosting",
      items: [
        { l: "Become a Owner", i: PlusCircle, path: "/host/homes" },
      ]
    },
    {
      title: "Support",
      items: [
        { l: "How Brainware Rooms works", i: HelpCircle },
        { l: "Get help", i: FileSearch },
        { l: "Terms of Service", i: FileText },
      ]
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#FF385C]/20 border-t-[#FF385C] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <header className="p-8 md:px-10">
        {!user && <h1 className="text-[32px] font-bold text-on-surface mb-2 md:pt-4">Profile</h1>}

        {!user ? (
          <div className="mb-10">
            <p className="text-base text-on-surface-variant mb-6">Log in and start planning your next trip.</p>
            <Button
              onClick={() => router.push('/login')}
              className="w-full md:w-max md:px-12 h-14 bg-[#222222] hover:bg-black text-white rounded-lg font-bold text-[15px] shadow-lg"
            >
              Log in or sign up
            </Button>
            <div className="w-full h-px bg-outline-variant/10 mt-10" />
          </div>
        ) : (
          <div className="flex items-center gap-5 group cursor-pointer border-b border-outline-variant/10 pb-8 max-w-2xl">
            <div className="w-16 h-16 rounded-full bg-[#717171] flex items-center justify-center text-white text-2xl font-bold">
              {user.name?.[0] || 'R'}
            </div>
            <div className="flex-1">
              <h2 className="text-[18px] font-bold">{user.name || 'Ritwick'}</h2>
              <p className="text-sm text-on-surface-variant group-hover:underline">Show profile</p>
            </div>
            <ChevronRight className="w-5 h-5 opacity-30" />
          </div>
        )}
      </header>

      <main className="px-8 md:px-10 pb-32">
        <div className="space-y-10 max-w-2xl">
          {/* If not logged in, show simplified list matching the screenshot */}
          {!user ? (
            <div className="space-y-8">
              {[
                { l: "Account settings", i: Settings },
                { l: "Get help", i: HelpCircle },
                { l: "Legal", i: FileText },
              ].map(item => (
                <div key={item.l} className="flex items-center justify-between group cursor-pointer py-1">
                  <div className="flex items-center gap-4">
                    <item.i className="w-6 h-6 opacity-70" strokeWidth={1.5} />
                    <span className="text-[17px] text-on-surface font-medium">{item.l}</span>
                  </div>
                  <ChevronRight className="w-5 h-5 opacity-40" />
                </div>
              ))}
            </div>
          ) : (
            sections.map(section => (
              <section key={section.title}>
                <h3 className="text-lg font-bold mb-4">{section.title}</h3>
                <div className="space-y-6">
                  {section.items.map((item: any) => (
                    <div
                      key={item.l}
                      onClick={() => item.path && router.push(item.path)}
                      className="flex items-center justify-between group cursor-pointer py-1"
                    >
                      <div className="flex items-center gap-4">
                        <item.i className="w-6 h-6 opacity-70" strokeWidth={1.5} />
                        <span className="text-[15px] text-on-surface-variant font-medium">{item.l}</span>
                      </div>
                      <ChevronRight className="w-5 h-5 opacity-20 group-hover:opacity-100 transition-opacity" />
                    </div>
                  ))}
                </div>
              </section>
            ))
          )}

          {user && (
            <div className="pt-4">
              <button
                onClick={() => router.push('/')}
                className="w-full h-14 border border-on-surface rounded-xl font-bold text-[15px] flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Log out
              </button>
            </div>
          )}

          <p className="text-center text-xs text-on-surface-variant mt-8 opacity-40">
            Version 0.0.1
          </p>
        </div>
      </main>
    </div>
  );
}