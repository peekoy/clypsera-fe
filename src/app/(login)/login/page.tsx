'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Lock, User, EyeOff, Eye, Mail } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/lib/api/auth';
import { requestPasswordReset } from '@/lib/api/reset-password';
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
    } catch (err: unknown) {
      const error = err as Error;
      setError(error.message);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message || 'An unexpected error occurred.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex h-dvh w-full items-center justify-center md:justify-start'>
      {/* Login Form Container */}
      <div className='relative z-10 flex h-full w-full max-w-md flex-col items-center justify-center gap-2 bg-white p-6 shadow-lg md:h-dvh md:max-w-none md:rounded-tr-[14px] md:rounded-br-[14px] md:w-230'>
        <div className='flex w-full max-w-sm flex-col items-center gap-2'>
          <Image
            src='/LOGO.svg'
            alt='Clypsera Logo'
            width={200}
            height={100}
            className='h-auto w-40'
          />

          {isForgotPassword ? (
            <>
              <p className='primary-color text-[34px] font-semibold'>
                Reset Password
              </p>
              <form
                onSubmit={handleForgotPasswordSubmit}
                className='mt-6 flex w-full flex-col items-center space-y-4'
              >
                <div className='relative flex w-full items-center bg-[#F4F8F7]'>
                  <Mail
                    size={24}
                    className='absolute left-3 h-5 w-5 text-muted-foreground'
                  />
                  <Input
                    type='email'
                    placeholder='Enter your Email'
                    className='h-10 w-full border-none pl-10'
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {error && <p className='text-sm text-red-500'>{error}</p>}
                <Button
                  type='submit'
                  className='mt-10 h-10 w-50 cursor-pointer rounded-full hover:bg-[#4971a9]/90'
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </Button>
                <button
                  type='button'
                  onClick={() => setIsForgotPassword(false)}
                  className='primary-color cursor-pointer text-sm'
                >
                  Back to Login
                </button>
              </form>
            </>
          ) : (
            <>
              <p className='primary-color text-[34px] font-semibold'>Login</p>
              <form
                onSubmit={handleLogin}
                className='mt-6 flex w-full flex-col items-center space-y-4'
              >
                <div className='relative flex w-full items-center bg-[#F4F8F7]'>
                  <User
                    size={24}
                    className='absolute left-3 h-5 w-5 text-muted-foreground'
                  />
                  <Input
                    type='text'
                    placeholder='Username / Email'
                    className='h-10 w-full border-none pl-10'
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className='relative flex w-full items-center bg-[#F4F8F7]'>
                  <Lock
                    size={24}
                    className='absolute left-3 h-5 w-5 text-muted-foreground'
                  />
                  <Input
                    name='password'
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Password'
                    className='h-10 w-full border-none pl-10'
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button
                    type='button'
                    variant='ghost'
                    size='icon'
                    className='absolute right-0 top-0 h-full cursor-pointer px-3 py-2 text-muted-foreground'
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
                {error && <p className='text-sm text-red-500'>{error}</p>}
                <div className='flex w-full justify-end px-1'>
                  <button
                    type='button'
                    onClick={() => setIsForgotPassword(true)}
                    className='hover:text-primary cursor-pointer text-xs text-gray-500'
                  >
                    Forgot Password?
                  </button>
                </div>
                <Button
                  type='submit'
                  className='mt-4 h-10 w-50 cursor-pointer rounded-full hover:bg-[#4971a9]/90'
                  disabled={loading}
                >
                  {loading ? 'Logging in...' : 'Login'}
                </Button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
