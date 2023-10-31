import { BadgeCheck } from 'lucide-react';

const data_frontend = [
  {
    skill: 'HTML',
    level: 'Experienced'
  },
  {
    skill: 'CSS',
    level: 'Experienced'
  },
  {
    skill: 'JavaScript',
    level: 'Experienced'
  },
  {
    skill: 'TypeScript',
    level: 'Intermediate'
  },
  {
    skill: 'Bootstrap',
    level: 'Experienced'
  },
  {
    skill: 'Tailwind',
    level: 'Experienced'
  },
  {
    skill: 'React',
    level: 'Experienced'
  },
  {
    skill: 'Vue',
    level: 'Intermediate'
  },
  {
    skill: 'Vite',
    level: 'Experienced'
  },
  {
    skill: 'NextJS',
    level: 'Experienced'
  }
];

const data_backend = [
  {
    skill: 'Laravel',
    level: 'Intermediate'
  },
  {
    skill: 'Codeigniter',
    level: 'Experienced'
  },
  {
    skill: 'Node JS',
    level: 'Basic'
  },
  {
    skill: 'MongoDB',
    level: 'Intermediate'
  },
  {
    skill: 'PHP',
    level: 'Experienced'
  },
  {
    skill: 'MySQL',
    level: 'Experienced'
  },
  {
    skill: 'Firebase',
    level: 'Intermediate'
  },
  {
    skill: 'Inertia',
    level: 'Experienced'
  },
  {
    skill: 'Express JS',
    level: 'Basic'
  },
  {
    skill: 'Prisma',
    level: 'Intermediate'
  }
];

export default function Experience() {
  return (
    <section id='experience' className='mt-32'>
      <h1 className='text-center text-sm text-muted-foreground'>
        What Skills I have
      </h1>
      <h2 className='text-center text-2xl pt-1'>Technical Level</h2>
      <div className='grid lg:grid-cols-2 gap-8 pt-8'>
        <div className='w-full rounded-2xl flex flex-col items-center bg-primary group hover:bg-primary-foreground border border-primary py-9 px-6 md:py-9 md:px-20'>
          <h3 className='text-lg md:text-xl text-primary-foreground group-hover:text-primary pb-8'>
            Frontend Development
          </h3>
          <div className='w-full grid grid-cols-2 gap-y-4'>
            {data_frontend.map(({ skill, level }, index) => (
              <article
                key={index}
                className='flex gap-4 text-primary-foreground group-hover:text-primary'
              >
                <BadgeCheck className='w-5 h-5 mt-[2px]' />
                <div className='flex flex-col'>
                  <h4 className='text-sm md:text-base'>{skill}</h4>
                  <small className='text-xs md:text-sm text-muted-foreground'>
                    {level}
                  </small>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className='w-full rounded-2xl flex flex-col items-center bg-primary group hover:bg-primary-foreground border border-primary py-9 px-6 md:py-9 md:px-20'>
          <h3 className='text-lg md:text-xl text-primary-foreground group-hover:text-primary pb-8'>
            Backend Development
          </h3>
          <div className='w-full grid grid-cols-2 gap-y-4'>
            {data_backend.map(({ skill, level }, index) => (
              <article
                key={index}
                className='flex gap-4 text-primary-foreground group-hover:text-primary'
              >
                <BadgeCheck className='w-5 h-5 mt-[2px]' />
                <div className='flex flex-col'>
                  <h4 className='text-sm md:text-base'>{skill}</h4>
                  <small className='text-xs md:text-sm text-muted-foreground'>
                    {level}
                  </small>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
