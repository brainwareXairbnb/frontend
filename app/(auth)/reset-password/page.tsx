'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { authApi } from '@/lib/api';
import { toast } from 'sonner';
import {
  CheckCircle2,
  ShieldCheck,
  Home,
  Mail,
  KeyRound,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  Fingerprint,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const emailParam = searchParams.get('email');
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!email) {
      toast.error('Identity Identification Missing');
      setLoading(false);
      return;
    }

    if (!otp || otp.length !== 6) {
      toast.error('Identity Sequence Invalid', { description: 'Please enter the 6-digit OTP' });
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      toast.error('Security Protocol Violation', { description: 'Minimum sequence length: 8 characters' });
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Encryption Mismatch', { description: 'New credentials do not match' });
      setLoading(false);
      return;
    }

    try {
      await authApi.resetPassword(email, otp, password);
      toast.success('Protocol Restored', { description: 'Credentials synchronized successfully' });
      setSuccess(true);
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    } catch (err: any) {
      toast.error('Restoration Failed', { description: err.message || 'OTP may have expired' });
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-white">
        <div className="w-full max-w-md bg-white border border-outline-variant/10 rounded-[3rem] p-12 shadow-2xl text-center animate-in fade-in zoom-in duration-700">
          <div className="w-20 h-20 bg-emerald-500 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-xl shadow-emerald-500/20">
            <CheckCircle2 className="text-white w-10 h-10" />
          </div>
          <h2 className="text-3xl font-headline font-black text-on-surface tracking-tighter mb-4 uppercase">Protocol Restored</h2>
          <p className="text-sm font-medium text-on-surface-variant leading-relaxed opacity-60 mb-8">
            Your cryptographic credentials have been successfully synchronized. Redirecting to initialization portal...
          </p>
          <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 animate-progress origin-left"></div>
          </div>
        </div>
        <style jsx>{`
          @keyframes progress {
            0% { transform: scaleX(0); }
            100% { transform: scaleX(1); }
          }
          .animate-progress {
            animation: progress 3s linear forwards;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row overflow-hidden bg-white">
      {/* Left Side */}
      <div className="hidden md:flex md:w-1/2 lg:w-3/5 relative bg-on-surface overflow-hidden">
        <div className="absolute inset-0 z-10 bg-gradient-to-tr from-on-surface via-on-surface/40 to-transparent"></div>
        <img
          className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 mix-blend-overlay scale-110"
          src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&h=1600&fit=crop"
          alt="Security infrastructure"
        />
        <div className="relative z-20 mt-auto p-20 max-w-2xl animate-in slide-in-from-left duration-1000">
          <div className="mb-8 flex items-center gap-4">
            <div className="h-0.5 w-16 bg-primary"></div>
            <span className="font-headline font-black uppercase tracking-[0.3em] text-surface text-[10px] opacity-60">
              Identity Matrix
            </span>
          </div>
          <h1 className="font-headline text-6xl lg:text-8xl font-black text-surface leading-[0.95] tracking-tighter mb-10">
            Secure Your <br />
            <span className="text-primary">Ecosystem.</span>
          </h1>
          <p className="text-xl font-medium text-surface/60 leading-relaxed max-w-md uppercase tracking-widest text-[12px]">
            Initialize a high-entropy key to protect your managed assets and student telemetry.
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1 flex flex-col items-center md:justify-center p-6 md:p-10 lg:p-14 bg-white overflow-y-auto">
        <header className="w-full max-w-md mb-6 md:mb-10 animate-in fade-in slide-in-from-top-4 duration-700">
          <Link href="/" className="flex items-center gap-3 mb-8 md:mb-10 group">
            <div className="w-12 h-12 bg-primary flex items-center justify-center rounded-2xl shadow-xl shadow-primary/20 group-hover:rotate-12 transition-transform">
              <Home className="w-6 h-6 text-white" />
            </div>
            <span className="font-headline font-black text-2xl tracking-tighter text-on-surface uppercase group-hover:text-primary transition-colors">
              Brainware <span className="text-primary/40">Rooms</span>
            </span>
          </Link>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 bg-red-500/10 rounded-lg flex items-center justify-center text-red-500">
              <ShieldCheck className="w-3 h-3" />
            </div>
            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-red-500">Security Reset</h2>
          </div>
          <h2 className="text-5xl font-headline font-black text-on-surface tracking-tighter mb-2 uppercase leading-none">New Protocol</h2>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-40">
            Re-synchronize your credentials
          </p>
        </header>

        <main className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-40">Email</label>
                <Mail className="w-3.5 h-3.5 text-primary opacity-20" />
              </div>
              <div className="relative group/input">
                <input
                  className="w-full h-14 bg-[#FAFAFA] border-2 border-outline-variant/5 rounded-[1.2rem] px-6 text-sm font-black text-on-surface focus:border-primary focus:bg-white outline-none transition-all placeholder:opacity-30 tracking-widest"
                  type="email"
                  placeholder="name@ecosystem.node"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-40">Password Reset Code (OTP)</label>
                <Fingerprint className="w-3.5 h-3.5 text-primary opacity-20" />
              </div>
              <div className="relative group/input">
                <input
                  className="w-full h-16 bg-[#FAFAFA] border-2 border-outline-variant/5 rounded-[1.2rem] px-6 text-2xl font-black text-on-surface focus:border-primary outline-none transition-all tracking-[0.5em] text-center"
                  type="text"
                  placeholder="000000"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  disabled={loading}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-40">New Password</label>
                  <Lock className="w-3.5 h-3.5 text-primary opacity-20" />
                </div>
                <div className="relative group/input">
                  <input
                    className="w-full h-14 bg-[#FAFAFA] border-2 border-outline-variant/5 rounded-[1.2rem] px-5 pr-14 text-sm font-black text-on-surface focus:border-primary outline-none transition-all placeholder:opacity-30 tracking-widest"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                  />
                  <button
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-on-surface-variant/40 hover:text-primary transition-colors cursor-pointer"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-40">Confirm New Password</label>
                  <ShieldCheck className="w-3.5 h-3.5 text-primary opacity-20" />
                </div>
                <div className="relative group/input">
                  <input
                    className="w-full h-14 bg-[#FAFAFA] border-2 border-outline-variant/5 rounded-[1.2rem] px-5 text-sm font-black text-on-surface focus:border-primary outline-none transition-all placeholder:opacity-30 tracking-widest"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="********"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={loading}
                  />
                </div>
              </div>
            </div>

            <Button
              className="w-full mt-2 h-14 md:h-16"
              type="submit"
              disabled={loading}
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Submit'}
            </Button>
          </form>

          <div className="text-center mt-6">
            <Link
              href="/login"
              className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] hover:text-primary transition-all inline-flex items-center gap-2 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Return to Login
            </Link>
          </div>
        </main>

        <footer className="w-full max-w-md mt-10 md:mt-12 text-center opacity-40 border-t border-outline-variant/5 pt-8">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant leading-relaxed">
            Secured via Brainware Rooms Identity Service <br />
            &copy; 2026 BWU Ecosytem Node
          </p>
        </footer>
      </div>
    </div>
  );
}

function AlertCircle(props: any) {
  return <Lock {...props} />
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      </div>
    }>
      <ResetPasswordForm />
    </Suspense>
  );
}
