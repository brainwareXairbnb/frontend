'use client';

import { RoleGuard } from '@/components/RoleGuard';
import { StudentLayoutProps } from '@/lib/types';

export default function StudentLayout({ children }: StudentLayoutProps) {
  return (
    <RoleGuard allowedRoles={['student']}>
      {children}
    </RoleGuard>
  );
}
