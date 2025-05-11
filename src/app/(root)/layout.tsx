import { Header } from '@/components/Header';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      <div>{children}</div>
    </div>
  );
}
