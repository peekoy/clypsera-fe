'use server';
import Image from 'next/image';

export async function Hero() {
  return (
    <>
      <div className='absolute left-0 4xs:bottom-[3%] 2xs:bottom-[3%] sm:bottom-[4%] -z-10 h-full w-full'>
        <div className='block 2xs:hidden h-100 w-full relative'>
          <Image
            src='/homepage-hero.svg'
            alt='Background network'
            fill
            className='object-cover'
          />
        </div>

        <div className='hidden 2xs:block h-full w-full'>
          <Image
            src='/homepage-hero.svg'
            alt='Background network'
            width={0}
            height={0}
            className='w-full'
          />
        </div>
      </div>
      <div className='flex flex-col md:flex-row 4xs:pt-10 2xs:pt-4 md:pt-10 lg:pt-10 xl:pt-20 4xs:pb-40 2xs:pb-30 md:pb-56 lg:pb-64 xl:pb-100'>
        <div className='flex flex-col 4xs:gap-2 md:gap-4 lg:gap-8 justify-center 4xs:w-full 2xs:w-50 md:w-70 lg:w-100 xl:w-200'>
          <p className='4xs:text-xl 2xs:text-[12px] md:text-2xl lg:text-4xl xl:text-[64px] text-white font-semibold text-shadow-lg text-left'>
            Smarter Healthcare Through Cleft Data
          </p>
          <p className='4xs:text-[12px] 2xs:text-[9px] md:text-[12px] lg:text-[18px] xl:text-2xl text-white font-semibold text-left'>
            Clypsera is Indonesia’s trusted source for cleft lip and palate case
            br data. Our platform provides accurate, accessible, and up-to-date
            information to support research, healthcare, and better outcomes for
            patients.
          </p>
        </div>
      </div>
    </>
  );
}
