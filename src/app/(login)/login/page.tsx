'use client';

import { useState } from 'react';
// import { useFormState } from 'react-dom';
import Image from 'next/image';
import Form from 'next/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Lock, User, EyeOff, Eye } from 'lucide-react';

export default function LoginPage() {
  // const [state, formAction] = useFormState(login, { error: null });
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div className='relative bg-white h-dvh w-230 z-10 rounded-tr-[14px] rounded-br-[14px]'>
        <div className='h-dvh flex flex-col justify-center items-center gap-2'>
          <Image src='LOGO.svg' alt='' width={200} height={100} />
          <p className='text-[34px] primary-color font-semibold'>Login</p>
          <Form action='' className='space-y-4 flex flex-col items-center mt-6'>
            <div className='bg-[#F4F8F7] relative flex items-center'>
              <User
                size={24}
                className='absolute left-3 h-5 w-5  text-muted-foreground'
              />
              <Input
                type='text'
                placeholder='Username / Email'
                className='w-100 h-10 pl-10 border-none'
                required
              />
            </div>
            <div className='bg-[#F4F8F7] relative flex items-center'>
              <Lock
                size={24}
                className='absolute left-3 h-5 w-5  text-muted-foreground'
              />
              <Input
                name='password'
                type={showPassword ? 'text' : 'password'}
                placeholder='Password'
                className='w-100 h-10 pl-10 border-none'
                required
              />
              <Button
                type='button'
                variant='ghost'
                size='icon'
                className='absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground'
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
            <Button type='submit' className='w-50 h-10 mt-10 rounded-full'>
              Login
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
}
