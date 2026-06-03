"use client";
import { useRouter } from "next/navigation";
import { AuthPromptProps } from "@/lib/types";
import { ShieldAlert, LogIn } from "lucide-react";

export function AuthPrompt({ title, description }: AuthPromptProps) {
  const router = useRouter();

  // Normalize title and description to fit the design nicely
  const trimmedTitle = title?.trim();
  const trimmedDesc = description?.trim();

  const displayTitle = trimmedDesc ? trimmedTitle : "Authentication Required";
  const displayDescription = trimmedDesc
    ? trimmedDesc
    : (trimmedTitle || "You need to be logged in to access this page. Please sign in to continue.");

  return (
    <div className="w-full max-w-md mx-auto my-6 sm:my-10">
      {/* Premium Dark Card Container */}
      <div className="overflow-hidden rounded-3xl border border-zinc-800/80 bg-[#121214] shadow-2xl shadow-black/50">
        
        {/* Top Header Section (Darker Background) */}
        <div className="bg-[#0c0c0e] px-6 py-8 sm:px-8 sm:py-10 flex flex-col items-center border-b border-zinc-800/60">
          {/* Shield Icon Container */}
          <div className="w-16 h-16 rounded-full flex items-center justify-center bg-[#FF385C]/10 border border-[#FF385C]/20 mb-5 relative">
            {/* Soft background glow */}
            <div className="absolute inset-0 rounded-full bg-[#FF385C]/5 blur-sm" />
            <ShieldAlert className="w-8 h-8 text-[#FF385C] relative z-10" />
          </div>

          {/* Title */}
          <h2 className="text-xl sm:text-2xl font-bold text-white text-center tracking-tight font-display">
            {displayTitle}
          </h2>
        </div>

        {/* Bottom Body Section */}
        <div className="px-6 py-8 sm:px-8 sm:py-10 flex flex-col items-center">
          {/* Description */}
          <p className="text-sm text-zinc-400 text-center leading-relaxed mb-8 max-w-xs font-sans">
            {displayDescription}
          </p>

          {/* Action Button */}
          <button
            onClick={() => router.push('/login')}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#FF385C] to-[#FF5A5F] hover:from-[#FF5A5F] hover:to-[#FF385C] active:scale-[0.98] text-white font-bold py-4 px-6 rounded-2xl transition-all duration-200 shadow-lg shadow-[#FF385C]/10 hover:shadow-[#FF385C]/20 cursor-pointer"
          >
            <LogIn className="w-5 h-5" />
            <span>Login to Continue</span>
          </button>

          {/* Footer Text */}
          <p className="text-xs text-zinc-500 text-center mt-5 font-medium font-sans">
            New user? You&apos;ll be automatically registered during login
          </p>
        </div>
      </div>
    </div>
  );
}
