import { Header } from '@/components/landingpage/Header';
import { Footer } from '@/components/landingpage/Footer';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <div>{children}</div>
      <Footer />
    </div>
  );
}
