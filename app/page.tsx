import { Person, WithContext } from 'schema-dts';

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
  // get information
  const {
    about,
    frontend,
    backend,
    seooptimization,
    webdevelopment,
    contentcreation,
    education,
    experience,
    portfolioWithTags,
    miscellaneous,
    tool
  } = await getInformation();

  // create JSON-LD
  const jsonLd: WithContext<Person> = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Salimi',
    alternateName: 'Mohamad Salimi',
    url: 'https://www.salimi.my',
    image: 'https://www.salimi.my/salimi.png',
    jobTitle: miscellaneous
      ? miscellaneous.titles.map((title) => title.name)
      : ['Web Developer', 'Frontend Developer'],
    gender: 'Male',
    workLocation: 'Malaysia',
    description:
      'Salimi is an enthusiastic and passionate web developer based in Malaysia with more than half a decade of experience dedicated to deliver top-notch solutions and facilitate project success.',
    sameAs: [
      miscellaneous
        ? miscellaneous.facebookUrl
        : 'https://www.facebook.com/mysalimi',
      miscellaneous ? miscellaneous.twitterUrl : 'https://twitter.com/mysalimi',
      miscellaneous
        ? miscellaneous.linkedinUrl
        : 'https://www.linkedin.com/in/mohamad-salimi',
      miscellaneous ? miscellaneous.githubUrl : 'https://github.com/salimi-my',
      miscellaneous
        ? miscellaneous.instagramUrl
        : 'https://www.instagram.com/salimi.my'
    ]
  };

  return (
    <>
      {/* JSON-LD */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
        <Portfolio portfolioWithTags={portfolioWithTags} />
        <Tool tool={tool} />
        <Contact miscellaneous={miscellaneous} />
      </main>
      <Footer miscellaneous={miscellaneous} />
    </>
  );
}
