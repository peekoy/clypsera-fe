// src/components/landingpage/Footer.tsx

'use server';
import Image from 'next/image';
import Link from 'next/link';

export async function Footer() {
  const year = new Date().getFullYear();
  return (
    <>
      <footer className='relative bg-secondary w-full 4xs:h-80 2xs:h-50 md:h-60 lg:h-70 xl:h-80'>
        <div className='absolute bg-white w-full h-10 z-30'></div>
        <div className='absolute bg-white w-full 4xs:h-70 2xs:h-40 md:h-50 lg:h-60 xl:h-70 z-10 rounded-bl-[100px]'>
          <div className='flex gap-2 4xs:flex-col 4xs:mt-20 2xs:flex-row 2xs:mt-10 md:mt-16 lg:mt-20 xl:mt-28 4xs:ml-6 2xs:ml-10 md:ml-20'>
            <Image
              src='/LOGO.svg'
              alt='clypsera-logo'
              width={152}
              height={152}
              className='4xs:w-[60px] 2xs:w-[40px] md:w-[80px] lg:w-[110px] xl:w-[152px]'
            />
            <div className='flex flex-col gap-2 4xs:w-40 2xs:w-50 md:w-50 lg:w-70 xl:w-90 justify-center'>
              <p className='4xs:text-[10px] 2xs:text-[10px] md:text-[10px] lg:text-[12px] xl:text-[15px] primary-color'>
                Clypsera provides accurate and organized data on cleft lip cases
                to support better healthcare and research.
              </p>
              <Link
                href='/about'
                className='4xs:text-[10px] 2xs:text-[10px] md:text-[10px] lg:text-[12px] xl:text-[18px] font-bold primary-color'
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
        <div className='absolute right-6 4xs:w-38 2xs:w-50 md:w-88 lg:w-126 xl:w-170 4xs:h-40 2xs:h-20 md:h-30 lg:h-40 xl:h-50 bg-secondary rounded-full z-20'></div>
        <div className='absolute right-0 4xs:w-34 2xs:w-50 md:w-86 lg:w-120 xl:w-160 4xs:h-62 2xs:h-30 md:h-40 lg:h-50 xl:h-60 bg-primary rounded-tl-full rounded-bl-full z-20'>
          {/* --- PERUBAIKAN DIMULAI DI SINI --- */}
          <div className='grid 4xs:grid-cols-1 2xs:grid-cols-3 4xs:gap-y-2 md:gap-4 4xs:mt-12 2xs:mt-12 md:mt-14 xl:mt-20 4xs:ml-20 2xs:ml-8 md:ml-14 lg:ml-20 xl:ml-28 text-white 4xs:text-[12px] 2xs:text-[8px] md:text-[12px] lg:text-[16px]'>
            {/* Kolom Partner */}
            <div className='flex flex-col gap-1'>
              <p className='font-bold'>Partner</p>
              <Link href='/affiliates'>Affiliates</Link>
            </div>

            {/* Kolom Legal */}
            <div className='flex flex-col gap-1'>
              <p className='font-bold'>Legal</p>
              <Link href='/privacy'>Privacy</Link>
              <Link href='/terms'>Terms</Link>
            </div>

            {/* Kolom Help */}
            <div className='flex flex-col gap-1'>
              <p className='font-bold'>Help</p>
              <Link href='/login'>Log In</Link>
              <Link href='/support'>Support</Link>
            </div>
          </div>
          {/* --- PERBAIKAN SELESAI DI SINI --- */}
        </div>
        <div className='absolute bottom-2 w-full flex justify-center'>
          <p className='text-white 4xs:text-[10px] 2xs:text-[10px] md:text-[12px] text-[15px]'>
            © {year} Clypsera. HUMIC Enginnering All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
