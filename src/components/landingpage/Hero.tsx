'use server';
import Image from 'next/image';

export async function Hero() {
  return (
    <>
      <div className='absolute left-0 bottom-[4%] -z-10 h-full w-full'>
        <Image
          src='/homepage-hero.svg'
          alt='Background network'
          width={0}
          height={0}
          className='w-full'
        />
      </div>
      <div className='flex flex-row gap-30 pt-20 pb-100'>
        <div className='flex flex-col gap-8 justify-center w-200'>
          <p className='text-[64px] text-white font-semibold text-shadow-lg'>
            Smarter Healthcare Through Cleft Data
          </p>
          <p className='text-2xl text-white font-semibold'>
            Clypsera is Indonesia’s trusted source for cleft lip and palate case
            br data. Our platform provides accurate, accessible, and up-to-date
            information to support research, healthcare, and better outcomes for
            patients.
          </p>
        </div>
        {/* <Image src='/cleftlip.png' alt='' width={1200} height={0}></Image> */}
      </div>
    </>
  );
}
