import { Card, CardContent } from '@/components/ui/card';

type CardAboutProps = {
  description: string;
  color?: string;
};

export default function CardAbout({ description, color }: CardAboutProps) {
  return color === '#4971a9' ? (
    <Card className='border-none bg-linear-to-b from-[#198AE5] to-[#4971A9] h-26 w-26 2xs:h-30 2xs:w-30 md:h-60 md:w-60 lg:h-40 lg:w-40 xl:h-50 xl:w-50 shadow-lg'>
      <CardContent className='flex flex-col justify-center items-center h-dvh'>
        <p className='text-white font-semibold 4xs:text-[12px] 2xs:text-[14px] md:text-xl lg:text-xl xl:text-2xl'>
          {description}
        </p>
      </CardContent>
    </Card>
  ) : (
    <Card className='border-4 border-white bg-transparent h-26 w-26 2xs:h-30 2xs:w-30 md:h-60 md:w-60 lg:h-40 lg:w-40 xl:h-50 xl:w-50 shadow-lg'>
      <CardContent className='flex flex-col justify-center items-center h-dvh'>
        <p className='primary-color font-semibold 4xs:text-[12px] 2xs:text-[14px] md:text-xl lg:text-xl xl:text-2xl'>
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
