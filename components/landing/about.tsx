import Image from 'next/image';
import Link from 'next/link';
import { Briefcase, FolderGit2, Laptop } from 'lucide-react';

import { Button } from '@/components/ui/button';
import profileBg from '@/public/web-developer-bg.jpg';

export default function About() {
  return (
    <section id='about' className='md:mt-32'>
      <h1 className='text-center text-sm text-muted-foreground font-medium'>
        Get To Know
      </h1>
      <h2 className='text-center text-2xl font-medium pt-1'>About Me</h2>
      <div className='grid lg:grid-cols-7 gap-12 md:gap-24 lg:gap-48 pt-12'>
        <div className='lg:col-span-3 w-4/5 md:w-1/2 mx-auto lg:w-full aspect-square rounded-2xl bg-gradient-to-tr from-transparent via-primary to-transparent'>
          <div className='rounded-2xl overflow-hidden rotate-[10deg] transition duration-300 ease-in-out hover:rotate-0 relative'>
            <Image src={profileBg} alt='about' priority />
          </div>
        </div>
        <div className='lg:col-span-4 flex flex-col gap-8'>
          <div className='grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-7'>
            <article className='w-full rounded-2xl flex flex-col items-center bg-primary group hover:bg-primary-foreground transition-colors duration-300 ease-in-out border border-primary py-6 px-0 md:p-8'>
              <Briefcase className='w-6 h-6 text-primary-foreground group-hover:text-primary mb-4' />
              <h3 className='text-base text-primary-foreground group-hover:text-primary pb-2'>
                Experience
              </h3>
              <small className='text-xs font-normal text-muted-foreground'>
                4+ Years Working
              </small>
            </article>
            <article className='w-full rounded-2xl flex flex-col items-center bg-primary group hover:bg-primary-foreground transition-colors duration-300 ease-in-out border border-primary py-6 px-0 md:p-8'>
              <FolderGit2 className='w-6 h-6 text-primary-foreground group-hover:text-primary mb-4' />
              <h3 className='text-base text-primary-foreground group-hover:text-primary pb-2'>
                Projects
              </h3>
              <small className='text-xs font-normal text-muted-foreground'>
                15+ Completed
              </small>
            </article>
            <article className='w-full rounded-2xl flex flex-col items-center bg-primary group hover:bg-primary-foreground transition-colors duration-300 ease-in-out border border-primary py-6 px-0 md:p-8'>
              <Laptop className='w-6 h-6 text-primary-foreground group-hover:text-primary mb-4' />
              <h3 className='text-base text-primary-foreground group-hover:text-primary pb-2'>
                Worlwide
              </h3>
              <small className='text-xs font-normal text-muted-foreground'>
                Remotely Available
              </small>
            </article>
          </div>
          <p className='text-muted-foreground font-normal'>
            I am an enthusiastic and passionate web developer based in Malaysia
            with nearly half a decade of experience dedicated to deliver
            top-notch solutions and facilitate project success.
          </p>
          <div>
            <Button variant='default' asChild>
              <Link href='#contact'>Let&apos;s Talk</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
