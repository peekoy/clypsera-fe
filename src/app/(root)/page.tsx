import Image from 'next/image';
import { Hero } from '@/components/Hero';
import { Feature } from '@/components/Feature';

export default function LandingPage() {
  return (
    <main className='container mx-auto px-30'>
      <Hero />
      <Feature />
    </main>
  );
}
