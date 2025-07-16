'use server';

import Image from 'next/image';
import { Hero } from '@/components/landingpage/Hero';
import { Feature } from '@/components/landingpage/Feature';
import { FAQ } from '@/components/landingpage/FAQ';
import { News } from '@/components/landingpage/News';

export default async function LandingPage() {
  return (
    <main className='relative'>
      <div className='absolute 4xs:top-[76%] 2xs:top-[78%] md:top-[80%] xl:top-[82%] w-full flex justify-between -z-10'>
        <Image
          src='/buletan-kiri.svg'
          alt=''
          width={0}
          height={0}
          className='4xs:w-[100px] 2xs:w-[200px] md:w-[300px] lg:w-[400px] xl:w-[500px]'
        />
        <Image
          src='/buletan-kanan.svg'
          alt=''
          width={0}
          height={0}
          className='4xs:w-[100px] 2xs:w-[200px] md:w-[300px] lg:w-[400px] xl:w-[500px]'
        />
      </div>

      <div className='container mx-auto px-10 md:px-20 lg:px-30'>
        <Hero />
        <section id='feature'>
          <Feature />
        </section>
        <section id='faq'>
          <FAQ />
        </section>
        <section id='news'>
          <News />
        </section>
      </div>
    </main>
  );
}
