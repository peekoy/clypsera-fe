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
      <div className='flex flex-col md:flex-row gap-8 md:gap-30 pt-20 pb-40 md:pb-100'>
        <div className='flex flex-col gap-8 justify-center w-full md:w-200'>
          <p className='text-4xl md:text-[64px] text-white font-semibold text-shadow-lg text-center md:text-left'>
            Smarter Healthcare Through Cleft Data
          </p>
          <p className='text-lg md:text-2xl text-white font-semibold text-center md:text-left'>
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
