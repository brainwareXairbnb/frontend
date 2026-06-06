'use client'

import RoomDetailClient from "./RoomDetailClient";
import { Suspense } from 'react';
import { RoomDetailSkeleton } from "@/components/skeletons";

// Route trigger comment
export default function RoomDetailsPage() {
  return (
    <Suspense fallback={<RoomDetailSkeleton />}>
      <RoomDetailClient />
    </Suspense>
  );
}
