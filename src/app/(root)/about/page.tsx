'use server';

import CardAbout from '@/components/cards/Card-About';
import Image from 'next/image';

export default async function AboutPage() {
  return (
    <>
      <div className='absolute left-0 4xs:bottom-[3%]  -z-10 h-full w-full'>
        <div className='block 2xs:hidden h-100 w-full relative'>
          <Image
            src='/aboout-us-hero.svg'
            alt='aboutus_hero'
            fill
            className='object-cover'
          />
        </div>

        <div className='hidden 2xs:block'>
          <Image
            src='/aboout-us-hero.svg'
            alt='aboutus_hero'
            width={0}
            height={0}
            className='absolute top-0 -z-10 w-full'
          />
        </div>
      </div>
      <main className='relative'>
        <div className='container mx-auto px-4 pt-10 pb-50 text-center sm:px-6 2xs:pt-3 2xs:pb-10 md:px-18 md:pt-10 md:pb-40 lg:px-16 lg:pt-20 lg:pb-50 xl:pt-40 xl:pb-80 text-left'>
          <div className='2xs:w-70 md:w-90 lg:w-150'>
            <p className='text-xl font-bold text-white text-shadow-lg 2xs:text-[16px] md:text-3xl lg:text-5xl xl:text-[64px]'>
              About Us
            </p>
            <p className='2xs:mt-0 md:mt-4 text-base font-semibold text-white text-[12px] 2xs:text-[10px] md:text-[14px] lg:text-lg xl:text-2xl'>
              Clypsera is a health data platform that focuses on collecting,
              managing, and sharing accurate, structured data on cleft lip and
              palate cases. We believe in the power of data to transform
              healthcare outcomes, especially for congenital conditions like
              cleft lip.
            </p>
          </div>
        </div>

        <div className='container mx-auto flex flex-col items-center gap-6 px-4 py-16 sm:px-6 md:flex-row md:gap-16 lg:px-8 lg:py-20'>
          <div className='flex justify-center w-full md:w-1/2'>
            <Image
              src='/receipt.svg'
              alt='receipt'
              width={450}
              height={300}
              className='w-[180px] 2xs:w-[200px] md:h-auto md:w-full object-contain'
            />
          </div>
          <div className='w-full md:space-y-4 lg:space-y-6 md:w-1/2'>
            <p className='primary-color text-3xl font-semibold text-shadow-lg 2xs:text-2xl md:text-2xl lg:text-5xl'>
              What We do?
            </p>
            <div className='flex flex-col md:gap-4 lg:gap-6'>
              <div>
                <p className='secondary-color text-lg font-bold 2xs:text-lg md:text-[18px] lg:text-2xl'>
                  Data Collection & Management
                </p>
                <p className='text-base 2xs:text-sm md:text-[16px] lg:text-xl'>
                  We gather clinical, operational, and visual data on cleft lip
                  patients, from pre-op to post-op stages.
                </p>
              </div>
              <div>
                <p className='secondary-color text-lg font-bold 2xs:text-lg md:text-[18px] lg:text-2xl'>
                  Secure & Verified Access
                </p>
                <p className='text-base 2xs:text-sm md:text-[16px] lg:text-xl'>
                  All shared data is reviewed and verified to ensure it meets
                  medical standards and ethical guidelines.
                </p>
              </div>
              <div>
                <p className='secondary-color text-lg font-bold 2xs:text-lg md:text-[18px] lg:text-2xl'>
                  Support for Research & Policy
                </p>
                <p className='text-base 2xs:text-sm md:text-[16px] lg:text-xl'>
                  Clypsera helps bridge data gaps in cleft care by providing
                  valuable insights for research and health planning.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className='relative py-10 sm:py-40 md:py-20 lg:py-20 xl:py-40'>
          <Image
            src='/about-us-foot.svg'
            alt='about us footer'
            width={0}
            height={0}
            className='absolute right-0 top-[48%] 2xs:top-[26%] md:top-[24%] lg:top-0 -z-10 w-full lg:w-[600px] xl:w-[800px]'
          />
          <div className='container mx-auto flex flex-col items-center gap-12 px-4 sm:px-6 lg:flex-row lg:gap-20 lg:px-8'>
            <div className='w-full space-y-6 text-center lg:w-1/2 text-left'>
              <p className='primary-color text-3xl font-semibold text-shadow-lg 2xs:text-2xl md:text-3xl lg:text-3xl xl:text-5xl'>
                Why It Matters?
              </p>
              <p className='font-mono text-lg 2xs:text-sm md:text-xl lg:text-xl xl:text-2xl'>
                Clypsera bridges the gap between clinical care and research by
                providing medical professionals and scientists with structured,
                accessible, and actionable patient data.
              </p>
            </div>
            <div className='w-full lg:w-1/2'>
              <div className='grid grid-cols-1 gap-4 4xs:ml-4 2xs:ml-10 md:ml-0 4xs:grid-cols-2 sm:gap-6 md:gap-8'>
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
