'use server';

import Image from 'next/image';
import { Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default async function SupportPage() {
  return (
    <>
      <div className='container mx-auto flex flex-col items-center justify-center gap-8 px-4 py-12 text-center sm:gap-10 sm:py-16 md:py-20'>
        <div className='w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg'>
          <Image
            src='/customer-services.svg'
            alt='Customer Service'
            width={500}
            height={300}
            className='h-auto w-full'
          />
        </div>
        <div className='space-y-6 sm:space-y-8'>
          <p className='primary-color text-3xl font-semibold text-shadow-lg sm:text-4xl md:text-5xl'>
            Are you facing any problem?
          </p>
          <p className='mx-auto max-w-3xl text-base font-semibold sm:text-lg md:text-2xl'>
            If you have any questions or need assistance, feel free to reach out
            to us through the following contact information. We're here to help
            you.
          </p>
          <div className='flex flex-col items-center gap-4 sm:flex-row sm:justify-center'>
            <Button
              type='button'
              className='flex w-full items-center gap-2 bg-secondary hover:bg-[#4f959d]/90 sm:w-auto'
            >
              <Mail /> <span>E-mail: support@clypsera.com</span>
            </Button>
            <Button
              type='button'
              className='flex w-full items-center gap-2 bg-secondary hover:bg-[#4f959d]/90 sm:w-auto'
            >
              <Phone /> <span>Phone: +62 812 1212 0000</span>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
