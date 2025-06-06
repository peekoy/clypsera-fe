'use server';

import Image from 'next/image';
import { Hero } from '@/components/landingpage/Hero';
import { Feature } from '@/components/landingpage/Feature';
import { FAQ } from '@/components/landingpage/FAQ';
import { News } from '@/components/landingpage/News';

export default async function LandingPage() {
  return (
    <main className='relative'>
      <div className='absolute top-[82%] w-full flex justify-between -z-10'>
        <Image src='/buletan-kiri.svg' alt='' width={500} height={500} />
        <Image src='/buletan-kanan.svg' alt='' width={500} height={500} />
      </div>

      <div className='container mx-auto px-30'>
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
