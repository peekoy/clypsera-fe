import Image from 'next/image';

export default function AboutPage() {
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
        <div className='w-160 mt-28 ml-60 pb-101'>
          <p className='text-white text-[64px] font-bold text-shadow-lg'>
            About Us
          </p>
          <p className='text-white text-2xl font-semibold'>
            Clypsera is a health data platform that focuses on collecting,
            managing, and sharing accurate, structured data on cleft lip and
            palate cases. We believe in the power of data to transform
            healthcare outcomes, especially for congenital conditions like cleft
            lip.
          </p>
        </div>
        <div className='flex justify-between py-40 px-30'>
          <Image src='/receipt.svg' alt='receipt' width={450} height={0} />
          <div className='space-y-10'>
            <p className='text-5xl font-semibold primary-color text-shadow-lg'>
              What We do?
            </p>
            <div className='flex flex-col gap-4 w-170'>
              <p className='text-2xl font-bold secondary-color'>
                Data Collection & Management
              </p>
              <p className='text-2xl'>
                We gather clinical, operational, and visual data on cleft lip
                patients, from pre-op to post-op stages.
              </p>
              <p className='text-2xl font-bold secondary-color'>
                Secure & Verified Access
              </p>
              <p className='text-2xl'>
                All shared data is reviewed and verified to ensure it meets
                medical standards and ethical guidelines.
              </p>
              <p className='text-2xl font-bold secondary-color'>
                Support for Research & Policy
              </p>
              <p className='text-2xl'>
                Clypsera helps bridge data gaps in cleft care by providing
                valuable insights for research and health planning.
              </p>
            </div>
          </div>
        </div>
        <div className='relative pb-216'>
          <Image
            src='/about-us-foot.svg'
            alt='about us footer'
            width={712}
            height={0}
            className='absolute right-0 z-40'
          />
          <div className='absolute z-50 shadow-2xl bg-linear-to-t from-[#4F959D]/75 to-[#98D2C0] w-230 h-120 rounded-3xl ml-20 mt-45 p-26'>
            <div className='space-y-14'>
              <p className='text-white text-5xl font-semibold text-shadow-lg'>
                Why It <span className='primary-color'>Matters?</span>
              </p>
              <p className='text-white text-2xl font-mono'>
                Cleft lip and palate treatment requires accurate diagnosis,
                careful planning, and long-term care. With Clypsera,
                professionals gain access to detailed patient data that can
                improve surgical outcomes, advance research, and guide better
                policies.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
