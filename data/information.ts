import prismadb from '@/lib/prismadb';
import type {
  About,
  Experience,
  Expertise,
  Prisma,
  Qualification,
  Tool
} from '@prisma/client';

type PortfolioWithTags = Prisma.PortfolioGetPayload<{
  include: { tags: true };
}>;

type MiscellaneousWithTitles = Prisma.MiscellaneousGetPayload<{
  include: { titles: true };
}>;

interface Data {
  about: About | null;
  frontend: Experience[];
  backend: Experience[];
  seooptimization: Expertise[];
  webdevelopment: Expertise[];
  contentcreation: Expertise[];
  education: Qualification[];
  experience: Qualification[];
  portfolioWithTags: PortfolioWithTags[];
  miscellaneous: MiscellaneousWithTitles | null;
  tool: Tool[];
}

export default async function getInformation(): Promise<Data> {
  const [
    about,
    experiences,
    expertises,
    qualifications,
    portfolioWithTags,
    miscellaneous,
    tool
  ] = await Promise.all([
    prismadb.about.findFirst(),
    prismadb.experience.findMany({
      where: {
        type: { in: ['FRONTEND', 'BACKEND'] }
      }
    }),
    prismadb.expertise.findMany({
      where: {
        type: { in: ['SEOOPTIMIZATION', 'WEBDEVELOPMENT', 'CONTENTCREATION'] }
      }
    }),
    prismadb.qualification.findMany({
      where: {
        type: { in: ['EDUCATION', 'EXPERIENCE'] }
      },
      orderBy: {
        id: 'desc'
      }
    }),
    prismadb.portfolio.findMany({
      take: 6,
      include: {
        tags: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    }),
    prismadb.miscellaneous.findFirst({
      include: {
        titles: true
      }
    }),
    prismadb.tool.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })
  ]);

  const frontend = [];
  const backend = [];
  const seooptimization = [];
  const webdevelopment = [];
  const contentcreation = [];
  const education = [];
  const experience = [];

  for (const exp of experiences) {
    if (exp.type === 'FRONTEND') frontend.push(exp);
    else if (exp.type === 'BACKEND') backend.push(exp);
  }

  for (const expertise of expertises) {
    if (expertise.type === 'SEOOPTIMIZATION') seooptimization.push(expertise);
    else if (expertise.type === 'WEBDEVELOPMENT')
      webdevelopment.push(expertise);
    else if (expertise.type === 'CONTENTCREATION')
      contentcreation.push(expertise);
  }

  for (const qualification of qualifications) {
    if (qualification.type === 'EDUCATION') education.push(qualification);
    else if (qualification.type === 'EXPERIENCE')
      experience.push(qualification);
  }

  return {
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
  };
}
