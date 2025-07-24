'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import type { UserAuth } from '@/types/user';
import { getUserProfile } from '@/lib/api/fetch-profile';

export default function DashboardLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<UserAuth | null>(null);
  const router = useRouter();

  const fetchFreshUserData = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token tidak ditemukan untuk fetch data baru.');
      return;
    }
    try {
      const freshUserProfile = await getUserProfile(token);

      if (freshUserProfile) {
        setUser((prevUser) => {
          const newUser = {
            ...(prevUser || ({} as UserAuth)),
            id: prevUser?.id || 0,
            role: prevUser?.role || 'user',
            name: freshUserProfile.name,
            avatar: freshUserProfile.photo,
          };
          const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
          storedUser.name = freshUserProfile.name;
          storedUser.avatar = freshUserProfile.photo;
          localStorage.setItem('user', JSON.stringify(storedUser));
          return newUser;
        });
      }
    } catch (error) {
      console.error('Terjadi kesalahan saat mengambil profil pengguna:', error);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (!token || !storedUser) {
      router.push('/login');
      return;
    }

    try {
      setUser(JSON.parse(storedUser));
    } catch (err) {
      console.error('Gagal parse user dari localStorage', err);
      router.push('/login');
      return;
    }

    fetchFreshUserData();

    window.addEventListener('profileUpdated', fetchFreshUserData);

    return () => {
      window.removeEventListener('profileUpdated', fetchFreshUserData);
    };
  }, [router, fetchFreshUserData]);

  if (!user) {
    return (
      <div className='h-screen w-full flex justify-center items-center'>
        <p className='text-muted-foreground'>Memuat data pengguna...</p>
      </div>
    );
  }

  return <DashboardLayout user={user}>{children}</DashboardLayout>;
}
