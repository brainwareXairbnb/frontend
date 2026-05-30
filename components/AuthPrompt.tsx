"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AuthPromptProps } from "@/lib/types";

export function AuthPrompt({ title, description }: AuthPromptProps) {
  const router = useRouter();

  return (
    <div className="max-w-md py-10">
      <p className='text-base text-gray-600 mb-6'>
        Log in and start planning your next stay.
      </p>

      <p className="text-[15px] text-on-surface-variant leading-relaxed mb-8 opacity-80">
        {description}
      </p>
      <Button
        className='w-full sm:w-auto px-8'
        onClick={() => router.push('/login')}
      >
        Log in or sign up
      </Button>
    </div>
  );
}
