import About from '@/components/landing/about';
import Header from '@/components/landing/header';
import { ModeToggle } from '@/components/mode-toggle';

export default function Home() {
  return (
    <>
      <div className='absolute top-5 right-5'>
        <ModeToggle />
      </div>
      <main className='container mx-auto relative'>
        <Header />
        <About />
      </main>
    </>
  );
}
