import CardFeature from './cards/Card-Feature';

export function Feature() {
  return (
    <>
      <div className='flex gap-12 items-center mb-10'>
        <div className='flex flex-col gap-12 mt-22'>
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
        <div className='flex flex-col gap-12'>
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
        <div className='flex flex-col gap-16'>
          <p className='text-[40px] font-bold secondary-color'>-FEATURES</p>
          <div className='flex flex-col gap-10'>
            <p className='text-5xl primary-color font-semibold'>
              Comprehensive Data <br />
              Accurate Insights
            </p>
            <p className='text-2xl font-medium'>
              Clypsera provides reliable, well-
              <br />
              structured data to support better policy-making and clinical
              decision-making in cleft lip and palate treatment. Our datasets
              are curated to meet the needs of healthcare professionals and
              researchers.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
