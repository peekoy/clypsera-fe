import { Card, CardContent, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

type CardNewsProps = {
  image: string;
  title: string;
  description: string;
};

export default function CardNews({ image, title, description }: CardNewsProps) {
  return (
    <div className='flex'>
      <Card className='h-140 gap-0 bg-white w-100 py-0 shadow-md'>
        <CardContent className='px-0'>
          <div className='relative w-full h-60'>
            <Image src={image} alt={title} fill />
          </div>
        </CardContent>
        <div className='flex flex-col gap-8 px-10'>
          <CardTitle className='text-xl font-bold'>{title}</CardTitle>
          <p className='text-sm'>{description}</p>
        </div>
      </Card>
    </div>
  );
}
