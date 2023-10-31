import About from '@/components/landing/about';
import Header from '@/components/landing/header';
import { ModeToggle } from '@/components/mode-toggle';
import Expertise from '@/components/landing/expertise';
import Experience from '@/components/landing/experience';

export default function Home() {
  return (
    <>
      <div className='absolute top-5 right-5'>
        <ModeToggle />
      </div>
      <main className='container px-4 md:px-8 mx-auto relative'>
        <Header />
        <About />
        <Experience />
        <Expertise />
      </main>
    </>
  );
}
