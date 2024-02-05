import Nav from '@/components/landing/nav';
import Tool from '@/components/landing/tool';
import Footer from '@/components/main/footer';
import About from '@/components/landing/about';
import getInformation from '@/data/information';
import Header from '@/components/landing/header';
import Contact from '@/components/landing/contact';
import { ModeToggle } from '@/components/mode-toggle';
import Expertise from '@/components/landing/expertise';
import Portfolio from '@/components/landing/portfolio';
import Experience from '@/components/landing/experience';
import Qualification from '@/components/landing/qualification';

export default async function HomePage() {
  const {
    about,
    frontend,
    backend,
    seooptimization,
    webdevelopment,
    contentcreation,
    education,
    experience,
    portfolioWithBlur,
    miscellaneous,
    tool
  } = await getInformation();

  return (
    <>
      <div className='sticky z-30 top-5 w-full flex justify-end px-5'>
        <ModeToggle />
      </div>
      <Nav />
      <main className='container px-4 md:px-8 mx-auto relative -mt-14 overflow-x-hidden'>
        <Header miscellaneous={miscellaneous} />
        <About about={about} />
        <Experience frontend={frontend} backend={backend} />
        <Expertise
          seooptimization={seooptimization}
          webdevelopment={webdevelopment}
          contentcreation={contentcreation}
        />
        <Qualification education={education} experience={experience} />
        <Portfolio portfolioWithBlur={portfolioWithBlur} />
        <Tool tool={tool} />
        <Contact miscellaneous={miscellaneous} />
      </main>
      <Footer miscellaneous={miscellaneous} />
    </>
  );
}
