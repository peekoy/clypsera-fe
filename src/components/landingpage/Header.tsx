'use client';

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
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogin = () => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (!token || !storedUser) {
      router.push('/login');
      return;
    } else {
      router.push('/dashboard');
      return;
    }
  };

  return (
    <header className='w-full'>
      <div className='container mx-auto flex h-20 items-center justify-between mt-10 px-4 sm:px-6 lg:px-8'>
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

        <div className='md:hidden'>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className='md:hidden absolute flex justify-center top-20 left-0 w-full bg-black z-20 shadow-lg'>
            <NavigationMenu>
              <NavigationMenuList className='flex flex-col justify-center items-center gap-4 py-4'>
                <NavigationMenuItem className='w-full'>
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
                          ? 'bg-white text-md text-white hover:bg-blue-400/20 hover:text-white'
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
                <Button
                  variant='default'
                  className={
                    pathname === '/' || pathname === '/about'
                      ? 'rounded-full bg-secondary px-6 text-white font-medium hover:bg-[#4f959d]/80 cursor-pointer'
                      : 'rounded-full bg-primary px-6 text-white font-medium hover:bg-[#4971a9]/90 cursor-pointer'
                  }
                  onClick={handleLogin}
                >
                  Login
                </Button>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        )}

        <NavigationMenu className='hidden md:flex'>
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
            <Button
              variant='default'
              className={
                pathname === '/' || pathname === '/about'
                  ? 'rounded-full bg-secondary px-6 text-white font-medium hover:bg-[#4f959d]/80 cursor-pointer'
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
