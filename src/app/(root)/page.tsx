import Image from 'next/image';
import { Hero } from '@/components/Hero';
import { Feature } from '@/components/Feature';
import { FAQ } from '@/components/FAQ';
import { News } from '@/components/News';

export default function LandingPage() {
  return (
    <main className='relative'>
      <div className='absolute top-[82%] w-full flex justify-between -z-10'>
        <Image src='/buletan-kiri.svg' alt='' width={500} height={500} />
        <Image src='/buletan-kanan.svg' alt='' width={500} height={500} />
      </div>

      <div className='container mx-auto px-30'>
        <Hero />
        <Feature />
        <FAQ />
        <News />
      </div>
    </main>
  );
}
