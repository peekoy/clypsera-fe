'use server';

import Image from 'next/image';

export default async function AffiliatesPage() {
  return (
    <div className='container mx-auto flex min-h-screen items-center justify-center px-4 py-8'>
      <div className='w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl'>
        <Image
          src='/affiliates-humic.svg'
          alt='HUMIC Affiliates'
          width={500}
          height={400}
          className='h-auto w-full'
        />
      </div>
    </div>
  );
}
