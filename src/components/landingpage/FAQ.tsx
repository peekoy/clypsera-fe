'use server';

import CardFAQ from '../cards/Card-FAQ';
import Image from 'next/image';

export async function FAQ() {
  return (
    <>
      <div className='absolute z-10 2xs:right-10 md:right-14 lg:right-24 xl:right-30 2xs:mt-6 md:-mt-0 lg:-mt-18 xl:-mt-28'>
        <Image
          src='/tanda-tanya.svg'
          alt='Background network'
          width={400}
          height={300}
          className='2xs:w-[120px] md:w-[230px] lg:w-[300px] xl:w-[400px]'
        />
      </div>
      <div className='absolute z-10 mt-42 ml-10'>
        <Image
          src='/nodes.png'
          alt='Background network'
          width={800}
          height={500}
          className='2xs:w-[400px] md:w-[560px] lg:w-[640px] xl:w-[800px]'
        />
      </div>
      <div className='2xs:pt-20 md:pt-28 lg:pt-16 xl:pt-20 2xs:my-10 md:my-20 lg:my-40 xl:my-64'>
        <div className='lg:h-130 xl:h-150 bg-radial from-[#198AE5] from-9% to-[#4971A9] rounded-[50px]'>
          <div className='flex flex-col 2xs:gap-4 md:gap-6 lg:gap-8 2xs:px-6 md:px-12 lg:px-16 xl:px-32 2xs:py-6 md:py-8 lg:py-12 xl:py-16 z-20 w-full h-full'>
            <p className='2xs:text-[12px] md:text-2xl lg:text-4xl xl:text-5xl font-semibold text-white text-shadow-lg'>
              Everything You Need to{' '}
              <span className='tertiary-color'>Know.</span>
            </p>
            <CardFAQ
              image='/icon-tanda-tanya.svg'
              title='How can I contribute data?'
              description='First, make sure you have a registered account. Then, submit your data to the committee for verification. Once verified, the operator will publish your data on the platform.'
            />
            <CardFAQ
              image='/icon-tanda-tanya.svg'
              title='How do I access the data?'
              description='To access the data, you must log in with your account. If you don’t have one, please register first.'
            />
            <CardFAQ
              image='/icon-tanda-tanya.svg'
              title='How do I register an account?'
              description='You can create an account directly from the login page. Simply click "Sign Up" and follow the instructions.'
            />
            <CardFAQ
              image='/icon-tanda-tanya.svg'
              title='What access do regular users have?'
              description='Regular users can only view cleft lip case data without editing or submitting information.'
            />
          </div>
        </div>
      </div>
    </>
  );
}
