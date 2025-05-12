'use server';
import Image from 'next/image';

export async function Hero() {
  return (
    <>
      <div className='absolute bottom-[3%] right-0 -z-10 h-full w-170'>
        <Image
          src='/bg-landingpage.png'
          alt='Background network'
          width={1200}
          height={800}
        />
      </div>
      <div className='flex flex-row gap-30 pt-20 pb-40'>
        <div className='flex flex-col gap-8 justify-center w-full'>
          <p className='text-[64px] primary-color font-bold'>
            Smarter Healthcare <br /> Through Cleft Data
          </p>
          <p className='text-2xl font-semibold'>
            Clypsera is Indonesia’s trusted source for cleft lip and palate case
            data. Our platform provides accurate, accessible, and up-to-date
            information to support research, healthcare, and better outcomes for
            patients.
          </p>
        </div>
        <Image src='/cleftlip.png' alt='' width={1200} height={0}></Image>
      </div>
    </>
  );
}
