import Link from 'next/link';

import type getData from '@/actions/get-data';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/landing/icons';
import ContactForm from '@/components/landing/contact-form';

export default function Contact({
  miscellaneous
}: Partial<Awaited<ReturnType<typeof getData>>>) {
  return (
    <section id='contact' className='mt-32'>
      <h1 className='text-center text-sm text-muted-foreground font-medium'>
        Get in Touch
      </h1>
      <h2 className='text-center text-2xl font-semibold pt-1'>Contact Me</h2>
      <div className='w-full max-w-xl lg:max-w-6xl mx-auto grid lg:grid-cols-5 gap-16 pt-8'>
        <div className='lg:col-span-2 flex flex-col gap-6'>
          <article className='rounded-2xl bg-primary group hover:bg-primary-foreground transition-colors duration-300 ease-in-out border border-primary py-4 px-4 md:px-10'>
            <div className='flex flex-col items-center text-primary-foreground group-hover:text-primary'>
              <Icons.email className='w-7 h-7 invert group-hover:invert-0 dark:invert-0 dark:group-hover:invert' />
              <h3 className='text-lg font-medium pt-4'>Email</h3>
              <h4 className='text-sm text-muted/60 group-hover:text-primary/80 pb-1'>
                {miscellaneous?.email}
              </h4>
              <Button
                variant='link'
                className='text-primary-foreground group-hover:text-primary'
                asChild
              >
                <Link
                  href={`${
                    miscellaneous ? 'mailto:' + miscellaneous.email : '#'
                  }`}
                >
                  Email me
                </Link>
              </Button>
            </div>
          </article>
          <article className='rounded-2xl bg-primary group hover:bg-primary-foreground transition-colors duration-300 ease-in-out border border-primary py-4 px-4 md:px-10'>
            <div className='flex flex-col items-center text-primary-foreground group-hover:text-primary'>
              <Icons.messenger className='w-7 h-7 invert group-hover:invert-0 dark:invert-0 dark:group-hover:invert' />
              <h3 className='text-lg font-medium pt-4'>Messenger</h3>
              <h4 className='text-sm text-muted/60 group-hover:text-primary/80 pb-1'>
                {miscellaneous?.messengerName}
              </h4>
              <Button
                variant='link'
                className='text-primary-foreground group-hover:text-primary'
                asChild
              >
                <Link
                  href={`${miscellaneous ? miscellaneous.messengerUrl : '#'}`}
                  target='_blank'
                  rel='noopener noreferer'
                >
                  Say hello
                </Link>
              </Button>
            </div>
          </article>
          <article className='rounded-2xl bg-primary group hover:bg-primary-foreground transition-colors duration-300 ease-in-out border border-primary py-4 px-4 md:px-10'>
            <div className='flex flex-col items-center text-primary-foreground group-hover:text-primary'>
              <Icons.discord className='w-8 h-8 invert group-hover:invert-0 dark:invert-0 dark:group-hover:invert' />
              <h3 className='text-lg font-medium pt-4'>Discord</h3>
              <h4 className='text-sm text-muted/60 group-hover:text-primary/80 pb-1'>
                {miscellaneous?.discordUsername}
              </h4>
              <Button
                variant='link'
                className='text-primary-foreground group-hover:text-primary'
                asChild
              >
                <Link
                  href={`${miscellaneous ? miscellaneous.discordUrl : '#'}`}
                  target='_blank'
                  rel='noopener noreferer'
                >
                  Let&apos;s chat
                </Link>
              </Button>
            </div>
          </article>
        </div>
        <div className='lg:col-span-3'>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
