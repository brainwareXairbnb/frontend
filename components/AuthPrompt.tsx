"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface AuthPromptProps {
  title: string;
  description: string;
}

export function AuthPrompt({ title, description }: AuthPromptProps) {
  const router = useRouter();

  return (
    <div className="max-w-md py-10">
      <h2 className="text-[22px] font-semibold text-on-surface mb-2 tracking-tight">
        {title}
      </h2>
      <p className="text-[15px] text-on-surface-variant leading-relaxed mb-8 opacity-80">
        {description}
      </p>
      <Button
        onClick={() => router.push('/login')}
        className="h-12 px-10 bg-[#FF385C] hover:bg-[#E31C5F] text-white rounded-lg font-bold text-[15px] shadow-sm transition-all active:scale-95"
      >
        Log in
      </Button>
    </div>
  );
}
