'use client';

import type React from 'react';

import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import type { User } from '@/types/user';

export default function DashboardLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  // Dalam aplikasi nyata, user data akan diambil dari session/auth
  const currentUser: User = {
    id: '1',
    name: 'Lala Sya',
    role: 'admin',
    avatar: '/placeholder.svg?height=64&width=64',
  };

  return <DashboardLayout user={currentUser}>{children}</DashboardLayout>;
}
