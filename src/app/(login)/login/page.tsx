'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Lock, User, EyeOff, Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/lib/api/auth';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const user = await loginUser(email, password);

    if (user) {
      router.push('/dashboard');
    } else {
      setError('Login gagal. Cek kembali email dan password.');
    }

    setLoading(false);
  };

  return (
    <>
      <div className='relative bg-white h-dvh w-230 z-10 rounded-tr-[14px] rounded-br-[14px]'>
        <div className='h-dvh flex flex-col justify-center items-center gap-2'>
          <Image src='LOGO.svg' alt='' width={200} height={100} />
          <p className='text-[34px] primary-color font-semibold'>Login</p>

          <form
            onSubmit={handleLogin}
            className='space-y-4 flex flex-col items-center mt-6'
          >
            <div className='bg-[#F4F8F7] relative flex items-center'>
              <User
                size={24}
                className='absolute left-3 h-5 w-5 text-muted-foreground'
              />
              <Input
                type='text'
                placeholder='Username / Email'
                className='w-100 h-10 pl-10 border-none'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className='bg-[#F4F8F7] relative flex items-center'>
              <Lock
                size={24}
                className='absolute left-3 h-5 w-5 text-muted-foreground'
              />
              <Input
                name='password'
                type={showPassword ? 'text' : 'password'}
                placeholder='Password'
                className='w-100 h-10 pl-10 border-none'
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type='button'
                variant='ghost'
                size='icon'
                className='absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground cursor-pointer'
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className='h-4 w-4' />
                ) : (
                  <Eye className='h-4 w-4' />
                )}
                <span className='sr-only'>
                  {showPassword ? 'Hide password' : 'Show password'}
                </span>
              </Button>
            </div>

            {error && <p className='text-red-500 text-sm'>{error}</p>}

            <Button
              type='submit'
              className='w-50 h-10 mt-10 hover:bg-[#4971a9]/90 rounded-full cursor-pointer'
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
