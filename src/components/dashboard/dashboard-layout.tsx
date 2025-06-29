'use client';

import type React from 'react';

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { RoleBasedSidebar } from './role-based-sidebar';
import type { User } from '@/types/user';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface DashboardLayoutProps {
  children: React.ReactNode;
  user: User;
}

function convertPathToTitle(title: string) {
  return title
    .replace(/^\//, '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function DashboardLayout({ children, user }: DashboardLayoutProps) {
  const title = convertPathToTitle(usePathname());

  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const handleBackToBrowse = () => {
    router.push('/browse-data');
  };

  const handleBackToAdmin = () => {
    router.push('/administrator');
  };

  const handleBackToLanding = () => {
    router.push('/');
  };

  return (
    <SidebarProvider>
      <RoleBasedSidebar user={user} />
      <SidebarInset>
        {title.includes('Operations') || title.includes('Profile') ? (
          <></>
        ) : (
          <Image
            src='/circle-dashboard.svg'
            alt=''
            width={0}
            height={0}
            className='absolute -top-[2%] -left-[2%] w-50'
          />
        )}

        <header className='flex h-24 shrink-0 items-center gap-2 border-none bg-white px-4'>
          {title.includes('Operations') ||
          title.includes('Add') ||
          title.includes('User') ||
          title.includes('Requests/') ||
          title.includes('Profile') ? (
            <>
              <div className='flex flex-1 items-center justify-between'>
                <Button
                  variant='outline'
                  className='bg-primary text-white hover:bg-[#4971A9]/90 hover:text-white ml-2 z-10 cursor-pointer'
                  onClick={handleBack}
                >
                  Back
                </Button>
                <Button
                  variant='outline'
                  className='bg-secondary text-white hover:bg-[#4f959d]/90 hover:text-white mr-6 cursor-pointer'
                >
                  Landing Page
                </Button>
              </div>
              <Image src='/LOGO.svg' alt='' width={100} height={0} />
            </>
          ) : (
            <>
              <SidebarTrigger className='-ml-1 z-10 primary-color cursor-pointer hover:bg-transparent' />
              <div className='flex flex-1 items-center justify-between'>
                <h1 className='text-3xl font-bold primary-color z-10'>
                  {title}
                </h1>
                <Button
                  variant='outline'
                  className='bg-secondary text-white hover:bg-[#4f959d]/90 hover:text-white mr-6 cursor-pointer'
                  onClick={handleBackToLanding}
                >
                  Landing Page
                </Button>
              </div>
              <Image src='/LOGO.svg' alt='' width={100} height={0} />
            </>
          )}
        </header>
        <main className='flex-1 overflow-auto bg-white'>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
