import { Card, CardContent, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

type CardFAQProps = {
  image: string;
  title: string;
  description: string;
};

export default function CardFAQ({ image, title, description }: CardFAQProps) {
  return (
    <div className='flex 4xs:gap-2 2xs:gap-4 md:gap-6 lg:gap-8'>
      <Card className='bg-tertiary 4xs:w-10 4xs:h-10 2xs:w-10 2xs:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 xl:w-18 xl:h-18 border-none z-20 flex items-center justify-center'>
        <CardContent>
          <div className='relative 4xs:w-6 4xs:h-6 2xs:w-6 2xs:h-6 md:w-6 md:h-6 lg:w-8 lg:h-8 xl:w-10 xl:h-10'>
            <Image src={image} alt={title} fill />
          </div>
        </CardContent>
      </Card>
      <div className='flex flex-col'>
        <CardTitle className='4xs:text-[14px] 2xs:text-[8px] md:text-[12px] lg:text-lg xl:text-lg font-bold tertiary-color'>
          {title}
        </CardTitle>
        <p className='4xs:text-[12px] 2xs:text-[8px] md:text-[12px] lg:text-lg xl:text-lg leading-5 text-white'>
          {description}
        </p>
      </div>
    </div>
  );
}
