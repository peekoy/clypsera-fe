'use server';
import Image from 'next/image';
import Link from 'next/link';

export async function Footer() {
  const year = new Date().getFullYear();
  return (
    <>
      <footer className='relative bg-secondary w-full h-80'>
        <div className='absolute bg-white w-full h-10 z-30'></div>
        <div className='absolute bg-white w-full h-70 z-10 rounded-bl-[100]'>
          <div className='flex gap-2 mt-28 ml-20'>
            <Image
              src='/LOGO.svg'
              alt='clypsera-logo'
              width={152}
              height={152}
            />
            <div className='flex flex-col gap-2 w-100 justify-center'>
              <p className='text-[15px] primary-color'>
                Clypsera provides accurate and organized data on cleft <br />{' '}
                lip cases to support better healthcare and research.
              </p>
              <Link href='#' className='font-bold primary-color'>
                Learn More
              </Link>
            </div>
          </div>
        </div>
        <div className='absolute right-6 w-170 h-50 bg-secondary rounded-full z-20'></div>
        <div className='absolute right-0 w-160 h-60 bg-primary rounded-tl-full rounded-bl-full z-20'>
          <div className='grid grid-cols-3 gap-4 mt-20 ml-28 text-white'>
            <div className='col-span-3 grid grid-cols-subgrid gap-4 font-bold'>
              <p>Partner</p>
              <p>Legal</p>
              <p>Help</p>
            </div>
            <div>
              <Link href='#'>Affiliates</Link>
            </div>
            <div>
              <Link href='#'>Privacy</Link>
            </div>
            <div>
              <Link href='#'>Log In</Link>
            </div>
            <div className='col-span-3 grid grid-cols-subgrid gap-4'>
              <div className='col-start-2'>
                <Link href='#'>Terms</Link>
              </div>
              <div>
                <Link href='#'>Support</Link>
              </div>
            </div>
          </div>
        </div>
        <div className='absolute bottom-2 w-full flex justify-center'>
          <p className='text-white text-[15px]'>
            © {year} Clypsera. HUMIC Enginnering All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
