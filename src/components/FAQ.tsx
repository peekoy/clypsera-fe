'use server';

import CardFAQ from './cards/Card-FAQ';
import Image from 'next/image';

export async function FAQ() {
  return (
    <>
      <div className='absolute right-30 z-10 -mt-28'>
        <Image
          src='/tanda-tanya.svg'
          alt='Background network'
          width={400}
          height={300}
        />
      </div>
      <div className='absolute z-10 mt-42 ml-10'>
        <Image
          src='/nodes.png'
          alt='Background network'
          width={800}
          height={500}
        />
      </div>
      <div className='pt-20 my-64'>
        <div className='h-150 bg-radial from-[#198AE5] from-9% to-[#4971A9] rounded-[50px]'>
          <div className='flex flex-col gap-8 px-32 py-16 z-20 w-full h-full'>
            <p className='text-5xl font-semibold text-white text-shadow-lg'>
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
