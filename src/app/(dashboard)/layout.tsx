'use client';

import { useEffect, useState } from 'react';
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

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (!token || !storedUser) {
      router.push('/login');
      return;
    }

    let parsedUser: UserAuth;
    try {
      // 1. Set state pengguna awal dari localStorage untuk mencegah flicker pada UI
      parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    } catch (err) {
      console.error('Gagal parse user dari localStorage', err);
      router.push('/login');
      return;
    }

    // 2. Buat fungsi untuk mengambil data pengguna terbaru dari API
    const fetchFreshUserData = async () => {
      try {
        const freshUserProfile = await getUserProfile(token);

        if (freshUserProfile) {
          // 3. Perbarui state dengan nama baru dari API
          setUser((prevUser) => {
            if (!prevUser) return null;
            return {
              ...prevUser, // Pertahankan id, role, avatar dari localStorage
              name: freshUserProfile.name, // Perbarui nama dari respons API
            };
          });
        } else {
          console.error('Gagal mengambil profil pengguna dari API.');
        }
      } catch (error) {
        console.error(
          'Terjadi kesalahan saat mengambil profil pengguna:',
          error
        );
      }
    };

    fetchFreshUserData(); // Panggil fungsi fetch
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
