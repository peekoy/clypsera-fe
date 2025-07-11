// peekoy/clypsera-fe/clypsera-fe-e7ec6013669fff13aaaee4aaded0139ea273ab8d/src/app/(login)/login/page.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Lock, User, EyeOff, Eye, Mail } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/lib/api/auth';
import { requestPasswordReset } from '@/lib/api/reset-password'; // Import the new function
import Swal from 'sweetalert2';

export default function LoginPage() {
  const [isForgotPassword, setIsForgotPassword] = useState(false);
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
      setError('Login failed. Please check your email and password.');
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'Please check your email and password.',
      });
    }

    setLoading(false);
  };

  const handleForgotPasswordSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await requestPasswordReset(email);
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'If the email exists, a password reset link has been sent.',
        timer: 3000,
        showConfirmButton: false,
      });
      setIsForgotPassword(false);
    } catch (err: any) {
      setError(err.message);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.message || 'An unexpected error occurred.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className='relative bg-white h-dvh w-230 z-10 rounded-tr-[14px] rounded-br-[14px]'>
        <div className='h-dvh flex flex-col justify-center items-center gap-2'>
          <Image src='/LOGO.svg' alt='' width={200} height={100} />

          {isForgotPassword ? (
            <>
              <p className='text-[34px] primary-color font-semibold'>
                Reset Password
              </p>
              <form
                onSubmit={handleForgotPasswordSubmit}
                className='space-y-4 flex flex-col items-center mt-6'
              >
                <div className='bg-[#F4F8F7] relative flex items-center'>
                  <Mail
                    size={24}
                    className='absolute left-3 h-5 w-5 text-muted-foreground'
                  />
                  <Input
                    type='email'
                    placeholder='Enter your Email'
                    className='w-100 h-10 pl-10 border-none'
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {error && <p className='text-red-500 text-sm'>{error}</p>}
                <Button
                  type='submit'
                  className='w-50 h-10 mt-10 hover:bg-[#4971a9]/90 rounded-full cursor-pointer'
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </Button>
                <button
                  type='button'
                  onClick={() => setIsForgotPassword(false)}
                  className='text-sm primary-color cursor-pointer'
                >
                  Back to Login
                </button>
              </form>
            </>
          ) : (
            <>
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
                <div className='w-full flex justify-end px-1'>
                  <button
                    type='button'
                    onClick={() => setIsForgotPassword(true)}
                    className='text-xs text-gray-500 hover:text-primary cursor-pointer'
                  >
                    Forgot Password?
                  </button>
                </div>
                <Button
                  type='submit'
                  className='w-50 h-10 mt-4 hover:bg-[#4971a9]/90 rounded-full cursor-pointer'
                  disabled={loading}
                >
                  {loading ? 'Logging in...' : 'Login'}
                </Button>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}
