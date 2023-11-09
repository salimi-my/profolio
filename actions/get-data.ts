import prismadb from '@/lib/prismadb';
import type {
  About,
  Experience,
  Expertise,
  Prisma,
  Qualification
} from '@prisma/client';

type PortfolioWithTags = Prisma.PortfolioGetPayload<{
  include: { tags: true };
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
  portfolio: PortfolioWithTags[];
  portfolioCount: number;
}

export default async function getData(): Promise<Data> {
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
    portfolioCount
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
    prismadb.portfolio.count()
  ]);

  return {
    about,
    frontend,
    backend,
    seooptimization,
    webdevelopment,
    contentcreation,
    education,
    experience,
    portfolio,
    portfolioCount
  };
}
