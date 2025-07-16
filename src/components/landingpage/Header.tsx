// src/components/landingpage/Header.tsx

'use client';

import { useState } from 'react';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogin = () => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (!token || !storedUser) {
      router.push('/login');
    } else {
      router.push('/dashboard');
    }
    setIsMenuOpen(false);
  };

  const navLinks = [
    { href: '#feature', label: 'Features' },
    { href: '#faq', label: 'FAQ' },
    { href: '#news', label: 'News' },
  ];

  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    id: string
  ) => {
    e.preventDefault();
    if (pathname === '/') {
      const sectionId = id.substring(1);
      const section = document.getElementById(sectionId);
      section?.scrollIntoView({ behavior: 'smooth' });
    } else {
      router.push('/' + id);
    }
    setIsMenuOpen(false);
  };

  return (
    <header className='w-full'>
      <div className='container mx-auto flex 4xs:h-0 2xs:h-10 sm:h-20 items-center justify-between 4xs:pt-10 2xs:pt-6 4xs:px-4 2xs:px-6 md:px-14 lg:px-24'>
        <Link href='/' className='z-50'>
          <Image
            src={
              pathname === '/' || pathname === '/about'
                ? '/logo-putih.svg'
                : '/LOGO.svg'
            }
            alt='clypsera-logo'
            width={128}
            height={128}
            className='4xs:w-[60px] 2xs:w-[70px] md:w-[100px] lg:w-[128px]'
          />
        </Link>

        {/* Mobile Menu */}
        <div className='md:hidden'>
          <Button
            variant='ghost'
            size='icon'
            onClick={() => setIsMenuOpen(true)}
            className='text-white hover:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 z-50'
          >
            <Menu
              color={
                pathname === '/' || pathname === '/about' ? 'white' : 'black'
              }
              size={30}
            />
            <span className='sr-only'>Open menu</span>
          </Button>

          <div
            className={cn(
              'fixed inset-0 z-40 bg-white transition-opacity duration-300 md:hidden',
              isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            )}
          >
            <div className='flex flex-col p-6'>
              <div className='flex justify-between items-center mb-12'>
                <Link href='/' onClick={() => setIsMenuOpen(false)}>
                  <Image
                    src='/LOGO.svg'
                    alt='clypsera-logo'
                    width={100}
                    height={40}
                  />
                </Link>
                <Button
                  variant='ghost'
                  size='icon'
                  onClick={() => setIsMenuOpen(false)}
                >
                  <X size={30} />
                  <span className='sr-only'>Close menu</span>
                </Button>
              </div>
              <nav className='flex flex-col items-center gap-8'>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleScroll(e, link.href)}
                    className='text-xl font-medium text-gray-800 hover:text-primary'
                  >
                    {link.label}
                  </Link>
                ))}
                <Button
                  variant='default'
                  className='rounded-full bg-primary px-10 py-6 text-lg text-white font-medium hover:bg-[#4971a9]/90 cursor-pointer w-full mt-8'
                  onClick={handleLogin}
                >
                  Login
                </Button>
              </nav>
            </div>
          </div>
        </div>

        {/* Desktop Menu */}
        <NavigationMenu className='hidden md:flex'>
          <NavigationMenuList className='flex gap-12'>
            {navLinks.map((link) => (
              <NavigationMenuItem key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleScroll(e, link.href)}
                  className={cn(
                    'bg-transparent text-md hover:bg-blue-400/20 hover:text-white md:text-[16px] lg:text-[18px] px-3 py-2 rounded-md cursor-pointer',
                    pathname === '/' || pathname === '/about'
                      ? 'text-white'
                      : 'text-black hover:!text-black'
                  )}
                >
                  {link.label}
                </a>
              </NavigationMenuItem>
            ))}
            <Button
              variant='default'
              className={
                pathname === '/' || pathname === '/about'
                  ? 'rounded-full bg-secondary px-6 text-white font-medium hover:bg-[#4f959d]/80 cursor-pointer md:text-[16px] lg:text-[18px]'
                  : 'rounded-full bg-primary px-6 text-white font-medium hover:bg-[#4971a9]/90 cursor-pointer'
              }
              onClick={handleLogin}
            >
              Login
            </Button>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}
