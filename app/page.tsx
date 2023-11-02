import Tool from '@/components/landing/tool';
import About from '@/components/landing/about';
import Header from '@/components/landing/header';
import Contact from '@/components/landing/contact';
import { ModeToggle } from '@/components/mode-toggle';
import Expertise from '@/components/landing/expertise';
import Portfolio from '@/components/landing/portfolio';
import Experience from '@/components/landing/experience';
import Qualification from '@/components/landing/qualification';

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
        <Qualification />
        <Portfolio />
        <Tool />
        <Contact />
      </main>
    </>
  );
}
