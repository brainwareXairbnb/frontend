'use client'

import ListingDetailCommon from "@/components/ListingDetailCommon";
import { Suspense } from 'react';
import { RoomDetailSkeleton } from "@/components/skeletons";

export default function AdminListingViewPage() {
  return (
    <Suspense fallback={<RoomDetailSkeleton />}>
      <ListingDetailCommon mode="admin" />
    </Suspense>
  );
}
