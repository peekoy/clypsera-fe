'use server';

import CardAbout from '@/components/cards/Card-About';
import Image from 'next/image';

export default async function AboutPage() {
  return (
    <>
      <Image
        src='/aboout-us-hero.svg'
        alt='aboutus_hero'
        width={0}
        height={0}
        className='absolute top-0 -z-10 w-full'
      />
      <main className='relative'>
        <div className='container mx-auto px-4 py-16 text-center sm:px-6 sm:py-24 md:py-28 lg:px-8 lg:py-32 lg:text-left'>
          <div className='max-w-xl'>
            <p className='text-3xl font-bold text-white text-shadow-lg sm:text-4xl md:text-5xl lg:text-[64px]'>
              About Us
            </p>
            <p className='mt-4 text-base font-semibold text-white sm:text-lg md:text-xl lg:text-2xl'>
              Clypsera is a health data platform that focuses on collecting,
              managing, and sharing accurate, structured data on cleft lip and
              palate cases. We believe in the power of data to transform
              healthcare outcomes, especially for congenital conditions like
              cleft lip.
            </p>
          </div>
        </div>

        <div className='container mx-auto flex flex-col items-center gap-12 px-4 py-16 sm:px-6 md:flex-row md:gap-16 lg:px-8 lg:py-20'>
          <div className='w-full md:w-1/2'>
            <Image
              src='/receipt.svg'
              alt='receipt'
              width={450}
              height={300}
              className='h-auto w-full object-contain'
            />
          </div>
          <div className='w-full space-y-6 md:w-1/2'>
            <p className='primary-color text-3xl font-semibold text-shadow-lg sm:text-4xl md:text-5xl'>
              What We do?
            </p>
            <div className='flex flex-col gap-6'>
              <div>
                <p className='secondary-color text-lg font-bold sm:text-xl md:text-2xl'>
                  Data Collection & Management
                </p>
                <p className='text-base sm:text-lg md:text-xl'>
                  We gather clinical, operational, and visual data on cleft lip
                  patients, from pre-op to post-op stages.
                </p>
              </div>
              <div>
                <p className='secondary-color text-lg font-bold sm:text-xl md:text-2xl'>
                  Secure & Verified Access
                </p>
                <p className='text-base sm:text-lg md:text-xl'>
                  All shared data is reviewed and verified to ensure it meets
                  medical standards and ethical guidelines.
                </p>
              </div>
              <div>
                <p className='secondary-color text-lg font-bold sm:text-xl md:text-2xl'>
                  Support for Research & Policy
                </p>
                <p className='text-base sm:text-lg md:text-xl'>
                  Clypsera helps bridge data gaps in cleft care by providing
                  valuable insights for research and health planning.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className='relative py-16 sm:py-20'>
          <Image
            src='/about-us-foot.svg'
            alt='about us footer'
            width={800}
            height={500}
            className='absolute right-0 top-0 -z-10 h-full w-full object-cover'
          />
          <div className='container mx-auto flex flex-col items-center gap-12 px-4 sm:px-6 lg:flex-row lg:gap-20 lg:px-8'>
            <div className='w-full space-y-6 text-center lg:w-1/2 lg:text-left'>
              <p className='primary-color text-3xl font-semibold text-shadow-lg sm:text-4xl md:text-5xl'>
                Why It Matters?
              </p>
              <p className='font-mono text-lg sm:text-xl md:text-2xl'>
                Clypsera bridges the gap between clinical care and research by
                providing medical professionals and scientists with structured,
                accessible, and actionable patient data.
              </p>
            </div>
            <div className='w-full lg:w-1/2'>
              <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 md:gap-8'>
                <div className='space-y-4 sm:space-y-6 md:space-y-8'>
                  <CardAbout
                    description='Clinical Decision Support'
                    color='#4971a9'
                  />
                  <div className='sm:ml-4 md:ml-8'>
                    <CardAbout
                      description='Data-Driven Practice'
                      color='#4971a9'
                    />
                  </div>
                </div>
                <div className='mt-4 space-y-4 sm:mt-8 sm:space-y-6 md:mt-16 md:space-y-8'>
                  <CardAbout description='Accelerating Research' />
                  <div className='sm:ml-4 md:ml-8'>
                    <CardAbout description='Cross-Institutional Collaboration' />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
