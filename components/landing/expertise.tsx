import { Check } from 'lucide-react';

const data_seo_optimization = [
  'Gather relevant keywords.',
  'Optimize images for search.',
  'Optimize meta descriptions.',
  'Speed up web page load.',
  'Optimize page across devices.',
  'Manage broken links.'
];

const data_web_development = [
  'Designing user interfaces and navigation menus.',
  'Writing and reviewing code for web pages.',
  'Integrating multimedia content onto a site.',
  'Testing web applications.',
  'Troubleshooting problems with performance or user experience.',
  'Collaborating with teams of designers, developers, and clients.'
];

const data_content_creation = [
  'Research industry-related topics.',
  'Prepare well-structured drafts using digital publishing platforms.',
  'Create and distribute marketing copy to advertise company and products.',
  "Identify customers' needs and recommend new topics.",
  'Measure web traffic to content.'
];

export default function Expertise() {
  return (
    <section id='expertise' className='mt-32'>
      <h1 className='text-center text-sm text-muted-foreground font-medium'>
        What I Offer
      </h1>
      <h2 className='text-center text-2xl pt-1 font-medium'>Expertise</h2>
      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-x-8 lg:gap-8 pt-12'>
        <article className='relative w-full rounded-2xl flex flex-col bg-primary group hover:bg-primary-foreground transition-colors duration-300 ease-in-out border border-primary py-9 px-6 md:px-10'>
          <div className='absolute -top-6 left-0 right-0 mx-auto w-fit rounded-full bg-primary-foreground px-4 py-2 border-2 border-primary shadow-md'>
            <h3 className='text-base font-medium text-primary'>
              SEO Optimization
            </h3>
          </div>
          <ul className='pt-6 flex flex-col gap-5 text-sm font-normal text-primary-foreground group-hover:text-primary'>
            {data_seo_optimization.map((expertise, index) => (
              <li key={index} className='flex items-start space-x-4'>
                <div>
                  <Check className='w-4 h-4 mt-[2px]' />
                </div>
                <p>{expertise}</p>
              </li>
            ))}
          </ul>
        </article>

        <article className='relative w-full rounded-2xl flex flex-col bg-primary group hover:bg-primary-foreground transition-colors duration-300 ease-in-out border border-primary py-9 px-6 md:px-10'>
          <div className='absolute -top-6 left-0 right-0 mx-auto w-fit rounded-full bg-primary-foreground px-4 py-2 border-2 border-primary shadow-md'>
            <h3 className='text-base font-medium text-primary'>
              Web Development
            </h3>
          </div>
          <ul className='pt-6 flex flex-col gap-5 text-sm font-normal text-primary-foreground group-hover:text-primary'>
            {data_web_development.map((expertise, index) => (
              <li key={index} className='flex items-start space-x-4'>
                <div>
                  <Check className='w-4 h-4 mt-[2px]' />
                </div>
                <p>{expertise}</p>
              </li>
            ))}
          </ul>
        </article>

        <article className='relative w-full rounded-2xl flex flex-col bg-primary group hover:bg-primary-foreground transition-colors duration-300 ease-in-out border border-primary py-9 px-6 md:px-10'>
          <div className='absolute -top-6 left-0 right-0 mx-auto w-fit rounded-full bg-primary-foreground px-4 py-2 border-2 border-primary shadow-md'>
            <h3 className='text-base font-medium text-primary'>
              Content Creation
            </h3>
          </div>
          <ul className='pt-6 flex flex-col gap-5 text-sm font-normal text-primary-foreground group-hover:text-primary'>
            {data_content_creation.map((expertise, index) => (
              <li key={index} className='flex items-start space-x-4'>
                <div>
                  <Check className='w-4 h-4 mt-[2px]' />
                </div>
                <p>{expertise}</p>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}
