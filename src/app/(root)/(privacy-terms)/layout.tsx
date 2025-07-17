'use client';

import { usePathname } from 'next/navigation';
import ScrollspySidebar from '@/components/landingpage/ScrollspySidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const showScrollspy =
    pathname?.startsWith('/privacy') || pathname?.startsWith('/terms');

  return (
    <>
      {showScrollspy ? (
        <div className='container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12'>
          <div className='text-center'>
            {pathname === '/privacy' ? (
              <p className='text-4xl font-semibold text-shadow-lg sm:text-5xl md:text-6xl lg:text-8xl primary-color'>
                Privacy <span className='secondary-color'>Policy</span>
              </p>
            ) : (
              <p className='text-4xl font-semibold text-shadow-lg sm:text-5xl md:text-6xl lg:text-8xl primary-color'>
                Term of <span className='secondary-color'>Use</span>
              </p>
            )}
          </div>
          <div className='mt-12 flex flex-col md:flex-row md:gap-8 lg:gap-12'>
            <div className='hidden md:block md:w-1/4 lg:w-1/5'>
              <ScrollspySidebar pathname={pathname} />
            </div>
            <div className='hidden h-auto border-l-2 border-gray-200 md:block'></div>
            <main className='w-full md:w-3/4 lg:w-4/5'>{children}</main>
          </div>
        </div>
      ) : (
        <main>{children}</main>
      )}
    </>
  );
}
