import Image from 'next/image';

import { cn } from '@/lib/utils';

const data_tools = [
  {
    id: 1,
    image: '/tools/docker.svg',
    name: 'docker'
  },
  {
    id: 2,
    image: '/tools/figma.svg',
    name: 'figma'
  },
  {
    id: 3,
    image: '/tools/github.svg',
    name: 'github'
  },
  {
    id: 4,
    image: '/tools/illustrator.svg',
    name: 'illustrator'
  },
  {
    id: 5,
    image: '/tools/photoshop.svg',
    name: 'photoshop'
  },
  {
    id: 6,
    image: '/tools/nodejs.svg',
    name: 'nodejs'
  },
  {
    id: 7,
    image: '/tools/notion.svg',
    name: 'notion'
  },
  {
    id: 8,
    image: '/tools/postman.svg',
    name: 'postman'
  },
  {
    id: 9,
    image: '/tools/vscode.svg',
    name: 'vscode'
  },
  {
    id: 10,
    image: '/tools/xampp.svg',
    name: 'xampp'
  },
  {
    id: 11,
    image: '/tools/openai.svg',
    name: 'openai'
  },
  {
    id: 12,
    image: '/tools/anydesk.svg',
    name: 'anydesk'
  },
  {
    id: 13,
    image: '/tools/google-meet.svg',
    name: 'google meet'
  },
  {
    id: 14,
    image: '/tools/digital-ocean.svg',
    name: 'digital ocean'
  },
  {
    id: 15,
    image: '/tools/vercel.svg',
    name: 'vercel'
  }
];

export default function Tool() {
  return (
    <section id='tool' className='my-32'>
      <h1 className='text-center text-sm text-muted-foreground font-medium'>
        What I Use
      </h1>
      <h2 className='text-center text-2xl font-medium pt-1'>Tools & Apps</h2>
      <div className='w-full max-w-4xl mx-auto pt-8'>
        <div className='w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]'>
          <ul className='flex items-center justify-center md:justify-start [&_li]:mx-5 md:[&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll'>
            {data_tools.map((tool) => (
              <li key={tool.id}>
                <Image
                  src={tool.image}
                  alt={tool.name}
                  width={56}
                  height={56}
                  className={cn(
                    'w-12 h-12 md:w-14 md:h-14 grayscale-[20%]',
                    (tool.name === 'notion' ||
                      tool.name === 'github' ||
                      tool.name === 'vercel' ||
                      tool.name === 'openai') &&
                      'dark:invert-[80%]'
                  )}
                />
              </li>
            ))}
          </ul>
          <ul
            className='flex items-center justify-center md:justify-start [&_li]:mx-5 md:[&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll'
            aria-hidden='true'
          >
            {data_tools.map((tool) => (
              <li key={tool.id}>
                <Image
                  src={tool.image}
                  alt={tool.name}
                  width={56}
                  height={56}
                  className={cn(
                    'w-12 h-12 md:w-14 md:h-14 grayscale-[20%]',
                    (tool.name === 'notion' ||
                      tool.name === 'github' ||
                      tool.name === 'vercel' ||
                      tool.name === 'openai') &&
                      'dark:invert-[80%]'
                  )}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
