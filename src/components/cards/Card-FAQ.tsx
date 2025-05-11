import { Card, CardContent, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

type CardFAQProps = {
  image: string;
  title: string;
  description: string;
};

export default function CardFAQ({ image, title, description }: CardFAQProps) {
  return (
    <div className='flex gap-8'>
      <Card className='bg-tertiary w-18 h-18 border-none z-20 flex items-center justify-center'>
        <CardContent>
          <div className='relative w-10 h-10'>
            <Image src={image} alt={title} fill />
          </div>
        </CardContent>
      </Card>
      <div className='flex flex-col'>
        <CardTitle className='text-lg font-blod tertiary-color'>
          {title}
        </CardTitle>
        <p className='text-lg leading-5 text-white'>{description}</p>
      </div>
    </div>
  );
}
