'use client';

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export function Header() {
  const pathname = usePathname();
  return (
    <header className='w-full'>
      <div className='container mx-auto flex h-20 items-center justify-between px-30 mt-10'>
        {pathname === '/' || pathname === '/about' ? (
          <Link href='/' className='flex items-center gap-2'>
            <Image
              src='/logo-putih.svg'
              alt='clypsera-logo'
              width={128}
              height={128}
            />
          </Link>
        ) : (
          <Link href='/' className='flex items-center gap-2'>
            <Image
              src='/LOGO.svg'
              alt='clypsera-logo'
              width={128}
              height={128}
            />
          </Link>
        )}

        <NavigationMenu className='md:flex'>
          <NavigationMenuList className='flex gap-12'>
            <NavigationMenuItem>
              <Link
                href='/'
                onClick={(e) => {
                  e.preventDefault();
                  const section = document.getElementById('feature');
                  section?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <NavigationMenuLink
                  className={
                    pathname === '/' || pathname === '/about'
                      ? 'bg-transparent text-md text-white hover:bg-blue-400/20 hover:text-white'
                      : 'bg-transparent text-md text-black hover:bg-gray-100/80'
                  }
                >
                  Features
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link
                href='/'
                onClick={(e) => {
                  e.preventDefault();
                  const section = document.getElementById('faq');
                  section?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <NavigationMenuLink
                  className={
                    pathname === '/' || pathname === '/about'
                      ? 'bg-transparent text-md text-white hover:bg-blue-400/20 hover:text-white'
                      : 'bg-transparent text-md text-black hover:bg-gray-100/80'
                  }
                >
                  FAQ
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link
                href='/'
                onClick={(e) => {
                  e.preventDefault();
                  const section = document.getElementById('news');
                  section?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <NavigationMenuLink
                  className={
                    pathname === '/' || pathname === '/about'
                      ? 'bg-transparent text-md text-white hover:bg-blue-400/20 hover:text-white'
                      : 'bg-transparent text-md text-black hover:bg-gray-100/80'
                  }
                >
                  News
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <Link href='/login'>
              <Button
                variant='default'
                className={
                  pathname === '/' || pathname === '/about'
                    ? 'rounded-full bg-secondary px-6 text-white font-medium hover:bg-[#4f959d]/80 cursor-pointer'
                    : 'rounded-full bg-primary px-6 text-white font-medium hover:bg-[#4971a9]/90 cursor-pointer'
                }
              >
                Login
              </Button>
            </Link>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}
