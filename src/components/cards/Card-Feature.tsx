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
    <Card className='bg-white w-90 shadow-md'>
      <CardContent className='flex flex-col justify-center items-center'>
        <div className='relative w-24 h-24 mb-2'>
          <Image src={image} alt={title} fill className='object-cover' />
        </div>
        <CardTitle className='text-2xl'>{title}</CardTitle>
        <p className='text-xl text-center'>{description}</p>
      </CardContent>
    </Card>
  ) : (
    <Card className='bg-gradient-to-br from-[#198AE5] to-[#4971A9] w-90 shadow-md'>
      <CardContent className='flex flex-col justify-center items-center'>
        <div className='relative w-24 h-24 mb-2'>
          <Image src={image} alt={title} fill className='object-cover' />
        </div>
        <CardTitle className='text-white text-2xl'>{title}</CardTitle>
        <p className='text-white text-xl text-center'>{description}</p>
      </CardContent>
    </Card>
  );
}
