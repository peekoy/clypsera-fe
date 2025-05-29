import { Card, CardContent, CardTitle } from '@/components/ui/card';

type CardAboutProps = {
  description: string;
  color?: string;
};

export default function CardAbout({ description, color }: CardAboutProps) {
  return color === '#4971a9' ? (
    <Card className='border-none bg-linear-to-b from-[#198AE5] to-[#4971A9] h-50 w-50 shadow-lg'>
      <CardContent className='flex flex-col justify-center items-center h-dvh'>
        <p className='text-white font-semibold text-2xl'>{description}</p>
      </CardContent>
    </Card>
  ) : (
    <Card className='border-4 border-white bg-transparent h-50 w-50 shadow-lg'>
      <CardContent className='flex flex-col justify-center items-center h-dvh'>
        <p className='primary-color font-semibold text-2xl'>{description}</p>
      </CardContent>
    </Card>
  );
}
