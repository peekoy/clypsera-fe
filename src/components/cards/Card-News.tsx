import { Card, CardContent, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

type CardNewsProps = {
  id: number;
  image: string;
  title: string;
  description: string;
  source: string;
};

export default function CardNews({
  image,
  title,
  description,
  source,
}: CardNewsProps) {
  const newsUrl = source;

  return (
    <div className='flex h-full'>
      <Card className='flex 4xs:h-80 2xs:h-80 md:h-100 lg:h-120 xl:h-140 flex-col gap-0 bg-white w-full py-0 shadow-md overflow-hidden'>
        <CardContent className='p-0'>
          <Link href={newsUrl} target='_blank' rel='noopener noreferrer'>
            <div className='relative w-full 4xs:h-30 md:h-40 lg:h-60 cursor-pointer'>
              <Image src={image} alt={title} fill className='object-cover' />
            </div>
          </Link>
        </CardContent>
        <div className='flex flex-col flex-1 gap-4 4xs:p-2 2xs:p-6'>
          <Link href={newsUrl} target='_blank' rel='noopener noreferrer'>
            <CardTitle className='4xs:text-[12px] 2xs:text-[12px] md:text-[16px] lg:text-lg xl:text-xl font-bold hover:underline cursor-pointer'>
              {title}
            </CardTitle>
          </Link>
          <p className='4xs:text-[10px] 2xs:text-[10px] md:text-[12px] xl:text-sm text-gray-600 line-clamp-4'>
            {description}
          </p>
        </div>
      </Card>
    </div>
  );
}
