'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import type { User } from '@/types/user';

export default function DashboardLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (!token || !storedUser) {
      router.push('/login');
      return;
    }

    try {
      const parsedUser: User = JSON.parse(storedUser);
      setUser(parsedUser);
    } catch (err) {
      console.error('Gagal parse user dari localStorage', err);
      router.push('/login');
    }
  }, [router]);

  if (!user) {
    return (
      <div className='h-screen w-full flex justify-center items-center'>
        <p className='text-muted-foreground'>Memuat data pengguna...</p>
      </div>
    );
  }

  return <DashboardLayout user={user}>{children}</DashboardLayout>;
}
