"use client";
import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { fmt, ROOMS } from "@/lib/data";
import {
  ChevronLeft,
  Calendar,
  Clock,
  CreditCard,
  CheckCircle2,
  Home,
  Info,
  Lock
} from "lucide-react";
import { AuthPrompt } from "@/components/AuthPrompt";

function PaymentContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, loading } = useAuth();
  const id = searchParams.get('id');
  const r = ROOMS.find(room => room.id.toString() === id) || ROOMS[0];

  const [months, setMonths] = useState(3);
  const [moveIn, setMoveIn] = useState("");
  const [step, setStep] = useState(1);
  const gross = r.rent * months;
  const sc = Math.round(gross * 0.05);
  const total = gross + r.deposit + sc;

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#FF385C]/20 border-t-[#FF385C] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="bg-white min-h-screen pt-20">
        <div className="max-w-4xl mx-auto px-6">
          <AuthPrompt 
            title="Log in to complete your booking"
            description="You need to be logged in to reserve a room and complete the payment process."
          />
        </div>
      </div>
    );
  }

  if (step === 2) return (
    <div className="bg-white min-h-screen p-8 md:p-20 flex flex-col items-center text-center max-w-2xl mx-auto">
      <div className="w-20 h-20 rounded-full bg-[#FF385C] text-white flex items-center justify-center shadow-lg mb-8">
        <CheckCircle2 className="w-10 h-10" />
      </div>
      <h2 className="text-2xl font-bold text-on-surface mb-3">Reservation sent</h2>
      <p className="text-[15px] text-on-surface-variant leading-relaxed opacity-80 mb-10">
        Your request has been sent to Anita Ghosh. You'll receive a notification once they accept your stay.
      </p>

      <div className="w-full bg-white border border-outline-variant/10 rounded-2xl p-6 md:p-10 text-left mb-10 shadow-sm">
        <h4 className="text-sm font-bold uppercase tracking-wider mb-4 opacity-40">Reservation details</h4>
        <div className="space-y-4">
          {[
            { l: "Unit", v: r.title, i: Home },
            { l: "Check-in", v: moveIn || "August 1, 2024", i: Calendar },
            { l: "Duration", v: `${months} Months`, i: Clock },
            { l: "Total amount", v: fmt(total), i: CreditCard },
          ].map(row => (
            <div key={row.l} className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <row.i className="w-4 h-4 text-on-surface-variant opacity-40" />
                <span className="text-sm text-on-surface-variant">{row.l}</span>
              </div>
              <span className="text-sm font-bold text-on-surface">{row.v}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full flex flex-col md:flex-row gap-4">
        <button onClick={() => router.push("/student/bookings")} className="w-full h-14 bg-[#222222] text-white rounded-lg font-bold text-[15px] transition-all">
          View your stays
        </button>
        <button onClick={() => router.push("/")} className="w-full h-14 bg-white border border-outline-variant/30 rounded-lg font-bold text-[15px] text-on-surface">
          Back to home
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-white min-h-screen pb-32 pt-8 md:pt-28">
      <div className="max-w-4xl mx-auto px-6 md:px-10">
        <header className="flex items-center gap-6 mb-10">
          <button onClick={() => router.back()} className="p-2 -ml-3 hover:bg-slate-50 rounded-full">
            <ChevronLeft className="w-6 h-6 text-on-surface" />
          </button>
          <h2 className="text-2xl font-bold">Confirm and pay</h2>
        </header>

        <div className="flex flex-col md:flex-row gap-10">
          <div className="flex-1">
            <section className="mb-10">
              <h3 className="text-xl font-bold mb-6">Your stay</h3>
              <div className="space-y-6">
                <div className="flex justify-between items-center group cursor-pointer">
                  <div>
                    <h4 className="text-[15px] font-bold">Check-in date</h4>
                    <p className="text-sm text-on-surface-variant">{moveIn || "Select a date"}</p>
                  </div>
                  <button className="text-[15px] font-bold underline">Edit</button>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-[15px] font-bold">Stay duration</h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {[1, 3, 6, 12].map(m => (
                        <button key={m} onClick={() => setMonths(m)} className={`px-5 py-2.5 rounded-full text-xs font-bold border transition-all ${months === m ? 'bg-[#222222] text-white border-transparent' : 'bg-white border-outline-variant/30 text-on-surface-variant'}`}>{m} mo</button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <div className="w-full h-px bg-outline-variant/10 mb-10" />

            <section className="mb-10">
              <h3 className="text-xl font-bold mb-6">Required for your stay</h3>
              <div className="flex gap-4 p-6 bg-slate-50 rounded-2xl border border-outline-variant/10">
                <Info className="w-5 h-5 text-on-surface-variant shrink-0" />
                <p className="text-[13px] text-on-surface-variant leading-relaxed">
                  By selecting the button below, I agree to the <strong>Host's House Rules</strong>, and that I'm responsible for the total commitment shown above.
                </p>
              </div>
            </section>

            <button
              onClick={() => setStep(2)}
              className="hidden md:block w-full py-4 bg-[#FF385C] text-white rounded-xl font-bold text-lg shadow-lg hover:brightness-95 transition-all mt-6"
            >
              Confirm and pay
            </button>
          </div>

          {/* Pricing Sidebar */}
          <div className="md:w-[400px]">
            <div className="border border-outline-variant/10 rounded-2xl p-6 shadow-sm sticky top-32">
              <div className="flex gap-4 mb-6 border-b border-outline-variant/10 pb-6">
                <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0">
                  <img src={`https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=100&w=200`} className="w-full h-full object-cover" alt={r.title} />
                </div>
                <div>
                  <p className="text-sm font-bold line-clamp-2">{r.title}</p>
                  <p className="text-[11px] text-on-surface-variant opacity-60 uppercase font-black">{r.type} · {r.area}</p>
                </div>
              </div>

              <h3 className="text-lg font-bold mb-4">Price details</h3>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-on-surface-variant underline">₹{r.rent.toLocaleString('en-IN')} x {months} months</span>
                  <span>{fmt(gross)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-on-surface-variant underline">Security Deposit</span>
                  <span>{fmt(r.deposit)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-on-surface-variant underline">Service fee</span>
                  <span>{fmt(sc)}</span>
                </div>
                <div className="flex justify-between font-bold pt-4 border-t border-outline-variant/10">
                  <span>Total (INR)</span>
                  <span>{fmt(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Only Sticky Bottom Dock */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-outline-variant/10 px-8 py-5 flex items-center justify-between z-50 md:hidden">
        <div className="flex flex-col">
          <span className="text-[15px] font-bold">{fmt(total)}</span>
          <span className="text-[11px] underline">Aug 1</span>
        </div>
        <button
          onClick={() => setStep(2)}
          className="h-12 px-10 bg-[#FF385C] text-white rounded-lg font-bold text-sm tracking-wide shadow-lg active:scale-95 transition-all"
        >
          Confirm
        </button>
      </div>
    </div>
  );
}

export default function StudentPaymentPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentContent />
    </Suspense>
  )
}