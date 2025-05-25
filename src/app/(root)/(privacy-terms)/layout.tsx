'use client';

import { usePathname } from 'next/navigation';
import ScrollspySidebar from '@/components/ScrollspySidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const showScrollspy =
    pathname?.startsWith('/privacy') || pathname?.startsWith('/terms');

  return (
    <>
      {showScrollspy ? (
        <div className='max-w-6xl mx-auto flex flex-col px-4 py-8 space-y-20'>
          {pathname === '/privacy' ? (
            <p className='text-8xl text-center text-shadow-lg font-semibold primary-color'>
              Privacy <span className='secondary-color'>Policy</span>
            </p>
          ) : (
            <p className='text-8xl text-center text-shadow-lg font-semibold primary-color'>
              Term of <span className='secondary-color'>Use</span>
            </p>
          )}
          <div className='flex flex-row'>
            <ScrollspySidebar pathname={pathname} />
            <div className='bg-black h-auto border-1 mx-10'></div>
            <main>{children}</main>
          </div>
        </div>
      ) : (
        <main>{children}</main>
      )}
    </>
  );
}
