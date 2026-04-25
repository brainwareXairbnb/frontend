'use client'

import ListingDetailClient from "../[id]/ListingDetailClient";
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';

export default function AdminListingViewPage() {
  return (
    <Suspense fallback={
      <div className='min-h-screen bg-white flex items-center justify-center'>
        <div className='flex flex-col items-center gap-4'>
          <Loader2 className='w-10 h-10 animate-spin text-primary' />
          <p className='text-sm text-on-surface-variant'>Loading listing...</p>
        </div>
      </div>
    }>
      <ListingDetailClient />
    </Suspense>
  );
}
