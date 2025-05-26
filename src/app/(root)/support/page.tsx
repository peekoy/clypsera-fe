'use server';

import Image from 'next/image';
import { Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default async function SupportPage() {
  return (
    <>
      <div className='flex flex-col justify-center items-center my-20'>
        <Image src='/customer-services.svg' alt='' width={500} height={0} />
        <div className='space-y-10 text-center'>
          <p className='primary-color text-5xl text-shadow-lg font-semibold'>
            Are you facing any problem?
          </p>
          <p className='text-2xl font-semibold'>
            If you have any questions or need assistance, feel free to reach out
            to us through the <br /> following contact information. We're here
            to help you.
          </p>
          <div className='space-x-4'>
            <Button
              type='button'
              className='bg-secondary hover:bg-[#4f959d]/90 cursor-pointer'
            >
              <Mail /> <p>E-mail: support@clypsera.com</p>
            </Button>
            <Button
              type='button'
              className='bg-secondary hover:bg-[#4f959d]/90 cursor-pointer'
            >
              <Phone /> <p>Phone: +62 812 1212 0000</p>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
