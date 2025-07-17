import Image from 'next/image';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='relative min-h-screen w-full bg-primary'>
      {children}
      <div className='absolute bottom-0 left-0 -z-0 w-full'>
        <Image
          src='/ombak1.svg'
          alt=''
          width={1920}
          height={300}
          className='w-full'
        />
        <Image
          src='/ombak2.svg'
          alt=''
          width={1920}
          height={300}
          className='absolute bottom-0 w-full'
        />
        <Image
          src='/ombak3.svg'
          alt=''
          width={1920}
          height={300}
          className='absolute bottom-0 w-full'
        />
      </div>
    </div>
  );
}
