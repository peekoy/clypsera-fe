import { Card, CardContent, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

type CardFeatureProps = {
  image: string;
  title: string;
  description: string;
  color?: string;
};

export default function CardFeature({
  image,
  title,
  description,
  color,
}: CardFeatureProps) {
  return color === '#ffffff' ? (
    <Card className='bg-white 2xs:w-40 md:w-50 lg:w-60 xl:w-90 shadow-md'>
      <CardContent className='flex flex-col justify-center items-center'>
        <div className='relative 2xs:w-10 2xs:h-10 md:w-14 md:h-14 lg:w-20 lg:h-20 xl:w-24 xl:h-24 mb-2'>
          <Image src={image} alt={title} fill className='object-cover' />
        </div>
        <CardTitle className='2xs:text-[12px] md:text-[14px] lg:text-lg xl:text-2xl text-center'>
          {title}
        </CardTitle>
        <p className='2xs:text-[10px] md:text-[12px] lg:text-sm xl:text-xl text-center'>
          {description}
        </p>
      </CardContent>
    </Card>
  ) : (
    <Card className='bg-gradient-to-br from-[#198AE5] to-[#4971A9] 2xs:w-40 md:w-50 lg:w-60 xl:w-90 shadow-md'>
      <CardContent className='flex flex-col justify-center items-center'>
        <div className='relative 2xs:w-10 2xs:h-10 md:w-14 md:h-14 lg:w-20 lg:h-20 xl:w-24 xl:h-24 mb-2'>
          <Image src={image} alt={title} fill className='object-cover' />
        </div>
        <CardTitle className='text-white 2xs:text-[12px] md:text-[14px] lg:text-lg xl:text-2xl'>
          {title}
        </CardTitle>
        <p className='text-white 2xs:text-[10px] md:text-[12px] lg:text-sm lg:text-sm xl:text-xl text-center'>
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
