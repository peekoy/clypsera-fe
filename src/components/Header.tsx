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
          <Image
            src='/LOGO.svg'
            alt='clypsera-logo'
            width={64}
            height={64}
          ></Image>
        </Link>

        <NavigationMenu className='md:flex'>
          <NavigationMenuList className='flex gap-12'>
            <NavigationMenuItem>
              <Link href='/features' passHref>
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
              <Link href='/faq' passHref>
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
              <Link href='/news' passHref>
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
            <Button className='rounded-full bg-green-200/80 px-6 font-medium text-green-800 hover:bg-green-200'>
              LOGIN
            </Button>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}
