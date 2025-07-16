import { Card, CardContent, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

type CardNewsProps = {
  id: number;
  image: string;
  title: string;
  description: string;
  source: string; // Pastikan 'source' ada di dalam props
};

export default function CardNews({
  id,
  image,
  title,
  description,
  source,
}: CardNewsProps) {
  const newsUrl = source;

  return (
    <div className='flex'>
      <Card className='2xs:h-80 md:h-100 lg:h-120 xl:h-140 flex flex-col gap-0 bg-white w-100 py-0 shadow-md overflow-hidden'>
        <CardContent className='p-0'>
          <Link href={newsUrl} target='_blank' rel='noopener noreferrer'>
            <div className='relative w-full 2xs:h-30 md:h-40 lg:h-60 cursor-pointer'>
              <Image src={image} alt={title} fill className='object-cover' />
            </div>
          </Link>
        </CardContent>
        <div className='flex flex-col flex-1 gap-4 p-6'>
          <Link href={newsUrl} target='_blank' rel='noopener noreferrer'>
            <CardTitle className='2xs:text-[12px] md:text-[16px] lg:text-lg xl:text-xl font-bold hover:underline cursor-pointer'>
              {title}
            </CardTitle>
          </Link>
          <p className='2xs:text-[10px] md:text-[12px] xl:text-sm text-gray-600 line-clamp-4'>
            {description}
          </p>
        </div>
      </Card>
    </div>
  );
}
