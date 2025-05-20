import Image from 'next/image';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className='bg-primary h-dvh'>
        {children}
        <Image
          src='/ombak1.svg'
          alt=''
          width={0}
          height={0}
          className='w-full absolute bottom-0'
        />
        <Image
          src='/ombak2.svg'
          alt=''
          width={0}
          height={0}
          className='w-full absolute bottom-0'
        />
        <Image
          src='/ombak3.svg'
          alt=''
          width={0}
          height={0}
          className='w-full absolute bottom-0'
        />
      </div>
    </>
  );
}
