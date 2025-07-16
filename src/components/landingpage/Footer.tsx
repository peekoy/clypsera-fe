'use server';
import Image from 'next/image';
import Link from 'next/link';

export async function Footer() {
  const year = new Date().getFullYear();
  return (
    <>
      <footer className='relative bg-secondary w-full 2xs:h-50 md:h-60 lg:h-70 xl:h-80'>
        <div className='absolute bg-white w-full h-10 z-30'></div>
        <div className='absolute bg-white w-full 2xs:h-40 md:h-50 lg:h-60 xl:h-70 z-10 rounded-bl-[100]'>
          <div className='flex gap-2 2xs:flex-col 2xs:mt-10 md:mt-16 lg:mt-20 xl:mt-28 2xs:ml-10 md:ml-20'>
            <Image
              src='/LOGO.svg'
              alt='clypsera-logo'
              width={152}
              height={152}
              className='2xs:w-[40px] md:w-[80px] lg:w-[110px] xl:w-[152px]'
            />
            <div className='flex flex-col gap-2 2xs:w-50 md:w-50 lg:w-70 xl:w-90 justify-center'>
              <p className='2xs:text-[10px] md:text-[10px] lg:text-[12px] xl:text-[15px] primary-color'>
                Clypsera provides accurate and organized data on cleft lip cases
                to support better healthcare and research.
              </p>
              <Link
                href='/about'
                className='2xs:text-[10px] md:text-[10px] lg:text-[12px] xl:text-[18px] font-bold primary-color'
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
        <div className='absolute right-6 2xs:w-50 md:w-88 lg:w-126 xl:w-170 2xs:h-20 md:h-30 lg:h-40 xl:h-50 bg-secondary rounded-full z-20'></div>
        <div className='absolute right-0 2xs:w-50 md:w-86 lg:w-120 xl:w-160 2xs:h-30 md:h-40 lg:h-50 xl:h-60 bg-primary rounded-tl-full rounded-bl-full z-20'>
          <div className='grid grid-cols-3 2xs:gap-2 lg:gap-4 2xs:mt-12 md:mt-14 xl:mt-20 2xs:ml-8 md:ml-14 lg:ml-20 xl:ml-28 text-white'>
            <div className='col-span-3 grid grid-cols-subgrid 2xs:gap-2 lg:gap-4 font-bold 2xs:text-[8px] md:text-[12px] lg:text-[16px]'>
              <p>Partner</p>
              <p>Legal</p>
              <p>Help</p>
            </div>
            <div className='2xs:text-[8px] md:text-[12px] lg:text-[16px]'>
              <Link href='#'>Affiliates</Link>
            </div>
            <div className='2xs:text-[8px] md:text-[12px] lg:text-[16px]'>
              <Link href='/privacy'>Privacy</Link>
            </div>
            <div className='2xs:text-[8px] md:text-[12px] lg:text-[16px]'>
              <Link href='/login'>Log In</Link>
            </div>
            <div className='col-span-3 grid grid-cols-subgrid md:gap-2 lg:gap-4'>
              <div className='col-start-2 2xs:text-[8px] md:text-[12px] lg:text-[16px]'>
                <Link href='/terms'>Terms</Link>
              </div>
              <div className='2xs:text-[8px] md:text-[12px] lg:text-[16px]'>
                <Link href='/support'>Support</Link>
              </div>
            </div>
          </div>
        </div>
        <div className='absolute bottom-2 w-full flex justify-center'>
          <p className='text-white 2xs:text-[10px] md:text-[12px] text-[15px]'>
            © {year} Clypsera. HUMIC Enginnering All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
