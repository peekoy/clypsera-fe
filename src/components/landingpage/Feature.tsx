'use server';
import CardFeature from '../cards/Card-Feature';

export async function Feature() {
  return (
    <>
      <div className='flex items-center flex-col-reverse lg:flex-row xl:flex-row 4xs:gap-4 2xs:gap-0 lg:gap-8 xl:gap-12 4xs:mb-20 2xs:mb-10 lg:mb-6 xl:mb-10'>
        <div className='flex 4xs:flex-col 2xs:flex-row 4xs:gap-4 2xs:gap-4 md:gap-8 xl:gap-12 items-center lg:mb-6 xl:mb-10'>
          <div className='flex flex-col 4xs:gap-4 2xs:gap-4 md:gap-8 lg:gap-8 xl:gap-12 2xs:mt-8 md:mt-10 lg:mt-16 xl:mt-22'>
            <CardFeature
              image='/surgical-data.svg'
              title='Surgical Data'
              description='Includes operator name, surgical techniques used, location of the procedure, and more.'
              color='#ffffff'
            />
            <CardFeature
              image='/medical-history.svg'
              title='Medical History'
              description='Includes patient family history, maternal pregnancy history, and other relevant health information.'
            />
          </div>
          <div className='flex flex-col-reverse 4xs:gap-4 2xs:gap-4 md:gap-8 lg:gap-8 xl:gap-12'>
            <CardFeature
              image='/patient-data.svg'
              title='Patient Data'
              description='Includes patient name, age, gender, birth order, and other demographic information.'
            />
            <CardFeature
              image='/clinical-photo.svg'
              title='Clinical Photographs'
              description='Includes pre-operative, intra-operative, and post-operative photos of cleft lip patients.'
              color='#ffffff'
            />
          </div>
        </div>

        <div className='flex flex-col md:gap-2 lg:gap-10 lg:mt-10'>
          <p className='4xs:text-xl 2xs:text-[14px] md:text-[20px] lg:text-[30px] xl:text-[40px] font-bold secondary-color'>
            -FEATURES
          </p>
          <p className='4xs:text-xl 2xs:text-[14px] md:text-[20px] lg:text-3xl xl:text-5xl primary-color font-semibold'>
            Comprehensive Data Accurate Insights
          </p>
          <p className='4xs:text-[12px] 2xs:text-[10px] md:text-[14px] lg:text-lg xl:text-2xl font-medium'>
            Clypsera provides reliable, well structured data to support better
            policy-making and clinical decision-making in cleft lip and palate
            treatment. Our datasets are curated to meet the needs of healthcare
            professionals and researchers.
          </p>
        </div>
      </div>
    </>
  );
}
