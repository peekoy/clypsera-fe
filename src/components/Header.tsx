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

export function Header() {
  return (
    <header className='w-full'>
      <div className='container mx-auto flex h-20 items-center justify-between px-30'>
        <Link href='/' className='flex items-center gap-2'>
          <Image src='/LOGO.svg' alt='clypsera-logo' width={64} height={64} />
        </Link>

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
                  className={cn(
                    navigationMenuTriggerStyle(),
                    'bg-transparent text-black hover:bg-blue-400/20'
                  )}
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
                  className={cn(
                    navigationMenuTriggerStyle(),
                    'bg-transparent text-black hover:bg-blue-400/20'
                  )}
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
                  className={cn(
                    navigationMenuTriggerStyle(),
                    'bg-transparent text-black hover:bg-blue-400/20'
                  )}
                >
                  News
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <Link href='/login'>
              <Button className='rounded-full bg-green-200/80 px-6 font-medium text-green-800 hover:bg-green-200'>
                Login
              </Button>
            </Link>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}
