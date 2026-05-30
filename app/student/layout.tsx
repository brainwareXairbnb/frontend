'use client';

import { useAuth } from '@/lib/auth-context';
import { AuthPrompt } from '@/components/AuthPrompt';
import { StudentLayoutProps } from '@/lib/types';

export default function StudentLayout({ children }: StudentLayoutProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-12 h-12 bg-gray-200 rounded-full" />
          <div className="h-4 bg-gray-200 rounded w-32" />
        </div>
      </div>
    );
  }

  if (!user || user.role !== 'student') {
    return (
      <div className=" bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <AuthPrompt
            title=" Log in and start planning your next stay."
            description=""
          />
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
