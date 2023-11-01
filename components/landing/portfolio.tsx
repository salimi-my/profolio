import Link from 'next/link';
import Image from 'next/image';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const data_portfolio = [
  {
    id: 1,
    image: 'netfuix.png',
    title: 'Netfuix - A Netflix Clone App',
    github: 'https://github.com/salimi-my/ai-image-generator',
    demo: 'https://ai-image.salimi.my',
    tags: ['MERN Stack', 'Tailwind', 'Open AI'],
    desc: 'This is an AI app that can create realistic images and art from a description in natural language.'
  },
  {
    id: 2,
    image: 'ai-summarizer.png',
    title: 'AI Summarizer - An Article Simplifier',
    github: 'https://github.com/salimi-my/ai-summarizer',
    demo: 'https://summarizer.salimi.my',
    tags: ['ReactJS', 'Tailwind', 'Rapid API'],
    desc: 'This is an AI app to simplify lengthy articles into concise summaries by inputting article URL.'
  },
  {
    id: 3,
    image: 'hangman.png',
    title: 'Hangman - Guess The Word',
    github: 'https://github.com/salimi-my/hangman',
    demo: 'https://hangman.salimi.my',
    tags: ['ReactJS', 'Tailwind'],
    desc: 'This is a classic word puzzle game Hangman user play by guessing letters one at a time to solve it.'
  },
  {
    id: 4,
    image: 'url-shortener.png',
    title: 'URL Shortener - Short Link & Analytics',
    github: 'https://github.com/salimi-my/url-shortener',
    demo: 'https://url.salimi.my',
    tags: ['NextJS', 'shadcn/ui', 'Clerk'],
    desc: 'This is URL shortener app. Users can create custom short link & view analytics of the links.'
  },
  {
    id: 5,
    image: 'book-store.png',
    title: 'Book Store - A Book E-Commerce',
    github: 'https://github.com/salimi-my/book-store',
    demo: 'https://book-store.salimi.my/',
    tags: ['Laravel', 'ReactJS', 'toyyibPay'],
    desc: 'This is a book store e-commerce app with server side carts & toyyibPay payment gateway.'
  },
  {
    id: 6,
    image: 'scribe.png',
    title: 'Scribe - Chat with PDF',
    github: 'https://github.com/salimi-my/scribe',
    demo: 'https://scribe.salimi.my/',
    tags: ['NextJS', 'OpenAI', 'Kinde'],
    desc: 'Scribe enable you to converse with any PDF instantly. Just upload your file and start chatting.'
  }
];

export default function Portfolio() {
  return (
    <section id='portfolio' className='mt-32'>
      <h1 className='text-center text-sm text-muted-foreground font-medium'>
        My Recent Work
      </h1>
      <h2 className='text-center text-2xl font-medium pt-1'>Portfolio</h2>
      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8'>
        {data_portfolio.toReversed().map((portfolio) => (
          <article
            key={portfolio.id}
            className='relative w-full h-min rounded-2xl flex flex-col group'
          >
            <div className='relative w-full h-[250px] lg:h-[300px] overflow-hidden'>
              <Image
                src={`/${portfolio.image}`}
                alt='portfolio'
                fill
                sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
                className='object-cover object-top group-hover:object-bottom transition-all duration-6000 ease-in-out rounded-t-2xl border-t border-x'
              />
            </div>
            <div className='flex flex-col gap-4 rounded-b-2xl py-9 px-6 md:px-6 border border-t-primary dark:border-t-zinc-100 group-hover:border-t-zinc-200 dark:group-hover:border-t-zinc-800 bg-primary group-hover:bg-primary-foreground transition-colors duration-300 ease-in-out'>
              <h3 className='text-base lg:text-[1.2rem] font-medium text-primary-foreground group-hover:text-primary'>
                {portfolio.title}
              </h3>
              <div className='flex gap-3'>
                {portfolio.tags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant='outline'
                    className='rounded-full border-primary-foreground group-hover:border-primary text-primary-foreground group-hover:text-primary font-medium'
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              <p className='text-xs lg:text-sm text-primary-foreground group-hover:text-primary'>
                {portfolio.desc}
              </p>
              <div className='pt-2 flex gap-4 items-center'>
                <Button
                  variant='outline'
                  className='text-primary-foreground group-hover:text-primary group-hover:border-primary'
                  asChild
                >
                  <Link
                    href={portfolio.github}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    GitHub
                  </Link>
                </Button>
                <Button
                  variant='secondary'
                  className='group-hover:bg-primary hover:opacity-90 transition-opacity duration-100 ease-in-out group-hover:text-primary-foreground'
                  asChild
                >
                  <Link
                    href={portfolio.demo}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Live Demo
                  </Link>
                </Button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
