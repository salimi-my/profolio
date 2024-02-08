'use client';

import { useRef } from 'react';
import { Briefcase, GraduationCap } from 'lucide-react';
import { LazyMotion, domAnimation, m, useInView } from 'framer-motion';

import type getInformation from '@/data/information';
import { slideInFromRight, slideInFromTop } from '@/lib/motion';
import QualificationCard from '@/components/landing/qualification-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type QualificationProps = Pick<
  Awaited<ReturnType<typeof getInformation>>,
  'education' | 'experience'
>;

export default function Qualification({
  education,
  experience
}: QualificationProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <LazyMotion features={domAnimation}>
      <m.section
        ref={ref}
        initial='hidden'
        animate={isInView ? 'visible' : 'hidden'}
        id='qualification'
        className='mt-32'
      >
        <m.span
          variants={slideInFromTop(0.3)}
          className='block text-center text-sm text-muted-foreground font-medium'
        >
          My Personal Journey
        </m.span>
        <m.h2
          variants={slideInFromTop(0.4)}
          className='text-center text-2xl font-semibold pt-1'
        >
          Qualification
        </m.h2>
        <m.div
          variants={slideInFromRight(0.5)}
          className='w-full max-w-[810px] mx-auto pt-8'
        >
          <Tabs defaultValue='education' className='w-full'>
            <TabsList className='grid w-full grid-cols-2'>
              <TabsTrigger value='education'>Education</TabsTrigger>
              <TabsTrigger value='experience'>Experience</TabsTrigger>
            </TabsList>
            <TabsContent value='education'>
              <QualificationCard
                icon={GraduationCap}
                qualificationType='education'
                data={education}
              />
            </TabsContent>
            <TabsContent value='experience'>
              <QualificationCard
                icon={Briefcase}
                qualificationType='experience'
                data={experience}
              />
            </TabsContent>
          </Tabs>
        </m.div>
      </m.section>
    </LazyMotion>
  );
}
