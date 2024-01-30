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
  const [
    about,
    frontend,
    backend,
    seooptimization,
    webdevelopment,
    contentcreation,
    education,
    experience,
    portfolio,
    miscellaneous,
    tool
  ] = await prismadb.$transaction([
    prismadb.about.findFirst(),
    prismadb.experience.findMany({
      where: {
        type: 'FRONTEND'
      }
    }),
    prismadb.experience.findMany({
      where: {
        type: 'BACKEND'
      }
    }),
    prismadb.expertise.findMany({
      where: {
        type: 'SEOOPTIMIZATION'
      }
    }),
    prismadb.expertise.findMany({
      where: {
        type: 'WEBDEVELOPMENT'
      }
    }),
    prismadb.expertise.findMany({
      where: {
        type: 'CONTENTCREATION'
      }
    }),
    prismadb.qualification.findMany({
      where: {
        type: 'EDUCATION'
      },
      orderBy: {
        id: 'desc'
      }
    }),
    prismadb.qualification.findMany({
      where: {
        type: 'EXPERIENCE'
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
