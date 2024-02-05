import prismadb from '@/lib/prismadb';
import addBlurredDataUrls from '@/data/image-blur';
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

type PortfolioWithBlur = PortfolioWithTags & {
  blurredDataUrl?: string;
};

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
  portfolioWithBlur: PortfolioWithBlur[];
  miscellaneous: MiscellaneousWithTitles | null;
  tool: Tool[];
}

export default async function getInformation(): Promise<Data> {
  const aboutPromise = prismadb.about.findFirst();

  const experiencesPromise = prismadb.experience.findMany({
    where: {
      type: { in: ['FRONTEND', 'BACKEND'] }
    }
  });

  const expertisesPromise = prismadb.expertise.findMany({
    where: {
      type: { in: ['SEOOPTIMIZATION', 'WEBDEVELOPMENT', 'CONTENTCREATION'] }
    }
  });

  const qualificationsPromise = prismadb.qualification.findMany({
    where: {
      type: { in: ['EDUCATION', 'EXPERIENCE'] }
    },
    orderBy: {
      id: 'desc'
    }
  });

  const portfolioPromise = prismadb.portfolio.findMany({
    take: 6,
    include: {
      tags: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const miscellaneousPromise = prismadb.miscellaneous.findFirst({
    include: {
      titles: true
    }
  });

  const toolPromise = prismadb.tool.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });

  const [
    about,
    experiences,
    expertises,
    qualifications,
    portfolio,
    miscellaneous,
    tool
  ] = await Promise.all([
    aboutPromise,
    experiencesPromise,
    expertisesPromise,
    qualificationsPromise,
    portfolioPromise,
    miscellaneousPromise,
    toolPromise
  ]);

  const frontend = experiences.filter(
    (experience) => experience.type === 'FRONTEND'
  );
  const backend = experiences.filter(
    (experience) => experience.type === 'BACKEND'
  );

  const seooptimization = expertises.filter(
    (expertise) => expertise.type === 'SEOOPTIMIZATION'
  );
  const webdevelopment = expertises.filter(
    (expertise) => expertise.type === 'WEBDEVELOPMENT'
  );
  const contentcreation = expertises.filter(
    (expertise) => expertise.type === 'CONTENTCREATION'
  );

  const education = qualifications.filter(
    (qualification) => qualification.type === 'EDUCATION'
  );
  const experience = qualifications.filter(
    (qualification) => qualification.type === 'EXPERIENCE'
  );

  const portfolioWithBlur = await addBlurredDataUrls(portfolio);

  return {
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
  };
}
